import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PaymentTypePickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string, itemIndex: number) => void;
}

export const PaymentTypePicker: React.FC<PaymentTypePickerProps> = ({ selectedValue, onValueChange }) => {

    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.label}>Karta/Gotówka</Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                >
                    <Picker.Item style={styles.pickerItem} label="Wybierz" value="" />
                    <Picker.Item style={styles.pickerItem} label="Karta" value="Karta" />
                    <Picker.Item style={styles.pickerItem} label="Gotówka" value="Gotówka" />
                    <Picker.Item style={styles.pickerItem} label="DKV" value="DKV" />
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
        textAlign: "center",
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
    },
    pickerItem: {
        fontSize: 13,
    },
});

