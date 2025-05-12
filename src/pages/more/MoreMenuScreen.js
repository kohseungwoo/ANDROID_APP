import React, {useCallback} from 'react';
import {Alert, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/MoreMenuStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const userId = 'USERID123';

const menuItems = [
    {
        label: '공지사항',
        key: 'notice',
        icon: 'megaphone-outline',
        iconComponent: Ionicons,
    },
    {
        label: 'FAQ',
        key: 'notice',
        icon: 'help-circle-outline',
        iconComponent: Ionicons,
    },
    {
        label: '고객센터',
        key: 'contact',
        icon: 'call-outline',
        iconComponent: Ionicons,
    },
    {
        label: '버전정보',
        key: 'version',
        icon: 'information-circle-outline',
        iconComponent: Ionicons,
    },
];

const MoreMenuScreen = () => {
    const navigation = useNavigation();

    const handlePress = useCallback((item) => {
        switch (item.key) {
            case 'version':
                Alert.alert('버전 정보', '현재 앱 버전은 v1.0.0 입니다.');
                break;
            case 'contact':
                Linking.openURL('tel:0216004191');
                break;
            case 'notice':
                Alert.alert('공지 사항', '준비중 입니다.');
                break;
            default:
                navigation.navigate(item.route);
        }
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            {/* 상단: 로그아웃 버튼 + 유저 정보 */}
            <View style={styles.headerBox}>
                <TouchableOpacity
                    onPress={() => console.log('로그아웃')}
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
                            <Icon name={item.icon} size={18} color="#333" style={{ marginRight: 12 }} />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default MoreMenuScreen;
