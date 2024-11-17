module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        // Use babel-preset-expo and configure it for nativewind
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      ],
      plugins: [
        // Only include the required plugins
        "react-native-reanimated/plugin",
      ],
    };
  };
  