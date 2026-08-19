sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "yclf/dash360/metacompromisso/model/formatter",
    "yclf/dash360/metacompromisso/service/ReportService"
], function (Controller, JSONModel, formatter, ReportService) {
    "use strict";

    return Controller.extend("yclf.dash360.metacompromisso.controller.SegmentDetail", {
        formatter: formatter,

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("SegmentDetail")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Dashboard", {}, true);
        },

        _onRouteMatched: function (event) {
            this._segmentId = decodeURIComponent(event.getParameter("arguments").segmentId);
            this._bindSelectedSegment();
        },

        _bindSelectedSegment: function () {
            var data = this.getOwnerComponent().getModel("business").getData();
            var segment = data.segments.find(function (item) {
                return item.id === this._segmentId;
            }, this);
            var detail = ReportService.findSegmentDetail(data, this._segmentId);

            if (!segment || !detail) {
                this.onNavBack();
                return;
            }
            this.getView().setModel(new JSONModel({
                segment: segment,
                detail: detail
            }), "detail");
        }
    });
});
