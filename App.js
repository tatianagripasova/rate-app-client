import React, {useState, useEffect }  from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { getDistance } from "geolib";
import { Authenticate } from "react-native-expo-auth";
import AddReview from "./screens/AddReview";
import FilterRestaurants from "./screens/FilterResturants";
import Restaurant from "./screens/Restaurant";
import ImageButton from "./components/ImageButton";
import ReviewContext from "./context/review-context";
import { defaultRegion, getLocationAsync } from "./utils/geolocation";
import { radioRests } from "./utils/filter";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [authDialog, setAuthDialog] = useState(false);
  const [token, setToken] = useState("none");
  const [logins, setLogins] = useState([]);
 
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
    getTokenAndEmailFromStorage();
  }, [])

  useEffect(() => {
    getRests();
  }, [region, filters, token])

  useEffect(() => {
    if (Object.keys(currentRest).length && restaurants.length) {
      const newCurrentRest = restaurants.find(r => r.googleId === currentRest.googleId);
      if (newCurrentRest) {
        setCurrentRest(newCurrentRest);
      }
    }
  }, [restaurants]);

  const getTokenAndEmailFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const logins = await AsyncStorage.getItem("logins");
      if(token !== null) {
        setToken(token);
        setLogins(JSON.parse(logins));
        setAuthDialog(false);
      } else {
        setAuthDialog(true);
      }
    } catch(e) {
      setAuthDialog(true);
    }
  };

  const getLocation = async () => {
    const { region, status } = await getLocationAsync();
    setRegion(region);
    setPermission(status);
  };

  const getRests = async () => {
    if (token !== "none" && getDistance(defaultRegion, region) > 200) {
      if (token) {
        const restsRaw = await fetch(`http://foodie.tips/restaurants/${region.latitude}/${region.longitude}/${radioRests[filters.cuisine]}/${filters.price + 1}`, {
          method: "GET",
          headers: {
            "Auth-Token": token
          }
        });
        if(restsRaw.status === 401) {
          setAuthDialog(true);
        } else {
          const currentRests = await restsRaw.json();
          setRestaurants(currentRests);
        }
      } else {
        setAuthDialog(true);
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
    await fetch("http://foodie.tips/review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Auth-Token": token
      },
      body: JSON.stringify({
        review, 
        restaurant: currentRest
      })
    })
    await getRests();
  };

  const deleteReview = async (revId) => {
    await fetch(`http://foodie.tips/review/${revId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Auth-Token": token
      }
    })
    await getRests();
  };

  const submitAuth = async(data, route) => {
    const signUpRaw = await fetch(`http://foodie.tips/${route}`, {
      method: "POST", 
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(data)
    });
    if(signUpRaw.status !== 200) {
      return {
        success: false,
        error: await signUpRaw.text()
      };
    }
    const { token, emails } = await signUpRaw.json();
    if (token) {
      setToken(token);
      setLogins(emails);
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("logins", JSON.stringify(emails));
      setAuthDialog(false);
    }
    return {
      success: true
    };
  };

  const submitSignUp = async (data) => await submitAuth(data, "signup");

  const submitSignIn = async (data) => await submitAuth(data, "signin");

  const submitBioLogin = async (data) => await submitAuth(data, "biologin");

  const submitPinCodeRequest = async (data) => await submitAuth(data, "reset");

  const submitNewPassword = async (data) => await submitAuth(data, "doreset");

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
    if (getDistance(region, newRegion) > 300) {
      await setRegion(newRegion);
    }
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
      <Authenticate 
        visible={authDialog}
        onLogin={submitSignIn} 
        onSignUp={submitSignUp}
        onBioLogin={submitBioLogin}
        onPinCodeRequest={submitPinCodeRequest}
        onSubmitNewPassword={submitNewPassword}
        logins={logins}
        enableBio={true}
      />
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
          onPress={() => { token && token !== "none" ? setFilterModalMode(true) : setAuthDialog(true); }}
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
