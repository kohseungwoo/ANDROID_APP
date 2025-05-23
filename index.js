import {AppRegistry} from 'react-native';
import App from './App';
import Config from './src/components/Config';
import {name as appName} from './app.json';


/* 전역 변수 설정 */
for (const key in Config) {
    if (Object.prototype.hasOwnProperty.call(Config, key)) {
        global[key] = Config[key];
    }
}
global.E2U_API_URL = Config[`E2U_${Config.E2U_ENV}_API_URL`];

AppRegistry.registerComponent(appName, () => App);
