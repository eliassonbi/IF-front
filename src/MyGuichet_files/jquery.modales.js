/*!
* dialog initialization v1.0
* ========================================================================
* init dialog on '.modal-trigger'
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

function loadDialog(sw,modalId, options){
	
	//var modalId = 'sample-modal1';
	$('#'+modalId).html('<span class="spinner st-rotate">...</span>');
	$.get(
		sw,
		{ "date": $.now() , 'param' : ''},
		function(data){
			var targ = '#'+modalId;
			if( data.indexOf('base-layout-modal') != -1) {
				$(targ).html(data);
				
				// if custom inputs, init them
				$('.radio-btn-selector', targ).customInput();
				
			
				// if fileuplopad, init them
				if($('#fileupload').length!=0){
					initModalUpload();					
				}
				
				openDialog(targ, options);

				singleFileBrowseBtn();
				
				$('#base-layout-modal select.simpleselect').selectmenu({
					style:'dropdown',
					create:function(event, ui) {
					// check if value is selected and add a class to the button 
						var $menuId = $(event.currentTarget).parent().attr("id");
						var $tigger = $('[aria-owns="'+$menuId+'"]');
						if($(this).val()!=""){
							$tigger.addClass('ui-has-value');
						} else {
							$tigger.removeClass('ui-has-value');
						}
					},
					close:function(event, ui) {
					// check if value is selected and add a class to the button 
						var $menuId = $(event.currentTarget).parent().attr("id");
						var $tigger = $('[aria-owns="'+$menuId+'"]');
						if($(this).val()!=""){
							$tigger.addClass('ui-has-value');
						} else {
							$tigger.removeClass('ui-has-value');
						}
					}
				});
	
				// if tabs, init them
				if($(targ).find('.mod-tabs').length!=0){
					var current = $(targ).find('.mod-tabs *[checked]').attr('id');
					// set focus to this element
					$(targ).find('.mod-tabs *[checked]').siblings('label').focus().end().parent().addClass('has-focus');
					
					//modalTabsInit(current);
					
					// bind click on unselected tabs
					$(targ).find('.mod-tabs input').not('*[checked]').siblings('label').bind('click',handleTabSwitch);
					// hide unselected tabs content
					$(targ).find('.mod-tab-container .mod-tab-'+current).siblings('.mod-tab').addClass('mod-tab-hidden').hide();
					
					$(targ).find('.mod-tabs input').not('*[checked]').keyup(function(e) {
						if(e.keyCode == 13) {
							handleTabSwitch(e);
						}
					});					
				}
			}
			else {
				window.location.replace(location.href);
			}
		}
	);						

}
function handleTabSwitch(ev){
		var $target = '';
		var current = '';
	
	if ($(ev.target).is('label')) {
		$target=$(ev.target);
		current = $(ev.target).siblings('input').attr('id');
	}else{
		$target=$(ev.target).siblings('label');
		current = $(ev.target).attr('id');
	}
	
	// uncheck input, remove class='checked' on label and remove class='has-focus' on parent div
	$('.mod-tabs').find('*[checked]').removeAttr('checked').siblings('label').removeClass('checked').parent().removeClass('has-focus');
	// unbind clic on clicked item, add class 'checked' on label, add attr checked on input and add class='has-focus' on parent div
	$target.unbind('click').addClass('checked').siblings('input').attr('checked','checked').parent().addClass('has-focus');
	
	// hide unselected tabs content
	$('.mod-tab-container').find('.mod-tab-'+current).siblings('.mod-tab').addClass('mod-tab-hidden').hide(0);
	$('.mod-tab-'+current).removeClass('mod-tab-hidden').show(0);
	
	// bind click on non-selected elements
	$('.mod-tabs').find('input').not('*[checked]').keyup(function(e) {
		if(e.keyCode == 13) {
			handleTabSwitch(e);
		}
	}).siblings('label').bind('click',handleTabSwitch);
	// ---  misc. customizations ---
	// make room for fileupload buttons, but only in that particular case...
	if($('.mod-tab-'+current).find('.lengthen-parent').length!=0){
		$('.mod-content').css('padding-bottom','5em');
	}else{
		$('.mod-content').css('padding-bottom','1.25em');
	}
	// set focus to this element
	$target.focus();
}


function openDialog(targ, options){
    var scriptsLg = Globalize.localize( "miscripts" );

	$(targ).dialog({
            draggable : false,
            resizable : false,
		    minWidth: 400,
            maxHeight: options.maxHeight || null,
			width: '90%',
            closeText: scriptsLg.close,
            open: function(){
				$(this).dialog({position: {
					my: "center",
					at: "center",
					of: window,
					collision: "fit",
					// ensure that the titlebar is never outside the document
					using: function( pos ) {
						var topOffset = $( this ).css( pos ).offset().top;
						if ( topOffset < 0 ) {
							$( this ).css( "top", pos.top - topOffset );
						}
					}
				}});
				//delete rounded corners
				$(targ).parents('.ui-dialog').removeClass('ui-corner-all');
				
				// binding of Annuler/Close button
				$('.modal-close',$(this)).live('click',function(ev){
					$(ev.target).parents('.modal').dialog('close');
				});

				// bind "Choisir un autre document" et compagnie
				$('.modal-switch',$(this)).bind('click',function(ev){
					var sw = $(ev.target).attr('data-switch-to');
					setTimeout(function(){
						$(targ).dialog('close');
						loadDialog(sw+'.html','sample-modal1');
						
						//alert(navigator.appName);
						/*if(navigator.appName=='Microsoft Internet Explorer'){
							setTimeout(function() { // making IE happy
								//alert('!');
								//$('.mod-dropzone .title').text(scriptLg.ieFileuploadLabel);
								//$('.fileupload-files .file-row').append('<hr class="both" />');
							}, 500);
						}*/
						
						
					},1000);
				});
			},
			close : function(e){
              $("[data-modale='"+targ+"']").eq(0).focus();
              $(targ).html('');
		   /* modal has been closed */
			  $isModalOpen = null;
            },
			beforeClose: function(ev){
				// if user chooses to reopen the modal later, this will clean the slate on modal close
				if($(targ).parents('.ui-dialog').find('.dt').length!=0){
					$(targ).parents('.ui-dialog').find('.dt').dataTable().fnDestroy();
				}
			},
            describedBy : $(this).attr('aria-describedby'),
            modal : true
		});
		
		$(targ).dialog('open');
}

