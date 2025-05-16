import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/ExitModalStyle';

const DefaultModal = ({ visible, onCancel, onConfirm, message, defaultMessage = false }) => {
    const displayMessage = message || '일시적인 시스템 오류입니다.';
    const fullMessage = defaultMessage
        ? `${displayMessage}\n관리자에게 문의하시기 바랍니다.`
        : displayMessage;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            boolean={defaultMessage}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <Text style={styles.message}>{fullMessage}</Text>
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


export default DefaultModal;
