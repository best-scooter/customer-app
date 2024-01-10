import React, { useState, useEffect } from 'react';
import MapView, { Polygon, Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { generateMarkers, generateScooterMarkers } from '../functions/Markers';

import { getZones } from '../functions/FetchZones';
import { retrieveToken } from '../functions/SecureStore';
import { getScooter, getAllScooters } from '../functions/FetchScooter';

export default function App() {
  const [mapZones, setMapZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [ScooterMarkers, setScooterMarkers] = useState([]);
  //const regionLat = 37.79;
  //const regionLng = -122.43;
  //const mapMarkers = generateMarkers(5, regionLat, regionLng, 0.1, -0.1); //0.1 -0.1 is the range between markers

  useEffect(() => {
    const handleGetZones = async () => {
      try {
        const token = await retrieveToken('jwtLogin');
        const zonesResponse = await getZones(token);
        const zones = zonesResponse.data;

        if (zones.length > 0) {
          const mappedZones = zones.map((zone) => ({
            coordinates: zone.area.map((point) => ({
              latitude: point[0],
              longitude: point[1]
            })),
            type: zone.type,
            name: zone.name,
            description: zone.description
          }));
          setMapZones(mappedZones);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    handleGetZones();
  }, []);

  useEffect(() => {
    /**
     * gets all AVAILABLE scooters
     */
    const handleGetScooters = async () => {
      try {
        const token = await retrieveToken('jwtLogin');
        const allScooters = await getAllScooters(token);
        if (allScooters && allScooters.length > 0) {
          console.log('All scooters retrieved succesfuly');
          const availableScooters = allScooters.filter(
            (item) => item.available === true
          );
          console.log('Available scooters: ', availableScooters);
          const availableScootersMarkers =
            generateScooterMarkers(availableScooters);
          setScooterMarkers(availableScootersMarkers);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };

    handleGetScooters();
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
        {mapZones.map((zone: any, index: number) => (
          <React.Fragment key={index}>
            <Polygon
              coordinates={zone.coordinates}
              fillColor="rgba(255, 255, 255, 0.5)"
              strokeColor="#000000"
              strokeWidth={2}
              onPress={() => setSelectedZone(zone)}
            />
            <Marker
              coordinate={zone.coordinates[0]}
              onPress={() => setSelectedZone(zone)}
            >
              <Callout>
                <View>
                  <Text>Name: {zone.name}</Text>
                  <Text>Type: {zone.type}</Text>
                  <Text>Description: {zone.description}</Text>
                </View>
              </Callout>
            </Marker>
          </React.Fragment>
        ))}

        {ScooterMarkers}

        {selectedZone && (
          <Marker coordinate={selectedZone.coordinates[0]}>
            <Callout>
              <View>
                <Text>Name: {selectedZone.name}</Text>
                <Text>Type: {selectedZone.type}</Text>
                <Text>Description: {selectedZone.description}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
}
