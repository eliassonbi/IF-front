	(function( $ ) {
		$.widget( "ui.combobox", {
			_create: function() {
				var comboboxLg = Globalize.localize( "globJqueryUi" );
				var self = this,
					select = this.element.hide(),
					selected = select.children( ":selected" ),
					value = selected.val() ? selected.text() : "";
				function removeIfInvalid(element) {
					var value = $( element ).val(),
						matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( value ) + "$", "i" ),
						valid = false;
					select.children( "option" ).each(function() {
						if ( $( this ).text().match( matcher ) ) {
							this.selected = valid = true;
							return false;
						}
					});
					if ( !valid ) {
						// remove invalid value, as it didn't match anything
						$( element )
							.val( "" )
							.attr( "title", value + comboboxLg.didntmatch );
						//	.tooltip( "open" );
						select.val( "" );
						/*
						setTimeout(function() {
							input.tooltip( "close" ).attr( "title", "" );
						}, 2500 );
						*/
						input.data( "autocomplete" ).term = "";
						return false;
					}
				}

				var input = this.input = $( "<input>" )
					.insertAfter( select )
					.val( value )
					.attr( "title", "" )
					.autocomplete({
						minLength: 0,
						/*	selectFirst: true;  activates prefill 
							and selection of first item in result list
						*/
						selectFirst: true,
						source: function( request, response ) {
							// match beginning of string "^" + 
							var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
 							//	$("#log").append( " !!!!!Begin!!!!!! ");
							response( select.children( "option" ).map(function() {
								var text = $( this ).text();
								if ( this.value && ( !request.term || matcher.test(text) ) )
									return {
										label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>" ),
										value: text,
										option: this
									};
							}) );
						},
						select: function( event, ui ) {
							ui.item.option.selected = true;
							self._trigger( "selected", event, {
								item: ui.item.option
							});
						}
						,
						change: function( event, ui ) {
							if ( !ui.item )
								return removeIfInvalid( this );
						}
					})
					.addClass( "ui-widget ui-state-default ui-widget-content ui-select-autocomplete" );

				input.data( "autocomplete" )._renderItem = function( ul, item ) {
					return $( "<li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + item.label + "</a>" )
						.appendTo( ul );
				};
				input.data( "autocomplete" ).liveRegion.insertBefore(input);

				this.button = $( "<button type='button'>&nbsp;</button>" )
					.attr( "tabIndex", -1 )
					.attr( "title", comboboxLg.showall )
					//.tooltip()
					.insertAfter( input )
					.button({
						icons: {
							primary: "ui-icon-triangle-1-s"
						},
						text: false
					})
					.removeClass( "ui-corner-all" )
					.addClass( "ui-autocomplete-button ui-corner-right ui-button-icon" )
					.click(function() {
						// close if already visible
						if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
							input.autocomplete( "close" );
							removeIfInvalid( input );
							return;
						}

						// work around a bug (likely same cause as #5265)
						$( this ).blur();

						// pass empty string as value to search for, displaying all results
						input.autocomplete( "search", "" );
						input.focus();
					}).hide();
					
					// .position() uses position relative to the offset parent, 
					var inputPos = input.position();
					// .outerWidth() takes into account border and padding.
					var inputWidth = input.outerWidth();
					var buttonWidth = this.button.outerWidth();
					
					//show the menu directly over the placeholder
					this.button.css({
						position: "absolute",
						top: inputPos.top + "px",
						left: (inputPos.left + inputWidth - buttonWidth) + "px"
					}).show();
					/*
					input
						.tooltip({
							position: {
								of: this.button
							},
							tooltipClass: "ui-state-highlight"
						});
						*/
			},

			destroy: function() {
				this.input.remove();
				this.button.remove();
				this.element.show();
				$.Widget.prototype.destroy.call( this );
			}
		});
	})( jQuery );