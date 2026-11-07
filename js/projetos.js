// Conteúdo da página Portfólio. `arquivo` = nome do print sem extensão/largura.
// Cada print vira "Figura N – legenda" + descrição no card abaixo das imagens (padrão ABNT).
// `sistema` = texto do card do topo da pasta aberta; `estudo` = apresentação no lugar dos cartões de `funcoes`.
// Nos textos do estudo, **assim** vira negrito.
const p = (arquivo, legenda, descricao = '') => ({ arquivo, legenda, descricao });

export const PROJETOS = [
  { id: 'central', titulo: 'Central de Programação', descricao: 'Programação semanal, Hh e aderência num só lugar', principal: true,
    sistema: 'Sistema para elaboração da programação semanal da obra e controle de recursos em homem-hora (Hh), integrado ao levantamento de quantitativos e ao apontamento de campo.',
    prints: [
      p('central-1-hh', 'Análise de recursos da programação', 'Aba destinada à visualização e ao ajuste da distribuição dos recursos em Hh, das quantidades e dos marcos previstos para a semana.'),
      p('central-2-aderencia', 'Aderência e análise de recursos por liderança', 'Painel de análise dos desvios entre o programado e o realizado, segregados por engenheiro responsável ou por área da obra.'),
      p('central-3-app', 'Aplicativo de apontamento', 'Aplicativo integrado à Central, utilizado pela liderança para o apontamento das atividades executadas, com operação on-line e off-line.'),
      p('central-4-programacao', 'Programação', 'Painel de elaboração da programação semanal da obra, vinculado ao banco de dados on-line de quantitativos.'),
      p('central-5-banco', 'Banco de dados', 'Painel de visualização e consulta do banco de dados de quantitativos da obra.')],
    funcoes: [
      ['Programação a partir do take-off', 'Escolhe a tag, vê o saldo de cada etapa e programa a semana sem redigitar planilha.'],
      ['Quantidades e Hh', 'Calcula Hh, saldo e efetivo necessário; avisa quando o programado passa do disponível.'],
      ['Aderência por engenheiro', 'Indicadores, histórico de 8 semanas e causas de desvio por responsável.'],
      ['Exporta no modelo da obra', 'Gera a planilha oficial de programação e o resumo semanal com um clique.'],
      ['App de apontamento', 'Os engenheiros apontam o realizado pelo celular, mesmo sem internet.'],
      ['Acesso por perfil', 'Banco online com permissões por função e auditoria de segurança.']],
    estudo: {
      titulo: 'Da planilha ao sistema: como a programação semanal ficou pronta antes da semana começar',
      contexto: ['A programação semanal era elaborada em planilhas do Excel. O trabalho começava na **quinta-feira** e, por se tratar de uma obra de grande porte, com escopo semanal extenso, a programação só era entregue na **segunda-feira pela manhã** — no mesmo dia em que as equipes já precisavam executá-la.'],
      asis: { titulo: 'Planilhas do Excel',
        itens: ['Inclusão manual das tags da semana', 'Conferência manual de saldo', 'Memorial de cálculo à parte para itens não mensuráveis',
          'Reports para gerência e diretoria montados à mão', 'Coleta de aderência por check-out, que falhava diante da demanda do campo'],
        pe: ['Equipe: 1 planejador sênior + 1 auxiliar', 'Entrega: segunda-feira de manhã'] },
      tobe: { titulo: 'Central de Programação',
        itens: ['Tags puxadas do banco de dados, com filtro e busca', 'Saldo conferido automaticamente', 'Memorial de cálculo integrado à programação',
          'Reports semanais gerados pelo sistema', 'Apontamento pelo aplicativo da liderança, on-line e off-line'],
        pe: ['Equipe: 1 planejador júnior com autonomia', 'Entrega: sexta-feira à tarde'] },
      prazo: { titulo: 'Prazo de elaboração', dias: ['QUI', 'SEX', 'SÁB', 'DOM', 'SEG'],
        barras: [['AS IS', 1, 5, 'entrega: seg. de manhã'], ['TO BE', 1, 2, 'sex. à tarde', true]] },
      ganhos: [['Entrega', '~2,5 dias antes', 'sexta à tarde, antes do início da semana'],
        ['Elaboração', '~4 → ~1,5 dia', 'dias corridos, de quinta até a entrega'],
        ['Equipe', '2 → 1 pessoa', 'sênior + auxiliar → um júnior, conforme o escopo'],
        ['Análise de desvios', 'Diária', 'mesmo com a agenda de reuniões'],
        ['Acesso', 'PC e celular', 'funciona off-line e sincroniza com a nuvem']],
      ciclo: { titulo: 'Ciclo de melhoria contínua (Kaizen)', centro: ['BANCO DE DADOS', 'Central'],
        passos: [['Programar', 'A Central monta a semana a partir do banco de dados.'],
          ['Executar', 'As equipes recebem a programação antes do início da semana.'],
          ['Apontar', 'Cada líder registra no aplicativo o que foi executado, mesmo sem internet.'],
          ['Analisar', 'Os desvios por engenheiro e por área são identificados diariamente.'],
          ['Agir', 'Desvios são tratados diariamente, diminuindo o impacto na produção semanal e abrindo um horizonte para futuras programações.']] },
    } },
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
