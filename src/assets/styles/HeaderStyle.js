import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        paddingTop: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
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
