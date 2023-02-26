import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Easing, withDelay, withTiming } from "react-native-reanimated";

export default function PracticeMode({ practiceMode, setPracticeMode, position, phrasesReaded, setPhrasesReaded }) {

    const PHRASES_QTY = 20;

    // Estado del modo práctica en activo o no
    const [active, setActive] = useState(false);
    // Referencia del intervalo para poder terminarlo cuando termine el modo práctica
    const practiceModeInterval = useRef(null);

    useEffect(() => {
        if (phrasesReaded === PHRASES_QTY) {
            setTimeout(() => {
                clearInterval(practiceModeInterval.current);
                practiceModeInterval.current = null;
                setPracticeMode(false);
                setPhrasesReaded(0);
            }, 1000)
        }
    }, [phrasesReaded])

    useEffect(() => {
        practiceModeInterval.current = null;
        if (practiceMode) {
            setActive(true);
            setTimeout(() => {
                setActive(false);
                practiceModeInterval.current = setInterval(() => {
                    position.value = withTiming(-Dimensions.get("window").height, { duration: 400, easing: Easing.ease });
                    setTimeout(() => {
                        setPhrasesReaded((phrasesReaded) => phrasesReaded + 1);
                        position.value = Dimensions.get("window").height;
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                    }, 250)
                }, 2000)
            }, 6500)
        }
    }, [practiceMode])

    return (
        // Hay que mostrar una pantalla intermediaria durante 5 segundos de transición
        <>
            {active &&
                <View style={active ? [styles.active, styles.container] : styles.container}>
                    <Text style={styles.text}>Respira, lee e interioriza cada frase, tomate tu tiempo.</Text>
                </View>
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