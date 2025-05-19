module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {
      useTransformReactJSXExperimental: true,
    }],
  ],
  plugins: [
    'react-native-reanimated/plugin', // 꼭 맨 아래에 위치해야 합니다!
  ],
};
