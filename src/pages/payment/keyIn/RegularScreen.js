import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../../assets/styles/RegularStyle';

const RegularScreen = () => {
    const [cardType, setCardType] = useState('personal');
    const [personalCardNumber1, setPersonalCardNumber1] = useState('');
    const [personalCardNumber2, setPersonalCardNumber2] = useState('');
    const [personalCardNumber3, setPersonalCardNumber3] = useState('');
    const [personalCardNumber4, setPersonalCardNumber4] = useState('');
    const [personalExpiry, setPersonalExpiry] = useState('');
    const [personalPassword, setPersonalPassword] = useState('');
    const [dob, setDob] = useState('');

    const onlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="card" size={24} color="#2680eb" style={{ marginRight: 8, marginTop: 50 }} />
                <Text style={styles.cardTitle}>카드정보</Text>
            </View>
            <View style={styles.separator} />

            {/* 카드정보 입력 필드들 */}
            <View style={styles.inputGroup}>
                <View style={styles.row}>
                    <Text style={[styles.label, styles.buttonGroup]}>카드번호</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.toggleBtn, cardType === 'personal' && styles.activeBtn]}
                            onPress={() => setCardType('personal')}
                        >
                            <Text style={cardType === 'personal' && styles.activeBtnText}>개인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleBtn, cardType === 'corporate' && styles.activeBtn]}
                            onPress={() => setCardType('corporate')}
                        >
                            <Text style={cardType === 'corporate' && styles.activeBtnText}>법인</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 개인 카드 */}
                {cardType === 'personal' && (
                    <>
                        <View style={styles.cardNumberRow}>
                            <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={personalCardNumber1} onChangeText={(text) => setPersonalCardNumber1(onlyNumber(text))} />
                            <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={personalCardNumber2} onChangeText={(text) => setPersonalCardNumber2(onlyNumber(text))} />
                            <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={personalCardNumber3} onChangeText={(text) => setPersonalCardNumber3(onlyNumber(text))} />
                            <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={personalCardNumber4} onChangeText={(text) => setPersonalCardNumber4(onlyNumber(text))} />
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>유효기간 (MM/YY)</Text>
                                <TextInput style={styles.expiryInput} keyboardType="number-pad" value={personalExpiry} onChangeText={(text) => setPersonalExpiry(onlyNumber(text))} placeholder="MM/YY" maxLength={4} />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.label, { marginLeft: 20 }]}>비밀번호 앞 2자리</Text>
                                <TextInput style={[styles.expiryInput, { marginLeft: 20 }]} keyboardType="number-pad" secureTextEntry value={personalPassword} onChangeText={(text) => setPersonalPassword(onlyNumber(text))} placeholder="**" maxLength={2} />
                            </View>
                        </View>

                        <View style={[styles.row, { marginTop: 5 }]}>
                            <Text style={styles.label}>생년월일 (주민번호 앞 6자리)</Text>
                            <TextInput style={[styles.input, { flex: 1, marginLeft: 20 }]} keyboardType="number-pad" secureTextEntry value={dob} onChangeText={(text) => setDob(onlyNumber(text))} placeholder="YYMMDD" maxLength={6} />
                        </View>
                    </>
                )}

                {/* 법인 카드 */}
                {cardType === 'corporate' && (
                    <>
                        {/* 법인 카드 입력 필드 */}
                    </>
                )}
            </View>
        </View>
    );
};

export default RegularScreen;
