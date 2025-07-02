import React, {useCallback, useRef, useState} from 'react';
import {
    Alert,
    Animated,
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {moveParamScreen, moveScreen} from './hooks/ScreenHooks';
import Swiper from 'react-native-swiper';
import UTILS from '../utils/Utils';
import styles from '../assets/styles/MainV2Style'; // 스타일 파일 경로 확인
import moment from 'moment'; // 날짜
import 'moment/locale/ko';
import DefaultModal from './modal/DefaultModal';
import OpenStoreLink from './OpenStoreLink';
import UpdateInfoModal from './modal/UpdateInfoModal';
import refreshHooks from './hooks/RefreshHooks';
import {Logout} from './Logout';
import ConfirmOkModal from './modal/ConfirmOkModal';
import {fetchWithTimeout} from './Fetch';

const MainV2 = ({ setRefreshControlProps }) => {
    moment.locale('ko');

    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [showTransactions, setShowTransactions] = useState(true); //최근거래내역 숨김,보기
    const [isAmountHidden, setIsAmountHidden] = useState(false); // 금액 숨김,보기
    const [openLinkVisible, setOpenLinkVisible] = useState(false);
    const amountOpacity = useRef(new Animated.Value(0)).current; // 시작 opacity 0
    const amountTranslate = useRef(new Animated.Value(-10)).current; // 시작 translateY -10
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [modalVisible, setModalVisible] = useState(false);
    const [dailyAmount, setDailyAmount] = useState(0);
    const [monthlyAmount, setMonthlyAmount] = useState(0);
    const [totalCount, setTotalCount] = useState(10);
    const [transactions, setTransactions] = useState(null);

    const toDay = moment().format("YYYYMMDD");
    const startDay = moment().startOf('month').format('YYYYMMDD');
    const endDay = moment().endOf('month').format('YYYYMMDD');

    const { refreshing, onRefresh } = refreshHooks(() => {
        reloadTrx();
    });

    // 부모에게 상태 전달
    React.useEffect(() => {
        setRefreshControlProps({ refreshing, onRefresh });
    }, []);


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


    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

    // 금액 숨김/보기 토글
    const toggleAmountHidden = () => {
        setIsAmountHidden(prev => !prev);
        runAmountAnimation(); // 버튼 클릭 시에도 애니메이션 실행
    };

    // 결제수단 클릭 이벤트
    const handlePaymentPress = (type) => {
        switch (type) {
            case 'CARD'     :
                if(global.E2U?.method?.card?.includes("regular")){
                    moveParamScreen(navigation, "PAYMENT", {from: 'CARD'});
                    break;
                }else{
                    setMessage(`카드 결제 서비스 '이용 불가' 가맹점 입니다.`);
                    setAlertVisible(true);
                }
            case 'TRXLIST'  :
                moveScreen(navigation, "TRXLIST"); break;
            case 'SMS' : case 'QR':
                // 개발 환경 처리
                if(global.E2U?.ENV === 'DEV'){
                    if (!global.E2U.method){
                        global.E2U.method = {};
                    }

                    if (Array.isArray(global.E2U.method.add) && global.E2U.method.add.length === 0){
                        global.E2U.method.add = ['link', 'qr'];
                    }
                }

                if(type.toLowerCase() === "sms"){
                    moveParamScreen(navigation, "PAYMENT", {from: 'SMS'});
                }else if(type.toLowerCase() === "qr"){
                    moveParamScreen(navigation, "PAYMENT", {from: 'QR'});
                }else{
                    setMessage(`${type} 결제 서비스 '이용 불가' 가맹점 입니다.`);
                    setAlertVisible(true);
                }
                break;
            default:
                setMessage('정의되지 않은 결제수단 서비스 입니다.');
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
        const totalToday = await search(`${toDay}, ${toDay}`);
        if(totalToday){
            setDailyAmount(totalToday.data?.result.reduce((sum, item) => sum + (item.amount || 0), 0));
        }

        const totalMonth = await search(`${startDay}, ${endDay}`);
        if(totalMonth){
            setMonthlyAmount(totalMonth.data?.totalAmount);
            setTransactions(totalMonth.data?.result);
        }
    }

    async function search(regDay) {
        try{

            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/trx/paging`, {
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
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`대시보드 조회 API 응답 \n ${JSON.stringify(result)}`);

            if(result?.code === '0000') {
                return result;
            }else if (result.code === '0805' || result.code === '0803' ) {
                setModalMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                setModalCallback(() => handleExit);
                setModalVisible(true);

            }else if(result?.code === '0802') {
                setOpenLinkVisible(true);
            }else{
                setTransactions(null);
                setDailyAmount(0);
                setMonthlyAmount(0);

                setMessage(`${result.description}`);
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }catch(err){
            setTransactions(null);
            setDailyAmount(0);
            setMonthlyAmount(0);

            global.E2U?.WARN(`대시보드 API 요청 실패 \n ${err}`);
            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage(`대시보드 정보 호출에 실패하였습니다.`);
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }
    }

    async function handleExit(){
        await Logout(navigation);
    }

    useFocusEffect(
        useCallback(() => {
            runAmountAnimation();

            async function fetchData() {
                try {
                    const totalToday = await search(`${toDay}, ${toDay}`);
                    if(totalToday){
                        setDailyAmount(totalToday.data?.result.reduce((sum, item) => sum + (item.amount || 0), 0));
                    }
                    const totalMonth = await search(`${startDay}, ${endDay}`);
                    if(totalMonth){
                        setMonthlyAmount(totalMonth.data?.totalAmount);
                        setTransactions(totalMonth.data?.result);
                    }
                } catch (err) {
                    global.E2U?.WARN(`대시보드 API 요청 실패 \n ${err}`);
                    if (err.message === 'Request timed out') {
                        setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                        setAlertVisible(true);

                    }else if (err.message === 'Network request failed') {
                        setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                        setAlertVisible(true);
                    }else{
                        setMessage(`대시보드 정보 호출에 실패하였습니다.`);
                        setAlertVisible(true);
                        setDefaultMessage(true);
                    }
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

            <ConfirmOkModal
                visible={modalVisible}
                onConfirm={() => {
                    modalCallback();
                    setModalVisible(false);
                }}
                message={modalMessage}
            />

            <UpdateInfoModal
                visible={openLinkVisible}
                onConfirm={handleOpenLinkConfirm}
            />

            <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={styles.main}
                    contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {/* ================ 기존 콘텐츠 시작 ================ */}
                    <View style={styles.merchantContainer}>
                        {global.E2U?.roleType === 'MANAGER' && (
                            <View style={styles.badgeManager}>
                                <Text style={styles.badgeText}>관리자</Text>
                            </View>
                        )}

                        {global.E2U?.roleType === 'MEMBER' && (
                            <View style={styles.badgeMember}>
                                <Text style={styles.badgeText}>일반</Text>
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

                        {/*<TouchableOpacity*/}
                        {/*    style={styles.paymentIconBox}*/}
                        {/*    onPress={() => handlePaymentPress('LINK')}*/}
                        {/*>*/}
                        {/*    <Ionicons name="link-outline" size={30} color="#00bcd4" />*/}
                        {/*    <Text style={styles.paymentIconLabel}>링크결제</Text>*/}
                        {/*</TouchableOpacity>*/}

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
                                            {isAmountHidden ? '* * * * * *' : dailyAmount < 0 ? `-${UTILS.comma(dailyAmount)}` : UTILS.comma(dailyAmount)}
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
                                            {isAmountHidden ? '* * * * * *' : monthlyAmount < 0 ? `-${UTILS.comma(monthlyAmount)}` : UTILS.comma(monthlyAmount)}
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
