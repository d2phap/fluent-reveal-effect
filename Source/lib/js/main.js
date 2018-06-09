/*
Reveal Effect
https://github.com/d2phap/fluent-reveal-effect

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

var Helpers = require("./helpers/helpers")


function applyEffect(selector, options = {}) {
	
	let is_pressed = false

	let _options = {
		lightColor: "rgba(255,255,255,0.25)",
		gradientSize: 150,
		clickEffect: false,
		isContainer: false,
		children: {
			borderSelector: ".eff-reveal-border",
			elementSelector: ".eff-reveal",
			lightColor: "rgba(255,255,255,0.25)",
			gradientSize: 150
		}
	}

	// update options
	_options = Object.assign(_options, options)
	let els =  Helpers.preProcessElements(document.querySelectorAll(selector))
	
	


	function clearEffect(element) {
		is_pressed = false
		element.el.style.backgroundImage = element.oriBg
	}


	function enableBackgroundEffects(element, lightColor, gradientSize) {
		
		//element background effect --------------------
		element.el.addEventListener("mousemove", (e) => {
			let x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			let y = e.pageY - Helpers.getOffset(element).top - window.scrollY

			if (_options.clickEffect && is_pressed) {

				let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`

				Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
			}
			else {
				Helpers.drawEffect(element, x, y, lightColor, gradientSize)
			}	
		})


		element.el.addEventListener("mouseleave", (e) => {
			clearEffect(element)
		})
	}



	function enableClickEffects(element, lightColor, gradientSize) {
		element.el.addEventListener("mousedown", (e) => {
			is_pressed = true
			let x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			let y = e.pageY - Helpers.getOffset(element).top - window.scrollY
	
			let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`
	
			Helpers.drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
		})
	
		element.el.addEventListener("mouseup", (e) => {
			is_pressed = false
			let x = e.pageX - Helpers.getOffset(element).left - window.scrollX
			let y = e.pageY - Helpers.getOffset(element).top - window.scrollY
	
			Helpers.drawEffect(element, x, y, lightColor, gradientSize)
		})
	}




	//Children *********************************************
	if (!_options.isContainer) {

		//element background effect
		els.forEach(element => {
			enableBackgroundEffects(element, _options.lightColor, _options.gradientSize)

			//element click effect
			if (_options.clickEffect) {
				enableClickEffects(element, _options.lightColor, _options.gradientSize)
			}
		})
		
	}
	//Container *********************************************
	else {

		els.forEach(element => {

			// get border items list
			let childrenBorder = _options.isContainer ? Helpers.preProcessElements(document.querySelectorAll(_options.children.borderSelector)) : []

			
			//Container *********************************************
			//add border effect
			element.el.addEventListener("mousemove", (e) => {
				for (let i = 0; i < childrenBorder.length; i++) {
					let x = e.pageX - Helpers.getOffset(childrenBorder[i]).left - window.scrollX
					let y = e.pageY - Helpers.getOffset(childrenBorder[i]).top - window.scrollY

					if (Helpers.isIntersected(childrenBorder[i], e.clientX, e.clientY, _options.gradientSize)) {
						Helpers.drawEffect(childrenBorder[i], x, y, _options.lightColor, _options.gradientSize)
					}
					else {
						clearEffect(childrenBorder[i])
					}

				}

			})

			//clear border light effect
			element.el.addEventListener("mouseleave", (e) => {
				for (let i = 0; i < childrenBorder.length; i++) {
					clearEffect(childrenBorder[i])
				}					
			})


			//Children *********************************************
			let children =  Helpers.preProcessElements(element.el.querySelectorAll(_options.children.elementSelector))
			// console.log(children)

			for (let i = 0; i < children.length; i++) {

				//element background effect
				enableBackgroundEffects(children[i], _options.children.lightColor, _options.children.gradientSize)

				//element click effect
				if (_options.clickEffect) {
					enableClickEffects(children[i], _options.children.lightColor, _options.children.gradientSize)
				}
			}

		})

	}
}




module.exports = { applyEffect }

