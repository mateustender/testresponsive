(function ($) {
    var pluginName = 'defaultValue';
    $[pluginName] = {
        reset:function (formId) {
            var jqForm = $(formId);
            jqForm.find('input').each(function (idx) {
                var jqElem = $(this);
                var hasDefault = $[pluginName].getValue(jqElem, 'hasDefault');
                if (hasDefault) {
                    var className = $[pluginName].getValue(jqElem, 'className');
                    if (jqElem.val() == '') {
                        var text = $[pluginName].getValue(jqElem, 'text');
                        jqElem.val(text);
                        jqElem.addClass(className);
                    } else {
                        jqElem.removeClass(className);
                    }
                }
            });
        },

        isValidInput:function (input) {
            var jqElem = $(input);
            var type = jqElem.attr('type');
            return !(type != 'text' && type != 'password' && type != 'textarea');
        },

        getValue:function (obj, attrName) {
            var options = obj.data('defaultValue');
            return options ? options[attrName] : null;
        }

    };

    $.fn[pluginName] = function (options) {
        var defaults = {
            text:'Type..',
            className:'no-value',
            hasDefault:true
        };

        var obj = $(this);
        var opts = $.extend(defaults, options);
        obj.data(pluginName, opts);
        var text = opts.text;
        if (!$[pluginName].isValidInput(obj)) {
            return;
        }

        if (!obj.val()) {
            obj.val(text);
            obj.addClass(opts.className);
        } else {
            return;
        }

        obj.focus(function () {
            if (obj.val() == text) {
                obj.val('');
                obj.removeClass(opts.className);
            }
        });

        obj.blur(function () {
            if (obj.val() == '') {
                obj.val(text);
                obj.addClass(opts.className);
            } else {
                obj.removeClass(opts.className);
            }
        });

        obj.parents("form").each(function () {
            // reset value from inputs
            $(this).submit(function () {
                if (obj.val() == text) {
                    obj.val('');
                }
            });
        });
    };
})(jQuery);