import { createContext, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import fetchPhrases from '../utils/fetchPhrases';
import { BackgroundModal } from '../utils/backgroundModal';
import { CategoryModal } from '../utils/categoryModal';
import PracticeMode from '../utils/practiceMode';
import Footer from '../src/components/Footer';
import Background from '../src/presentational/Background';
import PhraseContainer from '../src/container/PhraseContainer';
import AsyncStorageContainer from '../src/container/AsyncStorageContainer';
import Header from '../src/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../utils/DataContext';

export default function Home() {

    // Array de frases.
    const [phrasesArr, setPhrasesArr] = useState([]);
    // Cantidad de elementos del array.
    const [phrasesLength, setPhrasesLength] = useState(0);
    // Cantidad de frases leídas, también sirve como el índice del array para renderizar la frase
    const [phrasesReaded, setPhrasesReaded] = useState(0);
    // Longitud de la base de datos
    let dbLength = useRef(0);
    // Posición del elemento para animarlo
    const position = useSharedValue(0);
    // Categoría de la pregunta
    const [category, setCategory] = useState("General");
    // Background
    const [backgroundHome, setBackgroundHome] = useState("https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/background6.jpg");
    // Favorites
    const [favorites, setFavorites] = useState([]);
    // Modals
    const [bgModalVisible, setBgModalVisible] = useState(false)
    const [catModalVisible, setCatModalVisible] = useState(false)
    // Practice Mode
    const [practiceMode, setPracticeMode] = useState(false);
    // Referencia del lottie swipe para ocultarlo tras hacer swipe la primera vez
    const [swipeVisible, setSwipeVisible] = useState(true);

    // Cuando no existan frases, se obtiene la cantidad de frases de la categoría 'x' y obtiene el array de frases de esa categoría
    useEffect(() => {
        if (phrasesArr.length < 1) {
            if (category === "Favoritos") {
                dbLength.current = favorites.length
                favorites.length !== 0 && setPhrasesArr(favorites);
            } else {
                fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
                fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
            }
        }
    }, [phrasesArr])

    // Cada 7 frases leidas, carga otras 10 en el array
    useEffect(() => {
        if (phrasesArr.length > 0 && category !== "Favoritos") {
            swipeVisible === true && setSwipeVisible(false);
            if (phrasesReaded === phrasesLength - 3) {
                fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
            }
        }
    }, [phrasesReaded])

    // Al cambiar de categoría, obtiene la longitud del array de las nuevas preguntas y resetea todas las variables
    useEffect(() => {
        if (category !== null) {
            setPhrasesArr([]);
            setPhrasesReaded(0);
            if (category == "Favoritos") {
                setPhrasesLength(favorites.length);
            } else {
                fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
            }
        }
    }, [category])

    // Agrega o elimina favoritos del estado
    async function checkIfFavoriteExists(phrase) {
        if (!favorites.includes(phrase)) {
            setFavorites(favorites => favorites.concat(phrase));
        } else {
            let favoritesAux = [...favorites];
            favoritesAux.splice(favoritesAux.indexOf(phrase), 1)
            setFavorites(favoritesAux);
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
        <>
            <DataContext.Provider value={
                {
                    practiceMode: practiceMode,
                    position: position,
                    phrasesReaded: phrasesReaded,
                    dbLength: dbLength.current,
                    phrasesArr: phrasesArr,
                    favorites: favorites,
                    category: category,
                    phrase: phrasesArr[phrasesReaded]
                }
            }>
                <Background image={{ uri: backgroundHome }} swipeVisible={swipeVisible}>
                    <Header setBgModalVisible={setBgModalVisible} />
                    <PhraseContainer setPhrasesReaded={setPhrasesReaded} checkIfFavoriteExists={checkIfFavoriteExists} />
                    <Footer setPracticeMode={setPracticeMode} setCatModalVisible={setCatModalVisible} />
                </Background>

                <BackgroundModal setBgModalVisible={setBgModalVisible} bgModalVisible={bgModalVisible} setBackgroundHome={setBackgroundHome} />
                <CategoryModal setCatModalVisible={setCatModalVisible} catModalVisible={catModalVisible} setCategory={setCategory} />
                <PracticeMode setPracticeMode={setPracticeMode} setPhrasesReaded={setPhrasesReaded} setCategory={setCategory} />
                <AsyncStorageContainer setBackgroundHome={setBackgroundHome} setFavorites={setFavorites} />
            </DataContext.Provider>
        </>
    )
}



/* const styles = StyleSheet.create({
    // container: {
    //     width: wp("100%"),
    //     height: hp("93%"),
    //     position: "relative"
    // },
    animatedView: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    animatedText: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.60)",
        borderRadius: 15,
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    lottie: {
        width: 150,
        height: 150,
        position: "absolute",
        top: "15%",
        left: "40%",
    }
}) */