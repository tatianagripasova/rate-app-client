import React from "react";
import { View, StyleSheet, Text}  from "react-native";
import Modal from "react-native-modal";
import ImageButton from "./ImageButton";

const Restaurant = props => {
    return (
        <Modal 
            onModalHide={props.onModalHide}
            isVisible={props.visible} 
            style={styles.modal}
            coverScreen={true} 
            backdropColor={"white"} 
            backdropOpacity={1}
        >
            <View style={styles.header}>
                <Text style={styles.text}>{props.restaurant.name}</Text>
            </View>
            <View>
                <Text>Google Rating: {props.restaurant.rating}</Text>
                <Text>Your Rating:{props.restaurant.userRating || 'Not rated'}</Text>
            </View>
            <ImageButton 
                source={require("../images/rate.png")}
                onPress={props.openRateModalMode}
            />
            <ImageButton style={styles.cancelButton} 
                imageStyle={styles.cancelButtonImage}
                source={require("../images/cancel.png")}
                onPress={props.hideRestaurantModal}
        />
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1, 
        alignItems: "center"
    }, 
    header: {
        width: "100%", 
        height: 90, 
        paddingTop: 30, 
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 26, 
        color: "black"
    },
    cancelButton: {
        bottom: 10
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default Restaurant;