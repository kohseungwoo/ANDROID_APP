import React, {useState} from 'react';
import {ActivityIndicator, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/EasterSignStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EasterEggSignScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        if(!username || !password){
            setErrorMessage('아이디 또는 패스워드를 입력해주시기 바랍니다.');
            return;
        }

        if (username === 'admin' && password.toLowerCase() === 'e2u0907!') {
            navigation.navigate('EASTERMETHOD');
        } else {
            setErrorMessage('아이디 또는 패스워드가 잘못되었습니다.');
        }

        setIsLoading(false);
    };

    return (
        <KeyboardAwareScrollView
            style={styles.page}
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={80}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView style={{ width: '100%' }}>
                <View style={styles.layoutContainer}>
                    <View style={styles.layoutTitleContainer}>
                        <Text style={styles.bgText}>ADMIN Login</Text>
                    </View>

                    <View style={styles.loginContainer}>
                        <View style={styles.logoContainer}>
                            {/*<Image*/}
                            {/*    source={require('../../assets/images/logo.png')}*/}
                            {/*    style={styles.logo}*/}
                            {/*/>*/}
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
                                                ? require('../../assets/images/eye-open.png')
                                                : require('../../assets/images/eye-closed.png')
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

                        <TouchableOpacity
                            style={[styles.wayOutBtn, isLoading && styles.loginBtnLoading]}
                            onPress={() => navigation.navigate('DASHBOARD')}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginBtnText}>나가기</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

export default EasterEggSignScreen;
