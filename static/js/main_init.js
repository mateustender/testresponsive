$(document).ready(function() {

    app.utils.setupDialogBoxes("a[rel='tenderlist']");
    app.utils.setCurrentMenuItem();
    
    app.search.init();

    /* #### PRINT BUTTON ###################*/
    $(".button_print").click(function() {
        window.print();
        return false;
    });

    /* #### BACK BUTTON ###################*/
    $(".backlink").click(function() {
        history.back();
        return false;
    });

    app.maps.setupRegionSelectDropdown();

    app.usermenu.init();

    app.forms.initRadioButtonsForActiveStyles();
    
    app.searchProfile.init();

    //track download link clicks via google analytics
    $(".download-button").click(app.utils.trackDownload);
});
