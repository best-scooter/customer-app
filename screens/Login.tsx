import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  TextInput,
  Button as PaperButton,
  IconButton
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getOAUTH } from '../functions/FetchOAuth';
import { redirectOAuth } from '../functions/FetchOAuth';
import { postOAUTH } from '../functions/FetchOAuth';

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
  };

  const allInOne = async () => {
    try {
      const [redirectUrl, url, state]: string[] = await getOAUTH();
      const [code] = await redirectOAuth(redirectUrl, url, state);
      const token = await postOAUTH(code, state);
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

export default Login;
