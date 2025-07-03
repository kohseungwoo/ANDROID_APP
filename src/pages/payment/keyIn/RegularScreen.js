import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../../assets/styles/RegularStyle';
import NointModal from '../../../components/modal/NointModal';
import DropDownPicker from 'react-native-dropdown-picker';
import DefaultModal from '../../../components/modal/DefaultModal';
import {Logout} from '../../../components/Logout';
import {useNavigation} from '@react-navigation/native';
import ConfirmOkModal from '../../../components/modal/ConfirmOkModal';
import UTILS, {trxDetailRef} from '../../../utils/Utils';
import OpenStoreLink from '../../../components/OpenStoreLink';
import UpdateInfoModal from '../../../components/modal/UpdateInfoModal';
import {fetchWithTimeout} from '../../../components/Fetch';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegularScreen = ({ formData, setFormData }) => {
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [validVisible, setValidVisible] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');
    const insets = useSafeAreaInsets();

    const [message, setMessage] = useState('');
    const [validMessage, setValidMessage] = useState('');
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [openLinkVisible, setOpenLinkVisible] = useState(false);

    const [nointText, setNointMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const cardPersRef1 = useRef(null);
    const cardPersRef2 = useRef(null);
    const cardPersRef3 = useRef(null);
    const cardPersRef4 = useRef(null);

    const cardCorpRef1 = useRef(null);
    const cardCorpRef2 = useRef(null);
    const cardCorpRef3 = useRef(null);
    const cardCorpRef4 = useRef(null);

    const expiryPersRef = useRef(null);
    const expiryCorpRef = useRef(null);
    const pwdPersRef = useRef(null);
    const pwdCorpRef = useRef(null);
    const dobRef = useRef(null);
    const brnRef = useRef(null);
    const [installment, setInstallment] = useState([]);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (formData?.installment) {
            const rawNumbers = formData.installment
                .split(':')
                .map(val => parseInt(val, 10))
                .filter(num => !isNaN(num));

            // '00' 또는 '01'이 있으면 일시불(0) 하나만 포함
            const hasSinglePayment = rawNumbers.includes(0) || rawNumbers.includes(1);

            const uniqueNumbers = Array.from(
                new Set(
                    rawNumbers
                        .filter(num => num > 1) // 일시불 제외
                        .concat(hasSinglePayment ? [0] : []) // 일시불은 하나만
                )
            ).sort((a, b) => a - b); // 오름차순 정렬

            const parsedItems = uniqueNumbers.map(num => ({
                label: num === 0 ? '일시불' : `${String(num).padStart(2, '0')}개월`,
                value: num,
            }));

            setInstallment(parsedItems);
        }
    }, [formData?.installment]);

    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

    const getInstallment = async () => {
        setLoading(true);
        setNointMessage('카드사 무이자 할부안내 정보 조회에 실패하였습니다. '); // 초기화

        try{
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/noint/latest`, {
                method: 'GET',
                headers: {
                    'VERSION'  : global.E2U?.APP_VERSION,
                },
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`무이자 조회 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code) {
                if (result.code === '0805' || result.code === '0803' ) {
                    setModalMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                    setModalCallback(() => handleExit);
                    setModalVisible(true);
                }else if (result.code === '0802'){
                    setOpenLinkVisible(true);
                }else{
                    setNointMessage(`${result.description}`);
                    setAlertVisible(true);
                }
            }else{ // 성공의 경우 code 값을 주지 않음
                setNointMessage(result);
                setAlertVisible(true);
            }
        }catch(err){
            global.E2U?.WARN(`무이자 조회 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setNointMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setNointMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setNointMessage('카드사 무이자 할부안내 조회에 실패했습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }finally {
            setLoading(false);
        }
    };

    const paymentBtn = async () => {
        // formData.personalCardNumber1 = '9490';
        // formData.personalCardNumber2 = '9402';
        // formData.personalCardNumber3 = '1292';
        // formData.personalCardNumber4 = '9009';
        // formData.personalExpiry = '2905';
        // formData.personalPassword = '00';
        // formData.dob = '950101';

        const { cardType, personalCardNumber1, personalCardNumber2, personalCardNumber3, personalCardNumber4, personalInstallment ,personalExpiry ,personalPassword ,dob
            ,corpCardNumber1 ,corpCardNumber2 ,corpCardNumber3 ,corpCardNumber4 ,corpInstallment ,corpExpiry ,corpPassword ,brn } = formData;

        let cardNumber, expiry, installment, pin, auth;
        if(cardType === 'personal'){
           if (!personalCardNumber1 || !personalCardNumber2 || !personalCardNumber3 || !personalCardNumber4) {
               setValidMessage('카드번호를 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

           if (!personalInstallment) {
               formData.personalInstallment = 0;
           }

           if (!personalExpiry) {
               setValidMessage('유효기간을 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

           if (!personalPassword) {
               setValidMessage('비밀번호를 올바르게 입력해주세요..');
               setValidVisible(true);
               return;
           }

           if (!dob) {
               setValidMessage('본인확인 번호를 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

            cardNumber  = personalCardNumber1 + personalCardNumber2 + personalCardNumber3 + personalCardNumber4;
            expiry      = personalExpiry;
            installment = personalInstallment;
            pin      = personalPassword;
            auth        = dob;
        }else if(cardType === 'corporate'){
           if (!corpCardNumber1 || !corpCardNumber2 || !corpCardNumber3 || !corpCardNumber4) {
               setValidMessage('카드번호를 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

           if (!corpInstallment) {
               formData.corpInstallment = 0;
           }

           if (!corpExpiry) {
               setValidMessage('유효기간을 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

           if (!corpPassword) {
               setValidMessage('비밀번호를 올바르게 입력해주세요..');
               setValidVisible(true);
               return;
           }

           if (!brn) {
               setValidMessage('본인확인 번호를 올바르게 입력해주세요.');
               setValidVisible(true);
               return;
           }

            cardNumber  = corpCardNumber1 + corpCardNumber2 + corpCardNumber3 + corpCardNumber4;
            expiry      = corpExpiry;
            installment = corpInstallment;
            pin      = corpPassword;
            auth        = brn;
       }else{
           setValidMessage('정의되지 않은 입력이 확인되었습니다.');
           setValidVisible(true);
           return;
       }


        try{
            setLoading(true);
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/api/pay`, {
                method: 'POST',
                headers: {
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                },
                body: JSON.stringify({
                    amount        : formData.amount,
                    method        : 'card',
                    type          : 'regular',
                    number        : cardNumber,
                    expiry        : expiry,
                    installment   : installment,
                    pin           : pin,
                    dob           : auth,
                    memberId      : '',
                    cardType      : formData.cardType,
                    customerName  : formData.buyerName,
                    email         : '',
                    phoneNo       : formData.phoneNo,
                    productName   : formData.productName,
                    qty           : 1,
                    price         : formData.amount,
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`결제 API 응답 \n ${JSON.stringify(result)}`);
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
                } else{
                    setValidMessage(`${result.description}`);
                    setValidVisible(true);
                    setDefaultMessage(false);
                }
            }
        }catch(err){
            global.E2U?.WARN(`결제 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage('결제 API 호출에 실패하였습니다.');
                setValidVisible(true);
                setDefaultMessage(true);
            }

        }finally{
            setLoading(false);
        }
    };

    const resetCardForm = () => {
        setOpen(false);
        setFormData(prev => ({
            ...prev,
            personalCardNumber1: '',
            personalCardNumber2: '',
            personalCardNumber3: '',
            personalCardNumber4: '',
            personalInstallment: null,
            personalExpiry: '',
            personalPassword: '',
            dob: '',
            corpCardNumber1: '',
            corpCardNumber2: '',
            corpCardNumber3: '',
            corpCardNumber4: '',
            corpInstallment: null,
            corpExpiry: '',
            corpPassword: '',
            brn: '',
        }));
    };

    async function handleExit(){
        await Logout(navigation);
    }

    function handleTrxList(){
        trxDetailRef.current = false; // 초기화
        navigation.reset({
            index: 0,
            routes: [{ name: 'TRXLIST' }],
        });
    }

    return (
        <>
            <NointModal
                visible={alertVisible}
                message={nointText}
                onConfirm={() => setAlertVisible(false)}
            />

            <DefaultModal
                visible={validVisible}
                message={validMessage}
                onConfirm={() => setValidVisible(false)}
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

            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                enableOnAndroid={true} // Android에서 스크롤 처리 허용
                enableAutomaticScroll={true} // 포커스 시 자동 스크롤
                ref={scrollRef}
                extraScrollHeight={80}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="card-outline" size={24} color="#2680eb" style={{ marginTop:14, marginRight: 6 }} />
                        <Text style={styles.title}>카드정보</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={getInstallment} disabled={loading} >
                        <Text style={styles.buttonText}>카드사 무이자 할부안내</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />

                {/* 카드정보 입력 필드들 */}
                <View style={styles.inputGroup}>
                    <View style={styles.row}>
                        <Text style={[styles.label, styles.buttonGroup]}>카드번호</Text>
                        <View style={[styles.buttonGroup]}>
                            <TouchableOpacity
                                style={[styles.toggleBtn, formData.cardType === 'personal' && styles.activeBtn]}
                                onPress={() => {
                                    resetCardForm();
                                    setFormData(prev => ({
                                        ...prev,
                                        cardType: 'personal',
                                    }));
                                }}
                            >
                                <Text style={formData.cardType === 'personal' && styles.activeBtnText}>개인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleBtn, formData.cardType === 'corporate' && styles.activeBtn]}
                                onPress={() => {
                                    resetCardForm();
                                    setFormData(prev => ({
                                        ...prev,
                                        cardType: 'corporate',
                                    }));
                                }}
                            >
                                <Text style={formData.cardType === 'corporate' && styles.activeBtnText}>법인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 개인 카드 */}
                    {formData.cardType === 'personal' && (
                        <>
                            <View style={styles.cardNumberRow}>
                                <TextInput
                                    ref={cardPersRef1}
                                    style={styles.cardInput}
                                    maxLength={4}
                                    value={formData.personalCardNumber1}
                                    onChangeText={(text) => {
                                        const number = UTILS.onlyNumber(text);
                                        setFormData({ ...formData, personalCardNumber1: number });
                                        if (number.length === 4) {
                                            cardPersRef2.current?.focus();
                                        }
                                    }}
                                />
                                <TextInput ref={cardPersRef2}
                                           style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           value={formData.personalCardNumber2}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, personalCardNumber2: number });
                                               if (number.length === 4) {
                                                   cardPersRef3.current?.focus();
                                               }
                                           }}
                                />
                                <TextInput ref={cardPersRef3}
                                           style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           value={formData.personalCardNumber3}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, personalCardNumber3: number });
                                               if (number.length === 4) {
                                                   cardPersRef4.current?.focus();
                                               }
                                           }}
                                />
                                <TextInput ref={cardPersRef4}
                                           style={styles.cardInput}
                                           maxLength={4}
                                           value={formData.personalCardNumber4}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, personalCardNumber4: number });
                                               if (number.length === 4) {
                                                   expiryPersRef.current?.focus();
                                               }
                                           }}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            {/*<View style={styles.installmentInput}>*/}
                                <DropDownPicker
                                    open={open}
                                    value={formData.personalInstallment}
                                    items={installment}
                                    setOpen={setOpen}
                                    setItems={setInstallment}
                                    setValue={(callback) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            personalInstallment: callback(prev.personalInstallment),
                                        }))
                                    }
                                    placeholder="일시불"
                                    listMode="SCROLLVIEW"
                                    style={styles.input}
                                    itemSeparator={true}
                                    itemSeparatorStyle={{
                                        backgroundColor: '#ccc',
                                        height: 0.4,
                                    }}
                                    placeholderStyle={{
                                        color: '#808080', // Placeholder 색상
                                        fontSize: 16,
                                    }}
                                    labelStyle={{
                                        color: '#000', // 항목(label)의 색상
                                        fontSize: 16,
                                    }}
                                    selectedItemLabelStyle={{
                                        color: '#000', // 선택된 항목의 텍스트 색상
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                    }}
                                    dropDownContainerStyle={{
                                        paddingHorizontal: 3,
                                        borderColor: '#ccc',  // 드롭다운 목록의 테두리 색상
                                        borderWidth: 0.5,          // 드롭다운 목록의 테두리 두께
                                        borderRadius: 0,        // 드롭다운 목록의 둥근 테두리
                                        backgroundColor:'#fafafa'
                                    }}
                                />
                            {/*</View>*/}

                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput
                                        ref={expiryPersRef}
                                        style={styles.input}
                                        placeholder="MM/YY"
                                        maxLength={4}
                                        value={formData.personalExpiry}
                                        onChangeText={(text) => {
                                            const number = UTILS.onlyNumber(text);
                                            setFormData({ ...formData, personalExpiry: number });
                                            if (number.length === 4) {
                                                pwdPersRef.current?.focus();
                                            }
                                        }}
                                    />
                                </View>

                                {formData.authType === 'CEPB' && (
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.label, { marginLeft: 20 }]}>비밀번호 2앞 2자리</Text>
                                        <TextInput
                                            ref={pwdPersRef}
                                            style={[styles.input, { marginLeft: 20 }]}
                                            secureTextEntry
                                            placeholder="* *"
                                            maxLength={2}
                                            value={formData.personalPassword}
                                            onChangeText={(text) => {
                                                const number = UTILS.onlyNumber(text);
                                                setFormData({ ...formData, personalPassword: number });
                                                if (number.length === 2) {
                                                    setTimeout(() => {
                                                        scrollRef.current?.scrollToFocusedInput(dobRef.current, 200);
                                                        dobRef.current?.focus();
                                                    }, 100);
                                                }
                                            }}
                                        />
                                    </View>
                                )}
                            </View>

                            {formData.authType === 'CEPB' && (
                                <>
                                    <Text style={[styles.label, { paddingTop: 10 }]}>본인확인</Text>
                                    <TextInput
                                        ref={dobRef}
                                        style={styles.input}
                                        placeholder="주민번호 앞 6자리"
                                        maxLength={6}
                                        value={formData.dob}
                                        onChangeText={(text) =>
                                            setFormData({ ...formData, dob: UTILS.onlyNumber(text) })
                                        }
                                    />
                                </>
                            )}

                            {/*<View style={{paddingLeft:5, paddingTop:2}}>*/}
                            {/*    <Text style={{color:'#808080'}}>* 개인 : 주민번호 앞 6자리</Text>*/}
                            {/*    <Text style={{color:'#808080'}}>* 법인 : 사업자번호 10자리</Text>*/}
                            {/*</View>*/}
                        </>
                    )}

                    {/* 법인 카드 */}
                    {formData.cardType === 'corporate' && (
                        <>
                            {/* 카드번호 4칸 */}
                            <View style={styles.cardNumberRow}>
                                <TextInput ref={cardCorpRef1}
                                           style={styles.cardInput}
                                           maxLength={4}
                                           value ={formData.corpCardNumber1}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, corpCardNumber1: number });
                                               if (number.length === 4) {
                                                   cardCorpRef2.current?.focus();
                                               }
                                           }}
                                />

                                <TextInput ref={cardCorpRef2}
                                           style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           value ={formData.corpCardNumber2}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, corpCardNumber2: number });
                                               if (number.length === 4) {
                                                   cardCorpRef3.current?.focus();
                                               }
                                           }}
                                />

                                <TextInput ref={cardCorpRef3}
                                           style={[styles.cardInput, { backgroundColor: '#fafafa' }]}
                                           maxLength={4}
                                           secureTextEntry
                                           value ={formData.corpCardNumber3}
                                           onChangeText={(text) => {
                                               const number = UTILS.onlyNumber(text);
                                               setFormData({ ...formData, corpCardNumber3: number });
                                               if (number.length === 4) {
                                                   cardCorpRef4.current?.focus();
                                               }
                                           }}
                                />

                                <TextInput ref={cardCorpRef4}
                                           style={styles.cardInput}
                                           maxLength={4}
                                           value ={formData.corpCardNumber4}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber4: UTILS.onlyNumber(text),
                                               });
                                           }}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            {/*<View style={styles.installmentInput}>*/}
                                <DropDownPicker
                                    open={open}
                                    value={formData.corpInstallment}
                                    items={installment}
                                    setOpen={setOpen}
                                    setItems={setInstallment}
                                    setValue={(callback) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            corpInstallment: callback(prev.corpInstallment),
                                        }))
                                    }
                                    placeholder="일시불"
                                    listMode="SCROLLVIEW"
                                    style={styles.input}
                                    itemSeparator={true}
                                    itemSeparatorStyle={{
                                        backgroundColor: '#ccc',
                                        height: 0.4,
                                    }}
                                    placeholderStyle={{
                                        color: '#808080', // Placeholder 색상
                                        fontSize: 16,
                                    }}
                                    labelStyle={{
                                        color: '#000', // 항목(label)의 색상
                                        fontSize: 16,
                                    }}
                                    selectedItemLabelStyle={{
                                        color: '#000', // 선택된 항목의 텍스트 색상
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                    }}
                                    dropDownContainerStyle={{
                                        paddingHorizontal: 3,
                                        borderColor: '#ccc',  // 드롭다운 목록의 테두리 색상
                                        borderWidth: 0.5,          // 드롭다운 목록의 테두리 두께
                                        borderRadius: 0,        // 드롭다운 목록의 둥근 테두리
                                        backgroundColor:'#fafafa'
                                    }}

                                />
                            {/*</View>*/}


                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput ref={expiryCorpRef}
                                               style={styles.input}
                                               placeholder="MM/YY"
                                               maxLength={4}
                                               value={formData.corpExpiry}
                                               onChangeText={(text) => {
                                                   const number = UTILS.onlyNumber(text);
                                                   setFormData({ ...formData, corpExpiry: number });
                                                   if (number.length === 4) {
                                                       pwdCorpRef.current?.focus();
                                                   }
                                               }}
                                    />
                                </View>

                                {formData.authType === 'CEPB' && (
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                        <TextInput ref={pwdCorpRef}
                                                   style={[styles.input, {marginLeft:20}]}
                                                   secureTextEntry
                                                   placeholder="* *"
                                                   maxLength={2}
                                                   value={formData.corpPassword}
                                                   onChangeText={(text) => {
                                                       const number = UTILS.onlyNumber(text);
                                                       setFormData({ ...formData, corpPassword: number });
                                                       if (number.length === 2) {
                                                           setTimeout(() => {
                                                               scrollRef.current?.scrollToFocusedInput(brnRef.current, 200);
                                                               brnRef.current?.focus();
                                                           }, 100);
                                                       }
                                                   }}
                                        />
                                    </View>
                                )}
                            </View>


                            {formData.authType === 'CEPB' && (
                                <>
                                    <Text style={[styles.label,{paddingTop:10}]}>본인확인</Text>
                                    <TextInput ref={brnRef}
                                               style={styles.input}
                                               placeholder="사업자번호 10자리"
                                               maxLength={10}
                                               value={formData.brn}
                                               onChangeText={(text) => setFormData({
                                                   ...formData,
                                                   brn: UTILS.onlyNumber(text),
                                               })
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}
                </View>

                <View style={{paddingTop: insets.bottom === 0 ? 70 : insets.bottom}}>
                    <View style={[styles.footerContainer, {top : screenHeight-(screenHeight-insets.bottom)}]}>
                        <TouchableOpacity style={styles.fullWidthTouchable} onPress={paymentBtn}>
                            <Text style={styles.footerButton}>결제하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
        </>
    );
};

export default RegularScreen;
