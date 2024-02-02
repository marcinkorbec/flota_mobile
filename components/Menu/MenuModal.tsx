import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation-types';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomModalProps = {
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
};

export const MenuModal: React.FC<CustomModalProps> = ({ menuVisible, setMenuVisible }) => {

    const handleLogout = () => {
        // Tutaj logika wylogowania, jeśli jest potrzebna

        // Ustawienie menuVisible na false, aby zamknąć modal
        setMenuVisible(false);
    };
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={menuVisible}
                onRequestClose={() => {
                    setMenuVisible(!menuVisible);
                }}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setMenuVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('LoginScreen'); handleLogout(); }}>
                            <Text style={styles.buttonText}>Wyloguj się!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //height: 600,
        //marginTop: '16%'
    },
    box: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        height: '80%',
        width: '84%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#E8364F',
        width: '81%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.68,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        backgroundColor: '#E8364F',
        height: 30,
        width: 30,
        alignItems: 'center',

        borderRadius: 2,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
});
