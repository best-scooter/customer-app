import MapView, { Marker } from 'react-native-maps';
import Helpers from './Helpers';

//todo change away from export default

function generateMarkers(n: number, lat:number, lng:number, rangeFloor:number, rangeCeil:number): JSX.Element[] {
    const markers: JSX.Element[] = [];
    for (let i = 1; i < n + 1; i++) {
        markers.push(
            <Marker
                key={'Marker' + i}
                coordinate={{latitude: (lat + Helpers(rangeFloor,rangeCeil)), longitude: (lng + Helpers(rangeFloor, rangeCeil))}}
                title={'Title' + i}
            />
        )
    }
    return markers
}

function placeMarkers(mapItems: object): JSX.Element[] {
    const markers: JSX.Element[] = [];
    //
}

export default generateMarkers;