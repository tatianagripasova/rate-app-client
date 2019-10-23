import React, { useState } from "react";
import { View, StyleSheet, Button }  from "react-native";
import Modal from "react-native-modal";
import RadioForm from "react-native-simple-radio-button";
import Header from "./Header";
import ImageButton from "./ImageButton";
import { radioRests, radioPrices } from "../utils/filter";

const FilterRestaurants = props => {
    const [cuisine, setCuisine] = useState(props.filters.cuisine);
    const [price, setPrice] = useState(props.filters.price);

    const choosingCuisine = type => {
        setCuisine(type)
    };
    const choosingPricing = price => {
        setPrice(price);
    };

    const radio_rests = radioRests.map((food, i) => (
        { label: food, value: i }
    ));
    
    const radio_prices = radioPrices.map((price, i) => (
        { label: price, value: i }
    ));

    const applyFilters = () => {
        const settings = {
            cuisine,
            price
        };
        props.applyFilters(settings);
    };

    return (
        <Modal style={styles.modal} isVisible={props.visible} coverScreen={true} backdropColor={"white"} backdropOpacity={1} >
        <Header title="Choose a Cuisine" />
        <View>
            <RadioForm
            radio_props={radio_rests}
            initial={cuisine}
            animation={true}
            onPress={choosingCuisine}
            labelStyle={{ fontSize: 20, color: "black", margin: 10}}
            />
        </View>
        <Header title="Pricing" />
        <View style={styles.formRests}>
        <RadioForm
            radio_props={radio_prices}
            initial={price}
            formHorizontal={true}
            animation={true}
            onPress={choosingPricing}
            labelStyle={{ fontSize: 20, color: "black", margin: 5 }}
            />
        </View>  
        <ImageButton style={styles.submitButton}  
            source={require("../images/submit.png")} onPress={applyFilters} />
        <ImageButton style={styles.cancelButton} 
            imageStyle={styles.cancelButtonImage}
            source={require("../images/cancel.png")}
            onPress={props.hideFilterModal}
        />
        </Modal>
    )
};

styles = StyleSheet.create({
    modal: {
        flex: 1, 
        alignItems: "center"
    }, 
    formRests: {
        flex: 1,
        flexDirection: "row",
    },
    submitButton: {
        bottom: 50
    }, 
    cancelButton: {
        bottom: 10
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default FilterRestaurants;
