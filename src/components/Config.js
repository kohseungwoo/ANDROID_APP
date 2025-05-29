import DeviceInfo from 'react-native-device-info';

const Config = {
    APP_VERSION : DeviceInfo.getBuildNumber(),
    ENV : "DEV",
    DEBUG : true,
    DEV_API_URL  : "https://tetms.e2u.kr",
    STG_API_URL  : "https://tstms.e2u.kr",
    PROD_API_URL : "https://etms.e2u.kr",
    DEV_ADMIN_URL : "https://teadmin.e2u.kr",
    STG_ADMIN_URL : "https://tsadmin.e2u.kr",
    PROD_ADMIN_URL : "https://admin.e2u.kr",
    CONTENT_TYPE_JSON : { 'Content-Type': 'application/json' },
};

export default Config;
