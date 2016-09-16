var app = app || {};
app.search = {};

app.search.init = function() {
    $('#search select').selectmenu({
        style:'dropdown',
        maxHeight:400,
        menuWidth: 400,
        icons: app.config.branchIconConfig
    });

};