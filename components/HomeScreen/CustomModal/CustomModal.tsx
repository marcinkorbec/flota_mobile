import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
}

export const CustomModal: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible, tankowanie, setTankowanie }) => {
    const [tempData, setTempData] = useState(tankowanie.data);
    const [tempKwota, setTempKwota] = useState(tankowanie.kwota.toString());
    const [tempPrzebieg, setTempPrzebieg] = useState(tankowanie.przebieg.toString());
    const [tempWaluta, setTempWaluta] = useState(tankowanie.waluta);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'PLN', value: 'PLN' },
        { label: 'EUR', value: 'EUR' }
    ]);

    useEffect(() => {
        setTempData(tankowanie.data);
        setTempKwota(tankowanie.kwota.toString());
        setTempPrzebieg(tankowanie.przebieg.toString());
        setTempWaluta(tankowanie.waluta);
    }, [tankowanie]);

    const saveData = () => {
        setTankowanie({
            ...tankowanie,
            data: tempData,
            kwota: parseFloat(tempKwota),
            przebieg: parseInt(tempPrzebieg, 10),
            waluta: tempWaluta,
        });
    };

    useEffect(() => {
        if (!tankowanie.data) {
            const currentDate = new Date().toISOString().split('T')[0];
            setTankowanie({ ...tankowanie, data: currentDate });
        }
    }, [modalVisible, tankowanie, setTankowanie]);

    const pickImage = async () => {
        // Logika wyboru obrazu
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <ScrollView>
                <View style={styles.modalView}>
                    <Text style={styles.label}>Data</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTankowanie({ ...tankowanie, data: text })}
                        value={tankowanie.data}
                        placeholder="Data"
                    />

                    <Text style={styles.label}>Kwota</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTankowanie({ ...tankowanie, kwota: parseFloat(text) })}
                        value={tankowanie.kwota.toString()}
                        placeholder="Kwota"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Waluta</Text>
                    <DropDownPicker
                        style={styles.picker}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        translation={{
                            PLACEHOLDER: "Waluta"
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            setTankowanie({ ...tankowanie, waluta: itemValue })
                        }
                    />

                    <Text style={styles.label}>Przebieg</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTankowanie({ ...tankowanie, przebieg: parseInt(text, 10) })}
                        value={tankowanie.przebieg.toString()}
                        placeholder="Przebieg"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Zdjęcie</Text>
                    {tankowanie.photo && (
                        <View>
                            {/* Tu można dodać obrazek jeśli istnieje */}
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
    picker: {
        marginLeft: 36,
        marginRight: 36,
        width: '80%', // Ustaw szerokość
        borderWidth: 1, // Dodaj ramkę o grubości 1
        borderColor: 'grey', // Ustaw kolor ramki
        color: 'black', // Ustaw kolor tekstu
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
    }
});

