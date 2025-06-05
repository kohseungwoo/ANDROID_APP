import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/MoreMenuStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {moveParamScreen} from '../../components/hooks/ScreenHooks';
import DefaultModal from '../../components/modal/DefaultModal';
import {Logout} from '../../components/Logout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const menuItems = [
    {
        label: '공지사항',
        key: 'notice',
        icon: 'megaphone-outline',            // MaterialIcons
        color: '#000',
        iconComponent: Ionicons,
    },
    {
        label: 'FAQ',
        key: 'faq',
        icon: 'chatbubbles-outline',
        color: '#000',
        iconComponent: Ionicons,
    },
    {
        label: '고객센터',
        key: 'contact',
        icon: 'headphones',
        color: '#000',
        iconComponent: Feather,
    },
    {
        label: '버전정보',
        key: 'version',
        icon: 'information-circle-outline',
        color: '#000',
        iconComponent: Ionicons,
    },
];

const MoreMenuScreen = () => {
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const insets = useSafeAreaInsets();

    const handlePress = useCallback((item) => {
        switch (item.key) {
            case 'version':
                setAlertVisible(true);
                setMessage("현재 앱 버전은 v1.0.0 입니다.");
                break;
            case 'contact': case 'notice': case 'faq':
                moveParamScreen(navigation, "NOTICE", { tab: item.key });
                break;
            default:
                navigation.navigate(item.route);
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
                        onPress={()=>Logout(navigation)}
                        style={styles.logoutButton}
                    >
                        <MaterialIcons name="logout" size={18} color="#000" />
                        <Text style={styles.logoutText}>로그아웃</Text>
                    </TouchableOpacity>

                    {/*<Text style={styles.userInfo}>연전호떡 ({userId})</Text>*/}
                </View>

                {/* 메뉴 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>설정 메뉴</Text>

                    {menuItems.map((item) => {
                        const Icon = item.iconComponent;
                        return (
                            <TouchableOpacity
                                key={item.label}
                                style={styles.menuItem}
                                onPress={() => handlePress(item)}
                            >
                                <item.iconComponent
                                    name={item.icon}
                                    size={20}
                                    color={item.color}
                                    style={{ marginRight: 12 }}
                                />
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default MoreMenuScreen;
