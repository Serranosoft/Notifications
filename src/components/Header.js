import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DataContext } from "../../utils/DataContext";

export default function Header({setBgModalVisible }) {

    const {practiceMode} = useContext(DataContext);
    
    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={() => setBgModalVisible(true)}>
                        <Image source={require("../../assets/pincel.png")} style={styles.icon} />
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
        height: hp("6%"),
        marginTop: hp("4%"),
        paddingHorizontal: "3%",
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