// regional data
var regions = {
    "en": {
        "closeText": "Done",
        "prevText": "Prev",
        "nextText": "Next",
        "currentText": "Today",
        "weekHeader": "Wk",
        "dateFormat": "d",
        "datePickerRole": "date picker"
    },
    
    "de": {
        "closeText": "schlie\u00dfen",
        "prevText": "&#x3c;zur\u00fcck",
        "nextText": "Vor&#x3e;",
        "currentText": "heute",
        "weekHeader": "Wo",
        "dateFormat": "d"
    },
   
    "en-GB": {
        "closeText": "Done",
        "prevText": "Prev",
        "nextText": "Next",
        "currentText": "Today",
        "weekHeader": "Wk",
        "dateFormat": "d"
    },
   
    "fr": {
        "closeText": "Fermer",
        "prevText": "&#x3c;Pr\u00e9c",
        "nextText": "Suiv&#x3e;",
        "currentText": "Courant",
        "weekHeader": "Sm",
        "dateFormat": "d"
    }
  
};
$.each( regions, function( name, value ) {
	var culture = Globalize.findClosestCulture( name );
	Globalize.addCultureInfo( culture && culture.name || name, {
		messages : {
			datepicker : value
		}
	});
});
