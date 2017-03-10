var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var es3ifyPlugin = require('es3ify-webpack-plugin')
// var autoprefixer = require('autoprefixer');
// var precss = require('precss');
// var cssgrace = require('cssgrace');
// var filterGradient = require('postcss-filter-gradient');
// var atImport = require("postcss-import");
// var postcssUrl = require("postcss-url");
module.exports = {
    entry: {
        main : path.join(__dirname,"./examples/scripts/main.js")   
    },
    output: {
        path: path.join(__dirname,'dist'),
        // publicPath: "/bundles/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        rules : [
			{test : /\.less$/, use : ExtractTextPlugin.extract({
				fallback : 'style-loader',
				use : ['css-loader',{loader : 'postcss-loader', options : {
					plugins : function(){
						return [ require('autoprefixer')]
					}
				}},'less-loader'],
				publicPath : ''
			})},
			{test : /\.css$/, use : ExtractTextPlugin.extract({
				fallback : 'style-loader',
				use : 'css-loader',
				publicPath : ''
			})},
			{test : /\.jsx?$/, loader : 'babel-loader' , exclude: /node_modules/},
			{test: /\.(png|jpg|jpeg|gif)$/, use:[{loader : 'url-loader', options : {limit : 30000}}]},
			{test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : 'file-loader'}
		]
    },

    resolve : {
        modules: [path.join(__dirname),"node_modules"]
        // root : path.resolve('./')
    },
    externals : {
		'react' : 'React',
		'react-dom' : 'ReactDOM'
	},

    // postcss: function () {
    //     return [require('autoprefixer') , require('postcss-clearfix')];
    // },
    plugins : [
        new es3ifyPlugin(), 
        new webpack.DefinePlugin({
           "process.env" : {
                NODE_ENV : JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin({
			filename : '[name].[chunkhash].bundle.css',
			allChunks : true,
			disable : false
		}),
        // new webpack.optimize.CommonsChunkPlugin("commons", "[name].bundle.js"),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : path.join(__dirname,'./examples/dist.html'),
            inject: true
            // filename: '../index.html',
        })
    ]
    // debug : true,
    // devtool : 'cheap-module-eval-source-map'
    //devServer 配置在webpack.dev.server.js 中
};