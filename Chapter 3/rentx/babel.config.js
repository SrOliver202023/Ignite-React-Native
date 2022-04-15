// @generated: @expo/next-adapter@4.0.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: [
    '@expo/next-adapter/babel',
    // 'babel-preset-expo'
  ],
  plugins: [
    [
      'styled-components', { 'ssr': true },
      // ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ],
  ],
};
