import test from 'node:test';
import assert from 'node:assert/strict';
import { ciclo, coverflow, grade, esfera } from '../js/geo.js';

test('ciclo', () => {
  assert.equal(ciclo(0, 10), 0);
  assert.equal(ciclo(-1, 10), -1);
  assert.equal(ciclo(-2, 10), 8);   // saiu pela frente, volta para o fundo
  assert.equal(ciclo(12, 10), 2);
  assert.ok(ciclo(8.6, 10) < -1.3); // passou do fim da faixa
});
test('coverflow', () => {
  assert.deepEqual(coverflow(0), { tx: 0, ry: 0, s: 1, z: 10, o: 1 });
  assert.equal(coverflow(1).ry, -38);
  assert.equal(coverflow(-3).o, 0);
});
test('grade', () => {
  const xs = new Set([0, 1, 2, 3, 4, 5, 6, 7].map(i => grade(i, 9, 560).x));
  assert.equal(xs.size, 4); // 4 colunas
  assert.equal(grade(8, 9, 560).x, 0);
  assert.equal(grade(0, 9, 560).altura, 3 * 112 + 20);
});
test('esfera', () => {
  const p = esfera(9);
  assert.equal(p.length, 9);
  for (const [x, y, z] of p) assert.ok(Math.abs(Math.hypot(x, y, z) - 1) < 1e-9);
});
