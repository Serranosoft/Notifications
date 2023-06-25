import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DataContext } from "../../utils/DataContext";
import { Image } from 'expo-image';
import { ui } from "../../utils/styles";

export default function Header() {

    const { practiceMode, updatedData } = useContext(DataContext);
    
    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={ui.touch} onPress={() => updatedData({bgModalVisible: true})}>
                        <Image source={require("../../assets/pincel.png")} style={ui.img} />
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
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1,
        marginHorizontal: 16,
    }
})