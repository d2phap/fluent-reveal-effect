# Reveal Effect library (Fluent Design System)
Apply reveal effect to border and background of elements.

[![NPM Downloads](https://img.shields.io/npm/d18m/fluent-reveal-effect)](https://www.npmjs.com/package/fluent-reveal-effect)

<img width="884" height="580" alt="image" src="https://github.com/user-attachments/assets/f333821f-2269-4604-832b-bf5d4d2e7510" />

### Demo
See the [Demo project](https://github.com/d2phap/fluent-reveal-effect/tree/main/demo) for detail or visit https://imageglass.org for live demo.

## Install
Run the command
```bash
npm i fluent-reveal-effect@latest
```

NPM package: https://www.npmjs.com/package/fluent-reveal-effect

## Usage
### Base CSS
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


### 1. Apply background effect
#### HTML
```html
<button class="btn">Button 1</button>
```
#### JavaScript
```ts
import { applyEffect } from "fluent-reveal-effect"

// Enable reveal background effect
applyEffect('.btn', {
  lightColor: 'rgba(255,255,255,0.1)',
  gradientSize: 150,
});

// Enable Ripple click effect
applyEffect('.btn', {
  clickEffect: true,
});
````

### 2. Apply border and background effect
#### HTML
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
```ts
import { applyEffect } from "fluent-reveal-effect"

applyEffect('.effect-group-container', {
  clickEffect: true,
  lightColor: 'rgba(255,255,255,0.6)',
  gradientSize: 80,
  isContainer: true,
  children: {
    borderSelector: '.btn-border',
    elementSelector: '.btn',
    lightColor: 'rgba(255,255,255,0.3)',
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



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fd2phap%2Ffluent-reveal-effect.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fd2phap%2Ffluent-reveal-effect?ref=badge_large)
