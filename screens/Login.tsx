import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button as PaperButton, IconButton } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//for oauth internet access
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";



const REDIRECT_URI = "exp://192.168.0.10:8081"
const AUTH_URL = "http://192.168.0.10:1337/customer/auth?redirectUrl=http://192.168.0.10:3000/authcallback"
const CLOWN_URL = "https://github.com/login/oauth/authorize?allow_signup=true&client_id=ab37ccfd44b552a7f961&redirect_uri=http%3A%2F%192.168.0.10%3A3000%2Fauthcallback&scope=user%3Aemail&state=46x54el7qdq"

const Login = () => {
  const navigation = useNavigation();

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

  const handleOAUTH = async () => {
    try {
      const redirectUrl = Linking.createURL('/redirect');
      const result = await WebBrowser.openAuthSessionAsync(CLOWN_URL, redirectUrl);

      if (result.type === 'success') {
        const responseUrl = result.url;
        handleOAuthResponse(responseUrl);
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  const handleOAuthResponse = async (responseUrl: string) => {
    try {
      const redirect = await Linking.getInitialURL();
      const url = redirect ? redirect : responseUrl;

      if (url.includes('your-callback-url')) {
        // Extract necessary data
        // redirect to app
        Linking.openURL(url);
      }
    } catch (error) {
      console.error("OAuth response handling error:", error);
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
        onPress={handleOAUTH}
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
