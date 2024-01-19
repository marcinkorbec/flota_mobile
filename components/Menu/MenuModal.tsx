import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation-types';

type CustomModalProps = {
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
};

export const MenuModal: React.FC<CustomModalProps> = ({ menuVisible, setMenuVisible }) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
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
                    <Text style={{ marginBottom: 20 }}>Wybierz widok do którego chcesz przejść:</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.buttonText}>Tankowania</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoadFeesScreen')}>
                        <Text style={styles.buttonText}>Koszty drogowe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Koszty własne</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
        height: '60%',
        width: '100%',
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
