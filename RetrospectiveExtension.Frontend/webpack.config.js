const webpack = require('webpack');
const path = require('path');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, '');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    https: true,
    port: 3000,
    static: {
      directory: path.join(__dirname),
    }
  },
  entry: `${APP_DIR}/index.tsx`,
  output: {
    publicPath: '/dist/',
    path: BUILD_DIR,
    filename: './reflect-bundle.js',
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      process: 'process/browser',
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
    },
    extensions: ['.ts', '.js', '.jsx', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts|.js|.tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader'
        }
      },
      { test: /(\.css$)/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_BUILDNUMBER: JSON.stringify(process.env.BUILD_BUILDNUMBER),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ]
}
