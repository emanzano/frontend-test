var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: 'dist',
        filename: 'js/bundle.js',
        publicPath: '/public'
    },
    module: {
        loaders: [
            {
                test: /\.js$|.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
				test: /\.scss$/,
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/style.css',
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/views/template.html',
            filename: './index.html'
		}),
		new HtmlWebpackPlugin({
			template: './src/views/error.html',
            filename: './error.html'
		}),

    ]
}