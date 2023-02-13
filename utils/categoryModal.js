import { useEffect, useRef, useState } from "react";
import { Text, View, Modal, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"


export const CategoryModal = ({ setCatModalVisible, catModalVisible, setCategory }) => {

    const [chosed, setChosed] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categories.length < 1) {
            async function fetchCategories() {
                const {data, error} = await supabase.from("Categories").select("name");
                data.forEach(category => setCategories(categories => categories.concat(category.name)));
            }
            fetchCategories()
        }
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={catModalVisible}
            onRequestClose={() => {
                setCatModalVisible(!catModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Elige una categoría</Text>
                    <FlatList
                        data={categories}
                        columnWrapperStyle={{
                            flexShrink: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        numColumns={2}
                        renderItem= {({item, i}) => {
                            return (
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    setChosed(true);
                                    setCategory(item);
                                    setCatModalVisible(!catModalVisible);
                                }}>
                                    <View style={styles.category}>
                                        <Text style={styles.categoryText}>{item}</Text>
                                    </View>
                                </TouchableOpacity>

                            ) 
                        }}
                        
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setCatModalVisible(!catModalVisible)}>
                        <Text style={styles.buttonText}>{chosed ? "Aceptar" : "Cerrar"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 1,
        width: "90%"
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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
    category: {
        flex: 1 / 2,
        height: 100,
        backgroundColor: "trasparent",
        marginHorizontal: 6,
        marginVertical: 12,
        borderColor: "lightgray",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        fontSize: 18
    }
});