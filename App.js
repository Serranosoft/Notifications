
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import {StatusBar} from "react-native"

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <Home />
        </GestureHandlerRootView>

    );
}

