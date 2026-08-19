/*global QUnit*/
sap.ui.define([
    "yclf/dash360/metacompromisso/service/ReportService"
], function (ReportService) {
    "use strict";

    QUnit.module("ReportService");

    QUnit.test("calcula faturado mais carteira e saldo", function (assert) {
        var result = ReportService.calculateRow({
            commitment: 100,
            billed: 40,
            monthlyPortfolio: 70
        });

        assert.strictEqual(result.portfolioAndBilled, 110, "soma faturado e carteira");
        assert.strictEqual(result.balance, 10, "subtrai o compromisso");
        assert.strictEqual(result.achievement, 1.1, "calcula o percentual");
    });

    QUnit.test("evita divisão por zero", function (assert) {
        var result = ReportService.calculateRow({
            commitment: 0,
            billed: 10,
            monthlyPortfolio: 20
        });

        assert.strictEqual(result.achievement, 0, "percentual permanece zero");
    });

    QUnit.test("rejeita uma resposta que não possui o formato esperado", function (assert) {
        assert.throws(function () {
            ReportService.calculateData({});
        }, /formato inválido/, "informa claramente que o mock é inválido");
    });
});
