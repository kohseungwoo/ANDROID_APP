import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../assets/styles/HeaderStyle';
import NotificationIcon  from '../assets/images/icon/notifications.svg';

const Header = React.memo(() => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={() => console.log('알림 버튼 클릭')}>
                    <NotificationIcon width={22} height={22} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default React.memo(Header);
