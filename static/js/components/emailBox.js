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
        $('<tr>' +
			'<td style="width: 25px;">' +
				'<a class="removeEmailRow pull-right" onclick="$(this).parent().parent().remove();">' +
					'<i class="fa fa-lg fa-trash-o"></i>' +
				'</a>'+
			'</td><td>' +
                '<label class="input"><input class="input-xs anotherBCCField" type="text" name="' + emailAddressId + '"/></label>' +
                '<div class="clear"></div></div>' +
			'</td>' +
		'</tr>').appendTo('#' + emailBoxId);
        $(".anotherBCCField").last().focus();
    });
    $(".removeEmailRow").mouseover(function () {
        $(this).css('cursor', 'pointer');
    });
    $(".removeEmailRow").click(function () {
        $(this).parent().parent().remove()
    });
});