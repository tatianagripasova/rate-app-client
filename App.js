import React, {useState, useEffect, useContext }  from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import MapView, { Marker } from "react-native-maps";
import DialogInput from "react-native-dialog-input";
import { getDistance } from "geolib";

import AddReview from "./screens/AddReview";
import FilterRestaurants from "./screens/FilterResturants";
import Restaurant from "./screens/Restaurant";
import ImageButton from "./components/ImageButton";
import ReviewContext from "./context/review-context";
import { defaultRegion, getLocationAsync } from "./utils/geolocation";
import { radioRests, radioPrices } from "./utils/filter";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [user, setUser] = useState("none");
 
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
    getEmailFromStorage();
  }, [])

  useEffect(() => {
    getRests();
  }, [region, filters, user])

  useEffect(() => {
    if (Object.keys(currentRest).length && restaurants.length) {
      const newCurrentRest = restaurants.find(r => r.googleId === currentRest.googleId);
      if (newCurrentRest) {
        setCurrentRest(newCurrentRest);
      }
    }
  }, [restaurants]);

  const getEmailFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("userEmail");

      if(value !== null) {
        setUser(value);
        setEmailDialog(false);
      } else {
        setEmailDialog(true);
      }
    } catch(e) {
      setEmailDialog(true);
    }
  };

  const getLocation = async () => {
    const { region, status } = await getLocationAsync();
    setRegion(region);
    setPermission(status);
  };

  const getRests = async () => {
    if (user !== "none" && getDistance(defaultRegion, region) > 200) {
      if (user) {
        const restsRaw = await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/restaurants/${region.latitude}/${region.longitude}/${radioRests[filters.cuisine]}/${filters.price + 1}`, {
          method: "GET",
          headers: {
            "App-User": user
          }
        });
        const currentRests = await restsRaw.json();
        setRestaurants(currentRests);
      } else {
        setEmailDialog(true);
      }
    }
  }; 

  const markers = restaurants.map(rest => (
    <Marker
      image={require("./images/marker.png")}
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
        'App-User': user
      },
      body: JSON.stringify({
        review, 
        restaurant: currentRest
      })
    })
    await getRests();
  };

  const deleteReview = async (revId) => {
    await fetch(`http://eb-dev2.us-east-2.elasticbeanstalk.com/review/${revId}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'App-User': user
      }
    })
    await getRests();
  }; 

  const submitEmailInput = async (inputText) => {
    setUser(inputText);
    await AsyncStorage.setItem("userEmail", inputText);
    setEmailDialog(false); 
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

  const onRegionChangeComplete = async (newRegion) => {
    await setRegion(newRegion);
  };

  const openRateModalMode = () => {
    setRestaurantModalMode(false);
    setRateModalMode(true); 
  };

  const onModalHide = () => {
    if (rateModalMode) {
      setRealRateModalMode(true);
    }
  };

  return (
    <View style={styles.screen}>
      <DialogInput 
        textInputProps={{ keyboardType: "email-address" }}
        isDialogVisible={emailDialog}
        title={"Please enter your email"}
        submitInput={submitEmailInput}
        closeDialog={() => {setEmailDialog(false)}}
      >
      </DialogInput>
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
        <ReviewContext.Provider value={{deleteReview}}>
          <Restaurant 
            visible={restaurantModalMode}
            restaurant={currentRest}
            hideRestaurantModal={hideRestaurantModal}
            openRateModalMode={openRateModalMode}
            onModalHide={onModalHide}
          />
        </ReviewContext.Provider>
        <ImageButton 
          source={require("./images/find.png")} 
          onPress={() => { user && user !== "none" ? setFilterModalMode(true) : setEmailDialog(true); }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    fontFamily: "System", 
    fontSize: 18
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
  }
});
