import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { RootStackParamList } from '../../types/navigation-types';
import { SafeAreaView } from 'react-native-safe-area-context';

type SplashScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};


export const LoginScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logika logowania
        navigation.navigate('HomeScreen');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <ImageBackground
                source={require('../../assets/Screenshot_9.png')}
                style={styles.container}
            >
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Podaj numer rejestracyjny pojazdu"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Hasło - pin do karty paliwowej"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Zaloguj się</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#E8364F',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

