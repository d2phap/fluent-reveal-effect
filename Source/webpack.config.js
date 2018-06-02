var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin(
	"./dist/css/fluent-reveal-effect.css",
	{
		allChunks: true
	}
);

module.exports = [
	{
		name: "library",
		entry: ["./index.js", "./lib/scss/main.scss"],
		output: {
			filename: "./dist/js/fluent-reveal-effect.js"
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
	},
	{
		name: "demo",
		entry: ["./demo/index.js"],
		output: {
			filename: "./demo/main.js"
		},
		module: {}
	}
];
