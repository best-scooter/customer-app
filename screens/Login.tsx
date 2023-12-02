import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button as PaperButton, IconButton } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { extractCodeFromUrl } from '../functions/Helpers';

//for oauth internet access
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { getOAUTH } from '../functions/FetchOAuth';
import { redirectOAuth } from '../functions/FetchOAuth';

const CLIENT_ID2 = "ab37ccfd44b552a7f961" //Adam web
const CLIENT_ID = "8a13e643a21789547ad0" //David mobil app

//const REDIRECT_URI = "exp://192.168.0.10:8081"
//const REDIRECT_URI = "exp://192.168.0.10:8081";
//const AUTH_URL = "http://192.168.0.10:1337/customer/auth?redirectUrl=http://192.168.0.10:8081/authcallback"
//const CLOWN_URL = "https://github.com/login/oauth/authorize?allow_signup=true&client_id=ab37ccfd44b552a7f961&redirect_uri=exp%3A%2F%192.168.0.10%8081%2Fauthcallback&scope=user%3Aemail&state=46x54el7qdq"
//const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user`;


const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const ADDRESS = process.env.DEV_ADDRESS;

  const [userInfo, setUserInfo] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder
    console.log('Username:', username);
    console.log('Password:', password);

    // Fetch stuff
  };

  const handleRedirect = () => {
    navigation.navigate('Register');
  }

  const postOAUTH = async (code: string, state: string) => {
    try {
      //normal route doesnt work it enforces redirect to predetermined url so this is a work around
      const response = await fetch(`${ADDRESS}:1337/customer/auth?mobile=true`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"code": code, "state": state})
      });
      const result = await response.json();
      console.log(result)

    } catch (error) {
      console.error(error);
    }
  };

  const allInOne = async () => {
    try {
      const [redirectUrl, url, state]: string[] = await getOAUTH();
      const [ code ] = await redirectOAuth(redirectUrl, url, state);
      postOAUTH(code, state)
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
        label='Email'
        style={styles.input}
        left={<TextInput.Icon icon="email"/>}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        label='Password'
        secureTextEntry={true}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />

      <PaperButton
        mode='contained'
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Login
      </PaperButton>
      <PaperButton
        mode='contained'
        style={styles.buttonSecondary}
        labelStyle={styles.buttonTextSecondary}
        onPress={handleRedirect}

      >
        Register
      </PaperButton>
      <Text style={{ marginVertical: 10 }}>Or</Text>
      <PaperButton
        mode='contained'
        style={styles.buttonGoogle}
        labelStyle={{ color: 'white', fontWeight: 'bold' }}
        icon={'google'}
        onPress={allInOne}
      >
        Continue with Google
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
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
  },
  headerContainerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
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
  buttonSecondary: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28a745',
    justifyContent: 'center',
  },
  buttonTextSecondary: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonGoogle: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Login;
