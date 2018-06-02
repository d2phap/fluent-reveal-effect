/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_js_main__ = __webpack_require__(2);


// console.log(FluentRevealEffect)






__WEBPACK_IMPORTED_MODULE_0__lib_js_main__["a" /* default */].applyTo(".toolbar", {
	lightColor: "rgba(255,255,255,0.1)",
	gradientSize: 500,
})

__WEBPACK_IMPORTED_MODULE_0__lib_js_main__["a" /* default */].applyTo(".toolbar > .btn", {
	clickEffect: true,
})

__WEBPACK_IMPORTED_MODULE_0__lib_js_main__["a" /* default */].applyTo(".effect-group-container", {
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






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(3);
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



class FluentRevealEffect {


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
		let els =  __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].preProcessElements(document.querySelectorAll(selector))
		
		


		function clearEffect(element) {
			element.el.style.backgroundImage = element.oriBg
		}


		function enableBackgroundEffects(element, lightColor, gradientSize) {
			
			//element background effect --------------------
			element.el.addEventListener("mousemove", (e) => {
				let x = e.pageX - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).left
				let y = e.pageY - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).top

				if (_options.clickEffect && is_pressed) {

					let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`

					__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
				}
				else {
					__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].drawEffect(element, x, y, lightColor, gradientSize)
				}	
			})


			element.el.addEventListener("mouseleave", (e) => {
				clearEffect(element)
			})
		}



		function enableClickEffects(element, lightColor, gradientSize) {
			element.el.addEventListener("mousedown", (e) => {
				is_pressed = true
				let x = e.pageX - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).left
				let y = e.pageY - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).top
		
				let cssLightEffect = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${lightColor}, rgba(255,255,255,0), rgba(255,255,255,0))`
		
				__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect)
			})
		
			element.el.addEventListener("mouseup", (e) => {
				is_pressed = false
				let x = e.pageX - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).left
				let y = e.pageY - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(element).top
		
				__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].drawEffect(element, x, y, lightColor, gradientSize)
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
				let childrenBorder = _options.isContainer ? __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].preProcessElements(document.querySelectorAll(_options.children.borderSelector)) : []

				
				//Container *********************************************
				//add border effect
				element.el.addEventListener("mousemove", (e) => {
					for (let i = 0; i < childrenBorder.length; i++) {
						let x = e.pageX - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(childrenBorder[i]).left
						let y = e.pageY - __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].getOffset(childrenBorder[i]).top

						__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].drawEffect(childrenBorder[i], x, y, _options.lightColor, _options.gradientSize)
					}
				})

				//clear border light effect
				element.el.addEventListener("mouseleave", (e) => {
					for (let i = 0; i < childrenBorder.length; i++) {
						clearEffect(childrenBorder[i])
					}					
				})


				//Children *********************************************
				let children =  __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* default */].preProcessElements(element.el.querySelectorAll(_options.children.elementSelector))
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
/* harmony export (immutable) */ __webpack_exports__["a"] = FluentRevealEffect;











/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


class Helpers {

	static getOffset(element) {
		return {
			top: element.el.offsetTop,
			left: element.el.offsetLeft
		}
	}



	static drawEffect(element, x, y, lightColor, gradientSize, cssLightEffect = null) {
		let lightBg

		if (cssLightEffect === null) {
			lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`
		}
		else {
			lightBg = cssLightEffect
		}

		element.el.style.backgroundImage = lightBg
	}



	static preProcessElements(elements) {
		let res = []

		elements.forEach(el => {
			res.push({
				oriBg: getComputedStyle(el)["background-image"],
				el: el
			})
		})

		return res
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Helpers;





/***/ })
/******/ ]);