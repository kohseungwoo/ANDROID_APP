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
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        color: '#888',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuLabel: {
        fontSize: 16,
        color: '#000',
    },
});
