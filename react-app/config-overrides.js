const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    crypto: 'crypto-browserify',
    vm: 'vm-browserify',
    buffer: 'buffer',
    stream: 'stream-browserify',
    path: 'path-browserify',
    os: 'os-browserify/browser',
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  )
);
