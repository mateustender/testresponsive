function styleSelects() {
	$('select.l2112select').each(function(i) {
		if($(this).width()) {
			var width = $(this).width();
		} else {
			var width = Number($(this).css('width').replace(/px/g, ''))-Number($(this).css('padding-left').replace(/px/g, ''))+'px';
		}
		
		$newElem = $('<span></span>').addClass($(this).attr('class')).removeClass("toBeValidate");
		
		//the value of 25px should be the same as the one for css property padding-right defined in style.css for element span.l2112select 
		$newElem.css({'position':'absolute', 'width':width - 25});
		$newElem.html($(this).children(':selected').text());
		
		$(this).before($newElem).css({'opacity':'0','position':'relative'})
		.change(function(){
			$(this).prev().html($(this).children(':selected').text());
		});
		
	});
}

$('.tabs a').click(function(){
	$(this).parents('.tabs').find('a').removeClass('current');	
	$(this).addClass('current');
	return false;
});

$(function(){
	$('.toolboxtitle-clickable').toggle(function(){
		$(this).find('.toggle-btn').addClass('current');
		$(this).find('.toggle-btn').parents('.item').find('.content').slideDown();

		$(this).find('.toggle-btn-act').removeClass('current');
		$(this).find('.toggle-btn-act').parents('.item').find('.content').slideUp();

		return false;

	},function(){
		$(this).find('.toggle-btn').removeClass('current');
		$(this).find('.toggle-btn').parents('.item').find('.content').slideUp();

		$(this).find('.toggle-btn-act').addClass('current');
		$(this).find('.toggle-btn-act').parents('.item').find('.content').slideDown();

		return false;
	});

	
	$('#buttons a[id="save"]').toggle(function(){
		$('#buttons .btn-wrapper').removeClass('current').find('.popup-box-save').hide();
		$(this).parent().addClass('current').find('.popup-box-save').show();
		return false;
	}, function(){
		$(this).parent().removeClass('current').find('.popup-box-save').hide();
		return false;
	});
	
	
	// ------------- Language dropdown ------------------- */
	$("#main-menu ul#language-logout-bar .dropdown .item-box").hide();
	$('#main-menu ul#language-logout-bar #language .dropdown a').not('.icon').unbind("click"); // clears the click bind if the script is loaded more than once.
	
	$('#main-menu ul#language-logout-bar #language .dropdown a').not('.icon').click(function(){
		if(!($("#main-menu ul#language-logout-bar #language .dropdown .item-box").is(':visible'))){
			$('#main-menu ul#language-logout-bar .dropdown').not('#main-menu ul#language-logout-bar #language .dropdown').removeClass('current');
			$('#main-menu ul#language-logout-bar #language .dropdown').addClass('current');
			$('#main-menu ul#language-logout-bar .item-box').not('#main-menu ul#language-logout-bar #language .dropdown .item-box').hide();
			$('#main-menu ul#language-logout-bar #language .dropdown').find('.item-box').show();
		}
		else {
			$('#main-menu ul#language-logout-bar #language .dropdown').removeClass('current');
			$('#main-menu ul#language-logout-bar #language .dropdown').find('.item-box').hide();
		}
		
		return false;
		
	});
	
	$('#main-menu ul#language-logout-bar #language .dropdown a.icon').click(function(){
		$("#main-menu ul#language-logout-bar #language .dropdown").removeClass('current');
		$(this).parents('ul').children().removeClass('current');
		$(this).parent().addClass('current');
		$('#main-menu ul#language-logout-bar .dropdown').find('.item-box').hide();
	//	return false;
	});

	// ------------------- Login Mobile Toggle ------------------------

	$('#nav-mobile-login').click(function() {
		$(document).find('#login-area').toggle();
	});
	

	// ------------------- Pages 12 - 14 ------------------------
	
	
	$('.sprofile-link').click(function(){
		$('#profile td .sp-popup-box').remove();
		var pbox = $('#sp-popup-box').clone(true);
		
		pbox.find('#treffermailName').val($(this).parent().find('.spf-tname').html());
		pbox.find('#kontaktName').val($(this).parent().find('.spf-name').html());
		pbox.find('#kontaktEmail').val($(this).parent().find('.spf-email').html());
		
		pbox.insertBefore(this).show();
		return false;
	});
	
	$('#sp-popup-box-close').click(function(){
		$('#profile td .sp-popup-box').remove();
		return false;
	});
	$('#sp-recipients .plus-link').click(function(){
		$('#profile td #sp-popup-box .recipient-new:first').clone(true).insertBefore(this).find('input').val('');
		return false;
	});
	$('#sp-recipients .remove').click(function(){
		if($('#profile td #sp-recipients .recipient').length>2) {
			$(this).parent().remove();
		}
		return false;
	});
	
	styleSelects();

	$('.add-spinner').click(function() {
		// ignore element with the no-spinner CSS class
		if ($(this).hasClass('no-spinner')) return;

		showSpinner();
	});
});

var spinner;

