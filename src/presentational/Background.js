import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

export default function Background({ children, image, swipeVisible }) {


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
    },
    lottie: {
        width: 150,
        height: 150,
        position: "absolute",
        top: "15%",
        left: "40%",
    }

});