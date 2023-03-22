import { useContext, useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Easing, withDelay, withTiming } from "react-native-reanimated";
import { DataContext } from "./DataContext";

export default function PracticeMode({ setPracticeMode, setPhrasesReaded }) {

    const { practiceMode, position, phrasesReaded } = useContext(DataContext);

    const PHRASES_QTY = 8;
    const PHRASES_READED = useRef(0);

    // Estado del modo práctica en activo o no
    const [delayScreen, setDelayScreen] = useState(false);
    // Referencia del intervalo para poder terminarlo cuando termine el modo práctica
    const practiceModeInterval = useRef(null);
    const practiceModeTimeout = useRef(null);

    useEffect(() => {
        if (PHRASES_READED.current === PHRASES_QTY) {
            setTimeout(() => {
                closePracticeMode();
            }, 1000)
        }
    }, [phrasesReaded])

    useEffect(() => {
        changeBackHandler();
        practiceModeInterval.current = null;
        if (practiceMode) {
            setDelayScreen(true);
            practiceModeTimeout.current = setTimeout(loadPhrasesInterval, 6500)
        }
    }, [practiceMode])

    function loadPhrasesInterval() {
        setDelayScreen(false);
        practiceModeInterval.current = setInterval(() => {
            position.value = withTiming(-Dimensions.get("window").height, { duration: 400, easing: Easing.ease });
            setTimeout(() => {
                setPhrasesReaded((phrasesReaded) => phrasesReaded + 1);
                PHRASES_READED.current = PHRASES_READED.current + 1;
                position.value = Dimensions.get("window").height;
                position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
            }, 250)
        }, 2000)
    }

    const tap = Gesture.Tap().runOnJS(true)
        .onStart(() => {
            if (practiceMode) {
                setDelayScreen(false);
                clearTimeout(practiceModeTimeout.current);
                practiceModeTimeout.current = null;
                loadPhrasesInterval();
            }
        })

    function changeBackHandler() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            if (practiceMode) {
                closePracticeMode();
                return true;
            } else {
                return false;
            }
        })
    }

    function closePracticeMode() {
        setDelayScreen(false);
        setPracticeMode(false);
        clearInterval(practiceModeInterval.current);
        clearTimeout(practiceModeTimeout.current)
        practiceModeInterval.current = null;
        PHRASES_READED.current = 0;

    }

    return (
        // Hay que mostrar una pantalla intermediaria durante 5 segundos de transición
        <>
            {delayScreen &&
                <GestureDetector gesture={tap}>
                    <View style={delayScreen ? [styles.active, styles.container] : styles.container}>
                        <Text style={styles.text}>Respira, lee e interioriza cada frase, tomate tu tiempo.</Text>
                    </View>
                </GestureDetector>
            }
        </>
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
    }
})