import React from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import {StackActions, useNavigation, useNavigationState} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../assets/styles/HeaderSubStyle';


const HeaderSub = React.memo(({ title, onRefresh }) => {
    const navigation = useNavigation();

    const currentRouteName = useNavigationState((state) => {
        if (!state || !state.routes || state.index == null) return null;
        const route = state.routes[state.index];
        if (route.state && route.state.index != null) {
            const nestedRoute = route.state.routes[route.state.index];
            return nestedRoute?.name ?? null;
        }
        return route.name;
    });

    const showBackButton = !['DASHBOARD', 'PAYMENT', 'PRODUCT', 'TRXLIST'].includes(currentRouteName?.toUpperCase());
    const showReloadButton = !['DASHBOARD', 'MORE'].includes(currentRouteName?.toUpperCase());

    // 뒤로가기 핸들링
    const handleGoBack = () => {
        switch (currentRouteName){
            case 'REGULAR' :
                navigation.navigate('PAYMENT', { screen: 'PRODUCT' });
                break;
            default:
                navigation.navigate('MAIN');
        }
    };


    return (
        <View style={styles.header}>
            {showBackButton && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                >
                    <AntDesign name="arrowleft" size={20} color="#808080" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>

            {showReloadButton && (
                <TouchableOpacity
                    style={styles.refreshButton}
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
