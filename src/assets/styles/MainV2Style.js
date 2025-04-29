import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        height: 200, // 슬라이더 높이
    },
    main: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fdfdfd',
    },
    scrollViewContent: {
        paddingBottom: 50,
    },
    card: {
        top: 1,
        borderWidth: 0.1,
        height: 140,
        width: '99%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 0,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // 금액과 원 텍스트 수평, 세로로 정렬
    },
    amountWrapperLeft: {
        flexDirection: 'row',
        alignItems: 'center', // 금액과 원 텍스트가 수직으로 일치하도록 설정
        justifyContent: 'flex-start', // 텍스트들이 왼쪽으로 정렬되도록
    },
    amountWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1b1b1b',
        lineHeight: 22, // 텍스트의 높이를 정확히 맞춰줌
    },
    hiddenDash: {
        fontSize: 18, // 금액과 동일한 크기
        fontWeight: 'bold',
        color: '#1b1b1b', // 글자 색상 설정
    },
    currencyText: {
        fontSize: 14,
        fontWeight: 'normal', // '원' 텍스트 bold 없애기
        paddingLeft: 5, // '원'과 금액 간격 조정
    },
    hideAmountText: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'underline',
    },
    buttonStyle: {
        marginTop:10,
        paddingVertical: 5, // 위 아래 여백
        paddingHorizontal: 5, // 좌 우 여백
        borderWidth: 1,
        borderColor: 'transparent', // 버튼 테두리 색상
        borderRadius: 5, // 둥근 모서리
        textAlign: 'center', // 텍스트 가운데 정렬
        color: '#000000', // 텍스트 색상
        fontSize: 14, // 텍스트 크기
        fontWeight: 'bold', // 텍스트 두께
        backgroundColor: '#f6f6f6', // 배경색은 투명으로 설정
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    transactionBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 0.1,
        padding: 12,
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
        color: '#1689cc',
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
    paymentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1b1b1b',
    },
    // styles.js에서 수정해야 할 부분
    paymentIconRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',  // 여러 아이콘이 고르게 배치될 수 있게
        marginBottom: 30,
    },
    paymentIconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',  // 두 아이템을 한 줄에 두 개씩 배치
        padding: 5,
        borderWidth: 0.1,
        borderRadius: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        position: 'relative',  // 아이콘을 우측에 고정하기 위한 설정
    },

    paymentIconLabel: {
        paddingLeft: 5,
        marginRight: 10,  // 텍스트와 아이콘 사이의 간격
        fontSize: 12,  // 텍스트 크기
        flex: 1,  // 텍스트가 왼쪽에 꽉 차도록 설정
    },
});
