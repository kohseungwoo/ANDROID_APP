import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
    wrapper: {
        height: 210, // 슬라이더 높이
    },
    main: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f7f7f7',
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    merchantContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:25,
    },
    merchantNick:{
        marginLeft: 8,
        fontSize: 14,
    },
    grayText:{
        color: '#888'
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor : 'rgba(230,22,22,0.67)',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
    },
    card: {
        top: 1,
        height: 180,
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
        fontSize: 15,
        fontWeight:'bold',
        color: '#000000',
    },
    cardDate: {
        fontSize: 14,
        color: '#808080',
    },
    amountRow: {
        paddingTop:10,
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
        fontSize: 22,
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
        fontSize: 14,
        color: '#808080',
        textDecorationLine: 'underline',
    },
    buttonStyle: {
        height: 42,
        marginTop:14,
        paddingTop: Platform.select({
            ios: 12,
            android: 8,
        }),
        paddingVertical: 6, // 위 아래 여백
        paddingHorizontal: 5, // 좌 우 여백
        borderWidth: 1,
        borderColor: 'transparent', // 버튼 테두리 색상
        borderRadius: 5, // 둥근 모서리
        textAlign: 'center', // 텍스트 가운데 정렬
        color: '#fff', // 텍스트 색상
        fontSize: 16, // 텍스트 크기
        fontWeight: 'bold', // 텍스트 두께
        backgroundColor: '#253e6d', // 배경색은 투명으로 설정
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    transactionBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
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
        fontSize: 18,
        color: '#808080',
        marginLeft: 4,
        paddingTop:5,
        fontWeight: 'bold',
    },
    hideText: {
        fontSize: 14,
        color: '#2680eb',
        marginLeft: 12,
    },
    reloadIcon: {
        color: '#808080',
        fontSize: 18,
        paddingTop:5,
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
        fontSize: 14,
        color: '#444',
    },
    transactionAmount: {
        fontSize: 14,
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
        fontSize: 14,
        color: '#808080',
        paddingTop:5,
    },
    paymentTitle: {
        top: -15,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    paymentIconRow: {
        top: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',       // 혹시 아이콘이 많아질 때 줄바꿈 지원
        justifyContent: 'space-between',
        backgroundColor:'#fff',
        marginBottom:20,
        borderRadius: 8,
        height:90,
        paddingTop: 5,
    },
    paymentIconLabel: {
        marginTop: 6,
        fontSize: 13,
        fontWeight:'500',
        color: '#333',
    },
    paymentIconBox: {
        width: '25%',          // 화면 너비의 25%씩 차지 → 한 줄에 4개
        alignItems: 'center',
        paddingVertical: 10,
    },
    // footerContainer: {
    //     position: 'absolute',
    //     bottom: 20,
    //     left: 0,
    //     right: 0,
    //     height: 40,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#eaeaea',
    //     borderRadius: 8,
    // },
    footerButton: {
        fontSize: 14,
        fontWeight:'bold',
        marginHorizontal: 20,
        color: '#000',
    },
    footerSeparator: {
        fontSize: 16,
        color: '#333',
    },
    footerContainer: {
        height: 50,
        bottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 15,
    },
    footerButtonBox: {
        flex: 1,              // 각각 1:1:1 비율
        alignItems: 'center',
    },
});
