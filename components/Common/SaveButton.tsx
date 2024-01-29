import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

interface SaveButtonProps {
    onPress: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Zapisz koszt</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
    }
});

