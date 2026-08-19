sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/MessageToast"
], function (Controller, Dialog, Button, Text, MessageToast) {
    "use strict";
    return Controller.extend("yclf.dash360.metacompromisso.controller.MaterialObject",
        {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("MaterialObject")
                    .attachPatternMatched(this._onObjectMatched, this);
            },

             
            _onObjectMatched: function (oEvent) {
                const sMaterial = oEvent.getParameter("arguments").Material;

                this._sMaterialPath = "/Z_I_MATERIAL('" + sMaterial + "')";
             

                this.getView().bindElement({
                    path: this._sMaterialPath,
                    model: undefined,
                    parameters: {
                        expand:  "to_Plant"
                    }
                });

                console.log("Material recebido:", sMaterial);
            },
            
        }
    );
});