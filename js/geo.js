// Geometria pura (sem DOM) da abertura, do carrossel e da grade/esfera.
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// escada da abertura: posição contínua do cartão i, dando a volta (faixa [-1.5, n-1.5))
export function ciclo(p, n) { return ((p % n) + n + 1.5) % n - 1.5; }

export function coverflow(d) {
  const a = Math.abs(d);
  return {
    tx: d * 60 + 0,
    ry: -clamp(d, -1, 1) * 38 + 0, // +0 evita -0
    s: 1 - Math.min(a, 2) * 0.15,
    z: 10 - Math.round(a),
    o: a > 2.5 ? 0 : 1,
  };
}

const GAP = 10;
export function grade(i, n, largura, cw = 128, ch = 112) {
  const cols = Math.max(1, Math.floor((largura + GAP) / (cw + GAP)));
  const rows = Math.ceil(n / cols);
  const r = Math.floor(i / cols), c = i % cols;
  const naLinha = r === rows - 1 ? n - r * cols : cols;
  return { x: (c - (naLinha - 1) / 2) * (cw + GAP), y: r * (ch + GAP), altura: rows * ch + (rows - 1) * GAP };
}

export function esfera(n) {
  const ouro = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (2 * i) / (n - 1), r = Math.sqrt(1 - y * y), t = ouro * i;
    return [Math.cos(t) * r, y, Math.sin(t) * r];
  });
}
