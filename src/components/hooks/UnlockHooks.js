// hooks/usePortraitLock.js
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

const usePortraitLock = () => {
    useEffect(() => {
        Orientation.lockToPortrait(); // 세로 고정
        return () => {
            Orientation.unlockAllOrientations(); // 해제
        };
    }, []);
};

export default usePortraitLock;
