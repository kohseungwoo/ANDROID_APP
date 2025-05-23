import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        // backgroundColor: '#253e6d',
        borderWidth: 0.3,
    },
    buttonText: {
        // color: '#fff',
        color: '#000',
        fontSize: 11,
        fontWeight:'bold',
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
    label: { marginBottom: 5, marginTop: 8, fontSize:16},
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
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom:12,
    },

    footerContainer: {
        position: 'absolute',
        bottom: 30,
        left: 15,
        right: 15,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#253e6d',
    },

    fullWidthTouchable: {
        flex: 1,
    },

    footerButton: {
        height:'100%',
        borderRadius: 8,
        fontSize: 14,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop: 8,
        color: '#fff',
    },
});
