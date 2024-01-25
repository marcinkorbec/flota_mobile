import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DriverCost {
    data: string;
    opis: string;
    kwota: number;
    waluta: string;
}

const driverCosts: DriverCost[] = [
    { data: '2023-04-01', opis: 'Tankowanie', kwota: 300, waluta: 'PLN' },
    { data: '2023-04-15', opis: 'Serwis', kwota: 450, waluta: 'PLN' },
    { data: '2023-04-20', opis: 'Myjnia', kwota: 50, waluta: 'PLN' },
    { data: '2023-05-02', opis: 'Wymiana opon', kwota: 800, waluta: 'PLN' },
    { data: '2023-05-10', opis: 'Ubezpieczenie', kwota: 600, waluta: 'PLN' },
    { data: '2023-05-20', opis: 'Parking', kwota: 30, waluta: 'PLN' },
    { data: '2023-06-01', opis: 'Tankowanie', kwota: 320, waluta: 'PLN' },
    { data: '2023-06-15', opis: 'Mandat', kwota: 150, waluta: 'PLN' },
    { data: '2023-07-01', opis: 'Naprawa silnika', kwota: 1200, waluta: 'PLN' },
    { data: '2023-07-15', opis: 'Tankowanie', kwota: 310, waluta: 'PLN' }
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
