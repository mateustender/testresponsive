var app = app || {};
app.maps = app.maps || {};

app.maps.regionSelect = function(regionId, regionName) {
    app.maps.doSelectRegion(regionName);
};

app.maps.toggleRegionSelect = function(regionId, regionName, selected, selectionCount) {
    var checkbox = $('input:checkbox[name=' + app.maps.regionCheckboxPrefix + regionId + ']');
    checkbox.attr('checked', selected);

    var regionTextEL = $(app.maps.regionTextSelector).find("." + regionId);
    if (selected) {
        regionTextEL.show();
    } else {
        regionTextEL.hide();
    }

    app.utils.hideOrShowErrorMsg(selectionCount > app.maps.selectionLimit, app.maps.limitReachedMessageStr, app.maps.errorMsgSelector);

};

app.maps.setupRegionSelectDropdown = function() {
    var selectBox = $('#regionSelect');
    if (selectBox.length > 0) {
        selectBox.change(app.maps.onRegionSelectDropdownChange);
    }
};

app.maps.onRegionSelectDropdownChange = function(event) {
    if (!event || !event.target) {
        return;
    }

    var regionName = $(event.target).find('option:selected').text();
    app.maps.doSelectRegion(regionName);
};

app.maps.doSelectRegion = function(regionName) {
    location.href = app.config.urls.regionDetails + regionName;

};