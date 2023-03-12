import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ImageBackgroundPicker({ callback, setBgModalVisible }) {

    return (
        <TouchableOpacity style={styles.touchable} onPress={() => {
            callback();
            setBgModalVisible(false);
        }}>
            <Text style={styles.text}>Usa una foto de tu galería</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    touchable: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 16,
        marginBottom: 12,
    },
    text: {
        marginLeft: 12,
        color: "white"
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
    }
})