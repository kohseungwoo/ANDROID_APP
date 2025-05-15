import React, {useCallback, useRef, useState} from 'react';
import {Animated, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {moveScreen} from './hooks/ScreenHooks';
import Swiper from 'react-native-swiper';
import FORMAT from '../utils/FormatUtils';
import styles from '../assets/styles/MainV2Style'; // 스타일 파일 경로 확인
import moment from 'moment'; // 날짜
import 'moment/locale/ko';
import ErrorModal from './modal/ErrorModal';

const MainV2 = () => {
    moment.locale('ko');

    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [showTransactions, setShowTransactions] = useState(true); //최근거래내역 숨김,보기
    const [isAmountHidden, setIsAmountHidden] = useState(false); // 금액 숨김,보기
    const amountOpacity = useRef(new Animated.Value(0)).current; // 시작 opacity 0
    const amountTranslate = useRef(new Animated.Value(-10)).current; // 시작 translateY -10

    // 금액 애니메이션을 설정하는 함수
    const runAmountAnimation = useCallback(() => {
        amountOpacity.setValue(0);
        amountTranslate.setValue(-10);

        Animated.parallel([
            Animated.timing(amountOpacity, {
                toValue: 1, // 애니메이션이 끝났을 때 opacity 1
                duration: 500, // 500ms 동안 애니메이션
                useNativeDriver: true,
            }),
            Animated.timing(amountTranslate, {
                toValue: 0, // 애니메이션이 끝났을 때 translateY 0
                duration: 500, // 500ms 동안 애니메이션
                useNativeDriver: true,
            }),
        ]).start();
    }, [amountOpacity, amountTranslate]);

    useFocusEffect(
        useCallback(() => {
            runAmountAnimation();
        }, [runAmountAnimation])
    );

    // 금액 숨김/보기 토글
    const toggleAmountHidden = () => {
        setIsAmountHidden(prev => !prev);
        runAmountAnimation(); // 버튼 클릭 시에도 애니메이션 실행
    };

    // 결제수단 클릭 이벤트
    const handlePaymentPress = (type) => {
        switch (type) {
            case 'CARD'     :
                moveScreen(navigation, "PAYMENT"); break;
            case 'TRXLIST'  :
                moveScreen(navigation, "TRXLIST"); break;
            case 'SMS': case 'LINK': case 'QR':
                setErrMessage(`${type} 서비스는 준비중입니다.`);
                setAlertVisible(true);
                setDefaultMessage(false);
                break;
            default:
                // setErrMessage(''); // 메시지 바꾸고 싶으면 입력
                setAlertVisible(true);
                setDefaultMessage(true);
        }
    };


    // 날짜 변수 선언
    const today = moment().format('M.D(dd)');
    const currentMonth = moment().format('M월');

    const dailyAmount = 6748264;
    const monthlyAmount = 155123943;
    const totalCount = 10; // 최대 5건

    const transactions = [
        { id: '1', day: '20250417', time:'123211', type: '승인', amount: 1000 },
        { id: '2', day: '20250417', time:'111254', type: '취소', amount: 5400 },
        { id: '3', day: '20250416', time:'090133', type: '승인', amount: 12000 },
        { id: '4', day: '20250415', time:'204420', type: '승인', amount: 7650 },
        { id: '5', day: '20250415', time:'192217', type: '취소', amount: 30000 },
        { id: '6', day: '20250414', time:'192016', type: '취소', amount: 1004 },
        { id: '7', day: '20250414', time:'182011', type: '승인', amount: 1200 },
        { id: '8', day: '20250414', time:'175022', type: '승인', amount: 15500 },
        { id: '9', day: '20250414', time:'164030', type: '취소', amount: 22100 },
        { id: '10', day: '20250414', time:'153050', type: '취소', amount: 6600 },
    ];

    const appMok = {
        type: 'APP', // or '상점'
        id: 'appId',
        name: '앱상호명',
    };

    const parseDate = (item) => {
        const dateStr = `${item.day}${item.time}`; // 20250417123211
        return moment(dateStr, 'YYYYMMDDHHmmss');
    };


    return (
        <>
            <ErrorModal
                visible={alertVisible}
                message={errMessage}
                onConfirm={() => setAlertVisible(false)}
                defaultMessage={defaultMessage}
            />

            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={styles.main}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {/* ================ 기존 콘텐츠 시작 ================ */}
                    <View style={styles.merchantContainer}>
                        {appMok.type === 'APP' && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>매장</Text>
                            </View>
                        )}
                        <Text style={styles.merchantNick}>
                            {appMok.name} <Text style={styles.grayText}>({appMok.id})</Text>
                        </Text>
                    </View>

                    <View style={styles.paymentIconRow}>
                        <TouchableOpacity
                            style={styles.paymentIconBox}
                            onPress={() => handlePaymentPress('CARD')}
                        >
                            <Ionicons name="card" size={30} color="#2680eb" />
                            <Text style={styles.paymentIconLabel}>카드결제</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paymentIconBox}
                            onPress={() => handlePaymentPress('SMS')}
                        >
                            <Ionicons name="chatbox-outline" size={30} color="#ff9900" />
                            <Text style={styles.paymentIconLabel}>SMS결제</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paymentIconBox}
                            onPress={() => handlePaymentPress('LINK')}
                        >
                            <Ionicons name="link-outline" size={30} color="#00bcd4" />
                            <Text style={styles.paymentIconLabel}>링크결제</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paymentIconBox}
                            onPress={() => handlePaymentPress('QR')}
                        >
                            <Ionicons name="qr-code-outline" size={30} color="#28a745" />
                            <Text style={styles.paymentIconLabel}>QR 결제</Text>
                        </TouchableOpacity>
                    </View>

                    <Swiper
                        style={styles.wrapper}
                        showsButtons={false}
                        loop={false}
                        dotStyle={{
                            backgroundColor: 'transparent',
                            width: 15,
                            height: 3,
                            borderRadius: 5,
                            borderColor: '#ccc',
                            borderWidth: 1,
                        }}
                        activeDotStyle={{
                            backgroundColor: '#253e6d',
                            width: 15,
                            height: 3,
                            borderRadius: 5,
                        }}
                        paginationStyle={{
                            bottom: 40,
                        }}
                    >
                        {/* 일 매출 카드 */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>
                                    일 매출 <Text style={styles.cardDate}>{today}</Text>
                                </Text>
                            </View>
                            <View style={styles.amountRow}>
                                <View style={styles.amountWrapperLeft}>
                                    <Animated.View
                                        style={{
                                            opacity: amountOpacity,
                                            transform: [{ translateY: amountTranslate }],
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.amount,
                                                dailyAmount < 0 && styles.cancelAmount,
                                                isAmountHidden && styles.hiddenDash,
                                            ]}
                                            adjustsFontSizeToFit
                                            numberOfLines={1}
                                        >
                                            {isAmountHidden ? '* * * * * *' : FORMAT.formatComma(dailyAmount)}
                                        </Text>
                                    </Animated.View>
                                    <Text style={styles.currencyText}>원</Text>
                                </View>
                                <TouchableOpacity onPress={toggleAmountHidden}>
                                    <Text style={styles.hideAmountText}>
                                        {isAmountHidden ? '금액보기' : '금액숨김'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handlePaymentPress('TRXLIST')}>
                                <Text style={styles.buttonStyle}>결제내역</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 월 매출 카드 */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>
                                월 매출 <Text style={styles.cardDate}>{currentMonth}</Text>
                            </Text>
                            <View style={styles.amountRow}>
                                <View style={styles.amountWrapperLeft}>
                                    <Animated.View
                                        style={{
                                            opacity: amountOpacity,
                                            transform: [{ translateY: amountTranslate }],
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.amount,
                                                monthlyAmount < 0 && styles.cancelAmount,
                                            ]}
                                            adjustsFontSizeToFit
                                            numberOfLines={1}
                                        >
                                            {isAmountHidden ? '* * * * * *' : FORMAT.formatComma(monthlyAmount)}
                                        </Text>
                                    </Animated.View>
                                    <Text style={styles.currencyText}>원</Text>
                                </View>
                                <TouchableOpacity onPress={toggleAmountHidden}>
                                    <Text style={styles.hideAmountText}>
                                        {isAmountHidden ? '금액보기' : '금액숨김'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handlePaymentPress('TRXLIST')}>
                                <Text style={styles.buttonStyle}>결제내역</Text>
                            </TouchableOpacity>
                        </View>
                    </Swiper>

                    {/* 최근 거래내역 */}
                    <View style={styles.transactionBox}>
                        <View style={styles.transactionHeader}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.label}>최근 거래내역</Text>
                                <Text style={styles.countText}> (최대 {totalCount}건)</Text>
                                <TouchableOpacity onPress={() => handlePaymentPress('TRXLIST')}>
                                    <Text style={styles.nextBtn}> &gt; </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerIcons}>
                                <TouchableOpacity>
                                    <Ionicons name="reload" size={24} style={styles.reloadIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowTransactions(!showTransactions)}>
                                    <Text style={styles.hideText}>
                                        {showTransactions ? '숨김' : '보기'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {showTransactions && (
                            <FlatList
                                data={transactions
                                    .slice()
                                    .sort((a, b) => parseDate(b) - parseDate(a))
                                    .slice(0, totalCount)}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <View style={styles.transactionRow}>
                                        <View style={styles.transactionTextContainer}>
                                            <Text style={styles.transactionText}>
                                                {parseDate(item).format('YYYY-MM-DD  HH:mm:ss')}
                                            </Text>
                                            <Text>
                                                <Text
                                                    style={[
                                                        styles.transactionAmount,
                                                        item.type === '취소' && styles.cancelAmount,
                                                    ]}
                                                >
                                                    {item.type === '취소' ? '-' : ''}
                                                    {FORMAT.formatKRW(item.amount)}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.rowDivider} />
                                    </View>
                                )}
                            />
                        )}
                    </View>

                    {/* ================ 기존 콘텐츠 끝 ================ */}
                </ScrollView>

                {/* Footer는 ScrollView 바깥에 고정됨 */}
                <View style={styles.footerContainer}>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>공지사항</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>FAQ</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>고객센터</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

        </>
    );

};

export default MainV2;
