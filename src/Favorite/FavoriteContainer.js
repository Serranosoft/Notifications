import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../utils/DataContext";
import Favorite from "./Favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoriteContainer({ phrase }) {

    const [isFavorite, setIsFavorite] = useState(false);
    const { favorites, updatedData } = useContext(DataContext)

    useEffect(() => {
        if (favorites) {
            setIsFavorite(favorites.includes(phrase));
        }
    })

    // Agrega o elimina favoritos del estado
    async function checkIfFavoriteExists() {
        if (!favorites.includes(phrase)) {
            updatedData({ favorites: favorites.concat(phrase) })
        } else {
            let favoritesAux = [...favorites];
            favoritesAux.splice(favoritesAux.indexOf(phrase), 1)
            updatedData({ favorites: favoritesAux });
        }
    }

    // Cada vez que el estado se actualiza, llama a saveFavorite
    useEffect(() => {
        saveFavorite();
    }, [favorites])

    // Reemplaza el contenido de favoritos del storage con el nuevo array
    async function saveFavorite() {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }

    return (
        <Favorite handleFavorite={checkIfFavoriteExists} isFavorite={isFavorite} />
    )
}