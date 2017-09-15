export class Tween {
  constructor (target, handler, settings) {
    const {
      start,
      end,
      from,
      to,
      easing,
      onstart,
      onprogress,
      onend
    } = settings;

    this.target = target;
    this.handler = handler;

    this.start = start;
    this.end = end;

    this.easing = easing;

    this.from = from;
    this.to = to;
    this.keys = [];

    this.onstart = onstart;
    this.onprogress = onprogress;
    this.onend = onend;

    this.running = false;

    this.store = target.__liike || (target.__liike = {});
  }
  init () {
    const { from, to, keys } = this;

    for (const key in to) {
      if (!(key in from)) {
        from[key] = this.store[key] || 0;
      }
      keys.push(key);
    }

    for (const key in from) {
      if (!(key in to)) {
        to[key] = this.store[key] || 0;
        keys.push(key);
      }
    }
  }
  tick (t) {
    const { keys, from, to, easing } = this;

    const e = easing(t);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      this.store[key] = from[key] + (to[key] - from[key]) * e;
    }

    this.handler(this.target, this.store);
  }
}
