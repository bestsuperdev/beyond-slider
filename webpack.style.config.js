var path = require('path')
var webpack = require('webpack')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var autoprefixer = require('autoprefixer');
// var precss = require('precss');
// var cssgrace = require('cssgrace');
// var filterGradient = require('postcss-filter-gradient');
// var atImport = require("postcss-import");
// var postcssUrl = require("postcss-url");
module.exports = {
    entry: {
        index : path.join(__dirname,"./styles/index.less")
    },
    output: {
        path: path.join(__dirname,'lib'),
        // publicPath: "/bundles/",
        filename: "[name].css"
    },
    module: {
        loaders: [
            // { test : /\.css$/,  loader : ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')},
            // { test : /\.less$/, loader : ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader!less-loader')},
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
            { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
            { test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : "file-loader"}
        ]
    },

    resolve : {
        modules: [path.join(__dirname),"node_modules"]
        // root : path.resolve('./')
    },

    // postcss: function () {
    //     return [require('autoprefixer') , require('postcss-clearfix')];
    // },
    plugins : [ 
        new webpack.DefinePlugin({
           "process.env" : {
                NODE_ENV : JSON.stringify("production")
            }
        }),
       new ExtractTextPlugin({
			filename : '[name].css',
			allChunks : true,
			disable : false
		})
    ]
    // debug : true,
    // devtool : 'cheap-module-eval-source-map'
    //devServer 配置在webpack.dev.server.js 中
};