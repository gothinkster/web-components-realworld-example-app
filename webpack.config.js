const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: {
    polyfills: [
      'whatwg-fetch',
      '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
    ],
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      ['https://unpkg.com/navigo@7.1.2']: 'navigo',
      ['https://unpkg.com/es-markdown@0.1.0']: 'es-markdown'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'ie 11' }]]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
