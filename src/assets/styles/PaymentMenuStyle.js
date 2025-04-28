import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    grid: {
        padding: 20,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    optionContainer: {
        alignItems: 'center',
        width: 100,
    },
    label: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
});
