// Os termos proibidos ficam fora deste repositório (público), no kit local.
export let TERMOS = [];
export let SKIP = false;
try { ({ TERMOS } = await import('../../../PORTFOLIO-KIT/ferramentas/checa-anonimato.mjs')); }
catch { SKIP = 'PORTFOLIO-KIT/ferramentas/checa-anonimato.mjs não encontrado: teste de termos proibidos ignorado'; }
