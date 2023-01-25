import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming, runOnJS, Easing } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { supabase } from "./src/supabaseClient"

export default function App() {

    // Array de frases.
    const [arr, setArr] = useState([]);
    // Cantidad de elementos del array.
    const [arrLength, setArrLength] = useState(0);
    // Cantidad de frases leídas, también sirve como el índice del array para renderizar la frase
    const [phrasesReaded, setPhrasesReaded] = useState(0);
    // Longitud de la base de datos
    let dbLength = useRef(0);

    const position = useSharedValue(0);

    useEffect(() => {
        getPhrasesLength();
        getPhrases();
    }, [])

    useEffect(() => {
        // Cada 3 frases leidas, carga otras 4 en el array
        if (arr.length > 0) {
            if (phrasesReaded === arrLength - 1) {
                getPhrases();
            }
        }
    }, [phrasesReaded])

    async function getPhrasesLength() {
        const { data, count } =
            await supabase
                .from("test")
                .select('*', { count: 'exact' })

        dbLength.current = count;
    }

    async function getPhrases() {
        await supabase
            .from('test')
            .select("phrase")
            .range(arrLength, arrLength + 3)
            .then((res) => {
                if (arr.length < 1) {
                    setArr(res.data);
                } else {
                    setArr(arr.concat(res.data))
                }

            })
        setArrLength(() => arrLength + 4);
    }

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetY([-100, 100])
        .onUpdate((e) => {
            console.log(e.translationY);
            console.log("ola?");
            position.value = e.translationY;
        })
        .onEnd((e) => {
            position.value = withTiming(position.value * 10, { duration: 300, easing: Easing.ease });
            setTimeout(() => {
                if (e.translationY < 0) {
                    if (phrasesReaded > 0) {
                        setPhrasesReaded(() => phrasesReaded - 1);
                    }
                } else {
                    if (phrasesReaded < dbLength.current - 1) {
                        setPhrasesReaded(() => phrasesReaded + 1);
                    }
                }
                position.value = 0
            }, 350)
        })


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>

    );
}

