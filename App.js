import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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

    useEffect(() => {
        getPhrasesLength();
        getPhrases();
    }, [])

    useEffect(() => {
        // Cada 3 frases leidas, carga otras 4 en el array
        if (arr.length > 0) {
            if (phrasesReaded === arrLength - 1) {
                console.log("3 FRASES LEIDAS, ACTUALIZO ARR");
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
        console.log("Get phrases.");
        await supabase
        .from('test')
        .select("phrase")
        .range(arrLength, arrLength+3)
        .then((res) => {
            if (arr.length < 1) {
                setArr(res.data);
            } else {
                setArr(arr.concat(res.data))
            }

        })
        setArrLength(() => arrLength + 4);
    }

    const tap = Gesture.Pan()
    .activeOffsetY([-90, 90])
    .onEnd((e) => {
        if (e.translationY < 0) {
            if (phrasesReaded > 0) {
                setPhrasesReaded(() => phrasesReaded - 1);
            }
        } else {
            if (phrasesReaded < dbLength.current - 1) {
                setPhrasesReaded(() => phrasesReaded + 1);
            }
        }
        
        console.log(arr);

    });

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex: 1, marginTop: 50, backgroundColor: "red"}}>
                <GestureDetector style={{backgroundColor: "black"}} gesture={tap}>
                    <View style={{flex: 1, backgroundColor: "green"}} collapsable={false}>
                        <Text>
                            {
                                arr[phrasesReaded] && arr[phrasesReaded].phrase
                            }
                        </Text>
                    </View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dragHandler: {
        alignSelf: 'stretch',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    }
});
