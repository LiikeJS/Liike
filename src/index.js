import liike from './liike.js';

const transform = (target, data) => {
  const { x = 0, y = 0, rotate = 0 } = data;

  target.style.transform = `translate(${x}px, ${y}) rotate(${rotate}deg)`;
};

const tween = liike(transform);

const easeInBy = power => t => Math.pow(t, power);

const easeOutBy = power => t => 1 - Math.abs(Math.pow(t - 1, power));

const easeInOutBy = power => t => t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;

tween(document.getElementById('liike'), {
  delay: 0,
  duration: 1000,
  easing: easeInOutBy(3),
  to: {
    x: 100
  }
});

tween(document.getElementById('liike'), {
  delay: 250,
  duration: 1500,
  easing: easeInOutBy(3),
  to: {
    rotate: 180
  }
});

tween(document.getElementById('liike'), {
  delay: 1000,
  duration: 1000,
  easing: easeInOutBy(3),
  to: {
    x: 0
  }
});
