# Baseline de layout - Meta e Compromisso

Este arquivo registra o layout aprovado do aplicativo SAP Fiori Freestyle `yclf_dash_360_meta_compromisso`.

Objetivo principal: evitar alteraÃ§Ãµes acidentais no layout visual jÃ¡ ajustado. Qualquer mudanÃ§a estrutural ou visual deve ser feita somente quando houver pedido explÃ­cito.

## Regra de proteÃ§Ã£o do layout

NÃ£o alterar o layout do aplicativo sem solicitaÃ§Ã£o direta do usuÃ¡rio.

Antes de qualquer alteraÃ§Ã£o em views, CSS, FilterBar, cartÃµes, tabelas ou Object Pages, confirme se a solicitaÃ§Ã£o realmente pede mudanÃ§a visual. Se a tarefa for lÃ³gica, dados, mock, navegaÃ§Ã£o, formatter ou controller, preserve o layout atual.

## Estado atual preservado

### Tema e versÃ£o

- Tema: SAP Horizon.
- SAPUI5 configurado para versÃ£o `1.149.1`.
- O app usa layout Freestyle SAPUI5 com `sap.f.DynamicPage`, `sap.m.Table`, `sap.uxap.ObjectPageLayout` e `sap.ui.comp.filterbar.FilterBar`.

### Primeira tela - Dashboard

Arquivo principal: `webapp/view/Dashboard.view.xml`.

Layout atual:

- `DynamicPage` com FilterBar no header.
- FilterBar com Smart Variant padrÃ£o/persistÃªncia.
- Pin/collapse nativos do `DynamicPageHeader` habilitados, sem botões customizados sobrepostos.
- BotÃµes do FilterBar alinhados Ã  direita.
- Margem lateral do FilterBar feita sem CSS customizado, usando espaÃ§adores XML de `1.25rem`.
- Tabelas organizadas em cartÃµes brancos arredondados.
- TÃ­tulo das tabelas incorporado Ã  toolbar.
- Data de atualizaÃ§Ã£o posicionada no cabeÃ§alho da primeira tabela.

RelatÃ³rios da primeira tela:

1. `Acompanhamento diÃ¡rio`
2. `Meta por quantidade de FamÃ­lia - Varejo`

Agrupamento do `Acompanhamento diÃ¡rio`:

- O relatÃ³rio deve ser separado em grupos `GNP` e `GNI`.
- O texto `GNP/GNI` nÃ£o deve aparecer duplicado como subtÃ­tulo das linhas.
- A linha `Total geral` deve permanecer sem navegaÃ§Ã£o e ao final do bloco consolidado.
- No relatório `Acompanhamento diário`, links para Object Page devem ficar somente no botão/ícone `sap-icon://navigation-right-arrow` da última coluna.
- No relatório `Meta por quantidade de Família - Varejo`, a linha da família deve usar `ColumnListItem type="Navigation"` e abrir a Object Page de Família; nomes de Família devem permanecer sem link azul.
- Os cabeÃ§alhos de grupo `GNP` e `GNI` devem ter destaque visual prÃ³prio, diferente do zebrado das linhas.
- Títulos e valores das colunas `Compromisso` devem ficar em azul usando estado padrão SAPUI5 `Information`.
- Títulos e valores das colunas `Faturado`/`Faturamento` devem permanecer na cor padrão SAPUI5, sem estado de destaque.
- Não criar CSS novo para essas cores; preferir `ObjectStatus` e `ObjectNumber state`.
- No relatÃ³rio `Meta por quantidade de FamÃ­lia - Varejo`, tÃ­tulos com `Cota` devem aparecer como `OrÃ§amento`.
- No `Acompanhamento diário`, a coluna `Carteira` deve aparecer antes de `Carteira + Faturado`.
- No relatório `Meta por quantidade de Família - Varejo`, o título deve ser `Carteira + Faturado`, não `Faturado + carteira`.

ObservaÃ§Ã£o sobre zebrado:

- As tabelas estÃ£o com `alternateRowColors="true"` no XML.
- NÃ£o forÃ§ar zebrado via CSS, pois o Ãºltimo ajuste CSS para pintar linhas pares foi revertido a pedido do usuÃ¡rio.

