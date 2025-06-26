import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: '50%', // 대신 중앙 정렬 느낌 유지
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
        flexDirection: 'row',       // 입력창과 아이콘 가로 배치
        alignItems: 'center',       // 세로 가운데 정렬
        borderWidth: 1,             // 테두리 두께
        borderColor: '#ccc',        // 테두리 색상 (연한 회색)
        borderRadius: 8,            // 둥근 모서리
        paddingHorizontal: 10,      // 좌우 안쪽 여백
        marginVertical: 8,          // 위아래 마진
        height: 48,                 // 높이 고정 (필요에 따라 조절)
        backgroundColor: '#fff',    // 배경색 (필요에 따라)
    },
    input: {
        flex: 1,                    // 남은 공간 모두 차지
        fontSize: 16,
        color: '#333',
        paddingVertical: 0,         // 높이 맞추기 위해 세로 패딩 제거 또는 조절
    },
    eyeIconContainer: {
        paddingLeft: 10,            // 입력창과 아이콘 사이 간격
        justifyContent: 'center',   // 아이콘 세로 가운데 정렬
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
        fontWeight:'bold'
    },
    loginBtnLoading: {
        opacity: 0.6,
    },
});
