import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { pickImage } from '../utils/imagePicker';
import { useLocationData } from '../hooks/useLocationData';


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


    return (
        <ScrollView>
            <View style={styles.modalView}>

                {/* <Text style={styles.label}>Współrzędne</Text> */}
                <TextInput
                    style={{ ...styles.input, display: 'none' }}
                    value={location ? `${location.coords.latitude}, ${location.coords.longitude}` : ''}
                    placeholder="Współrzędne"
                    editable={false}
                />

                <Text style={styles.label}>Data</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setFueling({ ...fueling, date: text })}
                    value={fueling.date}
                    placeholder="Data"
                />

                <Text style={styles.label}>Kraj</Text>
                <TextInput
                    style={styles.input}
                    value={country || undefined}
                    placeholder="Kraj"
                    editable={false}
                />

                <Text style={styles.label}>Kwota</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleAmountChange}
                    value={fueling.amount !== null && fueling.amount !== 0 ? fueling.amount.toString() : ''}
                    placeholder="Wpisz kwote"
                    keyboardType="numeric"
                />


                <Text style={styles.label}>Ilość litrów</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleLitersChange}
                    value={fueling.liters !== null && fueling.liters !== 0 ? fueling.liters.toString() : ''}
                    placeholder="Wpisz ilość litrów"
                    keyboardType="numeric"
                />


                <Text style={styles.label}>Waluta</Text>
                <TextInput
                    style={styles.input}
                    value={fueling.currency}
                    placeholder="Waluta"
                    editable={false}
                />

                <Text style={styles.label}>Stan Licznika</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleMileageChange}
                    value={fueling.mileage !== null && fueling.mileage !== 0 ? fueling.mileage.toString() : ''}
                    placeholder="Wpisz przebieg"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Karta/Gotówka</Text>
                <Picker
                    selectedValue={paymentType}
                    style={styles.picker}
                    onValueChange={handlePaymentTypeChange}
                >
                    <Picker.Item style={styles.pickerItem} label="Wybierz" value="" />
                    <Picker.Item label="Karta" value="Karta" style={styles.pickerItem} />
                    <Picker.Item label="Gotówka" value="Gotówka" style={styles.pickerItem} />
                    <Picker.Item label="DKV" value="DKV" style={styles.pickerItem} />
                    <Picker.Item label="Orlen flota" value="Orlen flota" style={styles.pickerItem} />
                </Picker>

                <Text style={styles.label}>Tankowanie do pełna</Text>
                <Picker
                    selectedValue={isFullTank}
                    style={styles.picker}
                    onValueChange={handleFullTankChange}
                >
                    <Picker.Item label="Wybierz" value="" style={styles.pickerItem} />
                    <Picker.Item label="Tak" value="Tak" style={styles.pickerItem} />
                    <Picker.Item label="Nie" value="Nie" style={styles.pickerItem} />
                </Picker>

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
    );
};


const styles = StyleSheet.create({
    modalView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '80%',
        marginBottom: 0,
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
        width: '80%',
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
        color: 'white',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#E8364F',
        width: "81%",
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
    pickerContainer: {
        width: '100%',
        alignItems: 'center',
    }
});
