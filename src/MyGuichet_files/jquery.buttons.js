/*!
* Action buttons v1.0
* ========================================================================
* script used to fade out sibling buttons on roll over and focus actions
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
 
   
$(document).ready(function() {
	
	$(".btn-exclusive").focus(function(){
		// init the state for focus/hover combination
		$(this).removeClass('btn-is-inactive').addClass('has-focus');
		// if the button is not inactive and is not the current one
		$('.btn-exclusive:not(.btn-is-inactive)').not(this).addClass('btn-is-inactive');
	})
	.blur(function(){
		$('.btn-exclusive').removeClass('btn-is-inactive');
		// remove focus state
		$(this).removeClass('has-focus');
	}).hover(
	  function () {
		// init the state for focus/hover combination
		$(this).removeClass('btn-is-inactive');
		// if the button is not inactive and is not the current one
		$('.btn-exclusive:not(.btn-is-inactive)').not(this).addClass('btn-is-inactive');
	  }, 
	  function () {
		$('.btn-exclusive').removeClass('btn-is-inactive');
		// return buttons to initial focus state if focused element is present
		if ($('.btn-exclusive.has-focus')[0]) $('.btn-exclusive:not(.has-focus)').addClass('btn-is-inactive');
	  }
	);
	
});
