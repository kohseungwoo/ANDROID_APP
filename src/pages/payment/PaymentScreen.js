import React, {useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import KeyInScreen from './KeyInScreen';
import styles from '../../assets/styles/PaymentStyle';

const PaymentScreen = () => {
    const layout = useWindowDimensions();
    const isLandscape = layout.width > layout.height;
    const horizontalPadding = isLandscape ? 100 : 0;

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [phone, setPhone] = useState('');
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('');

    const handleRefresh = () => {
        setCardNumber('');
        setExpiry('');
        setBirth('');
        setPassword('');
        setBuyerName('');
        setPhone('');
        setProductName('');
        setAmount('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={[
                        styles.contentContainer,
                        isLandscape && { paddingHorizontal: horizontalPadding },
                    ]}
                >
                    <View style={styles.innerWrapper}>
                        <HeaderSub title="카드 결제" onRefresh={handleRefresh} />
                        <KeyInScreen
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

export default PaymentScreen;
