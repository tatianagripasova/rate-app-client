import React, {useState, useEffect }  from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import AddReview from "./components/AddReview";
import FilterRestaurants from "./components/FilterResturants";
import ImageButton from "./components/ImageButton";
import { defaultRegion, getLocationAsync } from "./utils/geolocation";
import { radioRests, radioPrices } from "./utils/filter";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [region, setRegion] = useState(defaultRegion);

  const [restaurants, setRestaurants] = useState([]);
  const [modalMode, setModalMode] = useState(false);
  const [filterModalMode, setFilterModalMode] = useState(true);

  const [currentRest, setCurrentRest] = useState({});
  const [filters, setFilters] = useState({
    cuisine: 0, 
    price: 1
  });

  useEffect(() => {
    getLocation();
  }, [])

  useEffect(() => {
    getRests();
  }, [region, filters])

  getLocation = async () => {
    const { region, status } = await getLocationAsync();
    setRegion(region);
    setPermission(status);
  };

  getRests = async () => {
    const restsRaw = await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/restaurants/${region.latitude}/${region.longitude}/${radioRests[filters.cuisine]}/${radioPrices[filters.price]}`, {
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
      title={rest.name}
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

  const applyFilters = (settings) => {
    setFilters(settings);
    setFilterModalMode(false);
  }

  const hideReviewModal = () => {
    setModalMode(false)
  };

  const hideFilterModal = () => {
    setFilterModalMode(false)
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion)
  };

  return (
    <View style={styles.screen}>
      <MapView style={styles.map} region={region} onRegionChange={onRegionChange} showsUserLocation={true} showsMyLocationButton={true} >
      {markers}
      </MapView>
      <View style={styles.overlay}>
        <FilterRestaurants visible={filterModalMode} applyFilters={applyFilters} hideFilterModal={hideFilterModal} filters={filters}/>
        <AddReview visible={modalMode} name={currentRest.name} submitReview={submitReview} hideReviewModal={hideReviewModal}/>
        <ImageButton 
          source={require("./images/rate.png")}
          onPress={() => setModalMode(true)}
        />
        <ImageButton 
          source={require("./images/find.png")}
          onPress={() => setFilterModalMode(true)}
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


