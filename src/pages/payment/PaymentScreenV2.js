import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, useWindowDimensions, View } from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import KeyInScreenV2 from './KeyInScreenV2';
import styles from '../../assets/styles/PaymentStyle';
import { useFocusEffect } from '@react-navigation/native';
import refreshHooks from '../../components/hooks/RefreshHooks';

const PaymentScreenV2 = () => {
    const layout = useWindowDimensions();
    const isLandscape = layout.width > layout.height;
    const horizontalPadding = isLandscape ? 100 : 0;

    // 상품 정보
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('');
    const [buyerName, setBuyerName] = useState('');

    // 카드 구분
    const [cardType, setCardType] = useState('personal');
    const [installment, setInstallment] = useState('0');

    // 개인 카드
    const [personalCardNumber1, setPersonalCardNumber1] = useState('');
    const [personalCardNumber2, setPersonalCardNumber2] = useState('');
    const [personalCardNumber3, setPersonalCardNumber3] = useState('');
    const [personalCardNumber4, setPersonalCardNumber4] = useState('');
    const [personalExpiry, setPersonalExpiry] = useState('');
    const [personalPassword, setPersonalPassword] = useState('');
    const [dob, setDob] = useState('');

    // 법인 카드
    const [corpCardNumber1, setCorpCardNumber1] = useState('');
    const [corpCardNumber2, setCorpCardNumber2] = useState('');
    const [corpCardNumber3, setCorpCardNumber3] = useState('');
    const [corpCardNumber4, setCorpCardNumber4] = useState('');
    const [corpExpiry, setCorpExpiry] = useState('');
    const [corpPassword, setCorpPassword] = useState('');
    const [brn, setBrn] = useState('');

    // 기타
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [udf1, setUdf1] = useState('');
    const [udf2, setUdf2] = useState('');


    // 초기화 함수
    const resetForm = () => {
        setProductName('');
        setAmount('');
        setBuyerName('');
        setCardType('personal');
        setInstallment('0');

        setPersonalCardNumber1('');
        setPersonalCardNumber2('');
        setPersonalCardNumber3('');
        setPersonalCardNumber4('');
        setPersonalExpiry('');
        setPersonalPassword('');
        setDob('');

        setCorpCardNumber1('');
        setCorpCardNumber2('');
        setCorpCardNumber3('');
        setCorpCardNumber4('');
        setCorpExpiry('');
        setCorpPassword('');
        setBrn('');

        setPhone('');
        setEmail('');
        setUdf1('');
        setUdf2('');
    };

    // 컴포넌트가 포커스를 받을 때 상태 초기화
    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    // 드래그 새로고침
    const { refreshing, onRefresh } = refreshHooks(() => {
        // 여기에 API 호출 등 로직 작성
        resetForm();  // 새로고침 시 폼을 초기화
    });

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={[
                        styles.contentContainer,
                        isLandscape && { paddingHorizontal: horizontalPadding },
                    ]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.innerWrapper}>
                        <HeaderSub title="카드 결제" onRefresh={onRefresh} />
                        <KeyInScreenV2
                            productName={productName} setProductName={setProductName}
                            amount={amount} setAmount={setAmount}
                            buyerName={buyerName} setBuyerName={setBuyerName}
                            cardType={cardType} setCardType={setCardType}
                            installment={installment} setInstallment={setInstallment}

                            personalCardNumber1={personalCardNumber1} setPersonalCardNumber1={setPersonalCardNumber1}
                            personalCardNumber2={personalCardNumber2} setPersonalCardNumber2={setPersonalCardNumber2}
                            personalCardNumber3={personalCardNumber3} setPersonalCardNumber3={setPersonalCardNumber3}
                            personalCardNumber4={personalCardNumber4} setPersonalCardNumber4={setPersonalCardNumber4}
                            personalExpiry={personalExpiry} setPersonalExpiry={setPersonalExpiry}
                            personalPassword={personalPassword} setPersonalPassword={setPersonalPassword}
                            dob={dob} setDob={setDob}

                            corpCardNumber1={corpCardNumber1} setCorpCardNumber1={setCorpCardNumber1}
                            corpCardNumber2={corpCardNumber2} setCorpCardNumber2={setCorpCardNumber2}
                            corpCardNumber3={corpCardNumber3} setCorpCardNumber3={setCorpCardNumber3}
                            corpCardNumber4={corpCardNumber4} setCorpCardNumber4={setCorpCardNumber4}
                            corpExpiry={corpExpiry} setCorpExpiry={setCorpExpiry}
                            corpPassword={corpPassword} setCorpPassword={setCorpPassword}
                            brn={brn} setBrn={setBrn}

                            phone={phone} setPhone={setPhone}
                            email={email} setEmail={setEmail}
                            udf1={udf1} setUdf1={setUdf1}
                            udf2={udf2} setUdf2={setUdf2}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default PaymentScreenV2;
