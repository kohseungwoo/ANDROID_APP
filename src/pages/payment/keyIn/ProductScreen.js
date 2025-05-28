import React, {useState} from 'react';
import {
  Dimensions, KeyboardAvoidingView, Platform,
  RefreshControl,
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

const ProductScreen = ({ formData, setFormData, onNext }) => {
    const { height: screenHeight } = Dimensions.get('window');
    const [alertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState('');

    const confirmBtn = () =>{
        // formData.cardType = 'personal'; // 고정
        // formData.productName = formData.productName || 'test';
        // formData.amount = formData.amount || '1004';
        // formData.buyerName = formData.buyerName || '홍길동';
        // formData.phoneNo = formData.phoneNo || '01000000000';

        const { productName, amount, buyerName, phoneNo } = formData;
        if (!productName) {
            setMessage('상품명을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        if (!amount) {
            setMessage('결제금액을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        if (!buyerName) {
            setMessage('구매자명을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        if (!phoneNo) {
            setMessage('휴대폰을 올바르게 입력해주세요.');
            setAlertVisible(true);
            return;
        }

        onNext();
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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
            >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={[styles.container, {height:screenHeight}]}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {/* 헤더 및 입력 필드들 */}
                    <View style={styles.header}>
                        <Ionicons name="cart-outline" size={24} color="#2680eb" style={{ marginTop:14, marginRight: 6 }} />
                        <Text style={styles.title}>결제정보</Text>
                    </View>
                    <View style={styles.separator} />

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>상품명</Text>
                        <TextInput style={styles.input}
                                   placeholder="상품명을 입력하세요."
                                   maxLength={64}
                                   value={formData.productName}
                                   onChangeText={(text) => {
                                       // 입력 중엔 필터링 하지 않음
                                       setFormData({
                                           ...formData,
                                           productName: text,
                                       });
                                   }}
                                   onEndEditing={(e) => {
                                       // 입력이 끝났을 때만 필터 적용
                                       setFormData({
                                           ...formData,
                                           productName: UTILS.removeSpecial(e.nativeEvent.text),
                                       });
                                    }}
                        />

                        <Text style={styles.label}>결제금액</Text>
                        <TextInput style={styles.input}
                                   placeholder="0"
                                   maxLength={13}
                                   value={formData.amount} onChangeText={(text) => {
                                    setFormData({
                                        ...formData,
                                        amount: UTILS.comma(text),
                                    });
                                }}
                        />

                        <Text style={styles.label}>구매자명</Text>
                        <TextInput style={styles.input}
                                   placeholder="구매자명을 입력하세요."
                                   maxLength={12}
                                   value={formData.buyerName}
                                   onChangeText={(text) => {
                                       // 입력 중엔 필터링 하지 않음
                                       setFormData({
                                           ...formData,
                                           buyerName: text,
                                       });
                                   }}
                                   onEndEditing={(e) => {
                                       // 입력이 끝났을 때만 필터 적용
                                       setFormData({
                                           ...formData,
                                           buyerName: UTILS.removeSpecial(e.nativeEvent.text),
                                       });
                                    }}
                        />

                        <Text style={styles.label}>구매자 연락처</Text>
                        <TextInput style={styles.input}
                                   placeholder="'-' 없이 입력하세요."
                                   maxLength={16}
                                   value={formData.phoneNo} onChangeText={(text) => {
                                    setFormData({
                                        ...formData,
                                        phoneNo: UTILS.onlyNumber(text),
                                    });
                                }}
                        />

                       {/* <View style={styles.optionalLabelRow}>*/}
                       {/*     <Text style={styles.label}>메모</Text>*/}
                       {/*     <Text style={styles.optionalText}>(선택)</Text>*/}
                       {/* </View>*/}
                       {/* <TextInput style={styles.input}*/}
                       {/*            maxLength={200}*/}
                       {/*            value={formData.udf1} onChangeText={(text) => {*/}
                       {/*                setFormData({*/}
                       {/*                 ...formData,*/}
                       {/*                 udf1: text,*/}
                       {/*             });*/}
                       {/*         }}*/}
                       {/*/>*/}
                    </View>

                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.fullWidthTouchable} onPress={confirmBtn}>
                            <Text style={styles.footerButton}>다음</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    );
};

export default ProductScreen;
