import * as Keychain from 'react-native-keychain';

export const Logout = async (navigation) => {
    global.E2U.INFO('로그아웃 클릭!');

    await Keychain.resetGenericPassword();
    navigation.reset({
        index: 0,
        routes: [{ name: 'LOGIN' }],
    });
};
