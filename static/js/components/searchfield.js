var app = app || {};
app.searchField = app.searchField || {};

app.searchField.addBoolField = function (boolField, fieldId) {
    if (!boolField || !fieldId) return;

    var field = $('textarea#' + fieldId);
    var fieldContent = app.searchField.trim(field.val());
    fieldContent = fieldContent + " " + boolField + " ";
	field.focus();
	field.val('');
    field.val(fieldContent);
};

app.searchField.stemField = function (ajaxUrl, sfName, fieldId) {
	if (!fieldId || !sfName) return;

	var field = $('textarea#' + fieldId);
	var fieldContent = app.searchField.trim(field.val());

	$.get( ajaxUrl, { field: sfName, text: fieldContent }, function( data ) {
		field.focus();
		field.val('');

		field.val(data);
	});
};

/**
 * remove all syntactical wrong stuff
 * @param text
 */
app.searchField.tidyRule = function (text) {
    if (!text || text == "") return text;

    var newText = text.replace(/(OR\s*?){2,}/g, " OR "); // replace 2 or more ORs in a row by one OR
    newText = newText.replace(/(AND\s*?){2,}/g, " AND ");  //replace 2 or more ANDs in a row by one AND
    newText = newText.replace(/(NOT\s*?){2,}/g, " NOT "); //replace 2 or more NOTs in a row by one NOT
    newText = newText.replace(/OR\s*AND/g, " AND ");  // OR AND -> AND
    newText = newText.replace(/AND\s*OR/g, " OR "); // AND OR -> OR
    newText = newText.replace(/^\s*(AND|OR|NOT)/g, ""); // AND or OR or NOT at the beginning -> '')
    newText = newText.replace(/(AND|OR|NOT)\s*$/, ""); //AND or OR or NOT at the end -> ''
    newText = newText.replace(/\(\s*(OR|AND|NOT)/g, " ( ");  // ( AND or OR or NOT -> '('
    newText = newText.replace(/(AND|OR|NOT)\s*\)/g, " ) ");  // AND or OR or NOT  ) -> ')'
    newText = newText.replace(/(AND|OR)\s*\)/g, " ) ");  // AND or OR ) -> ')'
    return app.searchField.trim(newText);
};

/**
 * remove spaces at the beginning an end of a string and reduce more spaces to one
 * @param text
 */
app.searchField.trim = function (text) {
    if (!text || text == "") return text;
    text = text.replace(/\s+/g, " ");
    return text.replace(/^\s+|\s+$/g, "");
};

app.searchField.selectDeselectAll = function (select, fieldName) {
	if (!fieldName) return;

	$('input[name="' + fieldName + '"]').each(function() {
		$(this).prop( "checked", select );
	});
};

$(document).ready(function () {
    $(".fieldCbx, .expertFieldCbx").click(function () {
        var DELIMITER = "##";
        var ruleId = this.className == "fieldCbx" ? "rule" : "expertRule";
        var sfName = $(this).attr("sfName");
        var sf = DELIMITER + sfName + DELIMITER;
        var rule = app.searchField.trim($('textarea#' + ruleId).val());
        var found = rule.indexOf(sf) > -1;

        // add field
        if (this.checked && !found) {
            var expr = rule.length == 0 ? "" : " AND ";  // ignore boolean operator for the first entry
            $('textarea#' + ruleId).val(rule + expr + sf);
        }

        // remove field
        if (!this.checked && found) {
            var newRule = rule.replace(/AND / + sf, "").replace(/OR / + sf, "").replace(/NOT / + sf, "");
            newRule = newRule.replace(sf, "");
            newRule = app.searchField.tidyRule(newRule);
            $('textarea#' + ruleId).val(newRule);
        }
    });
});