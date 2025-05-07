import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import FORMAT from '../utils/FormatUtils';
import styles from '../assets/styles/MainV2Style'; // 스타일 파일 경로 확인
import moment from 'moment'; // 날짜
import 'moment/locale/ko';

const { height } = Dimensions.get('window');


const MainV2 = () => {
    moment.locale('ko');

    const navigation = useNavigation();
    const [showTransactions, setShowTransactions] = useState(true); //최근거래내역 숨김,보기
    const [isAmountHidden, setIsAmountHidden] = useState(false); // 금액 숨김,보기
    const amountOpacity = useRef(new Animated.Value(0)).current; // 시작 opacity 0
    const amountTranslate = useRef(new Animated.Value(-10)).current; // 시작 translateY -10

    // 금액 애니메이션을 설정하는 함수
    const runAmountAnimation = () => {
        amountOpacity.setValue(0); // 애니메이션 시작 시 opacity를 0으로 초기화
        amountTranslate.setValue(-10); // 애니메이션 시작 시 translateY를 -10으로 초기화

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
    };

    // 컴포넌트가 마운트 될 때 애니메이션 실행
    useEffect(() => {
        runAmountAnimation();
    },[]); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

    // 금액 숨김/보기 토글
    const toggleAmountHidden = () => {
        setIsAmountHidden(prev => !prev);
        runAmountAnimation(); // 버튼 클릭 시에도 애니메이션 실행
    };

    // 날짜 변수 선언
    const today = moment().format('M.D(dd)');
    const currentMonth = moment().format('M월');

    const dailyAmount = 1234;
    const monthlyAmount = 55123943;
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* ✅ Scrollable Content */}
                <ScrollView
                    style={styles.main}
                    contentContainerStyle={[styles.scrollViewContent, { paddingBottom: 80 }]} // 하단 고정 footer 가리지 않도록
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
                        <TouchableOpacity style={styles.paymentIconBox}>
                            <Ionicons name="card" size={22} color="#2680eb" />
                            <Text style={styles.paymentIconLabel}>카드결제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentIconBox}>
                            <Ionicons name="chatbox-outline" size={22} color="#ff9900" />
                            <Text style={styles.paymentIconLabel}>SMS결제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentIconBox}>
                            <Ionicons name="link-outline" size={22} color="#00bcd4" />
                            <Text style={styles.paymentIconLabel}>링크결제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentIconBox}>
                            <Ionicons name="qr-code-outline" size={22} color="#28a745" />
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
                            <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
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
                                <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
                                    <Text style={styles.nextBtn}> &gt; </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerIcons}>
                                <TouchableOpacity onPress={() => navigation.navigate("DASHBOARD")}>
                                    <Ionicons name="reload" size={20} style={styles.reloadIcon} />
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

                {/* ✅ Footer는 ScrollView 바깥에 고정됨 */}
                <View style={styles.footerContainer}>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>FAQ</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>공지사항</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.footerButton}>고객센터</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

};

export default MainV2;
