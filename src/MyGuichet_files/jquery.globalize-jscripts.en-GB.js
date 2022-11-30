/*!
* Datatables globalize v1.0
* ========================================================================
* language file for datatables
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
	// define language options for miscellaneous page scripts
	var miscriptsTx = {
			"en": {
					"element" : "element requires your attention",
					"elements": "elements require your attention",           
					"elementReceived": "You have received",
					"message": "new message concerning your procedure",
					"messages": "new messages concerning your procedure",
					"actions" : "actions",
					"wait" : "Please wait...",
					"lastMod":"last modification",
					"movedown":"Go down a level",
					"moveup":"Go up a level",
					"edit":"Edit",
					"editField":"Edit this field",
					"close":"Close",
					"closethis":"Close message",
					"deletebtn":"Delete",
					"uploading":"Upload",
					"newdoc": "new document", 
					"newdocs":"new documents", 
					"newdocdropped":"has been filed by",
					"newdocdroppedplur": "have been filed by",
					"ieFileuploadLabel":"Use the following field to send a file",
					"listlimBtnLabel":"See more",
					"listlimBtnTitle":"Show more information",
					"docdeploybtn":"See details",
					"docfoldbtn":"Hide details",
					"dragdropFileTitle":"Drop files here",
					"dragdropFileDesc":"or click to browse",
					"singleFileBtn":"Browse",
					"singleFileDesc":"No file is selected",
					"exportCSV":"export CSV"
			}
		};
	

$.each( miscriptsTx, function( name, value ) {
	var culture = Globalize.findClosestCulture( name );
	Globalize.addCultureInfo( culture && culture.name || name, {
		messages : {
			miscripts : value
		}
	});
});

