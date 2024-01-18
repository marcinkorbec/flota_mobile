import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';


interface CustomModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    tankowanie: Tankowanie;
    setTankowanie: (tankowanie: Tankowanie) => void;
}

interface Tankowanie {
    data: string;
    kwota: number;
    waluta: string;
    przebieg: number;
    photo: string | null;
    litry: number;
}

export const CustomModal: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible, tankowanie, setTankowanie }) => {
    const [tempData, setTempData] = useState(tankowanie.data);
    const [tempKwota, setTempKwota] = useState(tankowanie.kwota.toString());
    const [tempPrzebieg, setTempPrzebieg] = useState(tankowanie.przebieg.toString());
    const [tempWaluta, setTempWaluta] = useState(tankowanie.waluta);
    const [tempLitry, setTempLitry] = useState(tankowanie.litry.toString());


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'PLN', value: 'PLN' },
        { label: 'EUR', value: 'EUR' }
    ]);

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
    }, [modalVisible, tankowanie, setTankowanie]);


    useEffect(() => {
        setTempData(tankowanie.data);
        setTempKwota(tankowanie.kwota.toString());
        setTempPrzebieg(tankowanie.przebieg.toString());
        setTempWaluta(tankowanie.waluta);
    }, [tankowanie]);

    useEffect(() => {
        if (tankowanie.photo) {
            // Tutaj możesz zrobić coś, gdy zdjęcie zostanie zaktualizowane
            // Na przykład wyświetlić alert lub zaktualizować interfejs użytkownika
            Alert
        }
    }, [tankowanie.photo]);

    const pickImage = async () => {
        // Prośba o uprawnienia do aparatu i biblioteki zdjęć
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
            Alert.alert('Przykro nam, potrzebujemy uprawnień do aparatu i biblioteki zdjęć!');
            return;
        }

        // Opcje dla użytkownika: Zrób zdjęcie lub Wybierz z galerii
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
            // Użytkownik wybrał opcję zrobienia zdjęcia
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else if (action === 'library') {
            // Użytkownik wybrał opcję wybrania zdjęcia z galerii
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!result.canceled) {
            setTankowanie({ ...tankowanie, photo: result.uri as string });
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <ScrollView>
                <Text style={styles.title}>Nowe tankowanie</Text>
                <View style={styles.modalView}>
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
                        onChangeText={text => setTankowanie({ ...tankowanie, data: text })}
                        // value={ }
                        placeholder="Wpisz kraj"
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
                    <View style={styles.pickerContainer}>
                        <DropDownPicker
                            style={styles.picker}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            dropDownContainerStyle={{ width: '80%', marginLeft: "10%", marginRight: "10%" }}
                            translation={{
                                PLACEHOLDER: "Wybierz"
                            }}
                        />
                    </View>

                    <Text style={styles.label}>Przebieg</Text>
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

                    <Text style={styles.label}>Zdjęcie</Text>
                    {tankowanie.photo && (
                        <View>
                            <Image source={{ uri: tankowanie.photo }} style={{ width: 200, height: 200 }} />
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Dodaj zdjecie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Zapisz dane</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
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

