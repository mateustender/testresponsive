function setupPagination() {
    $(".dataTables_paginate").find("a").live('click', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        var container = $(event.target).parents(".tab-pane")
        var grid = $("#statoverview");
        $(grid).html($("#spinner").html());

        $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
                $(grid).fadeOut('fast', function() {
                    if (term != "") {
                        data = highlightTerm(data);
                    }
                    $(container).html(data).fadeIn('slow');

                });
            }
        });
    });
}

var term = "";


function searchOnAllFields(button, action, id, type) {
    var input = $(button).parents("div").find("input#commonSearchTerm");
    term = $(input).val();
    if (term != "") {
        var container = $(button).parents(".tab-pane");
        var url = "../" + action + "/" + id;
        var params = {};
        params.commonSearchTerm = term;
        if (typeof (type) != "undefined" && type != null)
            params.type = type;
        $.get(url, params, function(data){
            data = highlightTerm(data);
            $(container).html(data);
        });
    }
}

function highlightTerm(data) {
    var needle = term.toLowerCase();
    $(data).find("td").each(function(){
        var haystack = $(this).text().toLowerCase();
        if (haystack != "" && needle != "" && ($(this).hasClass("field_numeric") && haystack == needle || haystack.indexOf(needle) >= 0)) {
            if ($(this).hasClass("field_numeric")) {
                data = data.replace('<td class="field_numeric">' + $(this).text() + '</td>', '<td class="field_numeric"><span style="background: #ffff00;">' + $(this).text() + '</span>');
            }
            else {
                data = data.replace('<td>' + $(this).text() + '</td>', '<td><span style="background: #ffff00;">' + $(this).text() + '</span>');
            }
        }
    });
    return data;
}
