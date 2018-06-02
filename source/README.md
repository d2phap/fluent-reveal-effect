# Reveal Effect library (Fluent Design System)
Apply reveal effect to border and background of elements.

![Screenshot](https://github.com/d2phap/fluent-ui/raw/master/docs/screenshot.png)

### Demo
https://d2phap.github.io/fluent-reveal-effect/

## Install
Run the command
```
npm i fluent-reveal-effect@latest
```

## Usage

### Import the library
```js
import { FluentRevealEffect } from "fluent-reveal-effect"
```


### Basic CSS
```css
.btn {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
	padding: 1rem 2rem;
	background-color: #333;
	color: #fff;
	border: 0;
	
	transition: all 200ms ease;
}
.btn-border {
	display: inline-block;
	margin: 5px;
}
.btn-border .btn {
	display: block;
	margin: 2px;
}
```


### Apply background effect
#### HTML mockup
```html
<button class="btn">Button 1</button>
```
#### JavaScript
```js
FluentRevealEffect.applyEffect(".btn", {
	lightColor: "rgba(255,255,255,0.1)",
	gradientSize: 150
})
```

#### Enable Ripple click effect
````js
FluentRevealEffect.applyEffect(".btn", {
	clickEffect: true
})
````

### Apply border and background effect
#### HTML mockup
```html
<div class="effect-group-container">
    <div class="btn-border">
        <button class="btn">Button 2</button>
    </div>
    <div class="btn-border">
        <button class="btn">Button 3</button>
    </div>
    <div class="btn-border">
        <button class="btn">Button 4</button>
    </div>
</div>
```

#### JavaScript
```js
FluentRevealEffect.applyEffect(".effect-group-container", {
	clickEffect: true,
	lightColor: "rgba(255,255,255,0.6)",
	gradientSize: 80,
	isContainer: true,
	children: {
		borderSelector: ".btn-border",
		elementSelector: ".btn",
		lightColor: "rgba(255,255,255,0.3)",
		gradientSize: 150
	}
})
```

## Donate
If you feel this little library useful to you, it would go a great way to ensuring that I can afford to take the time to continue to develop it.

Thanks for your gratitude and finance help!

<a href="https://www.paypal.me/d2phap" target="_blank" title="Buy me a beer?">
<img src="https://img.shields.io/badge/PayPal-Donate%20$10%20-009be1.svg?maxAge=3600" height="30" alt="Buy me a beer?">
</a>

