var app = app || {};
app.utils = {};


app.utils.log = function(message) {
    if (!app.config.debugEnabled || typeof console == 'undefined ' || typeof console.log == 'undefined ') {
        return;
    }
    console.log(message);
};

app.utils.error = function(message) {
    if (!app.config.debugEnabled || !console || !console.log) {
        return;
    }

    if (console.error) {
        console.error(message);
    } else {
        app.utils.log(message);
    }
};

/**
 * Use this function to enable tracking of the scroll position for the current page; the scroll state will be stored in
 * a cookie and when the page is opened again, it is restored automatically; useful e.g. when paginator is used and user
 * should not be forced to scroll down again after clicking on a button within the paginator
 * @param key String (optional, defaults to controllername_actionname)
 */
app.utils.trackScrollPos = function(key) {
    $(window).scroll(this.onScroll.createDelegate(this, [key], 0));

    var oldScrollTop = $.cookie(key + '_scrollTop');
    var oldScrollLeft = $.cookie(key + '_scrollLeft');
    $(window).scrollTop(oldScrollTop);
    $(window).scrollLeft(oldScrollLeft);
};

app.utils.onScroll = function(key) {
    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();

    $.cookie(key + '_scrollTop', scrollTop);
    $.cookie(key + '_scrollLeft', scrollLeft);
};


/**
 * Show content of links that match the given selector within a popup window.
 * Also appends a parameter to the URL and sets it to true. This parameter states that the request will be an asynchronous
 * request and thus the view will not need a sourrounding layout and should only display the content. NOTE: this means
 * that this parameter has to be configured in the URL mappings for all URLs that should only be available via async requests.
 * @param linkSelector
 */
app.utils.setupDialogBoxes = function(linkSelector) {
    var links = $(linkSelector);
    links.each(function(i, o) {
        o = $(o);
        o.attr("href", o.attr("href") + "/true");
        o.colorbox({
            opacity:0.75,
            initialWidth: "50",
            initialHeight: "50"
        });
    });

};

/**
 * Hide or show an error message within an already existing container DOM element (dentified by errorMsgSelector)
 */
app.utils.hideOrShowErrorMsg = function(show, errorMsg, errorMsgSelector) {
    var cls = "checkboxErrMsg";
    var errMsgContainer = $(errorMsgSelector);
    var errMsgEl = errMsgContainer.find("." + cls);
    if (show) {
        if (errMsgEl.length == 0) {//error message element has not been created yet => create and highlight it (otherwise: do nothing)
            errMsgContainer.append("<span class='" + cls + "'>" + errorMsg + "</span>");
            $(errorMsgSelector).effect("highlight", {}, 3000);
        }
    } else {
        errMsgEl.remove();
    }

};

app.utils.setupTooltip = function(el, content, overrideCfg) {
    el = $(el);
    if (!content) {
        content = el.find(".tooltip").html();
    }
    if (!content) {
        return;
    }
    var cfg = app.utils.clone(app.config.tooltipConfig);
    if (typeof overrideCfg == 'object') {
        app.utils.apply(cfg, overrideCfg);
    }
    cfg.content = content;
    el.qtip(cfg);
};

app.utils.setCurrentMenuItem = function() {
	var firstDiv = $('#wrap.main').children(0)
	if (firstDiv.hasClass('customerSearchProfile')) {
		$('#menu .item-profile').addClass('current');
	} else if ($('.service-tabs-content').is('#servicePageNews')) {
		$('#menu .item-news').addClass('current');
	} else if (firstDiv.hasClass('searchProfileHistory')) {
		$('#menu .item-searchProfiles').addClass('current');
	} else if (firstDiv.hasClass('favoriteTenders')) {
		$('#menu .item-favorites').addClass('current');
	} else if (firstDiv.hasClass('coreData')) {
		$('#menu .item-coreData').addClass('current');
	}
};

app.utils.clone = function(obj) {
    if (obj == null || typeof(obj) != 'object') {
        return obj;
    }

    var temp = new obj.constructor(); // changed (twice)
    for (var key in obj) {
        temp[key] = this.clone(obj[key]);
    }
    return temp;
};

/**
 * Copies all the properties of config to obj.
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 */
app.utils.apply = function(obj, config, defaults) {
    // no "this" reference for friendly out of scope calls
    if (defaults) {
        app.utils.apply(obj, defaults);
    }
    if (obj && config && typeof config == 'object') {
        for (var p in config) {
            obj[p] = config[p];
        }
    }
    return obj;
};


/**
 * Track user downloads in frontend via google analytics
 */
app.utils.trackDownload = function() {
    if (typeof _gaq != 'undefined') {
        _gaq.push(['_trackPageview', $(this).attr("href")]);
    }
};


//shortcuts (use them sparingly!)
var log = app.utils.log;
var err = app.utils.error;