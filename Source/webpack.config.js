module.exports = [
	{
		name: "library",
		entry: [
			"./index.js"
		],
		output: {
			filename: "./dist/js/fluent-reveal-effect.js"
		},
		module: {
			rules: [
			]
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
