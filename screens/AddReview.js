import React, { useState } from "react";
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ImageButton from "../components/ImageButton";
import Input from "../components/Input";
import Header from "../components/Header";

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
            rate: rating, 
            description
        }
        await props.submitReview(review);
        setDescription("");
        setRating(DEFAULT_RATING);
    }

    return (
        <Modal
            style={styles.modal} 
            isVisible={props.visible} 
            backdropColor={"#EBEBEB"} 
            backdropOpacity={0.9} 
        >
            <TouchableWithoutFeedback 
                onPress={Keyboard.dismiss} 
                accessible={false}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Header title={props.name}
                        />
                        <AirbnbRating 
                            selectedColor="#000000"
                            reviewColor="#000000"
                            reviewSize={26}
                            starContainerStyle={ {marginTop: 7} }
                            defaultRating={DEFAULT_RATING} 
                            onFinishRating={onFinishRating}
                        />
                        <View style={styles.inputContainer}>
                                <Input
                                    placeholder="Text review here" 
                                    style={styles.input} 
                                    onChangeText={addDescriptionHandler}
                                    value={description}
                                    multiline={true}
                                />
                        </View>
                    </View>
                    <View style={styles.submitView}>
                        <ImageButton 
                            onPress={submitForm}
                            source={require("../images/submit.png")}
                        />
                    </View>
                    <View style={styles.closeView}>
                        <ImageButton 
                            imageStyle={styles.cancelButtonImage}
                            source={require("../images/cancel.png")}
                            onPress={() => {props.hideReviewModal()}}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    content: {
        flex: 3
    },
    text: {
        fontSize: 26, 
        color: "#000000"
    },
    inputContainer: {
        alignItems: "center"
    },
    input: {
        textAlign: "center",
        marginBottom: 10,
        minHeight: 80, 
        maxHeight: 160, 
        height: "auto",
        fontSize: 20,
        lineHeight: 30, 
        textAlign: "left"
    },
    submitView: {
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

export default AddReview;
