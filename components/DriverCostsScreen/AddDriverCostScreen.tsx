import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useLocationData } from '../hooks/useLocationData';
import { SaveButton } from '../Common/SaveButton';
import { PaymentTypePicker } from '../Common/PaymentTypePicker';
import { ImagePickerComponent } from "../Common/ImagePickerComponent";
import { InputField } from '../Common/InputField';

interface CostObject {
    coordinates: string;
    date: string;
    country: string | null;
    amount: string;
    currency: string | null;
    paymentType: string;
    description: string;
    photo: string;
}

export const AddDriverCostScreen = () => {
    const { location, country, currency } = useLocationData();
    const [photo, setPhoto] = useState<string>('');

    const [cost, setCost] = useState<CostObject>({
        coordinates: '',
        date: '',
        country: country,
        amount: '',
        currency: currency,
        paymentType: '',
        description: '',
        photo: '',
    });

    const inputFields = [
        { label: 'Data', placeholder: '...', value: cost.date, name: 'date', keyboardType: '', editable: false },
        { label: 'Kraj', placeholder: '...', value: cost.country || '', name: 'country', keyboardType: '', editable: false },
        { label: 'Waluta', placeholder: '...', value: cost.currency || '', name: 'currency', keyboardType: '', editable: false },
        { label: 'Kwota', placeholder: '...', value: cost.amount, name: 'amount', keyboardType: 'numeric', editable: true },
        { label: 'Opis', placeholder: '...', value: cost.description, name: 'description', keyboardType: '', editable: true },
    ];

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setCost(prevState => ({
            ...prevState,
            date: today,
            country: country || prevState.country,
            currency: currency || prevState.currency,
        }));
        if (location) {
            const coordinates = `${location.coords.latitude}, ${location.coords.longitude}`;
            handleInputChange('coordinates', coordinates);
        }
    }, [country, currency, location]);

    const handleInputChange = (name: string, value: string) => {
        setCost(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(cost);
    };

    useEffect(() => {
        setCost(prevState => ({
            ...prevState,
            photo: photo
        }));
    }, [photo]);

    const saveCost = () => {
        console.log(cost);
        Alert.alert('Koszt został dodany!', JSON.stringify(cost));
    };

    return (
        <ScrollView >
            <View style={styles.container}>
                {inputFields.map(field => (
                    <InputField
                        key={field.name}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChangeText={text => handleInputChange(field.name, text)}
                        label={field.label}
                        keyboardType={field.keyboardType}
                        editable={field.editable}
                    />
                ))}

                <PaymentTypePicker
                    selectedValue={cost.paymentType}
                    onValueChange={(itemValue) => handleInputChange('paymentType', itemValue)}
                />

                <ImagePickerComponent
                    photo={photo}
                    setPhoto={(newPhoto) => {
                        setPhoto(newPhoto);
                    }}
                />

                <SaveButton onPress={saveCost} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

