import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import AppContent from './src/components/AppContent';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SplashScreen.hide(); // 앱 준비되면 스플래시 숨기기

        // 추가 로딩이 필요할 경우 (API 등)
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
                <LottieView
                    source={require('./src/assets/animation/loading.json')}
                    autoPlay
                    loop
                    style={{width: 150, height: 150}}
                />
            </View>
        );
    }
    return (
        <AppContent />
    );
}
