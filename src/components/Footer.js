import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataContext } from "../../utils/DataContext";
import { Image } from 'expo-image';
import { ui } from "../../utils/styles";
import { useRouter } from "expo-router";

export default function Footer() {


    const { practiceMode, category, updatedData } = useContext(DataContext)
    const router = useRouter();
    
    return (
        <>
            {!practiceMode ?
                <View style={styles.container}>
                    <TouchableOpacity style={ui.touch} onPress={() => updatedData({ catModalVisible: true })}>
                        <View style={ui.touchWrapper}>
                            <Image source={require("../../assets/menu.png")} style={ui.img} />
                            <Text style={ui.text}>{category}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ui.touch} onPress={() => router.push("/practice")}>
                            <Image source={require("../../assets/play.png")} style={ui.img} />
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
        flex: 1,
        marginHorizontal: 16,
        justifyContent: "space-between",
    }
})