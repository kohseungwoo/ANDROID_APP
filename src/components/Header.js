import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../assets/styles/HeaderStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = React.memo(() => {
    console.log("header rendering");
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={() => console.log('알림 버튼 클릭')}>
                    <Ionicons name="notifications-outline" size={22} color="#000000" />
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default React.memo(Header);
