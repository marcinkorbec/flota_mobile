import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AddFuelScreenNavigationProp, RootStackParamList } from '../../types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';


interface AddFuelScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'AddFuelScreen'>;
}

interface Tankowanie {
    data: string;
    kwota: number;
    waluta: string;
    przebieg: number;
    photo: string | null;
    litry: number;
}

const isoCurrencyMap: { [key: string]: string } = {
    'AL': 'ALL', // Albania
    'AD': 'EUR', // Andora
    'AT': 'EUR', // Austria
    'BY': 'BYN', // Białoruś
    'BE': 'EUR', // Belgia
    'BA': 'BAM', // Bośnia i Hercegowina
    'BG': 'BGN', // Bułgaria
    'HR': 'HRK', // Chorwacja
    'CY': 'EUR', // Cypr
    'CZ': 'CZK', // Czechy
    'DK': 'DKK', // Dania
    'EE': 'EUR', // Estonia
    'FI': 'EUR', // Finlandia
    'FR': 'EUR', // Francja
    'GR': 'EUR', // Grecja
    'ES': 'EUR', // Hiszpania
    'NL': 'EUR', // Holandia
    'IE': 'EUR', // Irlandia
    'IS': 'ISK', // Islandia
    'LI': 'CHF', // Liechtenstein
    'LT': 'EUR', // Litwa
    'LU': 'EUR', // Luksemburg
    'LV': 'EUR', // Łotwa
    'MT': 'EUR', // Malta
    'MD': 'MDL', // Mołdawia
    'MC': 'EUR', // Monako
    'DE': 'EUR', // Niemcy
    'NO': 'NOK', // Norwegia
    'PL': 'PLN', // Polska
    'PT': 'EUR', // Portugalia
    'RU': 'RUB', // Rosja
    'RO': 'RON', // Rumunia
    'SM': 'EUR', // San Marino
    'RS': 'RSD', // Serbia
    'SK': 'EUR', // Słowacja
    'SI': 'EUR', // Słowenia
    'CH': 'CHF', // Szwajcaria
    'SE': 'SEK', // Szwecja
    'TR': 'TRY', // Turcja
    'UA': 'UAH', // Ukraina
    'HU': 'HUF', // Węgry
    'GB': 'GBP', // Wielka Brytania
    'IT': 'EUR', // Włochy
};


