import { useContext, useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../src/supabaseClient"
import { DataContext } from "./DataContext";
import { Image } from 'expo-image';
import { modal } from "./styles";
import MyText from "../src/components/Text";

export const CategoryModal = ({ catModalVisible }) => {

    const [categories, setCategories] = useState([]);
    const { updatedData } = useContext(DataContext)

    useEffect(() => {
        if (categories.length < 1) {
            async function fetchCategories() {
                const { data } = await supabase.from("Categories").select("name");
                data.forEach(category =>
                    setCategories(categories => categories.concat({ name: category.name, img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/${category.name.replace(/\s+/g, '_')}.png?cache3` })));
            }
            fetchCategories();
            setOtherCategories();
        }
    }, [])

    function setOtherCategories() {
        setCategories(categories => categories.concat({ name: "General", img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/General.png?cache3` }))
        setCategories(categories => categories.concat({ name: "Favoritos", img: `https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/categories/Favoritos.png?cache3` }));
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={catModalVisible}
            onRequestClose={() => {
                updatedData({ setCatModalVisible: !catModalVisible });
            }}>
            <View style={modal.center}>
                <View style={modal.wrapper}>
                    <MyText title>Selecciona un estado de humor</MyText>
                    <FlatList
                        data={categories}
                        numColumns={2}
                        columnWrapperStyle={{
                            flexGrow: 1,
                        }}
                        renderItem={({ item, i }) => {
                            return (
                                <TouchableOpacity style={modal.item} key={i} onPress={() => {
                                    updatedData({ category: item.name, catModalVisible: !catModalVisible });
                                }}>
                                    <View>
                                        <Image
                                            style={modal.image}
                                            source={{ uri: item.img }}
                                            transition={1000}
                                        />
                                        <MyText style={modal.categoryText}>{item.name}</MyText>
                                    </View>
                                </TouchableOpacity>

                            )
                        }}

                    />
                    <TouchableOpacity
                        style={modal.button}
                        onPress={() => updatedData({ catModalVisible: !catModalVisible })}>
                        <MyText>Cerrar</MyText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}