import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import FORMAT from '../utils/FormatUtils';
import styles from '../assets/styles/MainV2Style'; // 스타일 파일 경로 확인
import moment from 'moment'; // 날짜

const MainV2 = () => {
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
    const today = moment().format('M/D일');
    const currentMonth = moment().format('M월');

    const dailyAmount = 1234;
    const monthlyAmount = 55123943;
    const totalCount = 5; // 최대 5건

    const transactions = [
        { id: '1', date: '2025/04/17 12:32:11', type: '승인', amount: 1000 },
        { id: '2', date: '2025/04/17 11:12:54', type: '취소', amount: 5400 },
        { id: '3', date: '2025/04/16 09:01:33', type: '승인', amount: 12000 },
        { id: '4', date: '2025/04/15 20:44:20', type: '승인', amount: 7650 },
        { id: '5', date: '2025/04/15 18:22:17', type: '취소', amount: 30000 },
        { id: '6', date: '2025/04/14 18:20:10', type: '취소', amount: 100 },
    ];

    const parseDate = (str) => {
        return new Date(str.replace(/\/| /g, (m) => (m === '/' ? '-' : 'T')));
    };

    const handleApiCall = () => {
        navigation.navigate("DASHBOARD");
    };

    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.scrollViewContent}>
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
                    backgroundColor: '#006bf1',
                    width: 15,
                    height: 3,
                    borderRadius: 5,
                }}
                paginationStyle={{
                    bottom: 40,
                }}
            >
                {/* 금일 거래금액 카드 */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{today} 거래금액</Text>
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
                                        isAmountHidden && styles.hiddenDash, // 금액 숨김 상태일 때 별표 처리
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
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
                            <Text style={styles.buttonStyle}>당일 결제내역</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 금월 거래금액 카드 */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{currentMonth} 거래금액</Text>
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
                                style={[styles.amount, monthlyAmount < 0 && styles.cancelAmount]}
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
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
                            <Text style={styles.buttonStyle}>당월 결제내역</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>

            {/* 결제수단 영역*/}
            {/*<Text style={styles.paymentTitle}>결제수단</Text>*/}
            <View style={styles.paymentIconRow}>
                <TouchableOpacity style={styles.paymentIconBox}>
                    <Text style={styles.paymentIconLabel}>신용카드</Text>
                    <Ionicons name="card" size={22} color="#1689cc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentIconBox}>
                    <Text style={styles.paymentIconLabel}>Apple Pay</Text>
                    <Ionicons name="logo-apple" size={22} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentIconBox}>
                    <Text style={styles.paymentIconLabel}>Google Pay</Text>
                    <Ionicons name="logo-google" size={22} color="#34A853" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentIconBox}>
                    <Text style={styles.paymentIconLabel}>현금</Text>
                    <Ionicons name="cash" size={22} color="#28a745" />
                </TouchableOpacity>
            </View>





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
                        <TouchableOpacity onPress={handleApiCall}>
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
                            .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                            .slice(0, totalCount)}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={styles.transactionRow}>
                                <View style={styles.transactionTextContainer}>
                                    <Text style={styles.transactionText}>
                                        {item.date}
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
        </ScrollView>
    );
};

export default MainV2;
