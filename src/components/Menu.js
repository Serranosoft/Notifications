import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

export default function Menu({practiceMode, setPracticeMode, setBgModalVisible, setCatModalVisible }) {

    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={() => setBgModalVisible(true)}>
                        <LottieView source={require("../../assets/lottie/fondo.json")} style={styles.lottie} loop={false} autoPlay={true} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable} onPress={() => setCatModalVisible(true)}>
                        <LottieView source={require("../../assets/lottie/categoria.json")} style={styles.lottie} loop={false} autoPlay={true} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable} onPress={() => setPracticeMode(true)}>
                        <LottieView source={require("../../assets/lottie/practicar.json")} style={styles.lottie} loop={false} autoPlay={true} />
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
        height: hp("7%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "black",
    },
    touchable: {
        width: "30%",
        marginHorizontal: "1.5%",
        alignItems: "center"
    },
    button: {
        width: "100%",
        paddingVertical: 6,
        paddingHorizontal: 24,
        backgroundColor: "lightblue",
        color: "black",
        fontSize: 14,
        borderRadius: 100,
        textAlign: "center"
    },
    lottie: {
        width: "100%",
        height: "100%",
    }


})