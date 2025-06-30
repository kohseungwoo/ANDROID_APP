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
        paddingHorizontal:20,
    },

    landscapePadding: {
        paddingHorizontal: 100,
    },
    title: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    hashTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2680eb',
        marginBottom: 2,
    },

    nickAndCloseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    mchtName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    closeText: {
        fontSize: 20,
        color: '#888',
        paddingHorizontal: 6,
        fontWeight:'bold'
    },

    thickDivider: {
        borderBottomWidth: 0.8,
        borderColor: '#808080',
        marginBottom: 20,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
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
        borderColor: '#808080',
        opacity: 0.5,
        marginVertical: 8,
    },
    footer: {
        // paddingHorizontal : 20,
        paddingVertical : 10,
    },
    button: {
        backgroundColor: '#253e6d',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    actionButton: {
        flex: 1,
        marginHorizontal: 2,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },

    refundButton: {
        backgroundColor: '#c87474',
    },

    receiptButton: {
        backgroundColor: '#2680eb',
    },

    actionButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    disabledButton: {
        backgroundColor: '#cccccc',
    },

    disabledButtonText: {
        color: '#888',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)', // 반투명 배경
        zIndex: 10,
    },
});
