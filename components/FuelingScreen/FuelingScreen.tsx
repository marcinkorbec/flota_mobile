import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Tankowanie {
    data: string;
    kwota: number;
    waluta: string;
    przebieg: number;
    photo: string | null;
    litry: number;
}

const mojeTankowania: Tankowanie[] = [
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 150800, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 215000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 415000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 115000, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 18568, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 17897, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 17356, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 17152, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 16895, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 16589, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 16234, photo: null, litry: 90 },
    { data: '2023-04-01', kwota: 250.00, waluta: 'PLN', przebieg: 15800, photo: null, litry: 90 },
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

export const FuelingScreen = () => {


    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#E8364F" />
            <ScrollView style={styles.container}>
                {/* <View style={styles.consumptionContainer}>
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
                </View> */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Data</Text>
                        <Text style={styles.tableHeader}>Kwota</Text>
                        <Text style={styles.tableHeader}>Przebieg</Text>
                        <Text style={styles.tableHeaderLast}>Litry</Text>
                    </View>
                    {mojeTankowania.map((tankowanie, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{tankowanie.data}</Text>
                            <Text style={styles.tableCell}>{tankowanie.kwota.toFixed()} {tankowanie.waluta}</Text>
                            <Text style={styles.tableCell}>{tankowanie.przebieg} km</Text>
                            <Text style={styles.tableCellLast}>{tankowanie.litry.toFixed()} l</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
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
        flex: 0.3,
        padding: 5,
    },
    tableHeaderLast: {
        fontWeight: 'bold',
        flex: 0.15,
        padding: 5,
    },
    tableCell: {
        flex: 0.3,
        padding: 5,
    },
    tableCellLast: {
        flex: 0.15,
        padding: 5,
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
