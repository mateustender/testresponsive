var app = app || {};
app.treeNodes = app.treeNodes || {};


/**
 * open or close node in a tree
 *  manual call is mandatory from ajax-rendered templates (document.ready does not work there)
 *  @param nodeLink
 */
app.treeNodes.toggleNode = function (nodeLink) {
    // open layer
    var id = nodeLink.attr("id");
    var node = $("#node" + id);
    var nodeVisible = node.hasClass("nodeItem");
    if(nodeVisible) {
        node.removeClass("nodeItem").addClass("invisible");
    } else {
        node.removeClass("invisible").addClass("nodeItem");
    }

    // toggle symbol-design
    var active = nodeLink.text() == "+";
    if (active) {
        nodeLink.text("-");
        nodeLink.removeClass('nodeLink').addClass("nodeLinkInactive");
    }
    else {
        nodeLink.text("+");
        nodeLink.removeClass("nodeLinkInactive").addClass("nodeLink");
    }
};

$(document).ready(function () {
    // handle all node-links (references)
    var links = $(".nodeLink");
    links.click(function () {
        app.treeNodes.toggleNode($(this));
    });
});
