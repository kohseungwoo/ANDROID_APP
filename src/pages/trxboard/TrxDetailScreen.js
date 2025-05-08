import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FORMAT from '../../utils/FormatUtils';
import styles from '../../assets/styles/TrxDetailStyle';

const TrxDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;

    const transactionStatus = item.amount > 0 ? "승인" : "승인취소";


    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.hashTitle}>#{item.method}</Text>
                    <Text style={styles.mchtName}>역전호떡</Text>
                    <View style={styles.thickDivider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>거래시각</Text>
                        <Text style={styles.value}>{item.date.replace(/-/g, '.')}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>거래구분</Text>
                        <Text style={styles.value}>{item.method} (체크)</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>거래유형</Text>
                        <Text style={styles.value}>{transactionStatus}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>거래번호</Text>
                        <Text style={styles.value}>TRX250421522043</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>승인번호</Text>
                        <Text style={styles.value}>57680890</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>거래금액</Text>
                        <Text style={styles.amount}>
                            {FORMAT.formatKRW(item.amount)}
                        </Text>
                    </View>

                    <View style={styles.lightDivider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>카드정보</Text>
                        <Text style={styles.value}>비씨카드</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>카드번호</Text>
                        <Text style={styles.value}>4092-12**-****-331*</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>할부개월</Text>
                        <Text style={styles.value}>일시불</Text>
                    </View>

                    <View style={styles.lightDivider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>사용처</Text>
                        <Text style={styles.value}>역전호떡</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>주소</Text>
                        <Text style={styles.value}
                              numberOfLines={2}
                              ellipsizeMode="tail">경기도 시흥시 중심상가로 125 (정왕동, 계룡 1차 아파트) 114동 704호</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>전화번호</Text>
                        <Text style={styles.value}>032-8112-8428</Text>
                    </View>
                    <View style={styles.lightDivider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>서비스사</Text>
                        <Text style={styles.value}>(주)이투유</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>주소</Text>
                        <Text style={styles.value}
                              numberOfLines={2}
                              ellipsizeMode="tail">	경기도 성남시 수정구 위례광장로 19, 10층 1001호</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>전화번호</Text>
                        <Text style={styles.value}>02-1600-4191</Text>
                    </View>
                </ScrollView>

                {/* 하단 고정 확인 버튼 */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TrxDetailScreen;
