import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerBox: {
        marginBottom: 20,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    logoutText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#000',
    },
    userInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 12,
        color: '#888',
    },
    menuItem: {
        backgroundColor: '#253e6d',         // 진한 남색 배경
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,                       // Android 그림자
    },
    menuLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // 배경색을 헤더 배경과 맞춰주세요
    },

    modeStatusBox: {
        padding: 10,
        backgroundColor: '#f0f4ff',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    modeStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3a8a',
    },
});
