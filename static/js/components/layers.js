// TOGGLE TENDER-OVERLAYS
$(document).ready(function () {
    var tenderRows = $(".tenderRowOdd a, .tenderRowEven a");  // catch all tableRows
    var offsetLeft = 20;
    var offsetDown = -30;
   
    /**
     * event call: hovering table-row
     */
    tenderRows.hover(function () {
    	var overlay = $("#tenderOverlay_" + getId($(this).parent().parent()));
    	$('#overlayContainer').html(overlay.html()).show();
    }, function () {
    	$('#overlayContainer').hide();
    });
    
    $('#overlayContainer').hover(function(){
    	$(this).show();
    }, function(){
    	$(this).hide();
    });
    
    /**
     * event call: moving mouse over a specific table-row accompanied by a layer
     */
    $(tenderRows).mousemove(function (e) {
        $('#overlayContainer').css('top', e.pageY + offsetDown).css('left', e.pageX + offsetLeft);
    });

    function getId(obj) {
    	if(obj != null && obj.attr("id")) {
    		var str = obj.attr("id");
    		var arr = str.split("_");
    		if (arr.length > 1) {
    			return arr[1];
    		}
    	}
        return 0;
    }
});
