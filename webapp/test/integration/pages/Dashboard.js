sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    Opa5.createPageObjects({
        onTheDashboard: {
            actions: {
                iPressTheFirstFamily: function () {
                    return this.waitFor({
                        id: "familiesTable",
                        viewName: "Dashboard",
                        success: function (table) {
                            table.getItems()[0].firePress();
                        }
                    });
                }
            },
            assertions: {
                iShouldSeeTheDashboard: function () {
                    return this.waitFor({
                        id: "dashboardPage",
                        viewName: "Dashboard",
                        success: function () {
                            Opa5.assert.ok(true, "Dashboard exibido");
                        }
                    });
                },
                iShouldSeeTheFamilyDetail: function () {
                    return this.waitFor({
                        id: "familyObjectPage",
                        viewName: "FamilyDetail",
                        success: function () {
                            Opa5.assert.ok(true, "Object Page exibida");
                        }
                    });
                }
            }
        }
    });
});
