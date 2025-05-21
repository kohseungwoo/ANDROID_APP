import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
    Animated,
    Modal,
    Platform,
    RefreshControl, SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSub from '../../components/HeaderSub';
import FORMAT from '../../utils/FormatUtils';
import styles from '../../assets/styles/TrxListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import refreshHooks from '../../components/hooks/RefreshHooks';
import DateTimePicker from '@react-native-community/datetimepicker';

const dummyTransactions = [
    { id: '1', date: '2025-04-01 10:20:30', method: '신용카드', product: '아메리카노', amount: -4500 },
    { id: '2', date: '2025-04-02 13:45:00', method: '카카오페이', product: '치킨세트', amount: 18000 },
    { id: '3', date: '2025-04-02 13:45:00', method: '네이버페이', product: '칫솔세트', amount: 20000 },
    { id: '4', date: '2025-04-02 13:45:00', method: '네이버페이', product: '속옷세트', amount: 9000 },
    { id: '5', date: '2025-04-02 13:45:00', method: '삼성페이', product: '잠옷세트', amount: 66000 },
    { id: '6', date: '2025-04-02 13:45:00', method: '애플페이', product: '과일세트', amount: 35000 },
    { id: '7', date: '2025-04-02 13:45:00', method: '가상계좌', product: '키보드RF', amount: 15000 },
];

