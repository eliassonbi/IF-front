/*!
* Progress plugin globalize v1.0
* ========================================================================
* language file for progress plugin
*
* Copyright � 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

	
	// define language options for collaborators tables
	var progressLang = {
			"en": {
					"step" : "stage",
					"youare" : "You are at stage %i% of %n%",
					"youareat": "The procedure is at stage \"%s%\""
			}
		};

$.each( progressLang, function( name, value ) {
	var culture = Globalize.findClosestCulture( name );
	Globalize.addCultureInfo( culture && culture.name || name, {
		messages : {
			progressLang : value
		}
	});
});
