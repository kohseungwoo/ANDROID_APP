import React, {useEffect, useState} from 'react';
import {Linking, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import HeaderSub from '../../components/HeaderSub';
import styles from '../../assets/styles/NoticeStyle';
import refreshHooks from '../../components/hooks/RefreshHooks';
import NointModal from '../../components/modal/NointModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Logout} from '../../components/Logout';
import ConfirmOkModal from '../../components/modal/ConfirmOkModal';
import OpenStoreLink from '../../components/OpenStoreLink';
import UpdateInfoModal from '../../components/modal/UpdateInfoModal';
import {fetchWithTimeout} from '../../components/Fetch';

const NoticeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [alertVisible, setAlertVisible] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [exitVisible, setExitVisible] = useState(false);
    const [openLinkVisible, setOpenLinkVisible] = useState(false);

    const [selectedNotice, setSelectedNotice] = useState(null);
    const initialTab = route?.params?.tab || 'notice';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [itemsPerPage, setItemPerPage] = useState(8);
    const [noticeList, setNoticeList] = useState([]);
    const [faqList, setFaqList] = useState([]);
    const [contactList, setContactList] = useState([]);

    const refresh = () => {};
    const { refreshing, onRefresh } = refreshHooks(refresh);

    const [currentPageMap, setCurrentPageMap] = useState({
        notice: 1,
    });

    const tabConfig = {
        notice: { title: '공지사항', data: noticeList },
        faq: { title: 'FAQ', data: faqList },
        contact: { title: '고객센터', data: contactList },
    };

    const handleOpenLinkConfirm = () => {
        OpenStoreLink();
        setOpenLinkVisible(false);
    };

    const formatDate = (dateStr) => {
        if (typeof dateStr !== 'string' || dateStr.length !== 8) return dateStr;
        return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
    };

    const openNotice = (notice) => {
        setSelectedNotice(notice.summary);
        setAlertVisible(true);
    };

    const openFaq = (faq) => {
        setSelectedNotice(faq.answer);
        setAlertVisible(true);
    };

    async function handleExit(){
        await Logout(navigation);
    }

    useEffect(() => {
        handleTabChange(initialTab);
    }, [initialTab]);

    async function handleTabChange(tabKey) {
        setActiveTab(tabKey);
        setCurrentPageMap((prev) => ({
            ...prev,
            [tabKey]: 1,
        }));

        if(tabKey === 'contact'){
            setContactList([{ id:1, type:'call', title: '문의하기', content:'0216004191' }]);
            return;
        }

        try {
            const response = await fetchWithTimeout(`${E2U?.API_URL}/v2/${tabKey}/range`, {
                method: 'POST',
                headers: {
                    'Content-Type' : E2U?.CONTENT_TYPE_JSON,
                    'Authorization': E2U?.key,
                    'VERSION'  : E2U?.APP_VERSION,
                },
            }, E2U?.NETWORK_TIMEOUT);

            const result = await response.json();
            E2U?.INFO(`${tabKey} 정보 조회 API 응답 \n ${JSON.stringify(result)}`);

            if (result.code === '0000') {
                switch (tabKey){
                    case "notice" : setNoticeList(result.data); break;
                    case "faq"    : setFaqList(result.data); break;
                    default :
                        setSelectedNotice(`${tabKey} 정보를 찾을 수 없습니다. \n 관리자에게 문의하시기 바랍니다.`);
                        setAlertVisible(true);
                        setDefaultMessage(false);
                    break;
                }
            }else{
                if (result.code === '0805' || result.code === '0803' ) {
                    setMessage('세션이 만료되었습니다.\n다시 로그인해주세요.');
                    setExitVisible(true);
                }else if (result.code === '0802'){
                    setOpenLinkVisible(true);
                } else{
                    setSelectedNotice(`${result.description}`);
                    setAlertVisible(true);
                    setDefaultMessage(false);
                }
            }
        } catch (err) {
            E2U?.WARN(`${tabKey} API 요청 실패 \n ${err}`);
            if (err.message === 'Request timed out') {
                setSelectedNotice('요청이 타임아웃되었습니다. \n 잠시 후 재시도하시기 바랍니다.');
                setAlertVisible(true);

            }else if (err.message === 'Network request failed') {
                setSelectedNotice('네트워크 연결상태를 확인해주시기 바랍니다.');
                setAlertVisible(true);
            }else{
                setSelectedNotice(`정보 조회 실패하였습니다. \n 관리자에게 문의하시기 바랍니다.`);
                setAlertVisible(true);
                setDefaultMessage(false);
            }
        }
    };

    const getPagedData = (list, page) =>
        list.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const goToPrevPage = () => {
        setCurrentPageMap((prev) => ({
            ...prev,
            [activeTab]: Math.max(prev[activeTab] - 1, 1),
        }));
    };

    const goToNextPage = () => {
        const total = Math.ceil(tabConfig[activeTab].data.length / itemsPerPage);
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
                        <View key={item.idx} style={styles.noticeRow}>
                            <Text style={styles.noticeDate}>{formatDate(item.regDay)}</Text>
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
                                    <View key={item.idx} style={styles.noticeRow}>
                                        <TouchableOpacity
                                            style={styles.noticeTextWrapper}
                                            onPress={() => openFaq(item)}
                                        >
                                            <Text style={styles.noticeTitle}> # {item.question}</Text>
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
        const totalPages = Math.ceil(data.length / itemsPerPage);

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
