# Meta e Compromisso

Aplicativo SAPUI5 Freestyle para acompanhamento diário de orçamento, compromisso,
faturamento e carteira dos segmentos GNP/GNI e das famílias de varejo.

## Executar

```powershell
npm install
npm run start-noflp
```

## Funcionalidades

- FilterBar por equipe de vendas, consultoria, família e data.
- Consolidação por segmento e por família, com totais gerais.
- Edição de orçamento/cota e compromisso com recálculo imediato.
- Persistência das alterações em `localStorage`.
- Navegação para Object Page com desempenho dos consultores.
- Dados de demonstração em `webapp/model/mock.json`.
- Testes QUnit de regras de cálculo e jornada OPA5.

## Validar

```powershell
npm run build
npm run unit-test
npm run int-test
```
