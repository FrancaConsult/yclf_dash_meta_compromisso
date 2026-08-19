sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/unified/DateTypeRange",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    function (Controller, formatter, Fragment, DateTypeRange, MessageToast) {
        "use strict";

        return Controller.extend("yclf.dash360.metacompromisso.controller.Material", {

            formatter: formatter,
            onInit: function () {
            },

            onHandleMatDescriptionValueHelp: function () {

                //Forma de chamar um fragmento em uma versão <= 15.6 - Halex Istar

                if (!this._MaterialDescriptionHelp) {
                    this._MaterialDescriptionHelp = sap.ui.xmlfragment("yclf.dash360.metacompromisso.fragment.MaterialDescription", this);
                    this.getView().addDependent(this._MaterialDescriptionHelp);
                }

                this._MaterialDescriptionHelp.open();
            },


            onHandleMatTypeDescriptionValueHelp: function () {

                //Forma de chamar um fragmento em uma versão >= 15.6 - Taurus/Cantu
                let oView = this.getView();

                if (!this._MaterialTypeDescription) {
                    this._MaterialTypeDescription = Fragment.load({
                        id: oView.getId(),
                        name: "yclf.dash360.metacompromisso.fragment.MaterialTypeDescription",
                        controller: this
                    }).then(function (MaterialTypeDescription) {
                        oView.addDependent(MaterialTypeDescription);
                        return MaterialTypeDescription;
                    });
                }

                this._MaterialTypeDescription.then(function (MaterialTypeDescription) { MaterialTypeDescription.open(); });
            },

            onSearchMaterial: function () {

                let oType = this.byId("YCLFDASH360FilterbarMaterialType").getValue();
                let oMaterial = this.byId("YCLFDASH360FilterbarMaterial").getValue();

                let aFilters = [];

                if (oMaterial) {
                    oMaterial = oMaterial.padStart(18, "0");

                    aFilters.push(
                        new sap.ui.model.Filter(
                            "Material",
                            sap.ui.model.FilterOperator.EQ,
                            oMaterial
                        )
                    );
                }

                if (oType) {
                    aFilters.push(
                        new sap.ui.model.Filter(
                            "Type",
                            sap.ui.model.FilterOperator.Contains,
                            oType
                        )
                    );
                }

                var oDateRange = this.byId("filterDateRange");
                var oDateFrom  = oDateRange.getDateValue();
                var oDateTo    = oDateRange.getSecondDateValue();

                if (oDateFrom && oDateTo) {
                    aFilters.push(
                        new sap.ui.model.Filter(
                            "CreatedAtDate",
                            sap.ui.model.FilterOperator.BT,
                            oDateFrom,
                            oDateTo
                        )
                    );
                }

                let oTable = this.byId("MaterialTable");
                let oTemplate = this.byId("MaterialTableColumnListItem");

                oTable.unbindAggregation("items");

                oTable.bindItems({
                    path: "/Z_I_MATERIAL",
                    template: oTemplate,
                    templateShareable: true,
                    filters: aFilters
                });

            },

            onHandleConfirmMatDesc: function (oEvent) {
                let oMaterial = oEvent.getParameter("selectedItem").getTitle();

                if (oMaterial) {
                    this.byId("YCLFDASH360FilterbarMaterial").setValue(oMaterial);
                }

                oEvent.getSource().getBinding("items").filter([]);

            },

            onHandleConfirmMaTypetDesc: function (oEvent) {
                let oMaterialType = oEvent.getParameter("selectedItem").getTitle();
                this.getView().byId("YCLFDASH360FilterbarMaterialType").setValue(oMaterialType);

                if (oMaterialType) {
                    this.byId("YCLFDASH360FilterbarMaterialType").setValue(oMaterialType);
                }

                oEvent.getSource().getBinding("items").filter([]);
            },

            onHandleMatDescriptionVHSearch: function (oEvent) {

                let oMaterial = oEvent.getParameter("value");
                let oFilterValues = new Array();
                let oFilterConsumption;

                oFilterValues.push(new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.EQ, oMaterial));
                oFilterConsumption = new sap.ui.model.Filter({ aFilters: oFilterValues, bAnd: false });

                oEvent.getSource().getBinding("items").filter(oFilterConsumption);

            },

            onHandleMatTypeDescriptionVHSearch: function (oEvent) {

                let oType = oEvent.getParameter("value");
                let oFilterValues = new Array();
                let oFilterConsumption;

                oFilterValues.push(new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, oType));
                oFilterConsumption = new sap.ui.model.Filter({ aFilters: oFilterValues, bAnd: false });

                oEvent.getSource().getBinding("items").filter(oFilterConsumption);

            },

            onNavigateToObject: function (oEvent) {

                const oContext = oEvent.getSource().getBindingContext();

                if (!oContext) {
                    MessageToast.show("Contexto não encontrado");
                    return;
                }
                const sMaterial = oContext.getProperty("Material");

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("MaterialObject", { Material: sMaterial });
            }


        });
    });
