import {
    ActivityIndicator,
    Dimensions, KeyboardAvoidingView,
    Linking,
    Platform,
    SafeAreaView, ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../../assets/styles/ProductStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useRef, useState} from 'react';
import UTILS from '../../utils/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchWithTimeout} from '../../components/Fetch';
import {Logout} from '../../components/Logout';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import ErrorModal from '../../components/modal/DefaultModal';
import ConfirmOkModal from '../../components/modal/ConfirmOkModal';
import InputModal from '../../components/modal/inputModal';
import InputQrModal from '../../components/modal/inputQrModal';

const LinkQrPayScreen = ({ formData, setFormData }) => {
    const navigation = useNavigation();

    const insets = useSafeAreaInsets();
    const {height: screenHeight } = Dimensions.get('window');

    const [selectedMethod, setSelectedMethod] = useState('');
    const [displayMethodOpen, setDisplayMethodOpen] = useState(false);
    const [expireAtOpen, setExpireAtOpen] = useState(false);

    const [message, setMessage] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [openLinkVisible, setOpenLinkVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef(null);

    const [displayMethod, setDisplayMethod] = useState([
        { label: '신용카드(수기)', value: 'card_dom' },
        { label: '신용카드(인증)', value: 'card_3d' },
    ]);

    const [expireAt, setExpireAt] = useState([
        { label: 'D+1', value: '1' },
        { label: 'D+2', value: '2' },
        { label: 'D+3', value: '3' },
        { label: 'D+4', value: '4' },
        { label: 'D+5', value: '5' },
        { label: 'D+6', value: '6' },
        { label: 'D+7', value: '7' },
    ]);

    async function handleExit(){
        await Logout(navigation);
    }

    const confirmBtn = async () => {
        try{
            setLoading(true);

            const { selectedMethod, selectedExpireAt } = formData;
            if (!selectedMethod) {
                setMessage('결제수단을 입력해주세요.');
                setAlertVisible(true);
                return;
            }

            if (!selectedExpireAt) {
                setMessage('링크 만료 일자를 입력해주세요.');
                setAlertVisible(true);
                return;
            }

            const customer = {
                name     : formData.buyerName,
                email    : '',
                phoneNo  : formData.phoneNo,
            };
            const products = [{
                name     : formData.productName,
                qty      : 1,
                price    : formData.amount,
            }];

            const daysToAdd = parseInt(formData.selectedExpireAt, 10);
            const expireAt = dayjs().add(daysToAdd, 'day').set('hour', 23).set('minute', 59).set('second', 59);

            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/api/link/add`, {
                method: 'POST',
                headers: {
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                },
                body: JSON.stringify({
                    addType         : 'qr',
                    directMethod    : formData.selectedMethod,
                    displayMethod   : [],
                    amount          : formData.amount,
                    expireAt        : expireAt.format('YYYYMMDDHH'),
                    products        : products,
                    customer        : customer,
                    sellerMemo1     : formData.sellerMemo1,
                    sellerMemo2     : formData.sellerMemo2,
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`링크 QR 생성 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                formData.linkUrl = result.data.link;
                setQrModalVisible(true);
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
        }catch(err){
            global.E2U?.INFO(`링크 생성 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setMessage('링크 QR 생성 요청에 실패했습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }finally {
            setLoading(false);
        }
    };

    const receiptBtn = (phoneNumber)=> {
        const msg = `${formData.linkUrl}`;
        if (!msg) {
            setMessage('전송할 링크가 없습니다.');
            setAlertVisible(true);
            return;
        }

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
            global.E2U?.INFO(`SMS 연결 실패 \n ${err}`,
                setInputVisible(false),
                setMessage(`전표 전송에 실패하였습니다.`),
                setDefaultMessage(true),
            ));
    };


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

            <InputQrModal
                visible={qrModalVisible}
                qrLink = {formData.linkUrl}
                onCancel={() => setQrModalVisible(false)}
                onConfirm={(phoneNumber) => {
                    setQrModalVisible(false);   // 모달 닫고
                }}
            />

            <InputModal
                visible={inputVisible}
                onCancel={() => setInputVisible(false)}
                onConfirm={(phoneNumber) => {
                    setInputVisible(false);   // 모달 닫고
                    receiptBtn(phoneNumber);        // SMS 열기
                }}
            />


            <KeyboardAvoidingView
                style={styles.container}
                behavior={'padding'}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                <SafeAreaView style={{width: '100%'}}>
                    <View style={styles.header}>
                        <Ionicons name="cart-outline" size={24} color="#2680eb" style={{ marginTop:14, marginRight: 6 }} />
                        <Text style={styles.title}>결제정보</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>결제수단</Text>
                        <DropDownPicker
                            open={displayMethodOpen}
                            value={formData.selectedMethod}
                            items={displayMethod}
                            setOpen={setDisplayMethodOpen}
                            setItems={setDisplayMethod}
                            setValue={(callback) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    selectedMethod: callback(prev.selectedMethod),
                                }))
                            }
                            placeholder="-"
                            listMode="SCROLLVIEW"
                            style={styles.input}
                            zIndex={3000}
                            zIndexInverse={1000}
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

                        <Text style={styles.label}>링크 만료 일자</Text>
                        <DropDownPicker
                            open={expireAtOpen}
                            value={formData.selectedExpireAt}
                            items={expireAt}
                            setOpen={setExpireAtOpen}
                            setItems={setExpireAt}
                            setValue={(callback) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    selectedExpireAt: callback(prev.selectedExpireAt),
                                }))
                            }
                            placeholder="-"
                            listMode="SCROLLVIEW"
                            style={styles.input}
                            zIndex={2000}
                            zIndexInverse={2000}
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

                        <Text style={styles.label}>상품 설명</Text>
                        <TextInput style={styles.input}
                                   placeholder=""
                                   maxLength={200}
                                   value={formData.sellerMemo1}
                                   onChangeText={(text) => {
                                       // 입력 중엔 필터링 하지 않음
                                       setFormData({
                                           ...formData,
                                           sellerMemo1: text,
                                       });
                                   }}
                                   onEndEditing={(e) => {
                                       // 입력이 끝났을 때만 필터 적용
                                       setFormData({
                                           ...formData,
                                           sellerMemo1: UTILS.removeSpecial(e.nativeEvent.text),
                                       });
                                   }}

                                   onFocus={() => {
                                       scrollViewRef.current?.scrollTo({ y: 120, animated: true });
                                   }}
                        />

                        <Text style={styles.label}>판매자 메모</Text>
                        <TextInput style={styles.input}
                                   placeholder=""
                                   maxLength={200}
                                   value={formData.sellerMemo2}
                                   onChangeText={(text) => {
                                       // 입력 중엔 필터링 하지 않음
                                       setFormData({
                                           ...formData,
                                           sellerMemo2: text,
                                       });
                                   }}
                                   onEndEditing={(e) => {
                                       // 입력이 끝났을 때만 필터 적용
                                       setFormData({
                                           ...formData,
                                           sellerMemo2: UTILS.removeSpecial(e.nativeEvent.text),
                                       });
                                   }}

                                   onFocus={() => {
                                       scrollViewRef.current?.scrollTo({ y: 160, animated: true });
                                   }}
                        />
                    </View>

                    <View style={{paddingTop: insets.bottom === 0 ? 70 : insets.bottom}}>
                        <View style={[styles.footerContainer, {top : screenHeight-(screenHeight-insets.bottom)}]}>
                            <TouchableOpacity style={styles.fullWidthTouchable} onPress={confirmBtn}>
                                <Text style={styles.footerButton}>QR 생성</Text>
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

export default LinkQrPayScreen;
