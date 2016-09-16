$(document).ready(function() {
    app.cms.initLanguageSelect();
    app.product.init();
    
    // opens closed layer
    var newItem = $("#newItem");
    newItem.click(function() {
        $("#newItemContext").toggle('slow');
    });

    /* #### QTIP TOOLTIPS ###################*/
    $(".hasTooltip").each(function(i, o) {
        app.utils.setupTooltip(o, null, {position: {corner: { target: 'topRight', tooltip: 'bottomLeft' } }});
    });


    $('#deleteLink').bind('click', function(){
		
		if(confirm($('#deleteConfirmationMessage').val())){
			$('#deleteForm').submit();
		}
		return false;
	});
    
	$('#datepickerMigrationDate').datepicker($.datepicker.regional[ $("#adminPortalDefaultLangID").val() ]);
	$('#datepickerMigrationDate').datepicker("option", "dateFormat", "dd.mm.yy" );

	/* The line below has to be executed in order to clean an "overflow: hidden" that SmartAdmin sets in the menu ul.
	* Such setting cause the menu items to not popup when the menu is collapsed */
	$('nav ul').css("overflow", "");

});
