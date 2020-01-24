import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Modal from "react-native-modal";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Ionicons } from '@expo/vector-icons';

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
            <View style={styles.selectContainer}>
                <Header header={styles.header} headerTitle={styles.title} title="Choose a Cuisine" />

                    <RNPickerSelect
                        placeholder={{}}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            }
                        }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-down" size={26} color="#555454" />;
                        }}
                        useNativeAndroidPickerStyle={false}
                        value={cuisine}
                        onValueChange={choosingCuisine}
                        items={radioRests.map((food, i) => ({ label: food, value: i }))}
                    />

                <Header header={styles.header} headerTitle={styles.title} title="Set a Price Level" />

                    <RNPickerSelect
                        placeholder={{}}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            }
                        }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-down" size={26} color="#555454" />;
                        }}
                        useNativeAndroidPickerStyle={false}
                        value={price}
                        onValueChange={choosingPricing}
                        items={radioPrices.map((price, i) => ({ label: price, value: i }))}
                    />
                
                    <ImageButton
                        imageStyle={styles.submitButtonImage}
                        source={require("../images/submit.png")} 
                        onPress={applyFilters} 
                    />
                
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.cancel}>
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
    selectContainer: {
        flex: 10
    },
    header: {
        marginBottom: 20
    },
    title: {
        fontFamily: "System",
        fontSize: 22,
        fontWeight: "300"
    },
    selectCuisine: {
        flex: 1
    },
    selectPrice: {
        flex: 1
    },
    buttonContainer: {
        flex: 2
    },
    submit: {
        flex: 1
    },
    submitButtonImage: {
        width: 100,
        height: 100
    },
    cancel: {
        flex: 1,
        paddingTop: 30
    },
    cancelButtonImage: {
        width: 35,
        height: 35
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: "System",
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#555454",
        borderRadius: 4,
        color: "#000000",
        paddingRight: 30,
        width: 350,
        height: 50
        },
        inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "#555454",
        borderRadius: 8,
        color: "#000000",
        paddingRight: 30,
        width: 300,
        height: 50
    }
});
  

export default FilterRestaurants;
