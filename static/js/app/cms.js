var app = app || {};
app.cms = app.cms || {};

app.cms.initLanguageSelect = function()
{
    $("#currentCmsLang").change(app.cms.onLangSelectChange);
    $(".parentpage-wrapper select").change(app.cms.onParentSelectChange);
};

/**
 * Sync all parent page select boxes (because only one is visible at a time)
 */
app.cms.onParentSelectChange = function() {
    var id = $(this).val();
    $('.parentpage-wrapper select').val(id);

};

app.cms.onLangSelectChange = function() {
    var id = $(this).val();
    $.ajax({ url: app.config.urls.setCurrentCmsLang +id});
    app.cms.updateElementVisibility('.pagetree', id);
    app.cms.updateElementVisibility('.pagecontent', id);
    app.cms.updateElementVisibility('.parentpage', id);

};

app.cms.updateElementVisibility = function(selector, activeLanguageId) {
    $(selector).hide();
    $(selector + '_' + activeLanguageId).show();

};

