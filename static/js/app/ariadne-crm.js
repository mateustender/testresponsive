/**
 * Used to show a specific tab in the customer CRM detail view.
 */
function showOtherSheet(sheetId) {
    $("#myTab1").find("a").each(function () {
        if ($(this).attr("href") == "#" + sheetId) {
            $(this).click();
        }
    });
}

/**
 * Shows the e-mail detail view under the given HTML container.
 */
function showEmailDetails(linkElement, parentContainer, listContainer, sheet) {

    $.get($(linkElement).attr('href'), {}, function (data) {

        var emailContainer = $('#' + parentContainer);
        if (emailContainer) {

            $('#' + listContainer).hide();

            showOtherSheet(sheet);

            emailContainer.html(data);
            emailContainer.show();
        }
    });
}

function hideEmailDetails(parentContainer, listContainer) {

    var emailContainer = $('#' + parentContainer);
    if (emailContainer) {

        $('#' + listContainer).show();
        emailContainer.hide();
    }

}