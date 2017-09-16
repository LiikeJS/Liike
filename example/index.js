import liike from '../src/index.js';

const transform = (target, data) => {
  const { x = 0, y = 0, rotate = 0 } = data;

  target.style.transform = `translate(${x}px, ${y}) rotate(${rotate}deg)`;
};

const tween = liike(transform);
const $liike = document.getElementById('liike');

$liike.textContent = 'Hello Liike!';

tween($liike, {
  delay: 1000,
  duration: 1000,
  easing: 'cubicInOut',
  to: {
    x: 100
  }
});

tween($liike, {
  delay: 1250,
  duration: 1500,
  easing: 'sineInOut',
  to: {
    rotate: 180
  }
});

tween($liike, {
  delay: 2000,
  duration: 1000,
  easing: 'cubicInOut',
  to: {
    x: 0
  }
});

tween($liike, {
  delay: 3000,
  duration: 1000,
  easing: 'quartInOut',
  to: {
    x: 100
  }
});

tween($liike, {
  delay: 3250,
  duration: 1500,
  easing: 'cubicInOut',
  to: {
    rotate: 360
  }
});

tween($liike, {
  delay: 4000,
  duration: 1000,
  easing: 'quartInOut',
  to: {
    x: 0
  }
});
