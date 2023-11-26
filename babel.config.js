process.env.EXPO_ROUTER_APP_ROOT = '../../src/pages';
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      ['expo-router/babel'],
      ['react-native-reanimated/plugin'],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
