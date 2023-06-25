import { useContext } from "react";
import * as ImagePicker from 'expo-image-picker';
import { DataContext } from "../../utils/DataContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MyText from "../components/Text";

export default function ImageBackgroundPickerContainer() {

    const { updatedData } = useContext(DataContext);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            updatedData({ backgroundHome: result.assets[0].uri });
        }
    };

    return (
        <TouchableOpacity style={styles.touchable} onPress={() => {
            pickImage();
            updatedData({ bgModalVisible: false })
        }}>
            <MyText>Abrir galería</MyText>
        </TouchableOpacity>
    )


}

const styles = StyleSheet.create({
    touchable: {
        width: "70%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#f3d7be",
        borderRadius: 8,
        marginBottom: 12,
    },
})