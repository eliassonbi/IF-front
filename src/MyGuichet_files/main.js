/*!
* Fileupload v1.0
* ========================================================================
* Initialize the jQuery File Upload
*
* Copyright � 2011 Etat du Grand-Duch� de Luxembourg. Tous droits r�serv�s.
*/

$(function () {
    'use strict';
	
    var txt = Globalize.localize( "miscripts" );

	/* single file upload button  */
	singleFileBrowseBtn();
    
	// Test if file APIs are fully supported by the browser
	if (window.File || window.FileReader || window.FileList || window.Blob) {
		document.getElementsByTagName('html')[0].className+=' fullfileapi';
		window.fullfileapi = true;
	}

	//add the progressbar
	$('<!-- The global progress information -->\
			<div class="fileupload-progress">\
			<!-- The global progress bar -->\
			<div class="progress-bar"><span class="bar"></span><span class="digits"></span></div>\
			<!-- The extended global progress information -->\
			<div class="progress-extended">&nbsp;</div>\
		</div>').appendTo('.fileinput-button .cible');
			
	//add the container for uploaded files
	$('<ul class="fileupload-files"/>').insertAfter('.fileupload-buttonbar');		
	
	$(document).bind('drop dragover', function (e) {
		e.preventDefault();
	});
	
    // add focus effect when file is dragged over the button :
	$('.fileinput-button').bind('dragover', function (e) {
		var dropZone = $('.fileinput-button'),
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
	var jqXHR = null;
	$('#fileUpload').fileupload({
		dataType: 'json',
		// Callback for global upload progress events:
		progressall: function (e, data) {
			//console.log('progressall');
			var $this = $(this);
			$this.find('.fileupload-progress')
				.find('.digits').html(parseInt(data.loaded / data.total * 100, 10) + '%');
			$this.find('.fileupload-progress')
				.find('.bar').css(
					'width',
					parseInt(data.loaded / data.total * 100, 10) + '%'
				).end();
		},
		// Callback for uploads start, equivalent to the global ajaxStart event:
		start: function (e) {
			//console.log('start');
			$('#errorCode').val(1);
			$( '#fileUploadTicket' ).val('');
			$( '#fileUploadFileName' ).val('');
			$(this).find('.fileupload-progress').fadeIn();
		},
		// Callback for uploads stop, equivalent to the global ajaxStop event:
		stop: function (e) {
			//console.log('stop');
			$(this).find('.digits').html('100%');
			$(this).find('.bar').css('width', '100%');
			$(this).find('.fileupload-progress').fadeOut();
			if ($( '#errorCode' ).val() == 1) {
				showError($('#errorMessageDefault').val());
			}
		},
		add: function(e, data) {
			//console.log('add');
            // abort current upload if needed
            if( jqXHR ) {
                jqXHR.abort();
                jqXHR = null;
                $( '.file-row' ).remove();
            }

            // remove any file but the first
            data.files.splice( 1 );

            jqXHR = data.submit();
        },
		done: function (e, data) {
			//console.log('done');
			$(this).find('.digits').html('100%');
			$(this).find('.bar').css('width', '100%');
			$.each(data.result.fileDataJSON, function (index, file) {
				if ($('.file-row')){
					$('.file-row').remove();
				}
				//console.log(file);
				$('#errorCode').val(file.errorCode);
				if (file.errorCode != -1){
					$('<li class="file-row"/>').text(file.name).wrapInner('<div class="file" />').append('<span class="delete"><button data-type="DELETE" class="btn"><span>' + txt.deletebtn + '</span></button></span>').appendTo('.fileupload-files');
					$( '#fileUploadTicket' ).val( file.ticket );
					$( '#fileUploadFileName' ).val( file.name );
					$( '#errorMessage' ).val('');
					$( '#nextButton' ).removeAttr('disabled');
					hideError();
				}
				else {
					//console.log('customError');
					showError(file.errorMessage);
					$( '#errorMessage' ).val(file.errorMessage);
					$( '#nextButton' ).attr('disabled', 'disabled');
				}	
			});
		}
	});
	
    $('.enable-filesdragdrop').click(function(event){
		$('#fileUpload').fileupload({
			dropZone: $(document)
		});
    })
    $('.disable-filesdragdrop').click(function(event){
		$('#fileUpload').fileupload({
			dropZone: ""
		});
    })


	// add focus effect on button when file upload button is focused
    $('#fileUpload .fileinput-button input:file').focusin(function(event){
    	$(event.target).closest('.fileinput-button').addClass("in");
    })
    .focusout(function(event){
    	$(event.target).closest('.fileinput-button').removeClass("in");
    });


	// Change button text and load existing files :
	$('#fileUpload').each(function () {
		var that = this;
		if (window.fullfileapi) {
			$(this).find('.cible .title').text(txt.dragdropFileTitle);
			$(this).find('.cible .description').text(txt.dragdropFileDesc);
		}
		$.getJSON(this.action, function (result) {
			if (result && result.length) {
				$(that).fileupload('option', 'done')
					.call(that, null, {result: result});
			}
		});
	});

	$('.file-row .delete button').live('click', function () {
		var row = $(this).parent().parent();
		$( '#nextButton' ).attr('disabled', 'disabled');
		$( '#fileUploadTicket' ).val('');
		$( '#fileUploadFileName' ).val('');
		row.slideUp(1000, function () {
		  $(this).remove();
		});
		return false;
	});
	
	var fileUploadFileName = $( '#fileUploadFileName' ).val();
	if (fileUploadFileName != null && fileUploadFileName != ''){
		$('<li class="file-row"/>').text(fileUploadFileName).wrapInner('<div class="file" />').append('<span class="delete"><button data-type="DELETE" class="btn"><span>' + txt.deletebtn + '</span></button></span>').appendTo('.fileupload-files');
		$( '#nextButton' ).removeAttr('disabled');
	}

});

function showError(message){
	hideError();
	//console.log('showError ' + message);
	$('.main-wrap').prepend(
					'<div class="alrt alrt-error">'+
						'<a title="'+ $( '#errorMessageClose' ).val() +'" role="button" onclick="$(\'.alrt-error\').slideUp(150);" class="alrt-close">'+ $( '#errorMessageClose' ).val() +'</a>'+
						'<div role="alert" class="text">'+
							'<ul class="errorMessage">'+
								'<li>'+message+'</li>'+	
							'</ul>'+
						'</div>'+
					'</div>');
}

function hideError(){
	//console.log('hideError' );
	$('.alrt-error').remove();
}

function singleFileBrowseBtn(){
	if($("input:file").length!=0){

	   /* For all non multiple drag-n-drop file uploads
		replace the native file upload button with costom button */

	   $("input:file:not(#fileUpload input:file)").each(function(index) {
		var $fileinput=$(this);
		var $filelabel = $("label[for='"+$fileinput.attr('id')+"']");

		/* create custom button that triggers native upload event */
		var fileuploaddesc = "fileDesc"+index;
		var $custombutton=$('<button class="btn" aria-controls="'+fileuploaddesc+'">'+txt.singleFileBtn+'</button>').bind('click', function (e) {
			e.preventDefault();
			/* add focus first to prevent to trigger change event correctly in IE */
			$filelabel.focus().trigger('click');
		});
		/* IE does not allow js click for file upload so we need to work around this issue */
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			// Handle custom triggering of clicks for browse button in IE10
			$fileinput.attr('style','opacity: 0; position:absolute; width:7em; z-index:2000; height:2.3em');
			$fileinput.hover(function() {
			 $custombutton.toggleClass('has-focus');
			})
		} else {
			/* for other browsers we simply hide native upload button */
			$fileinput.addClass('hidden');
		}

		/* custom file name field */
		var $customtext=$('<span id="'+fileuploaddesc+'" class="text forcebreak" style="margin-left:1em;" role="status" aria-live="polite">'+($fileinput.val() != "" ? $fileinput.val() : txt.singleFileDesc)+'</span>');
		$fileinput.after($customtext).after($custombutton);
		/* enable break of filename > ie does not care for class only on inline element */
		$customtext.parent().addClass('forcebreak')
		/* Update file name field on change event */
		$fileinput.bind('change', function (e) {
			$customtext.text($(this).val().replace(/^.*(\/|\\)/, ""));
		});
   	   });
	}
}