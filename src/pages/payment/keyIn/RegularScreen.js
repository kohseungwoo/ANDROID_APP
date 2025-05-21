import React, {useRef, useState} from 'react';
import {Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../../assets/styles/RegularStyle';
import NointModal from '../../../components/modal/NointModal';
import DropDownPicker from 'react-native-dropdown-picker';

const RegularScreen = ({ formData, setFormData, onNext, onBack }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');
    const [nointText, setNointMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState(
        Array.from({ length: 12 }, (_, i) => ({
            label: `${i + 1}개월`,
            value: `${i + 1}`,
        }))
    );


    const onlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const getInstallment = () => {
        setNointMessage(`
            <h3>2025년 5월 카드사 무이자 할부 안내</h3>
            <p><strong>1. 적용 기간 :</strong><br/> 2025년 5월 1일 ~ 2025년 5월 31일</p>
            <p><strong>2. 무이자 할부 프로모션 (카드사 부담)</strong><br/>
            ▷ 현대카드 : 2~3개월<br/>
            ▷ 국민카드 : 2~3개월<br/>
            ▷ 삼성카드 : 2~5개월<br/>
            ▷ 신한카드 : 2~5개월<br/>
            ▷ 롯데카드 : 2~5개월<br/>
            ▷ 비씨카드 : 2~6개월<br/>
            ▷ 우리카드 : 2~6개월<br/>
            ▷ NH농협카드 : 2~6개월<br/>
            </p>
            <p><strong>3. 유의사항</strong><br/>
            <p>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)</p>  
            <p>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드</p>  
            <p>- 은행계열카드 : BC카드 마크가 없는 Non-BC카드 (ex. 제주, 광주, 전북카드 등)</p>  
            <p>- 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가)</p>  
            <p>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금</p>  
            <p>※ 삼성카드 : 병원, 약국, 제약 업종 제외</p>  
            <p>※ 현대카드 : 제약 업종 제외</p>  
            <p>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외</p>  
            <p>※ 신용카드사 정책 변경에 따라 변동 될 수 있음</p>  
            <p>※ 하나카드 할부 불가</p>
            `);
        setAlertVisible(true);
    };

    const [installmentIdx, setInstallmentIdx] = useState(
        Array.from({ length: 12 }, (_, i) => ({
            label: `${i + 1}개월`,
            value: `${i + 1}`,
        }))
    );

    const resetCardForm = () => {
        const keepKeys = ['productName','amount','buyerName','phoneNo'];

        setOpen(false);
        setFormData(prev => {
            const newForm = {};

            // 유지할 key들은 기존 값 유지
            keepKeys.forEach(key => {
                newForm[key] = prev[key];
            });

            return newForm;
        });
    };

    const cardPersRef1 = useRef(null);
    const cardPersRef2 = useRef(null);
    const cardPersRef3 = useRef(null);
    const cardPersRef4 = useRef(null);

    const cardCorpRef1 = useRef(null);
    const cardCorpRef2 = useRef(null);
    const cardCorpRef3 = useRef(null);
    const cardCorpRef4 = useRef(null);

    const pwdPersRef = useRef(null);
    const pwdCorpRef = useRef(null);
    const dobRef = useRef(null);
    const brnRef = useRef(null);


    return (
        <>
            <NointModal
                visible={alertVisible}
                message={nointText}
                onConfirm={() => setAlertVisible(false)}
            />

            <ScrollView
                style={[styles.container, {height:screenHeight}]}
                contentContainerStyle={styles.contentContainer} // 키보드 위 공간 확보
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="card-outline" size={24} color="#2680eb" style={{ marginTop:14, marginRight: 6 }} />
                        <Text style={styles.title}>카드정보</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={getInstallment}>
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
                                    keyboardType="number-pad"
                                    value={formData.personalCardNumber1}
                                    onChangeText={(text) => {
                                        const number = onlyNumber(text);
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
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber2}
                                           onChangeText={(text) => {
                                               const number = onlyNumber(text);
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
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber3}
                                           onChangeText={(text) => {
                                               const number = onlyNumber(text);
                                               setFormData({ ...formData, personalCardNumber3: number });
                                               if (number.length === 4) {
                                                   cardPersRef4.current?.focus();
                                               }
                                           }}
                                />
                                <TextInput ref={cardPersRef4}
                                           style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value={formData.personalCardNumber4}
                                           onChangeText={(text) => setFormData({
                                               ...formData,
                                               personalCardNumber4: onlyNumber(text),
                                           })}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            {/*<View style={styles.installmentInput}>*/}
                                <DropDownPicker
                                    open={open}
                                    value={formData.personalInstallment}
                                    items={items}
                                    setOpen={setOpen}
                                    setItems={setItems}
                                    setValue={(callback) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            personalInstallment: callback(prev.personalInstallment),
                                        }))
                                    }
                                    placeholder="일시불"
                                    listMode="SCROLLVIEW"
                                    style={{
                                        backgroundColor: '#fafafa', // 드롭다운의 기본 상자 스타일
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                        height: 50,
                                    }}
                                    dropDownStyle={{
                                        backgroundColor: '#ffffff', // 드롭다운 목록의 스타일
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 10,
                                        marginTop: 5,
                                    }}
                                    placeholderStyle={{
                                        color: '#999', // Placeholder 색상
                                        fontSize: 16,
                                    }}
                                    labelStyle={{
                                        color: '#333', // 항목(label)의 색상
                                        fontSize: 16,
                                    }}
                                    selectedItemLabelStyle={{
                                        color: '#000', // 선택된 항목의 텍스트 색상
                                        fontWeight: 'bold',
                                    }}
                                    selectedItemStyle={{
                                        backgroundColor: '#f2f2f2', // 선택된 항목 배경 색상
                                    }}
                                />
                            {/*</View>*/}


                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput style={styles.input}
                                               keyboardType="number-pad"
                                               placeholder="MM/YY"
                                               maxLength={4}
                                               value={formData.personalExpiry}
                                               onChangeText={(text) => {
                                                   const number = onlyNumber(text);
                                                   setFormData({ ...formData, personalExpiry: number });
                                                   if (number.length === 4) {
                                                       pwdPersRef.current?.focus();
                                                   }
                                               }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <TextInput ref={pwdPersRef}
                                               style={[styles.input, {marginLeft:20}]}
                                               keyboardType="number-pad"
                                               secureTextEntry
                                               placeholder="* *"
                                               maxLength={2}
                                               value={formData.personalPassword}
                                               onChangeText={(text) => {
                                                   const number = onlyNumber(text);
                                                   setFormData({ ...formData, personalPassword: number });
                                                   if (number.length === 2) {
                                                       dobRef.current?.focus();
                                                   }
                                               }}
                                    />
                                </View>
                            </View>


                            <Text style={[styles.label,{paddingTop:10}]}>본인확인</Text>
                            <TextInput ref={dobRef}
                                       style={styles.input}
                                       keyboardType="number-pad"
                                       placeholder="주민번호 앞 6자리"
                                       maxLength={6}
                                       value={formData.dob}
                                       onChangeText={(text) => setFormData({
                                           ...formData,
                                           dob: onlyNumber(text),
                                       })}
                            />

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
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber1}
                                           onChangeText={(text) => {
                                               const number = onlyNumber(text);
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
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber2}
                                           onChangeText={(text) => {
                                               const number = onlyNumber(text);
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
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber3}
                                           onChangeText={(text) => {
                                               const number = onlyNumber(text);
                                               setFormData({ ...formData, corpCardNumber3: number });
                                               if (number.length === 4) {
                                                   cardCorpRef4.current?.focus();
                                               }
                                           }}
                                />

                                <TextInput ref={cardCorpRef4}
                                           style={styles.cardInput}
                                           maxLength={4}
                                           keyboardType="number-pad"
                                           value ={formData.corpCardNumber4}
                                           onChangeText={(text) => {
                                               setFormData({
                                                   ...formData,
                                                   corpCardNumber4: onlyNumber(text),
                                               });
                                           }}
                                />
                            </View>

                            <Text style={styles.label}>할부개월</Text>
                            <View style={styles.installmentInput}>
                                <DropDownPicker
                                    open={open}
                                    value={formData.corpInstallment}
                                    items={items}
                                    setOpen={setOpen}
                                    setItems={setItems}
                                    setValue={(callback) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            corpInstallment: callback(prev.corpInstallment),
                                        }))
                                    }
                                    placeholder="일시불"
                                    listMode="SCROLLVIEW"
                                />
                            </View>


                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>유효기간</Text>
                                    <TextInput style={styles.input}
                                               keyboardType="number-pad"
                                               placeholder="MM/YY"
                                               maxLength={4}
                                               value={formData.corpExpiry}
                                               onChangeText={(text) => {
                                                   const number = onlyNumber(text);
                                                   setFormData({ ...formData, corpExpiry: number });
                                                   if (number.length === 4) {
                                                       pwdCorpRef.current?.focus();
                                                   }
                                               }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, {marginLeft:20}]}>비밀번호 앞 2자리</Text>
                                    <TextInput ref={pwdCorpRef}
                                               style={[styles.input, {marginLeft:20}]}
                                               keyboardType="number-pad"
                                               secureTextEntry
                                               placeholder="* *"
                                               maxLength={2}
                                               value={formData.corpPassword}
                                               onChangeText={(text) => {
                                                   const number = onlyNumber(text);
                                                   setFormData({ ...formData, corpPassword: number });
                                                   if (number.length === 2) {
                                                       brnRef.current?.focus();
                                                   }
                                               }}
                                    />
                                </View>
                            </View>


                            <Text style={[styles.label,{paddingTop:10}]}>본인확인</Text>
                            <TextInput ref={brnRef}
                                       style={styles.input}
                                       keyboardType="number-pad"
                                       placeholder="사업자번호 10자리"
                                       maxLength={10}
                                       value={formData.brn}
                                       onChangeText={(text) => setFormData({
                                           ...formData,
                                           brn: onlyNumber(text),
                                       })}
                            />
                        </>
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.fullWidthTouchable}>
                        <Text style={styles.footerButton}>결제하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default RegularScreen;
