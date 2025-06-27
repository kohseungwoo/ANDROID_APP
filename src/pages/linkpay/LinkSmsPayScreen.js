import {ActivityIndicator, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/styles/ProductStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from 'react';
import UTILS from '../../utils/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchWithTimeout} from '../../components/Fetch';
import {Logout} from '../../components/Logout';
import {useNavigation} from '@react-navigation/native';

const LinkSmsPayScreen = ({ formData, setFormData }) => {
    const navigation = useNavigation();

    const insets = useSafeAreaInsets();
    const {height: screenHeight } = Dimensions.get('window');

    const [selectedMethod, setSelectedMethod] = useState('');
    const [displayMethodOpen, setDisplayMethodOpen] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCallback, setModalCallback] = useState(() => () => {});
    const [openLinkVisible, setOpenLinkVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [nointText, setNointMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const [displayMethod, setDisplayMethod] = useState([
        { label: '신용카드(수기)', value: 'card_dom' },
        { label: '신용카드(인증)', value: 'card_3d' },
    ]);

    async function handleExit(){
        await Logout(navigation);
    }

    const confirmBtn = async () => {
        setLoading(true);
        try{
            const response = await fetchWithTimeout(`${global.E2U?.API_URL}/v2/api/link/add`, {
                method: 'POST',
                headers: {
                    'Authorization': global.E2U?.key,
                    'VERSION'  : global.E2U?.APP_VERSION,
                    'Content-Type' : global.E2U?.CONTENT_TYPE_JSON,
                },
                body: JSON.stringify({
                    addType       : 'card',
                    displayMethod : [],
                    trackId      : 'random',
                    // amount        : formData.amount,
                    // phoneNo       : formData.phoneNo,
                    // productName   : formData.productName,
                    // customerName  : formData.buyerName,
                    // qty           : 1,
                    // price         : formData.amount,
                }),
            }, global.E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            global.E2U?.INFO(`링크 생성 API 응답 \n ${JSON.stringify(result)}`);


            if (result) {
                if (result.code === '0805' || result.code === '0803' ) {
                    setModalMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                    setModalCallback(() => handleExit);
                    setModalVisible(true);
                }else if (result.code === '0802' ) {
                    setOpenLinkVisible(true);
                }else{
                    setNointMessage(result);
                    setAlertVisible(true);
                }
            }else{
                setNointMessage('링크 생성에 실패했습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }catch(err){
            global.E2U?.WARN(`링크 생성 API 요청 실패 \n ${err}`);

            if (err.message === 'Request timed out') {
                setNointMessage('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setNointMessage('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setNointMessage('링크 생성 요청에 실패했습니다.');
                setAlertVisible(true);
                setDefaultMessage(true);
            }
        }finally {
            setLoading(false);
        }
    };


    return (
        <>
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                enableOnAndroid={true} // Android에서 스크롤 처리 허용
                enableAutomaticScroll={true} // 포커스 시 자동 스크롤
                extraScrollHeight={80}
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
                        />

                    </View>

                    <View style={{paddingTop: insets.bottom === 0 ? 70 : insets.bottom}}>
                        <View style={[styles.footerContainer, {top : screenHeight-(screenHeight-insets.bottom)}]}>
                            <TouchableOpacity style={styles.fullWidthTouchable} onPress={confirmBtn}>
                                <Text style={styles.footerButton}>링크 생성</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
        </>
    );
};

export default LinkSmsPayScreen;