### FilterBar

Campos atuais:

- Equipe de Vendas
- Consultor
- Consultor deve usar `MultiComboBox`, exibindo checkbox nativo ao lado de cada nome.
- Consultor deve habilitar seleção de todos os escritórios via `showSelectAll="true"` no `MultiComboBox`.
- Data / perÃ­odo

Diretrizes:

- NÃ£o remover Smart Variant.
- Manter os controles nativos de pin/collapse do `DynamicPageHeader`; não recriar botões customizados para esta função.
- NÃ£o usar CSS customizado para margens do FilterBar.
- Se precisar ajustar espaÃ§amento, preferir classes SAPUI5 ou propriedades XML.

### Object Page de FamÃ­lia

Arquivo principal: `webapp/view/FamilyDetail.view.xml`.

Layout atual:

- `sap.uxap:ObjectPageLayout`.
- Header padrÃ£o Horizon com botÃ£o Voltar.
- Header content com dados de gerente, equipe, famÃ­lia, cota e compromisso.
- SeÃ§Ã£o `Meta vs Quantidade`.
- Subsection `Desempenho por consultor`.
- Tabela padrÃ£o SAPUI5 com `alternateRowColors="true"`.
- Deve exibir o relatÃ³rio `CrÃ­ticas dos pedidos` somente nesta Object Page, em tabela SAPUI5 padrÃ£o, sem CSS novo.
- O relatório `Críticas dos pedidos` deve ter somente as colunas `Críticas`, `QTD`, `Valor` e `Porcentagem`.

### Object Page de Segmento / Acompanhamento diÃ¡rio

Arquivo principal: `webapp/view/SegmentDetail.view.xml`.

Layout atual:

- Deve seguir visual semelhante ao `FamilyDetail.view.xml`.
- Usa `sap.uxap:ObjectPageLayout`, nÃ£o layout de planilha.
- Sem cores amarelas.
- Header com status separados por classes padrÃ£o SAPUI5.
- Nome `Erika Medeiros` deve aparecer somente no header como `Gerente de vendas`.
- Linha total da tabela deve aparecer como `Total`, nÃ£o como `ERIKA`.
- Tabela com valores monetÃ¡rios e indicadores por consultor.
- A coluna `Carteira mÃªs anterior` nÃ£o deve aparecer nesta Object Page.
- Os títulos desta Object Page devem usar: `Orçamento`, `Compromisso`, `Entrada de pedidos - mês`, `Entrada do dia (hoje -1)`, `Carteira Mensal`, `Remessa Gerada` e `Faturado`, sem mês nos títulos `Orçamento` e `Compromisso`.
- Deve exibir o relatÃ³rio `CrÃ­ticas dos pedidos` somente nesta Object Page, em tabela SAPUI5 padrÃ£o, sem CSS novo.

## CSS

Arquivo principal: `webapp/css/style.css`.

Diretrizes:

- CSS atual deve ser considerado estÃ¡vel.
- NÃ£o recriar estilos de planilha ou cores fortes para Object Pages.
- NÃ£o adicionar CSS para FilterBar quando a alteraÃ§Ã£o puder ser feita com classes SAPUI5 ou XML.
- Evitar overrides globais em `.sapMListTblRow`, `.sapMListTblCell`, `.sapUiCompFilterBar` etc., salvo pedido explÃ­cito.

## Controllers e serviÃ§os

Diretriz de Clean SAPUI5:

- Controllers devem permanecer enxutos.
- Regras de cÃ¡lculo ficam em `webapp/service/ReportService.js`.
- FormataÃ§Ã£o fica em `webapp/model/formatter.js`.
- Views devem ser declarativas sempre que possÃ­vel.

## ValidaÃ§Ã£o esperada

ApÃ³s qualquer alteraÃ§Ã£o no projeto, executar:

```bash
npm test
```

O comando atual executa o build e deve terminar com sucesso.

## Ãšltimo estado conhecido

- Ãšltimo ajuste visual solicitado e revertido: CSS manual para forÃ§ar zebrado cinza nas linhas pares.
- Estado final: CSS manual removido; `alternateRowColors="true"` permanece nas tabelas do Dashboard.
- Build validado com sucesso apÃ³s a reversÃ£o.
