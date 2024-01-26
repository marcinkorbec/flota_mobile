import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the Ionicons component
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation-types';
import { MenuModal } from '../Menu/MenuModal';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export const HomeScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation<NavigationProp>();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => setMenuVisible(true)}
                    style={{ marginLeft: 10, backgroundColor: 'transparent' }}
                >
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#E8364F" />

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Wybierz akcję:</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddFuelScreen')}>
                <FontAwesome5 name="gas-pump" size={30} color="#fff" />
                <Text style={styles.text}>Dodaj Tankowanie</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddRoadFeesScreen')}>
                <FontAwesome name="road" size={30} color="#fff" />
                <Text style={styles.text}>Dodaj koszt drogowy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { marginBottom: 30 }]} onPress={() => navigation.navigate('AddDriverCostsScreen')}>
                <FontAwesome5 name="money-bill" size={30} color="#fff" />
                <Text style={styles.text}>Dodaj koszt własny</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FuelingScreen')}>
                <FontAwesome5 name="gas-pump" size={30} color="#fff" />
                <Text style={styles.text}>Historia tankowań</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadFeesScreen')}>
                <FontAwesome name="road" size={30} color="#fff" />
                <Text style={styles.text}>Historia opłat drogowych</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DriverCostsScreen')}>
                <FontAwesome5 name="money-bill" size={30} color="#fff" />
                <Text style={styles.text}>Historia kosztów własnych</Text>
            </TouchableOpacity>
            <MenuModal menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8364F',
        padding: 10,
        margin: 5,
        marginBottom: 10,
        borderRadius: 5,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        textAlign: 'center',
    },
    text: {
        color: 'white',
        marginLeft: 5,
        textAlign: 'center',
    },
});

