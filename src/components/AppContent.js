// AppContent.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import TestScreen from '../pages/TestScreen'; // ✅ 경로 확인
import {Alert} from 'react-native';

const Stack = createStackNavigator();

const AppContent = () => {
    Alert.alert("tt");
    console.log('TestScreen:', TestScreen);
    // usePortraitLock();
    //
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TEST" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TEST" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContent;
