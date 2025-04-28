import React from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import Main from '../../components/MainV2';
import Header from '../../components/Header';
import styles from '../../assets/styles/DashboardStyle';

const DashboardScreen = () => {
    const layout = useWindowDimensions();
    const isLandscape = layout.width > layout.height;
    const horizontalPadding = isLandscape ? 100 : 0;

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.flex_1}>
                <ScrollView
                    contentContainerStyle={[
                        styles.contentContainer,
                        isLandscape && { paddingHorizontal: horizontalPadding },
                    ]}
                >
                    <View style={styles.innerWrapper}>
                        <Main />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default DashboardScreen;
