import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import FavoriteContainer from "../container/FavoriteContainer";

export default function Phrase({phrase, checkIfFavoriteExists, favorites}) {

    return (
        <View style={styles.container}>
            <Text style={styles.animatedText}>
                {phrase}
            </Text>
            <FavoriteContainer checkIfFavoriteExists={checkIfFavoriteExists} phrase={phrase} favorites={favorites} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.48)",
        borderRadius: 15,
        alignItems: "center",
    },
    animatedText: {
        // fontFamily: "Arthead-Regular",
        textAlign: "center",
        fontSize: 20,
        color: "white",
        marginBottom: 16
    },
})