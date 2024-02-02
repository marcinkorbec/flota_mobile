import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the Ionicons component
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation-types';
import { MenuModal } from '../Menu/MenuModal';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Button = {
    screen: keyof RootStackParamList;
    icon: string;
    text: string;
    iconSet: typeof FontAwesome | typeof FontAwesome5;
    style?: object;
};

const buttons: Button[] = [
    { screen: 'AddFuelScreen', icon: 'gas-pump', text: 'Dodaj Tankowanie', iconSet: FontAwesome5 },
    { screen: 'AddRoadFeesScreen', icon: 'road', text: 'Dodaj koszt drogowy', iconSet: FontAwesome },
    { screen: 'AddDriverCostsScreen', icon: 'money-bill', text: 'Dodaj koszt własny', iconSet: FontAwesome5, style: { marginBottom: 30 } },
    { screen: 'FuelingScreen', icon: 'gas-pump', text: 'Historia tankowań', iconSet: FontAwesome5 },
    { screen: 'RoadFeesScreen', icon: 'road', text: 'Historia opłat drogowych', iconSet: FontAwesome },
    { screen: 'DriverCostsScreen', icon: 'money-bill', text: 'Historia kosztów własnych', iconSet: FontAwesome5 },
];

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

            {
                buttons.map(({ screen, icon, text, iconSet, style }, index) => (
                    <TouchableOpacity key={index} style={[styles.button, style]} onPress={() => navigation.navigate(screen)}>
                        {React.createElement(iconSet, { name: icon, size: 30, color: "#fff" })}
                        <Text style={styles.text}>{text}</Text>
                    </TouchableOpacity>
                ))
            }

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
        width: Dimensions.get('window').width * 0.8,
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
