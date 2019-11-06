import React, { useState } from "react";
import { View, StyleSheet, Platform, Picker } from "react-native";
import Modal from "react-native-modal";
import RadioForm from "react-native-simple-radio-button";
import Header from "../components/Header";
import ImageButton from "../components/ImageButton";
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
        <Modal 
            style={styles.modal} 
            isVisible={props.visible} 
            coverScreen={true} 
            backdropColor={"#FFFFFF"}
            backdropOpacity={1} 
        >
            <Header title="Choose a Cuisine" />
            <View style={styles.wrapper}>
                <View style={styles.picker}>
                    <Picker
                        itemStyle={styles.itemStyle}
                        style={styles.pickerStyle}
                        selectedValue={cuisine}
                        onValueChange={choosingCuisine}
                    >
                    {radioRests.map((food, i) => 
                        (<Picker.Item key={i} label={food} value={i} />))
                    }
                    </Picker>
                </View>
                <View style={styles.formRests}>
                    <Header title="Set a price level" />
                    <RadioForm
                        radio_props={radio_prices}
                        initial={price}
                        formHorizontal={true}
                        animation={true}
                        onPress={choosingPricing}
                        buttonColor={"#000000"}
                        selectedButtonColor={"#000000"}
                        labelStyle={styles.labelStyle}
                    />
                </View>  
                <View style={{ flex: 1}}>
                    <ImageButton 
                        source={require("../images/submit.png")} 
                        onPress={applyFilters} 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <ImageButton
                        imageStyle={styles.cancelButtonImage}
                        source={require("../images/cancel.png")}
                        onPress={props.hideFilterModal}
                    />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1, 
        alignItems: "center"
    }, 
    wrapper: {
        flex: 1
    },
    picker: {
        flex: 1,
        alignItems: "center", 
        marginBottom: 10
    },
    itemStyle: {
        fontSize: 22,
        fontFamily: "System"
    },
    pickerStyle : {
        height: 51, 
        width: 200
    },
    labelStyle: {
        fontSize: 18,
        color: "#000000", 
        marginLeft: 0, 
        paddingLeft: 5, 
        marginRight: 20
    },
    formRests: {
        flex: Platform.OS === "ios" ? 1 : 2
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default FilterRestaurants;
