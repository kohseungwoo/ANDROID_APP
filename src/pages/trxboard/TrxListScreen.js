import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated,Modal,
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
import UTILS from '../../utils/Utils';
import styles from '../../assets/styles/TrxListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import refreshHooks from '../../components/hooks/RefreshHooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultModal from '../../components/modal/DefaultModal';
import {Logout} from '../../components/Logout';
import moment from 'moment';

const TrxListScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const isLandscape = useMemo(() => layout.width > layout.height, [layout]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');

    const translateY = useRef(new Animated.Value(200)).current;

    // 날짜 상태
    const [fromDateObj, setFromDateObj] = useState(new Date());
    const [toDateObj, setToDateObj] = useState(new Date());

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null);

    // 거래 관련
    const [trxList, setTrxList] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [pageSize, setPageSize] = useState([]);
    const [totalRecords, setTotalRecords] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    const horizontalPadding = isLandscape ? 100 : 0;

    const formatDate = (date) => {
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    };

    const groupedTotals = useMemo(() => {
        return Object.values(
            trxList.reduce((acc, curr) => {
                if (!acc[curr.method]) acc[curr.method] = { method: curr.method, amount: 0 };
                acc[curr.method].amount += curr.amount;
                return acc;
            }, {})
        );
    }, [trxList]);

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

    async function handleSearch(fromDateParam, toDateParam){
        let from = fromDateParam || fromDateObj;
        let to = toDateParam || toDateObj;

        // to가 from보다 작으면 to를 from으로 설정
        if (to < from) {
            to = from;
            setToDateObj(from); // 상태 업데이트
        }

        const fromFormatted = formatDate(from).replace(/\./g, '-');
        const toFormatted = formatDate(to).replace(/\./g, '-');

        try{
            const response = await fetch(`${global.E2U?.API_URL}/v2/trx/paging`, {
                method: 'POST',
                headers: {
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
                body: JSON.stringify({
                    search : [{
                        'id'    : 'regDay',
                        'value' : `${fromFormatted.replaceAll('-','')}, ${toFormatted.replaceAll('-','')}`,
                        'oper'  : 'bt',
                    }],
                }),
            });

            const result = await response.json();
            if (result.code === '0000') {
                setTotalRecords(result.data?.totalRecords || 0);
                setTrxList(result.data?.result);
            }else{
                if (result.code === '803') {
                    await Logout(navigation);
                }else{
                    setMessage(`${result.message}`);
                    setAlertVisible(true);
                    setDefaultMessage(false);
                }
            }
        }catch(err){
            global.E2U?.WARN(`거래 조회 API 요청 실패 \n ${err}`);
            setMessage(`거래 조회 호출에 실패하였습니다. \n 관리자에게 문의하시기 바랍니다.`);
            setAlertVisible(true);
            setDefaultMessage(false);
        }
    };

    const refresh = () => {
        const now = new Date();
        setFromDateObj(now);
        setToDateObj(now);
        handleSearch(now, now);
        setShowDetails(false);
    };

    useFocusEffect(
        useCallback(() => {
            const now = new Date();
            setFromDateObj(now);
            setToDateObj(now);

            handleSearch(now, now);
            setShowDetails(false);
        }, [])
    );

    const { refreshing, onRefresh } = refreshHooks(refresh);
    return (
        <>
            <DefaultModal
                visible={alertVisible}
                message={message}
                onConfirm={() => setAlertVisible(false)}
                defaultMessage={defaultMessage}
            />

            <SafeAreaView style={styles.safeArea}>
        <View style={styles.flex_1}>
            <HeaderSub title="결제 현황" onRefresh={refresh} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

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
                    <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(fromDateObj, toDateObj)}>
                        <Text style={styles.searchButtonText}>조회</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.dateRangeRow}>
                    <Text style={styles.dateRangeText}>{`총 ${totalRecords || 0} 건`}</Text>
                    <TouchableOpacity onPress={handleShowDetails} style={styles.dropdownContainer}>
                        <Text style={styles.dropdownText}>전체</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.whiteBackground}>
                    {trxList?.map((item, index) => {
                        const isLastItem = index === trxList?.length - 1;
                        const shouldShowBorder = trxList?.length <= 5 && isLastItem;

                        return (
                            <TouchableOpacity
                                key={item.trxId}
                                onPress={() => navigation.navigate('TRXDETAIL', { item })}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.transactionItem, shouldShowBorder && styles.lastTransactionItem]}>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productName} numberOfLines={1}>
                                            {UTILS.slice(item.productName, 14)}
                                        </Text>
                                        <View style={styles.amountWithArrow}>
                                            <Text style={[styles.amount, item.amount < 0 && styles.amountNegative]}>
                                                {UTILS.KRW(item.amount)}
                                            </Text>
                                            <MaterialIcons name="arrow-forward-ios" size={12} color="#adadad" />
                                        </View>
                                    </View>
                                    <Text style={styles.transactionDate}>
                                        {moment(item.regDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}
                                    </Text>
                                    <Text style={styles.transactionMethod}>{UTILS.convertMethod(item.method)}</Text>
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
                                    {UTILS.KRW(trxList.reduce((acc, curr) => acc + curr.amount, 0))}
                                </Text>
                            </View>

                            {groupedTotals.map((item) => (
                                <View style={styles.detailRow} key={item.method}>
                                    <Text style={styles.methodText}>{UTILS.convertMethod(item.method)}</Text>
                                    <Text style={[styles.methodAmount, item.amount < 0 && styles.amountNegative]}>
                                        {UTILS.KRW(item.amount)}
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
        </>
    );
};

export default TrxListScreen;