function listenForDialog(e){
	var modalId = $(e).attr('data-modale'),
        sw = $(e).attr('href'),
        options = {};
    
    //if( $( e ).hasAttr( 'data-max-height' ) ) options.maxHeight = $( e ).attr( 'data-max-height' );
    
	loadDialog(sw,modalId, options);
}


function bindModals(){
	$('.modal-trigger').bind('click',function(e){
		/*  test if a modal has been requested */
		if($isModalOpen==null) {
			/*  modal has been requested */
			$isModalOpen=true;
			listenForDialog(this);
		}
		e.preventDefault();
		e.stopPropagation();
	});
	$('.modal-trigger').bind('keypress',function(e){
		if(e.keyCode==13){
			/*  test if a modal has been requested */
			if($isModalOpen==null) {
				/*  modal has been requested */
				$isModalOpen=true;
				listenForDialog(this);
			}
			e.preventDefault();
			e.stopPropagation();
		}
	});
}

$(document).ready(function(){
	/*  check if modal has been triggered
	declare the global variable for modal checking */
	$isModalOpen = null; 
	bindModals();
	/* handle modales in datatables */
	$('.dataTables_wrapper .paging_showmore, table.dataTable th, .dataTables_wrapper .paginate_button').bind('click',function(e){
		bindModals();
	});
	/* search is bind in datatable JS */
});