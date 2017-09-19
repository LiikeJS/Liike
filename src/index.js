import { Tween } from './tween.js';
import * as ease from './ease';

const [ tweens, jobs, nullFunc ] = [ [], [], () => {} ];

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
      tween.onstart(tween.target);
    }

    const t = (now - tween.start) / (tween.end - tween.start);

    tween.tick((t < 1) ? t : 1);
    tween.onprogress(tween.target, t);

    if (now > tween.end) {
      tween.onend(tween.target);
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
      easing = 'linear',
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
        easing: ease[easing],
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
