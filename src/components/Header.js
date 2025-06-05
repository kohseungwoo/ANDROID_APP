import React from 'react';
import {Image, View} from 'react-native';
import styles from '../assets/styles/HeaderStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = React.memo(() => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top, height: 60 + insets.top}]}>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            {/*<View style={styles.rightSection}>*/}
            {/*    <TouchableOpacity onPress={() => console.log('알림 버튼 클릭')}>*/}
            {/*        <NotificationIcon width={22} height={22} />*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    );
});

export default React.memo(Header);
