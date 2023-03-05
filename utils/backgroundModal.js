import { useEffect, useRef, useState } from "react";
import { Text, View, Modal, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const BackgroundModal = ({ setBgModalVisible, bgModalVisible, setBackgroundHome }) => {

    const [backgroundImgs, setBackgroundImgs] = useState([]);
    const [chosed, setChosed] = useState(false);    

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
                const {data, error} = await supabase.storage.from("backgrounds").getPublicUrl(`${imgName}`);
                setBackgroundImgs(backgroundImgs => backgroundImgs.concat(data.publicUrl));
            }
            fetchBackgrounds();
        }
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={bgModalVisible}
            onRequestClose={() => {
                setBgModalVisible(!bgModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Elige un fondo</Text>
                    <FlatList
                        data={backgroundImgs}
                        renderItem= {({item, i}) => {
                            return (
                                <TouchableOpacity onPress={(e) => {
                                    // Settea una imagen a la home
                                    setBackgroundHome(item);
                                    setChosed(true);
                                }}>
                                    <Image style={styles.image} key={i} source={{uri: `${item}`}} />
                                </TouchableOpacity>
                            ) 
                        }}
                        style={{ width: "100%", height: "40%"}}
                        numColumns={1}
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setBgModalVisible(!bgModalVisible)}>
                        <Text style={styles.buttonText}>{chosed ? "Aceptar" : "Cerrar"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({
    centeredView: {
        width: wp("100%"),
        height: hp("100%"),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        // flex: 1
        height: "80%"
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        elevation: 5,
        backgroundColor: "black",
        alignSelf: "center"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,

    },
    image: {
        height: 250, 
        marginVertical: 24
    },
    imageChosed: {
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
});