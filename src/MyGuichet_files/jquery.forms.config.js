/*!
* HTML Forms initialization v1.0
* ========================================================================
*  - Help popups on form fields
*  - on focus events in fieldsets
*  - in place editing
*  - autocomplete on textfields (requires jquery.ui.autocomplete.orig.js & jquery.ui.autocomplete.prefill.js)
*  - Custom form elements
*  - button with menu
*  - HTML5 Placeholder
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

var txt = Globalize.localize( "miscripts" );

function launchWaiter(){
	// Remove links before displaying waiter
	$('input[type=button]:not([disabled]), input[type=submit]:not([disabled]), a.btn').addClass('form-spinner-disabled');
	$('input[type=button], input[type=submit]').attr('disabled','disabled');
	$("a.btn").click(function(event) {
		if(!$('ie7, ie8')){
		 	event.preventDefault();
		} 
	});
	setTimeout(function(){
		if ( $('#form-spinner-box').length < 1 ){
			$( '<div class=form-spinner-box id=form-spinner-box><div class=form-spinner>'+ txt.wait  +'</div></div>' ).appendTo( 'body' );
		}
	}, 1000);
}

function closeWaiter(){
	$('input[type=button].form-spinner-disabled, input[type=submit].form-spinner-disabled').prop('disabled', false);
	$('input[type=button].form-spinner-disabled, input[type=submit].form-spinner-disabled').removeClass('form-spinner-disabled');
	$( '.form-spinner-box' ).remove();
	$( '.form-spinner-box-modal' ).remove();
}

function launchWaiterWithoutDelay(){
	if ($('#form-spinner-box').length < 1){
		$( '<div class=form-spinner-box id=form-spinner-box><div class=form-spinner>'+ txt.wait  +'</div></div>' ).appendTo( 'body' );
	}
}

$(document).ready(function(){

/**
 * Display loading spinner on submit
 */
    $( '.form-waiter' ).on( 'submit', function() {
    	launchWaiter();
    });
    
    $( '.link-waiter' ).on( 'click', function() {
    	launchWaiter();
    });
    
    $( window ).on( 'unload', function() {
       	closeWaiter();
    });

/**
 * Help popups on form fields
 *
 */
	$('.hint-icon').each(function(index) {
		//define hint-icon and hint-text for all occurences 
		var $hint = $(this);
		var $hinttxt = $(this).next();
		var $index = 9000;
		//define offset variables
		var x = $(this).width()/2;
		var y = 5;
		//add close icon text see : jquery.globalize-jscripts.js
		$hinttxt.append('<button class="btn-close" title="' + scriptsLg.close + '"/>');
		$hinttxt.popup({
			position : {
				of: $hint,
				my: "left top",
				at: "left top",
				offset: x+" "+y
			},
				managed: true,
				open: function(event, ui) { 
						$('.hint-txt').not($(this)).popup("close"); 
						$hint.css('zIndex', $index);
						$hint.addClass('is-active').css('zIndex', $index+10);
						$hinttxt.children('.btn-close').focus();
					},
				close: function(event, ui) { 
						$hint.removeClass('is-active').css('zIndex', '');
						$hint.css('zIndex', '');
					}
            });
	}).live("mousedown", function( event ) {
		$(this).next().popup( "open");
		event.preventDefault();
	}).live("focusin", function( event ) {
		$(event.target).addClass('is-active');
		$(event.target).bind('keypress',function(ev){
			if(ev.keyCode ==13){
				$(this).next().popup("open");				
				ev.preventDefault();
			}
		});
	}).live("focusout", function( event ) {
		$(event.target).removeClass('is-active');
	});
	
	$(".btn-close").click(function( event ) {
		var target = $(this).closest('.hint-txt');
		target.popup('close');
		event.preventDefault();
	});
	
/**
 * on focus events in fieldsets
 *
 *
 */		
	$('.is-highlightable a, .is-highlightable input, .is-highlightable textarea, .is-highlightable select').focus(function(){
		$(this).parents('.is-highlightable').addClass("has-focus");
	}).blur(function(){
		$(this).parents('.is-highlightable').removeClass("has-focus");
	});
	
