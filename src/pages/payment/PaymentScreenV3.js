import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import styles from '../../assets/styles/PaymentStyle';
import KeyInScreenV3 from './KeyInScreenV3';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const PaymentScreenV3 = () => {
    const route = useRoute();
    const [formData, setFormData] = useState({});
    const [params, setParams] = useState('');

    useFocusEffect(
        useCallback(() => {
            const from = route?.params?.from?.toLowerCase?.() || 'card'; // fallback to 'card'
            setParams(from);

            switch (from) {
                case 'card':
                default:
                    setFormData({
                        productName: '',
                        amount: '',
                        buyerName: '',
                        phoneNo: '',
                        udf1: '',
                        cardType: 'personal',
                    });
                    break;

                case 'sms':  case 'qr' :
                    setFormData({
                        addType : '', // link, qr
                        directMethod: '',
                        selectedMethod : '',
                        selectedExpireAt : '',
                        amount: 0,
                        installment: '00',
                        sellerMemo1: '',
                        sellerMemo2: '',
                        linkUrl : '',
                    });
                break;
            }
        }, [route?.params?.from])
    );

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <View style={styles.innerWrapper}>
                    <KeyInScreenV3 formData={formData} setFormData={setFormData} param={params}/>
                </View>
            </View>
        </View>
    );
};

export default PaymentScreenV3;
