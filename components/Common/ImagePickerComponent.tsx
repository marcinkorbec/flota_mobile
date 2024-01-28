import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { pickImage } from '../utils/imagePicker';
const window = Dimensions.get('window');


interface ImagePickerComponentProps {
    photo: string;
    setPhoto: React.Dispatch<React.SetStateAction<string>>;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ photo, setPhoto }) => {
    const handlePickImage = async () => {
        const imageUri = await pickImage();
        if (imageUri) {
            setPhoto(imageUri);
        }
    };

    return (
        <View style={styles.container}>
            {photo && (
                <Image source={{ uri: photo }} style={styles.image} />
            )}

            <Text style={styles.label}>Paragon</Text>
            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                <Text style={styles.buttonText}>Dodaj zdjecie</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#E8364F',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
        width: (window.width) * 0.81,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
});

