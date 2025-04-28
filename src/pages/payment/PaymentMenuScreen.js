import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardSvg from '../../components/svg/Card';
import SmsSvg from '../../components/svg/Sms';
import styles from '../../assets/styles/PaymentMenuStyle';

/* 차후 메뉴화로 사용하게 되면 다시 작업해야함 .. */
const PaymentMenuScreen = () => {
    const navigation = useNavigation();

    const onPressOption = (label) => {
        console.log(`${label} 선택`);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.grid}>
                {/* 1행 */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('수기결제')}>
                        {/*<CardSvg />*/}
                        <Text style={styles.label}>💳</Text>
                        <Text style={styles.label}>수기결제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('SMS결제')}>
                        <SmsSvg />
                        <Text style={styles.label}>SMS결제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('간편결제')}>
                        <CardSvg />
                        <Text style={styles.label}>간편결제</Text>
                    </TouchableOpacity>
                </View>

                {/* 2행 */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('QR결제')}>
                        <CardSvg />
                        <Text style={styles.label}>QR결제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('정기결제')}>
                        <CardSvg />
                        <Text style={styles.label}>정기결제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer} onPress={() => onPressOption('현장결제')}>
                        <CardSvg />
                        <Text style={styles.label}>현장결제</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default PaymentMenuScreen;
