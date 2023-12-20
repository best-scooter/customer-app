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
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../components/Styles';

import {
  getScooter,
  putScooter,
  getScooterToken
} from '../functions/FetchScooter';
import { retrieveToken, removeToken } from '../functions/SecureStore';

const Rent = () => {
  const [userInput, setUserInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRenting, setisRenting] = useState(false);

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
  const handleUserInput = () => {
    setShowCamera(false);
    console.log('userInput:', userInput);
    setUseManualInput(false);
    handleStartRent(userInput);
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
    handleStartRent(data);

    //alert(`Bar code with type: ${type} and data: ${data} has been scanned!`);
  };

  const handleStartRent = async (data: string) => {
    const res = await getScooter(data);
    console.log('scooter byId: ', res);
    if (res) {
      //&& res.available

      //Getting ScooterToken to authenticate put request
      const ScooterToken = await getScooterToken(data);
      console.log('ScooterToken: ', ScooterToken);
      //const test = await retrieveToken('ScooterToken');
      //console.log("test: ", test)

      console.log('pre putScooter data: ', data, ScooterToken);
      const putRes = await putScooter(data, ScooterToken.token, false);

      console.log('put res wId: ', putRes);
      const afterUpdate = await getScooter(data);
      console.log('beforeUpdate', res);
      console.log('afterUpdate: ', afterUpdate);
      // start trip
      // and calculate cost
      // make it like a transaction so that it doesn't start if error happens further down the function chain
      setisRenting(true);
      // Set scooterId in storage to return later for safety reasons
    }
  };

  const startTrip = async () => {};

  const returnScooter = async (data: string) => {
    // get bike customer
    // get scooter location for cost
    // send request to scooterapp to get the final cost
    // withdraw money
    // end scooter rental
    setisRenting(false); // disable button from view
    setUseManualInput(false);
    removeToken('ScooterToken'); // remove the scooters token from storage
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
