/**
* Similar to the Date (dd/mm/YY) data sorting plug-in, this plug-in offers
* additional flexibility with support for spaces between the values and
* either . or / notation for the separators.
* @name Date (dd . mm[ . YYYY])
* @anchor date_eu
* @author <a href="http://galjot.si/">Robert Sedovšek</a>
*/

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "date-eu-pre": function ( date ) {
        var date = date.replace(" ", "");
          
				/* only use text (no HTML)*/
				date = $('<div/>').html(date).text();
				
				if (date!="") {
				
					if (date.indexOf('.') > 0) {
							/*date a, format dd.mn.(yyyy) ; (year is optional)*/
							var eu_date = date.split('.');
					} else {
							/*date a, format dd/mn/(yyyy) ; (year is optional)*/
							var eu_date = date.split('/');
					}
						 
					/*year (optional)*/
					if (eu_date[2]) {
							var year = eu_date[2];
					} else {
							var year = 0;
					}
						
					/*month*/
					var month = eu_date[1];
					if (month.length == 1) {
							month = 0+month;
					}
						
					/*day*/
					var day = eu_date[0];
					if (day.length == 1) {
							day = 0+day;
					}
						
					return (year + month + day) * 1;
				} else {
					return 0;
				}
    },
 
    "date-eu-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "date-eu-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    },
	
	"date-euro-pre": function ( a ) {
        if ($.trim(a) != '') {
            var frDatea = $.trim(a).split(' ');
            var frTimea = frDatea[1].split(':');
            var frDatea2 = frDatea[0].split('/');
            var x = (frDatea2[2] + frDatea2[1] + frDatea2[0] + frTimea[0] + frTimea[1] + frTimea[2]) * 1;
        } else {
            var x = 10000000000000; // = l'an 1000 ...
        }
         
        return x;
    },
 
    "date-euro-asc": function ( a, b ) {
        return a - b;
    },
 
    "date-euro-desc": function ( a, b ) {
        return b - a;
    }
} );