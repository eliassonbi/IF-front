/*!
* Datatables Filter Menu Initialization v1.0
* ========================================================================
* Init filter menu
*
* Author: @wildmotion
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
$(document).ready(function() {
	
	$("#doc-filter-menubar").menubar({
		menuIcon : true,
		position: {
			my: "left top",
			at: "left bottom",
			offset: "0px -1px"
		},
		// ajax de reload du tableau à prévoir ici
		select : function(event, ui){
			//CTIE EXEMPLE :
			alert( "a faire : ajax de rechargement du tableau après requète serveur" );
			event.preventDefault();
		}
	}); 
	$('.filter-menubar .ui-menubar-link.ui-button-text-only').bind( "click.menubar", function( event ) {
			//CTIE EXEMPLE :
			alert( "a faire : ajax de rechargement du tableau après requète serveur" );
	}); 

} );