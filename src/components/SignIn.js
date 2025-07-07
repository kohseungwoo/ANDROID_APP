import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
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
import ConfirmOkModal from './modal/ConfirmOkModal';
import {fetchWithTimeout} from '../components/Fetch';
import usePortraitLock from './hooks/UnlockHooks';

const SignIn = () => {
    usePortraitLock();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('demo_kovan');
    const [password, setPassword] = useState('12345');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [splashLoading, setSplashLoading] = useState(true);
    const scrollViewRef = useRef(null);

    // 앱 시작 시 자동 로그인 시도
    useEffect(() => {
        const checkStoredToken = async () => {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const key = credentials.password;
                global.E2U?.INFO(`자동 로그인 실행! KEY : [${key}]`);

                try {
                    const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/auth/login`, {
                        method: 'GET',
                        headers: {
                            'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                            'Authorization': key,
                            'VERSION'      : global.E2U?.APP_VERSION,
                        },
                    }, global.E2U?.NETWORK_TIMEOUT);

                    const result = await response.json();
                    global.E2U?.INFO(`로그인 KEY 검증 API 응답 \n ${JSON.stringify(result)}`);

                    if (result.code === '0000') {
                        handlerMove(result);
                    }else if (result.code === '0802') {
                        setOpenLinkVisible(true);
                    }
                } catch (err) {
                    global.E2U?.INFO('[시스템 오류] 자동 로그인 실패 \n' + err);

                    if (err.message === 'Request timed out') {
                        setModalMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                        setModalVisible(true);

                    }else if (err.message === 'Network request failed') {
                        setModalMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                        setModalVisible(true);
                    }else{
                        setErrorMessage('[시스템 오류] 관리자 문의하시기 바랍니다.');
                    }

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

            console.log(`global.E2U?.APP_VERSION :${global.E2U?.APP_VERSION}`)
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': global.E2U?.CONTENT_TYPE_JSON,
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
                body: JSON.stringify({
                    userId  : username,
                    pw      : password,
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`로그인 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                await Keychain.setGenericPassword(username, result.data?.key || '');
                handlerMove(result);
            }else{
                if (result.code === '0900') {
                    setErrorMessage('아이디 또는 패스워드가 잘못되었습니다.');
                }else if (result.code === '0806'){ // 가맹점, 앱, 앱다이렉트 의 상태값 N 의 경우
                    setErrorMessage('접근이 불가능한 계정입니다.');
                }else if (result.code === '0009'){
                    await Keychain.setGenericPassword(username, result.data?.key || ''); // 구 버전의 경우 modal 문구 처리 후 로그인

                    setModalMessage(`${result.description}`);
                    setModalCallback(() => () => handlerMove(result));
                    setModalVisible(true);
                }else if (result.code === '0802'){
                    setOpenLinkVisible(true);
                }else{
                    setErrorMessage(`${result.description}`);
                }
            }
        } catch (err) {
            global.E2U?.INFO('[시스템 오류] 로그인 실패 \n' + err);
            if (err.message === 'Request timed out') {
                setModalMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setModalVisible(true);

            }else if (err.message === 'Network request failed') {
                setModalMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setModalVisible(true);
            }else{
                setErrorMessage('[시스템 오류] 관리자 문의하시기 바랍니다.');
            }
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
        global.E2U.key      = result?.data?.key      || '';
        global.E2U.roleType = result?.data?.roleType || 'MEMBER';
        global.E2U.grade    = result?.data?.grade    || '';
        global.E2U.appId    = result?.data?.appId    || '';
        global.E2U.nick     = result?.data?.nick     || '';
        global.E2U.method   = result?.data?.method   || {};
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
            <UpdateInfoModal visible={openLinkVisible} onConfirm={handleOpenLinkConfirm} />
            <ConfirmOkModal
                visible={modalVisible}
                onConfirm={() => {
                    if (typeof modalCallback === 'function') modalCallback();
                    setModalVisible(false);
                }}
                message={modalMessage}
            />

            <KeyboardAvoidingView
                style={styles.page}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <SafeAreaView style={{ flex: 1, width: '100%' }}>
                        <View style={styles.layoutContainer}>
                            <View style={styles.layoutTitleContainer}>
                                <Text style={styles.bgText}>Sign In</Text>
                            </View>

                            <View style={styles.loginContainer}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
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
                                        onFocus={() => {
                                            scrollViewRef.current?.scrollTo({ y: 40, animated: true });
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
                                        onFocus={() => {
                                            scrollViewRef.current?.scrollTo({ y: 100, animated: true });
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
                                    style={[styles.loginBtn, isLoading && styles.loginBtnLoading]}
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
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignIn;
