(function () {
'use strict';

var Tween = function Tween (target, handler, settings) {
  var start = settings.start;
  var end = settings.end;
  var from = settings.from;
  var to = settings.to;
  var easing = settings.easing;
  var onstart = settings.onstart;
  var onprogress = settings.onprogress;
  var onend = settings.onend;

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
};
Tween.prototype.init = function init () {
    var this$1 = this;

  var ref = this;
    var from = ref.from;
    var to = ref.to;
    var keys = ref.keys;

  for (var key in to) {
    if (!(key in from)) {
      from[key] = this$1.store[key] || 0;
    }
    keys.push(key);
  }

  for (var key$1 in from) {
    if (!(key$1 in to)) {
      to[key$1] = this$1.store[key$1] || 0;
      keys.push(key$1);
    }
  }
};
Tween.prototype.tick = function tick (t) {
    var this$1 = this;

  var ref = this;
    var keys = ref.keys;
    var from = ref.from;
    var to = ref.to;
    var easing = ref.easing;

  var e = easing(t);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    this$1.store[key] = from[key] + (to[key] - from[key]) * e;
  }

  this.handler(this.target, this.store);
};

var tweens = [];
var jobs = [];
var nullFunc = function () {};
var linear = function (t) { return t; };

var ticking = 0;

var tick = function (now) {
  while (jobs.length) {
    var job = jobs.shift();

    job(now);
  }

  for (var i = 0; i < tweens.length; i++) {
    var tween = tweens[i];

    if (now < tween.start) {
      // not yet started
      continue;
    }

    if (!tween.running) {
      tween.running = true;
      tween.init();
      tween.onstart();
    }

    var t = (now - tween.start) / (tween.end - tween.start);

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

var liike = function (handler) {
  return function (target, settings) {
    var delay = settings.delay; if ( delay === void 0 ) delay = 0;
    var duration = settings.duration; if ( duration === void 0 ) duration = 0;
    var from = settings.from; if ( from === void 0 ) from = {};
    var to = settings.to; if ( to === void 0 ) to = {};
    var easing = settings.easing; if ( easing === void 0 ) easing = linear;
    var onprogress = settings.onprogress; if ( onprogress === void 0 ) onprogress = nullFunc;
    var onstart = settings.onstart; if ( onstart === void 0 ) onstart = nullFunc;
    var onend = settings.onend; if ( onend === void 0 ) onend = nullFunc;

    jobs.push(function (now) {
      var tween = new Tween(target, handler, {
        start: now + delay,
        end: now + delay + duration,
        from: from,
        to: to,
        easing: easing,
        onstart: onstart,
        onprogress: onprogress,
        onend: onend
      });

      tweens.push(tween);
    });
    if (!ticking) {
      ticking = window.requestAnimationFrame(tick);
    }
  };
};

var easeInBy = function (power) { return function (t) { return Math.pow(t, power); }; };
var easeOutBy = function (power) { return function (t) { return 1 - Math.abs(Math.pow(t - 1, power)); }; };
var easeInOutBy = function (power) { return function (t) { return t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5; }; };

var transform = function (target, data) {
  var x = data.x; if ( x === void 0 ) x = 0;
  var y = data.y; if ( y === void 0 ) y = 0;
  var rotate = data.rotate; if ( rotate === void 0 ) rotate = 0;

  target.style.transform = "translate(" + x + "px, " + y + ") rotate(" + rotate + "deg)";
};

var tween = liike(transform);
var $liike = document.getElementById('liike');

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

}());
