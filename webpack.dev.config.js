var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ExtractTextPlugin = require("extract-text-webpack-plugin"); var
// autoprefixer = require('autoprefixer'); var precss = require('precss'); var
// cssgrace = require('cssgrace'); var filterGradient =
// require('postcss-filter-gradient'); var atImport = require("postcss-import");
// var postcssUrl = require("postcss-url");
module.exports = {
	context: path.join(__dirname, './examples/scripts'),
	entry: {
		main: './main.js'
	},
	output: {
		path: path.join(__dirname, './'),
		// publicPath: "/bundles/",
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader','postcss-loader']
			}, {test : /\.less$/, use : ['style-loader','css-loader',{loader : 'postcss-loader', options : {
				plugins : function(){
					return [ require('autoprefixer'), require('postcss-clearfix')]
				}
			}},'less-loader']}, {
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/
			},
			// { test : /\.jsx?$/ , loader : 'babel-loader' , query:{ presets :
			// ['es2015','react'] } , exclude: /(node_modules|bower_components)/},
			// 如果不超过30000/1024kb,那么就直接采用dataUrl的形式,超过则返回链接,图片会复制到dist目录下
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
	},

	resolve: {
		modules: [path.join(__dirname), "node_modules"]
	},

	// postcss: function () {
	// 	return [require('autoprefixer'), require('postcss-clearfix')];
	// },
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		// new webpack.optimize.CommonsChunkPlugin("commons", "[name].bundle.js"),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}), 
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'examples/index.html'),
			inject: true
			// filename: '../index.html',
		})
	],
	devtool: '#inline-source-map'
	//devServer 配置在webpack.dev.server.js 中
};