/**
 * Function to apply collapse/expand behavior to panels
 */
function handlePanelCollapse() {
	$(".panel-header-clickable").click(function(){
		var widgetContainer = $(this).parents("div[role='widget']");
		var contentContainer = $(widgetContainer).find("div[role='content']");
		var previousState = contentContainer.css("display");
		var display = previousState == "block" ? "none" : "block";

		$(contentContainer).css("display", display);
		var icon =$(widgetContainer).find("i.fa");
		if (display == "block") {
			$(icon).removeClass("fa-plus").addClass("fa-minus");
		}
		else {
			$(icon).removeClass("fa-minus").addClass("fa-plus");
		}
	});
}