var app = app || {};
app.searchProfile = {};


app.searchProfile.init = function() {

	if ( ! $('#wrap.main').children(0).is('.customerSearchProfile') ) {
    	return;
    }
	
	$('.sprofile-link, .csp-action-links .plus-link').click(function(e){
		e.preventDefault();
		var _this = this;
		
		$.ajax({ 
			url: $(this).attr('href'),
			cache: false,
			success: function(data) {
				var pbox = $(data);
				pbox.insertBefore(_this).show();
				
				pbox.find('#sp-popup-box-close').click(function(e){e.preventDefault(); $('#profile td .sp-popup-box').remove(); return false;});
				pbox.find('#sp-recipients .plus-link').click(function(){e.preventDefault();$('#profile td #sp-popup-box .recipient-new:first').clone(true).insertBefore(this).removeClass('recipient-new').find('input').val('');	return false;});
				pbox.find('#sp-recipients .remove').click(function(e){e.preventDefault();if($('#profile td #sp-recipients .recipient').length>2) $(this).parent().remove();	return false;});
			}
		});
		
		return false;
	});
	
	$('.csp-action-links .more-link').click(function(e){e.preventDefault();$('#profile #sp-table tr').removeClass('display-none'); return false;});
	
};