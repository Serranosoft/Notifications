import ImageBackgroundPicker from "../presentational/ImageBackgroundPicker";
import * as ImagePicker from 'expo-image-picker';

export default function ImageBackgroundPickerContainer({setBackgroundHome, setBgModalVisible}) {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setBackgroundHome(result.assets[0].uri);
        }
    };

    return (
        <>
            <ImageBackgroundPicker callback={pickImage} setBgModalVisible={setBgModalVisible} />
        </>
    )


}