/*!
* Jstree initialization v1.0
* ========================================================================
* add tree to '.doc-tree' lists and handle menu-boutons
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

function docDeployer(action,that){
	if(action=='open'){
		openMetadata(that);
		that.closest('.documents').find('.doc-deployer').addClass('doc-deployed').html(scriptsLg.docfoldbtn + '<span class="icon-arrow-up">&nbsp;</span>').on('click',function(ev){
			$(ev.target).unbind();
			ev.preventDefault();
			docDeployer('close',that);
		});
	}else{
		closeMetadata(that);
		that.closest('.documents').find('.doc-deployer').removeClass('doc-deployed').html(scriptsLg.docdeploybtn + '<span class="icon-arrow-down">&nbsp;</span>').on('click',function(ev){
			ev.preventDefault();
			$(ev.target).unbind();
			docDeployer('open',that);
		});
	}
}

function initMetadata(that){
	that.prev('.doc-head').before('<a href="#" class="doc-deployer" />');
	var metas = that.find('.metadata-list')
	var ht = metas.height();
	metas.attr('data-height',ht).css('height',ht);
	metas.hide();
	docDeployer('close',that);
	/* show metadata if jstree is open
	if(that.find('.jstree-open').length>0){
		docDeployer('open',that);
	}else{
		docDeployer('close',that);
	} */
}

function openMetadata(that){
	that.find('.metadata-list').show('blind',250);
}

function closeMetadata(that){
	that.find('.metadata-list').hide('blind',250);
}

function initJstree() {
// tree initialization function
	
	// bind a click event on the document link (used on "ctrl+space")
	$(".doc-tree .dct-title > a:not(.modal-trigger)").click(function() {
		window.open($(this).attr("href"));
		return false;
	});
	
	// Add the .jstree-link class to the document link
	$('.doc-tree li').not($('.jstree-ignore li')).each(function(index) {
		// .jstree-link : defines the link on which to bind the actions
		$(this).find('.dct-title > a').addClass('jstree-link');
	});
		
	$('.doc-tree')
		.bind("loaded.jstree", function (event, data) {
						
			/* after load init the button-menus and remove clearfix (element not floated) */ 
			$(".doc-tree .btn-menu:not(.ui-state-disabled)").menubar({
				select : function(event, ui){
			}}).removeClass('ui-helper-clearfix');
			
			/* removes the tabindex -1 added by the jstree */ 
			$(".doc-tree .btn-menu").bind("keydown", "right left", function (event) { 
				$(event.target).attr("tabindex", "0");
			});
			if($(this).find('.metadata-list').length>0){
				initMetadata($(this));
			}
		})/* Bind open close of jstree to hide and show of metadata
		
		.bind("after_open.jstree", function(event, data){
			if($(this).find('.metadata-list').length>0){
				docDeployer('open',$(this));
			}
		})
		.bind("after_close.jstree", function(event, data){
			if($(this).find('.metadata-list').length>0){
				docDeployer('close',$(this));
			}
		})*/
		.jstree({
			"themes" : {
				"theme" : "dct",
				"dots" : false
			},
			"core" : {
				"animation" : 200
			},
			"plugins" : ["themes","html_data","ui","hotkeys", "search"]
		});
		if($('.dct-tooltip').length>0){
			$('.dct-tooltip').tooltip();
		}

}
function destroyJstree() {
	/* destroy tree and button-menus */ 
	$('.doc-tree .jstree-icon').remove();
	$('.doc-tree').jstree("destroy");
	$(".doc-tree .dct-actions.ui-menubar:not(.ui-state-disabled)").menubar("destroy");
}

$(document).ready(function() {
	// Destroy the button-menus created by the forms.config.js onpage-ready
	// the button-menus have to be created after the tree has loaded
	$(".doc-tree .btn-menu.ui-menubar:not(.ui-state-disabled)").menubar("destroy");
		initJstree();
		
		/* CTIE EXEMPLE : fonction search
			// bind search field
			$('.dct-search').on('keyup',function(e){
				if($(this).val() != ""){
					$(this).closest('.documents').find(".doc-tree").jstree("search",$(this).val());
				}
				if($(this).val() == ""){
					$(this).closest('.documents').find(".jstree-search").removeClass("jstree-search");
				}
			});
			$('.documents .filter-search-form').submit(function(e){
				if ($('.documents .jstree-search').length>0) {
					$('.documents .jstree-search').attr("tabindex", "0");
					$('.documents .jstree-search').eq(0).focus();
				}
			e.preventDefault();
			})
		*/
		
	
});