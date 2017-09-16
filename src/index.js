import liike from './liike.js';

const easeInBy = power => t => Math.pow(t, power);
const easeOutBy = power => t => 1 - Math.abs(Math.pow(t - 1, power));
const easeInOutBy = power => t => t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;

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
  easing: easeInOutBy(3),
  to: {
    x: 100
  }
});

tween($liike, {
  delay: 1250,
  duration: 1500,
  easing: easeInOutBy(3),
  to: {
    rotate: 180
  }
});

tween($liike, {
  delay: 2000,
  duration: 1000,
  easing: easeInOutBy(3),
  to: {
    x: 0
  }
});
