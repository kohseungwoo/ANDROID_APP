import React, {useCallback, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../assets/styles/HeaderStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Header = React.memo(() => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [clickCount, setClickCount] = useState(0);

    const handleLogoPress = useCallback(() => {
        setClickCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 5) {
                navigation.navigate('EASTERSIGN');
                return 0;
            }
            return newCount;
        });
    }, [navigation]);

    return (
        <View style={[styles.container, {paddingTop: insets.top, height: 60 + insets.top}]}>
            <TouchableOpacity onPress={handleLogoPress}>
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
