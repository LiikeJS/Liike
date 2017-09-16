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
  easing: 'bounce',
  from: {
    y: -100,
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
```

# License
- [MIT](https://github.com/pakastin/Liike/blob/master/LICENSE)
