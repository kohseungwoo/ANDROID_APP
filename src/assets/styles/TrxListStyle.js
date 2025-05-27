import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    flex_1:{
        flex:1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    innerWrapper: {
        flex: 1,
    },
    searchSection: {
        backgroundColor: '#fff',
        padding: 16,
    },
    dateInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        flex: 1,
        height:50,
    },
    dateInput: {
        marginLeft: 6,
        fontSize: 14,
        flex: 1,
    },
    tilde: {
        marginHorizontal: 8,
        fontSize: 16,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#253e6d',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateRangeText: {
        paddingLeft: 20,
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    whiteBackground: {
        backgroundColor: '#fff',  // 흰 배경
        flex: 1,  // 남은 공간을 채워서 아래로 내려감
        paddingBottom: 20,  // 하단 여백
    },
    transactionItem: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
    },
    lastTransactionItem: {
        borderBottomWidth: 0.5,     // 마지막 항목에 border 추가
        borderBottomColor: '#ddd', // 경계선 색상
    },
    amountNegative: {
        color: '#fd6060',  // 'red'
    },
    amountWithArrow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, // React Native 0.71 이상에서 사용 가능. 아니면 marginLeft로 대체.
    },
    transactionDate: {
        fontSize: 12,
        color: '#666',
        paddingBottom: 2,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    productName: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        paddingBottom: 2,
        fontWeight:'bold',
    },
    transactionBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    transactionMethod: {
        fontSize: 13,
        color: '#444',
        marginBottom: 4,
    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
    },
    dateRangeRow: {
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 20,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 14,
        color: '#000',
        fontWeight:'bold',
        marginRight: 4,

    },
    dropdownArrow: {
        fontSize: 8,
        color: '#333',
    },
    detailsBox: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        minHeight: 50,
        maxHeight: 400,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 2,
        zIndex: 10, // 화면 위로 올리기 위해
    },
    totalAmountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    totalAmountLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        // borderBottomWidth: 0.5,
        // borderColor: '#ccc',
    },
    methodText: {
        fontSize: 14,
        color: '#000',
    },
    methodAmount: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dragIndicatorContainer: {
        alignItems: 'center',
        paddingBottom: 10,
        top: -10,
    },
    dragIndicator: {
        width: 30,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#e4e4e4',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
        zIndex: 5,
    },
    iosPickerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    iosPicker: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    doneText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007aff',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // 배경색을 헤더 배경과 맞춰주세요
    },
});
