import DeviceInfo from 'react-native-device-info';

const Config = {
    ENV : "PROD",
    DEBUG : true,
    APP_VERSION         : DeviceInfo.getBuildNumber(),
    DEV_API_URL         : "https://tetms.e2u.kr",
    STG_API_URL         : "https://tstms.e2u.kr",
    PROD_API_URL        : "https://etms.e2u.kr",
    DEV_ADMIN_URL       : "https://teadmin.e2u.kr",
    STG_ADMIN_URL       : "https://tsadmin.e2u.kr",
    PROD_ADMIN_URL      : "https://admin.e2u.kr",
    NETWORK_TIMEOUT     : 30000,
    CONTENT_TYPE_JSON   : { 'Content-Type': 'application/json' },
};

export default Config;
