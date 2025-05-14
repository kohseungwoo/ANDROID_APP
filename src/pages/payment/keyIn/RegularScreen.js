import React, {useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../../assets/styles/RegularStyle';
import ErrorModal from '../../../components/modal/ErrorModal';

const RegularScreen = ({ formData, setFormData, onNext, onBack }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const onlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const getInstallment = () => {
        setErrMessage('준비중');
        setAlertVisible(true);
    };

    const [installmentIdx, setInstallmentIdx] = useState(
        Array.from({ length: 12 }, (_, i) => ({
            label: `${i + 1}개월`,
            value: `${i + 1}`,
        }))
    );

    const resetCardForm = () => {
        const keepKeys = ['productName','amount','buyerName','phoneNo','udf1','cardType'];
        setFormData(prev => {
            const newForm = {};

            // 유지할 key들은 기존 값 유지
            keepKeys.forEach(key => {
                newForm[key] = prev[key];
            });

            return newForm;
        });
    };


    return (
        <>
            <ErrorModal
                visible={alertVisible}
                message={errMessage}
                onConfirm={() => setAlertVisible(false)}
            />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer} // 키보드 위 공간 확보
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="card-outline" size={24} color="#2680eb" style={{ marginTop:14, marginRight: 6 }} />
                        <Text style={styles.title}>카드정보</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={getInstallment}>
                        <Text style={styles.buttonText}>카드사 무이자 할부안내</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />

                {/* 카드정보 입력 필드들 */}
                <View style={styles.inputGroup}>
                    <View style={styles.row}>
                        <Text style={[styles.label, styles.buttonGroup]}>카드번호</Text>
                        <View style={[styles.buttonGroup]}>
                            <TouchableOpacity
                                style={[styles.toggleBtn, formData.cardType === 'personal' && styles.activeBtn]}
                                onPress={() => {
                                    resetCardForm();
                                    setFormData(prev => ({
                                        ...prev,
                                        cardType: 'personal',
                                    }));
                                }}
                            >
                                <Text style={formData.cardType === 'personal' && styles.activeBtnText}>개인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleBtn, formData.cardType === 'corporate' && styles.activeBtn]}
                                onPress={() => {
                                    resetCardForm();
                                    setFormData(prev => ({
                                        ...prev,
                                        cardType: 'corporate',
                                    }));
                                }}
                            >
                                <Text style={formData.cardType === 'corporate' && styles.activeBtnText}>법인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 개인 카드 */}
                    {formData.cardType === 'personal' && (
                        <>
                            <View style={styles.cardNumberRow}>
                                <TextInput style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber1}
                                           onChangeText={(text) => setFormData({
                                               ...formData,
                                               personalCardNumber1: onlyNumber(text),
                                           })}
                                />
                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber2}
                                           onChangeText={(text) => setFormData({
                                               ...formData,
                                               personalCardNumber2: onlyNumber(text),
                                           })}
                                />
                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber3}
                                           onChangeText={(text) => setFormData({
                                               ...formData,
                                               personalCardNumber3: onlyNumber(text),
                                           })}
                                />
                                <TextInput style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber4}
                                           onChangeText={(text) => setFormData({
                                               ...formData,
                                               personalCardNumber4: onlyNumber(text),
                                           })}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            <View style={styles.installmentInput}>
                                <RNPickerSelect
                                    onValueChange={(text) => setFormData({
                                        ...formData,
                                        installment: text,
                                    })}
                                    value={formData.installment}
                                    items={installmentIdx}
                                    placeholder={{ label: '일시불', value: 0}}
                                    style={{
                                        inputIOS: {
                                            fontSize: 16,
                                            paddingVertical: 12,
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: 'gray',
                                            borderRadius: 4,
                                            color: 'black',
                                        },
                                        inputAndroid: {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </View>


                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput style={styles.input}
                                               keyboardType="number-pad"
                                               placeholder="MM/YY"
                                               maxLength={4}
                                               value={formData.personalExpiry}
                                               onChangeText={(text) => setFormData({
                                                   ...formData,
                                                   personalExpiry: onlyNumber(text),
                                               })}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <TextInput style={[styles.input, {marginLeft:20}]}
                                               keyboardType="number-pad"
                                               secureTextEntry
                                               placeholder="**"
                                               maxLength={2}
                                               value={formData.personalPassword}
                                               onChangeText={(text) => setFormData({
                                                   ...formData,
                                                   personalPassword: onlyNumber(text),
                                               })}
                                    />
                                </View>
                            </View>


                            <Text style={[styles.label,{paddingTop:10}]}>본인확인</Text>
                            <TextInput style={styles.input}
                                       keyboardType="number-pad"
                                       placeholder="주민번호 앞 6자리"
                                       maxLength={6}
                                       value={formData.dob}
                                       onChangeText={(text) => setFormData({
                                           ...formData,
                                           dob: onlyNumber(text),
                                       })}
                            />

                            {/*<View style={{paddingLeft:5, paddingTop:2}}>*/}
                            {/*    <Text style={{color:'#808080'}}>* 개인 : 주민번호 앞 6자리</Text>*/}
                            {/*    <Text style={{color:'#808080'}}>* 법인 : 사업자번호 10자리</Text>*/}
                            {/*</View>*/}
                        </>
                    )}

                    {/* 법인 카드 */}
                    {formData.cardType === 'corporate' && (
                        <>
                            {/* 카드번호 4칸 */}
                            <View style={styles.cardNumberRow}>
                                <TextInput style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber1}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber1: onlyNumber(text),
                                               });
                                           }}
                                    />

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber2}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber2: onlyNumber(text),
                                               });
                                           }}
                                />

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber3}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber3: onlyNumber(text),
                                               });
                                           }}
                                />

                                <TextInput style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber4}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber4: onlyNumber(text),
                                               });
                                           }}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            <View style={styles.installmentInput}>
                                <RNPickerSelect
                                    onValueChange={(text) => setFormData({
                                        ...formData,
                                        installment: text,
                                    })}
                                    value={formData.installment}
                                    items={installmentIdx}
                                    placeholder={{ label: '일시불', value: 0}}
                                    style={{
                                        inputIOS: {
                                            fontSize: 16,
                                            paddingVertical: 12,
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: 'gray',
                                            borderRadius: 4,
                                            color: 'black',
                                        },
                                        inputAndroid: {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </View>


                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput style={styles.input}
                                               keyboardType="number-pad"
                                               placeholder="MM/YY"
                                               maxLength={4}
                                               value={formData.corpExpiry}
                                               onChangeText={(text) => setFormData({
                                                   ...formData,
                                                   corpExpiry: onlyNumber(text),
                                               })}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <TextInput style={[styles.input, {marginLeft:20}]}
                                               keyboardType="number-pad"
                                               secureTextEntry
                                               placeholder="**"
                                               maxLength={2}
                                               value={formData.corpPassword}
                                               onChangeText={(text) => setFormData({
                                                   ...formData,
                                                   corpPassword: onlyNumber(text),
                                               })}
                                    />
                                </View>
                            </View>


                            <Text style={[styles.label,{paddingTop:10}]}>본인확인</Text>
                            <TextInput style={styles.input}
                                       keyboardType="number-pad"
                                       placeholder="사업자번호 10자리"
                                       maxLength={10}
                                       value={formData.brn}
                                       onChangeText={(text) => setFormData({
                                           ...formData,
                                           brn: onlyNumber(text),
                                       })}
                            />
                        </>
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.fullWidthTouchable}>
                        <Text style={styles.footerButton}>결제하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default RegularScreen;
