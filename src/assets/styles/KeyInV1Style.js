import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom:20,
    },
    sectionTitle: {
        paddingLeft:20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#253e6d',
        backgroundColor: '#f6f7f8',  // 배경 색상만 추가
        width: '100%',  // 가로 100% 확장
        paddingVertical: 4,  // 세로 패딩 추가 (타이틀과 구분)
        paddingHorizontal: 0,  // 좌우 패딩 제거
        textAlign: 'left',  // 왼쪽 정렬
        alignSelf: 'stretch',  // 전체 너비에 맞게 확장
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        paddingLeft:20,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
    },
    input: {
        paddingLeft: 10,
        marginLeft : 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        // padding: 10,
        borderRadius: 6,
        marginTop: 5,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#253e6d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft:20,
        marginRight:20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    customSectionTitle: {
        marginTop: 20, // 추가로 marginTop을 설정한 스타일
    },
});
