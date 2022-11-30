/*!
* Initialization of Progress Plugin v1.0
* ========================================================================
* init the Progress bar plugin
*
* Depends:
*  jquery.progress.js
*  globalize.js
*  jquery.progress.globalize.js
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/


$(document).ready(function() {
	
 	// define language options in jquery.progress.globalize.js
	var progressLang = Globalize.localize( "progressLang" );
		
 	// special for the extrasteps and js only
	$('.progress .ps-extra-step .ps-time').before('<br />');
	
 	// init the progressbars
	$('.progress').progress({ lang: progressLang });
	
});
