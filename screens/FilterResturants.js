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
            <Header header={styles.header} headerTitle={styles.title} title="Choose a Cuisine" />
            <View style={styles.wrapper}>
                <View style={styles.picker}>
                    <Picker
                        mode="dropdown"
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
                    <Header headerTitle={styles.title} title="Set a Price Level" />
                    <RadioForm
                        radio_props={radio_prices}
                        initial={price}
                        formHorizontal={true}
                        animation={true}
                        onPress={choosingPricing}
                        buttonColor={"#555454"}
                        selectedButtonColor={"#555454"}
                        labelStyle={styles.labelStyle}
                    />
                </View>
                <View style={{ flex: 1}}>
                    <ImageButton
                        imageStyle={styles.submitButtonImage}
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
    header: {
        marginBottom: 0
    },
    title: {
        fontFamily: "System",
        fontSize: 22,
        fontWeight: "300"
    },
    picker: {
        flex: 1,
        alignItems: "center",
        justifyContent: Platform.OS === "ios" ? "flex-start" : "center",
        marginBottom: 10,
    },
    itemStyle: {
        fontSize: 18,
        fontFamily: "System"
    },
    pickerStyle : {
        height: 51, 
        width: 200
    },
    labelStyle: {
        fontFamily: "System",
        fontSize: 16,
        fontWeight: "300",
        color: "#000000", 
        marginLeft: 0, 
        paddingLeft: 5, 
        marginRight: 20
    },
    formRests: {
        flex: Platform.OS === "ios" ? 1 : 2
    },
    submitButtonImage: {
        width: 100,
        height: 100
    },
    cancelButtonImage: {
        width: 35,
        height: 35
    }
});

export default FilterRestaurants;
