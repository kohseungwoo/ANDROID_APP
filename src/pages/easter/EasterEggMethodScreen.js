import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/EasterMethodStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import DefaultModal from '../../components/modal/DefaultModal';
import Config from '../../components/Config';


const menuItems = [
    {
        label: 'MODE 변경',
        key: 'mode',
    },
    {
        label: '설정 확인',
        key: 'setting',
    },
];

const EasterEggMethodScreen = () => {
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const insets = useSafeAreaInsets();
    const [mode, setMode] = useState('');

    useEffect(() => {
        setMode(`${global.E2U.ENV}`);
    }, []);

    const getModeLabel = (mode) => {
        switch(mode) {
            case 'DEV':
                return '개발 모드';
            case 'STG':
                return '스테이징 모드';
            case 'PROD':
                return '운영 모드';
            default:
                return mode;
        }
    }

    const handlePress = useCallback((item) => {
        switch (item.key) {
            case 'mode' :
                setMode((prevMode) => {
                    const modes = ['DEV', 'STG', 'PROD'];
                    const nextIndex = (modes.indexOf(prevMode) + 1) % modes.length;

                    try{
                        global.E2U.ENV       = `${modes[nextIndex]}`;
                        global.E2U.API_URL   = Config[`${modes[nextIndex]}_API_URL`];
                        global.E2U.ADMIN_URL = Config[`${modes[nextIndex]}_ADMIN_URL`];
                    }catch (error){
                        console.log(`모드 변경 ERROR : ${error}`);
                        setAlertVisible(true);
                        setMessage("모드별 설정 변경 실패!! \n 관리자에게 문의바랍니다.");

                        global.E2U.API_URL   = Config[`DEV_API_URL`];
                        global.E2U.ADMIN_URL = Config[`DEV_ADMIN_URL`];
                    }

                    return modes[nextIndex];
                });
                break;

            case 'setting':
                setAlertVisible(true);
                setMessage(
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize:18, paddingLeft: 2 }}>[앱설정 정보]</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 120, fontWeight: '600' }}>API_URL</Text>
                            <Text>: {global.E2U.API_URL}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 120, fontWeight: '600' }}>ADMIN_URL</Text>
                            <Text>: {global.E2U.ADMIN_URL}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 120, fontWeight: '600' }}>APP_VERSION</Text>
                            <Text>: {global.E2U.APP_VERSION}</Text>
                        </View>
                    </View>
                );
                break;
            default:
                setAlertVisible(true);
                setMessage(`정의되지 않은 값이 입력되었습니다. 관리자에게 문의바랍니다.`);
        }
    }, [navigation]);

    return (
        <>
            <DefaultModal
                visible={alertVisible}
                message={message}
                onConfirm={() => setAlertVisible(false)}
                defaultMessage={defaultMessage}
            />

            <SafeAreaView style={[styles.safeArea, {paddingTop: insets.top}]}>
                <ScrollView style={styles.container}>
                    {/* 상단: 로그아웃 버튼 + 유저 정보 */}
                    <View style={styles.headerBox}>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('DASHBOARD')}
                            style={styles.logoutButton}
                        >
                            <MaterialIcons name="logout" size={18} color="#000" />
                            <Text style={styles.logoutText}>나가기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        {/* 💡 모드 표시 UI */}
                        <View style={styles.modeStatusBox}>
                            <Text style={styles.modeStatusText}>MODE : {`${getModeLabel(mode)} (${mode})`}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>{`[ 관리자 설정 메뉴 ]`}</Text>

                        {menuItems.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.label}
                                    style={styles.menuItem}
                                    onPress={() => handlePress(item)}
                                >
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )

};

export default EasterEggMethodScreen;
