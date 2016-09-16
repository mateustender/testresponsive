/******
 * Component for making fade-in fade-out error messages.
 * Usage:
 *  - Add the class "fade-in-alert" to the error div
 *  - If automatic closing is required, add a button inside the div like: <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
 * ******/

var topPosition = 0;
var lastMessageHeight = 0;

 (function ($) {
	$.alert_ext = {

		defaults: {
			autoClose: true,
			closeTime: 10000,
			withTime: false,
			close: '',
			speed: 'normal',
			onShow: function () {
			},
			onClose: function () {
			}
		},

		init: function (div) {
			//this.options = $.extend({}, this.defaults, options);
			this.options = this.defaults;
			this.alertDiv = div;

			this.setCss();
			this.bindEvent();

			lastMessageHeight = $(this.alertDiv).height(); // store the error message box height, for positioning the next message (if needed)

			return this.alertDiv;
		},

		/*template: function (tmpl, data) {
			$.each(data, function (k, v) {
				tmpl = tmpl.replace('${' + k + '}', v);
			});
			return $(tmpl);
		},*/

		setCss: function () {

			$(this.alertDiv).css({
				'position': 'fixed',
				'z-index': 10001 + $(".fade-in-alert").length,
				'top': topPosition + 'px',
				'right': '0px',
				'width': '500px',
				'word-wrap': 'break-word',
				'display': 'block'
			});
		},

		bindEvent: function () {
			this.bindShow();
			this.bindClose();
		},

		bindShow: function () {
			var ops = this.options;
			$(this.alertDiv).fadeIn(ops.speed, function () {
				ops.onShow($(this));
			});
		},

		bindClose: function () {
			var alertDiv = this.alertDiv,
				ops = this.options,
				closeBtn = $('.close', alertDiv).add($(this.options.close, alertDiv));

			closeBtn.bind('click', function (e) {
				$(alertDiv).fadeOut(ops.speed, function () {
					$(this).remove();
					ops.onClose($(this));
				});
				e.stopPropagation();
			});

			if (this.options.autoClose) {
				var time = parseInt(this.options.closeTime / 1000);

				var timer = setInterval(function () {
					--time;
					if (!time) {
						clearInterval(timer);
						closeBtn.trigger('click');
					}
				}, 1000);
			}
		}

	};

	})(jQuery);

$(document).ready(function () {
	displayErrorPopups();
});

function displayErrorPopups() {
	topPosition = 150; // default position for the 1s error message (in case there are many)
	lastMessageHeight = 0;

	$(".fade-in-alert").each(function() {

		// if the element has a custom top position, set the topPosition variable
		if ($(this).attr("data-initial-top-position")){
			topPosition = $(this).attr("data-initial-top-position");
		}

		$.alert_ext.init(this);

		topPosition = topPosition + lastMessageHeight + 30; /* incrementing the position for the next error message */
	});

}

/** Function to add alerts dynamically with js (using)*/
function addAlertMessage(message) {
	// remove any existing alert so it doesn't get repeated
	$('.fade-in-alert').remove();

	var html = '<div class="alert alert-danger fade in fade-in-alert" style="display: none; margin-top: 10px;"> ' +
					message +
					'<button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="fa-fw fa fa-times"></i></button>' +
				'</div>'
	$('body').append(html);

	displayErrorPopups();
}