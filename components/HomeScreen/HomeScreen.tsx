import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { changeNavigationBarColor } from 'react-native-navigation-bar-color';
import { CustomModal } from './CustomModal/CustomModal';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MenuModal } from '../Menu/MenuModal';


type HomeScreenNavigationProp = DrawerNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;

interface Tankowanie {
    data: string;
    kwota: number;
    waluta: string;
    przebieg: number;
    photo: string | null;
    litry: number;
}

// interface HomeScreenProps {
//     navigation: HomeScreenNavigationProp;
// }

const mojeTankowania: Tankowanie[] = [
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15000, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 310.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 200.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 100.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 390.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 520.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 300.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 300.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 300.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },
    { data: '2023-04-15', kwota: 300.00, waluta: 'PLN', przebieg: 15230, photo: null, litry: 90 },

];

export const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    // Ten kod jest wywoływany podczas montowania i aktualizacji komponentu.
    // Ustawia opcje dla nagłówka nawigacji.
    // Dodaje przycisk menu w lewym rogu nagłówka, który otwiera menu po naciśnięciu.
    // ANCHOR Ten kod używa hooka useLayoutEffect z Reacta, który pozwala na manipulację opcjami nawigacji.

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center', // Ustawia wyśrodkowanie tytułu nagłówka
            headerLeft: () => ( // Dodaje przycisk menu w lewym rogu nagłówka
                <TouchableOpacity
                    onPress={() => setMenuVisible(true)} // Ustawia widoczność menu na true po naciśnięciu przycisku
                    style={{ marginLeft: 10, backgroundColor: 'transparent' }} // Ustawia styl przycisku menu
                >
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]); // Wywołuje efekt po zmianie wartości navigation

    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(false);
            setMenuVisible(false);
        }, [])
    );

    //@TODO - zmienić kolor paska nawigacji
    // React.useEffect(() => {
    //     changeNavigationBarColor('#E8364F', true); // drugi argument określa, czy pasek nawigacji powinien być jasny czy ciemny
    // }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#E8364F" />
            <ScrollView style={styles.container}>
                <View style={styles.consumptionContainer}>
                    <View style={styles.consumptionBox}>
                        <MaterialCommunityIcons name="fuel" size={24} color="#E8364F" />
                        <Text style={styles.consumptionValue}>8,9 l/100km</Text>
                        <Text style={styles.consumptionText}>Średnie spalanie</Text>
                    </View>
                    <View style={styles.consumptionBox}>
                        <MaterialCommunityIcons name="fire" size={24} color="#E8364F" />
                        <Text style={styles.consumptionValue}>9.0 l/100km</Text>
                        <Text style={styles.consumptionText}>Ostatnie spalanie</Text>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Data</Text>
                        <Text style={styles.tableHeader}>Kwota</Text>
                        <Text style={styles.tableHeader}>Waluta</Text>
                        <Text style={styles.tableHeader}>Przebieg</Text>
                    </View>
                    {mojeTankowania.map((tankowanie, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{tankowanie.data}</Text>
                            <Text style={styles.tableCell}>{tankowanie.kwota.toFixed(2)}</Text>
                            <Text style={styles.tableCell}>{tankowanie.waluta}</Text>
                            <Text style={styles.tableCell}>{tankowanie.przebieg}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <MenuModal menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 5,
    },
    tableHeader: {
        fontWeight: 'bold',
        flex: 1,
        padding: 5,
    },
    tableCell: {
        flex: 1,
        padding: 5,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#E8364F',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    consumptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
    },
    consumptionBox: {
        alignItems: 'center',
    },
    consumptionValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    consumptionText: {
        fontSize: 16,
        color: '#665',
    },
});

