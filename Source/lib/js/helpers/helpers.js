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

function getOffset(element) {
	return {
		top: element.el.getBoundingClientRect().top,
		left: element.el.getBoundingClientRect().left
	};
}

function drawEffect(
	element,
	x,
	y,
	lightColor,
	gradientSize,
	cssLightEffect = null
) {
	let lightBg;

	if (cssLightEffect === null) {
		lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, rgba(255,255,255,0))`;
	} else {
		lightBg = cssLightEffect;
	}

	element.el.style.backgroundImage = lightBg;
}

function preProcessElements(elements) {
	let res = [];

	elements.forEach(el => {
		res.push({
			oriBg: getComputedStyle(el)["background-image"],
			el: el
		});
	});

	return res;
}

function isIntersected(element, cursor_x, cursor_y, gradientSize) {
	let cursor_area = {
		left: cursor_x - gradientSize,
		right: cursor_x + gradientSize,
		top: cursor_y - gradientSize,
		bottom: cursor_y + gradientSize
	}

	let el_area = {
		left: element.el.getBoundingClientRect().left,
		right: element.el.getBoundingClientRect().right,
		top: element.el.getBoundingClientRect().top,
		bottom: element.el.getBoundingClientRect().bottom
	}

	function intersectRect(r1, r2) {
		return !(
			r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top
		)
	}
	

	let result = intersectRect(cursor_area, el_area)

	return result
}


module.exports = { preProcessElements, getOffset, drawEffect, isIntersected };
