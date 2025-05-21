import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ErrorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const message = route.params?.message || "일시적인 네트워크 문제가 발생했습니다.";

    const handleBackToDashboard = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LOGIN' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={handleBackToDashboard}>
                <Text style={styles.buttonText}>돌아가기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: Dimensions.get('window').height,
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: '60%',
        paddingVertical: 12,
        backgroundColor: '#253e6d',
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ErrorScreen;
