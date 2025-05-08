import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, Keyboard} from 'react-native';

import TabButton from '../components/TabButton';
import dashboard from '../pages/dashboard/DashboardScreen';
import payment from '../pages/payment/PaymentScreenV2';
import trxList from '../pages/trxboard/TrxListScreen';
import more from '../pages/more/MoreScreen';
import ConfirmModal from './modal/ConfirmModal';
import usePortraitLock from './hooks/UnlockHooks';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    usePortraitLock();

    const [exitVisible, setExitVisible] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

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
        BackHandler.exitApp();
    };

    return (
        <>
            <ConfirmModal
                visible={exitVisible}
                onCancel={() => setExitVisible(false)}
                onConfirm={handleExit}
                message={"앱을 종료 하시겠습니까?"}
            />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: keyboardVisible
                        ? { display: 'none' } // 키보드 올라오면 숨김
                        : {
                        backgroundColor: '#fff',
                        paddingTop: 8,
                        height: 50,
                        paddingBottom: 5,
                        borderTopWidth: 0,
                        elevation: 10,  // 높여서 그림자 효과 강조
                        shadowColor: '#000', // 그림자 색상
                        shadowOpacity: 0.3, // 그림자의 투명도
                        shadowRadius: 8, // 그림자의 흐림 정도 (큰 값일수록 흐려짐)
                        shadowOffset: { width: 0, height: 5 }, // 그림자 위치 (높이값을 더 크게 하면 그림자 위치가 더 아래로 내려가게 됨)
                    },
                })}
            >
                <Tab.Screen
                    name="메인"
                    component={dashboard}
                    options={{
                        unmountOnBlur: true,
                        tabBarButton: (props) => (
                            <TabButton
                                animation={
                                    props?.accessibilityState?.selected
                                        ? require('../assets/animation/home.json')
                                        : require('../assets/animation/homeDefault.json')
                                }
                                label="메인"
                                props={props}
                                focused={props?.accessibilityState?.selected}
                                key={props?.accessibilityState?.selected ? 'focused' : 'unfocused'} // 상태 변화 시 애니메이션 리셋
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="결제"
                    component={payment}
                    options={{
                        unmountOnBlur: true,
                        tabBarButton: (props) => (
                            <TabButton
                                animation={
                                    props?.accessibilityState?.selected
                                        ? require('../assets/animation/card.json')
                                        : require('../assets/animation/cardDefault.json')
                                }
                                label="결제"
                                props={props}
                                focused={props?.accessibilityState?.selected}
                                key={props?.accessibilityState?.selected ? 'focused' : 'unfocused'} // 상태 변화 시 애니메이션 리셋
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="결제내역"
                    component={trxList}
                    options={{
                        unmountOnBlur: true,
                        tabBarButton: (props) => (
                            <TabButton
                                animation={
                                    props?.accessibilityState?.selected
                                        ? require('../assets/animation/trxList.json')
                                        : require('../assets/animation/trxListDefault.json')
                                }
                                label="결제내역"
                                props={props}
                                focused={props?.accessibilityState?.selected}
                                key={props?.accessibilityState?.selected ? 'focused' : 'unfocused'} // 상태 변화 시 애니메이션 리셋
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="전체"
                    component={more}
                    options={{
                        unmountOnBlur: true,
                        tabBarButton: (props) => (
                            <TabButton
                                animation={
                                    props?.accessibilityState?.selected
                                        ? require('../assets/animation/seeMore.json')
                                        : require('../assets/animation/seeMoreDefault.json')
                                }
                                label="전체"
                                props={props}
                                focused={props?.accessibilityState?.selected}
                                key={props?.accessibilityState?.selected ? 'focused' : 'unfocused'} // 상태 변화 시 애니메이션 리셋
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default TabNavigator;
