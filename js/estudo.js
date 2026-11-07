// Estudo de caso da pasta aberta: contexto, AS IS × TO BE, prazo, ganhos e ciclo. Cada bloco só aparece se existir nos dados.
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const sv = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };

// "**x**" vira <b>x</b> (sem innerHTML)
function rico(tag, txt) {
  const e = el(tag);
  txt.split('**').forEach((t, i) => e.append(i % 2 ? el('b', '', t) : t));
  return e;
}

// posição dos selos do ciclo: começa no topo e anda no sentido horário
export function selos(n, r = 112, c = 160) {
  return Array.from({ length: n }, (_, i) => {
    const a = (-90 + (i * 360) / n) * Math.PI / 180;
    return [+(c + r * Math.cos(a)).toFixed(1), +(c + r * Math.sin(a)).toFixed(1)];
  });
}

function ciclo({ centro, passos }) {
  const n = passos.length, r = 112, folga = 0.24; // folga (rad) para a seta não entrar no selo
  const s = sv('svg', { viewBox: '0 0 320 320', role: 'img', 'aria-label': 'Ciclo: ' + passos.map((p) => p[0].toLowerCase()).join(', ') });
  const d = sv('defs', {}), m = sv('marker', { id: 'seta', viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto' });
  m.append(sv('path', { d: 'M0 0L10 5L0 10z', fill: '#f5a524' })); d.append(m); s.append(d);
  s.append(sv('circle', { cx: 160, cy: 160, r, fill: 'none', stroke: '#223041', 'stroke-width': 2 }));
  const ang = (i) => (-90 + (i * 360) / n) * Math.PI / 180, pt = (a) => `${(160 + r * Math.cos(a)).toFixed(1)} ${(160 + r * Math.sin(a)).toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    s.append(sv('path', { d: `M${pt(ang(i) + folga)} A${r} ${r} 0 0 1 ${pt(ang(i + 1) - folga)}`, fill: 'none', stroke: '#f5a524', 'stroke-width': 2.5, 'marker-end': 'url(#seta)' }));
  }
  selos(n, r).forEach(([x, y], i) => {
    s.append(sv('circle', { cx: x, cy: y, r: 15, fill: '#f5a524' }));
    const t = sv('text', { x, y: y + 5, 'text-anchor': 'middle', fill: '#0a0d12', 'font-size': 13, 'font-weight': 700, 'font-family': 'system-ui' }); t.textContent = i + 1; s.append(t);
  });
  const t1 = sv('text', { x: 160, y: 152, 'text-anchor': 'middle', fill: '#8b96a5', 'font-size': 11, 'font-family': 'ui-monospace,Consolas,monospace' }); t1.textContent = centro[0];
  const t2 = sv('text', { x: 160, y: 174, 'text-anchor': 'middle', fill: '#eef2f6', 'font-size': 17, 'font-weight': 700, 'font-family': 'system-ui' }); t2.textContent = centro[1];
  s.append(t1, t2);
  const ol = el('ol', 'passos');
  passos.forEach(([b, t]) => { const li = el('li'); li.append(el('b', '', b), el('span', '', t)); ol.append(li); });
  const box = el('div', 'cic'); box.append(s, ol);
  return box;
}

function coluna(cls, rot, { titulo, itens, pe }) {
  const c = el('div', 'col ' + cls), cab = el('div', 'cab'), ol = el('ol'), p = el('div', 'pe');
  cab.append(el('small', '', rot), el('b', '', titulo));
  itens.forEach((t) => ol.append(el('li', '', t)));
  c.append(cab, ol);
  if (pe) { pe.forEach((t) => p.append(el('span', '', t))); c.append(p); }
  return c;
}

export function estudo(e) {
  const a = el('article', 'apres'), h = el('header', 'ah');
  h.append(el('span', 'k', 'Estudo de caso'), el('h3', '', e.titulo));
  a.append(h);
  let n = 0;
  const bloco = (titulo, ...filhos) => {
    const s = el('section', 'bloco'), h4 = el('h4');
    h4.append(el('i', '', String(++n)), titulo); s.append(h4, ...filhos); a.append(s);
  };
  if (e.contexto) bloco('Contexto', ...e.contexto.map((t) => rico('p', t)));
  if (e.asis && e.tobe) {
    const g = el('div', 'asis'), seta = el('div', 'seta', '→'); seta.setAttribute('aria-hidden', 'true');
    g.append(coluna('antes', 'AS IS', e.asis), seta, coluna('depois', 'TO BE', e.tobe));
    bloco('Processo: AS IS × TO BE', g);
  }
  if (e.prazo) {
    const box = el('div', 'linha'), g = el('div', 'dias');
    box.setAttribute('aria-label', e.prazo.titulo);
    g.style.gridTemplateColumns = `var(--rot,70px) repeat(${e.prazo.dias.length},1fr)`;
    g.append(el('span'), ...e.prazo.dias.map((d) => el('span', 'd', d)));
    e.prazo.barras.forEach(([rot, ini, span, txt, nova]) => {
      const b = el('span', 'bar ' + (nova ? 'nova' : 'velha'), txt); b.style.gridColumn = `${ini + 1} / span ${span}`;
      g.append(el('span', 'rot', rot), b);
    });
    box.append(g);
    bloco(e.prazo.titulo, box);
  }
  if (e.ganhos) {
    const g = el('div', 'ganhos');
    e.ganhos.forEach(([s, b, t]) => { const d = el('div'); d.append(el('small', '', s), el('b', '', b), el('span', '', t)); g.append(d); });
    bloco('Ganhos', g);
  }
  if (e.ciclo) bloco(e.ciclo.titulo, ciclo(e.ciclo));
  return a;
}
