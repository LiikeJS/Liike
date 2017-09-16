import liike from '../src/index.js';

const transform = (target, data) => {
  const { x = 0, y = 0, rotate = 0, opacity = 1 } = data;

  target.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  target.style.opacity = opacity;
};

const tween = liike(transform);

const $sections = document.getElementsByTagName('section');

document.body.style.overflow = 'hidden';

for (let j = 0; j < $sections.length; j++) {
  const $section = $sections[j];
  const $p = $section.getElementsByTagName('p')[0];

  const words = $p.textContent.trim().split(' ');

  $p.textContent = '';

  $section.style.position = 'absolute';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const $word = document.createElement('span');

    $word.textContent = word;
    $p.appendChild($word);
  }
}

const animate = () => {
  let startTime = 0;

  for (let j = 0; j < $sections.length; j++) {
    const $section = $sections[j];
    const $p = $section.getElementsByTagName('p')[0];

    const $words = $p.getElementsByTagName('span');

    $section.style.position = 'absolute';

    for (let i = 0; i < $words.length; i++) {
      const $word = $words[i];

      $word.style.opacity = 0;

      tween($word, {
        delay: startTime + i * 75,
        duration: 1250,
        easing: 'bounce',
        from: {
          y: -150,
          opacity: 0
        },
        to: {
          y: 0,
          opacity: 1
        }
      });

      tween($word, {
        delay: startTime + 2500 + i * 75,
        duration: 500,
        easing: 'cubicIn',
        onend: (target) => {
          if (j === $sections.length - 1) {
            if (i === $words.length - 1) {
              setTimeout(() => {
                animate();
              }, 1000);
            }
          }
        },
        to: {
          y: 150,
          opacity: 0
        }
      });
    }
    startTime += 2500 + $words.length * 75;
  }
};

animate();
