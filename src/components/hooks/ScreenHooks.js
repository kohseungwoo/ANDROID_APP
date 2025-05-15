// 페이지 이동 함수
export const moveScreen = (navigation, screenName) => {
    navigation.navigate(screenName);
};

export const moveParamScreen = (navigation, screenName, params = {}) => {
    navigation.navigate(screenName, params);
};

export const moveRootScreen = (navigation, rootScreen, screenName) => {
    navigation.navigate(rootScreen, {
        screen: screenName,
    });
};
