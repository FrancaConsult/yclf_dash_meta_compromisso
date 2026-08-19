/*global QUnit*/
sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/Dashboard"
], function (opaTest) {
    "use strict";

    QUnit.module("Jornada do dashboard");

    opaTest("Exibe o relatório e navega para o detalhe", function (Given, When, Then) {
        Given.iStartMyApp();
        Then.onTheDashboard.iShouldSeeTheDashboard();
        When.onTheDashboard.iPressTheFirstFamily();
        Then.onTheDashboard.iShouldSeeTheFamilyDetail();
        Then.iTeardownMyApp();
    });
});
