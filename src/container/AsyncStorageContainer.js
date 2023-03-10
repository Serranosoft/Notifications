import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function AsyncStorageContainer({setBackgroundHome}) {

    useEffect(() => {
        getBackgroundStorage();
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

    return <></>
}