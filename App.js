import React, {useState, useEffect }  from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import AddReview from "./components/AddReview";
import FilterRestaurants from "./components/FilterResturants";
import Restaurant from "./components/Restaurant";
import ImageButton from "./components/ImageButton";
import { defaultRegion, getLocationAsync } from "./utils/geolocation";
import { radioRests, radioPrices } from "./utils/filter";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [region, setRegion] = useState(defaultRegion);

  const [restaurants, setRestaurants] = useState([]);
  const [rateModalMode, setRateModalMode] = useState(false);
  const [realRateModalMode, setRealRateModalMode] = useState(false);
  const [filterModalMode, setFilterModalMode] = useState(false);
  const [restaurantModalMode, setRestaurantModalMode] = useState(false);

  const [currentRest, setCurrentRest] = useState({ reviews: [] });
  const [filters, setFilters] = useState({
    cuisine: 0, 
    price: 3
  });

  useEffect(() => {
    getLocation();
  }, [])

  useEffect(() => {
    getRests();
  }, [region, filters])

  useEffect(() => {
    if (Object.keys(currentRest).length && restaurants.length) {
      const newCurrentRest = restaurants.find(r => r.googleId === currentRest.googleId);
      if (newCurrentRest) {
        setCurrentRest(newCurrentRest);
      }
    }
  }, [restaurants])

  getLocation = async () => {
    const { region, status } = await getLocationAsync();
    setRegion(region);
    setPermission(status);
  };

  getRests = async () => {
    const restsRaw = await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/restaurants/${region.latitude}/${region.longitude}/${radioRests[filters.cuisine]}/${filters.price + 1}`, {
      method: "GET"
    });
    const currentRests = await restsRaw.json();
    setRestaurants(currentRests);
  };

  const markers = restaurants.map(rest => (
    <Marker
      image={require("./images/cancel.png")}
      onPress={() => {
        setCurrentRest(rest);
      }}
      key={rest.googleId}
      coordinate={{
        latitude: rest.latitude,
        longitude: rest.longitude
      }}
      title={rest.name}
      description={`${rest.userRating ? 'Your' : 'Google'} rating: ${rest.userRating || rest.rating}`} 
      onCalloutPress={() => {
        setRestaurantModalMode(true);
      }}
      pointerEvents="auto"
      />
    ));

  const submitReview = async (review) => {
    setRateModalMode(false);
    setRealRateModalMode(false);
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
    getRests();
  };

  const applyFilters = (settings) => {
    setFilters(settings);
    setFilterModalMode(false);
  }

  const hideReviewModal = () => {
    setRateModalMode(false);
    setRealRateModalMode(false);
  };

  const hideFilterModal = () => {
    setFilterModalMode(false)
  };

  const hideRestaurantModal = () => {
    setRestaurantModalMode(false)
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion)
  };

  const openRateModalMode = () => {
    setRestaurantModalMode(false);
    setRateModalMode(true); 
  };

  const onModalHide = () => {
    if (rateModalMode) {
      setRealRateModalMode(true);
    }
  }

  return (
    <View style={styles.screen}>
      <MapView 
        style={styles.map}
        region={region} 
        onRegionChangeComplete={onRegionChangeComplete} 
        showsUserLocation={true} 
        showsMyLocationButton={true} 
      >
      {markers}
      </MapView>
      <View style={styles.overlay}>
        <FilterRestaurants
          visible={filterModalMode} 
          applyFilters={applyFilters} 
          hideFilterModal={hideFilterModal} 
          filters={filters}
        />
        <AddReview 
          visible={realRateModalMode} 
          name={currentRest.name} 
          submitReview={submitReview} 
          hideReviewModal={hideReviewModal}
        />
        <Restaurant 
          visible={restaurantModalMode}
          restaurant={currentRest}
          hideRestaurantModal={hideRestaurantModal}
          openRateModalMode={openRateModalMode}
          onModalHide={onModalHide}
        />
        <ImageButton 
          source={require("./images/find.png")}
          onPress={() => { setFilterModalMode(true); }}
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


