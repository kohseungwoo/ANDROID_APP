import {AppRegistry} from 'react-native';
import App from './App';
import Config from './src/components/Config';
import Log from './src/components/LogContent';
import {name as appName} from './app.json';

/* 전역 변수 설정 */
global.E2U = Config;
global.E2U.API_URL   = Config[`${Config.ENV}_API_URL`];
global.E2U.ADMIN_URL = Config[`${Config.ENV}_ADMIN_URL`];
global.E2U.INFO  = Log.INFO;
global.E2U.WARN  = Log.WARN;
global.E2U.ERROR = Log.ERROR;

console.log(`ENV : ${global.E2U?.ENV}`);
global.E2U.INFO(`API_URL : ${global.E2U?.API_URL}`);
global.E2U.INFO(`ADMIN_URL : ${global.E2U?.ADMIN_URL}`);

AppRegistry.registerComponent(appName, () => App);
