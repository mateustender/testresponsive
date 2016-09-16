var timeout = 2000; // timeout used to hide message labels in milliseconds
var isReminderDatePickerActive = false;

function showHideReminderDateInputCalender() {
    if (isReminderDatePickerActive == true) {
        $("#reminderDate").datepicker("hide");
        isReminderDatePickerActive = false;
    } else {
        $("#reminderDate").datepicker("show");
        isReminderDatePickerActive = true;
    }
}

$(document).ready(function () {
    //generates the tender map
    //generateTenderMap();

    // Notes
    $('#noteSubmit').click(function () {
        var tenderId = encodeURI($('input#noteTenderId').val());
        var note = encodeURI($('textarea#noteText').val());
        var user = encodeURI($('input#noteUser').val());

        var url = $(this).attr('baseUrl') + "/" + tenderId + "/" + note;

        $.ajax({
            type: "POST",
            url: url,
            data: {user: user},
            success: function (data) {
                $(".returnMessage").not("#noteReturnMessageNoteSaved").hide()
                $("#noteReturnMessageNoteSaved").show()
                $("#noteDiv").show()
                $("#notePre").text($('textarea#noteText').val())

                if ($.trim(note) == '') {
                    $("#noteDiv").hide()
                }

            },
            error: function () {
                // show error message
                $(".returnMessage").not("#noteReturnMessageErrorOcurred").hide()
                $("#noteReturnMessageErrorOcurred").show()
            },
            complete: function () {
                setTimeout("$('.detail-options a[href=\"#item-note\"]').click();", timeout) // triggers the original toggle effect of the note button after 2 seconds
            }
        });

        // disables the default behaviour
        return false;
    });

    // Forward
    $('#forwardSubmit').click(function () {
        var senderEmail = $('input#senderEmail').val();
        var senderName = $('input#senderName').val();
        var recipientEmail = $('input#recipientEmail').val();
        var recipientName = $('input#recipientName').val();
        var forwardText = $('textarea#forwardText').val();
        var tenderUUID = $('input#forwardTenderId').val();

        if (!mailCheck(senderEmail) || !mailCheck(recipientEmail)) {
            // one of the selected emails is not valid
            $(".returnMessage").not("#forwardReturnMessageInvalidMails").hide()
            $("#forwardReturnMessageInvalidMails").show()
            return false;
        }

        var url = $(this).attr('baseUrl');

        $.ajax({
            type: "POST",
            url: url,
            data: {senderEmail: senderEmail, senderName: senderName, recipientEmail: recipientEmail, recipientName: recipientName, forwardText: forwardText, uuid: tenderUUID},
            success: function (data) {
                // show success message
                $(".returnMessage").not("#forwardReturnMessageSent").hide()
                $("#forwardReturnMessageSent").show()
            },
            error: function () {
                // show error message
            },
            complete: function () {
                setTimeout("$('.detail-options a[href=\"#item-send\"]').click();", timeout) // triggers the original toggle effect of the forward button after 2 seconds
            }
        });

        // disables the default behavior
        return false;
    });

    // send attachmentRequest per Ajax
    $('#attachmentRequest').click(function () {
        var tenderId = $('input#requestTenderId').val();
        var uuid = $('input#requestTenderUUID').val();
        var user = $('input#requestUserUUID').val();
        var ascForAttachments = $('input#ascForAttachments').val();
        var sp = $('input#sp').val();

        var submitButton = $("#attachmentRequest");
        var errMsg = $("#msgErrorDuringAttachmentRequest");
        var successMsg = $("#msgSuccessfulAttachmentRequest");

        if (!confirm(ascForAttachments)) return;

        var url = $(this).attr('baseUrl');

        $.ajax({
            type: "POST",
            url: url,
            data: {tenderId: tenderId, uuid: uuid, user: user, sp: sp},
            success: function (data) {
                errMsg.hide();
                successMsg.show();
                submitButton.hide();
            },
            error: function () {
                errMsg.show();
                successMsg.hide();
            },
            complete: function () {
                setTimeout("$('.detail-options a[href=\"#item-request\"]').click();", timeout);
            }
        });

        return false;
    });

    // Add to Favourites
    $('#favouriteSubmit').click(function () {

        if (!$('#favouriteSubmit').parent("li").hasClass("item-fav-added")) {
            if ($('#favouriteSubmit').parent("li").addClass('current').find('.item-box').is(':visible')) {
                $('#favouriteSubmit').parent("li").removeClass('current').find('.item-box').hide();
                $('#favAskForReminder').hide();
            } else {
                $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                $('#favAskForReminder').show();
            }
        }

        // disables the default behavior
        return false;
    });

    $('#hasReminder').click(function () {
        $('#reminderDateSpan').toggleClass('favorite-tender-reminder-hidden');
        $('#reminderDateSpan').toggleClass('favorite-tender-reminder-shown');
    });


    // Add to Favourites
    $('#addFavButtonConfirm').click(function () {

        var url = $('#favouriteSubmit').attr('baseUrl');
        var uuid = $('#favouriteSubmit').attr('uuid');
        var user = $('#favouriteSubmit').attr('user');
        var tenderLanguage = $('#favouriteSubmit').attr('tenderLanguage');

        var reminder = $('#hasReminder').is(':checked');
        var reminderDate = $('#reminderDate').val();

        $('#favouriteSubmit').parent("li").removeClass('current')
        $('#favAskForReminder').hide();
        $('#item-fav').hide();

        $.ajax({
            type: "POST",
            url: url,
            data: {uuid: uuid, withReminder: reminder, reminderDate: reminderDate, user: user, tenderLanguage: tenderLanguage},
            success: function (data) {
                data = $.trim(data);

                // show successfully added label
                if (data == "addedSuccessfully") {
                    $('#favouriteSubmit').parent("li").removeClass("item-fav").addClass("item-fav-added");
                    $('.detail-options li').removeClass('current').find('.item-box').hide();
                    $('.returnMessage').not('#favReturnMessageAddedSuccessfully').hide();
                    $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                    $('#favReturnMessageAddedSuccessfully').show();

                    setTimeout("$('#favouriteSubmit').parent('li').removeClass('current').find('.item-box').hide();$('#favReturnMessageAddedSuccessfully').hide();", timeout)
                }

                // show problem occured label
                if (data == "problemOccure") {
                    $('.detail-options li').removeClass('current').find('.item-box').hide();
                    $('.returnMessage').not('#favReturnMessageProblemOccured').hide();
                    $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                    $('#favReturnMessageProblemOccured').show();

                    setTimeout("$('#favouriteSubmit').parent('li').removeClass('current').find('.item-box').hide();$('#favReturnMessageProblemOccured').hide();", timeout)
                }

                // show not logged label
                if (data == "notLogged") {
                    $('.detail-options li').removeClass('current').find('.item-box').hide();
                    $('.returnMessage').not('#favReturnMessageNotLogged').hide();
                    $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                    $('#favReturnMessageNotLogged').show();

                    setTimeout("$('#favouriteSubmit').parent('li').removeClass('current').find('.item-box').hide();$('#favReturnMessageNotLogged').hide();", timeout)
                }

                // show already added label
                if (data == "alreadyAdded") {
                    $('.detail-options li').removeClass('current').find('.item-box').hide();
                    $('.returnMessage').not('#favReturnMessageAlreadyAdded').hide();
                    $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                    $('#favReturnMessageAlreadyAdded').show();

                    setTimeout("$('#favouriteSubmit').parent('li').removeClass('current').find('.item-box').hide();$('#favReturnMessageAlreadyAdded').hide();", timeout)
                }
            },
            error: function () {
                // show problem occured label
                $('.detail-options li').removeClass('current').find('.item-box').hide();
                $('.returnMessage').not('#favReturnMessageProblemOccured').hide();
                $('#favouriteSubmit').parent("li").addClass('current').find('.item-box').show();
                $('#favReturnMessageProblemOccured').show();

                setTimeout("$('#favouriteSubmit').parent('li').removeClass('current').find('.item-box').hide();$('#favReturnMessageProblemOccured').hide();", timeout)
            },
            complete: function () {
            }
        });
    });


    // Print
    $('#printSubmit').click(function () {
        window.print();

        // disables the default behaviour
        return false;
    });

    // Note and Forward buttons
    $('.detail-options a[href="#item-send"], .detail-options a[href="#item-note"], .detail-options a[href="#item-request"]').toggle(function () {
        $('.detail-options li').removeClass('current').find('.item-box').hide();
        $(this).parent().addClass('current').find('.item-box').show();
        return false;
    }, function () {
        $(this).parent().removeClass('current').find('.item-box').hide();
        return false;
    });

    //Limit the size of the note
    $("#noteText").keyup(function () {
        if ($("#noteText").val().length > 1000) {
            $("#noteText").val($("#noteText").val().substring(0, 1000));
        }
    });
});

function mailCheck(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

