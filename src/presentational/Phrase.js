import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { DataContext } from "../../screens/Home";
import FavoriteContainer from "../container/FavoriteContainer";

export default function Phrase({checkIfFavoriteExists}) {

    const {phrase} = useContext(DataContext);

    return (
        <View style={styles.container}>
            <Text style={styles.animatedText}>
                {phrase}
            </Text>
            <FavoriteContainer checkIfFavoriteExists={checkIfFavoriteExists} />
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