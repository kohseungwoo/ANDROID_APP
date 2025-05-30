import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Modal,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSub from '../../components/HeaderSub';
import UTILS, {trxDetailRef} from '../../utils/Utils';
import styles from '../../assets/styles/TrxListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import refreshHooks from '../../components/hooks/RefreshHooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultModal from '../../components/modal/DefaultModal';
import {Logout} from '../../components/Logout';
import moment from 'moment';
import ConfirmOkModal from '../../components/modal/ConfirmOkModal';
import OpenStoreLink from '../../components/OpenStoreLink';
import UpdateInfoModal from '../../components/modal/UpdateInfoModal';
import {fetchWithTimeout} from '../../components/Fetch';

const TrxListScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const isLandscape = useMemo(() => layout.width > layout.height, [layout]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [exitVisible, setExitVisible] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(false);
    const translateY = useRef(new Animated.Value(200)).current;
    const [fromDateObj, setFromDateObj] = useState(new Date());
    const [toDateObj, setToDateObj] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null);
    const [trxList, setTrxList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false); // 추가 로딩 중 여부
    const [hasMore, setHasMore] = useState(false); // 더 불러올 데이터 존재 여부
    const [showDetails, setShowDetails] = useState(false);
    const horizontalPadding = isLandscape ? 100 : 0;

    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

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

    async function handleSearch(from = fromDateObj, to = toDateObj, page = 1, append = false) {
        if (to < from) {
            to = from;
            setToDateObj(from);
        }

        const fromFormatted = formatDate(from).replace(/\./g, '-');
        const toFormatted = formatDate(to).replace(/\./g, '-');

        if (page === 1 && !append) {
            setTrxList([]);
        }

        try{
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/trx/paging`, {
                method: 'POST',
                headers: {
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
                body: JSON.stringify({
                    page : page,
                    search : [{
                        'id'    : 'regDay',
                        'value' : `${fromFormatted.replaceAll('-','')}, ${toFormatted.replaceAll('-','')}`,
                        'oper'  : 'bt',
                    }],
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`거래 조회 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                const newRecords = result.data?.result || [];
                setTrxList((prev) => (append ? [...prev, ...newRecords] : newRecords));
                setTotalRecords(result.data?.totalRecords || 0);

                const more = result.data.totalRecords > page * pageSize;
                setHasMore(more);
                setCurrentPage(page);

            }else{
                if (result.code === '0805' || result.code === '0803' ) {
                    setMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                    setExitVisible(true);
                }else if (result.code === '0802'){
                    setOpenLinkVisible(true);
                } else{
                    setMessage(`${result.description}`);
                    setAlertVisible(true);
                    setDefaultMessage(false);
                }
            }
        }catch(err){
            global.E2U?.WARN(`거래 조회 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage('거래 조회 API 호출에 실패하였습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }finally {
            setIsLoadingMore(false);    // 반드시 여기서 false로!
        }
    };

    async function handleExit(){
        await Logout(navigation);
    }

    const { refreshing, onRefresh } = refreshHooks(() => {
        const now = new Date();
        setFromDateObj(now);
        setToDateObj(now);

        setHasMore(false);
        handleSearch(now, now, 1, false);
        setShowDetails(false);
    });

    useFocusEffect(
        useCallback(() => {
            if (trxDetailRef.current) {
                trxDetailRef.current = false; // 다음 진입 시에는 초기화 되도록
                return;
            }

            const now = new Date();
            setFromDateObj(now);
            setToDateObj(now);

            setHasMore(false);
            handleSearch(now, now, 1, false);
            setShowDetails(false);
        }, [])
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
                visible={exitVisible}
                onCancel={() => setExitVisible(true)}
                onConfirm={handleExit}
                message={message}
            />

            <UpdateInfoModal
                visible={openLinkVisible}
                onConfirm={handleOpenLinkConfirm}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.flex_1}>
                <HeaderSub title="결제 현황" onRefresh={onRefresh} />

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
                    <TouchableOpacity style={styles.searchButton}
                                      onPress={() => {
                                            setHasMore(false);
                                            handleSearch(fromDateObj, toDateObj, 1, false);
                                        }}>
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

                {/*<ScrollView*/}
                {/*    style={styles.container}*/}
                {/*    contentContainerStyle={styles.contentContainer}*/}
                {/*    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}*/}
                {/*>*/}

                {/*    <View style={styles.whiteBackground}>*/}
                {/*        {trxList?.map((item, index) => {*/}
                {/*            const isLastItem = index === trxList?.length - 1;*/}
                {/*            const shouldShowBorder = trxList?.length <= 5 && isLastItem;*/}

                {/*            return (*/}
                {/*                <TouchableOpacity*/}
                {/*                    key={item.trxId}*/}
                {/*                    onPress={() => navigation.navigate('TRXDETAIL', { item })}*/}
                {/*                    activeOpacity={0.7}*/}
                {/*                >*/}
                {/*                    <View style={[styles.transactionItem, shouldShowBorder && styles.lastTransactionItem]}>*/}
                {/*                        <View style={styles.productRow}>*/}
                {/*                            <Text style={styles.productName} numberOfLines={1}>*/}
                {/*                                {UTILS.slice(item.productName, 14)}*/}
                {/*                            </Text>*/}
                {/*                            <View style={styles.amountWithArrow}>*/}
                {/*                                <Text style={[styles.amount, item.amount < 0 && styles.amountNegative]}>*/}
                {/*                                    {UTILS.KRW(item.amount)}*/}
                {/*                                </Text>*/}
                {/*                                <MaterialIcons name="arrow-forward-ios" size={12} color="#adadad" />*/}
                {/*                            </View>*/}
                {/*                        </View>*/}
                {/*                        <Text style={styles.transactionDate}>*/}
                {/*                            {moment(item.regDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}*/}
                {/*                        </Text>*/}
                {/*                        <Text style={styles.transactionMethod}>{UTILS.convertMethod(item.method)}</Text>*/}
                {/*                    </View>*/}
                {/*                </TouchableOpacity>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </View>*/}
                {/*</ScrollView>*/}

                <FlatList
                    data={trxList}
                    keyExtractor={(item) => item.trxId.toString()}
                    renderItem={({ item, index }) => {
                        const isLastItem = index === trxList.length - 1;
                        const shouldShowBorder = trxList.length <= 5 && isLastItem;

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
                    }}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => {
                        if (!isLoadingMore && hasMore) {
                            setIsLoadingMore(true);
                            handleSearch(fromDateObj, toDateObj, currentPage + 1, true); // true로 append 방식
                        }
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={
                        <>
                            {/* 총 건수, 날짜 필터, 조회 버튼 등 상단 고정 요소 */}
                        </>
                    }
                    ListFooterComponent={
                        isLoadingMore ? <ActivityIndicator size="small" color="#999" /> : null
                    }
                    contentContainerStyle={{ paddingBottom: 30 }}
                    style={{ flex: 1, backgroundColor: '#fff' }}
                />


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
                                <Text style={[styles.methodAmount, {
                                    color : UTILS.KRW(trxList.reduce((acc, curr) => acc + curr.amount, 0)) < 0 ? 'red' : 'black'
                                }]}>
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
