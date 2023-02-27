import { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming, Easing, withDelay } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import fetchPhrases from '../utils/fetchPhrases';
import { BackgroundModal } from '../utils/backgroundModal';
import { CategoryModal } from '../utils/categoryModal';
import PracticeMode from '../utils/practiceMode';
import Menu from '../src/components/Menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

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
    const [category, setCategory] = useState(null);
    // Background
    const [backgroundHome, setBackgroundHome] = useState("https://qebnmxnfniqfbjrbkwpx.supabase.co/storage/v1/object/public/backgrounds/background1.jpg");
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
        <>
            <ImageBackground source={{ uri: backgroundHome }} style={styles.container}>
                {swipeVisible && 
                    <LottieView source={require("../assets/lottie/swipe.json")} style={styles.lottie} loop={true} autoPlay={true} />
                }

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
                <Menu {...{ practiceMode, setPracticeMode, bgModalVisible, setBgModalVisible, setCatModalVisible }} />
            </ImageBackground>



            {/* Modal para elegir imágen de fondo, bgModalVisible y setBgModalVisible para establecer visibilidad del modal y
                            set backgroundHome para establecer la imagen de fondo */}
            <BackgroundModal {...{ setBgModalVisible, bgModalVisible, setBackgroundHome }} />
            {/* Modal para elegir categoría, catModalVisible y setCatModalVisible para establecer visibilidad del modal y setCategory
                            para establecer la categoría actual. */}
            <CategoryModal {...{ setCatModalVisible, catModalVisible, setCategory }} />
            {/* Child component para establecer el modo práctica. */}
            <PracticeMode {...{ setPracticeMode, practiceMode, position, phrasesReaded, setPhrasesReaded }} />
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("93%"),
        position: "relative"
    },
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
})