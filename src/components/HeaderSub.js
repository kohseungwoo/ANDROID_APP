import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../assets/styles/HeaderSubStyle';

const HeaderSub = React.memo(({ title, onRefresh }) => {
    const navigation = useNavigation();
    const currentRoute = useNavigationState((state) => {
        if (!state || !state.routes || state.index == null) return null;
        return state.routes[state.index]?.name ?? null;
    });

    const showBackButton = !['DASHBOARD'].includes(currentRoute.name);
    const showReloadButton = !['DASHBOARD', 'MORE'].includes(currentRoute.name);

    return (
        <View style={styles.header}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton}
                                  onPress={() => navigation.goBack()}
                                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                    <AntDesign name="arrowleft" size={20} color="#808080" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>

            {showReloadButton && (
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={onRefresh}
                    hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                    <AntDesign name="reload1" size={20} color="#808080" />
                </TouchableOpacity>
            )}
        </View>
    );
});

export default React.memo(HeaderSub);
