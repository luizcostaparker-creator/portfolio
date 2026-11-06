// Conteúdo da página Portfólio (spec §6). `arquivo` = nome do print sem extensão/largura.
const p = (arquivo, legenda) => ({ arquivo, legenda });

export const PROJETOS = [
  { id: 'central', titulo: 'Central de Controle Civil', descricao: 'Programação semanal, H.H e aderência num só lugar', principal: true,
    prints: [p('central-1-hh', 'Painel de H.H da semana'), p('central-2-aderencia', 'Aderência por engenheiro'), p('central-3-app', 'App de apontamento'),
      p('central-4-programacao', 'Programação da semana'), p('central-5-banco', 'Banco de dados do take-off')],
    funcoes: [
      ['Programação a partir do take-off', 'Escolhe a tag, vê o saldo de cada etapa e programa a semana sem redigitar planilha.'],
      ['Quantidades e H.H', 'Calcula H.H, saldo e efetivo necessário; avisa quando o programado passa do disponível.'],
      ['Aderência por engenheiro', 'Indicadores, histórico de 8 semanas e causas de desvio por responsável.'],
      ['Exporta no modelo da obra', 'Gera a planilha oficial de programação e o resumo semanal com um clique.'],
      ['App de apontamento', 'Os engenheiros apontam o realizado pelo celular, mesmo sem internet.'],
      ['Acesso por perfil', 'Banco online com permissões por função e auditoria de segurança.']] },
  { id: 'mapa', titulo: 'Mapa Geral', descricao: 'Planta da obra sobre foto de drone',
    prints: [p('mapa-1-areas', 'Áreas sobre a foto do drone'), p('mapa-2-gantt', 'Gantt semanal por área'), p('mapa-3-fotos', 'Pontos de foto 360°')],
    funcoes: [
      ['Áreas na foto aérea', 'Cada frente de trabalho delimitada sobre a imagem do drone.'],
      ['Gantt por área', 'Programação semanal de cada área, com troca rápida de semana.'],
      ['Fotos 360°', 'Pontos de foto clicáveis para ver a situação real do campo.'],
      ['Subterrâneo', 'Modo separado para interferências enterradas.']],
    credito: { autor: 'Gkbediako', fonte: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Fenton_Industrial_complex_as_September_2024.jpg',
      licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { id: 'pavimentacao', titulo: 'Memorial de Pavimentação', descricao: 'Volumes por estaca e programado × executado',
    prints: [p('pav-1-camadas', 'Camadas do pavimento'), p('pav-2-calculo', 'Cálculo por estaca'), p('pav-3-historico', 'Programado × executado')],
    funcoes: [
      ['Cálculo por camada', 'Escavação, reaterro, imprimação e CBUQ a partir das estacas.'],
      ['Histórico por rua', 'Programado × executado de cada trecho, semana a semana.'],
      ['Parâmetros da obra', 'Espessuras e padrões ajustáveis sem mexer em código.'],
      ['Dados protegidos', 'Tudo cifrado; só abre com senha.']] },
  { id: 'visualizador', titulo: 'Visualizador de Projetos', descricao: 'Pranchas pesadas leves no celular',
    prints: [p('vis-1-prancha', 'Prancha aberta no celular'), p('vis-2-lista', 'Lista de pranchas'), p('vis-3-medicao', 'Medição sobre a prancha')],
    funcoes: [
      ['Abre prancha A0 no celular', 'O aparelho baixa só o pedaço que está na tela, como um mapa.'],
      ['Medir e anotar', 'Medidas e desenhos direto sobre a prancha, no campo.'],
      ['Publicação em dois cliques', 'Coloca o PDF na pasta e o site atualiza sozinho.'],
      ['Acesso por chave', 'Conteúdo cifrado; quem sai da equipe perde o acesso.']] },
  { id: 'levantamento', titulo: 'Levantamento por Sala', descricao: 'Quantitativos de arquitetura a partir do PDF',
    prints: [p('pre-1-salas', 'Salas reconhecidas na planta'), p('pre-2-quantitativo', 'Quantitativo por sala'), p('pre-3-edicao', 'Edição da planta')],
    funcoes: [
      ['Lê a planta em PDF', 'Reconhece as salas, áreas e pé-direito pelos rótulos do projeto.'],
      ['Quantitativo por sala', 'Esquadrias, paredes, rodapé, piso, forro e louças.'],
      ['Planta editável', 'Corrige na tela e o número atualiza.'],
      ['Saída em Excel', 'Lista pronta para orçamento e compra de material.']] },
];

export const srcPrint = (arquivo, largura) => `img/prints/${arquivo}-${largura}.webp`;
// prints de celular (portrait): ficam inteiros sobre o cartão escuro
export const retrato = (arquivo) => arquivo === 'central-3-app' || arquivo.startsWith('vis-');
