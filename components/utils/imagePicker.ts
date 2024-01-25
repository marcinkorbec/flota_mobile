import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async () => {
    // Request permissions for camera and photo library
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
        Alert.alert('Przykro nam, potrzebujemy uprawnień do aparatu i biblioteki zdjęć!');
        return null;
    }

    // Options for user: Take picture or get from gallery
    const action = await new Promise((resolve) => {
        Alert.alert(
            "Dodaj zdjęcie",
            "Wybierz metodę dodania zdjęcia",
            [
                {
                    text: "Zrób zdjęcie",
                    onPress: () => resolve('capture'),
                },
                {
                    text: "Wybierz z galerii",
                    onPress: () => resolve('library'),
                },
                {
                    text: "Anuluj",
                    onPress: () => resolve(null),
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    });

    let result;

    if (action === 'capture') {
        // The user selected the option to take a photo            
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
    } else if (action === 'library') {
        // The user chose the option to select a photo from the gallery
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
    }

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
        const successResult = result.assets[0].uri;
        return successResult;
    }

    return null;
};