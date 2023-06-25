import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { DataContext } from "../../utils/DataContext";

export default function Storage() {

    const { updatedData } = useContext(DataContext);

    useEffect(() => {
        getBackgroundStorage();
        getFavorites();
    }, [])

    async function getBackgroundStorage() {
        try {
            const value = await AsyncStorage.getItem("background");
            if (value !== null) {
                updatedData({ backgroundHome: value })
            }
        } catch (e) {
            // error reading value
        }
    }

    async function getFavorites() {
        try {
            const value = await AsyncStorage.getItem("favorites");
            if (value !== null) {
                updatedData({ favorites: JSON.parse(value) });
            }
        } catch (e) {
            // error reading value
        }
    }

    return <></>
}