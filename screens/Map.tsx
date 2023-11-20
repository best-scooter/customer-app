import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Markers from '../functions/Markers';
import Helpers from '../functions/Helpers';


export default function App() {
    const regionLat = 37.79
    const regionLng = -122.43
    const mapMarkers = Markers(3000, regionLat, regionLng, 0.1, -0.1) //0.1 -0.1 is the range between markers
    //console.log(mapMarkers)


    return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {mapMarkers}
          </MapView>
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