function showSpinner() {
	if (typeof Spinner == 'function') {
		$('body').addClass("loading");

		var opts = {
			lines: 16, 		// The number of lines to draw
			length: 20, 	// The length of each line
			width: 3, 		// The line thickness
			radius: 10, 	// The radius of the inner circle
			corners: 1, 	// Corner roundness (0..1)
			rotate: 0, 		// The rotation offset
			direction: 1, 	// 1: clockwise, -1: counterclockwise
			color: '#D80A0A', // #rgb or #rrggbb or array of colors
			speed: 1.1, 	// Rounds per second
			trail: 30, 		// Afterglow percentage
			shadow: false, 	// Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', 	// The CSS class to assign to the spinner
			zIndex: 2e9, 			// The z-index (defaults to 2000000000)
			top: '50%', 			// Top position relative to parent in px
			left: '0%' 				// Left position relative to parent in px
		};

		spinner = new Spinner(opts).spin();
		$('#jsspinner').append(spinner.el);
	}
}

function mailCheck(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function toggleAllCheckboxes(className, selected){
	$('.' + className).attr('checked',selected);
	return false;
}

$(document).ready( function() {
	// Invite
	$('.send-invite .item-box .submit').click(function() {
		//show loading message
		$(".send-invite .item-box #inviteloading").show();
		
		// take data
		var recipientName = $('.send-invite .item-box input#recipientName').val();
		var recipientEmail = $('.send-invite .item-box input#inviteRecipientEmail').val();
		var uuid = $('.send-invite .item-box input#uuid').val();
		var url = $(this).attr('baseUrl');
		
		// check mail
		if (!mailCheck(recipientEmail)) {
			// invalid email
			$(".send-invite .item-box .returnMessage").not(".send-invite .item-box #inviteInvalidMails").hide();
			$(".send-invite .item-box #inviteInvalidMails").show();
			return false;
		}
		
		// send invitation
		$.ajax({
			type: "POST",
			url: url,
			data: {mail: recipientEmail, name: recipientName, uuid: uuid},
			success: function (data) {
				if (data == 'success') {
					// show success message
					$(".send-invite .item-box .returnMessage").not(".send-invite .item-box #invitedSuccessfully").hide();
					$(".send-invite .item-box #invitedSuccessfully").show();
				}
				if (data == 'fail') {
					// show error message
			    	$(".send-invite .item-box .returnMessage").not(".send-invite .item-box #invitationFailed").hide();
					$(".send-invite .item-box #invitationFailed").show();
				}
		    },
		    error: function () {
				// show error message
		    	$(".send-invite .item-box .returnMessage").not(".send-invite .item-box #invitationFailed").hide();
				$(".send-invite .item-box #invitationFailed").show();
		    },
		    complete: function () {
				setTimeout("$('#main-menu ul#language-logout-bar .send-invite #invite-button').click();", 2000) // triggers the original toggle effect of the invite button after 2 seconds
		    }
		});
		
		// disables the default behaviour
		return false;
	});
	
	
	// Invite dropdown
	$('#main-menu ul#language-logout-bar .send-invite #invite-button').unbind("click"); // clears the click bind if the script is loaded more than once.
	
	$('#main-menu ul#language-logout-bar .send-invite #invite-button').click(function(){
		if (!($("#main-menu ul#language-logout-bar .send-invite .item-box").is(':visible'))) {
			// hide messages
			$('.send-invite .item-box .returnMessage').hide();
			
			$('#main-menu ul#language-logout-bar .dropdown').not('#main-menu ul#language-logout-bar .send-invite .dropdown').removeClass('current');
			$('#main-menu ul#language-logout-bar .send-invite .dropdown').addClass('current');
			$('#main-menu ul#language-logout-bar .item-box').not('#main-menu ul#language-logout-bar .send-invite .dropdown .item-box').hide();
			$('#main-menu ul#language-logout-bar .send-invite .dropdown .item-box').show();
		}
		else {
			$('#main-menu ul#language-logout-bar .send-invite .dropdown').removeClass('current');
			$('#main-menu ul#language-logout-bar .send-invite .dropdown .item-box').hide();
		}
		
		return false;
	});
	
	//quicksearch placeholder
	var inputSearchPhrase = $('#q_search input[name="searchPhrase"]');
    var submitButton = $('#s_submit');
    submitButton.click(function() {
        return inputSearchPhrase.val() != '';
    });

});

$(window).on('unload', function() {
	// removing the spinner once the page unloads, so it will not be there if the browser back button is clicked
	if (spinner != undefined) {
	 	spinner.stop();
	}
});

// quicksearch filter symbols that break ajax request
var unchangedPhrase;
function removeUnallowedSymbols(searchPhrase) {
	unchangedPhrase = searchPhrase;
	var pattern = new RegExp(/[\*\+\?\%\^\(\)\{\}\[\]\\]/g);
	var result = searchPhrase.replace(pattern, '');
	return result;
}
function restoreSearchPhrase() {
	return unchangedPhrase;
}

//same as placeholder function but uses element instead of id
function placeholderByElement (element, text) {
	$(element).attr('placeholder', text);
}


