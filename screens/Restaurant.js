import React from "react";
import { View, StyleSheet, ScrollView }  from "react-native";
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
            backdropColor={"#ffffff"}
            backdropOpacity={1}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                        header={styles.header}
                        headerTitle={styles.title}
                        title={props.restaurant.name}
                    />
                    <View style={{ height: 80, marginBottom: 10 }}>
                        <Rating 
                            rating={props.restaurant.rating} 
                            text={"Google Rating"} 
                        />
                        {props.restaurant.userRating && (<Rating 
                            rating={props.restaurant.userRating || 0}
                            text={"Your Rating"}
                        />)}
                    </View>
                </View>
                <View style={{ flex: props.restaurant.reviews.length ? 3: 1}} >
                    <ScrollView contentContainerStyle={{ paddingBottom: 20}}>
                        {Review} 
                    </ScrollView>
                </View>
                <View style={styles.buttonView}>
                    <ImageButton 
                        imageStyle={styles.rateButtonImage}
                        source={require("../images/rate.png")}
                        onPress={props.openRateModalMode}
                    />
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
    headerContainer: {
        flex: 2
    },
    header: {
        marginBottom: 30
    },
    title: {
        fontFamily: "System",
        fontSize: 22,
        fontWeight: "300"
    },
    textRating: {
        fontFamily: "System",
        fontSize: 16
    },
    buttonView: {
        flex: 2,
        paddingTop: 30
    },
    rateButtonImage: {
        width: 90, 
        height: 90
    },
    cancelButtonImage: {
        width: 35,
        height: 35
    }
});

export default Restaurant;