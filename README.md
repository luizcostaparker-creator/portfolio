# Portfólio · Luiz Costa

Site pessoal de Luiz Costa, planejamento e controle de obras. Três páginas estáticas:

- `index.html`: abertura com o corredor de painéis.
- `portfolio.html`: as ferramentas criadas na obra, em pastas que abrem um carrossel de imagens.
- `sobre.html`: trajetória, ferramentas do dia a dia e contato.

HTML, CSS e JavaScript puros (módulos ES), sem build e sem dependências.

## Rodar localmente

Os módulos ES não carregam via `file://`; sirva a pasta por HTTP:

```sh
python -m http.server 8080
```

e abra <http://localhost:8080/>.

## Testes

```sh
node --test tests/*.test.mjs
```
