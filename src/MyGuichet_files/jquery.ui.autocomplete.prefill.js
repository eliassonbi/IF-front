(function( $ ) {

    $.extend($.ui.autocomplete.prototype, {

		activate: function( event, item ) {
			
			this.deactivate();
			
			if (this.hasScroll()) {
				var offset = item.offset().top - this.menu.element.offset().top,
					scroll = this.menu.element.scrollTop(),
					elementHeight = this.menu.element.height();
				if (offset < 0) {
					this.menu.element.scrollTop( scroll + offset);
				} else if (offset >= elementHeight) {
					//scroll to top of menu on new 
					this.menu.element.scrollTop( scroll + offset - elementHeight + item.height());
				}
			}
			this.active = item.eq(0)
				.children("a")
					.addClass("ui-state-focus")
					.attr("id", "ui-active-menuitem")
				.end();
			this._trigger("focus", event, { item: item });
		},
		
		deactivate: function() {
			if (!this.active) { return; }
		
			this.active.children("a")
				.removeClass("ui-state-hover")
				.removeAttr("id");
			this._trigger("blur");
			this.active = null;
		},
		
		hasScroll: function() {
			return this.menu.element.height() < this.menu.element[ $.fn.prop ? "prop" : "attr" ]("scrollHeight");
		},
        _createSelection: function($input, start, end) {

            // get a reference to the input element
            var field = $input.get(0);

            // set the selection (browser specific methods)
            if( field.createTextRange ){
                var selRange = field.createTextRange();
                selRange.collapse(true);
                selRange.moveStart("character", start);
                selRange.moveEnd("character", end);
                selRange.select();
            } else if( field.setSelectionRange ){
                field.setSelectionRange(start, end);
            } else {
                if( field.selectionStart ){
                    field.selectionStart = start;
                    field.selectionEnd = end;
                }
            }

            field.focus();
        },

        _autoFill: function($input, sValue, event) {
            // here 'this' is the plugin itself
            // if the last user key pressed was backspace, don't autofill
            // CTIE update : autofill the field w the first match as long as the user hasn't entered in more data
			var autocomplete = $input.data( "autocomplete" );
           if (autocomplete._lastKeyPressCode != 8 && autocomplete._previousValue==$input.val()) {

                // fill in the value (keep the case the user has typed)
                $input.val($input.val() + sValue.substring(autocomplete._previousValue.length));
				
                // select the portion of the value not typed by the user (so the next character will erase)
                this._createSelection($input, autocomplete._previousValue.length, sValue.length);
            }
        },

        _previousValue: '',
        _lastKeyPressCode: null
    });

        $( ".ui-autocomplete-input" )
        .live( "blur", function(event) {

			if($(this).val()!=""){
						$(this).addClass('ui-has-value');
					} else {
						$(this).removeClass('ui-has-value');
					}
        })
        .live( "keyup", function(event) {

            var $this = $(this),
                autocomplete = $this.data('autocomplete'),
				menu = autocomplete.menu,
                key;
				
            autocomplete._lastKeyPressCode = key = event.which;

            // do nothing on backslash/command keys
            if( key == 46 || (key > 8 && key < 32) )
                return autocomplete.deactivate();

            // check value is different
            var v = $this.val();
            if (v == autocomplete._previousValue)
                return;

            // save value
            autocomplete._previousValue = v;

        })
        .live( "autocompleteopen", function(event) {

            var $this = $(this),
                autocomplete = $this.data( "autocomplete" ),
				firstValue = false,
                menu = autocomplete.menu;

			//$("#log").append( " +++ "+autocomplete._previousValue+" +++ ");
			menu.element.width($(this).outerWidth());
			/* added emphasis on mached text */
			menu
				.element
				.find('a')
				.each(function () {
					var me = $(this);
					var keywords = autocomplete.term.split(' ').join('|');
					if ( !firstValue ) {
						firstValue = me.text();
					}
					//alert(keywords);
					me.html(me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<strong>$1</strong>'));
					//me.html(me.text());
				});

            // check the 'selectFirst' setting
            if ( !autocomplete.options.selectFirst ) {
                return;
            }

            // activate the menu
            autocomplete.activate( $.Event({ type: "mouseenter" }), menu.element.children().first() );

            // set the autoFill if source is not an select box
			if (!$this.hasClass("ui-select-autocomplete")) {
				autocomplete._autoFill($this, menu.element.children().first().text())
			}
        });

    }( jQuery ));
