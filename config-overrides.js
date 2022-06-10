const webpack = require("webpack")

module.exports = function override(config) {
    config.resolve.fallback = {
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      assert: require.resolve("assert/"),
      fs: false
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );
    config.module.rules.push(
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    })

    return config;
};