/*!
* Jquery UI globalize v1.0
* ========================================================================
* language file for jquery UI 
*
* Copyright © 2012 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
	// define language options for miscellaneous jquery UI related scripts
	var jqueryUiTx = {
			"fr": {
					// combobox
					"didntmatch" : " n'a pas été trouvé dans la liste",
					"showall": "Afficher tous les éléments",           
					// autocomplete
					"nooptions" : "Aucune option d'autocomplete",
					"oneoption" : "1 option d'autocomplete",
					"options"	: "%i% options"
					
			},
			"en": {
					// combobox
					"didntmatch" : " was not found in the list",
					"showall": "Show all elements",           
					// autocomplete
					"nooptions" : "No autocomplete option",
					"oneoption" : "1 autocomplete option",
					"options"	: "%i% options"
					
			},
			"de": {
					// combobox
					"didntmatch" : " konnte in der Liste nicht gefunden werden",
					"showall": "Alle Elemente anzeigen",           
					// autocomplete
					"nooptions" : "Keine Autocomplete-Optionen",
					"oneoption" : "1 Autocomplet-Option",
					"options"	: "%i% Optionen"
					
			}
		};
	

$.each( jqueryUiTx, function( name, value ) {
	var culture = Globalize.findClosestCulture( name );
	Globalize.addCultureInfo( culture && culture.name || name, {
		messages : {
			globJqueryUi : value
		}
	});
});

