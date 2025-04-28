import React, {useMemo, useRef, useState} from 'react';
import {Animated, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSub from '../../components/HeaderSub';
import FORMAT from '../../utils/FormatUtils';
import styles from '../../assets/styles/TrxListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';


const dummyTransactions = [
    { id: '1', date: '2025-04-01 10:20:30', method: '신용카드', product: '아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노아메리카노', amount: -4500 },
    { id: '2', date: '2025-04-02 13:45:00', method: '카카오페이', product: '치킨세트', amount: 18000 },
    { id: '3', date: '2025-04-02 13:45:00', method: '네이버페이', product: '칫솔세트', amount: 20000 },
    { id: '4', date: '2025-04-02 13:45:00', method: '네이버페이', product: '속옷세트', amount: 9000 },
    { id: '5', date: '2025-04-02 13:45:00', method: '삼성페이', product: '잠옷세트', amount: 66000 },
    { id: '6', date: '2025-04-02 13:45:00', method: '애플페이', product: '과일세트', amount: 35000 },
    { id: '7', date: '2025-04-02 13:45:00', method: '가상계좌', product: '키보드RF', amount: 15000 },
];

const TrxListScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const isLandscape = useMemo(() => layout.width > layout.height, [layout]);

    const translateY = useRef(new Animated.Value(200)).current;  // 초기 위치 (하단에 배치)

    const [fromDate, setFromDate] = useState('2025.04.01');
    const [toDate, setToDate] = useState('2025.04.05');
    const [filtered, setFiltered] = useState(dummyTransactions);
    const [showDetails, setShowDetails] = useState(false); // 요약 박스 표시 여부

    const horizontalPadding = isLandscape ? 100 : 0; // 가로 화면일 경우에만 여백 적용

    const handleSearch = () => {
        const filteredList = dummyTransactions.filter(
            item =>
                item.date >= fromDate.replace(/\./g, '-') &&
                item.date <= toDate.replace(/\./g, '-')
        );
        setFiltered(filteredList);
    };

    const groupedTotals = Object.values(
        dummyTransactions.reduce((acc, curr) => {
            if (!acc[curr.method]) acc[curr.method] = { method: curr.method, amount: 0 };
            acc[curr.method].amount += curr.amount;
            return acc;
        }, {}))
    ;

    const handleShowDetails = () => {
        setShowDetails(prev => {
            const next = !prev;
            Animated.timing(translateY, {
                toValue: next ? 0 : 200, // 올라오거나 내려감
                duration: 300,
                useNativeDriver: true,
            }).start();
            return next;
        });
    };

    return (
        <View style={styles.flex_1}>
            <View style={styles.flex_1}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={[styles.contentContainer, isLandscape &&  { paddingHorizontal: horizontalPadding }]}
                >
                    <View style={styles.flex_1}>
                        <HeaderSub title="결제 현황" onRefresh={handleSearch} />

                        {/* 검색 영역 */}
                        <View style={styles.searchSection}>
                            <View style={styles.dateInputRow}>
                                <View style={styles.dateInputContainer}>
                                    <Ionicons name="calendar-outline" size={18} color="#666" />
                                    <TextInput
                                        style={styles.dateInput}
                                        value={fromDate}
                                        onChangeText={setFromDate}
                                    />
                                </View>
                                <Text style={styles.tilde}> ~ </Text>
                                <View style={styles.dateInputContainer}>
                                    <Ionicons name="calendar-outline" size={18} color="#666" />
                                    <TextInput
                                        style={styles.dateInput}
                                        value={toDate}
                                        onChangeText={setToDate}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                                <Text style={styles.searchButtonText}>조회</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 선택 기간 */}
                        <View style={styles.dateRangeRow}>
                            <Text style={styles.dateRangeText}>
                                {`총 ${dummyTransactions.length} 건`}
                            </Text>
                            <TouchableOpacity onPress={handleShowDetails} style={styles.dropdownContainer}>
                                <Text style={styles.dropdownText}>전체</Text>
                                <Text style={styles.dropdownArrow}>▼</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 거래 내역 표시 */}
                        <View style={styles.whiteBackground}>
                            {filtered.map((item, index) => {
                                const isLastItem = index === filtered.length - 1; // 마지막 항목인지 확인
                                const shouldShowBorder = filtered.length <= 5 && isLastItem;  // filtered.length가 5 이하일 때만 마지막 항목에 borderBottom 적용

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => navigation.navigate('TRXDETAIL', { item })}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            key={item.id}
                                            style={[
                                                styles.transactionItem,
                                                shouldShowBorder && styles.lastTransactionItem,  // 마지막 항목에만 borderBottom 추가
                                            ]}
                                        >
                                            {/* 상품명 + 금액: 한 줄에 정렬 */}
                                            <View style={styles.productRow}>
                                                <Text style={styles.productName} numberOfLines={1}>
                                                    {FORMAT.formatSlice(item.product, 14)}
                                                </Text>
                                                <View style={styles.amountWithArrow}>
                                                    <Text
                                                        style={[
                                                            styles.amount,
                                                            item.amount < 0 && styles.amountNegative,
                                                        ]}
                                                    >
                                                        {FORMAT.formatKRW(item.amount)}
                                                    </Text>
                                                    <Text>
                                                        <MaterialIcons name="arrow-forward-ios" size={12} color="#adadad" />
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* 날짜 표시 */}
                                            <Text style={styles.transactionDate}>{item.date}</Text>

                                            {/* 결제수단 */}
                                            <Text style={styles.transactionMethod}>{item.method}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>

            {showDetails && (
                <>
                    {/* 딤처리된 배경 (ScrollView 외부에 위치해야 함) */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleShowDetails}
                        style={styles.overlay}
                    />

                    {/* 상세 금액 박스 */}
                    <Animated.View
                        style={[
                            styles.detailsBox,
                            {
                                transform: [{ translateY }],
                                width: layout.width - horizontalPadding * 2, // 가로 화면에서 padding을 고려하여 width 설정
                                left: horizontalPadding, // 왼쪽 여백을 주어서 양쪽 여백 균등하게
                            },
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleShowDetails}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={styles.dragIndicatorContainer}
                        >
                            <View style={styles.dragIndicator} />
                        </TouchableOpacity>

                        <View style={styles.totalAmountRow}>
                            <Text style={styles.totalAmountLabel}> 전체 금액 </Text>
                            <Text style={styles.totalAmountValue}>
                                {FORMAT.formatKRW(filtered.reduce((acc, curr) => acc + curr.amount, 0))}
                            </Text>
                        </View>


                        <ScrollView>
                            {groupedTotals.map((item) => (
                                <View style={styles.detailRow} key={item.method}>
                                    <Text style={styles.methodText}>{item.method}</Text>
                                    <Text style={[
                                        styles.methodAmount,
                                        item.amount < 0 && styles.amountNegative,
                                    ]}>{FORMAT.formatKRW(item.amount)}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </>
            )}
        </View>
    );
};



export default TrxListScreen;
