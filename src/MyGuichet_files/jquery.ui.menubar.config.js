/*!
* Main Menu Initialization v1.0
* ========================================================================
* Init pulldowns on main navigation items
*
* Author: @wildmotion
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
$(document).ready(function() {
	
	
	/* **************************************
		Initialize popup on login zone
	   **************************************
	 */
	$(".pb-profile .pulldown").popup({
		position: {
				my: "right top",
				at: "right bottom"
				},
		open: function() {
				// add active state to filter icon
				$(this).parent().addClass('is-deployed');
			},
		close: function() {
				// add active state to filter icon
				$(this).parent().removeClass('is-deployed');
			}
	});
	/* **************************************
		initialize pulldown navigation on "barre choix d'espaces"
	   ************************************** */
	   
	// set standard options
	var openActions = function() {
				// clear all pulldowns except this one
				var pulldowns = $(".sb-pulldown");
				var that = $(this);
				var pos = pulldowns.index(that);
				$('.sb-pulldown').each(function(index) {
					if (index!=pos) {
						$(this).popup('close');
					}
				});
				// add active state to filter icon
				$(this).parent().addClass('is-deployed');
				$(this).find('.p-cat-lvl0').removeClass('has-active-elements');
				var theThis = this;
				// navigate the list with up or down arrow keys
				that.find('.has-focus').live('keypress', function(ev){
					var kc = ev.keyCode;
					// if key = up or key = down
					if(kc == 38 || kc == 40){
						var tar = ev.target;
						// list of all targetable elements in this list
						var liste = that.find('a');
						var tarindex = liste.index(tar);
						var compte_liste = liste.length;
						//if key up	
						if(kc == 38){
							// focus on previous element (previous or last if current is first)
							liste.eq(tarindex-1).focus();
						}else if(kc == 40 && (tarindex+1)==compte_liste){
							// if key down on last, go back to first
							liste.eq(0).focus();
						}else if(kc == 40 && (tarindex+1)<compte_liste){
							// if key down, go down
							liste.eq(tarindex+1).focus();
						}
						ev.preventDefault();	
					}
				});
			};
	var closeActions = function( ) {
				// remove active state from filter icon
				$(this).parent().removeClass('is-deployed');
				// remove active classes
				$(this).find('.is-active').removeClass('is-active');
			};
	var focusActions = function( ) {
				// focus .is-selected element
				$(this).find('.is-selected').focus(1);
			};


	
	// pulldown menus deployed on right side
	$(".pulldown-right").popup({
	position: {
		my: "left bottom",
		at: "right bottom",
		offset: "-29px -8px"
	},
		open: openActions,
		close: closeActions,
		focusPopup: focusActions
	});
	
	// pulldown menus deployed on left side
	$(".pulldown-left").popup({
	position: {
		my: "right bottom",
		at: "right bottom",
		offset: "0 -8px"
	},
		open: openActions,
		close: closeActions
	});	
});