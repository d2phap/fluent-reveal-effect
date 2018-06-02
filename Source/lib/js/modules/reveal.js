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


export default class FluentRevealEffect {


	static applyTo(selector, options = {}) {

		let is_pressed = false

		let _options = {
			lightColor: "rgba(255,255,255,0.25)",
			gradientSize: 150,
			clickEffect: false,
			isContainer: false,
			children: {
				borderSelector: ".btn-border",
				elementSelector: ".btn",
				lightColor: "rgba(255,255,255,0.25)",
				gradientSize: 150
			}
		}

		// update options
		_options = Object.assign(_options, options)
		let els = preProcessElements(document.querySelectorAll(selector))
		
		


		function clearEffect(element) {
			element.el.style.backgroundImage = element.oriBg
		}


		function enableBackgroundEffects(element, lightColor, gradientSize) {
			
			//element background effect --------------------
			element.el.addEventListener("mousemove", (e) => {
				let x = e.pageX - getOffset(element).left
				let y = e.pageY - getOffset(element).top

				if (_options.clickEffect && is_pressed) {

					let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`

					drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
				}
				else {
					drawEffect(element, x, y, lightColor, gradientSize)
				}	
			})


			element.el.addEventListener("mouseleave", (e) => {
				clearEffect(element)
			})
		}



		function enableClickEffects(element, lightColor, gradientSize) {
			element.el.addEventListener("mousedown", (e) => {
				is_pressed = true
				let x = e.pageX - getOffset(element).left
				let y = e.pageY - getOffset(element).top
		
				let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`
		
				drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
			})
		
			element.el.addEventListener("mouseup", (e) => {
				is_pressed = false
				let x = e.pageX - getOffset(element).left
				let y = e.pageY - getOffset(element).top
		
				drawEffect(element, x, y, lightColor, gradientSize)
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
				let childrenBorder = _options.isContainer ? preProcessElements(document.querySelectorAll(_options.children.borderSelector)) : []

				
				//Container *********************************************
				//add border effect
				element.el.addEventListener("mousemove", (e) => {
					for (let i = 0; i < childrenBorder.length; i++) {
						let x = e.pageX - getOffset(childrenBorder[i]).left
						let y = e.pageY - getOffset(childrenBorder[i]).top

						drawEffect(childrenBorder[i], x, y, _options.lightColor, _options.gradientSize)
					}
				})

				//clear border light effect
				element.el.addEventListener("mouseleave", (e) => {
					for (let i = 0; i < childrenBorder.length; i++) {
						clearEffect(childrenBorder[i])
					}					
				})


				//Children *********************************************
				let children = preProcessElements(element.el.querySelectorAll(_options.children.elementSelector))
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
}



function getOffset(element) {
	return {
		top: element.el.offsetTop,
		left: element.el.offsetLeft
	}
}



function drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect = null) {
	let lightBg

	if (cssLightEffect === null) {
		lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`
	}
	else {
		lightBg = cssLightEffect
	}

	element.el.style.backgroundImage = lightBg
}



function preProcessElements(elements) {
	let res = []

	elements.forEach(el => {
		res.push({
			oriBg: getComputedStyle(el)["background-image"],
			el: el
		})
	})

	return res
}




