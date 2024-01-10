import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../components/Styles';

import {
  getScooter,
  putScooter,
  getScooterToken
} from '../functions/FetchScooter';
import { getTrip, postTrip, putTrip } from '../functions/FetchTrip';
import {
  retrieveToken,
  removeToken,
  storeToken
} from '../functions/SecureStore';
import { getCustomer, updateCustomerBalance } from '../functions/FetchCustomer';

const Rent = () => {
  const navigation = useNavigation();

  const [userInput, setUserInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRenting, setisRenting] = useState(false);
  const [scooterId, setScooterId] = useState('');
  const [tokenAuthed, setTokenAuthed] = useState(null);

  useEffect(() => {
    // Fetch the token asynchronously
    console.log('rent is loading in');
    const retrieveTokenAsync = async () => {
      const token = await retrieveToken('jwtLogin');

      if (!token) {
        console.log('no token redirecting');
        // @ts-ignore
        navigation.navigate('Login');
      }
    };

    retrieveTokenAsync();
  }, []);

  type BarcodeData = {
    type: string;
    data: string;
  };

  const handleQRCode = () => {
    setUseManualInput(false);
    setShowCamera(true);
    setScanned(false);
  };

  /**
   * handles manual input through field
   */
  const handleUserInput = async () => {
    const token = await retrieveToken('jwtLogin');
    if (!token) {
      console.log('no token redirecting');
      navigation.navigate('Login');
    } else {
      setShowCamera(false);
      console.log('userInput:', userInput);
      setUseManualInput(false);
      handleStartRent(userInput);
    }
  };

  /**
   *
   * @param {BarcodeData} from QR/Bar code and other supported codes
   */
  const handleBarCodeScanned = async ({ type, data }: BarcodeData) => {
    setScanned(true);
    console.log(
      `Bar code with type: ${type} and data: ${data} has been scanned!`
    );
    const token = await retrieveToken('jwtLogin');
    if (!token) {
      console.log('no token redirecting');
      navigation.navigate('Login');
    } else {
      handleStartRent(data);
    }
    //alert(`Bar code with type: ${type} and data: ${data} has been scanned!`);
  };

  const handleStartRent = async (data: string) => {
    setScooterId(data);
    const res = await getScooter(data);
    console.log('scooter byId: ', res);
    if (res) {
      //&& res.available
      const customerId = await retrieveToken('customerId');

      //Getting ScooterToken to authenticate put request
      const ScooterToken = await getScooterToken(data);
      console.log('ScooterToken: ', ScooterToken);

      console.log('pre putScooter data: ', data, ScooterToken);
      const putRes = await putScooter(data, ScooterToken.token, false);

      console.log('put res wId: ', putRes);
      const afterUpdate = await getScooter(data);
      console.log('beforeUpdate', res);
      console.log('afterUpdate: ', afterUpdate);
      console.log('data: ', data);

      const scooterData = await getScooter(data);
      console.log('scooterData: ', scooterData);
      const scooterPos = [scooterData.positionY, scooterData.positionX];
      console.log('scooter pos : ', scooterPos);

      const storedToken = await retrieveToken('jwtLogin');
      console.log('Stored Token:', storedToken);

      // wow...
      const token = String(storedToken).trim();
      // start trip
      // and calculate cost
      // make it like a transaction so that it doesn't start if error happens further down the function chain
      // leave it as 0 because that auto assigns a tripId
      const tripData = await postTrip(
        token,
        0,
        customerId,
        parseInt(data),
        scooterPos
      );
      console.log(tripData);
      await storeToken('tripId', tripData.tripId.toString());
      const tripId = await retrieveToken('tripId');
      console.log('trip id is : ', tripId);
      setisRenting(true);
      // Set scooterId in storage to return later for safety reasons
    }
  };

  const startTrip = async () => {};

  const returnScooter = async () => {
    const storedToken = await retrieveToken('jwtLogin');
    console.log('Stored Token:', storedToken);
    console.log('data in returnScooter as: ', scooterId);

    // wow...
    const token = String(storedToken).trim();
    // get bike customer
    // get scooter location for cost
    // send request to scooterapp to get the final cost
    // withdraw money
    // end scooter rental
    setisRenting(false); // disable button from view
    setUseManualInput(false);
    removeToken('ScooterToken'); // remove the scooters token from storage
    const scooterData = await getScooter(scooterId);
    console.log('scooterData: ', scooterData);
    const scooterPos = [scooterData.positionY, scooterData.positionX];
    console.log('scooter pos end: ', scooterPos);
    const tripId = await retrieveToken('tripId');
    console.log('trip id is in return  : ', tripId);

    await putTrip(tripId, token);

    const tripData = await getTrip(tripId);
    console.log('tripdata is: ', tripData);
    const { priceInitial, priceDistance, priceTime, distance } = tripData.data;
    const { timeStarted, timeEnded } = tripData.data;

    const startedTime = new Date(timeStarted);
    const endedTime = new Date(timeEnded);
    const timeDifferenceMs = endedTime - startedTime;

    // convert the time diff from ms to hours
    const timeDurationInHours = timeDifferenceMs / (1000 * 60 * 60);
    console.log('time duration :', timeDurationInHours);

    const initialPrice = priceInitial;
    const distanceCost = distance ? distance * priceDistance : 0;
    const timeCost = timeDurationInHours * priceTime;

    const totalCost = initialPrice + distanceCost + timeCost;

    console.log('Total Cost:', totalCost);
    const customerId = await retrieveToken('customerId');
    const customerData = await getCustomer(customerId, token);
    console.log('customerdata is here: ', customerData);
    const customerBalance = customerData.balance;

    await updateCustomerBalance(customerId, token, customerBalance, totalCost);
    console.log('return bike ended');
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === 'granted'); //this is not boolean ts is on drugs
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/55.jpg')}
      style={styles.background}
    >
      <View style={(styles.container, styles.overlay)}>
        {isRenting ? (
          <>
            <Text style={styles.headerContainerText}>Currently Renting</Text>
            <View style={styles.buttonReturnContainer}>
              <PaperButton
                style={styles.buttonReturn}
                labelStyle={styles.buttonText}
                onPress={() => returnScooter()}
              >
                Return Scooter
              </PaperButton>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.headerContainerText}>Rent</Text>
            <PaperButton
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonText}
              onPress={() => setUseManualInput(!useManualInput)}
            >
              Enter Bike ID Manually
            </PaperButton>

            <PaperButton
              mode="contained"
              style={styles.buttonSecondary}
              labelStyle={styles.buttonTextSecondary}
              onPress={handleQRCode}
            >
              Scan QR Code
            </PaperButton>

            {useManualInput ? (
              <>
                <TextInput
                  value={userInput}
                  onChangeText={setUserInput}
                  label="Enter Bike ID"
                  style={styles.input}
                  left={<TextInput.Icon icon="key" />}
                />
                <PaperButton
                  mode="contained"
                  style={styles.buttonGoogle}
                  labelStyle={styles.buttonText}
                  onPress={handleUserInput}
                >
                  Confirm Bike ID
                </PaperButton>
              </>
            ) : (
              showCamera && (
                <>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                  />
                  {scanned && (
                    <Button
                      title={'Tap to Scan Again'}
                      onPress={() => setScanned(false)}
                    />
                  )}
                  <View style={styles.buttonReturnContainer}>
                    <PaperButton
                      style={styles.buttonReturn}
                      labelStyle={styles.buttonText}
                      onPress={() => setShowCamera(false)}
                    >
                      Return
                    </PaperButton>
                  </View>
                </>
              )
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Rent;
