var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin("../Dist/css/fluent-ui.css", {
	allChunks: true
});

module.exports = {
	entry: "./lib/js/main.js",
	output: {
		filename: "../Dist/js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "sass-loader"
						}
					],
					// use style-loader in development
					fallback: "style-loader"
				})
			}
		]
	},
	plugins: [extractSass]
};
