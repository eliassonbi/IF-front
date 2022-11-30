/*!
* dialog functions v1.0
* ========================================================================
*  init functions for dialog 
*  - datatables
*  - customInput
*  - tabs
*  - fileuplopad
*
* Copyright © 2011 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/

// config of datatables inside of modals


// config of fileupload inside of modals

function displayValidate(){
	// determine if display of bottom buttons is needed
	// ...and apply/refresh 'sortable'
	var shouldDisp = true;
	var compte = parseInt($('.modal .file-row').length);
	if(compte<1){
		shouldDisp = false;
	}
	if($('.modal .fileup-validate').css('display') == 'none' && shouldDisp == true){
		$('.modal .fileup-validate').fadeIn(500);
	}else{
		$('.modal .fileup-validate').fadeOut(500);
	}
		
	// -- - Handlers for Move Up/Move Down btns -- -
	$('.modal .file-movecontainer a').unbind().bind('click',function(ev){
		ev.preventDefault();
		var li = $(ev.target).parents('li');
		if ($(ev.target).hasClass('file-moveup')) { li.prev().before(li); }
		else if ($(ev.target).hasClass('file-movedown')) { li.next().after(li); }
		$(this).blur();
		$(ev.target).focus();
	});
}

function initModalUpload() {
	'use strict';
		
	//add droppable effect on container
    $('.modal #fileupload .fileinput-button input:file').focusin(function(event){
    	$(event.target).closest('.droppable').addClass("ui-state-acceptable");
    })
    .focusout(function(event){
    	$(event.target).closest('.droppable').removeClass("ui-state-acceptable");
    });
	
	$('<ul class="fileupload-files"/>').insertBefore('.modal .fileupload-buttonbar');
	
	
	$(document).bind('drop dragover', function (e) {
		e.preventDefault();
	});
	/**/

	$(document).bind('dragover', function (e) {
		var dropZone = $('.fileup-validate'),
			timeout = window.dropZoneTimeout;
		if (!timeout) {
			dropZone.addClass('in');
		} else {
			clearTimeout(timeout);
		}
		if (e.target === dropZone[0]) {
			dropZone.addClass('hover');
		} else {
			dropZone.removeClass('hover');
		}
		window.dropZoneTimeout = setTimeout(function () {
			window.dropZoneTimeout = null;
			dropZone.removeClass('in hover');
		}, 100);
	});
	
    // Initialize the jQuery File Upload widget:
	$('.modal #fileupload').fileupload({
		dataType: 'json',
		
		
		// Callback for uploads start, equivalent to the global ajaxStart event:
		start: function (e) {
			$('<li class="file-row temp-row"/>').html(scriptsLg.uploading+': <span class="file-status"></span><div class="progress-bar"><span class="bar"></span><span class="digits"></span></div><span class="file-movecontainer"><a class="file-movedown-deact" href="#" title="'+scriptsLg.movedown+'">'+scriptsLg.movedown+'</a><a class="file-moveup-deact" href="#" title="'+scriptsLg.moveup+'">'+scriptsLg.moveup+'</a></span><span class="delete-deact"><a data-type="DELETE" class="btn" title="'+scriptsLg.deletebtn+'"><span class="icon-trash"></span><span>'+scriptsLg.deletebtn+'</span></a></span>').appendTo('.modal .fileupload-files');
			
			
		},
		// Callback for uploads stop, equivalent to the global ajaxStop event:
		stop: function (e) {
			$(this).find('.digits').html('100%');
			$(this).find('.bar').css('width', '100%');
			$('.modal .file-row.temp-row').fadeOut().remove();
			},
		
		
		// Callback for global upload progress events:
		progressall: function (e, data) {				
			$('.modal .file-row.temp-row .digits').html(parseInt(data.loaded / data.total * 100, 10) + '%');
			$('.modal .file-row.temp-row .bar').css("width",parseInt(data.loaded / data.total * 100, 10) + '%');
			$('.modal .file-row.temp-row .file-status').text(parseInt(data.loaded / data.total * 100, 10) + '%');
		},
		
		
		done: function (e, data) {
			$.each(data.result, function (index, file) {
				var doclastModTitle = scriptsLg.lastMod+': ';
				var doclastMod = file.moddate;
				var spl =file.name.split('.');
				var c = spl.length;
				var filetype = spl[c-1];
				//CTIE EXEMPLE : adapter l'URL de supression de fichier
				var delURL = '/guichet-v3/server/php/?file='+file.name+'&_method=DELETE';
				
				$('<li class="file-row file-type-'+filetype+'"/>').text(file.name).wrapInner('<div class="file" />').append('<span class="file-data">'+Math.floor((parseInt(file.size)/1000))+' Ko, '+doclastModTitle+doclastMod+'</span><div class="progress-bar bar-full"><span class="bar-f"></span><span class="digits">100%</span></div><span class="file-movecontainer"><a class="file-movedown" href="#" title="'+scriptsLg.movedown+'">'+scriptsLg.movedown+'</a><a class="file-moveup" href="#" title="'+scriptsLg.moveup+'">'+scriptsLg.moveup+'</a></span><span class="delete"><a href="'+delURL+'" data-type="DELETE" class="btn" title="'+scriptsLg.deletebtn+'"><span class="icon-trash"></span><span>'+scriptsLg.deletebtn+'</span></a></span>').appendTo('.modal .fileupload-files');
			});
			
		displayValidate();
			
		}
	});
	

			// "handling" of deactivated buttons
	$('.modal .file-moveup-deact, .modal .file-movedown-deact, .modal .delete-deact .btn').live('click',function(ev){
		ev.preventDefault();
	});
	

	// Load existing files:
	$('.modal #fileupload').each(function () {
		var that = this;
		$.getJSON(this.action, function (result) {
			if (result && result.length) {
				$(that).fileupload('option', 'done')
					.call(that, null, {result: result});
					displayValidate();
	$('.modal .fileupload-files').sortable({
		 //forcePlaceholderSize:true,
		 helper: function(event, el) {
				var myclone = el.clone();
				myclone.addClass('js-modale-sortable-helper');
				$("body").append(myclone);
				return myclone;
			},
		 zIndex: 10000
       });    

			}
		});
	});

	$('.modal .file-row .delete .btn').live('click', function (ev) {
		if($(ev.target).parents('li').next().length!=0){
			$(ev.target).parents('li').next().find('.delete .btn').focus();
		}else if($(ev.target).parents('li').prev().length!=0){
			$(ev.target).parents('li').prev().find('.delete .btn').focus();
		}else{
			$('.modal .fileinput-button input').focus();
		}
		var row = $(this).parent().parent();
		$.post($(this).attr('href'), function (data) {
			row.slideUp(1000, function () {
			  $(this).remove();
			});
			displayValidate();
		});
		return false;
	});

}