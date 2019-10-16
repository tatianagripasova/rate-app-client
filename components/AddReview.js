import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ImageButton from "../components/ImageButton"



const AddReview = props => {
    const [addedReview, setReview] = useState(""); 

    return (
        <Modal  style={styles.modal} isVisible={props.visible} >
            <View style={styles.header}>
                <Text style={styles.text}>Russian Tea</Text>
            </View>
            <AirbnbRating />
            <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Text review here" 
                        style={styles.input} 
                        // onChangeText={}
                        // value={}
                    />
            </View>
                <ImageButton style={styles.submitButton} onPress={() => {props.submitReview()}}
                  source={require("../images/submit.png")}
                />
                <ImageButton style={styles.cancelButton} imageStyle={styles.cancelButtonImage}
                    source={require("../images/cancel.png")}
                    onPress={() => {props.hideReviewModal()}}
                />
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
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
        color: "white"
    },
    inputContainer: {
        top: 50,
        alignItems: "center"
    },
    input: {
        width: "60%",
        borderColor: "black",
        borderWidth: 1, padding: 10,
        marginBottom: 10
    },
    submitButton: {
        top: 100,
        alignItems: "center", 
        justifyContent: "center"
    }, 
    cancelButton: {
        top: 50,
        alignItems: "center", 
        justifyContent: "center"
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default AddReview;
