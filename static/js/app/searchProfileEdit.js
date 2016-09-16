function enableDisableExcludeEmptyValues(lowerBoundField) {

	var row = $(lowerBoundField).parents("div.row")[0];
	var excludeEmptiesCheckbox = $(row).find("input[type='checkbox']");

	if ($(lowerBoundField).val() && $(lowerBoundField).val() != '0') {
		$(excludeEmptiesCheckbox).parent().removeClass("state-disabled")
		$(excludeEmptiesCheckbox).removeAttr('disabled');
	} else {
		$(excludeEmptiesCheckbox).parent().addClass("state-disabled")
		$(excludeEmptiesCheckbox).attr('disabled','disabled');
		$(excludeEmptiesCheckbox).attr('checked', false);
	}

}