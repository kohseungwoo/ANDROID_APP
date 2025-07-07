import React, {useState} from 'react';
import {Modal, Image, TouchableOpacity, Text, View, Platform, Linking, Dimensions} from 'react-native';
import InputModal from './inputModal';
import ErrorModal from './DefaultModal';

const InputQrModal = ({ visible, onCancel, qrLink }) => {
    const screenWidth = Dimensions.get('window').width;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [message, setMessage] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);

    const receiptBtn = (phoneNumber)=> {
        const msg = `${qrLink}`;
        if (!msg) {
            setMessage('전송할 링크가 없습니다.');
            setAlertVisible(true);
            return;
        }

        const url =
            Platform.OS === 'ios'
                ? `sms:${phoneNumber}&body=${encodeURIComponent(msg)}`
                : `sms:${phoneNumber}?body=${encodeURIComponent(msg)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    setInputVisible(false);
                    setAlertVisible(true);
                    setMessage(`전표 전송에 실패하였습니다.`);
                    setDefaultMessage(true);
                }
            }).catch((err) =>
            global.E2U?.INFO(`SMS 연결 실패 \n ${err}`,
                setInputVisible(false),
                setMessage(`전표 전송에 실패하였습니다.`),
                setDefaultMessage(true),
            ));
    };


    const handleCancel = () => {
        setPhoneNumber('');
        setErrorMessage('');
        onCancel?.();
    };
    return (
        <>
            <ErrorModal
                visible={alertVisible}
                message={message}
                onConfirm={() => setAlertVisible(false)}
            />

            <InputModal
                visible={inputVisible}
                onCancel={() => setInputVisible(false)}
                onConfirm={(phoneNumber) => {
                    setInputVisible(false);   // 모달 닫고
                    receiptBtn(phoneNumber);        // SMS 열기
                }}
            />

            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCancel}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                >
                    <View
                        style={{
                            width: screenWidth * 0.8,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 15,
                            alignItems: 'center',
                        }}
                    >
                        {/* QR 이미지 */}
                        {qrLink !== '' && (
                            <Image
                                source={{ uri: qrLink }}
                                style={{
                                    width: screenWidth * 0.7,
                                    height: screenWidth * 0.5,
                                }}
                                resizeMode="contain"
                            />
                        )}

                        {/* 버튼들 */}
                        <TouchableOpacity
                            style={{
                                marginTop: 5,
                                width: '90%',
                                backgroundColor: '#2680eb',
                                paddingVertical: 12,
                                borderRadius: 6,
                            }}
                            onPress={() => {
                                setInputVisible(true);
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                SMS 전송
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginTop: 14,
                                width: '90%',
                                backgroundColor: '#ddd',
                                paddingVertical: 12,
                                borderRadius: 6,
                            }}
                            onPress={handleCancel}
                        >
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                나가기
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </Modal>
        </>
    );
};

export default InputQrModal;
