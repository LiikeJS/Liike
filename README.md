[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?maxAge=60&style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/liike.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/liike)
[![npm](https://img.shields.io/npm/l/liike.svg?maxAge=60&style=flat-square)](https://github.com/liike/liike/blob/master/LICENSE)
[![Join the chat at https://gitter.im/pakastin/liike](https://badges.gitter.im/pakastin/liike.svg)](https://gitter.im/pakastin/liike?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Twitter Follow](https://img.shields.io/twitter/follow/pakastin.svg?style=social&maxAge=60)](https://twitter.com/pakastin)
[![Twitter Follow](https://img.shields.io/twitter/follow/LiikeJS.svg?style=social&maxAge=60)](https://twitter.com/LiikeJS)

# Liike
*Liike* is a Finnish word and means *movement*, *motion*. It's a minimalistic library to create performant custom JS tweens no matter what you're tweening.

# Example


https://liike.js.org
- [Source](https://github.com/pakastin/Liike/blob/master/example/index.js)

# Install
```
npm i liike
```
- ES6 module production: https://liike.js.org/liike.es.min.js (~2.5 KB)
- ES6 module development: https://liike.js.org/liike.es.js (~5 KB)
- UMD production: https://liike.js.org/liike.min.js (~2.5 KB)
- UMD development: https://liike.js.org/liike.js (~5 KB)

# Usage
```js
import liike from 'liike';

const transform = (target, data) => {
  const { x = 0, y = 0, opacity = 1 } = data;

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.style.opacity = opacity;
};

const tween = liike(transform);

const $hello = document.getElementById('hello');

tween($hello, {
  delay: 0,
  duration: 1000,
  easing: 'bounceOut',
  from: {
    y: -100,
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
```

## Tween settings
- delay: After how many milliseconds the tween will start
- duration: How many milliseconds the tween will last
- easing: Check available easing functions [below](#available-easings)
- from: Values to start from
- to: Values to tween to
- onstart: Callback for tween start `onstart(target)`
- onprogress: Callback for progress `onprogress(target, t)`
- onend: Callback for tween end `onend(target)`

## Available easings
- linear
- quadIn, quadOut, quadInOut (power to 2)
- cubicIn, cubicOut, cubicInOut (power to 3)
- quartIn, quartOut, quartInOut (power to 4)
- quintIn, quintOut, quintInOut (power to 5)
- sineIn, sineOut, sineInOut
- bounceIn, bounceOut, bounceInOut

# Browser support
- IE10 or newer (add `requestAnimationFrame` polyfill to support older browsers)

# License
- [MIT](https://github.com/pakastin/Liike/blob/master/LICENSE)
