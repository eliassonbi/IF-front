/*!
* notification initialization v1.0
* ========================================================================
*
* Copyright © 2014 Etat du Grand-Duché de Luxembourg. Tous droits réservés.
*/
function notify(config) {
    var to = null;
    var defaults = {
        target: $("body"),										// jquery element over which the notification will be displayed
        type: "info",													// error, info, success, warning
        width: 400,														// px: 200 ; % : "20%" ; "auto"
        height: "auto",												// px: 20 ; % : "20%" ; "auto"
        position: "center",										// left, right, center (default) on target element
        autohide: 1,													// 0 to disable autohide
        msg: "This is my default message",		// string or html
        opacity: 1,														// ex: 0.5
        fade: 0,															// fade instead of slide out
        timeout: 10000
    };
    $.extend(defaults, config);
    
    position = defaults.position;
		targetPosition = defaults.target.offset();
		targetPosition['right'] = $(window).width() - (targetPosition.left + defaults.target.innerWidth());

		defaults.width = defaults.width;
    if (defaults.width === "all") {
        defaults.width = screen.width - 60;
    }

		height = defaults.height;

    var div = "<div id='ui-notify' class='alrt'><div role='alert' class='text'>" + defaults.msg + "</div></div>";
    $("#ui-notify").remove();
    clearInterval(to);
    $("body").append(div);
		$('#ui-notify a').click(function(evt) {
        evt.stopPropagation();
    });
		$("#ui-notify").css("height", height);
		$("#ui-notify .text").css({height: height, "overflow-y":"auto"});
    $("#ui-notify").css("width", defaults.width);
		
    innerheight = $("#ui-notify").innerHeight();
    innerwidth = $("#ui-notify").innerWidth();

    $("#ui-notify").css("opacity", defaults.opacity);

    switch (defaults.type) {
        case "error":
            $("#ui-notify").addClass("alrt-error");
            break;
        case "success":
            $("#ui-notify").addClass("alrt-success");
            break;
        case "warning":
            $("#ui-notify").addClass("alrt-warning");
            break;
        default:
            $("#ui-notify").addClass("alrt-info");
            break;
    }
    
    switch (defaults.position) {
        case "left":
            $("#ui-notify").animate({top: 10+targetPosition.top});
            $("#ui-notify").css("left", parseInt(0 - (innerheight + 10)));
            $("#ui-notify").css("left", parseInt(0 - (innerwidth * 2)));
            $("#ui-notify").animate({left: 10+targetPosition.left});
            break;
        case "right":
						$('body').addClass('ui-notify-no-overflow');
            $("#ui-notify").animate({top: 10+targetPosition.top});
            $("#ui-notify").css("right", parseInt(0 - (innerwidth + 10)));
            $("#ui-notify").css("right", parseInt(0 - (innerwidth * 2)));
            $("#ui-notify").animate({right: 10+targetPosition.right}, 100, function() {
																				$('body').removeClass('ui-notify-no-overflow');
																		});
            break;
        default:
            var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2 ;
            $("#ui-notify").css("top", parseInt(0 - (innerheight + 10)));
            $("#ui-notify").css("left", mid - parseInt(innerwidth / 2));
            $("#ui-notify").animate({top: 10+targetPosition.top});
            break;
    }
    
    $("#ui-notify").click(function() {
        notifit_dismiss(to, defaults);
    });

    if (defaults.autohide) {
            if (!isNaN(defaults.timeout)) { // Take the timeout if is a number
                to = setTimeout(function() {
                    $("#ui-notify").click();
                }, defaults.timeout);
            }
        
    }
}

function notifit_dismiss(to, config) {
    clearInterval(to);
		
    innerheight = $("#ui-notify").innerHeight();
    innerwidth = $("#ui-notify").innerWidth();
		currentposition = $("#ui-notify").position();

    if (!config.fade) {
        switch(config.position){
            case "right":
								$('body').addClass('ui-notify-no-overflow');
                $("#ui-notify").animate({
                    right: parseFloat(innerwidth - (innerwidth * 0.9))
                }, 100, function() {
                    $("#ui-notify").animate({
                        right: parseInt(0 - (innerwidth * 2))
                    }, 100, function() {
												$('body').removeClass('ui-notify-no-overflow');
                        $("#ui-notify").remove();
                    });
                });
            break;
            case "left":
                $("#ui-notify").animate({
                    left: parseFloat(innerwidth - (innerwidth * 0.9))
                }, 100, function() {
                    $("#ui-notify").animate({
                        left: parseInt(0 - (innerwidth * 2))
                    }, 100, function() {
                        $("#ui-notify").remove();
                    });
                });
            break;
            default:
                $("#ui-notify").animate({
                    top: parseInt(currentposition.top + (innerheight / 2))
                }, 100, function() {
                    $("#ui-notify").animate({
                        top: parseInt(0 - (innerheight * 2))
                    }, 100, function() {
                        $("#ui-notify").remove();
                    });
                });
            break;
        }
    } else {
        $("#ui-notify").fadeOut("slow", function() {
            $("#ui-notify").remove();
        });
    }
}