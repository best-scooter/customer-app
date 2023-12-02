import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const Home = () => {
  // Placeholder just getting landing page setup
  const headline = 'Svenska Elsparkcyklar AB';
  const description = 'This is a placeholder with amazing text dud.';

  return (
    <ImageBackground
      source={require('../assets/HomePageLander.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome to the App</Text>
          </View>

          <View style={styles.news}>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  news: {
    alignItems: 'center',
    marginBottom: 20
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Home;
