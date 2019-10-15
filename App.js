import React, {useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [permission, setPermission] = useState(false);
  const [region, setRegion] = useState({
    latitude: 16.704070,
    longitude: -2.411928,
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    _getLocationAsync();
  }, [])

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    setPermission(status === 'granted');
  
    let location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude
    // refactor 
    setRegion(
      { latitude: latitude,
        longitude: longitude, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }
    )

    const restsRaw = await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/restaurants/${latitude}/${longitude}`, {
      method: "GET"
    });
    const currentRests = await restsRaw.json();
    setRestaurants(currentRests);
    
  };

  const markers = restaurants.map(rest => (
    <Marker
      key={rest.googleId}
      coordinate={{
        latitude: rest.latitude,
        longitude: rest.longitude
      }}
      title={"title"}
      description={"description"} />
      )
  )

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} region={region} showsUserLocation={true} showsMyLocationButton={true} >
      {markers}
      </MapView>
      <View style={styles.overlay}>
        <TouchableOpacity>
          <Image 
            source={require("./images/rate.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image 
            source={require("./images/find.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  map: {
    flex: 1, 
    zIndex: -1
  }, 
  overlay: {
    position: "absolute", 
    flexDirection: "row", 
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    bottom: 150
  },
  button: {
    width: 50, 
    height: 20, 
    fontSize: 150
  }
});


