var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: ['whatwg-fetch', './app/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),

        new CopyWebpackPlugin([{
            context: './app',
            from: '**/*.html',
        }]),
        new webpack.IgnorePlugin(/vertx/)
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {plugins: ['transform-decorators-legacy']}
            }
        ]
    }
}
