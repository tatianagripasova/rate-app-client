import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [permission, setPermission] = useState(false);
  const [lattitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [region, setRegion] = useState({
    latitude: 16.704070,
    longitude: -2.411928,
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421
  });


  useEffect(() => {
    _getLocationAsync();
  }, [])

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    setPermission(status === 'granted');
  
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    setRegion(
      { latitude: location.coords.latitude, 
        longitude: location.coords.longitude, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }
    )
  };


  return (
    <MapView style={styles.map} region={region}/>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  map: {
    flex: 1
  }
});


