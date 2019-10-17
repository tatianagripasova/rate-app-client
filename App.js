import React, {useState, useEffect }  from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import AddReview from "./components/AddReview";
import ImageButton from "./components/ImageButton";
import { defaultRegion, getLocationAsync } from "./utils/geolocation";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [region, setRegion] = useState(defaultRegion);

  const [restaurants, setRestaurants] = useState([]);
  const [modalMode, setModalMode] = useState(false);
  const[ currentRest, setCurrentRest] = useState({});

  useEffect(() => {
    getLocationAndRests();
  }, [])

  getLocationAndRests = async () => {
    const { region, status } = await getLocationAsync();
    setRegion(region);
    setPermission(status);

    const restsRaw = await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/restaurants/${region.latitude}/${region.longitude}`, {
      method: "GET"
    });
    const currentRests = await restsRaw.json();
    setRestaurants(currentRests);
    
  };

  const markers = restaurants.map(rest => (
    <Marker
      onPress={() => {
        setCurrentRest(rest);
      }}
      key={rest.googleId}
      coordinate={{
        latitude: rest.latitude,
        longitude: rest.longitude
      }}
      title={"title"}
      description={"description"} />
      )
  );

  const submitReview = async (review) => {
    setModalMode(false);
    await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/review`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review, 
        restaurant: currentRest
      })
    })
  };


  const hideReviewModal = () => {
    setModalMode(false)
  };


  return (
    <View style={styles.screen}>
      <MapView style={styles.map} region={region} showsUserLocation={true} showsMyLocationButton={true} >
      {markers}
      </MapView>
      <View style={styles.overlay}>
        <AddReview visible={modalMode} submitReview={submitReview} hideReviewModal={hideReviewModal}/>
        <ImageButton 
          source={require("./images/rate.png")}
          onPress={() => setModalMode(true)}
        />
        <ImageButton 
          source={require("./images/find.png")}
        />
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


