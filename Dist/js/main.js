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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_modules_reveal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_modules_reveal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_modules_reveal__);






/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

class RevealEffect {

	static info() {
		return {
			"version": "0.2",
			"author": "Duong Dieu Phap",
			"url": "https://github.com/d2phap/fluent-ui"
		}
	}

	static applyTo(selector, options = {}) {

		let is_pressed = false;

		let _options = {
			original_bg: $(selector).css("background-image"),
			light_color: "rgba(255,255,255,0.25)",
			gradient_size: $(selector).outerWidth(),
			click_effect: false,
			is_container: false,
			children: {
				border: ".btn-border",
				el: ".btn"
			}
		}

		// update options
		_options = Object.assign(_options, options)


		function drawEffect($element, x, y, css_light_effect = null) {

			let bg_light;

			if (css_light_effect === null) {

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


		function enableBackgroundEffects($element) {
			//element background effect --------------------
			$element.mousemove(function (e) {
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top

				if (_options.click_effect && is_pressed) {

					let css_light_effect = `radial-gradient(circle ${_options.gradient_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`

					drawEffect($(this), x, y, css_light_effect)
				}
				else {
					drawEffect($(this), x, y)
				}
			})


			$element.mouseleave(function () {
				clearEffect($(this))
			})
		}


		function enableClickEffects($element) {
			$element.mousedown(function(e) {
				is_pressed = true;
	
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top
	
				let css_light_effect = `radial-gradient(circle ${_options.gradient_size}px at ${x}px ${y}px, ${_options.light_color}, rgba(255,255,255,0)), radial-gradient(circle ${70}px at ${x}px ${y}px, rgba(255,255,255,0), ${_options.light_color}, rgba(255,255,255,0), rgba(255,255,255,0))`
	
				drawEffect($(this), x, y, css_light_effect)
			});
	
			$element.mouseup(function(e) {
				is_pressed = false
				let x = e.pageX - $(this).offset().left
				let y = e.pageY - $(this).offset().top

				drawEffect($(this), x, y)
			});
		}



		// element background effect
		if (!_options.is_container) {

			//element background effect --------------------
			enableBackgroundEffects($(selector))

			//element click effect --------------------
			if (_options.click_effect) {
				enableClickEffects($(selector))
			}
			
		}
		//container effects
		else {

			//border effect ----------------------------
			$(selector).mousemove(function (e) {

				let items = $(_options.children.border).toArray()

				for (let i = 0; i < items.length; i++) {
					let x = e.pageX - $(items[i]).offset().left
					let y = e.pageY - $(items[i]).offset().top

					drawEffect($(items[i]), x, y)
				}
			})

			$(selector).mouseleave(function (e) {
				clearEffect($(_options.children.border))
			})


			//element background effect --------------------
			enableBackgroundEffects($(selector).find(_options.children.el))

			//element click effect --------------------
			if (_options.click_effect) {
				enableClickEffects($(selector).find(_options.children.el))
			}

		}

		
	}


}








/***/ })
/******/ ]);