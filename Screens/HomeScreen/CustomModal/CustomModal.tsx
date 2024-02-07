import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation-types';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

export const CustomModal: React.FC<CustomModalProps> = ({ modalVisible, setModalVisible }) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    //const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddFuelScreen')}>
                            <Text style={styles.buttonText}>Dodaj tankowanie</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Dodaj koszt drogowy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Dodaj koszt własny</Text>
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
        height: 400
    },
    box: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        height: 300,
        width: '80%',
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
        right: 0,
        top: 0,
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
