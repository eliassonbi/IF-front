/*
 * Globalize Culture en-GB
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {

var Globalize;

if ( typeof require !== "undefined" &&
	typeof exports !== "undefined" &&
	typeof module !== "undefined" ) {
	// Assume CommonJS
	Globalize = require( "globalize" );
} else {
	// Global variable
	Globalize = window.Globalize;
}

Globalize.addCultureInfo( "en", "default", {
	name: "en",
	englishName: "English (Great Britain)",
	nativeName: "Anglais (Grande Bretagne)",
	language: "en",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non-digital",
		negativeInfinity: "-Unlimited",
		positiveInfinity: "+Unlimited",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			/* "/": ".", */
			firstDay: 1,
			days: {
				names: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
				namesAbbr: ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."],
				namesShort: ["Su","Mo","Tu","We","Th","Fr","Sa"]
			},
			months: {
				names: ["January","February","March","April","May","June","July","August","September","October","November","December",""],
				namesAbbr: ["Jan.","Feb.","March","April","May","June","July","Aug.","Sep.","Oct.","Nov.","Dec.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

}( this ));

Globalize.culture( "en" );
