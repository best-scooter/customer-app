import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { styles } from '../components/Styles';

const Home = () => {
  const headline = 'Svenska Elsparkcyklar AB';
  const description = 'View all the bikes on the map and rent one for yourself';

  const styles2 = StyleSheet.create({
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
          <TouchableOpacity style={styles2.button}>
            <Text style={styles2.buttonText}>Explore More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;
