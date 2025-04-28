import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        minHeight : 400,
    },
    userBox: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingTop:15,
        paddingBottom:15,
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftPart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightPart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nick: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 6,
    },
    logout: {
        marginLeft: 6,
        color: '#adadad',
        fontSize: 14,
    },
    menuGrid: {
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    menuItem: {
        width: '100%', // 더 넓은 너비로 텍스트 여유 공간 확보
        alignItems: 'center',
        marginBottom: 20,
    },
    menuLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#333',
    },
});