/**
 * in place editing
 *
 */	
	function readeditblurhandler(target){
		// target = input field		
		var targ = $(target);
		var $nameOfField = targ.siblings('.r-e-link');
		var htmlval="";
		// 	var $tag=targ.prop('nodeName').toLowerCase();
		// if the newly typed in value is an empty string
		if(targ.val()=="" || targ.val()==" "){
			// reset the field and give it back the original text
			targ.removeClass('r-e-filled').siblings('.r-e-link').removeClass('r-e-filled');
			htmlval = targ.siblings('label').text()+' <img class="statut-icon" src="../css/img/layout/icons/edit.png" title="'+scriptsLg.editField+'" alt="'+scriptsLg.edit+'" />';
		}else{
			// else, reset everything and give it the necessary classes and content
			targ.addClass('r-e-filled').siblings('.r-e-link').addClass('r-e-filled');
			htmlval = targ.val()+' <img class="statut-icon" src="../css/img/layout/icons/edit.png" title="'+scriptsLg.editField+'" alt="'+scriptsLg.edit+'" />';
		}
		$nameOfField.html(htmlval);
		$nameOfField.removeClass("js-hidden has-focus");
		targ.addClass("js-hidden").removeClass('has-focus');
	}
 
	$(".r-e-link").live("click focusin", function( event ) {
		// if focus or click on link, hide the link
		$(this).addClass("js-hidden");
		var $nameOfField = $(this).attr('href');
		// display and focus on the input field
		$($nameOfField).toggleClass("js-hidden has-focus").focus();
		event.preventDefault();
	});
	
	$('.is-read-editable:not(.has-mod)').livequery(function(){
		$(this).each(function(index) {
		//initialize read editable inputs
		//field is the input
		var $field = $(this);
		var $nameOfField = $field.attr('id');
		var $classOfField = $field.attr('class').replace('js-hidden','mod').replace('is-read-editable','r-e-link');
		var $label = $('label[for='+$nameOfField+']');
		//add .has-mod to identify allready initialized inputs
		$field.addClass('has-mod');
		//insert link 'overlay'
		var $fieldAnchor = $(this).before('<a href="#'+$nameOfField+'" class="'+$classOfField+'" title="'+scriptsLg.edit+'" tabindex="0">'+$label.text()+' <img class="statut-icon" src="../css/img/layout/icons/edit.png" title="'+scriptsLg.editField+'" alt="'+scriptsLg.edit+'" /></a>');
		//prevent tab on input, since it's now handled by the link 'overlay'
		$field.attr( "tabindex", -1 );
	}).bind("focusout", function( event ) {
		// when done typing, call blur handler
		readeditblurhandler(this);
		event.preventDefault();
	}).bind("change", function( event ) {
		// when done typing, call change handler
		readeditblurhandler(this);
		$(this).closest('form').submit();
		event.preventDefault();
	}).bind('keydown',function(ev){
		// handle of 'back tab'
		if($(this).hasClass('has-focus') && ev.shiftKey && ev.keyCode==9){
			if($(this).parent().prev().children('.r-e-link').length>0){
				$(this).parent().prev().children('.r-e-link').focus();
			}else{
				var tablist = $('a, input, textarea, select');
				var evtargindex = tablist.index(this);
				// -2 in order to jump the r-e-link and go for the previous "focusable" element
				tablist.eq(evtargindex-2).focus();
			}
			ev.preventDefault();
		}else if(ev.keyCode==13){
			//hitting enter when finished editing seems like a natural thing to do, let's handle that...
			readeditblurhandler(this);
			$(this).closest('form').submit();
			ev.preventDefault();
		}		
	});
	});
	
/**
 * autocomplete on textfields
 *
 */		
	if($( ".has-autocomplete" ).length!=0){
	
	/**
	 * CTIE EXEMPLE : Sources de données à renseigner en fonction de l'utilisation
	 */
		$( ".has-autocomplete" ).autocomplete({
			
			source: function( request, response ) {
				$.ajax({
					url: "http://ws.geonames.org/searchJSON",
					dataType: "jsonp",
					data: {
						featureClass: "P",
						style: "full",
						maxRows: 12,
						name_startsWith: request.term
					},
					success: function( data ) {
						response( $.map( data.geonames, function( item ) {
							return {
								label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
								value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName
							}
						}));
					}
				});
			},
			//	selectFirst: true;  activates prefill 
			//	and selection of first item in result list
			selectFirst: true,
			// minimum number of characters to activate autocomplete
			minLength: 2
		});
	/* CTIE EXEMPLE */
	
			
		$( ".search-field.has-autocomplete" ).autocomplete( "widget" ).addClass('ui-menu-search');
	}
	
