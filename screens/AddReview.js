import React, { useState } from "react";
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { AirbnbRating } from 'react-native-ratings';
import ImageButton from "../components/ImageButton";
import Input from "../components/Input";
import Header from "../components/Header";

const DEFAULT_RATING = 4;
const height = Math.round(Dimensions.get('window').height) - 50;

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

    const returnFromKeyboard = async() => {
        Keyboard.dismiss();
    }

    return (
        <Modal
            style={styles.modal} 
            isVisible={props.visible} 
            backdropColor={"#EBEBEB"} 
            backdropOpacity={0.97} 
        >
            <TouchableWithoutFeedback 
                onPress={Keyboard.dismiss} 
                accessible={false}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Header
                            header={styles.header}
                            headerTitle={styles.title}
                            title={props.name}
                        />
                        <AirbnbRating 
                            selectedColor="#000000"
                            reviewColor="#000000"
                            reviewSize={22}
                            size={24}
                            starContainerStyle={ {marginTop: 7} }
                            defaultRating={DEFAULT_RATING} 
                            onFinishRating={onFinishRating}
                        />
                        <View style={styles.inputContainer}>
                                <Input
                                    placeholder="Your review here." 
                                    style={styles.input} 
                                    onSubmitEditing={returnFromKeyboard}
                                    onChangeText={addDescriptionHandler}
                                    blurOnSubmit={true}
                                    value={description}
                                    multiline={true}
                                />   
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.submit}>
                            <ImageButton
                                imageStyle={styles.submitButton}
                                onPress={submitForm}
                                source={require("../images/submit.png")}
                            />
                        </View>
                        <View style={styles.cancel}>
                            <ImageButton
                                imageStyle={styles.cancelButtonImage}
                                source={require("../images/cancel.png")}
                                onPress={() => {props.hideReviewModal()}}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        width: "100%",
        minHeight: height,
        height: height
    },
    header: {
        marginBottom: 30
    },
    title: {
        fontFamily: "System",
        fontSize: 22,
        fontWeight: "300"
    },
    content: {
        flex: 3
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000"
    },
    inputContainer: {
        alignItems: "center"
    },
    input: {
        textAlign: "center",
        marginBottom: 10,
        width: "100%",
        minHeight: 80, 
        maxHeight: 160, 
        height: "auto",
        fontFamily: "System",
        fontSize: 16,
        lineHeight: 30, 
        textAlign: "left",
        borderColor: "#555454"
    },
    buttonContainer: {
        flex: 2
    },
    submit: {
        flex: 1
    },
    submitButton: {
        width: 90, 
        height: 90
    },
    cancel: {
        flex: 1,
        paddingTop: 30
    },
    cancelButtonImage: {
        width: 35,
        height: 35,
        paddingTop: 30
    }
});

export default AddReview;
