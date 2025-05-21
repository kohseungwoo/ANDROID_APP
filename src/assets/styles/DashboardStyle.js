import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        flexGrow: 1,
    },
    innerWrapper: {
        flex: 1,
        justifyContent: 'space-between', // Footer를 아래로 밀기
        minHeight: '100%',               // 화면 최소 높이 보장
    },
    landscapePadding: {
        paddingHorizontal: 100,
    },
    flex_1:{
        flex:1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // 배경색을 헤더 배경과 맞춰주세요
    },
});
