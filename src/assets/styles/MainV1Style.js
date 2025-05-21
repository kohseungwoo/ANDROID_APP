import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fdfdfd',
    },
    scrollViewContent:{
        paddingBottom: 50,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e2d3a',
        marginBottom: 8,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',  // 금액을 우측 정렬
        alignItems: 'center',
    },
    currency: {
        fontSize: 14,
        color: '#333',
        paddingRight: 5,
    },
    amountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1b1b1b',
        flex: 1, // 우측 정렬
        textAlign: 'right', // 금액 우측 정렬
    },
    currencyText: {
        fontSize: 14,
        fontWeight: 'normal', // '원' 텍스트 bold 없애기
        paddingLeft: 5, // '원'과 금액 간격 조정
    },
    transactionBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    nextBtn: {
        fontSize: 15,
        color: '#808080',
        marginLeft: 4,
        fontWeight: 'bold',
    },
    hideText: {
        fontSize: 14,
        color: '#2680eb',
        marginLeft: 12,
    },
    reloadIcon: {
        color: '#808080',
        fontSize: 14,
    },
    transactionRow: {
        marginTop: 12,
    },
    transactionTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    transactionText: {
        fontSize: 13,
        color: '#444',
    },
    transactionAmount: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    cancelAmount: {
        color: '#fd6060',
    },
    rowDivider: {
        height: 1,
        backgroundColor: '#ddd',
        opacity: 0.4,
        marginTop: 8,
    },
    countText: {
        fontSize: 12,
        color: '#808080',
    },
});
