/*
* selectAllRows.js - http://beckelman.net
*
* Copyright (c) 2008 Bill Beckelman
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* revision for CTIE 2012
*
*
* 2008-11-18
* Version .01
*/

(function($) {

    $.fn.selectAllRows = function(callerSettings) {
        var settings;
        var headerCheckbox;
        var columnCheckboxes;

        settings = $.extend({
            column: 1,
            selectTip: 'Click to Select All',
            unselectTip: 'Click to Un-Select All'            
        }, callerSettings || {});

		headerCheckbox = $("thead tr th:nth-child(" + settings.column + ") input:checkbox", this);
		columnCheckboxes = $("tbody tr td:nth-child(" + settings.column + ") input:checkbox", this);

        headerCheckbox.attr("title", settings.selectTip);

        headerCheckbox.click(function() {
            var checkedStatus = this.checked;
			
			/* simple selectable tables */
            $(this).closest('table').find("tbody tr td:nth-child(" + settings.column + ") input:checkbox").each(function() {
                this.checked = checkedStatus;
				if ($(this).is(':checked')) {
					$(this).closest('tr').addClass('is-selected');
				} else {
					$(this).closest('tr').removeClass('is-selected');
				}
            });
			
			/* splitted tables (sortable, scrollable, etc..) */
            $(this).closest('.dataTables_wrapper').find("table tbody tr td:nth-child(" + settings.column + ") input:checkbox").each(function() {
                this.checked = checkedStatus;
				if ($(this).is(':checked')) {
					$(this).closest('tr').addClass('is-selected');
				} else {
					$(this).closest('tr').removeClass('is-selected');
				}
            });

            if (checkedStatus == true) {
                $(this).attr("title", settings.unselectTip);
            }
            else {
                $(this).attr("title", settings.selectTip);
            }
        });

        return $(this);
    };
})(jQuery);
