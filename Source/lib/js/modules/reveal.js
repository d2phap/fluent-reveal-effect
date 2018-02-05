/*
Reveal Effect
https://github.com/d2phap/fluent-ui

MIT License
Copyright (c) 2018 Duong Dieu Phap

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export class RevealEffect {

	static info() {
		return {
			"version": "0.1",
			"author": "Duong Dieu Phap",
			"url": "https://github.com/d2phap/fluent-ui"
		}
	}

	static applyTo(selector, options = {}) {

		let is_pressed = false;

		let _options = {
			original_bg: $(selector).css("background-image"),
			light_color: "rgba(255,255,255,0.2)",
			light_effect_size: $(selector).outerWidth(),
			click_effect_enable: true,
			click_effect_size: 70
		}

		// update options
		_options = Object.assign(_options, options)


		function drawEffect($element, e, css_light_effect = null) {

			let bg_light;

			if (css_light_effect === null) {
				let x = e.pageX - $element.offset().left
				let y = e.pageY - $element.offset().top

				bg_light = `radial-gradient(circle ${_options.light_effect_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0))`
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

				let css_light_effect = `radial-gradient(circle ${_options.light_effect_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${_options.click_effect_size}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`

				drawEffect($(this), e, css_light_effect)
			}
			else {
				drawEffect($(this), e)
			}
		})


		$(selector).mouseleave(function () {
			is_pressed = false
			clearEffect($(this))
		})
		

		// Click effect
		if (_options.click_effect_enable) {

			$(selector).mousedown(function(e) {
				is_pressed = true;
	
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top
	
				let css_light_effect = `radial-gradient(circle ${_options.light_effect_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${_options.click_effect_size}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`
	
				drawEffect($(this), e, css_light_effect)
			});
	
			$(selector).mouseup(function(e) {
				is_pressed = false
				drawEffect($(this), e)
			});
		}
	}
}






