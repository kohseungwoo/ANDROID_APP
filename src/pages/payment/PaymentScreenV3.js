import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import styles from '../../assets/styles/PaymentStyle';
import refreshHooks from '../../components/hooks/RefreshHooks';
import KeyInScreenV3 from './KeyInScreenV3';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const PaymentScreenV3 = () => {
    const navigation = useNavigation();

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

    // 초기화 함수
    const resetForm = () => {
        setFormData({
            productName: '',
            amount: '',
            buyerName: '',
            phoneNo: '',
            udf1: '',
            cardType: 'personal',
        });
    };

    // 컴포넌트가 포커스를 받을 때 상태 초기화
    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    // 드래그 새로고침
    const { refreshing, onRefresh } = refreshHooks(() => {
        resetForm();
    });

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.innerWrapper}>
                        <HeaderSub title="신용카드 수기결제" onRefresh={resetForm}/>
                        <KeyInScreenV3 formData={formData} setFormData={setFormData}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default PaymentScreenV3;
