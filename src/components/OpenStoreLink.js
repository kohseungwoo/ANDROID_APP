import {Platform, Linking} from 'react-native';

const OpenStoreLink = () => {
    const androidUrl = `https://play.google.com/store/apps/details?id=com.tb_android_app&hl=ko`;
    const iosUrl = ``; // TODO : IOS 주소로 변경해야함. ex. https://apps.apple.com/app/id1606941598

    const storeUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;
    Linking.openURL(storeUrl).catch((err) => {
        console.error('스토어 링크 열기 실패:', err);
    });
};

export default OpenStoreLink;
