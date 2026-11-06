import { esfera, grade } from './geo.js';

document.documentElement.classList.add('js');
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

// revelação ao rolar
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i < 2 ? i * 0.12 : 0) + 's'; io.observe(el); });

// linha do tempo: a ponta acompanha a rolagem (referência a 60% da tela)
const tl = document.getElementById('tl'), fill = document.getElementById('fill'), tip = document.getElementById('tip');
const items = [...tl.querySelectorAll('.item')];
let pend = false;
function linha() {
  pend = false;
  const total = Math.max(1, tl.offsetHeight - 12), max = items.at(-1).offsetTop + 12;
  const h = Math.max(0, Math.min(max, innerHeight * 0.6 - tl.getBoundingClientRect().top - 6));
  fill.style.transform = `scaleY(${h / total})`;
  tip.style.transform = `translateY(${h}px)`;
  items.forEach((it) => it.classList.toggle('on', h >= it.offsetTop + 6));
}
addEventListener('scroll', () => { if (!pend) { pend = true; requestAnimationFrame(linha); } }, { passive: true });
addEventListener('resize', linha);
linha();

// esfera de ferramentas: gira só com o mouse, com inércia
const cloud = document.getElementById('cloud'), L = [...cloud.children], n = L.length, P = esfera(n);
let org = false, ang = 0, alvo = 0, tilt = 0.35, vx = 0, vy = 0, sobre = false, loop = false;
function desenha() {
  const R = Math.min(cloud.offsetWidth, 420) * 0.4, ca = Math.cos(ang), sa = Math.sin(ang), tx = Math.cos(tilt), ty = Math.sin(tilt);
  L.forEach((li, i) => {
    const [x, y, z] = P[i]; const X = x * ca + z * sa; let Z = -x * sa + z * ca; const Y = y * tx - Z * ty; Z = y * ty + Z * tx;
    const k = (Z + 2.2) / 3.2;
    li.style.transform = `translate(-50%,-50%) translate(${X * R * 1.3}px,${Y * R}px) scale(${0.6 + 0.5 * k})`;
    li.style.opacity = 0.35 + 0.65 * k; li.style.zIndex = Math.round(k * 100);
  });
}
function anima() {
  if (sobre) { alvo += vx; tilt = Math.max(-1.2, Math.min(1.2, tilt + vy)); }
  if (org) { loop = false; return; }
  ang += (alvo - ang) * 0.12; desenha();
  if (sobre || Math.abs(alvo - ang) > 0.001) requestAnimationFrame(anima); else loop = false;
}
if (!reduz) {
  cloud.addEventListener('pointermove', (e) => {
    if (org) return;
    const r = cloud.getBoundingClientRect();
    vx = ((e.clientX - r.left) / r.width - 0.5) * 0.06; vy = -((e.clientY - r.top) / r.height - 0.5) * 0.04;
    sobre = true; if (!loop) { loop = true; requestAnimationFrame(anima); }
  });
  cloud.addEventListener('pointerleave', () => { sobre = false; });
}
desenha();

// Organizar: grade sem sobreposição (e volta à esfera)
const CH = 112;
function aGrade() {
  const W = cloud.offsetWidth, h = grade(0, n, W).altura;
  cloud.style.height = (h + 20) + 'px';
  L.forEach((li, i) => {
    const g = grade(i, n, W);
    li.style.transform = `translate(-50%,-50%) translate(${g.x}px,${g.y + CH / 2 - h / 2}px)`;
    li.style.opacity = 1; li.style.zIndex = 1;
  });
}
const bt = document.getElementById('org');
bt.addEventListener('click', () => {
  org = !org; sobre = false;
  bt.setAttribute('aria-pressed', org); bt.textContent = org ? 'Ver em esfera' : 'Organizar';
  cloud.classList.add('anim');
  if (org) aGrade(); else { cloud.style.height = ''; desenha(); }
  setTimeout(() => cloud.classList.remove('anim'), 650);
});
addEventListener('resize', () => { if (org) aGrade(); else desenha(); });
