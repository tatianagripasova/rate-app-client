import React from "react";
import { View, StyleSheet, Text, ScrollView}  from "react-native";
import Modal from "react-native-modal";
import ImageButton from "../components/ImageButton";
import Card from "../components/Card";
import Header from "../components/Header";
import { Rating } from "react-native-ratings";

const Restaurant = props => {
    const Review = props.restaurant.reviews.sort((a,b) => b.id - a.id).map(rev => (
        <Card key={rev.id} rev={rev} />
    ));
    return (
        <Modal 
            onModalHide={props.onModalHide}
            isVisible={props.visible} 
            style={styles.modal}
            coverScreen={true} 
            backdropColor={"white"} 
            backdropOpacity={1}
        >
            <Header title={props.restaurant.name} />
            <View>
                <Text style={styles.textRating}>Google Rating: {props.restaurant.rating}</Text>
                <Text style={styles.textRating}>Your Rating: {props.restaurant.userRating || 'Not rated'}</Text>
            </View>
            <Header title="Your Rating" />
            <ScrollView>
               {Review} 
            </ScrollView>
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
    textRating: {
        fontSize: 18, 
        margin: 5
    }, 
    header: {
        width: "100%", 
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
    }, 
    scrollView: {
        width: "100%"
    }
});

export default Restaurant;