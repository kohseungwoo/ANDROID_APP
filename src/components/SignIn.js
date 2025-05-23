import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/styles/SignInStyle';
import * as Keychain from 'react-native-keychain';

const SignIn = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('test');
    const [password, setPassword] = useState('1');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // 앱 시작 시 자동 로그인 시도
    useEffect(() => {
        const checkStoredToken = async () => {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const token = credentials.password;

                try {
                    // const response = await fetch('https://tetms.e2u.kr/token/+token', {
                    //     method: 'GET',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify({ id:username, password:password, version:'v1' }),
                    // });

                    const response = {
                        "code"     : "0001"
                    };

                    if (response.code === '0000') {
                        handlerMove();
                    }
                } catch (err) {
                    console.warn('[시스템 오류] 자동 로그인 실패 \n' + err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        checkStoredToken();
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            let response = await fetch(`${global.E2U_API_URL}/login`, {
                method: 'POST',
                headers: global.E2U_CONTENT_TYPE_JSON,
                body: JSON.stringify({ id:username, password:password, version:'v1' }),
            });

            response = {
                "code"     : "0001",
                "data"     : {
                    "accToken" : "tmk_MTCWMDAWMTGXNJC2ZMM",
                    "grade"    : "APP",
                    "appId"    : "",
                    "appNick"  : "",
                },
            };

            if (response.code === '0000' && response.data.accToken) {
                await Keychain.setGenericPassword(username, response.data.accToken);
                handlerMove();
            } else {
                setErrorMessage('아이디 또는 패스워드가 잘못되었습니다.');
            }
        } catch (err) {
            setErrorMessage('[시스템 오류] 관리자 문의');
        } finally {
            setIsLoading(false);
        }
    };

    const handlerMove = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'DASHBOARD',
                    params: {
                        screen: 'MAIN',
                    },
                },
            ],
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.layoutContainer}>
                    <View style={styles.layoutTitleContainer}>
                        <Text style={styles.bgText}>Sign In</Text>
                    </View>

                    <View style={styles.loginContainer}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={styles.logo}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="ID"
                                maxLength={24}
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    setErrorMessage('');
                                }}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                maxLength={30}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrorMessage('');
                                }}
                            />
                            {password.length > 0 && (
                                <TouchableOpacity
                                    style={styles.eyeIconContainer}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Image
                                        source={
                                            showPassword
                                                ? require('../assets/images/eye-open.png')
                                                : require('../assets/images/eye-closed.png')
                                        }
                                        style={styles.eyeIcon}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>


                        <View style={styles.errorContainer}>
                            {errorMessage ? (
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                            ) : null}
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.loginBtn,
                                isLoading && styles.loginBtnLoading
                            ]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginBtnText}>로그인</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
