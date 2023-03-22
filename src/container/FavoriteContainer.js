import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../utils/DataContext";
import Favorite from "../presentational/Favorite";

export default function FavoriteContainer({checkIfFavoriteExists}) {

    const [isFavorite, setIsFavorite] = useState(false);
    const {favorites, phrase } = useContext(DataContext)

    useEffect(() => {
        if (favorites) {
            setIsFavorite(favorites.includes(phrase));
        }
    })

    function handleFavorite() {
        // Si esta nueva frase, se encuentra en favoritos.
        checkIfFavoriteExists(phrase);
    }

    return (
        <Favorite handleFavorite={handleFavorite} isFavorite={isFavorite} />
    )
}