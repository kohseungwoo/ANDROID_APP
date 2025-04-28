import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    message: {
        fontSize: 14,
        color:'#606060',
        textAlign: 'center',
        marginBottom: 20,
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
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    confirmButton: {
        backgroundColor: '#2f50bd',
    },
    cancelText: {
        color: '#606060',
        fontSize: 14,
    },
    confirmText: {
        color: '#fff',
        fontSize: 14,
    },
});
