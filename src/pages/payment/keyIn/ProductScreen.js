import React, {useCallback, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../../../assets/styles/ProductStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorModal from '../../../components/modal/DefaultModal';
import refreshHooks from '../../../components/hooks/RefreshHooks';
import UTILS from '../../../utils/Utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {moveScreen} from '../../../components/hooks/ScreenHooks';
import ConfirmOkModal from '../../../components/modal/ConfirmOkModal';
import {fetchWithTimeout} from '../../../components/Fetch';
import {Logout} from '../../../components/Logout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProductScreen = ({ formData, setFormData, onNext }) => {
    const navigation = useNavigation();
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [modalVisible, setModalVisible] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(() => () => {});
    const [loading, setLoading] = useState(false);
    const {height: screenHeight } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const [alertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [defaultMessage, setDefaultMessage] = useState(false);

    const scrollViewRef = useRef(null);
    const footerRef = useRef(null);



    useFocusEffect(
        useCallback(() => {
            if(!global.E2U?.method?.card?.includes("regular")){
                global.E2U?.INFO(global.E2U?.method?.card);
                setModalMessage(`카드 결제 서비스 '이용 불가' 가맹점 입니다. \n 메인으로 이동합니다.`);
                setModalCallback(() => () => {
                    moveScreen(navigation, "MAIN");
                });
                setModalVisible(true);
            }
        }, [])
    );

    async function handleExit(){
        await Logout(navigation);
    }

    const confirmBtn = async () =>{
        // formData.cardType = 'personal'; // 고정
        // formData.productName = formData.productName || 'test';
        // formData.amount = formData.amount || '51004';
        // formData.buyerName = formData.buyerName || '홍길동';
        // formData.phoneNo = formData.phoneNo || '01000000000';

        const { productName, amount, buyerName, phoneNo } = formData;
        if (!productName) {
            setMessage('상품명을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        if (!amount || Number(amount) === 0) {
            setMessage('결제금액을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        // if (!buyerName) {
        //     setMessage('구매자명을 올바르게 입력해주세요.');
        //     setAlertVisible(true);
        //     return;
        // }
        //
        // if (!phoneNo) {
        //     setMessage('구매자 연락처를 올바르게 입력해주세요.');
        //     setAlertVisible(true);
        //     return;
        // }

        try{
            setLoading(true);
            if(!formData.authType){
                const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/trx/method/card`, {
                    method: 'GET',
                    headers: {
                        'Authorization': global.E2U?.key,
                        'VERSION'  : global.E2U?.APP_VERSION,
                    },
                }, global.E2U?.NETWORK_TIMEOUT);

                const result = await response.json();
                global.E2U?.INFO(`카드 결제 정보 조회 API 응답 \n ${JSON.stringify(result)}`);

                if (result.code === '0000') {
                    if(!result.data?.status){
                        setModalMessage(`카드 결제 서비스 '이용 불가 상태' 가맹점 입니다. \n 메인으로 이동합니다.`);
                        setModalCallback(() => () => {
                            moveScreen(navigation, "MAIN")
                        });
                        setModalVisible(true);
                    }else{
                        // DB 데이터 할당
                        formData.authType = result.data?.authType || "CE";
                        formData.installment = result.data?.installment;
                    }
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
                    }
                }
            }
        }catch(err){
            global.E2U?.INFO(`카드 결제 정보 조회 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage('카드 결제 정보 조회 호출에 실패하였습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }finally {
            setLoading(false);
            onNext();
        }
    };

    const resetForm = () => {
        setFormData({
            productName: '',
            amount: '',
            buyerName: '',
            phoneNo: '',
            udf1: '',
            cardType: 'personal',
        });
    };

    const { refreshing, onRefresh } = refreshHooks(() => {
        resetForm();
    });

    return (
        <>
            <ErrorModal
                visible={alertVisible}
                message={message}
                onConfirm={() => setAlertVisible(false)}
            />

            <ConfirmOkModal
                visible={modalVisible}
                onConfirm={() => {
                    modalCallback();
                    setModalVisible(false);
                }}
                message={modalMessage}
            />


            <KeyboardAvoidingView
                style={styles.container}
                behavior={'padding'}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <SafeAreaView style={{ width: '100%' }}>
                        <View style={styles.header}>
                            <Ionicons name="cart-outline" size={24} color="#2680eb" style={{ marginTop: 14, marginRight: 6 }} />
                            <Text style={styles.title}>결제정보</Text>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>상품명</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="상품명을 입력하세요."
                                maxLength={64}
                                value={formData.productName}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, productName: text });
                                }}
                                onEndEditing={(e) => {
                                    setFormData({ ...formData, productName: UTILS.removeSpecial(e.nativeEvent.text) });
                                }}
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                                }}
                            />

                            <Text style={styles.label}>결제금액</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0"
                                maxLength={13}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                value={formData.amount}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, amount: UTILS.comma(text) });
                                }}
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({ y: 40, animated: true });
                                }}
                            />

                            <Text style={styles.label}>구매자명</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="구매자명을 입력하세요."
                                maxLength={12}
                                value={formData.buyerName}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, buyerName: text });
                                }}
                                onEndEditing={(e) => {
                                    setFormData({ ...formData, buyerName: UTILS.removeSpecial(e.nativeEvent.text) });
                                }}
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({ y: 120, animated: true });
                                }}
                            />

                            <Text style={styles.label}>구매자 연락처</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="'-' 없이 입력하세요."
                                maxLength={16}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                value={formData.phoneNo}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, phoneNo: UTILS.onlyNumber(text) });
                                }}
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({ y: 150, animated: true });
                                }}
                            />
                        </View>

                        <View style={{ paddingTop: insets.bottom === 0 ? 70 : insets.bottom }} ref={footerRef}>
                            <View style={[styles.footerContainer, { top: screenHeight - (screenHeight - insets.bottom) }]}>
                                <TouchableOpacity style={styles.fullWidthTouchable} onPress={confirmBtn}>
                                    <Text style={styles.footerButton}>다음</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
        </>
    );
};

export default ProductScreen;
