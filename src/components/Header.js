import React, {useCallback, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import styles from '../assets/styles/HeaderStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Header = React.memo(() => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={[
                styles.container,
                {
                    height: (Platform.OS === 'ios' ? 40 : 60) + insets.top,
                    paddingTop: insets.top,
                    ...(Platform.OS === 'ios' && { paddingBottom: 20 }),
                },
            ]}>
            <TouchableOpacity onPress={() => navigation.navigate('MAIN')}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            {/*<View style={styles.rightSection}>*/}
            {/*    <TouchableOpacity onPress={() => console.log('알림 버튼 클릭')}>*/}
            {/*        <NotificationIcon width={22} height={22} />*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    );
});

export default React.memo(Header);
