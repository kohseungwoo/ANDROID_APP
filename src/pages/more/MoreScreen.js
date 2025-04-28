import styles from '../../assets/styles/MoreStyle';
import {useWindowDimensions, View} from 'react-native';
import React, {useMemo} from 'react';
import MoreMenuScreen from './MoreMenuScreen';

const MoreScreen = () => {
    const layout = useWindowDimensions();
    const isLandscape = useMemo(() => layout.width > layout.height, [layout]);
    const horizontalPadding = isLandscape ? 100 : 0;

    return (
        <View style={styles.container}>
            <View style={styles.flex_1}>
                <View style={[styles.innerWrapper, { paddingHorizontal: horizontalPadding }]}>
                    <MoreMenuScreen />
                </View>
            </View>
        </View>
    );
};

export default MoreScreen;
