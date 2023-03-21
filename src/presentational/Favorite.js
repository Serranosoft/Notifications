import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Favorite({ handleFavorite, isFavorite }) {

    const progress = useSharedValue(0);

    const colorChange = useAnimatedStyle(() => ({
        color: interpolateColor(progress.value, [0, 1], ['transparent', 'white']),
    }));

    const handlePress = () => {
        progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 500 });
        handleFavorite();
    };

    useEffect(() => {
        if (isFavorite !== undefined) {
            if (isFavorite) {
                progress.value = withTiming(1, { duration: 0 });
            } else {
                progress.value = withTiming(0, { duration: 0 });
            }
        }
    }, [isFavorite])

    return (
        <TouchableOpacity onPressIn={handlePress}>
            <AnimatedSvg viewBox="0 0 299.66333 300.23361" xmlns="http://www.w3.org/2000/svg" style={[colorChange, styles.container]}>
                <Path
                    d="M147.06 35.49l2.772 3.368 2.77-3.367c35.49-43.128 94.182-38.059 124.296 10.734 26.727 43.307 20.326 104.58-14.458 138.397L149.832 294.097 37.224 184.622C2.439 150.804-3.962 89.532 22.766 46.225 52.879-2.568 111.572-7.637 147.06 35.491z"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    strokeWidth={12.2732}
                    strokeDasharray="none"
                    strokeOpacity={1}
                />
            </AnimatedSvg>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
    },
});