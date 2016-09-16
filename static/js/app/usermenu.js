var app = app || {};
app.usermenu = {};


app.usermenu.init = function() {
    if (!app.config.collapsibleUserProfileIds) {
        return;//no user menu visible
    }

    $('.userinfoboxstructured .collapsible h4').click(app.usermenu.toggle);

    /* #### init state from cookie ###################*/
    for (var i = 0, len = app.config.collapsibleUserProfileIds.length; i < len; i++) {
        var id = app.config.collapsibleUserProfileIds[i];
        var cookieValue = $.cookie(id + '_collapsed');
        var isCollapsed = cookieValue == "true";
        var headlineEl = $("#" + id + " h4");
        app.usermenu.collapse(isCollapsed, headlineEl);
    }

};

app.usermenu.toggle = function() {
    var headlineEl = $(this);
    var parent = app.usermenu.getParentEl(headlineEl);
    var isCollapsed = headlineEl.hasClass('collapsed');
    app.usermenu.collapse(!isCollapsed, headlineEl);
    $.cookie(parent.attr('id') + '_collapsed', !isCollapsed);
};

app.usermenu.getParentEl = function(headlineEl) {
    return headlineEl.parents('.collapsible');
};


app.usermenu.collapse = function(doCollapse, headlineEl) {
    var innerEl = app.usermenu.getParentEl(headlineEl).find('.inner');

    if (doCollapse) {
        headlineEl.addClass('collapsed');
        innerEl.hide();
    } else {
        headlineEl.removeClass('collapsed');
        innerEl.show();
    }
}