import React, {useCallback} from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/MoreMenuStyle';

const userId = 'USERID123';

const menuItems = [
    { label: '결제화면TEST', icon: 'credit-card', iconComponent: FontAwesome, route: 'PAYMENTMENU' },
    { label: '공지사항', key: 'notice', icon: 'bullhorn', iconComponent: FontAwesome },
    { label: 'FAQ', key: 'notice', icon: 'note', iconComponent: Octicons },
    { label: '고객센터', key: 'contact', icon: 'phone-call', iconComponent: Feather },
    { label: '버전정보', key: 'version', icon: 'info', iconComponent: Feather },
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

    const renderItem = useCallback(({ item }) => {
        const Icon = item.iconComponent;
        return (
            <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={() => handlePress(item)}
            >
                <Icon name={item.icon} size={18} color="#333" />
                <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
        );
    }, [handlePress]);

    return (
        <View style={styles.container}>
            <View style={styles.userBox}>
                <View style={styles.userRow}>
                    <View style={styles.leftPart}>
                        <Text style={styles.nick}>연전호떡({userId})</Text>
                        <MaterialIcons name="arrow-forward-ios" size={12} color="#adadad" />
                    </View>
                    <TouchableOpacity style={styles.rightPart} onPress={() => console.log('로그아웃')}>
                        <MaterialIcons name="logout" size={16} color="#adadad" style={{ marginLeft: 4 }} />
                        <Text style={styles.logout}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlashList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.label}
                estimatedItemSize={60}
                numColumns={4}
                contentContainerStyle={styles.menuGrid}
            />
        </View>
    );
};

export default MoreMenuScreen;
