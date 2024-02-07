import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { pickImage } from '../utils/imagePicker';
import { useLocationData } from '../hooks/useLocationData';
import { PaymentTypePicker } from '../Common/PaymentTypePicker';
import { SafeAreaView } from 'react-native-safe-area-context';


type KeyboardTypeOptions = 'default' | 'numeric' | 'email-address' | 'phone-pad';

interface FuelingObject {
    coordinates: string;
    date: string;
    country: string;
    amount: number;
    quantityLiters: number;
    currency: string;
    mileage: number;
    paymentType: string;
    photo: string | null;
    liters: number;
}

interface ReadOnlyInputProps {
    label: string;
    value: string | number | undefined;
}

const ReadOnlyInput = ({ label, value }: ReadOnlyInputProps) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value ? value.toString() : ''}
            placeholder=""
            editable={false}
        />
    </>
);

export const AddFuelScreen = () => {
    const { location, country, currency } = useLocationData();

    const [fueling, setFueling] = useState<FuelingObject>({
        coordinates: '',
        date: '',
        country: '',
        amount: 0,
        quantityLiters: 0,
        currency: '',
        mileage: 0,
        paymentType: '',
        photo: null,
        liters: 0,
    });

    const [tempDate, setTempDate] = useState(fueling.date);
    const [tempAmount, setTempAmount] = useState(fueling.amount.toString());
    const [tempMileage, setTempMileage] = useState(fueling.mileage.toString());
    const [tempCurrency, setTempCurrency] = useState(fueling.currency);
    const [tempLiters, setTempLiters] = useState(fueling.liters.toString());
    const [paymentType, setPaymentType] = useState('');
    const [isFullTank, setIsFullTank] = useState('');

    const handlePaymentTypeChange = (itemValue: string, itemIndex: number) => {
        setPaymentType(itemValue);
    };

    const handleFullTankChange = (itemValue: string, itemIndex: number) => {
        setIsFullTank(itemValue);
    };

    // Ta funkcja obsługuje zmianę wartości kwoty paliwa.
    // Najpierw usuwa wszystkie znaki, które nie są cyframi lub kropką.
    // Następnie ogranicza liczbę miejsc po przecinku do dwóch.
    // Na koniec aktualizuje stan 'fueling' z nową wartością kwoty.
    const handleAmountChange = (text: string) => {
        const amount = text.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d+/, '$1');
        setFueling(prevState => ({ ...prevState, amount: amount !== '' ? parseFloat(amount) : 0 }));
    };

    const handleLitersChange = (text: string) => {
        const liters = text.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d+/, '$1');
        setFueling(prevState => ({ ...prevState, liters: liters !== '' ? parseFloat(liters) : 0 }));
    };

    const handleMileageChange = (text: string) => {
        const mileage = text.replace(/[^0-9]/g, '');
        setFueling(prevState => ({ ...prevState, mileage: mileage !== '' ? parseInt(mileage, 10) : 0 }));
    };

    const saveData = () => {
        if (!tempDate || !tempAmount || !tempMileage || !tempCurrency || !tempLiters || paymentType === '') {
            Alert.alert('Wszystkie pola są wymagane!');
            return;
        }

        const newFueling = {
            ...fueling,
            coordinates: `${location?.coords.latitude}, ${location?.coords.longitude}`,
            date: tempDate,
            amount: parseFloat(tempAmount),
            mileage: parseInt(tempMileage, 10),
            currency: tempCurrency,
            liters: parseInt(tempLiters, 10),

        };

        setFueling(newFueling);
        console.log(newFueling);
    };

    useEffect(() => {
        if (!fueling.date) {
            const currentDate = new Date().toISOString().split('T')[0];
            setFueling({ ...fueling, date: currentDate });
        }
    }, [fueling, setFueling]);

    useEffect(() => {
        setTempDate(fueling.date);
        setTempCurrency(fueling.currency);
        setTempAmount(fueling.amount > 0 ? fueling.amount.toString() : '');
        setTempMileage(fueling.mileage > 0 ? fueling.mileage.toString() : '');
        setTempLiters(fueling.liters > 0 ? fueling.liters.toString() : '');
    }, [fueling]);

    useEffect(() => {
        if (fueling.photo) {
            Alert.alert("Zdjęcie zostało dodane!");
        }
    }, [fueling.photo]);

    useEffect(() => {
        if (currency) {
            setFueling(prevState => ({ ...prevState, currency: currency }));
        }
    }, [currency]);

    const handlePickImage = async () => {
        const imageUri = await pickImage();
        if (imageUri) {
            setFueling(prevState => ({ ...prevState, photo: imageUri }));
        }
    };

    const inputs = [
        { label: 'Kwota', value: fueling.amount, handler: handleAmountChange, keyboardType: 'numeric' },
        { label: 'Ilość litrów', value: fueling.liters, handler: handleLitersChange, keyboardType: 'numeric' },
        { label: 'Stan Licznika', value: fueling.mileage, handler: handleMileageChange, keyboardType: 'numeric' },
    ];

    return (
        <>
            <ScrollView>
                <View style={styles.container}>

                    <ReadOnlyInput label="Data" value={fueling.date} />
                    <ReadOnlyInput label="Kraj" value={country || undefined} />
                    <ReadOnlyInput label="Waluta" value={fueling.currency} />

                    {inputs.map(({ label, value, handler, keyboardType }, index) => (
                        <View key={index}>
                            <Text style={styles.label}>{label}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handler}
                                value={value !== null && value !== 0 ? value.toString() : ''}
                                placeholder=""
                                keyboardType={keyboardType as KeyboardTypeOptions}
                            />
                        </View>
                    ))}

                    <PaymentTypePicker
                        selectedValue={paymentType}
                        onValueChange={(itemValue) => handlePaymentTypeChange(itemValue, 0)}
                    />

                    <Text style={styles.label}>Tankowanie do pełna</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={isFullTank}
                            onValueChange={handleFullTankChange}
                        >
                            <Picker.Item label="Wybierz" value="" style={styles.pickerItem} />
                            <Picker.Item label="Tak" value="Tak" style={styles.pickerItem} />
                            <Picker.Item label="Nie" value="Nie" style={styles.pickerItem} />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Paragon</Text>
                    {fueling.photo && (
                        <View>
                            <Image source={{ uri: fueling.photo }} style={{ width: 250, height: 250, marginBottom: 20 }} />
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                        <Text style={styles.buttonText}>Dodaj zdjecie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={saveData}>
                        <Text style={styles.buttonText}>Wyślij dane</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 5,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    picker: {
        marginLeft: 36,
        marginRight: 36,
        width: Dimensions.get('window').width * 0.8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 0,
    },
    pickerItem: {
        fontSize: 14,
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
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
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 0,
        textAlign: 'center',
    },
    pickerContainer: {
        width: '100%',
        alignItems: 'center',
    }
});
