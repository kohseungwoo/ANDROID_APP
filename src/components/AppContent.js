// AppContent.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import login from '../pages/login/SignInScreen';
import paymentMenu from '../pages/payment/PaymentMenuScreen';
import trxDetail from '../pages/trxboard/TrxDetailScreen';
import TabNavigator from '../components/TabNavigator';
import usePortraitLock from './hooks/UnlockHooks';

const Stack = createStackNavigator();

const AppContent = () => {
    usePortraitLock();

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
