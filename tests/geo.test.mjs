import test from 'node:test';
import assert from 'node:assert/strict';
import { corredor, coverflow, grade, esfera } from '../js/geo.js';

test('corredor', () => {
  assert.ok(corredor(1920).n >= 6);
  assert.equal(corredor(360).n, 4); // fórmula do protótipo dá 4 (brief dizia 3)
  assert.equal(corredor(360).step, 190);
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
