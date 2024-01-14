import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../components/Styles';
import { retrieveToken, removeToken } from '../functions/SecureStore';
import {
  getOAUTH,
  redirectOAuth,
  postOAUTH,
  postToken
} from '../functions/FetchOAuth';

import { postCustomerToken } from '../functions/FetchCustomer';
import { storeToken } from '../functions/SecureStore';
const ADDRESS = process.env.DEV_ADDRESS;

const Login = ({ setLoginStatus }) => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log(ADDRESS);

    try {
      const response = await postCustomerToken(username);
      console.log('res', response);

      storeToken('jwtLogin', response.data.token);
      storeToken('customerId', response.data.customerId.toString());

      console.log('heyay login worked data is:', response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await retrieveToken('jwtLogin');
      setLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  // const handleRedirect = async () => {
  //   const registrationUrl = 'http://192.168.0.10:3000/register';
  //   Linking.openURL(registrationUrl);
  // };

  const handleLogout = async () => {
    await removeToken('jwtLogin');
    setLoggedIn(false);
  };

  const allInOne = async () => {
    try {
      const [redirectUrl, url, state]: string[] = await getOAUTH();
      console.log(redirectUrl, url, state);
      const [code] = await redirectOAuth(redirectUrl, url, state);
      const token = await postOAUTH(code, state);
      const jwt = await postToken(token);
      console.log('All clear, your token is: ', jwt);
      //console.log('jwtdataoauth: ', jwt.data.token)
      storeToken('jwtLogin', jwt.data.token); //check up later
      storeToken('customerId', jwt.data.customerId.toString());
      //setLoginStatus()
      setLoggedIn(true);
    } catch (error) {
      console.error('Error in allInOne:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/55.jpg')}
      style={styles.background}
    >
      <View style={(styles.container, styles.overlay)}>
        {loggedIn ? (
          <>
            <Text style={styles.headerContainerText}>Logged In</Text>
            <PaperButton
              mode="contained"
              style={styles.buttonSecondary}
              labelStyle={styles.buttonTextSecondary}
              onPress={handleLogout}
            >
              Logout
            </PaperButton>
          </>
        ) : (
          <>
            <Text style={styles.headerContainerText}>Sign In</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              label="Email"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />
            {/* <TextInput
              value={password}
              onChangeText={setPassword}
              label="Password"
              secureTextEntry={true}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
            /> */}

            <PaperButton
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Login
            </PaperButton>
            {/* <PaperButton
              mode="contained"
              onPress={handleRedirect}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Register 
            </PaperButton>*/}

            <PaperButton
              mode="contained"
              style={styles.buttonGoogle}
              labelStyle={{ color: 'white', fontWeight: 'bold' }}
              icon={'github'}
              onPress={allInOne}
            >
              Continue with GitHub
            </PaperButton>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Login;
