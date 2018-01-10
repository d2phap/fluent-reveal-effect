/**********************************************
 * Fluent Design Lighting Effect
 **********************************************/
class FluentLightingEffect {

	static applyTo(selector, options = {}) {

		let is_pressed = false;

		let _options = {
			original_bg: $(selector).css("background-image"),
			light_color: "rgba(255,255,255,0.15)",
			gradient_size: $(selector).outerWidth(),
			click_effect_enable: false,
			click_effect_size: 70
		}

		// update options
		_options = Object.assign(_options, options)


		function drawEffect($element, e, css_light_effect = null) {

			let bg_light;

			if (css_light_effect === null) {
				let x = e.pageX - $element.offset().left
				let y = e.pageY - $element.offset().top

				bg_light = `radial-gradient(circle ${_options.gradient_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0))`
			}
			else {
				bg_light = css_light_effect
			}
	
			$element.css({ "background-image": bg_light })
		}


		function clearEffect($element) {
			$element.css({ "background-image": _options.original_bg })
		}

		
		$(selector).mousemove(function (e) {

			if (_options.click_effect_enable && is_pressed) {

				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top

				let css_light_effect = `radial-gradient(circle ${_options.gradient_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${_options.click_effect_size}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`

				drawEffect($(this), e, css_light_effect)
			}
			else {
				drawEffect($(this), e)
			}
		})


		$(selector).mouseleave(function () {
			clearEffect($(this))
		})
		

		// Click effect
		if (_options.click_effect_enable) {

			$(selector).mousedown(function(e) {
				is_pressed = true;
	
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top
	
				let css_light_effect = `radial-gradient(circle ${_options.gradient_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${_options.click_effect_size}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`
	
				drawEffect($(this), e, css_light_effect)
			});
	
			$(selector).mouseup(function(e) {
				is_pressed = false
				drawEffect($(this), e)
			});
		}

		
	}
}






