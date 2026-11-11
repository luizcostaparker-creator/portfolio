import { ciclo } from './geo.js?v=2';

// Escada: cada tela é um degrau mais alto, mais fundo e mais à esquerda. Rolar/arrastar desce os degraus;
// passar o mouse levanta o degrau. Parada, a escada anda sozinha devagar.
const ITENS = [
  ['central-1-hh', 'Central de Programação', 'Análise de recursos da programação'],
  ['mapa-1-areas', 'De olho na obra', 'Aboveground'],
  ['pav-3-historico', 'Central de Pavimento', 'Dashboard'],
  ['pre-1-salas', 'Levantamento Arquitetônico', 'Mapeamento de salas'],
  ['central-2-aderencia', 'Central de Programação', 'Aderência e análise de recursos por liderança'],
  ['mapa-2-gantt', 'De olho na obra', 'Programação semanal'],
  ['pav-2-calculo', 'Central de Pavimento', 'Registro de programação e avanço'],
  ['central-4-programacao', 'Central de Programação', 'Programação'],
  ['pre-2-quantitativo', 'Levantamento Arquitetônico', 'Banco de dados'],
  ['central-5-banco', 'Central de Programação', 'Banco de dados'],
];
const N = ITENS.length, DX = -88, DY = -80, DZ = -200, RY = 24, RX = 3;
const $ = (id) => document.getElementById(id);
const stage = $('stage'), legP = $('legP'), legT = $('legT'), legS = $('legS');
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
let off = 0, alvo = 0, hover = -1, mx = 0, my = 0, parado = 0, x0 = null, a0 = 0, mostrada = -1;
const lift = new Array(N).fill(0), entrada = new Array(N).fill(reduz ? 1 : 0);

const cards = ITENS.map(([a, , s], i) => {
  const c = document.createElement('div');
  c.className = 'card';
  const im = new Image();
  im.src = `img/prints/${a}-480.webp`;
  im.srcset = `img/prints/${a}-480.webp 480w, img/prints/${a}-1600.webp 1600w`;
  im.sizes = '(max-width: 860px) 62vw, 460px';
  im.alt = s; im.decoding = 'async'; im.width = 480; im.height = 270;
  c.append(im);
  c.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hover = i; });
  c.addEventListener('pointerleave', () => { if (hover === i) hover = -1; });
  stage.append(c);
  if (!reduz) setTimeout(() => { entrada[i] = 1; }, 120 + (N - 1 - i) * 70); // entram do fundo para a frente
  return c;
});
const vis = new Array(N).fill(0);

// medidas lidas só no início e ao redimensionar: ler layout a cada quadro, depois de escrever estilos, trava o celular
let k = 1, caixa = stage.getBoundingClientRect();
const mede = () => { caixa = stage.getBoundingClientRect(); k = Math.min(1, caixa.width / 700); }; // degraus menores em telas estreitas
mede(); addEventListener('resize', mede);

function quadro() {
  // arrastando, a escada segue o dedo sem atraso; solta, desliza com inércia até encaixar
  if (x0 !== null) off = alvo; else off += (alvo - off) * (reduz ? 1 : 0.12);
  let frente = 0, menor = 9;
  cards.forEach((c, i) => {
    const p = ciclo(i - off, N);
    lift[i] += ((hover === i ? 1 : 0) - lift[i]) * (reduz ? 1 : 0.15);
    vis[i] += (entrada[i] - vis[i]) * (reduz ? 1 : 0.08);
    const l = lift[i], e = vis[i];
    // ao passar o mouse: o degrau sobe, vem para frente e segue levemente o cursor
    const x = (p * DX + l * mx * 18) * k, y = (p * DY - l * 34 + l * my * 10 + (1 - e) * 120) * k, z = (p * DZ + l * 90) * k;
    c.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${RY - l * 10}deg) rotateX(${RX}deg)`;
    c.style.zIndex = 100 - Math.round(p * 10) + Math.round(l * 50);
    const o = p < -0.6 ? Math.max(0, 1 + (p + 0.6) * 1.1) : p > N - 3.5 ? Math.max(0, (N - 1.5 - p) / 2) : 1;
    c.style.opacity = o * e;
    c.style.setProperty('--sombra', Math.min(0.75, Math.max(0, p) * 0.09).toFixed(3));
    c.classList.toggle('on', hover === i);
    if (Math.abs(p) < menor) { menor = Math.abs(p); frente = i; }
  });
  const i = hover >= 0 ? hover : frente;
  if (i !== mostrada) { // só reescreve a legenda quando muda (aria-live)
    mostrada = i;
    legP.textContent = `${String(i + 1).padStart(2, '0')} / ${N}`;
    legT.textContent = ITENS[i][1]; legS.textContent = ITENS[i][2];
  }
  requestAnimationFrame(quadro);
}

stage.addEventListener('wheel', (e) => { e.preventDefault(); parado = 0; alvo += e.deltaY * 0.004; }, { passive: false });
// toque: arrastar para baixo ou para a esquerda desce a escada (ela é diagonal, os dois eixos valem)
let y0 = 0, vel = 0, tUlt = 0, aUlt = 0;
stage.addEventListener('pointermove', (e) => {
  mx = (e.clientX - caixa.left) / caixa.width - 0.5; my = (e.clientY - caixa.top) / caixa.height - 0.5;
  if (x0 === null) return;
  alvo = a0 + ((e.clientY - y0) - (e.clientX - x0)) / 110;
  const t = performance.now(); if (t > tUlt) { vel = (alvo - aUlt) / (t - tUlt); tUlt = t; aUlt = alvo; }
});
stage.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return;
  x0 = e.clientX; y0 = e.clientY; a0 = aUlt = alvo; tUlt = performance.now(); vel = 0; parado = 0;
  stage.setPointerCapture(e.pointerId); stage.classList.add('drag');
});
const solta = () => {
  if (x0 === null) return;
  x0 = null; stage.classList.remove('drag');
  if (performance.now() - tUlt > 90) vel = 0; // dedo parou antes de soltar: sem inércia
  alvo = Math.round(alvo + Math.max(-3, Math.min(3, vel * 220))); // inércia: um "peteleco" avança alguns degraus
};
addEventListener('pointerup', solta);
addEventListener('pointercancel', solta);
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { alvo = Math.round(alvo) + 1; parado = 0; }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { alvo = Math.round(alvo) - 1; parado = 0; }
});
if (!reduz) setInterval(() => { if (hover < 0 && x0 === null && ++parado > 3) alvo += 1; }, 1600);
requestAnimationFrame(quadro);
