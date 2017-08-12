let path = require("path")
let webpack = require("webpack")

module.exports = {
	entry: "./src/focusFrame.js"
	, output: {
		filename: 'focusFrame.js'
		, publicPath: '/build'
		, path: path.resolve(__dirname, "build")
		}
	, devtool: 'source-map'
	, module: {
		loaders: [
			{
				test: /\.js$/
				, loader: "babel-loader"
				, exclude: /node_modules/
				}
			]
		}
	, stats: {
		colors: true
		}
	, devtool: "source-map"
}