/**
 * Custom form elements :
 *
 * - checkboxes & radio
 * - single select menus
 * - multiple select menus
 * - action-menu buttons
 * 
 */
 	if($('input[type=checkbox]:not(.naked), input[type=radio]:not(.naked)').length>0){
		$('input[type=checkbox]:not(.naked), input[type=radio]:not(.naked)').customInput();
	}
	
	/* function to check if value is selected and add a class to the button */
	function selectmenuHasValue(event, ui) {
		var $menuId = $(event.currentTarget).parent().attr("id");
		var $tigger = $('[aria-owns="'+$menuId+'"]');
		if($(this).val()!=""){
			$tigger.addClass('ui-has-value');
		} else {
			$tigger.removeClass('ui-has-value');
		}
}
	$('select.simpleselect').selectmenu({ style:'dropdown', create:selectmenuHasValue, close:selectmenuHasValue });


	if($('select.has-autocomplete').length!=0){
		$('select.has-autocomplete').parent().css("position","relative");
		$('select.has-autocomplete').combobox();
	}
	/* Only fire resize event when window resizes not when elements are resized on the page
			IE bug : http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer  */
	var winWidth = $(window).width(),
			winHeight = $(window).height();

	$(window).resize(function() {
	/* on window resize : */
    //New height and width
    var winNewWidth = $(window).width(),
        winNewHeight = $(window).height();
    // compare the new height and width with old one
    if(winWidth!=winNewWidth || winHeight!=winNewHeight)
    {
    	waitForFinalEvent(function(){
			/* destroy and recreate the selectmenus to prevent width error */
			$('select.simpleselect').selectmenu('destroy').selectmenu({ style:'dropdown', create:selectmenuHasValue, close:selectmenuHasValue }); 
			/* destroy and recreate the autocompletes to prevent width error */
			$('select.has-autocomplete').next('.ui-helper-hidden-accessible').remove();
			$('select.has-autocomplete').combobox('destroy').combobox();
    	}, 500, "formResizeEvent");

    	}
    	//Update the width and height
    	winWidth = winNewWidth;
    	winHeight = winNewHeight;
	});
/**
 * button with menu :
 *
 */
		
	$(".btn-menu:not(.ui-state-disabled)").menubar({
        select : function(event, ui){
			
			//so that hitting enter on an element follows the link, unless it happens to be a modal trigger
			if(ui.item.find('a').hasClass('modal-trigger')){
				//alert('bing');
				listenForDialog(e);
			}
			
			else{
				//console.log('select');
				window.location=ui.item.find('a').attr('href');
			}
			
			//alert($(event.target).html());			
    	}
	});
	$(".btn-menu.ui-state-disabled").each(function(){
			$(this).addClass('ui-widget-header ui-menubar').attr('role','menubar');
			var label = $(this).children('li:first-child').children('a:first-child').text();
			$(this).children('li:first-child').attr('role','presentation').addClass('ui-menubar-item').html('<span role="menuitem" class="ui-button ui-widget ui-button-text-only ui-menubar-link"><span class="ui-button-text">'+label+'</span></span>');
		
	});
		
/*------------------------------------------------*/
		
/**
 * HTML5 Placeholder Text jQuery Fallback with Modernizr
 *
 * @url     http://uniquemethod.com/
 *
 */
$(function()
{
    // check placeholder browser support
    if (!Modernizr.input.placeholder)
    {
 
        // set placeholder values
        $(this).find('[placeholder]').each(function()
        {
            if ($(this).val() == '') // if field is empty
            {
                $(this).val( $(this).attr('placeholder') );
            }
        });
 
        // focus and blur of placeholders
        $('[placeholder]').focus(function()
        {
            if ($(this).val() == $(this).attr('placeholder'))
            {
                $(this).val('');
                $(this).removeClass('placeholder');
            }
        }).blur(function()
        {
            if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))
            {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeholder');
            }
        });
 
        // remove placeholders on submit
        $('[placeholder]').closest('form').submit(function()
        {
            $(this).find('[placeholder]').each(function()
            {
                if ($(this).val() == $(this).attr('placeholder'))
                {
                    $(this).val('');
                }
            })
        });
 
    }
});
});	