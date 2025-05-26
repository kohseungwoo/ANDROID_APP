import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {  padding: 10, backgroundColor: '#ffffff', flex: 1 },
    contentContainer: {
        flexGrow: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', // 배경색을 헤더 배경과 맞춰주세요
    },
    flex_1:{
        flex:1,
    },
    noticeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    noticeDate: {
        color: '#888',
        fontSize: 13,
        marginRight: 12,
        width: 80,
    },
    noticeTitle: {
        fontSize: 15,
        color: '#333',
    },
    noticeTextWrapper: {
        flex: 1,
    },

    paginationWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    pageButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 10,
        backgroundColor: '#253e6d',
        borderRadius: 6,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    pageInfo: {
        fontSize: 14,
        color: '#333',
    },

    tabWrapper: {
        paddingTop:15,
        paddingBottom: 40,
    },

    tabInnerWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },

    tabButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#fff',
        borderColor:'#ccc',
        borderWidth:0.5,
    },

    activeTabButton: {
        backgroundColor: '#253e6d',
    },

    tabButtonText: {
        fontSize: 13,
        color: '#808080',
    },

    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft : 14,
        color:'#000000',
    },

    sectionTitleView: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 40,
    },
});
