// 페이지 이동 함수
export const moveScreen = (navigation, rootScreen, screenName) => {
    navigation.navigate(rootScreen, {
        screen: screenName,
    });
};
