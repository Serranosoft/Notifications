import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native"
import { DataContext } from "../../utils/DataContext";
import FavoriteContainer from "../Favorite/FavoriteContainer";

export default function Phrase({ phrase }) {

    const {category, practiceMode} = useContext(DataContext);

    return (
        <View style={styles.container}>
            <Text style={styles.animatedText}>
                { category === "Favoritos" && !phrase ? "No tienes ninguna frase favorita" : phrase }
            </Text>
            { phrase && !practiceMode ? <FavoriteContainer phrase={phrase} /> : <></>}
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
        fontFamily: "Hubhead",
        textAlign: "center",
        fontSize: 20,
        color: "white",
        lineHeight: 21.5
    },
})