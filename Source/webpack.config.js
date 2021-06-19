const path = require("path");

module.exports = [
	{
		name: "library",
		entry: path.join(__dirname, "src", "index.ts"),
		output: {
			filename: "./js/fluent-reveal-effect.js"
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_moduels/,
				},
			],
		},
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
