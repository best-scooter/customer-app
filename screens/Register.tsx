import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { styles } from '../components/Styles';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = () => {
    // Placeholder
    console.log('Username:', username);
    console.log('Username:', username);
    console.log('Password:', password);
    // Fetch stuff
  };

  return (
    <ImageBackground
      source={require('../assets/55.jpg')}
      style={styles.background}
    >
      <View style={(styles.container, styles.overlay)}>
        <Text style={styles.headerContainerText}>Register</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          label="User name"
          secureTextEntry={true}
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
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
        <TextInput
          value={password2}
          onChangeText={setPassword2}
          label="Confirm password"
          secureTextEntry={true}
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
        />

        <PaperButton
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Register
        </PaperButton>
      </View>
    </ImageBackground>
  );
};

export default Register;
