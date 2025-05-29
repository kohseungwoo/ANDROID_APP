import React, {useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';
import Main from '../../components/MainV2';
import Header from '../../components/Header';
import styles from '../../assets/styles/DashboardStyle';

const DashboardScreen = () => {
    const [refreshProps, setRefreshProps] = useState({
        refreshing: false,
        onRefresh: () => {},
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header />
                <View style={styles.flex_1}>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshProps.refreshing}
                                onRefresh={refreshProps.onRefresh}
                            />
                        }
                    >
                        <View style={styles.innerWrapper}>
                            <Main setRefreshControlProps={setRefreshProps} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DashboardScreen;
