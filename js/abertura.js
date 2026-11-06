import { corredor } from './geo.js';
import { PAINEIS } from './paineis.js';

const raiz = document.documentElement.style;
const medidas = () => {
  const { x0, far } = corredor(innerWidth);
  raiz.setProperty('--x0', x0 + 'px');
  raiz.setProperty('--far', far + 'px');
};
medidas();
addEventListener('resize', medidas);

const { n, step } = corredor(innerWidth);
for (const [id, off] of [['L', 0], ['R', 2]]) {
  const rail = document.getElementById(id);
  for (let i = 0; i < n; i++) {
    const { titulo, img } = PAINEIS[(i + off) % PAINEIS.length];
    const p = document.createElement('div');
    p.className = 'p';
    p.style.setProperty('--to', `calc(${(n - 1 - i) * step}px - var(--x0)*.9)`);
    p.style.animationDelay = 0.3 + (n - 1 - i) * 0.12 + 's'; // o mais próximo sai primeiro
    const h = document.createElement('header');
    h.append(document.createElement('i'), titulo);
    const im = new Image();
    im.alt = ''; im.loading = 'eager'; im.src = img;
    p.append(h, im);
    rail.append(p);
  }
}
