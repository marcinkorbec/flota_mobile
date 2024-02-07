import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation-types';
import { SafeAreaView } from 'react-native-safe-area-context';

type SplashScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/nwb.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 30
    },
});

