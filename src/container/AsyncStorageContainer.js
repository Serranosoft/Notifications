import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function AsyncStorageContainer({setBackgroundHome, setFavorites}) {

    useEffect(() => {
        getBackgroundStorage();
        getFavorites();
    }, [])

    async function getBackgroundStorage() {
        try {
            const value = await AsyncStorage.getItem("background");
            if (value !== null) {
                setBackgroundHome(value);
            }
        } catch (e) {
            // error reading value
        }
    }

    async function getFavorites() {
        try {
            const value = await AsyncStorage.getItem("favorites");
            console.log(value);
            if (value !== null) {
                setFavorites(JSON.parse(value));
            }
        } catch (e) {
            // error reading value
        }
    }

    return <></>
}