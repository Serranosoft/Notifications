import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export default function PracticeMode({ setPhrasesReaded, phrasesReaded, practiceMode, practiceModeInterval, position }) {

    const PHRASES_QTY = 4;

    useEffect(() => {
        if (phrasesReaded === PHRASES_QTY) {
            clearInterval(practiceModeInterval.current);
            practiceModeInterval.current = null;
        }
    }, [phrasesReaded])

    useEffect(() => {
        practiceModeInterval.current = null;
        if (practiceMode) {
            practiceModeInterval.current = setInterval(() => {
                position.value = withTiming(-Dimensions.get("window").height, { duration: 400, easing: Easing.ease });
                setTimeout(() => {
                    setPhrasesReaded((phrasesReaded) => phrasesReaded + 1);
                    position.value = Dimensions.get("window").height;
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))

                }, 250)

            }, 1500)
        }
    }, [practiceMode])

    return (
        <></>
    )
}