sap.ui.require([
    "sap/ui/core/Element"
], function (Element) {
    "use strict";

    var remainingAttempts = 120;

    function addResponsivePadding() {
        var shellHeader = Element.getElementById("shell-header");

        if (shellHeader) {
            shellHeader.addStyleClass("sapUiResponsiveContentPadding");
            return;
        }

        remainingAttempts -= 1;
        if (remainingAttempts > 0) {
            window.requestAnimationFrame(addResponsivePadding);
        }
    }

    addResponsivePadding();
});
