import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ImageButton from "../components/ImageButton"

const DEFAULT_RATING = 4;

const AddReview = props => {
    const [description, setDescription] = useState("");
    const [rating, setRating]= useState(DEFAULT_RATING);

    const addDescriptionHandler = inputValue => {
        setDescription(inputValue);
    };

    const onFinishRating = stars => {
        setRating(stars)
    };

    const submitForm = async() => {
        const review = {
            rating, 
            description
        }
        await props.submitReview(review);
        setDescription("");
        setRating(DEFAULT_RATING);
    }

    return (
        <Modal style={styles.modal} isVisible={props.visible} >
            <View style={styles.header}>
                <Text style={styles.text}>{props.name}</Text>
            </View>
            <AirbnbRating defaultRating={DEFAULT_RATING}  onFinishRating={onFinishRating}/>
            <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Text review here" 
                        style={styles.input} 
                        onChangeText={addDescriptionHandler}
                        value={description}
                    />
            </View>
                <ImageButton style={styles.submitButton} onPress={submitForm}
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
        top: 100
    }, 
    cancelButton: {
        top: 50
    },
    cancelButtonImage: {
        width: 60,
        height: 60
    }
});

export default AddReview;
