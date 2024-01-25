import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DriverCost {
    data: string;
    opis: string;
    kwota: number;
    waluta: string;
}

const driverCosts: DriverCost[] = [
    { data: '2023-04-01', opis: 'Jedzenie', kwota: 30, waluta: 'PLN' },
    { data: '2023-04-03', opis: 'Nocleg', kwota: 120, waluta: 'PLN' },
    { data: '2023-04-05', opis: 'Leki', kwota: 45, waluta: 'PLN' },
    { data: '2023-04-10', opis: 'Ubrania', kwota: 200, waluta: 'PLN' },
    { data: '2023-04-15', opis: 'Telefon komórkowy', kwota: 50, waluta: 'PLN' },
    { data: '2023-04-20', opis: 'Transport publiczny', kwota: 60, waluta: 'PLN' },
    { data: '2023-04-22', opis: 'Prezenty', kwota: 150, waluta: 'PLN' },
    { data: '2023-04-25', opis: 'Rozrywka', kwota: 80, waluta: 'PLN' },
    { data: '2023-04-30', opis: 'Książki', kwota: 90, waluta: 'PLN' },
    { data: '2023-05-05', opis: 'Higiena', kwota: 70, waluta: 'PLN' }
];

export const DriverCostsScreen: React.FC = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Data</Text>
                        <Text style={styles.tableHeader}>Opis</Text>
                        <Text style={styles.tableHeader}>Kwota</Text>
                        <Text style={styles.tableHeader}>Waluta</Text>
                    </View>
                    {driverCosts.map((cost, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{cost.data}</Text>
                            <Text style={styles.tableCell}>{cost.opis}</Text>
                            <Text style={styles.tableCell}>{cost.kwota}</Text>
                            <Text style={styles.tableCell}>{cost.waluta}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
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
});
