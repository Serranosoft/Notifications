import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming, Easing, withDelay } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import fetchPhrases from '../utils/fetchPhrases';

export default function Home() {

    // Array de frases.
    const [arr, setArr] = useState([]);
    // Cantidad de elementos del array.
    const [arrLength, setArrLength] = useState(0);
    // Cantidad de frases leídas, también sirve como el índice del array para renderizar la frase
    const [phrasesReaded, setPhrasesReaded] = useState(0);
    // Longitud de la base de datos
    let dbLength = useRef(0);
    // Posición del elemento para animarlo
    const position = useSharedValue(0);

    useEffect(() => {
        fetchPhrases.getPhrasesLength().then((length) => dbLength.current = length);
        fetchPhrases.getPhrases(arr, setArr, setArrLength, arrLength);
    }, [])

    useEffect(() => {
        // Cada 3 frases leidas, carga otras 4 en el array
        if (arr.length > 0) {
            if (phrasesReaded === arrLength - 1) {
                fetchPhrases.getPhrases(arr, setArr, setArrLength, arrLength);
            }
        }
    }, [phrasesReaded])

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
    }));

    return (
        <View style={{flex: 1}}>
            <GestureDetector style={{ backgroundColor: "black" }} gesture={tap}>
                <View style={{ flex: 1, marginTop: 50, justifyContent: "center", alignItems: "center" }}>
                    <Animated.View style={[animatedStyle]} collapsable={false}>
                        <Text style={{ width: 200, textAlign: "center" }}>
                            {
                                arr[phrasesReaded] && arr[phrasesReaded].phrase
                            }
                        </Text>
                    </Animated.View>
                </View>
            </GestureDetector>
        </View>
    )
}