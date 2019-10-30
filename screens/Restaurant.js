import React from "react";
import { View, StyleSheet, Text, ScrollView}  from "react-native";
import Modal from "react-native-modal";
import ImageButton from "../components/ImageButton";
import Card from "../components/Card";
import Header from "../components/Header";
import Rating from "../components/Rating";

const Restaurant = props => {
    const Review = props.restaurant.reviews.sort((a,b) => b.id - a.id).map((rev, i) => (
        <Card key={rev.id} idx={i} rev={rev} />
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
            <View style={styles.container}>
                <View style={styles.titles}>
                    <Header
                        title={props.restaurant.name} 
                    />
                    <Rating 
                        rating={props.restaurant.rating} 
                        text={"by Google"} 
                    />
                    {props.restaurant.userRating && (<Rating 
                        rating={props.restaurant.userRating || 0}
                        text={"Your Rating"}
                    />)}
                </View>
                <View style={{ flex: props.restaurant.reviews.length ? 4 : 1 }} >
                    <ScrollView contentContainerStyle={{marginTop: 20}}>
                        {Review} 
                    </ScrollView>
                </View>
                <View style={styles.rateView}>
                    <ImageButton 
                        source={require("../images/rate.png")}
                        onPress={props.openRateModalMode}
                    />
                </View>
                <View style={styles.closeView}>
                    <ImageButton 
                        imageStyle={styles.cancelButtonImage}
                        source={require("../images/cancel.png")}
                        onPress={props.hideRestaurantModal}
                    />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        alignItems: "center"
    },
    container: {
        flex: 1,
        width: '100%'
    },
    titles: {
        flex: 2,
    },
    textRating: {
        fontSize: 18, 
        margin: 5
    },
    text: {
        fontSize: 26, 
        color: "#000000"
    },
    rateView: {
        flex: 1
    }, 
    closeView: {
        flex: 1
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default Restaurant;