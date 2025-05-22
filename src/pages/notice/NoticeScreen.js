import React, {useState} from 'react';
import {Linking, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import styles from '../../assets/styles/NoticeStyle';
import refreshHooks from '../../components/hooks/RefreshHooks';
import NointModal from '../../components/modal/NointModal';
import {useRoute} from '@react-navigation/native';

const noticeList = [
    { id: 1, date: '20240530', title: '2024년 6월 카드사 무이자 할부 안내',  content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 6월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 6월 1일 ~ 2024년 6월 30일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>`},
    { id: 2, date: '20240628', title: '2024년 7월 카드사 무이자 할부 안내',  content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 7월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 7월 1일 ~ 2024년 7월 31일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>` },
    { id: 3, date: '20240730', title: '2024년 8월 카드사 무이자 할부 안내',  content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 8월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 8월 1일 ~ 2024년 8월 31일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>` },
    { id: 4, date: '20240829', title: '2024년 9월 카드사 무이자 할부 안내',  content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 9월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 9월 1일 ~ 2024년 9월 30일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>` },
    { id: 5, date: '20240927', title: '2024년 10월 카드사 무이자 할부 안내', content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 10월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 10월 1일 ~ 2024년 10월 31일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>` },
    { id: 6, date: '20241030', title: '2024년 11월 카드사 무이자 할부 안내', content: `<div class="board-cont">
                \t안녕하십니까?<br><br>이투유(주)의 전자결제서비스 운영자입니다.<br><br>신용카드 2024년 11월 무이자 행사 안내드리오니 업무에 참고 부탁드립니다.<br><br><br>■ 대상 기간 : 2024년 11월 1일 ~ 2024년 11월 30일<br><br>■ 내 용<br><br>  ▷ 현대카드 : 2~3개월<br><br>  ▷ NH농협카드 : 2~4개월<br><br>  ▷ 롯데카드 : 2~5개월<br><br>  ▷ 삼성카드 : 2~5개월<br><br>  ▷ 국민카드 : 2~5개월<br><br>  ▷ 신한카드 : 2~5개월<br><br>  ▷ 비씨카드 : 2~5개월<br><br>  ▷ 우리카드(독자,우리BC) : 2~5개월<br><br><br><br>※ 5만원 이상 할부 결제 시 적용 (단, 현대 1만원 이상 할부 결제 시 적용)<br><br>※ 업종 무이자 제외 대상 : 법인/체크/선불/기프트/하이브리드/은행계열카드<br><br>  - 은행계열카드 : BC카드 마크가 없는 Non-BC카드 ex. 제주, 광주, 전북카드 등<br><br>  - 수협카드는 BC 회원사 전환으로 업종 무이자 적용 가능 (단, 부분무이자는 적용 불가) <br><br>※ 제외 업종 : 제세공과금, 등록금, 우편요금, 상품권, 도시가스요금<br><br>※ 삼성카드 : 병원, 약국, 제약 업종 제외<br><br>※ 현대카드 : 제약 업종 제외<br><br>※ 농협카드 : 의약품, 도서, 손해보험, 면세점 업종 제외<br><br>※ 하나카드 : 병원, 약국, 의약품 업종 제외<br><br>※ 신용카드사 정책 변경에 따라 변동 될 수 있음<br><br>언제나 저희 서비스를 이용해 주셔서 감사드리며 <br><br>더욱 나은 서비스로 보답하겠습니다.
                </div>` },
];


const faqList = [
    { id: 1, type:'거래',  title: '신규 신청 시 심사 기간이 얼마나 소요되나요?', content: '신청부터 계정 발급까지 약 1~2주 정도 소요됩니다. 카드사(매입사) 심사 단계에서 추가 질문이나 수정 요청 등의 사유로 심사 기간이 연장될 수 있습니다.'},
    { id: 2, type:'정산', title: '거래내역은 어디서 확인하나요?',  content: '가맹점 관리자 사이트에서 [거래 내역] 메뉴를 통해 조회 가능합니다.'},
    { id: 3, type:'터미널',  title: '아이디 변경이 가능한가요?',  content: '최초에 부여된 아이디의 변경은 불가하며, 기존 가맹점으로 추가 로그인 가능한 유저 추가 기능이 있습니다.' },
    { id: 4, type:'기타',  title: '계약 완료 전 결제 테스트가 가능한가요?',  content: '최초에 부여된 아이디의 변경은 불가하며, 기존 가맹점으로 추가 로그인 가능한 유저 추가 기능이 있습니다.' },
];

const contactList = [
    { id:1, type:'call', title: '문의하기', content:'0216004191' },
];

const ITEMS_PER_PAGE = 10;

const NoticeScreen = () => {
    const route = useRoute();
    const initialTab = route?.params?.tab || 'notice';
    const [activeTab, setActiveTab] = useState(initialTab);

    const refresh = () => {};
    const { refreshing, onRefresh } = refreshHooks(refresh);

    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    // const [activeTab, setActiveTab] = useState('notice');

    const [currentPageMap, setCurrentPageMap] = useState({
        notice: 1,
    });

    const tabConfig = {
        notice: { title: '공지사항', data: noticeList },
        faq: { title: 'FAQ', data: faqList },
        contact: { title: '고객센터', data: contactList },
    };

    const formatDate = (dateStr) => {
        if (typeof dateStr !== 'string' || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
    };

    const openNotice = (notice) => {
        setSelectedNotice(notice.content);
        setAlertVisible(true);
    };

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        setCurrentPageMap((prev) => ({
            ...prev,
            [tabKey]: 1,
        }));
    };

    const getPagedData = (list, page) =>
        list.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const goToPrevPage = () => {
        setCurrentPageMap((prev) => ({
            ...prev,
            [activeTab]: Math.max(prev[activeTab] - 1, 1),
        }));
    };

    const goToNextPage = () => {
        const total = Math.ceil(tabConfig[activeTab].data.length / ITEMS_PER_PAGE);
        setCurrentPageMap((prev) => ({
            ...prev,
            [activeTab]: Math.min(prev[activeTab] + 1, total),
        }));
    };

    const renderTabButtons = () => (
        <View style={styles.tabWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tabInnerWrapper}>
                    {Object.keys(tabConfig).map((tabKey) => (
                        <TouchableOpacity
                            key={tabKey}
                            style={[
                                styles.tabButton,
                                activeTab === tabKey && styles.activeTabButton,
                            ]}
                            onPress={() => handleTabChange(tabKey)}
                        >
                            <Text
                                style={[
                                    styles.tabButtonText,
                                    activeTab === tabKey && styles.activeTabText,
                                ]}
                            >
                                {tabConfig[tabKey].title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    const renderContent = () => {
        const { data } = tabConfig[activeTab];
        const currentPage = currentPageMap[activeTab] || 1;

        if (activeTab === 'notice') {
            const pagedData = getPagedData(data, currentPage);
            return (
                <>
                    {pagedData.map((item) => (
                        <View key={item.id} style={styles.noticeRow}>
                            <Text style={styles.noticeDate}>{formatDate(item.date)}</Text>
                            <TouchableOpacity
                                style={styles.noticeTextWrapper}
                                onPress={() => openNotice(item)}
                            >
                                <Text style={styles.noticeTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            );
        }

        if (activeTab === 'faq') {
            const grouped = data.reduce((acc, item) => {
                const group = item.type || '기타';
                if (!acc[group]) acc[group] = [];
                acc[group].push(item);
                return acc;
            }, {});

            return (
                <>
                    {Object.keys(grouped).map((type) => {
                        const pagedItems = getPagedData(grouped[type], currentPage);
                        return (
                            <View style={styles.sectionTitleView} key={type}>
                                <Text style={styles.sectionTitle}>{type}</Text>
                                {pagedItems.map((item) => (
                                    <View key={item.id} style={styles.noticeRow}>
                                        <TouchableOpacity
                                            style={styles.noticeTextWrapper}
                                            onPress={() => openNotice(item)}
                                        >
                                            <Text style={styles.noticeTitle}> {item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        );
                    })}
                </>
            );
        }

        if (activeTab === 'contact') {
            return (
                <View style={styles.sectionTitleView}>
                    <Text style={styles.sectionTitle}>고객센터</Text>
                    {data.map((item) => (
                        <View key={item.id} style={styles.noticeRow}>
                            <TouchableOpacity
                                style={styles.noticeTextWrapper}
                                onPress={() => Linking.openURL(`tel:${item.content}`)}
                            >
                                <Text style={styles.noticeTitle}> {item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        }
    };

    const renderPagination = () => {
        if (activeTab !== 'notice') return null;

        const { data } = tabConfig[activeTab];
        const currentPage = currentPageMap[activeTab] || 1;
        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) return null;

        return (
            <View style={styles.paginationWrapper}>
                <TouchableOpacity
                    onPress={goToPrevPage}
                    disabled={currentPage === 1}
                    style={[
                        styles.pageButton,
                        currentPage === 1 && styles.disabledButton,
                    ]}
                >
                    <Text style={styles.pageButtonText}>이전</Text>
                </TouchableOpacity>
                <Text style={styles.pageInfo}>
                    {currentPage} / {totalPages}
                </Text>
                <TouchableOpacity
                    onPress={goToNextPage}
                    disabled={currentPage === totalPages}
                    style={[
                        styles.pageButton,
                        currentPage === totalPages && styles.disabledButton,
                    ]}
                >
                    <Text style={styles.pageButtonText}>다음</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <NointModal
                visible={alertVisible}
                message={selectedNotice}
                onConfirm={() => setAlertVisible(false)}
            />

            <SafeAreaView style={styles.safeArea}>
            <HeaderSub title={tabConfig[activeTab].title} />
              <View style={styles.container}>
                  <ScrollView
                      contentContainerStyle={styles.contentContainer}
                      refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                  >
                      {renderTabButtons()}
                      {renderContent()}
                  </ScrollView>
                  {renderPagination()}
              </View>
            </SafeAreaView>
        </>
    );
};

export default NoticeScreen;
