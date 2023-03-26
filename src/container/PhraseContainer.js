import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedStyle, withDelay, Easing, withTiming } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import Phrase from "../presentational/Phrase";
import { useContext } from "react";
import { DataContext } from "../../utils/DataContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PhraseContainer({setPhrasesReaded, checkIfFavoriteExists}) {

    const { practiceMode, position, phrasesReaded, dbLength, phrasesArr } = useContext(DataContext);

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetY([60, 60])
        .onUpdate((e) => {
            if (!practiceMode) {
                position.value = e.translationY;
            }
        })
        .onEnd((e) => {
            if (!practiceMode) {
                if (e.translationY < -60) {
                    if (phrasesReaded < dbLength - 1) {
                        position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                        if (e.translationY < 60 && e.translationY > -60) {
                            position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                        }
                        setTimeout(() => {
                            setPhrasesReaded(() => phrasesReaded + 1);
                            position.value = Dimensions.get("window").height;
                            position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        }, 250)
                    } else {
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }));
                    }
                } else if (e.translationY > 60) {
                    if (phrasesReaded > 0) {
                        position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                        if (e.translationY < 60 && e.translationY > -60) {
                            position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                        }
                        setTimeout(() => {
                            setPhrasesReaded(() => phrasesReaded - 1);
                            position.value = -Dimensions.get("window").height;
                            position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                        }, 250)

                    } else {
                        position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                    }
                }
            }
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
        width: "75%"
    }));

    return (
        <>
            <GestureDetector gesture={tap}>
                <View style={[styles.animatedView, practiceMode && styles.fullHeight]}>
                    <Animated.View style={[animatedStyle]} collapsable={false}>
                        <Phrase phrase={phrasesArr[phrasesReaded]} checkIfFavoriteExists={checkIfFavoriteExists} />
                    </Animated.View>
                </View>
            </GestureDetector>

        </>
    )
}

const styles = StyleSheet.create({
    animatedView: {
        height: hp("80%"),
        justifyContent: "center",
        alignItems: "center",
    },
    fullHeight: {
        height: "100%"
    }
})