import { Slot, SplashScreen } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataContext } from "../utils/DataContext";
import { useSharedValue } from "react-native-reanimated";
import { useEffect, useReducer, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { loadAdsConfiguration, loadIntersitial } from "../utils/ads";
import Background from '../src/Background/Background';
import fetchPhrases from '../utils/fetchPhrases';
import { AdEventType, InterstitialAd, TestIds } from "react-native-google-mobile-ads";
import * as StoreReview from 'expo-store-review';

const INTERSTITIAL_ID = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3963345159052388/2464725979';
const interstitial = InterstitialAd.createForAdRequest("ca-app-pub-3963345159052388/2464725979", {
    requestNonPersonalizedAdsOnly: false,
    keywords: ['salud', 'autoayuda'],
});

export default function Layout() {

    const initialState = {
        phrasesArr: [],
        phrasesReaded: 0,
        category: "General",
        backgroundHome: "https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/backgrounds/background6.jpg",
        favorites: [],
        bgModalVisible: false,
        catModalVisible: false,
        swipeVisible: true,
        dbLength: useRef(0),
        position: useSharedValue(0),
    }

    const [data, updatedData] = useReducer(
        (prev, next) => {
            const updatedData = { ...prev, ...next };
            return updatedData;
        }, initialState
    );

    // Configuración de anuncios para ganar dineritooo

    const [phrasesCount, setPhrasesCount] = useState(7);
    const [adLoaded, setAdLoaded] = useState(false);


    useEffect(() => {
        loadAdsConfiguration();
        loadIntersitial(interstitial, setAdLoaded);
    }, [])

    useEffect(() => {
        if (adLoaded) {
            if (data.phrasesReaded === phrasesCount) {
                setPhrasesCount(data.phrasesReaded + 5);
                interstitial.show();
                setAdLoaded(false);
                loadIntersitial(interstitial, setAdLoaded);
            }

            if (data.phrasesReaded === 16) {
                loadReview();
            }
        } else {
            loadIntersitial(interstitial, setAdLoaded);
        }
    }, [data.phrasesReaded])

    async function loadReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Hubhead": require("../assets/fonts/Hubhead/Hubhead.otf"),
    });
    const [isReady, setReady] = useState(false);
    useEffect(() => {
        if (fontsLoaded) {
            setReady(true);
        }
    }, [fontsLoaded]);

    // Cuando no existan frases, se obtiene la cantidad de frases de la categoría 'x' y obtiene el array de frases de esa categoría
    useEffect(() => {
        if (data.phrasesArr.length < 1) {
            if (data.category === "Favoritos") {
                data.dbLength.current = data.favorites.length
                data.favorites.length !== 0 && updatedData({ phrasesArr: data.favorites });
            } else {
                fetchPhrases.getPhrasesLength(data.category).then((length) => data.dbLength.current = length);
                fetchPhrases.getPhrases(data.phrasesArr, updatedData, data.category);
            }
        }
    }, [data.phrasesArr])

    // Al cambiar de categoría, obtiene la longitud del array de las nuevas preguntas y resetea todas las variables
    useEffect(() => {
        if (data.category !== null) {
            updatedData({ phrasesArr: [] })
            updatedData({ phrasesReaded: 0 })
            if (data.category != "Favoritos") {
                fetchPhrases.getPhrasesLength(data.category).then((length) => data.dbLength.current = length);
            } else {
                data.dbLength.current = data.favorites.length
            }
        }
    }, [data.category])

    return (
        !isReady ?
            <SplashScreen />
            :
            <View style={{ flex: 1 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <DataContext.Provider value={
                        {
                            position: data.position,
                            phrasesReaded: data.phrasesReaded,
                            dbLength: data.dbLength,
                            phrasesArr: data.phrasesArr,
                            favorites: data.favorites,
                            category: data.category,
                            phrase: data.phrasesArr[data.phrasesReaded],
                            bgModalVisible: data.bgModalVisible,
                            catModalVisible: data.catModalVisible,
                            swipeVisible: data.swipeVisible,
                            updatedData: updatedData,
                        }
                    }>
                        <Background image={{ uri: data.backgroundHome }}>
                            <Slot />
                        </Background>

                    </DataContext.Provider>

                </GestureHandlerRootView>
            </View >

    )
}