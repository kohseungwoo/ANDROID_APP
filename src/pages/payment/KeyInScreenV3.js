import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ProductScreen from './keyIn/ProductScreen';
import RegularScreen from './keyIn/RegularScreen';
import styles from '../../assets/styles/HeaderSubStyle';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const KeyInScreenV3 = ({ formData, setFormData }) => {
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

    const renderHeader = (title, onRefresh) => (
        <View style={styles.header}>
            {step === "REGULAR" && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setStep('PRODUCT')}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                >
                    <AntDesign name="arrowleft" size={20} color="#808080" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity
                style={styles.refreshButton}
                onPress={onRefresh}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
                <AntDesign name="reload1" size={20} color="#808080" />
            </TouchableOpacity>
        </View>
    );



    switch (step) {
        case 'PRODUCT': {
            return (
                <View style={{ flex: 1 }}>
                    {renderHeader("신용카드 수기결제", () => resetFormData())}
                    <ProductScreen
                        formData={formData}
                        setFormData={setFormData}
                        onNext={next}
                    />
                </View>
            );
        }
        case 'REGULAR':{
            return (
                <View style={{ flex: 1 }}>
                    {renderHeader("신용카드 수기결제", () => resetFormData())}
                    <RegularScreen
                        formData={formData}
                        setFormData={setFormData}
                        onNext={next}
                        onBack={prev}
                    />
                </View>
            );
        }
        default:
            return null;
    }
};

export default KeyInScreenV3;
