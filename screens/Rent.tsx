import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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
import { getZoneById } from '../functions/FetchZones';
import {
  getParkingByScooter,
  postParkingByScooter
} from '../functions/FetchParking';

const ADDRESS = process.env.DEV_ADDRESS;

const Rent = () => {
  const navigation = useNavigation();
  const socketRef = useRef(null);

  const [userInput, setUserInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRenting, setisRenting] = useState(false);
  const [scooterId, setScooterId] = useState('');
  const [scooterStart, setScooterStart] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      
      const retrieveTokenAsync = async () => {
        const token = await retrieveToken('jwtLogin');

        if (!token) {
          
          // @ts-ignore
          navigation.navigate('Sign In');
        }
      };

      retrieveTokenAsync();
    }, [navigation])
  );

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
      
      // @ts-ignore
      navigation.navigate('Sign In');
    } else {
      setShowCamera(false);
      
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
      
      // @ts-ignore
      navigation.navigate('Sign In');
    } else {
      handleStartRent(data);
    }
    //alert(`Bar code with type: ${type} and data: ${data} has been scanned!`);
  };

  const handleStartRent = async (data: string) => {
    const storedToken = await retrieveToken('jwtLogin');
    

    const token = String(storedToken).trim();
    socketRef.current = new WebSocket(`ws://${ADDRESS}:8081`, token);
    setScooterId(data);
    const sendMessage = (scooterToRemove) => {
      const intScooter = parseInt(scooterToRemove);
      const messageToSend = JSON.stringify({
        message: 'scooterLimited',
        scooterId: intScooter,
        remove: true
      });
      
      socketRef.current.send(messageToSend);
    };
    const res = await getScooter(data);
    
    if (res) {
      sendMessage(scooterId);
      const customerId = await retrieveToken('customerId');
      const ScooterToken = await getScooterToken(data);
      const putRes = await putScooter(data, ScooterToken.token, false);
      const afterUpdate = await getScooter(data);

      const scooterData = await getScooter(data);
      
      const scooterPos = [scooterData.positionY, scooterData.positionX];
      
      setScooterStart([scooterPos[0], scooterPos[1]]);
      

      const storedToken = await retrieveToken('jwtLogin');
      

      const token = String(storedToken).trim();

      // leave it as 0 because that auto assigns a tripId
      const tripData = await postTrip(
        token,
        0,
        customerId,
        parseInt(data),
        scooterPos
      );
      
      await storeToken('tripId', tripData.tripId.toString());
      const tripId = await retrieveToken('tripId');
      
      setisRenting(true);
    }
  };

  const returnScooter = async () => {
    const storedToken = await retrieveToken('jwtLogin');
    const token = String(storedToken).trim();

    const allParkingsByScooter = await getParkingByScooter(token, scooterId);

    let initialZoneValue = 15;
    
    if (allParkingsByScooter.data && allParkingsByScooter.data.length > 0) {
      const lastParking =
        allParkingsByScooter.data[allParkingsByScooter.data.length - 1];
      

      const lastKnownParkingZone = lastParking.zoneId;

      const zoneData = await getZoneById(token, lastKnownParkingZone); // Fixa zone id på något jäkla sätt
      initialZoneValue = parseInt(zoneData.data.parkingValue);
      
    } else {
      
      initialZoneValue = 15;
    }
    

    setisRenting(false); // tar väck knappen
    setUseManualInput(false);
    removeToken('ScooterToken');
    const scooterData = await getScooter(scooterId);
    const scooterEndPos = [scooterData.positionY, scooterData.positionX];
    const tripId = await retrieveToken('tripId');

    const finalZoneValue = await postParkingByScooter(
      token,
      scooterId,
      scooterEndPos
    );
    const zoneData = await getZoneById(token, finalZoneValue.zoneIds); // Fixa zone id på något jäkla sätt
    const finalZoneValueNum = zoneData.data.parkingValue;
    const pickUpCostBasedByZones = initialZoneValue - finalZoneValueNum;

    await putTrip(tripId, token, scooterStart);

    const tripData = await getTrip(tripId);
    
    const { priceInitial, priceDistance, priceTime, distance } = tripData.data;
    const { timeStarted, timeEnded } = tripData.data;

    const startedTime = new Date(timeStarted);
    const endedTime = new Date(timeEnded);
    const timeDifferenceMs = endedTime - startedTime;
    const timeDurationInHours = timeDifferenceMs / (1000 * 60 * 60);
    

    const initialPrice = priceInitial;
    const distanceCost = distance ? distance * priceDistance : 0;
    const timeCost = timeDurationInHours * priceTime;

    const totalCost = initialPrice + distanceCost + timeCost;

    const totalCostAfterZoneConsiderations = totalCost - pickUpCostBasedByZones;

    const customerId = await retrieveToken('customerId');
    const customerData = await getCustomer(customerId, token);
    
    const customerBalance = customerData.balance;

    await updateCustomerBalance(customerId, token, customerBalance, totalCostAfterZoneConsiderations);
    
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
