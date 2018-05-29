

RevealEffect.applyTo(".toolbar", {
	lightColor: "rgba(255,255,255,0.1)",
	gradientSize: 500,
})

RevealEffect.applyTo(".toolbar > .btn", {
	clickEffect: true,
})

RevealEffect.applyTo(".effect-group-container", {
	clickEffect: true,
	lightColor: "rgba(255,255,255,0.6)",
	gradientSize: 80,
	isContainer: true,
	children: {
		borderSelector: ".btn-border",
		elementSelector: ".btn",
		lightColor: "rgba(255,255,255,0.3)",
		gradientSize: 150,
	}
})




