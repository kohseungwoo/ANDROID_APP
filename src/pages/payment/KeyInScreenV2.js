import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from '../../assets/styles/KeyInV2Style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorModal from '../../components/modal/ErrorModal';

const KeyInScreenV2 = ({
           productName, setProductName,
           amount, setAmount,
           buyerName, setBuyerName,
           cardType, setCardType,
           installment, setInstallment,

           personalCardNumber1, setPersonalCardNumber1,
           personalCardNumber2, setPersonalCardNumber2,
           personalCardNumber3, setPersonalCardNumber3,
           personalCardNumber4, setPersonalCardNumber4,
           personalExpiry, setPersonalExpiry,
           personalPassword, setPersonalPassword,
           dob, setDob,

           corpCardNumber1, setCorpCardNumber1,
           corpCardNumber2, setCorpCardNumber2,
           corpCardNumber3, setCorpCardNumber3,
           corpCardNumber4, setCorpCardNumber4,
           corpExpiry, setCorpExpiry,
           corpPassword, setCorpPassword,
           brn, setBrn,

           phone, setPhone,
           email, setEmail,
           udf1, setUdf1,
           udf2, setUdf2,
       }) => {

    const [alertVisible, setAlertVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const getInstallment = () => {
        setErrMessage('준비중');
        setAlertVisible(true);
    };

    const formatAmount = (value) => {
        const numeric = value.replace(/[^0-9]/g, '');
        return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const onlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const removeSpecial = (value) => {
        return value.replace(/[^a-zA-Z0-9]/g, '');
    };

    return (
        <>
            <ErrorModal
                visible={alertVisible}
                message={errMessage}
                onConfirm={() => setAlertVisible(false)}
            />

            <View style={styles.container}>
                {/* 1~3. 상단 타이틀 + 버튼 + 구분선 */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="cart-outline" size={24} color="#2680eb" style={{ marginRight: 6 }} />
                        <Text style={styles.title}>결제정보</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={getInstallment}>
                        <Text style={styles.buttonText}>카드사 무이자 할부안내</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                {/* 4~6. 상품명, 판매금액, 구매자 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>상품명</Text>
                    <TextInput style={styles.input} value={productName} placeholder="상품명을 입력하세요."  maxLength={64} onChangeText={(text) => setProductName(removeSpecial(text))} />

                    <Text style={styles.label}>판매금액</Text>
                    <TextInput style={styles.input} keyboardType="number-pad" value={amount} onChangeText={(text) => {
                        setAmount(formatAmount(text));
                    }} placeholder="0" maxLength={13} />

                    <Text style={styles.label}>구매자</Text>
                    <TextInput style={styles.input} value={buyerName} placeholder="구매자명을 입력하세요." maxLength={12} onChangeText={(text) => setBuyerName(removeSpecial(text))} />
                </View>

                {/* 카드정보 타이틀 + 구분선 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="card" size={24} color="#2680eb" style={{ marginRight: 8, marginTop: 50 }} />
                    <Text style={styles.cardTitle}>카드정보</Text>
                </View>
                <View style={styles.separator} />

                <View style={styles.inputGroup}>
                    {/* 할부 위치: 카드번호 위 */}
                    <View style={styles.row}>
                        <Text style={styles.label}>할부 개월</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                style={styles.picker}
                                selectedValue={installment}
                                onValueChange={setInstallment}
                            >
                                <Picker.Item label="일시불" value="0" />
                                {[...Array(36)].map((_, i) => (
                                    <Picker.Item key={i + 1} label={`${i + 1}개월`} value={`${i + 1}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* 카드번호 + 개인/법인 버튼 */}
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
                            {/* 카드번호 4칸 */}
                            <View style={styles.cardNumberRow}>
                                <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={personalCardNumber1} onChangeText={(text) => {
                                    setPersonalCardNumber1(onlyNumber(text));
                                }}/>

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={personalCardNumber2} onChangeText={(text) => {
                                    setPersonalCardNumber2(onlyNumber(text));
                                }}/>

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={personalCardNumber3} onChangeText={(text) => {
                                    setPersonalCardNumber3(onlyNumber(text));
                                }}/>

                                <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={personalCardNumber4} onChangeText={(text) => {
                                    setPersonalCardNumber4(onlyNumber(text));
                                }}/>
                            </View>

                            {/* 유효기간 + 비밀번호 */}
                            <View style={styles.row}>
                                {/* 유효기간 */}
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간 (MM/YY)</Text>
                                    <View style={styles.expiryInputRow}>
                                        <TextInput style={styles.expiryInput} keyboardType="number-pad" value={personalExpiry} onChangeText={(text) => {
                                            setPersonalExpiry(onlyNumber(text));
                                        }} placeholder="MM/YY" maxLength={4} />
                                    </View>
                                </View>

                                {/* 비밀번호 */}
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <View style={styles.expiryInputRow}>
                                        <TextInput style={[styles.expiryInput, {marginLeft:20}]} keyboardType="number-pad" secureTextEntry value={personalPassword} onChangeText={(text) => {
                                            setPersonalPassword(onlyNumber(text));
                                        }} placeholder="**" maxLength={2} />

                                        <Text style={{ marginLeft: 4 }}>* *</Text>
                                    </View>
                                </View>
                            </View>

                            {/* 생년월일 */}
                            <View style={[styles.row,{marginTop: 5}]}>
                                <Text style={styles.label}>생년월일 (주민번호 앞 6자리)</Text>

                                <TextInput style={[styles.input, { flex: 1, marginLeft: 20 }]} keyboardType="number-pad" secureTextEntry value={dob} onChangeText={(text) => {
                                    setDob(onlyNumber(text));
                                }} placeholder="YYMMDD" maxLength={6} />
                            </View>
                        </>
                    )}

                    {/* 법인 카드 */}
                    {cardType === 'corporate' && (
                        <>
                            {/* 카드번호 4칸 */}
                            <View style={styles.cardNumberRow}>
                                <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={corpCardNumber1} onChangeText={(text) => {
                                    setCorpCardNumber1(onlyNumber(text));
                                }}/>

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={corpCardNumber2} onChangeText={(text) => {
                                    setCorpCardNumber2(onlyNumber(text));
                                }}/>

                                <TextInput style={[styles.cardInput, { backgroundColor: '#fafafa' }]} maxLength={4} secureTextEntry keyboardType="number-pad" value={corpCardNumber3} onChangeText={(text) => {
                                    setCorpCardNumber3(onlyNumber(text));
                                }}/>

                                <TextInput style={styles.cardInput} maxLength={4} keyboardType="number-pad" value={corpCardNumber4} onChangeText={(text) => {
                                    setCorpCardNumber4(onlyNumber(text));
                                }}/>
                            </View>

                            {/* 유효기간 + 비밀번호 */}
                            <View style={styles.row}>
                                {/* 유효기간 */}
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간 (MM/YY)</Text>
                                    <View style={styles.expiryInputRow}>
                                        <TextInput style={styles.expiryInput} keyboardType="number-pad" value={corpExpiry} onChangeText={(text) => {
                                            setCorpExpiry(onlyNumber(text));
                                        }} placeholder="MM/YY" maxLength={4} />
                                    </View>
                                </View>

                                {/* 비밀번호 */}
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <View style={styles.expiryInputRow}>
                                        <TextInput style={[styles.expiryInput, {marginLeft:20}]} keyboardType="number-pad" secureTextEntry value={corpPassword} onChangeText={(text) => {
                                            setCorpPassword(onlyNumber(text));
                                        }} placeholder="**" maxLength={2} />

                                        <Text style={{ marginLeft: 4 }}>* *</Text>
                                    </View>
                                </View>
                            </View>

                            {/* 사업자번호 */}
                            <View style={[styles.row,{marginTop: 5}]}>
                                <Text style={styles.label}>사업자번호 10자리</Text>
                                <TextInput style={[styles.input, { flex: 1, marginLeft: 84.5 }]} keyboardType="number-pad" secureTextEntry value={brn} onChangeText={(text) => {
                                    setBrn(onlyNumber(text));
                                }} placeholder="YYMMDD" maxLength={10} />
                            </View>
                        </>
                    )}
                </View>

                {/* 매출전표 발송 섹션 */}
                <View style={styles.receiptHeader}>
                    <Ionicons name="receipt-outline" size={24} color="#2680eb" style={{marginRight: 8, marginTop: 50}}/>
                    <Text style={styles.cardTitle}>매출전표 발송</Text>
                    <Text style={styles.smallGrayText}>(휴대폰,이메일 입력 시 발송)</Text>
                </View>
                <View style={styles.separator} />

                {/* 휴대폰 & 이메일 */}
                <View style={styles.inputGroup}>
                    <View>
                        <View style={styles.optionalLabelRow}>
                            <Text style={styles.label}>휴대폰</Text>
                            <Text style={styles.optionalText}>(선택)</Text>
                        </View>
                        <TextInput style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={(text) => {
                            setPhone(onlyNumber(text));}} placeholder="휴대폰 번호를 입력하세요." maxLength={16}/>

                        <View style={styles.optionalLabelRow}>
                            <Text style={styles.label}>이메일</Text>
                            <Text style={styles.optionalText}>(선택)</Text>
                        </View>
                        <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={(text) => {
                            setEmail(text);}} placeholder="이메일 주소를 입력하세요." maxLength={64}/>
                    </View>
                </View>

                {/* 임의필드 */}
                <View style={styles.optionalLabelRow}>
                    <Ionicons name="pricetag-outline" size={24} color="#2680eb" style={{ marginRight: 8, marginTop: 50 }} />
                    <Text style={styles.cardTitle}>가맹점 임의필드</Text>
                    <Text style={styles.smallGrayText}></Text>
                </View>
                <View style={styles.separator} />

                <View style={styles.inputGroup}>
                    <View style={styles.optionalLabelRow}>
                        <Text style={styles.label}>임의필드1</Text>
                        <Text style={styles.optionalText}>(선택)</Text>
                    </View>
                    <TextInput style={styles.input} value={udf1} onChangeText={(text) => {
                        setUdf1(removeSpecial(text));}}
                               placeholder="임의필드를 입력하세요." maxLength={200}/>

                    <View style={styles.optionalLabelRow}>
                        <Text style={styles.label}>임의필드2</Text>
                        <Text style={styles.optionalText}>(선택)</Text>
                    </View>
                    <TextInput style={styles.input} value={udf2} onChangeText={(text) => {
                        setUdf2(removeSpecial(text));}}
                               placeholder="임의필드를 입력하세요." maxLength={200}/>
                </View>




            </View>
        </>
    );

}

export default KeyInScreenV2;
