import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Rent = () => {
  const [userInput, setUserInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleQRCode = () => {
    setUseManualInput(false);
    setShowCamera(true);
    setScanned(false);
  };

  const handleUserInput = () => {
    setShowCamera(false);
    console.log('userInput:', userInput);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type: ${type} and data: ${data} has been scanned!`);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
    <View style={styles.container}>
        <Text style={styles.headerContainerText}>Rent</Text>
          <PaperButton
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => setUseManualInput(true)}
          >
            Enter Bike ID Manually
          </PaperButton>

          <PaperButton
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
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
            left={<TextInput.Icon name="lock" />}
          />
          <PaperButton
            mode="contained"
            style={styles.button}
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
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </>
        )
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
    input: {
      width: '80%',
      height: 50,
      marginBottom: 20
    },
    headerContainerText: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left'
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
    buttonSecondary: {
      width: '80%',
      height: 50,
      borderRadius: 25,
      backgroundColor: '#28a745',
      justifyContent: 'center'
    },
    buttonTextSecondary: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18
    },
    buttonGoogle: {
      width: '80%',
      height: 50,
      borderRadius: 25,
      backgroundColor: 'tomato',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    }
  });

export default Rent;
