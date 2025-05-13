import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import KeyInScreenV1 from './KeyInScreenV1';
import styles from '../../assets/styles/PaymentStyle';
import {useFocusEffect} from '@react-navigation/native';

const PaymentScreenV1 = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [phone, setPhone] = useState('');
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('');

    const resetForm = () => {
        setCardNumber('');
        setExpiry('');
        setBirth('');
        setPassword('');
        setBuyerName('');
        setPhone('');
        setProductName('');
        setAmount('');
    };

    // 컴포넌트가 포커스를 받을 때 상태 초기화
    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.innerWrapper}>
                        <HeaderSub title="카드 결제" onRefresh={resetForm} />
                        <KeyInScreenV1
                            cardNumber={cardNumber}
                            setCardNumber={setCardNumber}
                            expiry={expiry}
                            setExpiry={setExpiry}
                            birth={birth}
                            setBirth={setBirth}
                            password={password}
                            setPassword={setPassword}
                            buyerName={buyerName}
                            setBuyerName={setBuyerName}
                            phone={phone}
                            setPhone={setPhone}
                            productName={productName}
                            setProductName={setProductName}
                            amount={amount}
                            setAmount={setAmount}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default PaymentScreenV1;
