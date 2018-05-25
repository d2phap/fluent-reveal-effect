

RevealEffect.applyTo(".toolbar", {
	light_color: "rgba(255,255,255,0.1)",
	gradient_size: 500,
})

RevealEffect.applyTo(".toolbar > .btn", {
	click_effect: true,
})

RevealEffect.applyTo(".effect-group-container", {
	click_effect: true,
	light_color: "rgba(255,255,255,0.6)",
	gradient_size: 80,
	is_container: true,
	children: {
		border: ".btn-border",
		el: ".btn",
		light_color: "rgba(255,255,255,0.3)",
		gradient_size: 150,
	}
})




