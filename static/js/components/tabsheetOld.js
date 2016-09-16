var app = app || {};
app.tabsheet = app.tabsheet || {};

/**
 * show the tabsheet and activate the tab
 * @param currTabName (name of the stylesheet-class of the current active tab)
 * @param tabClass - name of the tablink classes (default: "tab")
 */
app.tabsheet.showTab = function (currTabName, tabClass) {
    if (!tabClass) tabClass = "tab"; // default value
    var tabLink = $("." + currTabName);   // the current tab-link (e.g: "Suchfelder")
    var currTabClass = "current" + tabClass;  // the stylesheet-class that defines a current tab (currenttab)

    if (!tabLink.hasClass('disabledTab')) {
        $.removeCookie(tabClass, { path: '/' });

        $.cookie(tabClass, currTabName, { path: '/' });

        tabLink.addClass(tabClass);
        var allLinks = $("#tabbox ." + tabClass); // all tab-links in the tabbox
        allLinks.removeClass(currTabClass).addClass(tabClass);
        tabLink.addClass(currTabClass);
        $(".tabsheet").hide();
        $("#" + currTabName).show();

        return false;
    }
};

/**
 * delete references to tabs and subtabs
 */
app.tabsheet.deleteTabCookies = function () {
    $.removeCookie("tab", { path: '/' });
    $.removeCookie("subtab", { path: '/' });
};

/**
 * get the tab stored in the cookie
 * @param tabClass - name of the tablink classes ("tab", "subtab")
 */
app.tabsheet.loadMostRecentTabContent = function (tabClass) {
    var currentTabName = $.cookie(tabClass);  // e.g.: referencedProfiles
    if (currentTabName) {
        var remoteUrl = $("." + currentTabName).attr("href");
        // load the current tab of the new opened tabsheet by ajax
        if (remoteUrl && (currentTabName == "searchProfileHistory")) {
            jQuery.ajax({
                type:'POST',
                url:remoteUrl,
                success:function (data, textStatus) {
                    jQuery('#' + currentTabName).html(data);  // load the content of the tabsheet (which must have the same name as the css of the tabsheet)
                }
            });
        }

        app.tabsheet.showTab(currentTabName, tabClass);
    }
    else {
        // enter the tabsheet for the 1. time -> go to the first tab
        $('div.tabsheet:first').show();
        $('#tabbox .tab:first').addClass('currenttab');
    }
};

$(document).ready(function () {
    var links = $("#tabbox .tab"); // all tab-links in the tabbox
    var subLinks = $("#tabbox .subtab");  // all sublinks of tabbox

    // show tabs and subtabs
    app.tabsheet.loadMostRecentTabContent("subtab");
    app.tabsheet.loadMostRecentTabContent("tab");

    // show the current tabsheet (and hide all the others)
    links.click(function () {
        $(this).removeClass("tab");
        $(this).removeClass("currenttab");  // remove the "immutable" classes
        var tabLink = $(this).attr("class");  // get the class left
        app.tabsheet.showTab(tabLink);
        return false;
    });

//    // similar to links.click-action, but also hold the main-tab from the cookie active
    subLinks.click(function () {
        $(this).removeClass("subtab");
        $(this).removeClass("currentsubtab");  // remove the "immutable" classes
        var tabLink = $(this).attr("class");  // get the class left

        $(".subtabsheet").hide();

        app.tabsheet.showTab(tabLink, "subtab");
        app.tabsheet.loadMostRecentTabContent("tab");  // load the tab above the current subtab (from cookie)

        return false;
    });
});

