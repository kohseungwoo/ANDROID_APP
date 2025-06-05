import React, {useCallback, useState} from 'react';
import SignIn from '../../components/SignIn';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, NativeModules, Platform} from 'react-native';
import ConfirmModal from '../../components/modal/ConfirmModal';
const { ExitApp } = NativeModules;

const SignInScreen = () => {
    const [exitVisible, setExitVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                setExitVisible(true);
                return true;
            };

            const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => sub.remove();
        }, [])
    );

    const handleExit = () => {
        setExitVisible(false);
        if (Platform.OS === 'android') {
            ExitApp.exitApp();
        }
    };

    return (
        <>
            <ConfirmModal
                visible={exitVisible}
                onCancel={() => setExitVisible(false)}
                onConfirm={handleExit}
                message={'앱을 종료 하시겠습니까?'}
            />
            <SignIn />
        </>
    );
};

export default SignInScreen;
