import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Header({setBgModalVisible, practiceMode }) {
    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={() => setBgModalVisible(true)}>
                        <Image source={require("../../assets/background.png")} style={styles.icon} />
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
        marginTop: "3%",
        paddingHorizontal: "5%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    touchable: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: "rgba(0,0,0,0.48)",
        borderRadius: 16,
    },
    icon: {
        width: 35,
        height: "100%",
        resizeMode: "contain",
    }
})