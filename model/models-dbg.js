sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "yclf/dash360/metacompromisso/service/ReportService"
], function (JSONModel, Device, ReportService) {
    "use strict";

    return {
        createDeviceModel: function () {
            var model = new JSONModel(Device);
            model.setDefaultBindingMode("OneWay");
            return model;
        },

        createViewModel: function () {
            return new JSONModel({
                busy: true,
                filters: {
                    salesTeam: "",
                    salesOffices: [],
                    dateRange: "2026-06-01 - 2026-06-12",
                    startDate: "2026-06-01",
                    endDate: "2026-06-12"
                },
                selectedFamily: {}
            });
        },

        createBusinessModel: function () {
            var model = new JSONModel();
            model.setSizeLimit(1000);
            ReportService.load(model);
            return model;
        }
    };
});
