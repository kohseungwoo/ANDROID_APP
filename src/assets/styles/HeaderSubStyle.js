import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 0.2,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 18,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    refreshButton: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
});
