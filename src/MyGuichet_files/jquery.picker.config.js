/*
 * Initialization of datepicker
 */
		$( function() {			
			$( "input.datepicker" ).datepicker();
			/* close all except current datepicker*/
			 $( "input.datepicker" ).on("focus", function(e) { $( "input.datepicker" ).not(this).datepicker("close"); });
		});
