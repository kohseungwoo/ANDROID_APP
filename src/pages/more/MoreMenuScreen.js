import React, {useCallback} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/MoreMenuStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {moveParamScreen} from '../../components/hooks/ScreenHooks';

const menuItems = [
    {
        label: '공지사항',
        key: 'notice',
        icon: 'announcement',            // MaterialIcons
        color: '#e67e22',
        iconComponent: MaterialIcons,
    },
    {
        label: 'FAQ',
        key: 'faq',
        icon: 'question-circle',         // FontAwesome5
        color: '#3498db',
        iconComponent: FontAwesome5,
    },
    {
        label: '고객센터',
        key: 'contact',
        icon: 'phone-call',              // Feather
        color: '#27ae60',
        iconComponent: Feather,
    },
    {
        label: '버전정보',
        key: 'version',
        icon: 'information-circle-outline',        // Entypo
        color: '#000',
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
            case 'contact': case 'notice': case 'faq':
                moveParamScreen(navigation, "NOTICE", { tab: item.key });
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
    );
};

export default MoreMenuScreen;
