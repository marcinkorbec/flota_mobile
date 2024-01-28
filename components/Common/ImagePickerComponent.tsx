import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { pickImage } from '../utils/imagePicker';


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
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#E8364F',
        padding: 10,
        margin: 5,
        marginBottom: 10,
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
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

