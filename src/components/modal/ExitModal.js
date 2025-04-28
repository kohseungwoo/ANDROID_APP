import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/ExitModalStyle';


const ExitModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <Text style={styles.message}>앱을 종료 하시겠습니까?</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.confirmText}>종료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default ExitModal;
