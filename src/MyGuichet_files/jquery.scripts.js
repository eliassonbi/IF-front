/*!
* General javascript file v1.0
* ========================================================================
* script collection used on every page
*  - fonction d'ajustement de la hauteur minimale de la page
*  - fonction d'alertes
*  - fonction de notifications (puces dans menu etc...)
*  - ajout des boutons pulldown dans la navigation principale
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
 
 
/* CTIE EXEMPLE : comment initialiser le choix de langue suivant la langue du site ??? 
Globalize.culture( "fr-LU" );
*/
var scriptsLg = Globalize.localize( "miscripts" );
 
/* GLobal focusin handler that assigns focus classnames */
$(document).focusin(function(event){
	$(event.target).addClass("has-focus");
})
.focusout(function(event){
	$(event.target).removeClass("has-focus");
});

 
function createAlert(content, icon){
	
	target = $('.main-content');
	var new_msg = $('<div class="alrt alrt-'+icon+'"><a class="alrt-close" href="#" role="button" title="'+scriptsLg.closethis+'">'+scriptsLg.close+'</a><div class="text" role="alrt">'+content+'</div></div>');
	new_msg.prependTo(target).hide().show("blind",{direction:"vertical"},500);

	new_msg.find('.alert-close').bind('click',function(){
		$(this).parent().parent().hide("blind",{direction:"vertical"},200,function(){
			$(this).remove();
		});
	});
}

function createNotifs(target,numb){
	var nb = parseInt(numb);
	var globStr;
	if(nb>1){
		globStr=scriptsLg.elements;
	}else{
		globStr=scriptsLg.element;
	}
	if(!isNaN(nb)&&nb!=0){
		var title='';
		if(target.find('.notif').length!=0){
			target.find('.notif').hide(0,function(){
				target.find('.notif').remove();
				title=target.text() + ' : ' + nb + ' ' + globStr;
			});
		}else{
			title=target.text() + ' : ' + nb + ' ' + globStr;
		}
		target.parent().addClass('is-notified');
		
		var new_noti = $('<span class="notif"><span>'+nb+'</span></span>');
		new_noti.appendTo(target).show('blind',{direction:"vertical"},500);
		target.attr('title',title);
	}else if(nb==0){
		target.parent().removeClass('is-notified');
		target.removeAttr('title');
		target.find('.notif').remove();
	}
}

function createNotifsWithTitle(target,numb){
	var nb = parseInt(numb);
	var globStrBefore = scriptsLg.elementReceived;
	var globStrAfter;
	if(nb>1){
		globStrAfter=scriptsLg.messages;
	}else{
		globStrAfter=scriptsLg.message;
	}
	if(!isNaN(nb)&&nb!=0){
		if(target.find('.notif').length!=0){
			target.find('.notif').hide(0,function(){
				target.find('.notif').remove();
				title = globStrBefore + ' ' + nb + ' ' + globStrAfter;
			});
		}else{
			title = globStrBefore + ' ' + nb + ' ' + globStrAfter;
		}
		target.parent().addClass('is-notified');
		
		var new_noti = $('<span class="notif"><span>'+nb+'</span></span>');
		new_noti.appendTo(target).show('blind',{direction:"vertical"},500);
		target.attr('title',title);
	}else if(nb==0){
		target.parent().removeClass('is-notified');
		target.removeAttr('title');
		target.find('.notif').remove();
	}
}

function listLimiter(el,limit,step){
	// number of li
	var c=el.children('li');
	// number of hidden li
	var ch=el.children('li.ll-hidden');
	// number of visible li
	var cv=el.children('li:not(.ll-hidden)');
	// display btn
	var btn = false;
	var btnTitle=scriptsLg.listlimBtnTitle;
	var btnLabel=scriptsLg.listlimBtnLabel;
	if(c.length>limit){
		// if none hidden
		if(el.children('li.ll-hidden').length==0){
			el.children('li:eq('+step+')').prev().nextAll().addClass('ll-hidden');
			btn=true;
		}
		// add button
		if(btn&&el.next('.fs-more').length==0){
			el.after('<a class="fs-more" href="#" title="'+btnTitle+'">'+btnLabel+' ...</a>');
		}
		// bind click
		el.next('.fs-more').bind('click',function(ev){
			ev.preventDefault();
			// case number of hidden items lte 'step'
			if(el.children('li.ll-hidden').length<=step){
				el.children('li.ll-hidden').removeClass('ll-hidden').parent().next('.fs-more').unbind().remove();
			}else{
				el.children('li.ll-hidden:lt('+step+')').removeClass('ll-hidden');
			}
		});
	}
}

/* waiter that can be used multiple times 
how to use :
	$(window).resize(function () {
			waitForFinalEvent(function(){
				alert('Resize...');
				//...
			}, 500, "some unique ID"); //supply a unique id for each callback to keep all the timeout events separate
	});
*/
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$(document).ready(function() {
	$('.has-pulldown-btn').append('<span class="pulldown-btn"><span></span></span>');
	$('.list-limiter').each(function(){
		listLimiter($(this),5,5);
	});
	// prevent h1 from going under secondary-nav
	if($('#secondary-nav').length>0){
		var snlength = parseInt($('#secondary-nav').css('width'));
		var hlength = parseInt($('#secondary-nav').prev('h1').children(':first').css('width'));
		var allength = parseInt($('#secondary-nav').parent().css('width'));
		var whitespace = 50;
		if((snlength+hlength+whitespace)>allength){
			target = allength-(snlength+whitespace);
			$('#secondary-nav').prev('h1').children(':first').css('width',target);
		}
	}
});