export const AddFuelScreen: React.FC<AddFuelScreenProps> = ({ navigation }) => {
    const [tankowanie, setTankowanie] = useState<Tankowanie>({
        data: '',
        kwota: 0,
        waluta: '',
        przebieg: 0,
        photo: null,
        litry: 0,
    });
    const [tempData, setTempData] = useState(tankowanie.data);
    const [tempKwota, setTempKwota] = useState(tankowanie.kwota.toString());
    const [tempPrzebieg, setTempPrzebieg] = useState(tankowanie.przebieg.toString());
    const [tempWaluta, setTempWaluta] = useState(tankowanie.waluta);
    const [tempLitry, setTempLitry] = useState(tankowanie.litry.toString());
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [payment, setPayment] = useState(false);
    const [valuePayment, setValuePayment] = useState(null);
    const [itemsPayment, setItemsPayment] = useState([
        { label: 'Gotówka', value: 'Gotówka' },
        { label: 'Karta', value: 'Karta' },
        { label: 'DKV', value: 'DKV' },
        { label: 'ORLEN', value: 'ORLEN' },
    ]);

    const handlePrzebiegChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        const przebieg = cleanedText === '' ? '' : parseInt(cleanedText, 10).toString();
        setTempPrzebieg(przebieg);
    };


    const handleKwotaChange = (text: string) => {
        const kwota = text.trim() === '' ? '' : parseFloat(text).toString();
        setTempKwota(kwota);
    };

    useEffect(() => {
        setTempData(tankowanie.data);
        setTempKwota(tankowanie.kwota.toString());
        setTempPrzebieg(tankowanie.przebieg.toString());
        setTempWaluta(tankowanie.waluta);
        setTempLitry(tankowanie.litry.toString());
    }, [tankowanie]);

    const saveData = () => {
        setTankowanie({
            ...tankowanie,
            data: tempData,
            kwota: parseFloat(tempKwota),
            przebieg: parseInt(tempPrzebieg, 10),
            waluta: tempWaluta,
            litry: parseInt(tempLitry, 10),
        });
    };

    useEffect(() => {
        if (!tankowanie.data) {
            const currentDate = new Date().toISOString().split('T')[0];
            setTankowanie({ ...tankowanie, data: currentDate });
        }
    }, [tankowanie, setTankowanie]);


    useEffect(() => {
        setTempData(tankowanie.data);
        setTempKwota(tankowanie.kwota.toString());
        setTempPrzebieg(tankowanie.przebieg.toString());
        setTempWaluta(tankowanie.waluta);
    }, [tankowanie]);

    useEffect(() => {
        if (tankowanie.photo) {
            Alert.alert("Zdjęcie zostało zaktualizowane");
        }
    }, [tankowanie.photo]);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Brak uprawnień do odczytu lokalizacji');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if (location) {
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                console.log(reverseGeocode);
                if (reverseGeocode.length > 0 && reverseGeocode[0].country) {
                    setCountry(reverseGeocode[0].country);
                } else {
                    console.log('Nie udało się uzyskać danych kraju.');
                }
            }

            if (location) {
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                if (reverseGeocode.length > 0 && reverseGeocode[0].isoCountryCode) {
                    const isoCountryCode = reverseGeocode[0].isoCountryCode;
                    setCountry(reverseGeocode[0].country || 'default');
                    const currency = isoCurrencyMap[isoCountryCode];
                    if (currency) {
                        setTankowanie(prevState => ({ ...prevState, waluta: currency }));
                    }
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        // Request permissions for camera and photo library
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
            Alert.alert('Przykro nam, potrzebujemy uprawnień do aparatu i biblioteki zdjęć!');
            return;
        }

        // Options for user: Take picture or get from gallery
        const action = await new Promise((resolve) => {
            Alert.alert(
                "Dodaj zdjęcie",
                "Wybierz metodę dodania zdjęcia",
                [
                    {
                        text: "Zrób zdjęcie",
                        onPress: () => resolve('capture'),
                    },
                    {
                        text: "Wybierz z galerii",
                        onPress: () => resolve('library'),
                    },
                    {
                        text: "Anuluj",
                        onPress: () => resolve(null),
                        style: "cancel",
                    },
                ],
                { cancelable: true }
            );
        });

        let result;

        if (action === 'capture') {
            // The user selected the option to take a photo            
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
        } else if (action === 'library') {
            // The user chose the option to select a photo from the gallery
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (result && !result.canceled && result.assets && result.assets.length > 0) {
            const successResult = result.assets[0].uri;
            setTankowanie(prevState => ({ ...prevState, photo: successResult }));
            console.log(successResult);
        }
    };

    return (
        <ScrollView>
            <View style={styles.modalView}>

                <Text style={styles.label}>Współrzędne</Text>
                <TextInput
                    style={styles.input}
                    value={location ? `${location.coords.latitude}, ${location.coords.longitude}` : ''}
                    placeholder="Współrzędne"
                    editable={false}
                />

                <Text style={styles.label}>Data</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTankowanie({ ...tankowanie, data: text })}
                    value={tankowanie.data}
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
                    onChangeText={handleKwotaChange}
                    value={tempKwota}
                    placeholder="Kwota"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Waluta</Text>
                <TextInput
                    style={styles.input}
                    value={tankowanie.waluta}
                    placeholder="Waluta"
                    editable={false}
                />

                <Text style={styles.label}>Stan Licznika</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handlePrzebiegChange}
                    value={tempPrzebieg}
                    placeholder="Przebieg"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Karta/Gotówka</Text>
                <View style={styles.pickerContainer}>
                    <DropDownPicker
                        style={styles.picker}
                        open={payment}
                        value={valuePayment}
                        items={itemsPayment}
                        setOpen={setPayment}
                        setValue={setValuePayment}
                        setItems={setItemsPayment}
                        dropDownContainerStyle={{ width: '80%', marginLeft: "10%", marginRight: "10%" }}
                        translation={{
                            PLACEHOLDER: "Wybierz"
                        }}
                    />
                </View>

                <Text style={styles.label}>Paragon</Text>
                {tankowanie.photo && (
                    <View>
                        <Image source={{ uri: tankowanie.photo }} style={{ width: 200, height: 200 }} />
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={pickImage}>
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
    input: { height: 50, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 0, paddingLeft: 10 },
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
        borderColor: 'grey',
        color: 'black',
        borderRadius: 0,
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
