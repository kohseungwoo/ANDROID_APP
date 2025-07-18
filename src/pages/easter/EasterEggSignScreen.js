import React, {useRef, useState} from 'react';
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
import styles from '../../assets/styles/EasterSignStyle';

const EasterEggSignScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const scrollViewRef = useRef(null);

    const handleLogin = () => {
        setIsLoading(true);
        if(!password){
            setErrorMessage('패스워드를 입력해주시기 바랍니다.');
            return;
        }

        if (password.toLowerCase() === '16004191') {
            navigation.navigate('EASTERMETHOD');
        } else {
            setErrorMessage('패스워드가 잘못되었습니다.');
        }

        setIsLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={'padding'}
        >
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContainer}
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

                        {/*<View style={styles.inputGroup}>*/}
                        {/*    <TextInput*/}
                        {/*        style={styles.input}*/}
                        {/*        placeholder="ID"*/}
                        {/*        maxLength={24}*/}
                        {/*        value={username}*/}
                        {/*        onChangeText={(text) => {*/}
                        {/*            setUsername(text);*/}
                        {/*            setErrorMessage('');*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</View>*/}

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
                                    scrollViewRef.current?.scrollTo({ y: 40, animated: true });
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EasterEggSignScreen;
