import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ProductScreen from './keyIn/ProductScreen';
import RegularScreen from './keyIn/RegularScreen';
import LinkSmsPayScreen from '../linkpay/LinkSmsPayScreen';
import LinkQrPayScreen from '../linkpay/LinkQrPayScreen';
import styles from '../../assets/styles/HeaderSubStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const KeyInScreenV3 = ({ formData, setFormData, param }) => {
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState('CARD_PRODUCT');

    const resetFormProductData = () => setFormData({
        productName: '',
        amount: '',
        buyerName: '',
        phoneNo: '',
        udf1: '',
        cardType: 'personal',
    });

    const resetFormRegularData = () => setFormData(prev => ({
        ...prev,
        cardType: 'personal',
        personalCardNumber1: '',
        personalCardNumber2: '',
        personalCardNumber3: '',
        personalCardNumber4: '',
        corpInstallment: '',
        personalExpiry: '',
        personalPassword: '',
        dob: '',
        corpCardNumber1: '',
        corpCardNumber2: '',
        corpCardNumber3: '',
        corpCardNumber4: '',
        personalInstallment: '',
        corpExpiry: '',
        corpPassword: '',
        brn: '',
    }));

    const resetFormLinkData = () => setFormData({
        addType: 'link',
        directMethod: '',
        selectedMethod: '',
        amount: 0,
        installment: '00',
        sellerMemo1: '',
        sellerMemo2: '',
    });

    // Step configs
    const stepConfigs = {
        CARD_PRODUCT: {
            title: '신용카드 수기결제',
            Component: ProductScreen,
            onRefresh: resetFormProductData,
            onNext: () => setStep('CARD_REGULAR'),
        },
        CARD_REGULAR: {
            title: '신용카드 수기결제',
            Component: RegularScreen,
            onRefresh: resetFormRegularData,
            onNext: () => setStep('CARD_COMPLETE'),
            onBack: () => setStep('CARD_PRODUCT'),
        },
        SMS_PRODUCT: {
            title: 'SMS 결제',
            Component: ProductScreen,
            onRefresh: resetFormProductData,
            onNext: () => setStep('SMS_PAYMENT'),
        },
        SMS_PAYMENT: {
            title: 'SMS 결제',
            Component: LinkSmsPayScreen,
            onRefresh: resetFormLinkData,
            onBack: () => setStep('SMS_PRODUCT'),
        },
        QR_PRODUCT: {
            title: 'QR 결제',
            Component: ProductScreen,
            onRefresh: resetFormProductData,
            onNext: () => setStep('QR_PAYMENT'),
        },
        QR_PAYMENT: {
            title: 'QR 결제',
            Component: LinkQrPayScreen,
            onRefresh: resetFormLinkData,
            onBack: () => setStep('QR_PRODUCT'),
        },
    };

    // Handle param change
    useFocusEffect(
        useCallback(() => {
            if (param === 'sms') setStep('SMS_PRODUCT');
            else if (param === 'qr') setStep('QR_PRODUCT');
            else {
                setStep('CARD_PRODUCT');
                resetFormProductData();
            }
        }, [param])
    );

    const current = stepConfigs[step];
    if (!current) return null;

    const Header = () => (
        <View style={[styles.header, { height: 60 + insets.top, paddingTop: insets.top }]}>
            {current.onBack && (
                <TouchableOpacity
                    style={[styles.backButton, { paddingTop: insets.top }]}
                    onPress={current.onBack}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                >
                    <AntDesign name="arrowleft" size={20} color="#808080" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{current.title}</Text>
            <TouchableOpacity
                style={[styles.refreshButton, { paddingTop: insets.top }]}
                onPress={current.onRefresh}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
                <AntDesign name="reload1" size={20} color="#808080" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <current.Component
                formData={formData}
                setFormData={setFormData}
                onNext={current.onNext}
                onBack={current.onBack}
            />
        </SafeAreaView>
    );
};

export default KeyInScreenV3;
