import { StyleSheet, Text } from "react-native"

export default function Phrase({phrase}) {


    return (
        <>
            <Text style={styles.animatedText}>
                "{phrase}"
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    animatedText: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.48)",
        borderRadius: 15,
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
})