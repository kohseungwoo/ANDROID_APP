import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/ExitModalStyle';


const ConfirmOkModal = ({ visible, onCancel, onConfirm, message }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default ConfirmOkModal;
