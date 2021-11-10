const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: path.resolve(__dirname, 'postcss.config.js'),
    },
  },
};
const isProduction = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js', // hash, contenthash, chunkhash
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              'sass-loader',
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postcssLoader,
              'sass-loader',
            ],
          },
        ],
      },
      {
        test: /\.hbs$/i,
        use: ['handlebars-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: () => {
            if (!isProduction) {
              return '[path][name][ext]';
            }
            return 'images/[contenthash][ext]';
          },
        },
      },
      {
        // fontawesome
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'compiled/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /.js/,
        exclude: /node_module/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './template.hbs',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: true,
    }),
  ],
};
