import { useContext, useEffect, useState } from "react";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageBackgroundPickerContainer from "../src/Background/ImageBackgroundPickerContainer";
import { DataContext } from "./DataContext";
import { Image } from 'expo-image';
import { modal } from "./styles";
import MyText from "../src/components/Text";

export const BackgroundModal = ({ bgModalVisible }) => {

    const [backgroundImgs, setBackgroundImgs] = useState([]);
    const [imgChosed, setImgChosed] = useState(0);

    const { updatedData } = useContext(DataContext);

    useEffect(() => {
        if (backgroundImgs.length < 1) {
            async function fetchBackgrounds() {
                await supabase.storage.from("backgrounds").list("backgrounds", {}).then((res) => {
                    res.data.forEach(img => {
                        if (img && img.metadata.mimetype === "image/jpeg") {
                            fetchBackgroundsUrls(img.name)
                        }
                    })
                });
            }

            async function fetchBackgroundsUrls(imgName) {
                const { data } = supabase.storage.from("backgrounds").getPublicUrl(`backgrounds/${imgName}`);
                setBackgroundImgs(backgroundImgs => backgroundImgs.concat(data.publicUrl));
            }
            fetchBackgrounds();
        }
    }, [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={bgModalVisible}
            onRequestClose={() => {
                updatedData({ bgModalVisible: !bgModalVisible })
            }}>
            <View style={modal.center}>
                <View style={modal.wrapper}>
                    <MyText title>Elige como decorar el fondo</MyText>
                    <ImageBackgroundPickerContainer />
                    <FlatList
                        data={backgroundImgs}
                        numColumns={2}
                        columnWrapperStyle={{
                            flexGrow: 1,
                        }}
                        renderItem={({ item, i }) => {
                            return (
                                <TouchableOpacity style={[modal.item, imgChosed === item && styles.imageChosed]} onPress={async () => {
                                    updatedData({ backgroundHome: item })
                                    setImgChosed(item);
                                    await AsyncStorage.setItem("background", item)
                                }}>
                                    <Image
                                        style={[modal.image, styles.image]}
                                        key={i}
                                        source={{ uri: `${item}` }}
                                        transition={1000} />
                                </TouchableOpacity>
                            )
                        }}

                    />
                    <TouchableOpacity
                        style={modal.button}
                        onPress={() => {
                            setImgChosed(0);
                            updatedData({ bgModalVisible: !bgModalVisible })
                        }}>
                        <MyText style={modal.buttonText}>{imgChosed !== 0 ? "Aceptar" : "Cerrar"}</MyText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({
    imageChosed: {
        borderWidth: 6,
        borderStyle: "solid",
        borderColor: "#4C489E",
    },
    image: {
        borderRadius: 16,
    }
});