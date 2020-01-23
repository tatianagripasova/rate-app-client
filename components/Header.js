import React from "react"
import { View, Text, Platform, StyleSheet} from "react-native";

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
        marginTop: Platform.OS === "ios" ? 60 : 20, 
        marginBottom: 25,
        alignItems: "center",
        justifyContent: "center"
    }, 
    headerTitle: {
        color: "#000000", 
        fontSize: 26
    }
})

export default Header;