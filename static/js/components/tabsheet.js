var app = app || {};
app.tabsheet = app.tabsheet || {};

var COOKIE_NAME = "tab";

/**
 * show the tabsheet and activate the tab
 * @param currTabName (id of the current active tab)
 */
app.tabsheet.showTab = function (currentTabId) {
	var tab = document.getElementById(currentTabId);
	if (tab != null) {
    	tab.parentNode.className += " active";
		var tabPaneId = currentTabId.replace("Link", "");
		document.getElementById(tabPaneId).className += " active in";
	}
}

/**
 * delete references to tabs
 */
app.tabsheet.deleteTabCookies = function () {
    $.removeCookie(COOKIE_NAME, { path: "/" });
};

app.tabsheet.tabFound = function (currentTabId) {
	var tab = document.getElementById(currentTabId);
	if (tab != null) {
		return true;
	}
	return false;
};

/**
 * get the tab stored in the cookie
 * @param tabClass - name of the tablink classes ("tab", "subtab")
 */
app.tabsheet.loadMostRecentTabContent = function () {
    var currentTabId = $.cookie(COOKIE_NAME);  // e.g.: referencedProfiles

	/* Specific logic for the searchProfileEdit page: */
	if (document.getElementById("page") != null && document.getElementById("page").value == "searchProfileEdit") {
		if (document.getElementById("fieldsetSearchQuery") != undefined) {
			currentTabId = "searchResultListLink";	//if results are returned, then display the last tab
		} else {
			if (currentTabId == "searchResultListLink") {
				currentTabId = "searchfieldsLink";  //if no results are returned, and the current tab is the last, display the first
			}
		}
		// otherwise just display the current tab
	}

    if (currentTabId &&  app.tabsheet.tabFound(currentTabId)) {

        //if current tab is searchProfileHistoryLink, load ajax content, by clicking on the remote link
        if (currentTabId == "searchProfileHistoryLink") {
			document.getElementsByName('searchProfileHistoryRemote')[0].click();
        }

        app.tabsheet.showTab(currentTabId);
    }
    else {
        // enter the tabsheet for the 1. time -> go to the first tab
        $("ul#tab-header li:first").addClass("active");
        $("div.tab-pane:first").addClass("active");
        $("div.tab-pane:first").addClass("in");
    }
};

/**
 *  Stores the last visited tab in a cookie. This function has to be called on the onclick event of each tab
 */
app.tabsheet.storeTab = function (tab) {
    var tabId = tab.id;

    if (!$(tab).hasClass("disabledTab")) {
        app.tabsheet.setTabCookie(tabId);
        return false;
    }
};

app.tabsheet.setTabCookie = function (value) {
    $.removeCookie(COOKIE_NAME, { path: "/" });
    $.cookie(COOKIE_NAME, value, { path: "/" });
};

$(document).ready(function () {

    var links = $("ul#tab-header li a"); // all tab-links in the tabbox
    if (links != undefined && links.length > 0) {
        // show tabs
        app.tabsheet.loadMostRecentTabContent();
    }

    // assigning the function dynamically like below didn"t work with bootstrap
  /*  links.click(function () {
        app.tabsheet.storeTab(this);
        return false;
    });
    */
});

