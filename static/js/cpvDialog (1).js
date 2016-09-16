function renderIFrameContainer() {
    var body = $('body');
    body.prepend($('<div id="block"></div><div id="iframecontainer"><div id="loader"></div></div>'));
    newIFrame();
}

function newIFrame() {
    $('#iframecontainer').append('<iframe name="iframeDialog" id="iframeDialog"></iframe>');
}

function appendCpvCode(cpvCode, appendElementId, delimiter, postfix)  {
    var cpvCodes = $(appendElementId);
    var text = cpvCodes.val();
    var appendComma = text.lastIndexOf(delimiter) !== (text.length - 1);
    var pos = postfix ? postfix : ''

    cpvCodes.val(appendComma && text.length > 0 ? text + delimiter + cpvCode + pos : text + cpvCode + pos);
}

function registerClickEventForCpvDialog(elementId, appendElementId, link, delimiter)  {
    return registerClickEventForCpvDialog(elementId, appendElementId, link, delimiter, '', null)
}

function registerClickEventForCpvDialog(elementId, appendElementId, link, delimiter, postfix)  {
    return registerClickEventForCpvDialog(elementId, appendElementId, link, delimiter, postfix, null)
}

var currentContentWindow;

function registerClickEventForCpvDialog(elementId, appendElementId, link, delimiter, postfix, fnCallbackOpen)  {
    $('#block').click(function() {
        $('#iframecontainer').fadeOut();
        $('#block').fadeOut();
        $('body').css('overflow', 'auto');
    });

    $(elementId).click(function() {
        if (fnCallbackOpen) fnCallbackOpen();

        $('body').css('overflow', 'hidden');
        $('#block').show();
        $('#iframecontainer').fadeIn();

        var iframe = $('#iframecontainer iframe');
        if (!iframe.attr('src'))
            iframe.attr('src', link);

        // we have to rebind the function in order to reuse the iframe over
        // different bounded cpv dialogs within a single page
        if (currentContentWindow)  {
            currentContentWindow.cpvCodeChosen = function(msg) {
                return appendCpvCode(msg, appendElementId, delimiter, postfix);
            };
        }

        iframe.load(function() {
            this.contentWindow.closeIframe = function() {
                $('#iframecontainer iframe').attr('scrolling', 'no');
                $('#iframecontainer').fadeOut();
                $('#block').fadeOut();

                $('body').css('overflow', 'auto');
            };

            this.contentWindow.cpvCodeChosen = function(msg) {
                return appendCpvCode(msg, appendElementId, delimiter, postfix);
            };

            $('#loader').fadeOut(function() {
                $('iframe').fadeIn();
            });

            currentContentWindow = this.contentWindow
        });

        return false;
    });
}

function closeIFrameDialog() {
    $('#iframecontainer').hide();
    $('#block').hide();

    $('body').css('overflow', 'auto');

    $('#iframeDialog').remove();
}

function showModalIFrameDialog(link)  {
    if ($('#iframeDialog').length == 0)  {
        newIFrame();
    }

    $('#block').click(function() {
        closeIFrameDialog();
    });

    $('body').css('overflow', 'hidden');
    $('#block').show();

    $('#iframecontainer').show();
    $('#loader').fadeIn(500);

    var iframe = $('#iframecontainer #iframeDialog');
    iframe.load(function () {
        this.contentWindow.closeIframe = function () {
            closeIFrameDialog();
        };

        $('#loader').hide();
        $('#iframecontainer #iframeDialog').fadeIn(800);
    });

    iframe.attr('src', link);
}

$(document).ready(function () {
    renderIFrameContainer();
});