import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../assets/styles/HeaderSubStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


const HeaderSub = React.memo(({ title, onRefresh }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const currentRouteName = useNavigationState((state) => {
        if (!state || !state.routes || state.index == null) return null;
        const route = state.routes[state.index];
        if (route.state && route.state.index != null) {
            const nestedRoute = route.state.routes[route.state.index];
            return nestedRoute?.name ?? null;
        }
        return route.name;
    });

    // 탭네비 뒤로가기
    const showBackButton = !['DASHBOARD', 'PAYMENT', 'TRXLIST'].includes(currentRouteName?.toUpperCase());
    const showReloadButton = !['DASHBOARD', 'MORE', 'NOTICE'].includes(currentRouteName?.toUpperCase());

    return (
        <View style={[
                styles.header,
                {
                    height: (Platform.OS === 'ios' ? 40 : 60) + insets.top,
                    paddingTop: insets.top,
                    ...(Platform.OS === 'ios' && { paddingBottom: 20 }),
                },
            ]}>
            {showBackButton && (
                <TouchableOpacity
                    style={[styles.backButton, {paddingTop:insets.top, ...(Platform.OS === 'ios' && { paddingBottom: 20 })}]}
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                >
                    <AntDesign name="arrowleft" size={20} color="#808080" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>

            {showReloadButton && (
                <TouchableOpacity
                    style={[styles.refreshButton, {paddingTop:insets.top, ...(Platform.OS === 'ios' && { paddingBottom: 20 })}]}
                    onPress={onRefresh}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                >
                    <AntDesign name="reload1" size={20} color="#808080" />
                </TouchableOpacity>
            )}
        </View>
    );
});

export default React.memo(HeaderSub);
