/*!
* Guichet datatables shoMore plugin v1.0
* ========================================================================
* showMore plugins for datatables
*
* Copyright © 2012 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

$.fn.dataTableExt.oPagination.iDisplayLength = 5;

$.fn.dataTableExt.oPagination.showmore = {
	"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	{
		// Store the next and previous elements in the oSettings object as they can be very
		 // useful for automation - particularly testing
		 
		var nMore = document.createElement( 'button' );
		 
		if ( oSettings.sTableId !== '' )
		{
			nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
			nMore.setAttribute( 'id', oSettings.sTableId+'_more' );
		}
		 
		nMore.className = "paginate_disabled_more";
		 
		nMore.title = oSettings.oLanguage.oPaginate.sMore;
		nMore.innerText = nMore.textContent = oSettings.oLanguage.oPaginate.sMore;
		 
		//nPaging.appendChild( nPrevious );
		if(parseInt(oSettings._iDisplayLength)< parseInt(oSettings.aoData.length)){
			nPaging.appendChild( nMore );
		} else {
			nPaging.style.display = 'none';
		}
				  
		$(nMore).click( function(event) {
			 
			oSettings.iPagingLoopStart = oSettings._iDisplayStart;
			
			oSettings._iDisplayLength = oSettings._iDisplayLength+$.fn.dataTableExt.oPagination.iDisplayLength;
			fnCallbackDraw( oSettings );
			event.preventDefault();
		} );
		 
		// Take the brutal approach to cancelling text selection
		$(nMore).bind( 'selectstart', function () { return false; } );
	},
	 
	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
		if ( !oSettings.aanFeatures.p )
		{
			return;
		}
		var an = oSettings.aanFeatures.p;
		if ( oSettings.fnDisplayEnd() < oSettings.fnRecordsDisplay() )
		{
			$(an).find('#'+oSettings.sTableId+'_more').removeClass("paginate_disabled_more");
			$(an).find('#'+oSettings.sTableId+'_more').addClass("paginate_enabled_more");
			return;
		}
		if ( oSettings.fnDisplayEnd() >= oSettings.fnRecordsDisplay() )
		{
			$(an).find('#'+oSettings.sTableId+'_more').addClass("paginate_disabled_more");
			$(an).find('#'+oSettings.sTableId+'_more').removeClass("paginate_enabled_more");
			return;
		}
		 
	}
}