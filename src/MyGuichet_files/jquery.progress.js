/*!
* jQuery Progress Plugin v1.0
* ========================================================================
* Progress bar plugin
*
* Depends:
*    jquery-1.7.1.min.js
*    jquery.pxem.js
*    jquery.ui.popup.js
*	 jquery.ui.core.js
*	 jquery.ui.widget.js
*	 jquery.ui.position.js
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
 
$.fn.progress = function(settings){
	settings = jQuery.extend({
		scope: $(this).find('li'),
		progressUI: 'js-ps',
		icon: 'ps-icon',
		label: 'ps-label',
		mainStep: 'js-ps-main',
		step: 'ps-step',
		curentStep: 'ps-is-curent',
		doneStep: 'js-ps-is-done',
		interStep: 'ps-inter-step',
		extraStep: 'ps-extra-step',
		firstEl: 'ps-step-start',
		lastEl: 'ps-step-end',
		progressBar: 'js-ps-bar',
		progressBarProgress: 'js-ps-bar-progress',
		progressBarDesc: 'js-ps-bar-desc',
		popup: 'ui-popup',
		popupDelay:4000,
		popupPosition: {
			my: "center bottom",
			at: "center bottom",
			offset: "0 16px"
		},
		lang: {
			"step" : "étape",
			"youare" : "Vous êtes à l'étape %i% de %N%",
			"youareat": "La démarche est à l'étape \"%s%\""
		}
		}, settings);
	  
		
		// close popup function
		function _closePopups(popup_active) {
			// if no popup is active it will hide all the visible popups
			setTimeout(function() { if (popup_active === false) $('.'+settings.extraStep+' .'+settings.popup+':visible').popup('close');}, settings.popupDelay);
		}

	$(this).each(function(index) {
		
		/* set default values to vars */
		var $that = $(this);
		
		// add pseudo-progressbar
		$that.prepend('<div class="'+settings.progressBar+'"><div class="'+settings.progressBarProgress+'"></div></div>');
		
			// add special classes for the first and last elements
			$that.addClass(settings.progressUI);
			$that.find('.'+settings.step).first().addClass(settings.firstEl);
			$that.find('.'+settings.step).last().addClass(settings.lastEl);
			$that.find('.'+settings.curentStep).prevAll().addClass(settings.doneStep);
	
		var $liSteps = $that.find('li');
		var liCount = $liSteps.length;
		var liDiv = liCount-1;
		
		var $progress = $that.find('.'+settings.progressBar);
		var progressWidth = $progress.outerWidth();
		
		var stepsCount = $that.find('.'+settings.step).length;
		var stepsDiv = stepsCount-1;
		var stepsSize = 100/stepsDiv; 
	
		var stepArray = new Array();
	
		var $curentStep = $that.find('.'+settings.curentStep)
		var curentIndex = $liSteps.index($curentStep)+1;
		/**/
			// Add ARIA
			$progress.attr('role', 'progressbar');
			$progress.attr('aria-valuemin', '0');
			$progress.attr('aria-valuemax', parseFloat(liCount) || 1);
			
			if($curentStep.length>0) {
				$progress.attr('aria-valuenow', parseFloat(curentIndex) || 0);
				$progress.attr('aria-valuetext', settings.lang.youareat.replace('%s%', $curentStep.text().trim()));
			}
			
		var curentText = settings.lang.youareat.replace('%s%', $curentStep.text().trim());
		$progress.append('<div class="'+settings.progressBarDesc+'">'+curentText+'</div>');
	
		
		$that.find(settings.scope).each(function(index) {
	
		  var $icon = $(this).find('.'+settings.icon);
		  var iconWidth = $icon.outerWidth();
		  
		  var $label = $(this).find('.'+settings.label);
		  var labelWidth = $label.outerWidth()*1.1;
		  var labelLeft = -1*((labelWidth-iconWidth)/2);
		  var labelRight = 'auto';
		  var labelHeight = -1*$label.outerHeight();
		  var labelPos = 'top';
		  
		  var marginLeft = iconWidth/2;
			  marginLeft = -1*marginLeft;
		  
		  /* vars to em */
		  labelWidth = $(labelWidth).toEm({'scope': $label});
		  labelHeight = $(labelHeight).toEm({'scope': $label});
		  labelLeft = $(labelLeft).toEm({'scope': $label});
		  
		  // create the object literal
		  var positionArgs = {};
			  positionArgs[labelPos] = labelHeight; 
		  
		  /* position for .step elements */
		  if ($(this).is('.'+settings.step+', .'+settings.interStep)) {
			  /* position of step relative to its index */
			  var stepIndex = $(this).parent().find('.'+settings.step).index($(this));
			  var stepLeft = stepsSize*stepIndex;
				  stepLeft = stepLeft+'%';
			  $(this).addClass(settings.mainStep);
		
			  /* init stepArray with curent starting step */
			  stepArray[index] = 0;
		  }
		  
		  /* special label positions for start and end steps */
		  if ($(this).hasClass(settings.firstEl)) {
			labelLeft = 0;
		  }
		  if ($(this).hasClass(settings.lastEl)) {
			labelRight = 0;
			labelLeft = 'auto';
			/* reset to max : stepSize*index exeeds 100% */
			stepLeft = '100%'; 
		  }
		  
		  /* fix width for the lables */
		  $label.width(labelWidth);
	
		  /* fix width for the element */
		  $(this).width($icon.width());
	
		  /* position for .inter-step elements */
		  if ($(this).hasClass(settings.interStep)) {
			  /* find closest prev .step */
			  $closestPrevStep = $(this).prevAll("li."+settings.step+":first");
			  $closestNextStep = $(this).nextAll("li."+settings.step+":first");
			  stepLeft = (stepsSize*$(this).parent().find('.'+settings.step).index($closestPrevStep))+(stepsSize/2);
			  stepLeft = stepLeft+'%';
			  // reset label positioning
			  positionArgs[labelPos] = '';
			  labelPos = 'bottom';
			  positionArgs[labelPos] = labelHeight; 
		  }
		  
		  /* position for .extra-step elements */
		  if ($(this).hasClass(settings.extraStep)) {
			  // reset label positioning to bottom and not top
			  positionArgs[labelPos] = '';
			  labelPos = 'top';
			  positionArgs[labelPos] = labelHeight;  //reset by popup plugin
	
			  // init stepArray with curent starting step
			  stepArray[index] = -1;
			  
			  // find closest prev .step
			  $closestPrevStep = $(this).prevAll("li."+settings.mainStep+":first");
			  // cout nbr of extrasteps in the parent step
			  stepArray[$closestPrevStep.index()]++;
			  
		  }
	
		  /* position the elements */
		  $(this).css({'position':'absolute','margin-left':marginLeft,'top':'0','left':stepLeft});
		  
		  /* position the lables */
		  $label.css({'display':'block','position':'absolute','left':labelLeft,'right':labelRight}).css(positionArgs);
		  /* set progressbar width to curent position */
		  if ($(this).hasClass(settings.curentStep)) {
			  $progress.children(":first").width(stepLeft);
		  }
		  
		});
		/*	*/
		$.each(stepArray, function(key, value) { 
		  //alert(key + ': ' + value); 
		  var i = 1;
			if (value>0) {
			  var startPosition = $that.find('li').eq(key).position();
			  var startPositionLeft = ((startPosition.left/progressWidth)*100);
			  var endPosition = $that.find('li').eq(key).nextAll("li."+settings.mainStep+":first").position();
			  var endPositionLeft = ((endPosition.left / progressWidth)*100);
			  var segmentWidth = endPositionLeft - startPositionLeft;
			  var subSegmentWidth = segmentWidth / (value+1);
			  var stepLeft=startPositionLeft+subSegmentWidth;
	
		  //alert(endPositionLeft + ' - ' + startPositionLeft + ' = ' + segmentWidth + ' + ' + subSegmentWidth); 
		
				while(i<=value) {
				  // position the elements
				  $that.find('li').eq(key+i).css({'left':stepLeft+'%'});
				  stepLeft+=subSegmentWidth;
				  i++
				}
			}
		});
		
		/* 
		 * init popup on mouseover for extra-steps
		 */
		var popup_active = false; // for popup visible test
		$(this).find('.'+settings.extraStep+' .'+settings.label).popup({
			position: settings.popupPosition,
			open: function() {
					// clear all pulldowns except this one
					var pulldowns = $('.'+settings.extraStep+' .'+settings.popup);
					var $that = $(this);
					var pos = pulldowns.index($that);
					pulldowns.each(function(index) {
						if (index!=pos) {
							$(this).popup('close');
						}
					});
				}
		});
		// show popup on mouseOver for extra elements
		$(this).find('.'+settings.extraStep).mouseover(function() {
			if ($(this).find('.'+settings.popup+':visible').length==0){
				$(this).find('.'+settings.popup).popup('open');
				popup_active = true;
			}
		});
		
		// popup should stay opened if hovered
		$(this).find('.'+settings.popup).mouseover(function() {
			popup_active = true;
		}).mouseout(function(){
			popup_active = false;
			_closePopups(popup_active);
		});
	});
};