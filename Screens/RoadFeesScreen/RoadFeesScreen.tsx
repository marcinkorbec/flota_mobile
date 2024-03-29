import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RoadFee {
    data: string;
    kraj: string;
    kwota: number;
    waluta: string;
    opis: string;
}

const roadFees: RoadFee[] = [
    { data: '2023-04-01', kraj: 'Polska', kwota: 150, waluta: 'PLN', opis: 'bilet autostrada' },
    { data: '2023-05-15', kraj: 'Niemcy', kwota: 200, waluta: 'EUR', opis: 'vignette' },
    { data: '2023-06-07', kraj: 'Francja', kwota: 180, waluta: 'EUR', opis: 'vignette' },
    { data: '2023-07-12', kraj: 'Włochy', kwota: 160, waluta: 'EUR', opis: 'vignette' },
    { data: '2023-08-21', kraj: 'Hiszpania', kwota: 190, waluta: 'EUR', opis: 'vignette' },
    { data: '2023-09-30', kraj: 'Czechy', kwota: 170, waluta: 'CZK', opis: 'vignette' },
    { data: '2023-10-11', kraj: 'Słowacja', kwota: 155, waluta: 'EUR', opis: 'mandat' },
    { data: '2023-11-05', kraj: 'Węgry', kwota: 165, waluta: 'HUF', opis: 'mandat' },
    { data: '2023-12-19', kraj: 'Austria', kwota: 175, waluta: 'EUR', opis: 'vignette' },
];

export const RoadFeesScreen: React.FC = () => {

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Data</Text>
                            <Text style={styles.tableHeader}>Opis</Text>
                            <Text style={styles.tableHeader}>Kwota</Text>
                            {/* <Text style={styles.tableHeader}>Waluta</Text> */}
                        </View>
                        {roadFees.map((fee, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{fee.data}</Text>
                                <Text style={styles.tableCell}>{fee.opis}</Text>
                                <Text style={styles.tableCell}>{fee.kwota} {fee.waluta}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
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