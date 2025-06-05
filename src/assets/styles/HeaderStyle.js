import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth:0.5,
        borderColor:'#ccc',
        marginBottom: 0.8,
        // elevation: 2,  // 높여서 그림자 효과 강조
        // shadowColor: '#808080', // 그림자 색상
        // shadowOpacity: 0.2, // 그림자의 투명도
        // shadowRadius: 2, // 그림자의 흐림 정도 (큰 값일수록 흐려짐)
        // shadowOffset: { width: 0, height: 5 }, // 그림자 위치 (높이값을 더 크게 하면 그림자 위치가 더 아래로 내려가게 됨)
    },
    logo: {
        width: 120,
        height: 40,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center', // 로고와 수직 정렬
        height: '100%', // 필요 시 height 조정
        paddingTop : 5,
        paddingRight : 25,
    },
});
