import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DataContext } from "../../utils/DataContext";

export default function Footer({setPracticeMode, setCatModalVisible}) {


    const {practiceMode, category} = useContext(DataContext)

    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={() => setCatModalVisible(true)}>
                        <View style={styles.touchableWrapper}>
                            <Image source={require("../../assets/menu.png")} style={styles.icon} />
                            <Text style={styles.text}>{category}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchable} onPress={() => setPracticeMode(true)}>
                        <Image source={require("../../assets/play.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                :
                <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: "7%",
        marginBottom: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%",
    },
    touchable: {
        height: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "rgba(0,0,0,0.48)",
        borderRadius: 16,
    },
    touchableWrapper: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontFamily: "Hubhead",
        marginLeft: 10,
        color: "white"
    },
    icon: {
        width: 35,
        height: "100%",
        resizeMode: "contain",
    }
})