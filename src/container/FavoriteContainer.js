import { useEffect, useState } from "react";
import Favorite from "../presentational/Favorite";

export default function FavoriteContainer({checkIfFavoriteExists, phrase, favorites}) {

    const [isFavorite, setIsFavorite] = useState(false);

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