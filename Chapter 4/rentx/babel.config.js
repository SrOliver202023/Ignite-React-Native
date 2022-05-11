// @generated: @expo/next-adapter@4.0.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [

      '@expo/next-adapter/babel',
      // "module:metro-react-native-babel-preset"
      // 'babel-preset-expo'
    ],
    plugins: [
      'styled-components',
      // { 'ssr': true },
      'react-native-reanimated/plugin',
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ],
  };
};
