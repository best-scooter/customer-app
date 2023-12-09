import React, { useState, useEffect } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { generateMarkers } from '../functions/Markers';

import { getZones } from '../functions/FetchZones';
import { retrieveToken } from '../functions/SecureStore';

export default function App() {
  const [mapZones, setMapZones] = useState([]);
  const regionLat = 37.79;
  const regionLng = -122.43;
  const mapMarkers = generateMarkers(5, regionLat, regionLng, 0.1, -0.1); //0.1 -0.1 is the range between markers

  useEffect(() => {
    const handleGetZones = async () => {
      try {
        const token = await retrieveToken('jwtLogin');
        const zones = await getZones(token);
        console.log(zones);
        const polygonCoordinates = [
          { latitude: 56.1604, longitude: 15.5866 },
          { latitude: 56.1967, longitude: 15.6118 },
          { latitude: 56.2048, longitude: 15.6648 },
          { latitude: 56.2036, longitude: 15.7129 }
        ];
        setMapZones(polygonCoordinates);
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    handleGetZones();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      width: '100%',
      height: '100%'
    }
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 56,
          longitude: 15,
          latitudeDelta: 10,
          longitudeDelta: 10
        }}
      >
        {mapZones.length > 0 && (
          <Polygon
            coordinates={mapZones}
            fillColor="rgba(255, 255, 255, 0.5)"
            strokeColor="#000000"
            strokeWidth={2}
          />
        )}
        {mapMarkers}
      </MapView>
    </View>
  );
}
