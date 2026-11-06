import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJETOS, srcPrint } from '../js/projetos.js';
import { TERMOS, SKIP } from './kit.mjs';

const ARQUIVOS = ['central-1-hh', 'central-2-aderencia', 'central-3-app', 'central-4-programacao', 'central-5-banco',
  'mapa-1-areas', 'mapa-2-gantt', 'mapa-3-fotos', 'pav-1-camadas', 'pav-2-calculo', 'pav-3-historico',
  'vis-1-prancha', 'vis-2-lista', 'vis-3-medicao', 'pre-1-salas', 'pre-2-quantitativo', 'pre-3-edicao'];

test('5 projetos, só o primeiro é principal', () => {
  assert.equal(PROJETOS.length, 5);
  assert.equal(PROJETOS[0].principal, true);
  assert.equal(PROJETOS.filter((p) => p.principal).length, 1);
});

test('prints e funções mínimos; arquivos conhecidos e todos usados', () => {
  for (const p of PROJETOS) {
    assert.ok(p.prints.length >= 3, p.id);
    assert.ok(p.funcoes.length >= 4, p.id);
    for (const { arquivo, legenda } of p.prints) { assert.ok(ARQUIVOS.includes(arquivo), arquivo); assert.ok(legenda); }
  }
  assert.deepEqual(PROJETOS.flatMap((p) => p.prints.map((x) => x.arquivo)), ARQUIVOS);
});

test('nenhum termo proibido nos textos', { skip: SKIP }, () => {
  const txt = JSON.stringify(PROJETOS);
  for (const { re, desc } of TERMOS) assert.ok(!re.test(txt), desc);
});

test('só o Mapa Geral tem crédito (CC BY-SA)', () => {
  assert.deepEqual(PROJETOS.filter((p) => p.credito).map((p) => p.id), ['mapa']);
});

test('srcPrint devolve caminho de imagem para os 17 prints', () => {
  for (const a of ARQUIVOS) for (const l of [480, 1600]) assert.match(srcPrint(a, l), /^img\/.+\.(svg|webp)$/);
});
