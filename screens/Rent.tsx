import React, { useState } from 'react';
import { View, Text, StyleSheet,  } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';

//indentation broke again

const Rent = () => {
  const [userInput, setuserInput] = useState('')
  const [QRCode, setQRCode] = useState('')


  const handleUserInput = () => {
    console.log('userInput:', userInput);
    //if ok send popup or redirct to confirm hire of bike
  }

  const handleQRCode = () => {
    // open camera on device ask for permission etc?
    //if ok send popup or redirct to confirm hire of bike
  }

  const confirmation = () => {

  }

  return (
    <View style={styles.container}>
      <Text>Rent using QR code or enter bike id manually</Text>
      <PaperButton
        mode='contained'
        style={styles.button}
        labelStyle={styles.button}
        onPress={handleQRCode}
      >
      </PaperButton>
      <TextInput
        value={userInput}
        onChangeText={setuserInput}
        label='Enter Bike id'
        secureTextEntry={true}
        style={styles.input}
        left={<TextInput.Icon icon='wheel' />}
      />
      <PaperButton
        mode='contained'
        style={styles.button}
        labelStyle={styles.button}
        onPress={handleUserInput}
      >
        </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    },
});

export default Rent;