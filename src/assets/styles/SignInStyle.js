import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop:'50%',
        paddingVertical: 50,
        alignItems: 'center',
    },
    layoutContainer: {
        width: '90%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    layoutTitleContainer: {
        paddingBottom: 10,
    },
    bgText: {
        fontSize: 28,
        color: '#e7e7e7',
        fontWeight: 'bold',
    },
    loginContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        height: 48,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 0,
    },
    eyeIconContainer: {
        paddingLeft: 10,
        justifyContent: 'center',
    },
    eyeIcon: {
        width: 16,
        height: 16,
        tintColor: '#666',
    },
    errorContainer: {
        minHeight: 25,
        justifyContent: 'center',
    },
    errorMessage: {
        color: '#fd6060',
        fontSize: 12,
        paddingLeft: 5,
    },
    loginBtn: {
        backgroundColor: '#253e6d',
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    loginBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginBtnLoading: {
        opacity: 0.6,
    },
});
