import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { RandomFloat } from './Helpers';
import { View, Text } from 'react-native';

type ScooterInputType = {
  data: [
    {
      id: number;
      positionX: number;
      positionY: number;
      battery: number;
      maxSpeed: number;
      charging: boolean;
      available: boolean;
      decomissioned: boolean;
      beingServiced: boolean;
      disabled: boolean;
      connected: boolean;
    }
  ];
};

export function generateMarkers(
  n: number,
  lat: number,
  lng: number,
  rangeFloor: number,
  rangeCeil: number
): JSX.Element[] {
  const markers: JSX.Element[] = [];
  for (let i = 1; i < n + 1; i++) {
    markers.push(
      <Marker
        key={'Marker' + i}
        coordinate={{
          latitude: lat + RandomFloat(rangeFloor, rangeCeil),
          longitude: lng + RandomFloat(rangeFloor, rangeCeil)
        }}
        title={'Title' + i}
      />
    );
  }
  return markers;
}

export function placeMarkers(mapItems: object): JSX.Element[] {
  const markers: JSX.Element[] = [];
  console.log(mapItems);
  return markers;
  //
}

/**
 * I dont know the magic typescript words for this
 * @param takes an Array of json, with scooter data
 * @returns JSX.Element aka map markers
 */
export function generateScooterMarkers(scootersData: ScooterInputType[]) {
  return scootersData.map((scooter) => (
    <Marker
      key={scooter.id}
      coordinate={{ latitude: scooter.positionX, longitude: scooter.positionY }}
      title={`Scooter ${scooter.id}`}
    >
      <Callout>
        <View>
          <Text>Scooter {scooter.id}</Text>
          <Text>Battery: {scooter.battery}</Text>
          <Text>Max Speed: {scooter.maxSpeed}</Text>
        </View>
      </Callout>
    </Marker>
  ));
}

export function placeStations(): JSX.Element[] {
  const markers: JSX.Element[] = [];
  return markers;
  //
}
