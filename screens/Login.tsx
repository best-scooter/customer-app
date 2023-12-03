import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../components/Styles';

import { getOAUTH } from '../functions/FetchOAuth';
import { redirectOAuth } from '../functions/FetchOAuth';
import { postOAUTH } from '../functions/FetchOAuth';
import { postToken } from '../functions/FetchOAuth';

import * as Network from 'expo-network';

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const ipAlert = async () => {
    const ip = await Network.getIpAddressAsync();
    alert(ip);
  };

  //ipAlert();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // Fetch stuff
  };

  const handleRedirect = () => {
    // @ts-ignore
    navigation.navigate('Register'); //ts doesn't like this library
  };

  const allInOne = async () => {
    try {
      const [redirectUrl, url, state]: string[] = await getOAUTH();
      const [code] = await redirectOAuth(redirectUrl, url, state);
      const token = await postOAUTH(code, state);
      const jwt = await postToken(token);
      console.log('All clear, your token is: ', token);
    } catch (error) {
      console.error('Error in allInOne:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerContainerText}>Sign In</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        label="Email"
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        label="Password"
        secureTextEntry={true}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />

      <PaperButton
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Login
      </PaperButton>
      <PaperButton
        mode="contained"
        style={styles.buttonSecondary}
        labelStyle={styles.buttonTextSecondary}
        onPress={handleRedirect}
      >
        Register
      </PaperButton>
      <Text style={{ marginVertical: 10 }}>Or</Text>
      <PaperButton
        mode="contained"
        style={styles.buttonGoogle}
        labelStyle={{ color: 'white', fontWeight: 'bold' }}
        icon={'github'}
        onPress={allInOne}
      >
        Continue with GitHub
      </PaperButton>
    </View>
  );
};

export default Login;
