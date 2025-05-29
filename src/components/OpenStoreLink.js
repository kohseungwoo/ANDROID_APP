import {Platform, Linking} from 'react-native';

const OpenStoreLink = () => {
    const androidUrl = `https://play.google.com/store/apps/details?id=com.einnovation.temu`;
    const iosUrl = `https://apps.apple.com/app/id1606941598`;

    const storeUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;
    Linking.openURL(storeUrl).catch((err) => {
        console.error('스토어 링크 열기 실패:', err);
    });
};

export default OpenStoreLink;
