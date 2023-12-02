import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

//indentation broke again

const Rent = () => {
  const [userInput, setuserInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleUserInput = () => {
    console.log('userInput:', userInput);
    //if ok send popup or redirct to confirm hire of bike
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //here we actually set the bike to hired later
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log('we in');
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  console.log('test');

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
    <View style={styles.container}>
      <Text>Rent using QR code or enter bike id manually</Text>
      <PaperButton
        mode="contained"
        style={styles.button}
        labelStyle={styles.button}
        onPress={handleQRCode}
      ></PaperButton>
      <TextInput
        value={userInput}
        onChangeText={setuserInput}
        label="Enter Bike id"
        secureTextEntry={true}
        style={styles.input}
        left={<TextInput.Icon icon="wheel" />}
      />
      <PaperButton
        mode="contained"
        style={styles.button}
        labelStyle={styles.button}
        onPress={handleUserInput}
      ></PaperButton>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20
  }
});

export default Rent;
