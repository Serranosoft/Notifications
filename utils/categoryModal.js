import { useEffect, useRef, useState } from "react";
import { Text, View, Modal, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const CategoryModal = ({ setCatModalVisible, catModalVisible, setCategory }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categories.length < 1) {
            async function fetchCategories() {
                const {data, error} = await supabase.from("Categories").select("name");
                data.forEach(category => 
                    setCategories(categories => categories.concat({name: category.name, img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/${category.name.replace(/\s+/g, '_')}.png?cache2`})));
            }
            fetchCategories();
            setOtherCategories();
        }
    }, [])
    
    function setOtherCategories() {
        setCategories(categories => categories.concat({name: "General", img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/General.png?cache2`}))
        setCategories(categories => categories.concat({name: "Favoritos", img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/Favoritos.png?cache2`}));
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={catModalVisible}
            onRequestClose={() => {
                setCatModalVisible(!catModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Categorías</Text>
                    <FlatList
                        data={categories}
                        numColumns={2}
                        columnWrapperStyle={{
                            flexGrow: 1,
                        }}
                        renderItem= {({item, i}) => {
                            return (
                                <TouchableOpacity style={styles.category} key={i} onPress={() => {
                                    setCategory(item.name);
                                    setCatModalVisible(!catModalVisible);
                                }}>
                                    <View>
                                        <Image style={styles.image} source={{ uri: item.img }} />
                                        <Text style={styles.categoryText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>

                            ) 
                        }}
                        
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setCatModalVisible(!catModalVisible)}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}


const win = Dimensions.get('window');
const imageRatio = win.width / 256;

const styles = StyleSheet.create({
    centeredView: {
        width: wp("100%"),
        height: hp("100%"),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#fafafa',
        borderRadius: 20,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "95%",
        height: "75%",
    },
    modalTitle: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "Hubhead",
    },
    category: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 1,
        margin: 6,
        backgroundColor: "white",
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    image: {
        width: win.width / 2,
        height: ((256 * imageRatio) / 2),
        alignSelf: "center",
    },
    categoryText: {
        fontSize: 16,
        color: "black",
        fontFamily: "Hubhead",
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
    },
});