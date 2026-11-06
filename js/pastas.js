import { PROJETOS, srcPrint, retrato } from './projetos.js';
import { coverflow } from './geo.js';

const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const srcset = (a) => `${srcPrint(a, 480)} 480w, ${srcPrint(a, 1600)} 1600w`;
function img(a, alt, grande) {
  const i = document.createElement('img');
  i.src = srcPrint(a, grande ? 1600 : 480); i.srcset = srcset(a);
  i.sizes = grande ? '(max-width: 750px) 72vw, 540px' : '260px';
  i.width = retrato(a) ? 480 : 1600; i.height = retrato(a) ? 1039 : 900; if (retrato(a)) i.className = 'ret';
  i.alt = alt; i.decoding = 'async'; i.draggable = false;
  return i;
}

const grid = $('grid'), open = $('open'), fan = $('fan'), cap = $('cap'), feats = $('feats'), credito = $('credito');
const prev = $('prev'), next = $('next'), btnFechar = $('fechar');
let last, cur = 0, shots = [], caps = [], fechando = false;

PROJETOS.forEach((p, i) => {
  const b = el('button', 'folder' + (p.principal ? ' big' : ''));
  b.type = 'button'; b.style.animationDelay = (0.08 * i) + 's';
  b.setAttribute('aria-label', `Abrir ${p.titulo}`);
  b.append(el('span', 'back'));
  p.prints.slice(0, 3).forEach((s) => { const f = el('span', 'file'); f.append(img(s.arquivo, '', false)); f.firstChild.loading = 'lazy'; b.append(f); });
  const fr = el('span', 'front');
  if (p.principal) fr.append(el('span', 'tag', 'PRINCIPAL'));
  fr.append(el('b', '', p.titulo), el('small', '', p.descricao));
  b.append(fr);
  b.addEventListener('click', () => abrir(p, b));
  grid.append(b);
});

function place(pos) {
  shots.forEach((s, i) => {
    const g = coverflow(i - pos);
    s.style.transform = `translate(-50%,0) translateX(${g.tx}%) rotateY(${g.ry}deg) scale(${g.s})`;
    s.style.zIndex = g.z; s.style.opacity = g.o;
  });
}
function go(i) {
  cur = Math.max(0, Math.min(shots.length - 1, i)); place(cur);
  cap.replaceChildren(el('b', '', caps[cur]), el('small', '', `${cur + 1} / ${shots.length} · arraste para o lado`));
  prev.disabled = cur === 0; next.disabled = cur === shots.length - 1;
}

function abrir(p, b) {
  if (fechando || open.classList.contains('on')) return;
  last = b; cur = 0; caps = p.prints.map((s) => s.legenda);
  const lip = el('div', 'lip'), t = el('b', '', p.titulo); t.id = 'ot';
  lip.append(t, el('span', '', p.descricao));
  shots = p.prints.map((s) => { const d = el('div', 'shot'); d.append(img(s.arquivo, s.legenda, true)); return d; });
  fan.replaceChildren(el('div', 'fback'), ...shots, lip);
  shots.forEach((s, i) => { s.style.transitionDelay = (0.05 + i * 0.07) + 's'; });
  feats.replaceChildren(...p.funcoes.map(([h, d]) => {
    const f = el('div', 'feat'), bb = el('b'); bb.append(el('i'), h); f.append(bb, el('p', '', d)); return f;
  }));
  credito.replaceChildren();
  if (p.credito) {
    const c = p.credito, a = (href, txt) => { const x = el('a', '', txt); x.href = href; x.target = '_blank'; x.rel = 'noopener noreferrer'; return x; };
    credito.append('Foto aérea: ', a(c.fonte, c.autor), ', ', a(c.licencaUrl, c.licenca), ' (modificada)');
  }
  open.style.display = 'block';
  open.getBoundingClientRect(); // aplica o estado inicial antes de animar
  open.classList.add('on'); go(0);
  setTimeout(() => shots.forEach((s) => { s.style.transitionDelay = ''; }), 900);
  btnFechar.focus({ preventScroll: true });
}

