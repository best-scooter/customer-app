import React, { useState, useEffect, useRef } from 'react';
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
  const [Scooters, setScooters] = useState([])

  const socketRef = useRef(null)

  useEffect(() => {
    console.log('rent is loading in');
    const retrieveTokenAsync = async () => {
      const token = await retrieveToken('jwtLogin');

      if (!token) {
        console.log('no token redirecting');
        // @ts-ignore
        navigation.navigate('Login');
      }
    };

    retrieveTokenAsync();
  }, []);

  useEffect(() => {
    const retrieveTokenAsync = async () => {
      const token2 = await retrieveToken('jwtLogin');

      if (!token2) {
        console.log('no token redirecting');
        // @ts-ignore
        navigation.navigate('Login');
      }
    };

    retrieveTokenAsync();
    
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

    const getWebSocketScooters = async () => {
      const storedToken = await retrieveToken('jwtLogin');

      const token = String(storedToken).trim();

      const retrieveTokenAsync = async () => {
        const token2 = await retrieveToken('jwtLogin');
  
        if (!token2) {
          console.log('no token redirecting');
          // @ts-ignore
          navigation.navigate('Login');
        }
      };
  
      retrieveTokenAsync();
      console.log(token)
      socketRef.current = new WebSocket('ws://192.168.0.10:8081', token)
  
      socketRef.current.onmessage = (event) => {
        const receivedData = JSON.parse(event.data)


        if (receivedData['remove']) {
          setScooters((prevScooters) => {
            return prevScooters.filter(
              (scooter) => scooter.scooterId !== receivedData.scooterId
            );
          });
          return;
        }
  
        const evalInvalidPosition =
          receivedData['positionX'] === undefined ||
          receivedData['positionY'] === undefined
        console.log(evalInvalidPosition)
  
        if (evalInvalidPosition) {
          return
        }
        console.log('Received:', event.data)
  
        setScooters((prevScooters) => {
          const scooterIndex = prevScooters.findIndex(
            (scooter) => scooter.scooterId === receivedData.scooterId,
          )

          if (scooterIndex !== -1) {
            return prevScooters.map((scooter, index) =>
              index === scooterIndex
                ? {
                    ...scooter,
                    positionX: receivedData.positionX,
                    positionY: receivedData.positionY,
                  }
                : scooter,
            )
          } else {
            return [
              ...prevScooters,
              {
                scooterId: receivedData.scooterId,
                positionX: receivedData.positionX,
                positionY: receivedData.positionY,
              },
            ]
          }
        })
      }
  
      socketRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error)
      }
  
      socketRef.current.onopen = () => {
        console.log('WebSocket Connected')
        const data = {
          message: 'subscribe',
          subscriptions: ['scooterLimited'],
        }
        socketRef.current.send(JSON.stringify(data))
      }
  
      socketRef.current.onclose = () => {
        console.log('WebSocket Connection Closed')
      }
  
      return () => {
        console.log('Cleaning up WebSocket Connection')
        socketRef.current.close()
      }
    }
    getWebSocketScooters()
    
  }, [])

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
        {Scooters.map((scooter, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: scooter.positionY,
              longitude: scooter.positionX,
            }}
          >
            {/* You can customize the marker content as needed */}
            <Callout>
              <View>
                <Text>Scooter ID: {scooter.scooterId}</Text>
                {/* Add more details as needed */}
              </View>
            </Callout>
          </Marker>
        ))}

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
