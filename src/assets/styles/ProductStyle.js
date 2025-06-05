import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        paddingTop:8,
    },
    button: {
        backgroundColor: '#253e6d',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight:'bold',
        textAlign:'center',
    },
    separator: { height: 1.3, backgroundColor: '#000', marginVertical: 5 },
    cardTitle: { marginTop: 50, fontSize: 20, fontWeight: 'bold' },
    expiryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },

    hintText: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        marginLeft: 25,
    },
    receiptHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallGrayText: {
        fontSize: 12,
        color: '#777',
        marginLeft: 5,
        marginTop: 55,
    },
    optionalLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionalText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 2,
        marginTop: 5,
    },
    optionalText2: {
        fontSize: 12,
        color: '#888',
        marginLeft: 2,
        marginTop: 22,
    },
    expiryInstallmentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 5,
    },

    inputGroup: { marginVertical: 10, marginHorizontal: 5},
    label: { marginBottom: 10, marginTop: 8, fontSize:16, fontWeight:'500'},
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    pickerWrapper: {
        flex: 1,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        // overflow: 'hidden',
        justifyContent: 'center',
        marginLeft:20,
    },
    picker: {
        height: 55,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        top:12,
    },
    toggleBtn: {
        paddingHorizontal:10,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        marginLeft: 8,
        borderRadius: 5,
    },
    activeBtn: {
        backgroundColor: '#253e6d',
        borderColor: '#253e6d',
    },
    activeBtnText: {
        color: '#fff',
    },
    cardNumberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 15,
    },
    cardInput: {
        flex: 1,
        marginHorizontal: 2,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
    },
    expiryInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expiryInput: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 2,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 8,
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom:12,
        fontSize:16,
    },

    footerContainer: {
        height: 50,
    },

    fullWidthTouchable: {
        flex: 1,
        width:'100%',
        backgroundColor: '#253e6d',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    footerButton: {
        height:'100%',
        borderRadius: 8,
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop: Platform.select({
            ios: 15,
            android: 12,
        }),
        color: '#fff',
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
