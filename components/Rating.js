import React from "react";
import { View, StyleSheet, Text}  from "react-native";
import { AirbnbRating } from "react-native-ratings";

const Rating = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.ratingNum}>
                <Text style={styles.ratingNumText}>{props.rating}</Text>
            </View>
            <View style={styles.rating}>
                <AirbnbRating 
                    showRating={false}
                    size={20}
                    isDisabled={true}
                    defaultRating={props.rating}
                    selectedColor="#000000"
                />
            </View>
            <View style={styles.text}>
                <Text style={styles.textRating}>{props.text}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "row",
        width: "100%"
    },
    ratingNum: {
        flex: 2,
        paddingLeft: 20
    },
    ratingNumText: {
        fontSize: 20
    },
    rating: {
        flex: 3
    },
    text: {
        flex: 5
    }, 
    textRating: {
        fontSize: 20,
        paddingLeft: 20
    }
});

export default Rating;