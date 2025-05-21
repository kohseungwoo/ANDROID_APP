import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {  height :640, padding: 20, backgroundColor: '#fff', flex: 1 },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        paddingTop:8,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        // backgroundColor: '#253e6d',
        borderWidth: 0.3,
        marginTop:10,
    },
    buttonText: {
        color: '#000',
        fontSize: 13,
        fontWeight:'bold',
        textAlign:'center',
        paddingHorizontal : 8,
    },
    separator: { height: 1.3, backgroundColor: '#000', marginVertical: 5 },
    cardTitle: { fontSize: 20, fontWeight: 'bold' },
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
    },
    picker: {
        height: 55,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    toggleBtn: {
        paddingHorizontal:10,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        marginLeft: 8,
        borderRadius: 5,
        marginBottom:10,
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
    },
    cardInput: {
        flex: 1,
        marginHorizontal: 2,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom:12,
        textAlign: 'center',
    },
    InputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowInput: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 6,
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

    installmentInput: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        height:50,
        marginBottom:20,
        justifyContent: 'center',
    },

    footerContainer: {
        height: 50,
        marginTop: 30,
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
            android: 10,
        }),
        color: '#fff',
    },
});
