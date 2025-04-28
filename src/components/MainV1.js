import React, {useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import FORMAT from '../utils/FormatUtils';
import styles from '../assets/styles/MainV1Style';

const MainV1 = () => {
    const navigation = useNavigation();
    const [showTransactions, setShowTransactions] = useState(true);

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

    /* 거래 조회 API 연결필요 */
    const handleApiCall = () => {
        navigation.navigate("DASHBOARD");
    };

    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.scrollViewContent}>
            {/* 금일 거래금액 카드 */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>금일 거래금액</Text>
                <View style={styles.cardContent}>
                    <View style={styles.amountWrapper}>
                        <Text style={styles.currency}>₩</Text>
                        <Text style={[styles.amount, dailyAmount < 0 && styles.cancelAmount]} adjustsFontSizeToFit numberOfLines={1}>
                            {FORMAT.formatComma(dailyAmount)}
                        </Text>
                        <Text style={styles.currencyText}>원</Text>
                    </View>
                </View>
            </View>

            {/* 금월 거래금액 카드 */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>금월 거래금액</Text>
                <View style={styles.cardContent}>
                    <View style={styles.amountWrapper}>
                        <Text style={styles.currency}>₩</Text>
                        <Text style={[styles.amount, monthlyAmount < 0 && styles.cancelAmount]} adjustsFontSizeToFit numberOfLines={1}>
                            {FORMAT.formatComma(monthlyAmount)}
                        </Text>
                        <Text style={styles.currencyText}>원</Text>
                    </View>
                </View>
            </View>

            {/* 최근 거래내역 */}
            <View style={styles.transactionBox}>
                <View style={styles.transactionHeader}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.label}>
                            최근 거래내역 <Text style={styles.countText}>(최대 {totalCount}건)</Text>
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TRXLIST')}>
                            <Text style={styles.nextBtn}> &gt; </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={handleApiCall}>
                            <Ionicons name="reload" size={20} style={styles.reloadIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowTransactions(!showTransactions)}>
                            <Text style={styles.hideText}>{showTransactions ? '숨김' : '보기'}</Text>
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

export default MainV1;
