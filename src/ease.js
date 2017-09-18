
const easeInBy = power => t => Math.pow(t, power);
const easeOutBy = power => t => 1 - Math.abs(Math.pow(t - 1, power));
const easeInOutBy = power => t => t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;

export const linear = t => t;
export const quadIn = easeInBy(2);
export const quadOut = easeOutBy(2);
export const quadInOut = easeInOutBy(2);
export const cubicIn = easeInBy(3);
export const cubicOut = easeOutBy(3);
export const cubicInOut = easeInOutBy(3);
export const quartIn = easeInBy(4);
export const quartOut = easeOutBy(4);
export const quartInOut = easeInOutBy(4);
export const quintIn = easeInBy(5);
export const quintOut = easeOutBy(5);
export const quintInOut = easeInOutBy(5);
export const sineIn = t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
export const sineOut = t => Math.sin(Math.PI / 2 * t);
export const sineInOut = t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
export const bounceOut = t => {
  const s = 7.5625;
  const p = 2.75;

  if (t < 1 / p) {
    return s * t * t;
  }
  if (t < 2 / p) {
    t -= 1.5 / p;
    return s * t * t + 0.75;
  }
  if (t < 2.5 / p) {
    t -= 2.25 / p;
    return s * t * t + 0.9375;
  }
  t -= 2.625 / p;
  return s * t * t + 0.984375;
};
export const bounceIn = t => 1 - bounceOut(1 - t);
export const bounceInOut = t => t < 0.5 ? bounceIn(t * 2) * 0.5 : bounceOut(t * 2 - 1) * 0.5 + 0.5;
