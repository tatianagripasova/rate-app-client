import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;

const Input = props => {
    return <TextInput {...props} style={{ ...styles.input, ...props.style }} />

};
 
const styles = StyleSheet.create({
    input: {
        color: "#000000",
        width: width * 0.8,
        height: 40, 
        padding: 10,
        borderColor: "#000000",
        borderWidth: 1,
        marginTop: 40
    }
});

export default Input;