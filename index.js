import {AppRegistry} from 'react-native';
import App from './App';
import Config from './src/components/Config';
import Log from './src/components/LogContent';
import {name as appName} from './app.json';

/* 전역 변수 설정 */
global.E2U = Config;
E2U.API_URL   = Config[`${Config.ENV}_API_URL`];
E2U.ADMIN_URL = Config[`${Config.ENV}_ADMIN_URL`];
E2U.INFO  = Log.INFO;
E2U.WARN  = Log.WARN;
E2U.ERROR = Log.ERROR;

console.log(`ENV : ${E2U?.ENV}`);
E2U.INFO(`API_URL : ${E2U?.API_URL}`);
E2U.INFO(`ADMIN_URL : ${E2U?.ADMIN_URL}`);

AppRegistry.registerComponent(appName, () => App);
