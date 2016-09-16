var app = app || {};
app.debugOutput = app.debugOutput || {};

app.debugOutput.init = function() {
    $('.debugOutput .level-3').click(app.debugOutput.onExpandClick);
};

app.debugOutput.onExpandClick = function(el) {
    $(this).addClass("expanded").unbind('click');
};