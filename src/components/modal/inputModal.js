import React, { useState } from 'react';
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../../assets/styles/ExitModalStyle';
import UTILS from '../../utils/Utils';

const InputModal = ({ visible, onConfirm, onCancel, message }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSend = () => {
        const trimmed = phoneNumber.trim();
        if (trimmed === '') {
            setErrorMessage('전화번호를 입력해주시기 바랍니다.');
            return;
        }

        setErrorMessage('');
        onConfirm(trimmed);
        setPhoneNumber('');
    };

    const handleCancel = () => {
        setPhoneNumber('');
        setErrorMessage('');
        onCancel?.();
    };

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={handleCancel}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalBox}>
                    <Text style={[
                        styles.message,
                        {
                            fontWeight: 'bold',
                            marginBottom: 10,
                            fontSize: 16,
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            paddingLeft: 5,
                        }
                    ]}>
                        {message || '전표 전송'}
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            {
                                width: '96%',
                                borderWidth: 0.5,
                                borderColor: '#ccc',
                                marginBottom: errorMessage ? 5 : 35,
                                paddingHorizontal: 10,
                                borderRadius:5,
                            },
                        ]}
                        placeholder="전화번호를 '-' 없이 입력하세요."
                        keyboardType="number-pad"
                        value={UTILS.onlyNumber(phoneNumber)}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                            if (errorMessage) setErrorMessage('');
                        }}
                        maxLength={15}
                    />

                    {errorMessage !== '' && (
                        <Text style={{ color: 'red', alignSelf: 'flex-start', paddingLeft: 5, marginBottom: 10, fontSize: 13 }}>
                            {errorMessage}
                        </Text>
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={handleSend}
                        >
                            <Text style={styles.confirmText}>보내기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InputModal;
