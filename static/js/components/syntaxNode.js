/**
 * get the actual ajax response from syntaxNodeEditor and show in the container
 * @param response  (response-text)
 * @param fieldId   (fielö to show the response)
 */
function handleSyntaxNodeResponse(response, fieldId) {
    $("#mySpinner").fadeOut();
    jQuery("#error_" + fieldId).hide();
    jQuery('#' + fieldId).html(response);
}

/**
 * handle error that occurred during attempt to get the syntaxNode
 * @param xhr  (XMLHttpResponse-object)
 * @param errFieldId  (field to show the error)
 */
function handleSyntaxNodeErrorResponse(xhr, errFieldId) {
    $("#mySpinner").fadeOut();
    jQuery('#' + errFieldId).show().html("<div class='errorContainerHeader'>SyntaxNode incorrect</div>" + xhr.responseText);
}

/**
 * toggle syntax-container and activate the syntax-button
 * @param nodeId
 * @param containerId
 */
function callSyntaxNodeButton(nodeId, containerId) {
    var layer = $("#" + containerId);
    layer.toggle("slow");

    var nodeLink = $("#" + nodeId);
    nodeLink.toggleClass("displaySyntaxActive");
}
