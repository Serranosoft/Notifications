import { StyleSheet, Text } from "react-native";

export default function MyText({children, center, title}) {


    return (
        <Text style={[styles.root, center ? styles.center: '', title ? styles.title : '']}>{children}</Text>
    )
}

const styles = StyleSheet.create({

    root: {
        fontFamily: "Hubhead",
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    title: {
        fontSize: 25,
    },
    center: {
        textAlign: "center"
    },
});