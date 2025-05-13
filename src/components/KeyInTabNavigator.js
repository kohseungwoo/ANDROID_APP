// components/KeyInTabNavigator.js
import React, {useCallback, useState} from 'react';
import ProductScreen from '../pages/payment/keyIn/ProductScreen';
import RegularScreen from '../pages/payment/keyIn/RegularScreen';
import {useFocusEffect} from '@react-navigation/native';

const KeyInTabNavigator = ({ formData, setFormData }) => {
    const [step, setStep] = useState('PRODUCT');

    const resetFormData = () => {
        setFormData({
            productName: '',
            amount: '',
            buyerName: '',
            phoneNo: '',
            udf1: '',
            cardType: 'personal',
        });
    };

    useFocusEffect(
        useCallback(() => {
            setStep('PRODUCT');     // step 초기화
            resetFormData();        // 데이터 초기화
        }, [])
    );

    const next = () => {
        switch (step) {
            case 'PRODUCT': setStep('REGULAR'); break;
            case 'REGULAR': setStep('COMPLETE'); break;
            default: console.warn('No next step from', step); break;
        }
    };

    const prev = () => {
        switch (step) {
            case 'REGULAR' : setStep('PRODUCT'); break;
            default:
                console.warn('No previous step from', step);
                break;
        }
    };

    switch (step) {
        case 'PRODUCT':
            return (
                <ProductScreen
                    formData={formData}
                    setFormData={setFormData}
                    onNext={next}
                />
            );
        case 'REGULAR':
            return (
                <RegularScreen
                    formData={formData}
                    setFormData={setFormData}
                    onNext={next}
                    onBack={prev}
                />
            );
        default:
            return null;
    }
};

export default KeyInTabNavigator;
