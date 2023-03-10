import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"

export default function Phrase({phrase, checkIfFavoriteExists}) {


    function addFavorite() {
        checkIfFavoriteExists(phrase);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.animatedText}>
                {phrase}
            </Text>
            <TouchableOpacity onPressIn={() => {
                addFavorite();
            }}>
                <Text style={{color: "white"}}>Añadir a fav</Text>
            </TouchableOpacity>
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
        textAlign: "center",
        fontSize: 20,
        color: "white",
        marginBottom: 16
    },
})