import { useEffect, useState } from "react";
import { Text, View, Modal, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageBackgroundPickerContainer from "../src/container/ImageBackgroundPickerContainer";

export const BackgroundModal = ({ setBgModalVisible, bgModalVisible, setBackgroundHome }) => {

    const [backgroundImgs, setBackgroundImgs] = useState([]);
    const [imgChosed, setImgChosed] = useState(0);

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
                const {data, error} = await supabase.storage.from("backgrounds").getPublicUrl(`backgrounds/${imgName}`);
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
                setBgModalVisible(!bgModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Elige como decorar el fondo</Text>
                    <ImageBackgroundPickerContainer setBackgroundHome={setBackgroundHome} setBgModalVisible={setBgModalVisible} />
                    <Text style={[styles.modalText, styles.separator]}>------- o -------</Text>
                    <FlatList
                        data={backgroundImgs}
                        renderItem= {({item, i}) => {
                            return (
                                <TouchableOpacity style={[styles.imageWrapper, imgChosed === item && styles.imageChosed]} onPress={async () => {
                                    // Settea una imagen a la home
                                    try {
                                        setBackgroundHome(item);
                                        setImgChosed(item);
                                        await AsyncStorage.setItem("background", item)
                                    } catch (e) {
                                        // saving error
                                    }
                                }}>
                                    <Image style={[styles.image]} key={i} source={{uri: `${item}`}} />
                                </TouchableOpacity>
                            ) 
                        }}
                        style={{ width: "100%", height: "40%"}}
                        numColumns={1}
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setImgChosed(0);
                            setBgModalVisible(!bgModalVisible)
                        
                        }}>
                        <Text style={styles.buttonText}>{imgChosed !== 0 ? "Aceptar" : "Cerrar"}</Text>
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
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: "#fafafa",
        alignSelf: "center"
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: "Hubhead"
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Hubhead",
    },
    modalTitle: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "Hubhead",
    },
    separator: {
        letterSpacing: -1,
    },
    imageWrapper: {
        height: 250,
        marginVertical: 24,
    },
    image: {
        width: "100%",
        height: "100%", 
    },
    imageChosed: {
        borderWidth: 6,
        borderStyle: "solid",
        borderColor: "#4C489E",
    }
});