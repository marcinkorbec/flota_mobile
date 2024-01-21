import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import DropDownPicker from 'react-native-dropdown-picker';
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
    //const [payment, setPayment] = useState(false);
    const [valuePayment, setValuePayment] = useState(null);
    const [paymentType, setPaymentType] = useState('');
    // const [itemsPayment, setItemsPayment] = useState([
    //     { label: 'Gotówka', value: 'Gotówka' },
    //     { label: 'Karta', value: 'Karta' },
    //     { label: 'DKV', value: 'DKV' },
    //     { label: 'ORLEN', value: 'ORLEN' },
    // ]);

    // const [fullTank, setFullTank] = useState(false);
    // const [itemsFullTank, setItemsFullTank] = useState([
    //     { label: 'Tak', value: true },
    //     { label: 'Nie', value: false },
    // ]);
    // const [openFullTank, setOpenFullTank] = useState(false);
    const [isFullTank, setIsFullTank] = useState('');

    // const handlePrzebiegChange = (text: string) => {
    //     const cleanedText = text.replace(/[^0-9]/g, '');
    //     const przebieg = cleanedText === '' ? '' : parseInt(cleanedText, 10).toString();
    //     setTempPrzebieg(przebieg);
    // };


    // const handleKwotaChange = (text: string) => {
    //     const kwota = text.trim() === '' ? '' : parseFloat(text).toString();
    //     setTempKwota(kwota);
    // };

    // Ta funkcja obsługuje zmiany w polu "Typ płatności". 
    // Sprawdza, czy wprowadzony tekst jest jednym z dozwolonych wartości: 'Karta', 'Gotówka', 'DKV', 'Dkv'.
    // Jeśli tak, aktualizuje stan "paymentType" z nową wartością.
    // W przeciwnym razie wyświetla alert z prośbą o wprowadzenie jednej z dozwolonych wartości.
    const handlePaymentTypeChange = (text: string) => {
        const validValues = ['Karta', 'Gotówka', 'DKV', 'Dkv'];
        if (validValues.includes(text)) {
            setPaymentType(text);
        } else {
            Alert.alert('Wpisz Karta, Gotówka, Dkv')
        }
    };

    // Ta funkcja obsługuje zmiany w polu "Czy zatankowano do pełna". 
    // Sprawdza, czy wprowadzony tekst jest jednym z dozwolonych wartości: 'Tak' lub 'Nie'.
    // Jeśli tak, aktualizuje stan "isFullTank" z nową wartością.
    const handleFullTankChange = (text: string) => {
        const validValues = ['Tak', 'Nie'];
        if (validValues.includes(text)) {
            setIsFullTank(text);
        }
    };

    const handleKwotaChange = (text: string) => {
        const kwota = text.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d+/, '$1');
        setTankowanie(prevState => ({ ...prevState, kwota: kwota !== '' ? parseFloat(kwota) : 0 }));
    };

    // Ta funkcja obsługuje zmiany w polu "Litry". 
    // Usuwa wszystkie znaki, które nie są cyframi lub kropką z wprowadzonego tekstu.
    // Następnie zaokrągla wartość do dwóch miejsc po przecinku.
    // Na koniec aktualizuje stan "tankowanie" z nową wartością "litry".
    const handleLitryChange = (text: string) => {
        const litry = text.replace(/[^0-9.]/g, '').replace(/(\.\d{2})\d+/, '$1');
        setTankowanie(prevState => ({ ...prevState, litry: litry !== '' ? parseFloat(litry) : 0 }));
    };

    // Ta funkcja obsługuje zmiany w polu "Przebieg". 
    // Usuwa wszystkie znaki, które nie są cyframi z wprowadzonego tekstu.
    // Następnie aktualizuje stan "tankowanie" z nową wartością "przebieg".
    const handlePrzebiegChange = (text: string) => {
        const przebieg = text.replace(/[^0-9]/g, '');
        setTankowanie(prevState => ({ ...prevState, przebieg: przebieg !== '' ? parseInt(przebieg, 10) : 0 }));
    };

    // Ta funkcja zapisuje dane wprowadzone przez użytkownika.
    const saveData = () => {
        // Sprawdza, czy wszystkie pola zostały wypełnione.
        // Jeśli jakiekolwiek pole jest puste, wyświetla alert i zwraca funkcję.
        if (!tempData || !tempKwota || !tempPrzebieg || !tempWaluta || !tempLitry || valuePayment === null || valueFullTank === null) {
            Alert.alert('Wszystkie pola są wymagane');
            return;
        }

        // Tworzy nowy obiekt "tankowanie" z aktualnymi danymi wprowadzonymi przez użytkownika.
        const newTankowanie = {
            ...tankowanie,
            data: tempData,
            kwota: parseFloat(tempKwota),
            przebieg: parseInt(tempPrzebieg, 10),
            waluta: tempWaluta,
            litry: parseInt(tempLitry, 10),
        };

        // Aktualizuje stan "tankowanie" nowym obiektem.
        setTankowanie(newTankowanie);
        // Loguje nowy obiekt "tankowanie" do konsoli.
        console.log(newTankowanie);
    };

    useEffect(() => {
        if (!tankowanie.data) {
            const currentDate = new Date().toISOString().split('T')[0];
            setTankowanie({ ...tankowanie, data: currentDate });
        }
    }, [tankowanie, setTankowanie]);


    useEffect(() => {
        setTempData(tankowanie.data);
        setTempWaluta(tankowanie.waluta);
        setTempKwota(tankowanie.kwota > 0 ? tankowanie.kwota.toString() : '');
        setTempPrzebieg(tankowanie.przebieg > 0 ? tankowanie.przebieg.toString() : '');
        setTempLitry(tankowanie.litry > 0 ? tankowanie.litry.toString() : '');
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

            // Pobieranie aktualnej pozycji użytkownika
            let location = await Location.getCurrentPositionAsync({});
            // Zapisywanie pozycji użytkownika
            setLocation(location);

            // Jeżeli udało się pobrać lokalizację
            if (location) {
                // Próba odwrócenia geokodowania, aby uzyskać informacje o lokalizacji na podstawie współrzędnych
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                // Logowanie wyników odwróconego geokodowania
                console.log(reverseGeocode);
                // Jeżeli udało się uzyskać informacje o kraju
                if (reverseGeocode.length > 0 && reverseGeocode[0].country) {
                    // Zapisywanie nazwy kraju
                    setCountry(reverseGeocode[0].country);
                } else {
                    // Logowanie błędu, jeżeli nie udało się uzyskać informacji o kraju
                    console.log('Nie udało się uzyskać danych kraju.');
                }
            }

            if (location) {
                // Wywołanie funkcji reverseGeocodeAsync z biblioteki Location, aby uzyskać informacje o lokalizacji na podstawie współrzędnych
                let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                // Sprawdzenie, czy otrzymano jakiekolwiek dane i czy istnieje kod kraju ISO
                // Sprawdzenie, czy otrzymano jakiekolwiek dane i czy istnieje kod kraju ISO
                if (reverseGeocode.length > 0 && reverseGeocode[0].isoCountryCode) {
                    // Pobranie kodu kraju ISO
                    const isoCountryCode = reverseGeocode[0].isoCountryCode;
                    // Ustawienie nazwy kraju lub 'default', jeśli nazwa kraju nie jest dostępna
                    setCountry(reverseGeocode[0].country || 'default');
                    // Pobranie waluty na podstawie kodu kraju ISO
                    const currency = isoCurrencyMap[isoCountryCode];
                    // Jeśli waluta jest dostępna, ustawienie jej jako waluty tankowania
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
                    value={tankowanie.kwota !== null && tankowanie.kwota !== 0 ? tankowanie.kwota.toString() : ''}
                    placeholder="Wpisz kwote"
                    keyboardType="numeric"
                />


                <Text style={styles.label}>Ilość litrów</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleLitryChange}
                    value={tankowanie.litry !== null && tankowanie.litry !== 0 ? tankowanie.litry.toString() : ''}
                    placeholder="Wpisz ilość litrów"
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
                    value={tankowanie.przebieg !== null && tankowanie.przebieg !== 0 ? tankowanie.przebieg.toString() : ''}
                    placeholder="Wpisz przebieg"
                    keyboardType="numeric"
                />


                {/* <Text style={styles.label}>Karta/Gotówka</Text>
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

                <Text style={styles.label}>Tankowanie do pełna</Text>
                <View style={styles.pickerContainer}>
                    <DropDownPicker
                        style={styles.picker}
                        open={openFullTank}
                        value={valueFullTank}
                        items={itemsFullTank}
                        setOpen={setOpenFullTank}
                        setValue={setValueFullTank}
                        setItems={setItemsFullTank}
                        dropDownContainerStyle={{ width: '80%', marginLeft: "10%", marginRight: "10%" }}
                        translation={{
                            PLACEHOLDER: "Wybierz"
                        }}
                    />
                </View> */}

                <Text style={styles.label}>Karta/Gotówka</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handlePaymentTypeChange}
                    value={paymentType}
                    placeholder="Karta/Gotówka/DKV"
                />

                <Text style={styles.label}>Tankowanie do pełna</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleFullTankChange}
                    value={isFullTank}
                    placeholder="Tak/Nie"
                />

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
    input: { height: 50, borderColor: '#ddd', borderWidth: 1, width: '80%', marginBottom: 0, paddingLeft: 10, backgroundColor: 'white' },
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
