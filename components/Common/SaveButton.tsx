import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        backgroundColor: '#E8364F',
        width: "81%",
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
});

