import { useEffect, useRef, useState } from 'react';
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
    const [category, setCategory] = useState("Todas");
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
            fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
            fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
        }
    }, [phrasesArr])

    // Cada 7 frases leidas, carga otras 10 en el array
    useEffect(() => {
        if (phrasesArr.length > 0) {
            swipeVisible === true && setSwipeVisible(false);
            if (phrasesReaded === phrasesLength - 3) {
                fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
            }
        }
    }, [phrasesReaded])

    // Al cambiar de categoría, obtiene la longitud del array de las nuevas preguntas y resetea todas las variables
    useEffect(() => {
        if (category !== null) {
            fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
            setPhrasesArr([]);
            setPhrasesLength(0);
            setPhrasesReaded(0);
        }
    }, [category])

    async function checkIfFavoriteExists(phrase) {
        if (!favorites.includes(phrase)) {
            setFavorites(favorites => favorites.concat(phrase));
        }
    }

    async function saveFavorite() {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }

    useEffect(() => {
        saveFavorite();

        console.log(favorites);
    }, [favorites])

    return (
        <>
            <Background image={{ uri: backgroundHome }} swipeVisible={swipeVisible}>
                <Header {...{ setBgModalVisible, practiceMode }} />
                <PhraseContainer {...{ practiceMode, position, setPhrasesReaded, phrasesReaded, dbLength, phrasesArr, checkIfFavoriteExists }} />
                <Footer {...{ practiceMode, setPracticeMode, bgModalVisible, setBgModalVisible, setCatModalVisible, category }} />
            </Background>

            <BackgroundModal {...{ setBgModalVisible, bgModalVisible, setBackgroundHome }} />
            <CategoryModal {...{ setCatModalVisible, catModalVisible, setCategory }} />
            <PracticeMode {...{ setPracticeMode, practiceMode, position, phrasesReaded, setPhrasesReaded }} />
            <AsyncStorageContainer {...{ setBackgroundHome, setFavorites }} />
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