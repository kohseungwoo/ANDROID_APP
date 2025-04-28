import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    footer: {
        height: 60,
        paddingTop : 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerIcon: {
        flex: 1, // 버튼 하나가 footer 영역을 4등분
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});