const formatDate = (date) => {
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

const TrxListScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const isLandscape = useMemo(() => layout.width > layout.height, [layout]);

    const translateY = useRef(new Animated.Value(200)).current;

    // 날짜 상태
    const [fromDateObj, setFromDateObj] = useState(new Date());
    const [toDateObj, setToDateObj] = useState(new Date());

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null);


    const [filtered, setFiltered] = useState(dummyTransactions);
    const [showDetails, setShowDetails] = useState(false);


    const horizontalPadding = isLandscape ? 100 : 0;

    const groupedTotals = useMemo(() => {
        return Object.values(
            filtered.reduce((acc, curr) => {
                if (!acc[curr.method]) acc[curr.method] = { method: curr.method, amount: 0 };
                acc[curr.method].amount += curr.amount;
                return acc;
            }, {})
        );
    }, [filtered]);

    const handleShowDetails = () => {
        setShowDetails(prev => {
            const next = !prev;
            Animated.timing(translateY, {
                toValue: next ? 0 : 200,
                duration: 300,
                useNativeDriver: true,
            }).start();
            return next;
        });
    };

    const handleSearch = () => {
        let from = fromDateObj;
        let to = toDateObj;

        // to가 from보다 작으면 to를 from으로 설정
        if (to < from) {
            to = from;
            setToDateObj(from); // 상태 업데이트
        }

        const fromFormatted = formatDate(from).replace(/\./g, '-');
        const toFormatted = formatDate(to).replace(/\./g, '-');

        const filteredList = dummyTransactions.filter(
            item => item.date >= fromFormatted && item.date <= toFormatted
        );
        setFiltered(filteredList);
    };

    const refresh = () => {
        const now = new Date();
        setFromDateObj(now);
        setToDateObj(now);

        const formattedNow = formatDate(now).replace(/\./g, '-');

        const filteredList = dummyTransactions.filter(
            item => item.date === formattedNow
        );

        setFiltered(filteredList);
    };

    useFocusEffect(
        useCallback(() => {
            const today = new Date();
            setFromDateObj(today);
            setToDateObj(today);

            handleSearch();
            setShowDetails(false);
        }, [])
    );

    const { refreshing, onRefresh } = refreshHooks(refresh);

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.flex_1}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                <HeaderSub title="결제 현황" onRefresh={refresh} />

                <View style={styles.searchSection}>
                    <View style={styles.dateInputRow}>
                        <TouchableOpacity
                            style={styles.dateInputContainer}
                            onPress={() => {
                                setCurrentPicker('from');
                                setShowFromPicker(true);
                            }}
                        >
                            <Ionicons name="calendar-outline" size={18} color="#666" />
                            <Text style={styles.dateInput}>{formatDate(fromDateObj)}</Text>
                        </TouchableOpacity>
                        <Text style={styles.tilde}> ~ </Text>
                        <TouchableOpacity
                            style={styles.dateInputContainer}
                            onPress={() => {
                                setCurrentPicker('to');
                                setShowToPicker(true);
                            }}
                        >
                            <Ionicons name="calendar-outline" size={18} color="#666" />
                            <Text style={styles.dateInput}>{formatDate(toDateObj)}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.searchButtonText}>조회</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.dateRangeRow}>
                    <Text style={styles.dateRangeText}>{`총 ${filtered.length} 건`}</Text>
                    <TouchableOpacity onPress={handleShowDetails} style={styles.dropdownContainer}>
                        <Text style={styles.dropdownText}>전체</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.whiteBackground}>
                    {filtered.map((item, index) => {
                        const isLastItem = index === filtered.length - 1;
                        const shouldShowBorder = filtered.length <= 5 && isLastItem;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => navigation.navigate('TRXDETAIL', { item })}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.transactionItem, shouldShowBorder && styles.lastTransactionItem]}>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productName} numberOfLines={1}>
                                            {FORMAT.formatSlice(item.product, 14)}
                                        </Text>
                                        <View style={styles.amountWithArrow}>
                                            <Text style={[styles.amount, item.amount < 0 && styles.amountNegative]}>
                                                {FORMAT.formatKRW(item.amount)}
                                            </Text>
                                            <MaterialIcons name="arrow-forward-ios" size={12} color="#adadad" />
                                        </View>
                                    </View>
                                    <Text style={styles.transactionDate}>{item.date}</Text>
                                    <Text style={styles.transactionMethod}>{item.method}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* 전체 버튼 클릭 시 하단 상세 영역 */}
            {showDetails && (
                <>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleShowDetails}
                        style={styles.overlay}
                    />
                    <Animated.View
                        style={[
                            styles.detailsBox,
                            {
                                transform: [{ translateY }],
                                width: layout.width - horizontalPadding * 2,
                                left: horizontalPadding,
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
                            <Text style={styles.totalAmountLabel}>결제수단 내역</Text>
                        </View>

                        <ScrollView>
                            <View style={styles.detailRow}>
                                <Text style={styles.methodText}>전체</Text>
                                <Text style={styles.methodAmount}>
                                    {FORMAT.formatKRW(filtered.reduce((acc, curr) => acc + curr.amount, 0))}
                                </Text>
                            </View>

                            {groupedTotals.map((item) => (
                                <View style={styles.detailRow} key={item.method}>
                                    <Text style={styles.methodText}>{item.method}</Text>
                                    <Text style={[styles.methodAmount, item.amount < 0 && styles.amountNegative]}>
                                        {FORMAT.formatKRW(item.amount)}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </>
            )}

            {/* Date Picker 모달 */}
            {showFromPicker && Platform.OS === 'android' && (
                <DateTimePicker
                    value={fromDateObj}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowFromPicker(false);
                        if (selectedDate) setFromDateObj(selectedDate);
                    }}
                />
            )}

            {showToPicker && Platform.OS === 'android' && (
                <DateTimePicker
                    value={toDateObj}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowToPicker(false);
                        if (selectedDate) setToDateObj(selectedDate);
                    }}
                />
            )}

            {/* iOS는 모달 형태로 보여야 함 */}
            {Platform.OS === 'ios' && currentPicker && (
                <Modal
                    transparent
                    animationType="slide"
                    visible={showFromPicker || showToPicker}
                >
                    <View style={styles.iosPickerContainer}>
                        <View style={styles.iosPicker}>
                            <DateTimePicker
                                value={currentPicker === 'from' ? fromDateObj : toDateObj}
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    if (event.type === 'set' && selectedDate) {
                                        if (currentPicker === 'from') setFromDateObj(selectedDate);
                                        else setToDateObj(selectedDate);
                                    }
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (currentPicker === 'from') setShowFromPicker(false);
                                    else setShowToPicker(false);
                                    setCurrentPicker(null);
                                }}
                            >
                                <Text style={styles.doneText}>완료</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
        </SafeAreaView>
    );
};

export default TrxListScreen;
