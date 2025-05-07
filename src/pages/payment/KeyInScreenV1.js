import React from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../../assets/styles/KeyInV1Style';


const KeyInScreenV1 = ({
     cardNumber, setCardNumber, expiry, setExpiry, birth, setBirth, password, setPassword,
     buyerName, setBuyerName, phone, setPhone, productName, setProductName, amount, setAmount}) => {

    const handlePayment = () => {
        if (!cardNumber || !expiry || !birth || !password || !buyerName || !phone || !productName || !amount) {
            Alert.alert("모든 정보를 입력해주세요.");
            return;
        }

        Alert.alert("결제 요청 완료", `상품: ${productName}, 금액: ${amount}원`);
    };

    const formatAmount = (value) => {
        // 숫자만 남기기
        const numeric = value.replace(/[^0-9]/g, '');
        // 숫자에 콤마 추가
        return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const onlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>카드 정보</Text>
            <Text style={styles.label}>카드번호</Text>
            <TextInput style={styles.input} keyboardType="number-pad" value={cardNumber} onChangeText={(text) => {
                setCardNumber(onlyNumber(text));
            }} placeholder="xxxx xxxx xxxx xxxx" maxLength={16}/>

            <Text style={styles.label}>유효기간</Text>
            <TextInput style={styles.input} keyboardType="number-pad" value={expiry} onChangeText={(text) => {
                setExpiry(onlyNumber(text));
            }} placeholder="MM/YY" maxLength={4} />

            <Text style={styles.label}>생년월일</Text>
            <TextInput style={styles.input} keyboardType="number-pad" value={birth} onChangeText={(text) => {
                setBirth(onlyNumber(text));
            }} placeholder="YYYYMMDD" maxLength={8} />

            <Text style={styles.label}>비밀번호 앞 2자리</Text>
            <TextInput style={styles.input} keyboardType="number-pad" secureTextEntry value={password} onChangeText={(text) => {
                setPassword(onlyNumber(text));
            }} placeholder="**" maxLength={2} />

            {/* 구매자 정보 */}
            <Text style={[styles.sectionTitle, styles.customSectionTitle]}>구매자 정보</Text>

            <Text style={styles.label}>구매자명</Text>
            <TextInput style={styles.input} value={buyerName} onChangeText={setBuyerName} placeholder="홍길동" maxLength={12}/>

            <Text style={styles.label}>휴대폰번호</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={(text) => {
                setPhone(onlyNumber(text));}}
                       placeholder="010-1234-5678" maxLength={16}/>
            {/* 판매 정보 */}
            <Text style={[styles.sectionTitle, styles.customSectionTitle]}>판매 정보</Text>
            <Text style={styles.label}>상품명</Text>
            <TextInput style={styles.input} value={productName} onChangeText={setProductName} placeholder="상품명"  maxLength={64}/>

            <Text style={styles.label}>결제 금액</Text>
            <TextInput style={styles.input} keyboardType="number-pad" value={amount} onChangeText={(text) => {
                setAmount(formatAmount(text));
            }} placeholder="0" maxLength={13} />

            <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={styles.buttonText}>결제하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default KeyInScreenV1;
