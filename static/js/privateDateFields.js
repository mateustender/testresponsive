// ------------- Date FILTERS ------------------- */
var now = new Date();
var dateFormat = app.config.datePicker.dateFormat || "dd.mm.y";
var sliderValues = [-20, 20];

//sliders

$('.slider-range').slider({
    range: true,
    min: $(this).siblings('#minValue').val(),
    max: $(this).siblings('#maxValue').val(),
    values: sliderValues,
    start: function (event, ui) {
        sliderValues[0] = parseInt(ui.values[0], 10);
        sliderValues[1] = parseInt(ui.values[1], 10);
    },
    slide: function (event, ui) {
        var date = new Date();
        if (sliderValues[0] != parseInt(ui.values[0], 10)) {
            sliderValues[0] = parseInt(ui.values[0], 10);
            date.setDate(now.getDate() + ui.values[0]);
            $(this).parent().parent().find('.begin .date-slider').val($.datepicker.formatDate(dateFormat, date));
            restrictDatepicker($(this).parent().parent().find('.begin .date-slider'));
        }
        else if (sliderValues[1] != parseInt(ui.values[1], 10)) {
            sliderValues[1] = parseInt(ui.values[1], 10);
            date.setDate(now.getDate() + ui.values[1]);
            $(this).parent().parent().find('.end .date-slider').val($.datepicker.formatDate(dateFormat, date));
            restrictDatepicker($(this).parent().parent().find('.end .date-slider'));
        }
    }
});


//date pickers
var currentLanguageId = $("#selectedLanguageID").val();
if (currentLanguageId == 'sr') currentLanguageId = 'sr-SR';
$('.date-slider').each(function (index) {
    var date = $.datepicker.parseDate(dateFormat, $(this).val());

    $(this).datepicker($.datepicker.regional[ currentLanguageId ]);
    $(this).datepicker("option", "dateFormat", dateFormat);
    $(this).datepicker("option", "showAnim", "fadeIn");
    $(this).datepicker("option", "firstDay", "1");

    if ( $(this).hasClass("birth-date") ) {
        $(this).datepicker("option", "changeYear", true);
        $(this).datepicker("option", "yearRange", "c-80:-18" );
        $(this).datepicker("option", "changeMonth", true);
    }

    $(this).datepicker("option", "onSelect", function () {
        syncDate(now, this);

    });

    if (isFinite(date)) {
        $(this).datepicker("setDate", date);
        syncDate(now, this);
    }

});

//sets the max/min date on a datepicker so that the start date can not be after the end date
function restrictDatepicker(element) {
    var date = $(element).datepicker('getDate');
    if ($(element).parent().hasClass('begin')) {
        $(element).parent().parent().find('.end .date-slider').datepicker('option', 'minDate', date);
    }
    else if ($(element).parent().hasClass('end')) {
        $(element).parent().parent().find('.begin .date-slider').datepicker('option', 'maxDate', date);
    }
}


//move slider when datepicker date is changed
function syncDate(now, element) {

    var date = $(element).datepicker('getDate');
    var slider;
    if ($(element).parent().hasClass('begin')) {
        slider = 0;
    } else if ($(element).parent().hasClass('end')) {
        slider = 1;
    }

    if (date != null && date instanceof Date) {
        var sliderElement = $(element).parent().parent().parent().find('.slider-range')
        $(sliderElement).slider('values', slider, daysDifference(now, date, sliderElement));
    }

    restrictDatepicker(element);
}

function daysDifference(startDate, endDate, sliderElement) {
    var result = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000); //number of milliseconds per day, does not work with daylight saving
    var minValue = $(sliderElement).slider('option', 'min');
    var maxValue = $(sliderElement).slider('option', 'max');
    if (result < minValue) {
        result = minValue;
    }
    else if (result > maxValue) {
        result = maxValue;
    }
    return  result;
}