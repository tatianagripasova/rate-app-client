import React, { useContext }  from "react"
import { View, StyleSheet, Text } from "react-native"
import ImageButton from "./ImageButton";
import ReviewContext from "../context/review-context";

const Card = props => {
    const { deleteReview } = useContext(ReviewContext);
    const deleteRev = () => {
        deleteReview(props.rev.id)
    };
    return(
        <View style={{...styles.card, ...props.style}}>
            <Text style={styles.rating}>{props.rev.rate}</Text>
            <Text style={styles.description}>{props.rev.description}</Text>
            <View>
                <ImageButton 
                    source={require("../images/cancel.png")}
                    imageStyle={styles.cancelButtonImage}
                    title="remove"
                    onPress={deleteRev}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "center",
        width: 350,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 }, 
        shadowRadius: 6,
        shadowOpacity: 0.26, 
        backgroundColor: "white",
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 10

    }, 
    rating: {
        flex: 1,
        color: "black", 
        fontSize: 16, 
        marginBottom: 10
    }, 
    description: {
        flex: 3,
        fontSize: 16, 
    },
    cancelButtonImage: {
        flex: 1,
        width: 30,
        height: 30
    }
});

export default Card;