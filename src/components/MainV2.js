import React, {useCallback, useRef, useState} from 'react';
import {Alert, Animated, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {moveParamScreen, moveScreen} from './hooks/ScreenHooks';
import Swiper from 'react-native-swiper';
import UTILS from '../utils/Utils';
import styles from '../assets/styles/MainV2Style'; // 스타일 파일 경로 확인
import moment from 'moment'; // 날짜
import 'moment/locale/ko';
import DefaultModal from './modal/DefaultModal';

const MainV2 = () => {
    moment.locale('ko');

    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [showTransactions, setShowTransactions] = useState(true); //최근거래내역 숨김,보기
    const [isAmountHidden, setIsAmountHidden] = useState(false); // 금액 숨김,보기
    const amountOpacity = useRef(new Animated.Value(0)).current; // 시작 opacity 0
    const amountTranslate = useRef(new Animated.Value(-10)).current; // 시작 translateY -10

    const [dailyAmount, setDailyAmount] = useState(0);
    const [monthlyAmount, setMonthlyAmount] = useState(0);
    const [totalCount, setTotalCount] = useState(10);
    const [transactions, setTransactions] = useState(null);

    const toDay = moment().format("YYYYMMDD");
    const startDay = moment().startOf('month').format('YYYYMMDD');
    const endDay = moment().endOf('month').format('YYYYMMDD');


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
                setMessage(`${type} 서비스는 준비중입니다.`);
                setAlertVisible(true);
                setDefaultMessage(false);
                break;
            default:
                // setMessage(''); // 메시지 바꾸고 싶으면 입력
                setAlertVisible(true);
                setDefaultMessage(true);
        }
    };

    const handlePress = useCallback((item) => {
        switch (item.key) {
            case 'version':
                Alert.alert('버전 정보', '현재 앱 버전은 v1.0.0 입니다.');
                break;
            case 'contact': case 'notice': case 'faq':
                moveParamScreen(navigation, "NOTICE", { tab: item.key });
                break;
            default:
                navigation.navigate(item.route);
        }
    }, [navigation]);


    async function reloadTrx() {
        const totalMonth = await search(`${startDay}, ${endDay}`);
        setMonthlyAmount(totalMonth.data?.totalAmount);
        setTransactions(totalMonth.data?.result);
    }

    async function search(regDay) {
        const response = await fetch(`${global.E2U.API_URL}/v2/trx/paging`, {
            method: 'POST',
            headers: {
                'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                'Authorization': global.E2U?.key,
                'VERSION'  : global.E2U?.APP_VERSION,
            },
            body: JSON.stringify({
                search : [{
                    'id'    : 'regDay',
                    'value' : `${regDay}`,
                    'oper'  : 'bt',
                }],
            }),
        });

        return await response.json();
    }

    useFocusEffect(
        useCallback(() => {
            runAmountAnimation();

            async function fetchData() {
                try {
                    const totalToday = await search(`${toDay}, ${toDay}`);
                    setDailyAmount(totalToday.data?.result.reduce((sum, item) => sum + (item.amount || 0), 0));

                    const totalMonth = await search(`${startDay}, ${endDay}`);
                    setMonthlyAmount(totalMonth.data?.totalAmount);
                    setTransactions(totalMonth.data?.result);

                } catch (err) {
                    global.E2U?.WARN(`대시보드 API 요청 실패 \n ${err}`);
                    setMessage(`대시보드 호출에 실패하였습니다. \n 관리자에게 문의하시기 바랍니다.`);
                    setAlertVisible(true);
                    setDefaultMessage(false);
                }
            }

            fetchData();
        }, [runAmountAnimation])
    );

    return (
        <>
            <DefaultModal
                visible={alertVisible}
                message={message}
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
                        {global.E2U?.grade === 'APP' && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>매장</Text>
                            </View>
                        )}
                        <Text style={styles.merchantNick}>
                            {global.E2U?.nick || ''}
                            <Text style={styles.grayText}>
                                {global.E2U?.appId ? ` (${global.E2U?.appId})` : ''}
                            </Text>
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
                                    일 매출 <Text style={styles.cardDate}>{moment().format('M.D(dd)')}</Text>
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
                                            {isAmountHidden ? '* * * * * *' : UTILS.comma(dailyAmount)}
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
                                월 매출 <Text style={styles.cardDate}>{moment().format('M월')}</Text>
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
                                            {isAmountHidden ? '* * * * * *' : UTILS.comma(monthlyAmount)}
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
                                <TouchableOpacity onPress={() => reloadTrx()}>
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
                                data={(transactions || [])
                                    .slice()
                                    .sort((a, b) => UTILS.parseDate(b.regDay+b.regTime) - UTILS.parseDate(a.regDay+a.regTime))
                                    .slice(0, totalCount)}
                                keyExtractor={(item) => item.trxId}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <View style={styles.transactionRow}>
                                        <View style={styles.transactionTextContainer}>
                                            <Text style={styles.transactionText}>
                                                {UTILS.parseDate(item.regDay+item.regTime).format('YYYY-MM-DD  HH:mm:ss')}
                                            </Text>
                                            <Text>
                                                <Text
                                                    style={[
                                                        styles.transactionAmount,
                                                        item.trxType !== 'authorized' && styles.cancelAmount,
                                                    ]}
                                                >
                                                    {UTILS.KRW(item.amount)}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.rowDivider} />
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <View style={{ paddingTop:20, alignItems: 'left'}}>
                                        <Text style={{ color: '#888', fontSize: 16 }}>거래정보를 찾을 수 없습니다.</Text>
                                    </View>
                                }
                            />
                        )}
                    </View>

                    {/* ================ 기존 콘텐츠 끝 ================ */}
                </ScrollView>

                {/* Footer는 ScrollView 바깥에 고정됨 */}
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerButtonBox} onPress={() => handlePress({ key: 'notice' })}>
                        <Text style={styles.footerButton}>공지사항</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity style={styles.footerButtonBox} onPress={() => handlePress({ key: 'faq' })}>
                        <Text style={styles.footerButton}>FAQ</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerSeparator}>|</Text>
                    <TouchableOpacity style={styles.footerButtonBox} onPress={() => handlePress({ key: 'contact' })}>
                        <Text style={styles.footerButton}>고객센터</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

        </>
    );

};

export default MainV2;
