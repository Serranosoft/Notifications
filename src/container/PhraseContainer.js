import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedStyle, withDelay, Easing, withTiming } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import Phrase from "../presentational/Phrase";

export default function PhraseContainer({practiceMode, position, setPhrasesReaded, phrasesReaded, dbLength, phrasesArr, checkIfFavoriteExists}) {

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetY([60, 60])
        .onUpdate((e) => {
            if (!practiceMode) {
                position.value = e.translationY;
            }
        })
        .onEnd((e) => {
            if (!practiceMode) {
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
            }
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
        width: "75%"
    }));

    function phrase() {
        if (phrasesArr.length > 0 && phrasesArr[phrasesReaded]) {
            return <Phrase phrase={phrasesArr[phrasesReaded].phrase} checkIfFavoriteExists={checkIfFavoriteExists} />
        }
    }
    
    return (
        <>
            <GestureDetector gesture={tap}>
                <View style={[styles.animatedView, practiceMode && styles.fullHeight]}>
                    <Animated.View style={[animatedStyle]} collapsable={false}>
                        { phrase() }
                    </Animated.View>
                </View>
            </GestureDetector>

        </>
    )
}

const styles = StyleSheet.create({
    animatedView: {
        height: "83%",
        justifyContent: "center",
        alignItems: "center",
    },
    fullHeight: {
        height: "100%"
    }
})