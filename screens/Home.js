import { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming, Easing, withDelay } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import fetchPhrases from '../utils/fetchPhrases';
import { BackgroundModal } from '../utils/backgroundModal';
import { CategoryModal } from '../utils/categoryModal';

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

    // Modals
    const [bgModalVisible, setBgModalVisible] = useState(false)
    const [backgroundHome, setBackgroundHome] = useState("https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/background1.jpg");
    
    const [catModalVisible, setCatModalVisible] = useState(false)
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // este entra en bucle infinito.
        if (phrasesArr.length < 1) {
            fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
            fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
        }
    }, [phrasesArr])

    useEffect(() => {
        // Cada 3 frases leidas, carga otras 4 en el array
        if (phrasesArr.length > 0) {
            if (phrasesReaded === phrasesLength - 1) {
                fetchPhrases.getPhrases(phrasesArr, setPhrasesArr, setPhrasesLength, phrasesLength, category);
            }
        }
    }, [phrasesReaded])

    useEffect(() => {
        if (category !== null) {
            fetchPhrases.getPhrasesLength(category).then((length) => dbLength.current = length);
            setPhrasesArr([]);
            setPhrasesLength(0);
            setPhrasesReaded(0);
        }
    }, [category])

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetY([60, 60])
        .onUpdate((e) => {
            position.value = e.translationY;
        })
        .onEnd((e) => {
            position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
            if (e.translationY < 60 && e.translationY > -60) {
                position.value = withTiming(0, { duration: 400, easing: Easing.ease });
            }
            setTimeout(() => {
                if (e.translationY > 60) {
                    if (phrasesReaded > 0) {
                        setPhrasesReaded(() => phrasesReaded - 1);
                    }
                    position.value = -Dimensions.get("window").height;
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                } else if (e.translationY < -60) {
                    if (phrasesReaded < dbLength.current - 1) {
                        setPhrasesReaded(() => phrasesReaded + 1);
                    }
                    position.value = Dimensions.get("window").height;
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                }
            }, 250)
        })
        
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
        width: "75%"
    }));

    return (
        <ImageBackground source={{ uri: backgroundHome }} style={styles.imageBg}>
            <BackgroundModal setBgModalVisible={setBgModalVisible} bgModalVisible={bgModalVisible} setBackgroundHome={setBackgroundHome} />
            <CategoryModal setCatModalVisible={setCatModalVisible} catModalVisible={catModalVisible} setCategory={setCategory} />
            <GestureDetector gesture={tap}>
                <View style={styles.animatedView}>
                    <Animated.View style={[animatedStyle]} collapsable={false}>
                        <Text style={styles.animatedText}>
                            {
                                phrasesArr.length > 0 && phrasesArr[phrasesReaded] && phrasesArr[phrasesReaded].phrase
                            }
                        </Text>
                    </Animated.View>
                </View>
            </GestureDetector>
            <TouchableOpacity style={{ position: "absolute", top: "5%", left: "5%" }} onPress={() => setBgModalVisible(true)}>
                <Text style={styles.button}>Cambiar fondo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ position: "absolute", top: "15%", left: "5%" }} onPress={() => setCatModalVisible(true)}>
                <Text style={styles.button}>Elegir categoría</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    imageBg: {
        flex: 1,
        position: "relative"
    },
    animatedView: {
        flex: 1,
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
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: "lightblue",
        color: "black",
        fontSize: 20,
        borderRadius: 100
    }
})