import MapView, { Marker } from 'react-native-maps';
import { RandomFloat } from './Helpers';

//todo change away from export default

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
  //
}

export function placeStations(): JSX.Element[] {
  const markers: JSX.Element[] = [];
}
