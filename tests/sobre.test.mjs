import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TERMOS, SKIP } from './kit.mjs';

const html = readFileSync(new URL('../sobre.html', import.meta.url), 'utf8');

test('sem termos proibidos (exceto o nome do projeto atual)', { skip: SKIP }, () => {
  assert.equal(html.split('UTE Azulão').length - 1, 1);
  const txt = html.replaceAll('UTE Azulão', '');
  for (const { re, desc } of TERMOS) assert.ok(!re.test(txt), desc);
});
test('CSP: sem script/style inline nem style=', () => {
  assert.ok(html.includes(`content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; frame-src https://www.openstreetmap.org; base-uri 'none'; form-action 'none'"`));
  assert.ok(!/<style|\sstyle=|<script(?![^>]*\ssrc=)/i.test(html));
});
test('links de contato, trajetória e ferramentas', () => {
  for (const h of ['https://www.linkedin.com/in/luiz-miguel-costa-santos-3752192b0', 'https://github.com/luizcostaparker-creator', 'mailto:luizmiguelcs04@gmail.com'])
    assert.ok(html.includes(`href="${h}"`), h);
  assert.equal((html.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 3); // LinkedIn, GitHub e crédito do mapa
  assert.equal((html.match(/class="item rv"/g) || []).length, 5);
  assert.equal((html.match(/<li><span class="ic /g) || []).length, 9);
});
