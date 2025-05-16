import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxHeight: '80%', // 너무 커지지 않게 제한
    },
    contentWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: '#2680eb',
    },
    confirmText: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 16,
    },
    scrollArea: {
        flexGrow: 1,
        marginBottom: 20,
        width:'100%',
    },
    message: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
        // paddingHorizontal: 10,
    },
});
