import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/UpdateInfoModalStyle';


const UpdateInfoModal = ({ visible, onConfirm }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <Text style={styles.message}>※ 업데이트 안내</Text>
                    <Text style={styles.messageText}> 최신버전 앱으로 업데이트를 위해 스토어로 이동합니다.</Text>
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


export default UpdateInfoModal;
