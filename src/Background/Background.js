import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { useContext, useEffect } from "react";
import { DataContext } from "../../utils/DataContext";

export default function Background({ children, image }) {

    const { phrasesArr, category, swipeVisible, phrasesReaded, updatedData } = useContext(DataContext);

    useEffect(() => {
        if (phrasesArr.length > 0 && category !== "Favoritos") {
            swipeVisible === true && updatedData({ swipeVisible: false })
        }
    }, [phrasesReaded])

    return (
        <ImageBackground source={image} style={styles.container}>
            {swipeVisible &&
                <LottieView source={require("../../assets/lottie/swipe.json")} style={styles.lottie} loop={true} autoPlay={true} />
            }
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
    },
    lottie: {
        width: 150,
        height: 150,
        position: "absolute",
        top: "15%",
        left: "40%",
    }

});