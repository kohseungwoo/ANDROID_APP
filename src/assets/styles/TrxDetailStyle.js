import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    landscapePadding: {
        paddingHorizontal: 100,
    },
    hashTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1689cc',
        marginBottom: 2,
    },
    mchtName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    thickDivider: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 14,
        color: '#222',
        flexShrink: 1, // 추가
        maxWidth: 250,
        textAlign: 'right',
    },
    amount: {
        fontSize: 14,
        color: '#222',
        fontWeight :'bold',
    },
    lightDivider: {
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        opacity: 0.5,
        marginVertical: 10,
    },
    footer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#253e6d',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
