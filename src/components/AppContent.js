// AppContent.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import login from '../pages/login/SignInScreen';
import trxDetail from '../pages/trxboard/TrxDetailScreen';
import TabNavigator from '../components/TabNavigator';
import usePortraitLock from './hooks/UnlockHooks';
import noticeScreen from '../pages/notice/NoticeScreen';
import errorScreen from '../pages/error/ErrorScreen';
import easterSignScreen from '../pages/easter/EasterEggSignScreen';
import easterMethodScreen from '../pages/easter/EasterEggMethodScreen';

const Stack = createStackNavigator();

const AppContent = () => {
    usePortraitLock();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LOGIN" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LOGIN" component={login} />
                <Stack.Screen name="DASHBOARD" component={TabNavigator} />
                <Stack.Screen name="TRXDETAIL" component={trxDetail} />
                <Stack.Screen name="NOTICE" component={noticeScreen} />
                <Stack.Screen name="ERROR" component={errorScreen} />
                <Stack.Screen name="EASTERSIGN" component={easterSignScreen} />
                <Stack.Screen name="EASTERMETHOD" component={easterMethodScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContent;
