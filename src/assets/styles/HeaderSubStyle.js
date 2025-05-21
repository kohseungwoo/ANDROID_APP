import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        marginBottom: 0.8,
        elevation: 2,  // 높여서 그림자 효과 강조
        shadowColor: '#808080', // 그림자 색상
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 2, // 그림자의 흐림 정도 (큰 값일수록 흐려짐)
        shadowOffset: { width: 0, height: 5 }, // 그림자 위치 (높이값을 더 크게 하면 그림자 위치가 더 아래로 내려가게 됨)
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 18,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    refreshButton: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // 배경색을 헤더 배경과 맞춰주세요
    },
});
