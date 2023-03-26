
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import { StatusBar, View } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded] = useFonts({
        // 'Arthead-Regular': require('./assets/fonts/Arthead/Arthead-Regular.otf'),
        // 'Arthead-Bold': require('./assets/fonts/Arthead/Arthead-Bold.otf'),
        "Hubhead": require("./assets/fonts/Hubhead/Hubhead.otf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <GestureHandlerRootView style={{flex: 1}}>
                <Home />
            </GestureHandlerRootView>
        </View>

    );
}

