import React, {useState} from 'react';
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

const SignIn = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('1234');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        setIsLoading(true);

        /* API 연동 필요 */
        setTimeout(() => {
            try {
                if (username === 'admin' && password === '1234') {
                    navigation.replace('MAIN');
                } else {
                    setErrorMessage('아이디 또는 패스워드가 잘못되었습니다.');
                }
            } catch (e) {
                console.error('로그인 실패:', e);
                setErrorMessage('[시스템 오류] 관리자 문의');
            } finally {
                setIsLoading(false);
            }
        }, 500);
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
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrorMessage('');
                                }}
                            />
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
