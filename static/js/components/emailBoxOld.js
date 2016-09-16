//  simple event-handler to dynamically add or remove email-textfields
$(document).ready(function () {
    $(".addEmailField").click(function () {
        var emailBoxId = $(this).attr("emailBoxId");
        if (emailBoxId === undefined) {
            emailBoxId = "emailBox";
        }
        var emailAddressId = $(this).attr("emailAddressesId");
        if(emailAddressId === undefined) {
            emailAddressId = "emailAddresses";
        }
        $('<div class="emailBoxRow">' +
                '<div class="removeEmailField" onclick="$(this).parent().remove();">-</div><div style="float: left">' +
                '<input class="field anotherBCCField" type="text" size="50" name="' + emailAddressId + '"/></div>' +
                '<div class="clear"></div></div>').appendTo('#' + emailBoxId);
        $(".anotherBCCField").last().focus();
    });
    $(".removeEmailField").mouseover(function () {
        $(this).css('cursor', 'pointer');
    });
    $(".removeEmailField").click(function () {
        $(this).parent().remove()
    });
});