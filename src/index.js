import { Tween } from './tween.js';

const tweens = [];
const jobs = [];
const nullFunc = () => {};
const linear = t => t;

let ticking = 0;

const tick = (now) => {
  while (jobs.length) {
    const job = jobs.shift();

    job(now);
  }

  for (let i = 0; i < tweens.length; i++) {
    const tween = tweens[i];

    if (now < tween.start) {
      // not yet started
      continue;
    }

    if (!tween.running) {
      tween.running = true;
      tween.init();
      tween.onstart();
    }

    const t = (now - tween.start) / (tween.end - tween.start);

    tween.tick((t < 1) ? t : 1);
    tween.onprogress(t);

    if (now > tween.end) {
      tween.onend();
      tweens.splice(i--, 1);
    }
  }

  if (jobs.length || tweens.length) {
    ticking = window.requestAnimationFrame(tick);
  } else {
    ticking = 0;
  }
};

export default (handler) => {
  return (target, settings) => {
    const {
      delay = 0,
      duration = 0,
      from = {},
      to = {},
      easing = linear,
      onprogress = nullFunc,
      onstart = nullFunc,
      onend = nullFunc
    } = settings;

    jobs.push((now) => {
      const tween = new Tween(target, handler, {
        start: now + delay,
        end: now + delay + duration,
        from,
        to,
        easing,
        onstart,
        onprogress,
        onend
      });

      tweens.push(tween);
    });
    if (!ticking) {
      ticking = window.requestAnimationFrame(tick);
    }
  };
};
