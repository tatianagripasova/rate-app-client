import React, { useState } from "react";
import { View, Modal, TextInput, Button } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';



const AddReview = props => {
    const [addedReview, setReview] = useState("");

    

    return (
        <Modal visible={props.visible} animationType="slide">
            <View>
               <AirbnbRating />
                <TextInput
                    placeholder="Text review here" 
                    // style={styles.input} 
                    // onChangeText={}
                    // value={}
                />
                <Button title="Submit" onPress={() => {props.submitReview()}}/>

            </View>
        </Modal>
    )
}

export default AddReview;