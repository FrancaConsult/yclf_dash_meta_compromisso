sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/GroupHeaderListItem",
    "sap/m/MessageToast",
    "yclf/dash360/metacompromisso/model/formatter",
    "yclf/dash360/metacompromisso/service/ReportService"
], function (Controller, Filter, FilterOperator, GroupHeaderListItem, MessageToast, formatter, ReportService) {
    "use strict";

    return Controller.extend("yclf.dash360.metacompromisso.controller.Dashboard", {
        formatter: formatter,

        onInit: function () {
            var businessModel = this.getOwnerComponent().getModel("business");
            if (businessModel.getProperty("/segments")) {
                this.getOwnerComponent().getModel("view").setProperty("/busy", false);
            }
            businessModel.attachRequestCompleted(function () {
                this.getOwnerComponent().getModel("view").setProperty("/busy", false);
            }, this);
        },

        onSearch: function () {
            var filters = this.getOwnerComponent().getModel("view").getProperty("/filters");
            if (!this._isDateRangeValid(filters)) {
                MessageToast.show(this.getResourceBundle().getText("invalidDateRange"));
                return;
            }
            this._applyTableFilters(filters);
            MessageToast.show(this.getResourceBundle().getText("filtersApplied"));
        },

        onResetFilters: function () {
            this.getOwnerComponent().getModel("view").setProperty("/filters", {
                salesTeam: "",
                salesOffices: [],
                dateRange: "2026-06-01 - 2026-06-12",
                startDate: "2026-06-01",
                endDate: "2026-06-12"
            });
            this._applyTableFilters({});
        },

        onDateRangeChange: function (event) {
            var viewModel = this.getOwnerComponent().getModel("view");
            var startDate = event.getParameter("from");
            var endDate = event.getParameter("to");

            viewModel.setProperty("/filters/startDate", this._formatDate(startDate));
            viewModel.setProperty("/filters/endDate", this._formatDate(endDate));
        },

        onSegmentPress: function (event) {
            var segment = this._getBusinessObjectFromEvent(event);
            if (!segment.isTotal) {
                this.getOwnerComponent().getRouter().navTo("SegmentDetail", {
                    segmentId: encodeURIComponent(segment.id)
                });
            }
        },

        onFamilyPress: function (event) {
            var family = this._getBusinessObjectFromEvent(event);
            if (!family.isTotal) {
                this.getOwnerComponent().getRouter().navTo("FamilyDetail", {
                    familyId: encodeURIComponent(family.id)
                });
            }
        },

        getSegmentGroupHeader: function (group) {
            return new GroupHeaderListItem({
                title: Number(group.key) === 1 ? "GNP" : "GNI",
                upperCase: false
            }).addStyleClass("segmentManagementGroupHeader");
        },

        onValueChange: function () {
            ReportService.recalculate(this.getOwnerComponent().getModel("business"));
            MessageToast.show(this.getResourceBundle().getText("dataSaved"));
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        _isDateRangeValid: function (filters) {
            return !filters.startDate ||
                !filters.endDate ||
                filters.startDate <= filters.endDate;
        },

        _formatDate: function (date) {
            if (!date) {
                return "";
            }
            return [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0")
            ].join("-");
        },

        _applyTableFilters: function (filters) {
            var segmentFilters = this._createSegmentFilters(filters);
            var familyFilters = this._createFamilyFilters(filters);
            this.byId("segmentsTable").getBinding("items").filter(segmentFilters);
            this.byId("familiesTable").getBinding("items").filter(familyFilters);
        },

        _createSegmentFilters: function (filters) {
            var result = [];
            if (filters.salesTeam) {
                result.push(new Filter("salesTeamId", FilterOperator.EQ, filters.salesTeam));
            }
            if (this._hasSelectedSalesOffices(filters)) {
                result.push(new Filter({
                    path: "salesOfficeIds",
                    test: function (salesOfficeIds) {
                        return Array.isArray(salesOfficeIds) &&
                            filters.salesOffices.some(function (salesOffice) {
                                return salesOfficeIds.indexOf(salesOffice) !== -1;
                            });
                    }
                }));
            }
            return result;
        },

        _createFamilyFilters: function (filters) {
            var result = [];
            if (this._hasSelectedSalesOffices(filters)) {
                result.push(new Filter({
                    path: "salesOfficeIds",
                    test: function (salesOfficeIds) {
                        return Array.isArray(salesOfficeIds) &&
                            filters.salesOffices.some(function (salesOffice) {
                                return salesOfficeIds.indexOf(salesOffice) !== -1;
                            });
                    }
                }));
            }
            return result;
        },

        _hasSelectedSalesOffices: function (filters) {
            return Array.isArray(filters.salesOffices) && filters.salesOffices.length > 0;
        },

        _getBusinessObjectFromEvent: function (event) {
            return event.getSource().getBindingContext("business").getObject();
        }
    });
});
