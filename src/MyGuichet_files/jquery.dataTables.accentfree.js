/*!
* jquery.datatables.accentfree.js v0.0.1
* ========================================================================
* Ignor accents when searching datatable
*
* Copyright © 2014 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

jQuery.fn.accentfree = function(){
	$(this).each(function(i){	
		if($(this).hasClass('dataTable')){
			// datatable
			var $dt = $(this);
			// Accent list
			var rExps = { a: '[a\xE0-\xE6]', e: '[eȩ\xE8-\xEB]', i: '[i\xEC-\xEF]', o: '[o\xF2-\xF6]', u: '[u\xF9-\xFC]', n: '[n\xF1]'};
			// Create label and search input field
			var dtlabel = $('<label />', {text: $dt.dataTable().fnSettings().oLanguage.sSearch});
			// search field wrapper
			var $dtwrapper = $(this).closest('.dataTables_wrapper').find('.dataTables_filter');

			$('<input />', {
				'class' : 'accentfree',
				'type' : 'text'
			}).bind('keyup.DT', function() {
				filterValue = '';
				searchValue = $(this).val().toLowerCase();

				// Strip the accents first
				$.each(rExps, function (key, value) {
					searchValue = searchValue.replace(new RegExp(value, 'g'), key);
				});

				// Recreate a regex to match the accents into the datatable
				for (i = 0; i < searchValue.length; i++) {
					if (rExps[searchValue[i]] != undefined)
						filterValue += rExps[searchValue[i]];
					else
						filterValue += searchValue[i];
				}

				// Execute filtering action
				$dt.dataTable().fnFilter(filterValue, null, true);
			}).appendTo(dtlabel);
				// Remove default search field
			$dtwrapper.find('label').remove();
				// insert custom filtering search field
			dtlabel.appendTo($dtwrapper);
		};
	});
};
$(document).ready(function(){
	// initialize on page datatabless
	$('.dataTable').accentfree();
	$('.dataTables_filter input').on( "focusout", function(){
			bindModals();
	});	
});