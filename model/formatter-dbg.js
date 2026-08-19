sap.ui.define([
    "sap/ui/core/format/NumberFormat",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/Locale"
], function (NumberFormat, DateFormat, Locale) {
    "use strict";

    var currencyFormat = NumberFormat.getCurrencyInstance({
        currencyCode: false,
        minFractionDigits: 0,
        maxFractionDigits: 0
    }, new Locale("pt-BR"));
    var integerFormat = NumberFormat.getIntegerInstance({
        groupingEnabled: true
    }, new Locale("pt-BR"));
    var percentFormat = NumberFormat.getPercentInstance({
        minFractionDigits: 0,
        maxFractionDigits: 1
    }, new Locale("pt-BR"));

    return {
        currency: function (value) {
            return currencyFormat.format(Number(value) || 0);
        },

        currencyWithPrefix: function (value) {
            return "R$ " + currencyFormat.format(Number(value) || 0);
        },

        accountingCurrency: function (value) {
            var number = Number(value) || 0;
            var formattedValue = "R$ " + currencyFormat.format(Math.abs(number));
            return number < 0 ? "(" + formattedValue + ")" : formattedValue;
        },

        dashWhenZeroCurrency: function (value) {
            var number = Number(value) || 0;
            return number ? "R$ " + currencyFormat.format(number) : "-";
        },

        integer: function (value) {
            return integerFormat.format(Number(value) || 0);
        },

        dashWhenZeroInteger: function (value) {
            var number = Number(value) || 0;
            return number ? integerFormat.format(number) : "-";
        },

        percentage: function (value) {
            return percentFormat.format(Number(value) || 0);
        },

        balanceState: function (value) {
            return Number(value) < 0 ? "Error" : "Success";
        },

        rowHighlight: function (isTotal) {
            return isTotal ? "Information" : "None";
        },

        updatedAt: function (label, dateValue) {
            if (!dateValue) {
                return "";
            }
            return label + " " + DateFormat.getDateInstance({ style: "medium" })
                .format(new Date(dateValue + "T12:00:00"));
        }
    };
});
