import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, Dimensions,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import UTILS from '../../utils/Utils';
import styles from '../../assets/styles/TrxDetailStyle';
import moment from 'moment';
import {Logout} from '../../components/Logout';
import DefaultModal from '../../components/modal/DefaultModal';
import ConfirmOkModal from '../../components/modal/ConfirmOkModal';
import InputModal from '../../components/modal/inputModal';
import OpenStoreLink from '../../components/OpenStoreLink';
import UpdateInfoModal from '../../components/modal/UpdateInfoModal';
import {fetchWithTimeout} from '../../components/Fetch';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TrxDetailScreen = () => {
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [inputVisible, setInputVisible] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(() => () => {});
    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const [companyName , setCompanyName] = useState('(주)이투유');
    const [companyAddr , setCompanyAddr] = useState('경기도 성남시 수정구 위례광장로 19, 10층 1001호');
    const [companyTelNo, setCompanyTelNo] = useState('1600-4191');
    const { item } = route.params;

    const insets = useSafeAreaInsets();
    const {height: screenHeight } = Dimensions.get('window');


    useEffect(() => {
        global.E2U?.INFO('본사 정보 조회 API 요청');

        const companyCall = async () => {
            try{
                const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/axios/company`, {
                    method: 'GET',
                    headers: {
                        'Authorization': global.E2U?.key,
                        'VERSION'  : global.E2U?.APP_VERSION,
                    },
                }, global.E2U?.NETWORK_TIMEOUT);

                const result = await response.json();
                global.E2U?.INFO(`본사 정보 조회 API 응답 \n ${JSON.stringify(result)}`);

                if (result.code === '0000') {
                    setCompanyName(result.data?.name || companyName);
                    setCompanyAddr(result.data?.addr || companyAddr);
                    setCompanyTelNo(result.data?.telNo || companyTelNo);
                }else{
                    if (result.code === '0805' || result.code === '0803' ) {
                        setModalMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                        setModalCallback(() => handleExit);
                        setModalVisible(true);
                    }else if (result.code === '0802'){
                        setOpenLinkVisible(true);
                    }else{
                        setMessage(`${result.description}`);
                        setAlertVisible(true);
                        setDefaultMessage(false);
                    }
                }
            }catch(err){
                global.E2U?.WARN(`본사 정보 조회 API 요청 실패 \n ${err}`);

                if (err.message === 'Request timed out') {
                    setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                    setAlertVisible(true);

                }else if (err.message === 'Network request failed') {
                    setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                    setAlertVisible(true);
                }else{
                    setMessage('본사 정보 조회 호출에 실패하였습니다.');
                    setAlertVisible(true);
                    setDefaultMessage(true);
                }

            }
        };

        companyCall();
    },[]);

    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

    const refundBtn = async () => {
        if(global.E2U?.roleType !== 'MANAGER'){
            setModalMessage(`'일반' 권한은 취소 요청이 불가능합니다. \n 확인 후 재시도 해주시기 바랍니다.`);
            setModalVisible(true);
            return;
        }

        try{
            setLoading(true);
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/api/refund`, {
                method: 'POST',
                headers: {
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
                body: JSON.stringify({
                    rootTrxId   : `${item.trxId}`,
                    trackId     : `${item.trackId}`,
                    amount      : `${item.amount}`,
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`취소 요청 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                setModalMessage('정상적으로 처리되었습니다. \n 거래 내역으로 이동합니다.');
                setModalCallback(() => handleTrxList);
                setModalVisible(true);
            }else{
                if (result.code === '0805' || result.code === '0803' ) {
                    setModalMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                    setModalCallback(() => handleExit);
                    setModalVisible(true);
                }else if (result.code === '0802'){
                    setOpenLinkVisible(true);
                }else{
                    setMessage(`${result.description}`);
                    setAlertVisible(true);
                    setDefaultMessage(false);
                }
            }
        }catch(err){
            global.E2U?.WARN(`취소 API 요청 실패 \n ${err}`);
            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage('취소 API 요청에 실패하였습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }

        }finally{
            setLoading(false);
        }
    };

    const receiptBtn = (phoneNumber)=> {
        const msg = `${global.E2U?.ADMIN_URL}/trx/receipt/${item.trxId}`;
        const url =
          Platform.OS === 'ios'
            ? `sms:${phoneNumber}&body=${encodeURIComponent(msg)}`
            : `sms:${phoneNumber}?body=${encodeURIComponent(msg)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    setInputVisible(false);
                    setAlertVisible(true);
                    setMessage(`전표 전송에 실패하였습니다.`);
                    setDefaultMessage(true);
                }
            }).catch((err) =>
                global.E2U?.WARN(`SMS 연결 실패 \n ${err}`,
                setInputVisible(false),
                setMessage(`전표 전송에 실패하였습니다.`),
                setDefaultMessage(true),
            ));
    };

    async function handleExit(){
        await Logout(navigation);
    }

    function handleTrxList(){
        UTILS.trxDetailRef.current = false; // 초기화
        navigation.goBack();
    }

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

            <InputModal
                visible={inputVisible}
                onCancel={() => setInputVisible(false)}
                onConfirm={(phoneNumber) => {
                    setInputVisible(false);   // 모달 닫고
                    receiptBtn(phoneNumber);        // SMS 열기
                }}
            />

            <SafeAreaView style={[styles.safeContainer,{paddingTop:insets.top}]}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.hashTitle}>#{UTILS.convertMethod(item.method)}</Text>

                        <View style={styles.nickAndCloseRow}>
                            <Text style={styles.mchtName}>{global.E2U?.nick}</Text>
                            <TouchableOpacity onPress={() => {
                                UTILS.trxDetailRef.current = true;
                                navigation.goBack();
                            }}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.thickDivider} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.row}>
                            <Text style={styles.label}>거래시각</Text>
                            <Text style={styles.value}>{moment(item.regDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>상품명</Text>
                            <Text style={styles.value}>{item.productName}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>거래구분</Text>
                            <Text style={styles.value}>{UTILS.convertMethod(item.method)} (체크)</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>거래유형</Text>
                            <Text style={styles.value}>{item.trxType === 'authorized' ? "승인" : "승인취소"}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>거래번호</Text>
                            <Text style={styles.value}>{item.trxId}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>승인번호</Text>
                            <Text style={styles.value}>{item.authCd}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>거래금액</Text>
                            <Text style={styles.amount}>
                                {UTILS.KRW(item.amount)}
                            </Text>
                        </View>

                        <View style={styles.lightDivider} />

                        <View style={styles.row}>
                            <Text style={styles.label}>카드정보</Text>
                            <Text style={styles.value}>{item.issuer}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>카드번호</Text>
                            <Text style={styles.value}>{item.bin ? `${UTILS.convertBin(item.bin)}-****-${item.last4}` : ''}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>할부개월</Text>
                            <Text style={styles.value}>{item.installment ? item.installment === '00' ? '일시불' : `${item.installment} 개월` : ''} </Text>
                        </View>

                        <View style={styles.lightDivider} />
                        <View style={styles.row}>
                            <Text style={styles.label}>사용처</Text>
                            <Text style={styles.value}>{global.E2U?.nick}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>주소</Text>
                            <Text style={styles.value}
                                  numberOfLines={2} ellipsizeMode="tail">
                                  {item.receipt ? `${item.receipt.rctAddr1  + ' ' + item.receipt.rctAddr2}` : ''}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>전화번호</Text>
                            <Text style={styles.value}>{item.receipt ? `${item.receipt.rctTelNo}` : ''}</Text>
                        </View>
                        <View style={styles.lightDivider} />
                        <View style={styles.row}>
                            <Text style={styles.label}>서비스사</Text>
                            <Text style={styles.value}>{companyName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>주소</Text>
                            <Text style={styles.value}
                                  numberOfLines={2}
                                  ellipsizeMode="tail"> {companyAddr}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>전화번호</Text>
                            <Text style={styles.value}>{companyTelNo}</Text>
                        </View>


                    <View style={[styles.footer, {top: screenHeight-(screenHeight-insets.bottom)}]}>
                        <View style={styles.actionRow}>
                            {item.trxType === 'authorized' && item.rfdId === '' && (
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.refundButton]}
                                    onPress={() => refundBtn()}
                                >
                                    <Text style={styles.actionButtonText}>취소 요청</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity style={[styles.actionButton, styles.receiptButton]} onPress={() => setInputVisible(true)}>
                                <Text style={styles.actionButtonText}>전표 전송</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                UTILS.trxDetailRef.current = true;
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.buttonText}>확 인</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>


            </SafeAreaView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
        </>
    );
};

export default TrxDetailScreen;
