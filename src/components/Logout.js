import * as Keychain from 'react-native-keychain';

export const Logout = async (navigation) => {
    await Keychain.resetGenericPassword();
    navigation.reset({
        index: 0,
        routes: [{ name: 'LOGIN' }],
    });
};
