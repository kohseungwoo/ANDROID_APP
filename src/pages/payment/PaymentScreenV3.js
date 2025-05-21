import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import styles from '../../assets/styles/PaymentStyle';
import KeyInScreenV3 from './KeyInScreenV3';
import {useFocusEffect} from '@react-navigation/native';

const PaymentScreenV3 = () => {
    // 상품 정보
    const [formData, setFormData] = useState({
        productName: '',
        amount: '',
        buyerName: '',
        phoneNo :'',
        udf1 : '',
        cardType: 'personal',
        // ...다른 필드들도 여기에 추가
    });

    // 컴포넌트가 포커스를 받을 때 상태 초기화
    useFocusEffect(
        useCallback(() => {
            setFormData({
                productName: '',
                amount: '',
                buyerName: '',
                phoneNo: '',
                udf1: '',
                cardType: 'personal',
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <View style={styles.innerWrapper}>
                    <KeyInScreenV3 formData={formData} setFormData={setFormData}/>
                </View>
            </View>
        </View>
    );
};

export default PaymentScreenV3;
