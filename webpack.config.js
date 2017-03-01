var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: 'dist/js',
        filename: 'bundle.js'
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
            filename: 'public/styles/style.css',
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/views/template.html',
            filename: './dist/index.html',
			files: {
				css: ['./styles/style.css'],
				js: ['./js/bundle.js'],
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/views/error.html',
            filename: './dist/error.html',
			files: {
				css: ['./styles/style.css'],
			}
		}),

    ]
}