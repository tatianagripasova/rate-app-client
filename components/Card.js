import React, { useContext }  from "react"
import { View, StyleSheet, Text } from "react-native"
import ImageButton from "./ImageButton";
import ReviewContext from "../context/review-context";
import { AirbnbRating } from "react-native-ratings";
import moment from "moment";

const Card = props => {
    const { deleteReview } = useContext(ReviewContext);
    const deleteRev = () => {
        deleteReview(props.rev.id)
    };
    const rawDate = props.rev.createdAt;
    const formattedDate = moment(rawDate).fromNow();
    return(
        <View style={styles.card}>
            <View style={styles.reviewWrapper}>
                <View style={styles.review}>
                    <View style={styles.rating}>
                        <View style={styles.reviewDataWrapper}>
                            <View style={styles.airbnbRatingContainer}>
                                <AirbnbRating
                                    showRating={false}
                                    size={15}
                                    isDisabled={true}
                                    defaultRating={props.rev.rate}
                                    selectedColor="#000000"
                                />
                            </View>
                            <View style={{ flex: 1}}>
                                <Text 
                                    style={styles.text}
                                >
                                    {formattedDate}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <Text 
                            style={styles.text}
                        >   
                            {props.rev.description}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.cancelButton}>
                <ImageButton 
                    source={require("../images/trash.png")}
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
        borderBottomWidth: 1,
        borderBottomColor: "#555454"
    }, 
    reviewWrapper: {
        flex: 5,
        paddingTop: 5
    },
    review: {
        flex: 1
    },
    reviewDataWrapper: {
        flex:1, 
        flexDirection: "row", 
        margin: 7
    },
    airbnbRatingContainer: {
        flex:1, 
        alignItems:"flex-start"
    },
    rating: {
        flex: 1,
        color: "#000000"
    },
    text: {
        fontFamily: "System",
        fontSize: 18
    },
    description: {
        flex: 1, 
        paddingLeft: 0, 
        margin: 7
    },
    cancelButton: {
        flex: 1
    },
    cancelButtonImage: {
        width: 35,
        height: 35
    }
});

export default Card;