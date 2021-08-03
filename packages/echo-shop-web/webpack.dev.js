const { merge } = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:5000',
      },
      '/uploads/*': {
        target: 'http://127.0.0.1:5000',
      },
    },
    historyApiFallback: true,
    port: 8081,
  },
  plugins: [
    new StyleLintPlugin(),
  ],
};

module.exports = merge(common, config);
