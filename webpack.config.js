var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
});
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {plugins: ['transform-decorators-legacy']}
            },
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new CopyWebpackPlugin([{
        context: './client',
        from: '**/*.html',
    }])],
    devServer: {
        hot: true,
        contentBase: './',
        historyApiFallback: true
    }
};