function fechar() {
  if (!open.classList.contains('on') || fechando) return;
  fechando = true;
  const f = last, extras = [feats, credito, open.querySelector('.nav'), btnFechar];
  const limpa = () => {
    open.classList.remove('on'); open.style.cssText = ''; fan.style.cssText = ''; extras.forEach((e) => { e.style.cssText = ''; });
    f.style.visibility = ''; fechando = false; f.focus();
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { limpa(); return; }
  // 1) a pasta, ainda aberta, encolhe e volta para o lugar dela na grade
  const lipR = fan.querySelector('.lip').getBoundingClientRect(), alvo = f.getBoundingClientRect();
  const k = alvo.width / lipR.width, dx = (alvo.left + alvo.width / 2) - (lipR.left + lipR.width / 2), dy = alvo.bottom - lipR.bottom;
  // as imagens se juntam numa pilha sobre a do centro…
  shots.forEach((s, i) => {
    const d = i - cur;
    s.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1),opacity .25s'; s.style.transitionDelay = (Math.abs(d) * 0.03) + 's';
    s.style.transform = `translate(-50%,${-Math.abs(d) * 8}px) rotate(${d * 3}deg) scale(.94)`; s.style.opacity = 1; s.style.zIndex = 10 - Math.abs(d);
  });
  extras.forEach((e) => { e.style.cssText = 'opacity:0;transition:opacity .2s'; });
  open.style.transition = 'background-color .5s'; open.style.backgroundColor = 'rgba(6,8,12,0)';
  fan.style.transformOrigin = '50% 100%'; fan.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1)';
  fan.style.transform = `translate(${dx}px,${dy}px) scale(${k})`;
  f.style.visibility = 'hidden';
  // fundo e aba da pasta aparecem atrás das imagens e a frente toma a altura da pasta
  fan.style.setProperty('--k', k);
  const back = fan.querySelector('.fback'); back.style.transition = 'opacity .25s'; back.style.opacity = 1;
  const lp = fan.querySelector('.lip'); lp.style.transformOrigin = '50% 100%';
  lp.style.transition = 'height .6s cubic-bezier(.4,0,.2,1),border-radius .6s,transform .45s cubic-bezier(.2,.8,.2,1)';
  lp.style.height = (150 / k) + 'px'; lp.style.borderRadius = (16 / k) + 'px';
  lp.style.transform = 'translateX(-50%) rotateX(-32deg)'; // a boca da pasta abre para receber as imagens
  // …e a pilha desce para dentro da pasta
  setTimeout(() => {
    lp.style.zIndex = 20;
    shots.forEach((s, i) => { s.style.transitionDelay = (Math.abs(i - cur) * 0.02) + 's'; s.style.transform = 'translate(-50%,150px) scale(.8)'; s.style.opacity = 0; });
  }, 380);
  // depois que as imagens entram, a boca fecha
  setTimeout(() => { lp.style.transition = 'transform .3s cubic-bezier(.4,0,.2,1)'; lp.style.transform = 'translateX(-50%)'; }, 760);
  // a pasta da grade assume o lugar
  setTimeout(() => { f.style.visibility = ''; fan.style.transition = 'opacity .15s'; fan.style.opacity = 0; setTimeout(limpa, 160); }, 1080);
}

btnFechar.addEventListener('click', fechar);
prev.addEventListener('click', () => go(cur - 1));
next.addEventListener('click', () => go(cur + 1));

// arrastar: a posição acompanha o dedo/mouse e encaixa na imagem mais próxima ao soltar
let x0 = null, w = 1;
fan.addEventListener('pointerdown', (e) => { if (fechando || e.button) return; x0 = e.clientX; w = shots[0].offsetWidth * 0.6; fan.setPointerCapture(e.pointerId); fan.classList.add('drag'); });
fan.addEventListener('pointermove', (e) => { if (x0 !== null) place(Math.max(-0.4, Math.min(shots.length - 0.6, cur - (e.clientX - x0) / w))); });
const solta = (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; fan.classList.remove('drag'); go(Math.round(cur - dx / w)); };
fan.addEventListener('pointerup', solta); fan.addEventListener('pointercancel', solta);

addEventListener('keydown', (e) => {
  if (!open.classList.contains('on')) return;
  if (e.key === 'Escape') fechar();
  else if (!fechando && e.key === 'ArrowLeft') go(cur - 1);
  else if (!fechando && e.key === 'ArrowRight') go(cur + 1);
  else if (e.key === 'Tab') { // mantém o foco dentro do diálogo
    const fs = [...open.querySelectorAll('button:not(:disabled),a[href]')];
    const a = document.activeElement, fim = e.shiftKey ? fs[0] : fs[fs.length - 1];
    if (a === fim || !open.contains(a)) { e.preventDefault(); (e.shiftKey ? fs[fs.length - 1] : fs[0]).focus(); }
  }
});
