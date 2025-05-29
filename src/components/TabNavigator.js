import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, Keyboard, Platform} from 'react-native';

import TabButton from '../components/TabButton';
import dashboard from '../pages/dashboard/DashboardScreen';
import payment from '../pages/payment/PaymentScreenV3';
import trxList from '../pages/trxboard/TrxListScreen';
import more from '../pages/more/MoreScreen';
import ConfirmModal from './modal/ConfirmModal';
import usePortraitLock from './hooks/UnlockHooks';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    usePortraitLock();

    const [exitVisible, setExitVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const tabScreens = [
        {
            name: 'MAIN',
            nameKr: '메인',
            component: dashboard,
            animationSelected: require('../assets/animation/home.json'),
            animationDefault: require('../assets/animation/homeDefault.json'),
        },
        {
            name: 'PAYMENT',
            nameKr: '결제',
            component: payment,
            animationSelected: require('../assets/animation/card.json'),
            animationDefault: require('../assets/animation/cardDefault.json'),
        },
        {
            name: 'TRXLIST',
            nameKr: '결제내역',
            component: trxList,
            animationSelected: require('../assets/animation/trxList.json'),
            animationDefault: require('../assets/animation/trxListDefault.json'),
        },
        {
            name: 'MORE',
            nameKr: '더보기',
            component: more,
            animationSelected: require('../assets/animation/seeMore.json'),
            animationDefault: require('../assets/animation/seeMoreDefault.json'),
        },
    ];

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                setExitVisible(true);
                return true;
            };

            const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => sub.remove();
        }, [])
    );

    // 키보드 상태 감지
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleExit = () => {
        setExitVisible(false);
        if (Platform.OS === 'android') {
            BackHandler.exitApp();
        }
    };

    return (
        <>
            <ConfirmModal
                visible={exitVisible}
                onCancel={() => setExitVisible(false)}
                onConfirm={handleExit}
                message={'앱을 종료 하시겠습니까?'}
            />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: keyboardVisible
                        ? { display: 'none' } // 키보드 올라오면 숨김
                        : {
                            backgroundColor: '#fff',
                            paddingTop: 10,
                            height: 60,
                            paddingBottom: 0,
                            borderTopWidth: 0.5,
                            borderColor:'#ccc',
                            // elevation: 10,  // 높여서 그림자 효과 강조
                            // shadowColor: '#000', // 그림자 색상
                            // shadowOpacity: 0.3, // 그림자의 투명도
                            // shadowRadius: 2, // 그림자의 흐림 정도 (큰 값일수록 흐려짐)
                            // shadowOffset: { width: 0, height: 5 }, // 그림자 위치 (높이값을 더 크게 하면 그림자 위치가 더 아래로 내려가게 됨)
                        },
                })}
            >
                {tabScreens.map((screen) => (
                    <Tab.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                        options={{
                            unmountOnBlur: true,
                            tabBarButton: (props) => {
                                const isFocused = props?.['aria-selected'];
                                return (
                                    <TabButton
                                        animation={isFocused ? screen.animationSelected : screen.animationDefault}
                                        label={screen.nameKr}
                                        props={props}
                                        focused={isFocused}
                                    />
                                );
                            },
                        }}
                        listeners={({ navigation }) => ({
                            tabPress: (e) => {
                                const state = navigation.getState();
                                const currentRoute = state.routes[state.index];
                                if (currentRoute.name === screen.name) {
                                    // 탭이 이미 활성화된 경우 → navigation 차단
                                    e.preventDefault();
                                }
                            },
                        })}
                    />
                ))}
            </Tab.Navigator>
        </>
    );
};

export default TabNavigator;
