import React from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';
import Main from '../../components/MainV2';
import Header from '../../components/Header';
import styles from '../../assets/styles/DashboardStyle';
import refreshHooks from '../../components/hooks/RefreshHooks';

const DashboardScreen = () => {
    // 드래그 새로고침
    const { refreshing, onRefresh } = refreshHooks(() => {
        // 여기에 API 호출 등 로직 작성
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header />
                <View style={styles.flex_1}>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View style={styles.innerWrapper}>
                            <Main />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DashboardScreen;
