/*!
* Datatables popup filters v1.0
* ========================================================================
* init the popup filter menu on filter icon
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
$(document).ready(function() {
	
	// define language options in jquery.dataTables.globalize.js
	var dataTableLangCol = Globalize.localize( "dataTableCol" );

	// CTIE EXEMPLE : filter form
	var col01html = '\
		<a href="#filter-form-col01" class="ui-widget-label"><span class="ui-widget-label-ico">Filtres</span></a>\
		<div class="ui-widget-content" id="filter-form-col01" aria-label="Filter options">\
				<label>'+dataTableLangCol.sFilter+'\
					<span id="text-name-filter"><input type="text" /></span>\
				</label>\
				<label>'+dataTableLangCol.sList+'\
					<span id="select-name-filter"><input type="text" /></span>\
				</label>\
		</div>\
			';		
				

	// CTIE EXEMPLE : 
	 //Add filter container element to second column
	 
	$('<div class="columnFilters" id="filter-col01" />').prependTo(".dt-filters thead th:nth-child(2)").html(col01html);
		
	// adapt filter icon height to cell height
	$(".columnFilters .ui-widget-label").css({
	  // align top and left of cell
	  top: function(index, value) {
	  var thoffset = $(this).closest('th').offset();
	  var eloffset = $(this).parent().offset();
	  var myoffset = eloffset.top-thoffset.top;
	  // return '-'+$(this).closest('th').css("padding-top");
		return -1*myoffset;
	  }, 
	  left: function(index, value) {
		return '-'+$(this).closest('th').css("padding-left");
	  },
	  height: function(index, value) {
		return $(this).closest('th').outerHeight();
	  }

	});

	// attach popup event to filter icon
	$("#filter-form-col01").popup({
		open: function( ) {
			// add active state to filter icon
			$(this).parent().find('.ui-widget-label').addClass('is-active');
			$(this).live("click", function(event) {
				// prevent click on popup to trigger sorting of column
				event.stopPropagation();
				event.preventDefault();
			});
		},
		close: function( ) {
			// remove active state from filter icon
			$(this).parent().find('.ui-widget-label').removeClass('is-active');
		}
	});
	
} );