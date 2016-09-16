var app = app || {};
app.forms = {};

/**
 *
 * @param maxAmount maximum amount of selectable checkboxes
 * @param checkboxSelector CSS selector to find checkboxes
 * @param errorMsgSelector CSS selector to find element that will contain the error message
 */
app.forms.validateCheckboxAmount = function (maxAmount, checkboxSelector, errorMsgSelector, errorMsg) {
    var checkboxes = $(checkboxSelector);

    checkboxes.click(function() {
        var value = 0;
        //count checked checkboxes
        $(checkboxSelector + ':checked').each(
                function() {
                    value++;
                });

        app.utils.hideOrShowErrorMsg(value > maxAmount, errorMsg, errorMsgSelector);
    });

};


/**
 * Applies a special CSS class ("active") to the parent element of a radio button when it is selected; parent element
 * needs to have CSS class "radioButtonActiveTarget" and radio buttons need to have CSS class "radioButtonActiveTrigger"
 */
app.forms.initRadioButtonsForActiveStyles = function() {
    //set current active state
    $(".radioButtonActiveTrigger:checked").parents('.radioButtonActiveTarget').addClass("active");

    //change active state on radio button selection change
    $(".radioButtonActiveTrigger").change(function() {
        var el = $(this);
        var target = el.parents('.radioButtonActiveTarget');
        target.siblings('.radioButtonActiveTarget').removeClass("active");
        target.addClass("active");
    });
};