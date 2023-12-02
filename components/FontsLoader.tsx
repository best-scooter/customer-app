import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
/**
 * Loads fonts since its annoying in react-native
 * @param param0
 * @returns
 */
const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf')
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded ? children : <Text>Loading...</Text>;
};

export default FontLoader;
