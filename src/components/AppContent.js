// AppContent.js
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import login from '../pages/login/SignInScreen';
import paymentMenu from '../pages/payment/PaymentMenuScreen';
import trxDetail from '../pages/trxboard/TrxDetailScreen';
import Orientation from 'react-native-orientation-locker';
import TabNavigator from '../components/TabNavigator'; // 분리된 탭 파일

const Stack = createStackNavigator();

const AppContent = () => {
    useEffect(() => {
        // 앱을 처음 시작할 때 세로 모드로 고정
        Orientation.lockToPortrait();  // 세로 모드 고정
        return () => {
            Orientation.unlockAllOrientations();  // 화면을 원래대로 되돌리기
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LOGIN" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LOGIN" component={login} />
                <Stack.Screen name="MAIN" component={TabNavigator} />
                <Stack.Screen name="PAYMENTMENU" component={paymentMenu} />
                <Stack.Screen name="TRXDETAIL" component={trxDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContent;
