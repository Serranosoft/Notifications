
import { View } from "react-native"
import { Stack } from "expo-router";
import { useContext } from 'react';
import { BackgroundModal } from '../utils/backgroundModal';
import { CategoryModal } from '../utils/categoryModal';
import Footer from '../src/components/Footer';
import PhraseContainer from '../src/Phrase/PhraseContainer';
import Header from '../src/components/Header';
import { DataContext } from '../utils/DataContext';
import Storage from "../src/AsyncStorage/AsyncStorage";

export default function App() {

    const { bgModalVisible, catModalVisible } = useContext(DataContext);
    

    return (
        <View style={{ flex: 0.97 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Header />
            <PhraseContainer />
            <Footer />
            <BackgroundModal bgModalVisible={bgModalVisible} />
            <CategoryModal catModalVisible={catModalVisible} />
            <Storage />
        </View>

    );
}

