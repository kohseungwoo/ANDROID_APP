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
import RNBootSplash from 'react-native-bootsplash';
import * as Keychain from 'react-native-keychain';
import LottieView from 'lottie-react-native';
import OpenStoreLink from './OpenStoreLink';
import UpdateInfoModal from './modal/UpdateInfoModal';

const SignIn = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('demo_kovan');
    const [password, setPassword] = useState('12345');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(false);

    const [splashLoading, setSplashLoading] = useState(true);

    // 앱 시작 시 자동 로그인 시도
    useEffect(() => {
        const checkStoredToken = async () => {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const key = credentials.password;
                global.E2U?.INFO('자동 로그인 실행!');

                try {
                    const response = await fetch(`${global.E2U?.API_URL}/v2/auth/login/${key}`, {
                        method: 'GET',
                        headers: {
                            'VERSION'  : global.E2U?.APP_VERSION,
                        },
                    });

                    const result = await response.json();
                    global.E2U?.INFO(`로그인 KEY 검증 API 응답 \n ${JSON.stringify(result)}`);

                    if (result.code === '0000') {
                        handlerMove(result);
                    }else if (result.code === '0009'){
                        setOpenLinkVisible(true);
                    }
                } catch (err) {
                    console.warn('[시스템 오류] 자동 로그인 실패 \n' + err);
                } finally {
                    setIsLoading(false);
                }
            }

            setSplashLoading(false);
            RNBootSplash.hide({ fade: true });
        };
        checkStoredToken();
    }, []);

    const handleLogin = async () => {
        global.E2U?.INFO('로그인 클릭!');
        setIsLoading(true);
        try {
            if(!username || !password){
                setErrorMessage('아이디 또는 패스워드를 입력해주시기 바랍니다.');
                return;
            }

            const response = await fetch(`${global.E2U?.API_URL}/v2/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': global.E2U?.CONTENT_TYPE_JSON,
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
                body: JSON.stringify({
                    userId  : username,
                    pw      : password,
                }),
            });

            const result = await response.json();
            global.E2U?.INFO(`로그인 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                await Keychain.setGenericPassword(username, result.data?.key || '');
                handlerMove(result);
            }else{
                if (result.code === '804') { // 보안 정책 위반으로 요청이 차단되었습니다.
                    setErrorMessage(`${result.description}`);
                }else if (result.code === '802'){
                    setOpenLinkVisible(true);
                } else{
                    setErrorMessage('아이디 또는 패스워드가 잘못되었습니다.');
                }
            }
        } catch (err) {
            setErrorMessage('[시스템 오류] 관리자 문의하시기 바랍니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlerMove = (result) => {
        global.E2U.INFO(`로그인 응답 JSON \n ${JSON.stringify(result)}`);

        if(!result?.data?.key){
            setErrorMessage('로그인을 재시도 해주시기 바랍니다.');
            return;
        }

        // global.E2U 가맹점 정보 저장
        global.E2U.key      = result?.data?.key   || '';
        global.E2U.grade    = result?.data?.grade || '';
        global.E2U.appId    = result?.data?.appId || '';
        global.E2U.nick     = result?.data?.nick  || '';

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

    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

    if (splashLoading) {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
                <LottieView
                    source={require('../assets/animation/loading.json')}
                    autoPlay
                    loop
                    style={{width: 150, height: 150}}
                />
            </View>
        );
    }

    return (
        <>
            <UpdateInfoModal
                visible={openLinkVisible}
                onConfirm={handleOpenLinkConfirm}
            />

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

        </>
    );
};

export default SignIn;
