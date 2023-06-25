import { Text, View, StyleSheet, Dimensions, BackHandler } from "react-native";
import { Stack, useRouter } from "expo-router";
import PhraseContainer from "../src/Phrase/PhraseContainer";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../utils/DataContext";
import { Easing, withDelay, withTiming } from "react-native-reanimated";

export default function practice() {

    const PHRASES_QTY = 10;
    const [PHRASES_READED, setPhrasesReaded] = useState(0);

    const { phrasesReaded, updatedData, position } = useContext(DataContext);

    // Estado del modo práctica en activo o no
    const [delayScreen, setDelayScreen] = useState(false);

    // Referencia del intervalo para poder terminarlo cuando termine el modo práctica
    const interval = useRef(null);
    const timeout = useRef(null);

    const router = useRouter();

    useEffect(() => {
        changeBackHandler();
        setDelayScreen(true);
        timeout.current = setTimeout(loadPhrasesInterval, 5250)
    }, [])
    
    useEffect(() => {
        if (PHRASES_READED === PHRASES_QTY) {
            setTimeout(() => {
                close();
            }, 1000)
        } else if (PHRASES_READED > 0) {
            updatedData({phrasesReaded: phrasesReaded + 1});
        }
    }, [PHRASES_READED])

    function loadPhrasesInterval() {
        updatedData({ category: "General" });
        setDelayScreen(false);

        interval.current = setInterval(() => {
            position.value = withTiming(-Dimensions.get("window").height, { duration: 400, easing: Easing.ease });
           
            setTimeout(() => {
                setPhrasesReaded((PHRASES_READED) => PHRASES_READED + 1)
                position.value = Dimensions.get("window").height;
                position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
            }, 250)
        }, 2500)
    }


    function changeBackHandler() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            close();
            return true;
        })
    }

    function close() {
        router.push("/");
        setDelayScreen(false);
        clearInterval(interval.current);
        clearTimeout(timeout.current)
        interval.current = null;
        setPhrasesReaded(0);
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            {delayScreen ?
                <>
                    <View style={delayScreen ? [styles.active, styles.container] : styles.container}>
                        <Text style={styles.text}>Respira, lee e interioriza cada frase, tomate tu tiempo.</Text>
                    </View>
                </>
                :
                <PhraseContainer />
            }
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
    },
    active: {
        backgroundColor: "rgba(0,0,0,1)",
    },
    text: {
        fontSize: 25,
        color: "white",
        textAlign: "center",
        fontFamily: "Hubhead"
    }
})