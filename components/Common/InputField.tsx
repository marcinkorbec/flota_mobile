import React from 'react';
import { TextInput, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType: string;
    editable: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, placeholder, keyboardType, editable }) => {
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType as KeyboardTypeOptions}
                editable={editable}
            />
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '80%',
        marginBottom: 0,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
});

