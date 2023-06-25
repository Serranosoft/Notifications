
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Home from './app/Home';
// import { StatusBar, View } from "react-native"
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useCallback } from 'react';
// // import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

// SplashScreen.preventAutoHideAsync();

// export default function App() {

//     const [fontsLoaded] = useFonts({
//         // 'Arthead-Regular': require('./assets/fonts/Arthead/Arthead-Regular.otf'),
//         // 'Arthead-Bold': require('./assets/fonts/Arthead/Arthead-Bold.otf'),
//         "Hubhead": require("./assets/fonts/Hubhead/Hubhead.otf"),
//     });

//     const onLayoutRootView = useCallback(async () => {
//         if (fontsLoaded) {
//             await SplashScreen.hideAsync();
//         }
//     }, [fontsLoaded]);

//     if (!fontsLoaded) {
//         return null;
//     }

//     mobileAds()
//         .setRequestConfiguration({
//             // Update all future requests suitable for parental guidance
//             maxAdContentRating: MaxAdContentRating.PG,

//             // Indicates that you want your content treated as child-directed for purposes of COPPA.
//             tagForChildDirectedTreatment: true,

//             // Indicates that you want the ad request to be handled in a
//             // manner suitable for users under the age of consent.
//             tagForUnderAgeOfConsent: true,
//         })
//         .then(() => {
//             // Request config successfully set!
//         });

//     mobileAds()
//         .initialize()
//         .then(adapterStatuses => {
//             // Initialization complete!
//         });

//     return (
//         <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//             <GestureHandlerRootView style={{ flex: 1 }}>
//                 <Home />
//             </GestureHandlerRootView>
//         </View>

//     );
// }

