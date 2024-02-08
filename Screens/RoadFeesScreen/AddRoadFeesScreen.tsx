import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useLocationData } from '../../components/hooks/useLocationData';
import { InputField } from '../../components/Common/InputField';
import { PaymentTypePicker } from '../../components/Common/PaymentTypePicker';
import { ImagePickerComponent } from '../../components/Common/ImagePickerComponent';
import { SaveButton } from '../../components/Common/SaveButton';

interface FeeObject {
    coordinates: string;
    date: string;
    country: string | null;
    amount: string;
    currency: string | null;
    paymentType: string;
    description: string;
    photo: string;
}

export const AddRoadFeesScreen = () => {
    const { location, country, currency } = useLocationData();
    const [photo, setPhoto] = useState<string>('');

    const [fee, setFee] = useState<FeeObject>({
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
        { label: 'Data', placeholder: '...', value: fee.date, name: 'date', keyboardType: '', editable: false },
        { label: 'Kraj', placeholder: '...', value: fee.country || '', name: 'country', keyboardType: '', editable: false },
        { label: 'Waluta', placeholder: '...', value: fee.currency || '', name: 'currency', keyboardType: '', editable: false },
        { label: 'Kwota', placeholder: '', value: fee.amount, name: 'amount', keyboardType: 'numeric', editable: true },
        { label: 'Opis', placeholder: '', value: fee.description, name: 'description', keyboardType: '', editable: true },
    ];

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFee(prevState => ({
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
        setFee(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(fee);
    };

    useEffect(() => {
        setFee(prevState => ({
            ...prevState,
            photo: photo
        }));
    }, [photo]);

    const saveFee = () => {
        console.log(fee);
        Alert.alert('Koszt został dodany!', JSON.stringify(fee));
    };

    return (
        <>
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
                        selectedValue={fee.paymentType}
                        onValueChange={(itemValue) => handleInputChange('paymentType', itemValue)}
                    />

                    <ImagePickerComponent
                        photo={photo}
                        setPhoto={(newPhoto) => {
                            setPhoto(newPhoto);
                        }}
                    />

                    <SaveButton onPress={saveFee} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
