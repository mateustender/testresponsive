
function appendSelectedValueFromPopup(cpvCode, appendElementId, delimiter, postfix)  {
    var cpvCodes = $(appendElementId);
    var text = cpvCodes.val();
    var appendComma = text.lastIndexOf(delimiter) !== (text.length - 1);
    var pos = postfix ? postfix : ''

    cpvCodes.val(appendComma && text.length > 0 ? text + delimiter + cpvCode + pos : text + cpvCode + pos);
}

function registerClickEventForSelectorPopup(elementId, appendElementId, link, delimiter)  {
    return registerClickEventForSelectorPopup(elementId, appendElementId, link, delimiter, '', null)
}

function registerClickEventForSelectorPopup(elementId, appendElementId, link, delimiter, postfix)  {
    return registerClickEventForSelectorPopup(elementId, appendElementId, link, delimiter, postfix, null)
}

function registerClickEventForSelectorPopup(elementId, appendElementId, link, delimiter, postfix, fnCallbackOpen)  {

    $(elementId).click(function() {
        window.open(link, "popupWindow", "width=800,height=700,scrollbars=yes");

        if (fnCallbackOpen) fnCallbackOpen();

        window.popupValueChosen = function(msg) {
            return appendSelectedValueFromPopup(msg, appendElementId, delimiter, postfix);
        };

        return false;
    });
}