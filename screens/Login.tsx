import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../components/Styles';

import {
  getOAUTH,
  redirectOAuth,
  postOAUTH,
  postToken
} from '../functions/FetchOAuth';

import { storeToken } from '../functions/SecureStore';
//import * as Network from 'expo-network';

const Login = ( { setLoginStatus } ) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      console.log('All clear, your token is: ', jwt);
      //console.log('jwtdataoauth: ', jwt.data.token)
      storeToken('jwtLogin', jwt.data.token); //check up later
      //setLoginStatus()
    } catch (error) {
      console.error('Error in allInOne:', error);
    }
  };

  return (
    <ImageBackground
    source={require('../assets/55.jpg')}
    style={styles.background}
  >
    <View style={styles.container, styles.overlay}>
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
    </ImageBackground>
  );
};

export default Login;
