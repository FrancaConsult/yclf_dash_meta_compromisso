sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "yclf/dash360/metacompromisso/model/formatter",
    "yclf/dash360/metacompromisso/service/ReportService"
], function (Controller, JSONModel, MessageToast, formatter, ReportService) {
    "use strict";

    return Controller.extend("yclf.dash360.metacompromisso.controller.FamilyDetail", {
        formatter: formatter,

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("FamilyDetail")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Dashboard", {}, true);
        },

        onValueChange: function () {
            ReportService.recalculate(this.getOwnerComponent().getModel("business"));
            this._bindSelectedFamily();
            MessageToast.show(this.getOwnerComponent().getModel("i18n")
                .getResourceBundle().getText("dataSaved"));
        },

        _onRouteMatched: function (event) {
            this._familyId = decodeURIComponent(event.getParameter("arguments").familyId);
            this._bindSelectedFamily();
        },

        _bindSelectedFamily: function () {
            var data = this.getOwnerComponent().getModel("business").getData();
            var family = data.families.find(function (item) {
                return item.id === this._familyId;
            }, this);
            var detail = ReportService.findFamilyDetail(data, this._familyId);

            if (!family || !detail) {
                this.onNavBack();
                return;
            }
            this.getView().setModel(new JSONModel({
                family: family,
                detail: detail
            }), "detail");
        }
    });
});
