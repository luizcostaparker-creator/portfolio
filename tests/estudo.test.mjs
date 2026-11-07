import test from 'node:test';
import assert from 'node:assert/strict';
import { selos } from '../js/estudo.js';

test('selos do ciclo: começam no topo e ficam sobre o círculo', () => {
  const s = selos(5);
  assert.deepEqual(s[0], [160, 48]);
  for (const [x, y] of s) assert.ok(Math.abs(Math.hypot(x - 160, y - 160) - 112) < 0.2);
  assert.ok(s[1][0] > 160 && s[4][0] < 160); // 2º à direita, 5º à esquerda (sentido horário)
});
