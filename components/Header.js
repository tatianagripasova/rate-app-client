import React from "react"
import { View, Text, StyleSheet} from "react-native";

const Header = props => {
    return (
        <View style={{ ...styles.header, ...props.header }}>
            <Text 
                style={{ ... styles.headerTitle, ...props.headerTitle}}
            >
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 'auto',
        marginTop: 60, 
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center"
    }, 
    headerTitle: {
        color: "#000000", 
        fontSize: 26
    }
})

export default Header;