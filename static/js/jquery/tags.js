$.fn.tagEditor = function() {
    var origin_element = this;

    var o = {
        inputEl: null,
        tagEditorEl: null,
        tags:[],
        preventAutoAdd:false,
        hasFocus:false,

        init:function() {
            this.inputEl = origin_element;
            if (this.inputEl.length==0) {
                return;
            }
            var that = this;

            var next = $(this.inputEl).next();
            if (/tags_editor/.test(next.attr('class')))
            {
                this.tagEditorEl = next.get(0);
            }
            else
            {
                $(this.inputEl).after('<div class="tags_editor"><input type="text" class="tags_editor_input" /></div>');
                this.tagEditorEl = $(this.inputEl).next();
            }

            $(this.tagEditorEl).find('input').removeClass("tag_editor_active");

            $(this.tagEditorEl).unbind().click(function() {
                $(that.tagEditorEl).find('input').focus();
            }).find('input').unbind().blur(function() {
                that.hasFocus = false;
                that.addTag();
            }).keyup(function(event) {
                switch (event.keyCode) {
                    case 13:    // Return is pressed
                        if (that.getCurrentTagText()) {
                            that.addTag();
                        } else {
                            //no text has been entered => submit form when hitting enter
                            this.form.submit();
                        }
                        break;
                    case 188:    // comma is pressed
                        that.addTag();
                        break;
                }
            }).keydown(function(event) {
                switch (event.keyCode) {
                    case 8: //backspace
                        var currentText = that.getCurrentTagText();
                        if (!currentText || currentText.length == 0) {//only remove last tag if hitting backspace was not meant to remove characters instead
                            that.removeLastTag();
                        }
                        break;
                }
            }).focus(function() {
                that.hasFocus = true;
                that.hideEmptyText();
            });

            app.search.setupSuggest($($(this.tagEditorEl).find('input')));
            app.events.addEventListener("addTag", this.addTag.createDelegate(this, [true], 0));
            app.events.addEventListener("showSuggestDropdown", this.onShowSuggestDropdown.createDelegate(this));
            app.events.addEventListener("hideSuggestDropdown", this.onHideSuggestDropdown.createDelegate(this));

            var tagTexts = $(this.inputEl).val().split(',');
            this.tags = [];
            for (i in tagTexts) {
                tagTexts[i] = $.trim(tagTexts[i].replace(/[",]/gi, ''));
                if (tagTexts[i] != '') {
                    this.tags.push(tagTexts[i]);
                }
            }
            this.refreshList();
        },

        onShowSuggestDropdown : function() {
            this.preventAutoAdd = true;
        },
        onHideSuggestDropdown : function() {
            this.preventAutoAdd = false;
        },

        addTag:function(force) {
            if (!force && this.preventAutoAdd) {
                return;
            }

            //sanitize input
            var tagText = this.getCurrentTagText();

            //avoid duplicates and empty tags
            var indexInArray = jQuery.inArray(tagText, this.tags);
            if ((tagText != '') && indexInArray < 0) {
                this.tags.push(tagText);
                this.hasFocus = true;
            } else if (indexInArray >= 0) {
                var x = $(this.tagEditorEl).find(".tag_entry:nth-child(" + (indexInArray + 1) + ")");
                x.effect("highlight", {}, 3000);
            }

            if (indexInArray < 0) {
                this.refreshList();
            }
            $(this.tagEditorEl).find('input').val('');
        },

        removeLastTag : function() {
            if (this.tags && this.tags.length) {
                this.removeTag(this.tags[this.tags.length - 1]);
            }
        },

        getCurrentTagText : function() {
            var text = $(this.tagEditorEl).find('input').val().replace(/[",]/gi, '');
            return $.trim(text);
        },

        removeTag:function(tagText) {
            var newTags = [];
            for (var i in this.tags) {
                if (this.tags[i] != tagText)
                {
                    newTags.push(this.tags[i]);
                }
            }
            this.tags = newTags;
            this.refreshList();
        },

        hideEmptyText : function() {
            $(this.tagEditorEl).find('.emptytext').remove();
            $(this.tagEditorEl).find('input').addClass("tag_editor_active");
        },

        refreshList: function() {
            var that = this;


            $(this.tagEditorEl).find('.text').remove();
            $(this.inputEl).val(this.tags.join(', '));

            h = '';
            for (i in that.tags) {
                h += '<div class="tag_entry text">' + that.tags[i] + '<a href="#">x</a></div>';
            }

            if (!that.hasFocus && (!that.tags || that.tags.length == 0)) {
                h += '<div class="emptytext text">' + that.inputEl.prev("label").html() + '</div>';
                $(this.tagEditorEl).find('input').removeClass("tag_editor_active");                
            }
            $(that.tagEditorEl).find('input').val('');
            $(that.tagEditorEl).prepend(h).find('div.tag_entry').find('a').click(function() {
                var tagText = $(this).parents('.tag_entry:first').html().replace(/<a(.*?)<\/a>/, '');
                that.removeTag(tagText);
            });
        }

    };
    o.init();


};