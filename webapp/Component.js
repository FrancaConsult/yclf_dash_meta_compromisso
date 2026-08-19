sap.ui.define([
    "sap/ui/core/UIComponent",
    "yclf/dash360/metacompromisso/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("yclf.dash360.metacompromisso.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createViewModel(), "view");
            this.setModel(models.createBusinessModel(), "business");
            this.getRouter().initialize();
        }
    });
});
