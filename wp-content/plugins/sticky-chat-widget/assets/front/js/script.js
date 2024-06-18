(function($) {
    "use strict";
    var animationInterval = 0;
    var animationClass = "ginger-menu-fade";
    var isInMobile = false;
    var tempString = "";
    var displayStatus = false;
    var widgetStatus = false;
    var idleTimer = 0;
    var idleInterval;
    var intervalTime = 50;
    var isButtonClicked = 0;
    var isDesktop = true;
    var customCSS = "";
    var timezone = 0;
    var animationInterval;
    var customcss = "";
    var is_close_after_submit = 0;

    $(document).ready(function(){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            isDesktop = false;
            isInMobile = true;
        }

        if(typeof gsb_settings == "object") {
            if(gsb_settings.buttons.length) {
                $.each(gsb_settings.buttons, function (key, button){
                    var activeButtons = getActiveButtons(button);
                        var widgetSize = parseInt(button.settings.icon_size);

                    var buttonPosition = getButtonPosition(button);
                    if(activeButtons > 0) {
                        var view = "";
                        if(button.settings.view == "list_view" && activeButtons >= 1) {
                            view = "view-list";
                        }
                        if(button.settings.view == "grid_view" && activeButtons >= 1) {
                            view = "view-grid";
                        }
                        var buttonHtml = "<div class='gsb-buttons active has-shadow cta-"+button.settings.show_cta+" "+view+"' id='gsb-buttons-"+button.id+"' data-id='"+button.id+"' data-animation='"+button.settings.animation+"'>" +
                            "<div class='gsb-buttons-content'>" +
                            "<div class='gsb-button-list "+button.settings.view+"'></div>" +
                            "<div class='gsb-trigger'></div>" +
                            "</div>" +
                            "</div>";
                        $("body").append(buttonHtml);

                        var closeButtonHtml = "<div class='gsb-trigger-button'>" +
                            "<div class='gsb-trigger-top'>" +
                            "<a role='button' href='#' class='chat-button-link'>" +
                            "<span class='sr-only'>Contact Us</span>" +
                            ""+button.settings.icon_url+"" +
                            "</a> " +
                            "</div>" +
                            "<div class='gsb-trigger-bottom'>" +
                            "<a role='button' href='#' class='chat-button-link'>" +
                            "<span class='sr-only'>Close</span>" +
                            "<span class='chat-button-icon'>" +
                            "<svg xmlns='http://www.w3.org/2000/svg' fill='#ffffff' viewBox='0 0 30 30' width='90' height='90' ><path d='M7 4c-.256 0-.512.097-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293C7.512 4.097 7.256 4 7 4z'/></svg>" +
                            "</span>" +
                            "</a> " +
                            "</div>" +
                            "</div>";
                        $("#gsb-buttons-"+button.id+" .gsb-trigger").html(closeButtonHtml);
                        console.log(activeButtons);
                        if(activeButtons == 1 && button.settings.view == "icon_view") {
                            var channelSetting = "";
                            $.each(button.channels, function (key, channel) {
                                if (isChannelActive(channel)) {
                                    channelSetting = getChannelSetting(channel, button.id);
                                    if(channel.channel == "contact_form") {
                                        var contact_form = set_contact_form(channel,button.id,button);
                                        $("#gsb-buttons-"+button.id).append(contact_form);
                                    }
                                    if(channel.channel == "whatsapp" && channel.whatsapp_popup_setting.show_whatsapp_popup == "yes") {
                                        var whatsapp_popup = set_whatsapp_popup(channel, button.id,button);
                                        $("#gsb-buttons-"+button.id).append(whatsapp_popup);
                                    }
                                    if(channel.channel == "wechat" && channel.wechat_popup_setting.wechat_qr_img != "") {
                                        var wechat_popup = set_wechat_popup(channel, button.id,button);
                                        $("#gsb-buttons-"+button.id).append(wechat_popup);
                                        customCSS += "#gsb-buttons-" + button.id +" .wechat-popup .wechat-popup-header {background-color: "+ channel.wechat_popup_setting.wechat_qr_bg_color +"}";
                                    }
                                }
                            });
                            if(channelSetting != "") {
                                console.log($("#gsb-buttons-"+button.id+" .gsb-trigger .gsb-trigger-button").length);
                                $("#gsb-buttons-"+button.id+" .gsb-trigger .gsb-trigger-button").append(channelSetting);
                                $("#gsb-buttons-"+button.id+ " .gsb-trigger-top, #gsb-buttons-"+button.id+ " .gsb-trigger-bottom").remove();
                                $("#gsb-buttons-"+button.id).addClass("single");
                                $("#gsb-buttons-"+button.id+ " .chat-button .scb-tooltip").addClass("cooltipz--visible");
                                $("#gsb-buttons-"+button.id+ " .chat-button .scb-tooltip").attr("data-tooltip-dir", (buttonPosition=="right")?"left":"right");
                            }
                        } else {
                            $.each(button.channels, function (key, channel) {
                                if (isChannelActive(channel)) {
                                    var channelSetting = getChannelSetting(channel, button.id);
                                    $("#gsb-buttons-"+button.id+" .gsb-button-list").append(channelSetting);
                                    if(channel.channel == "contact_form") {
                                        var contact_form = set_contact_form(channel,button.id,button);
                                        $("#gsb-buttons-"+button.id).append(contact_form);
                                    }
                                    if(channel.channel == "whatsapp" && channel.whatsapp_popup_setting.show_whatsapp_popup == "yes") {
                                        var whatsapp_popup = set_whatsapp_popup(channel, button.id,button);
                                        $("#gsb-buttons-"+button.id).append(whatsapp_popup);
                                    }
                                    if(channel.channel == "wechat" && channel.wechat_popup_setting.wechat_qr_img != "") {
                                        var wechat_popup = set_wechat_popup(channel, button.id,button);
                                        $("#gsb-buttons-"+button.id).append(wechat_popup);
                                        customCSS += "#gsb-buttons-" + button.id +" .wechat-popup .wechat-popup-header {background-color: "+ channel.wechat_popup_setting.wechat_qr_bg_color +"}";
                                    }
                                }
                            });
                        }
                        if(button.settings.view == "list_view" && activeButtons >= 1) {
                            var wrap_list = "<div class='channel-list-container'>";
                            if(button.settings.list_view_subtitle != ""){
                                wrap_list += "<div class='grid-title-container'><div class='grid-title'>"+button.settings.list_view_subtitle+"</div></div>";
                            }
                            wrap_list += "<div class='channel-list'>";
                            wrap_list += $("#gsb-buttons-"+button.id+" .gsb-button-list.list_view").html();
                            wrap_list += "</div>";
                            wrap_list += "<div>";
                            $("#gsb-buttons-"+button.id+" .gsb-button-list.list_view").html(wrap_list);
                        }
                        if(button.settings.view == "grid_view" && activeButtons >= 1) {
                            var wrap_list = "<div class='channel-grid'>";
                            if(button.settings.list_view_subtitle != ""){
                                wrap_list += "<div class='grid-title-container'><div class='grid-title'>"+button.settings.list_view_subtitle+"</div></div>";
                            }
                            wrap_list += "<div class='channel-grid-container'>";
                            wrap_list += $("#gsb-buttons-"+button.id+" .gsb-button-list.grid_view").html();
                            wrap_list += "</div>";
                            wrap_list += "</div>";
                            $("#gsb-buttons-"+button.id+" .gsb-button-list.grid_view").html(wrap_list);
                        }

                        if(button.settings.view != "icon_view" && activeButtons >= 1 && button.settings.list_view_title != "") {
                            var title_string = "";
                            title_string += "<div class='list_title_container'>";
                            var list_title = button.settings.list_view_title.replace(/(<([^>]+)>)/ig, "");
                            title_string += "<a href='javascript:;' class='close-view-btn'><span class='dashicons dashicons-arrow-down-alt2'></span></a>";
                            title_string += "<span class='list_title'>"+list_title+"</span>";
                            title_string += "</div>";
                            if(button.settings.view == "list_view") {
                                $("#gsb-buttons-"+button.id+" .gsb-button-list.list_view .channel-list-container").before(title_string);
                            } else {
                                $("#gsb-buttons-"+button.id+" .gsb-button-list.grid_view .channel-grid").before(title_string);
                            }
                        }

                        var closeButton = "";
                        if((button.settings.default_state == "open" && button.settings.show_close_button == "no" && button.settings.view == "icon_view") || (button.settings.default_state == "open" && button.settings.show_close_button == "no" && button.settings.view == "menu_view")) {
                            closeButton = "has-no-close-button";
                        }

                        $("#gsb-buttons-" + button.id ).addClass(closeButton);
                        if(button.settings.default_state == "open" && button.settings.show_close_button == "yes") {
                            $("#gsb-buttons-" + button.id ).addClass("has-close-button");
                            $("#gsb-buttons-" + button.id ).addClass("has-no-animation");
                        }
                        if(button.settings.default_state == "open" && button.settings.view == "corner_circle_view") {
                            $("#gsb-buttons-" + button.id ).addClass("has-no-animation");
                        }
                        if(button.settings.default_state == "click") {
                            $("#gsb-buttons-" + button.id ).addClass("has-no-tooltip-animation");
                        }

                        customCSS += ".whatsapp-chat.no-user-profile:before { border-top: 0 solid transparent;}";
                        customCSS += ".whatsapp-chat.no-user-profile { border-top-left-radius: 6px;}";

                        var coordinates = 0;
                        var i = 0;
                        if($("#gsb-buttons-" + button.id).hasClass("has-no-close-button")) {
                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list .chat-button {transition:none !important; display: block;}";
                        }else{
                            for(i=0; i < activeButtons; i++) {
                                if(button.settings.view == "corner_circle_view") {
                                    if(buttonPosition == "right") {
                                        coordinates = getCoordinates(i, widgetSize,buttonPosition);
                                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.corner_circle_view .chat-button:nth-child(" + (i + 1) + ") {opacity: 0; visibility: hidden; margin-bottom: 0; position: absolute;}";
                                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.corner_circle_view .chat-button:nth-child(" + (i + 1) + ") {transform: translate("+(-1*coordinates[0])+ "px, "+(-1*coordinates[1])+ "px); opacity: 1; visibility: visible; transition: all ease-in-out 250ms, transform 200ms "+(150 * i) +"ms, opacity 200ms "+ (150 * i)+"ms}";
                                    } else {
                                        coordinates = getCoordinates(i, widgetSize,buttonPosition);
                                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.corner_circle_view .chat-button:nth-child(" + (i + 1) + ") {opacity: 0; visibility: hidden; margin-bottom: 0; position: absolute;}";
                                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.corner_circle_view .chat-button:nth-child(" + (i + 1) + ") {transform: translate("+coordinates[0]+ "px, "+(-1*coordinates[1])+ "px); opacity: 1; visibility: visible; transition: all ease-in-out 250ms, transform 200ms "+(150 * i) +"ms, opacity 200ms "+ (150 * i)+"ms}";
                                    }
                                } else {
                                    if(button.settings.menu_view == "vertical") {
                                        if(button.settings.menu_animation == "ginger-menu-none") {
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);transition:none !important; display: block;}";
                                        } else if(button.settings.menu_animation == "ginger-menu-slide") {
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px) scale(1); transition-delay: "+((i + 1)*0.075)+"s;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);}";
                                        } else if(button.settings.menu_animation == "ginger-menu-fade"){
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);  opacity: 1; visibility: visible;}";
                                        } else if(button.settings.menu_animation == "ginger-menu-spin"){
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg);}";
                                        } else if(button.settings.menu_animation == "ginger-menu-pop"){
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1);}";
                                        } else {
                                            customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                            customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;}";
                                        }
                                    } else {
                                        if(buttonPosition == "right") {
                                            if(button.settings.menu_animation == "ginger-menu-none") {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);transition:none !important; display: block;}";
                                            } else if(button.settings.menu_animation == "ginger-menu-slide") {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px) scale(1); transition-delay: "+((i + 1)*0.075)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);}";
                                            } else if(button.settings.menu_animation == "ginger-menu-fade"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);  opacity: 1; visibility: visible;}";
                                            } else if(button.settings.menu_animation == "ginger-menu-spin"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg);}";
                                            } else if(button.settings.menu_animation == "ginger-menu-pop"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1);}";
                                            } else {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;}";
                                            }
                                            //customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1) rotate(360deg); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1) rotate(360deg);}";
                                        } else {
                                            if(button.settings.menu_animation == "ginger-menu-none") {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);transition:none !important; display: block;}";
                                            } else if(button.settings.menu_animation == "ginger-menu-slide") {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px) scale(1); transition-delay: "+((i + 1)*0.075)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);}";
                                            } else if(button.settings.menu_animation == "ginger-menu-fade"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1);  opacity: 1; visibility: visible;}";
                                            } else if(button.settings.menu_animation == "ginger-menu-spin"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  rotate(0deg); transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) rotate(360deg);}";
                                            } else if(button.settings.menu_animation == "ginger-menu-pop"){
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1);}";
                                            } else {
                                                customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: none;}";
                                                customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.icon_view .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;}";
                                            }
                                            //customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1) rotate(360deg); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1) rotate(360deg);}";
                                        }
                                    }
                                }
                            }
                        }

                        customCSS += "#gsb-buttons-" + button.id + ".list_view {-webkit-transform: translateY(50px) scale(1); transform: translateY(50px) scale(1); transition-delay: 0.5s; opacity: 0; visibility:hidden;}";
                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .list_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";
                        customCSS += "#gsb-buttons-" + button.id + ".grid_view {-webkit-transform: translateY(50px) scale(1); transform: translateY(50px) scale(1); transition-delay: 0.5s; opacity: 0; visibility:hidden;}";
                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .grid_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";

                        // Menu view
                        var total_size = $("#gsb-buttons-" + button.id +" .gsb-trigger").outerHeight(true) + parseInt(10);
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.menu_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px) scale(1); opacity: 0; visibility:hidden;}";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list.menu_view .chat-button {opacity: 0; visibility:hidden;}";
                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.menu_view .chat-button {opacity: 1; visibility:visible;}";
                        // customCSS += "#gsb-buttons-" + button.id + ".open-buttons.right-side .gsb-button-list.menu_view {-webkit-transform: translateY(-"+total_size+"px) scale(1); transform: translateY(-"+total_size+"px)  scale(1);visibility: visible;opacity: 1;}";
                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list.menu_view {-webkit-transform: translateY(-5px) scale(1); transform: translateY(-5px)  scale(1);visibility: visible;opacity: 1;}";
                        customCSS += "#gsb-buttons-" + button.id + ".open-buttons.has-no-close-button .gsb-button-list.menu_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";

                        var i = 1;
                        var j = 0;
                        if(button.settings.view == "list_view" && activeButtons >= 1 || button.settings.view == "menu_view") {

                        } else {
                            for(i=1,j=0; i < activeButtons,j <activeButtons; i++,j++) {
                                if(button.settings.menu_view == "vertical") {
                                    if(buttonPosition == "right") {
                                        customCSS += "#gsb-buttons-" + button.id + ".has-no-close-button:not(.single) .gsb-button-list .chat-button:nth-child(" + (j + 1) + ") {opacity: 1;visibility: visible;pointer-events: auto;right: 0;-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px);transition-delay:-2s;}";
                                    } else {
                                        customCSS += "#gsb-buttons-" + button.id + ".has-no-close-button:not(.single) .gsb-button-list .chat-button:nth-child(" + (j + 1) + ") {opacity: 1;visibility: visible;pointer-events: auto;left: 0;-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px);transition-delay:-2s;}";
                                    }
                                } else {
                                    if(buttonPosition == "right") {
                                        customCSS += "#gsb-buttons-" + button.id + ".has-no-close-button:not(.single) .gsb-button-list .chat-button:nth-child(" + (j + 1) + ") {opacity: 1;visibility: visible;pointer-events: auto;right: 0;-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px);transition-delay:-2s;}";
                                    } else {
                                        customCSS += "#gsb-buttons-" + button.id + ".has-no-close-button:not(.single) .gsb-button-list .chat-button:nth-child(" + (j + 1) + ") {opacity: 1;visibility: visible;pointer-events: auto;left: 0;-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px);transition-delay:-2s;}";
                                    }
                                }
                            }
                        }


                       /* var i = 0;
                        for(i=0; i < activeButtons; i++) {
                            if(button.settings.menu_view == "vertical") {
                                if(buttonPosition == "right") {
                                    customCSS += "#gsb-buttons-" + button.id + ".open-buttons.has-close-button .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;transition-delay:-2s;}";
                                } else {
                                    customCSS += "#gsb-buttons-" + button.id + ".open-buttons.has-close-button .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateY(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;transition-delay:-2s;}";
                                }
                            }else {
                                if(buttonPosition == "right") {
                                    customCSS += "#gsb-buttons-" + button.id + ".open-buttons.has-close-button .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;transition-delay:-2s;}";
                                } else {
                                    customCSS += "#gsb-buttons-" + button.id + ".open-buttons.has-close-button .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1); display: block;transition-delay:-2s;}";
                                }
                            }
                        }*/

                        var isTriggered = getCookie("gsb-button-click-"+button.id);
                        if(button.settings.default_state == "open") {
                            if(button.settings.hide_menu_after_close_click == "no") {
                                $("#gsb-buttons-"+button.id).addClass("open-buttons");
                                if(isTriggered) {
                                    $("#gsb-buttons-"+button.id).removeClass("has-close-button");
                                }
                            }else {
                                if(!(isTriggered)) {
                                    $("#gsb-buttons-"+button.id).addClass("open-buttons");
                                }
                                else {
                                    $("#gsb-buttons-"+button.id).removeClass("has-close-button");
                                }
                            }
                        }
                    }
                    var buttonPadding = Math.ceil(widgetSize*2/10);
                    if(button.settings.view == "icon_view") {
                        customCSS += "#gsb-buttons-" + button.id + " .chat-button, #gsb-buttons-" + button.id + " .gsb-trigger-contact, #gsb-buttons-" + button.id + " .gsb-trigger-whatsapp-popup, #gsb-buttons-" + button.id + " .gsb-trigger-wechat-popup {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .chat-button-link {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; padding: " + buttonPadding + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger-button {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-top {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-bottom {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .chat-button-icon {width: " + (widgetSize - (2 * buttonPadding)) + "px; height: " + (widgetSize - (2 * buttonPadding)) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + ".single .gsb-trigger-button {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                    } else if(button.settings.view == "corner_circle_view") {
                        var newWidgetSize = parseInt(widgetSize - parseInt(0.15*widgetSize));
                        customCSS += "#gsb-buttons-" + button.id + " .chat-button, #gsb-buttons-" + button.id + " .gsb-trigger-contact, #gsb-buttons-" + button.id + " .gsb-trigger-whatsapp-popup, #gsb-buttons-" + button.id + " .gsb-trigger-wechat-popup {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list .chat-button {width: " + (newWidgetSize + 8) + "px; height: " + (newWidgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list .gsb-trigger {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button-link {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; padding: " + buttonPadding + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list .chat-button-link {width: " + (newWidgetSize) + "px; height: " + (newWidgetSize) + "px; padding: " + buttonPadding + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger-button {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-top {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-bottom {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list .chat-button-icon {width: " + (newWidgetSize - (2 * buttonPadding)) + "px; height: " + (newWidgetSize - (2 * buttonPadding)) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-button-list .chat-button-icon i {font-size: " + (newWidgetSize - (2 * buttonPadding)) + "px; line-height: " + (newWidgetSize - (2 * buttonPadding)) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button-icon {width: " + (widgetSize - (2 * buttonPadding)) + "px; height: " + (widgetSize - (2 * buttonPadding)) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button-icon i {font-size: " + (widgetSize - (2 * buttonPadding)) + "px; line-height: " + (widgetSize - (2 * buttonPadding)) + "px; }";
                    } else {
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button, #gsb-buttons-" + button.id + " .gsb-trigger-contact, #gsb-buttons-" + button.id + " .gsb-trigger-whatsapp-popup, #gsb-buttons-" + button.id + " .gsb-trigger-wechat-popup {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger {width: " + (widgetSize + 8) + "px; height: " + (widgetSize + 8) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger-button {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-top {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .gsb-trigger-bottom {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button-link {width: " + (widgetSize) + "px; height: " + (widgetSize) + "px; padding: " + buttonPadding + "px; }";
                        customCSS += "#gsb-buttons-" + button.id + " .gsb-trigger .chat-button-icon {width: " + (widgetSize - (2 * buttonPadding)) + "px; height: " + (widgetSize - (2 * buttonPadding)) + "px; }";
                    }


                    /* for main icon */
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-top .chat-button-link {background: "+button.settings.bg_color+"; color: "+button.settings.text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-top .chat-button-link svg {fill: "+button.settings.text_color+"; color: "+button.settings.text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-bottom .chat-button-link, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-contact .chat-button-link, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-whatsapp-popup .chat-button-link, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-wechat-popup .chat-button-link {background: "+button.settings.bg_color+"; color: "+button.settings.text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-bottom .chat-button-link svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-contact .chat-button-link svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-whatsapp-popup .chat-button-link svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-wechat-popup .chat-button-link svg {fill: "+button.settings.text_color+"; color: "+button.settings.text_color+";  }";

                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-top .chat-button-link:hover {background: "+button.settings.interaction_bg_color+"; color: "+button.settings.interaction_text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-top .chat-button-link:hover svg {fill: "+button.settings.interaction_text_color+"; color: "+button.settings.interaction_text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-bottom .chat-button-link:hover, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-contact .chat-button-link:hover, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-whatsapp-popup .chat-button-link:hover, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-wechat-popup .chat-button-link:hover {background: "+button.settings.interaction_bg_color+"; color: "+button.settings.interaction_text_color+";  }";
                    customCSS += "#gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-bottom .chat-button-link:hover svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-contact .chat-button-link:hover svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-whatsapp-popup .chat-button-link:hover svg, #gsb-buttons-" + button.id +" .gsb-trigger .gsb-trigger-wechat-popup .chat-button-link:hover svg {fill: "+button.settings.interaction_text_color+"; color: "+button.settings.interaction_text_color+";  }";

                    customCSS += "#gsb-buttons-" + button.id +" .chat-button-link {border-radius: "+button.settings.border_radius + "px; }";

                    customCSS += "#gsb-buttons-" + button.id +" [data-scb][data-tooltip-dir]::after, [data-scb][class*=cooltipz]::after {background-color: "+button.settings.tooltip_settings.bg_color+"; color: "+button.settings.tooltip_settings.text_color+"; border-radius: "+button.settings.tooltip_settings.border_radius+"px; font-size:"+button.settings.tooltip_settings.font_size+"px; line-height: "+button.settings.tooltip_settings.tooltip_height+"px; }";
                    customCSS += "#gsb-buttons-" + button.id +" [data-scb][data-tooltip-dir][data-tooltip-dir=left]::before, [data-scb][data-tooltip-dir].cooltipz--left::before, [data-scb][class*=cooltipz][data-tooltip-dir=left]::before, [data-scb][class*=cooltipz].cooltipz--left::before {border-left-color: "+button.settings.tooltip_settings.bg_color+"; }";
                    customCSS += "#gsb-buttons-" + button.id +" [data-scb][data-tooltip-dir][data-tooltip-dir=top]::before, [data-scb][data-tooltip-dir].cooltipz--top::before, [data-scb][class*=cooltipz][data-tooltip-dir=top]::before, [data-scb][class*=cooltipz].cooltipz--top::before {border-top-color: "+button.settings.tooltip_settings.bg_color+"; }"
                    customCSS += "#gsb-buttons-" + button.id +" [data-scb][data-tooltip-dir][data-tooltip-dir=right]::before, [data-scb][data-tooltip-dir].cooltipz--right::before, [data-scb][class*=cooltipz][data-tooltip-dir=right]::before, [data-scb][class*=cooltipz].cooltipz--right::before {border-right-color: "+button.settings.tooltip_settings.bg_color+"; }";

                    customCSS += "#gsb-buttons-" + button.id +" .chat-button-link.has-image .chat-button-icon img, #gsb-buttons-" + button.id +" .custom-icon-img, #gsb-buttons-" + button.id +" .chat-button-link.has-image img {width: " + widgetSize + "px; height: " + widgetSize + "px; line-height: " + widgetSize + "px; border-radius: " + button.settings.border_radius + "px; -moz-border-radius: " + button.settings.border_radius + "px; -webkit-border-radius: " + button.settings.border_radius + "px; }";

                    if(button.settings.view == "list_view" && activeButtons >= 1 && button.settings.list_view_title != "") {
                        customCSS += "#gsb-buttons-" + button.id +" .gsb-button-list.list_view .list_title_container  {background-color: "+button.settings.list_title_bg+";color: "+button.settings.list_title_color+"; }";
                        // customCSS += "#gsb-buttons-" + button.id +" .gsb-button-list.list_view .list_title_container .close-view-btn svg path  {stroke: "+button.settings.list_title_color+"; }";
                    }
                    if(button.settings.view == "grid_view" && activeButtons >= 1 && button.settings.list_view_title != "") {
                        customCSS += "#gsb-buttons-" + button.id +" .gsb-button-list.grid_view .list_title_container  {background-color: "+button.settings.list_title_bg+";color: "+button.settings.list_title_color+"; }";
                        // customCSS += "#gsb-buttons-" + button.id +" .gsb-button-list.grid_view .list_title_container .close-view-btn svg path  {stroke: "+button.settings.list_title_color+"; }";
                    }

                    if(button.settings.tooltip_settings.border_radius == '0' && button.settings.tooltip_settings.tooltip_height == '0' && button.settings.tooltip_settings.font_size == '0') {
                        customCSS += "#gsb-buttons-" + button.id +" [data-scb][data-tooltip-dir][data-tooltip-dir=left]::before, [data-scb][data-tooltip-dir].cooltipz--left::before, [data-scb][class*=cooltipz][data-tooltip-dir=left]::before, [data-scb][class*=cooltipz].cooltipz--left::before, [data-scb][data-tooltip-dir][data-tooltip-dir=right]::before, [data-scb][data-tooltip-dir].cooltipz--right::before, [data-scb][class*=cooltipz][data-tooltip-dir=right]::before, [data-scb][class*=cooltipz].cooltipz--right::before, [data-scb][data-tooltip-dir][data-tooltip-dir=bottom]::before, [data-scb][data-tooltip-dir].cooltipz--bottom::before, [data-scb][class*=cooltipz][data-tooltip-dir=bottom]::before, [data-scb][class*=cooltipz].cooltipz--bottom::before, [data-scb][data-tooltip-dir][data-tooltip-dir=bottom-left]::before, [data-scb][data-tooltip-dir].cooltipz--bottom-left::before, [data-scb][class*=cooltipz][data-tooltip-dir=bottom-left]::before, [data-scb][class*=cooltipz].cooltipz--bottom-left::before, [data-scb][data-tooltip-dir][data-tooltip-dir=bottom-right]::before, [data-scb][data-tooltip-dir].cooltipz--bottom-right::before, [data-scb][class*=cooltipz][data-tooltip-dir=bottom-right]::before, [data-scb][class*=cooltipz].cooltipz--bottom-right::before, [data-scb][data-tooltip-dir][data-tooltip-dir=top]::before, [data-scb][data-tooltip-dir].cooltipz--top::before, [data-scb][class*=cooltipz][data-tooltip-dir=top]::before, [data-scb][class*=cooltipz].cooltipz--top::before, [data-scb][data-tooltip-dir][data-tooltip-dir=top-left]::before, [data-scb][data-tooltip-dir].cooltipz--top-left::before, [data-scb][class*=cooltipz][data-tooltip-dir=top-left]::before, [data-scb][class*=cooltipz].cooltipz--top-left::before, [data-scb][data-tooltip-dir][data-tooltip-dir=top-right]::before, [data-scb][data-tooltip-dir].cooltipz--top-right::before, [data-scb][class*=cooltipz][data-tooltip-dir=top-right]::before, [data-scb][class*=cooltipz].cooltipz--top-right::before { border : 0 }";
                    }

                    if($("#gsb-buttons-"+button.id).hasClass("single")) {
                        customCSS += "#gsb-buttons-"+button.id+" .gsb-trigger {padding: 0;}";
                    }

                    customCSS += "#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a:not(."+button.settings.animation+") .gsb-pending-message {top: 3%; right: 3%;}";
                    customCSS += "#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a:not(."+button.settings.animation+") + .gsb-pending-message {top: 3%; right: 3%;}";

                    if(button.settings.animation == "none" || button.settings.animation == "ginger-btn-fade" || button.settings.animation == "ginger-btn-pulse" || button.settings.animation == "ginger-btn-spin") {
                        customCSS += "#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a."+button.settings.animation+" .gsb-pending-message {top: 3%; right: 3%;}";
                        customCSS += "#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a."+button.settings.animation+" + .gsb-pending-message {top: 3%; right: 3%;}";
                    }

                    var textPos = getTooltipPosition(button);

                    $("#gsb-buttons-" + button.id +" .gsb-button-list a.scb-tooltip").attr("data-tooltip-dir", textPos);

                    $("#gsb-buttons-" + button.id).addClass(buttonPosition + "-side");
                    $("#gsb-buttons-" + button.id).addClass(button.settings.menu_view + "-menu");

                    if(button.settings.menu_view == "vertical") {
                        if (buttonPosition == "left") {
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-top").attr("data-tooltip-dir", "right");
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-bottom .chat-button-link").attr("data-tooltip-dir", "right");
                        } else {
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-top").attr("data-tooltip-dir", "left");
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-bottom .chat-button-link").attr("data-tooltip-dir", "left");
                        }
                    } else {
                        $("#gsb-buttons-" + button.id + " .gsb-trigger-bottom .chat-button-link").attr("data-tooltip-dir", "top");
                        if (buttonPosition == "left") {
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-top").attr("data-tooltip-dir", "right");
                        } else {
                            $("#gsb-buttons-" + button.id + " .gsb-trigger-top").attr("data-tooltip-dir", "left");
                        }
                    }

                    if(button.settings.view == "grid_view") {
                        $("#gsb-buttons-"+button.id+" .gsb-button-list.grid_view .channel-grid-container .chat-button .scb-tooltip").attr("data-tooltip-dir","top");
                    }
                    if(button.settings.view == "corner_circle_view") {
                        $("#gsb-buttons-"+button.id+" .gsb-button-list.corner_circle_view .chat-button .scb-tooltip").attr("data-tooltip-dir","top");
                    }

                    var ctaButtonText = button.settings.call_to_action;
                    if(checkForTooltip(button)) {
                        $("#gsb-buttons-" + button.id + " .gsb-trigger-top").attr("data-scb", ctaButtonText).addClass("cooltipz--visible");
                    }

                    var font_family = button.settings.font_family;
                    if(font_family != "" && font_family != "Arial" && font_family != "Tahoma" && font_family != "Verdana" && font_family != "Helvetica" && font_family != "Times New Roman" && font_family != "Trebuchet MS" && font_family != "Georgia") {
                        $("head").append("<link id='#gsb-buttons-"+button.id+"' href='https://fonts.googleapis.com/css?family="+ button.settings.font_family +"' rel='stylesheet' type='text/css' >");
                    }
                    if(font_family != "") {
                        $("#gsb-buttons-"+button.id).css("font-family", font_family);
                        $("#gsb-buttons-"+button.id+" button").css("font-family", font_family);
                    } else {
                        $("#gsb-buttons-"+button.id).css("font-family", "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif");
                    }

                    //Menu animation
                    $("#gsb-buttons-" + button.id +" .gsb-button-list").addClass(button.settings.menu_animation);


                    checkForPendingMessage(button);

                    checkForAnimation(button);

                    checkForOnHoverText(button);

                    checkForTimeDelay(button);

                    checkForPageScroll(button);

                    checkForExitIntent(button);

                    $("#gab_front_css").remove();
                    $("head").append("<style id='gab_front_css'>"+customCSS+"</style>");

                    if(buttonPosition == "right") {
                        var list_view_container_width = $("#gsb-buttons-" + button.id + " .gsb-button-list.list_view").outerWidth() + parseInt($("#gsb-buttons-" + button.id).css("right").replace("px", ""));
                        var grid_view_container_width = $("#gsb-buttons-" + button.id + " .gsb-button-list.grid_view").outerWidth() + parseInt($("#gsb-buttons-" + button.id).css("right").replace("px", ""));
                        if($(window).width() <= list_view_container_width) {
                            customcss += "#gsb-buttons-" + button.id + ".right-side .gsb-button-list.list_view {transform: scale(0.5); transform-origin: bottom right;}";
                        }
                        if($(window).width() <= grid_view_container_width) {
                            customcss += "#gsb-buttons-" + button.id + ".right-side .gsb-button-list.grid_view {transform: scale(0.5); transform-origin: bottom right;}";
                        }
                    } else {
                        var list_view_container_width = $("#gsb-buttons-" + button.id + " .gsb-button-list.list_view").outerWidth() + parseInt($("#gsb-buttons-" + button.id).css("left").replace("px", ""));
                        var grid_view_container_width = $("#gsb-buttons-" + button.id + " .gsb-button-list.grid_view").outerWidth() + parseInt($("#gsb-buttons-" + button.id).css("left").replace("px", ""));
                        if($(window).width() <= list_view_container_width) {
                            customcss += "#gsb-buttons-" + button.id + ".left-side .gsb-button-list.list_view {transform: scale(0.5); transform-origin: bottom left;}";
                        }
                        if($(window).width() <= grid_view_container_width) {
                            customcss += "#gsb-buttons-" + button.id + ".left-side .gsb-button-list.grid_view {transform: scale(0.5); transform-origin: bottom left;}";
                        }
                    }

                    var widget_total_size = $("#gsb-buttons-" + button.id +" .gsb-trigger").outerHeight(true);
                    customcss += "#gsb-buttons-" + button.id+".open-form .scw-contact-form, #gsb-buttons-" + button.id+".open-whatsapp-popup .whatsapp-popup, #gsb-buttons-" + button.id+".open-wechat-popup .wechat-popup { bottom : "+widget_total_size+"px }";
                    customcss += "#gsb-buttons-" + button.id+".open-buttons:not(.has-no-close-button) .gsb-button-list.menu_view { bottom : "+widget_total_size+"px }";

                    $("#gsb_custom_css").remove();
                    $("head").append("<style id='gsb_custom_css'>"+customcss+"</style>");
                    if($("#gsb-buttons-" + button.id +" .list_title_container").length) {
                        var widget_title_size = $("#gsb-buttons-" + button.id +" .list_title_container").outerHeight(true);
                    } else {
                        var widget_title_size = 0;
                    }

                    var widget_bottom = $("#gsb-buttons-" + button.id).css("bottom").replace("px","");
                    var total_height = parseInt(widget_total_size)+parseInt(widget_bottom)+parseInt(widget_title_size)+parseInt("15");
                    $("#gsb-buttons-" + button.id+" .list_view .channel-list-container").css("max-height","calc(100vh - "+total_height+"px)");

                    var whatsapp_popup_height = parseInt(widget_total_size)+parseInt(widget_bottom)+parseInt($("#gsb-buttons-" + button.id +" .whatsapp-popup").outerHeight(true));
                    var whatsapp_total_height = parseInt(widget_total_size)+parseInt(widget_bottom)+parseInt($("#gsb-buttons-" + button.id +" .whatsapp-popup .whatsapp-popup-header").outerHeight(true))+parseInt($("#gsb-buttons-" + button.id +" .whatsapp-popup .whatsapp-popup-footer").outerHeight(true)) + parseInt(10);
                    if(whatsapp_popup_height > $(window).height()) {
                        $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("max-height","calc(100vh - "+whatsapp_total_height+"px)");
                        $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("min-height","calc(100vh - "+whatsapp_total_height+"px)");
                    } else {
                        $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("min-height","270px");
                    }

                    $(window).resize(function (){
                        if(whatsapp_popup_height > $(window).height()) {
                            $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("max-height","calc(100vh - "+whatsapp_total_height+"px)");
                            $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("min-height","calc(100vh - "+whatsapp_total_height+"px)");
                        } else {
                            $("#gsb-buttons-" + button.id+" .whatsapp-popup .whatsapp-popup-body").css("min-height","270px");
                        }
                    });

                    var wechat_popup_height = parseInt(widget_total_size) + parseInt(widget_bottom) + parseInt($("#gsb-buttons-" + button.id+" .wechat-popup .wechat-popup-header").outerHeight(true)) + 10;
                    $("#gsb-buttons-" + button.id+" .wechat-popup .wechat-popup-body").css("max-height","calc(100vh - "+wechat_popup_height+"px)");

                    var list_view_bottom = widget_total_size + 5;
                    $("#gsb-buttons-" + button.id+".view-list .list_view").css("bottom",list_view_bottom+"px");
                    $("#gsb-buttons-" + button.id+".view-grid .grid_view").css("bottom",list_view_bottom+"px");

                    $(document).on("touch click", "body", function (){
                        if(($("#gsb-buttons-"+button.id).hasClass("view-grid") && $("#gsb-buttons-"+button.id).hasClass("open-buttons")) || ($("#gsb-buttons-"+button.id).hasClass("view-list") && $("#gsb-buttons-"+button.id).hasClass("open-buttons"))) {
                            $("#gsb-buttons-"+button.id).removeClass("open-buttons");
                        }

                        if($("#gsb-buttons-"+button.id).hasClass("open-whatsapp-popup") && $("#gsb-buttons-"+button.id).hasClass("has-no-close-remove")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-whatsapp-popup has-no-close-remove").addClass("open-buttons has-no-close-button");
                        }
                        if($("#gsb-buttons-"+button.id).hasClass("open-form") && $("#gsb-buttons-"+button.id).hasClass("has-no-close-remove")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-form has-no-close-remove").addClass("open-buttons has-no-close-button");
                        }
                        if($("#gsb-buttons-"+button.id).hasClass("open-wechat-popup") && $("#gsb-buttons-"+button.id).hasClass("has-no-close-remove")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-wechat-popup has-no-close-remove").addClass("open-buttons has-no-close-button");
                        }
                        if($("#gsb-buttons-"+button.id).hasClass("open-whatsapp-popup")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-whatsapp-popup");
                        }
                        if($("#gsb-buttons-"+button.id).hasClass("open-form")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-form");
                        }
                        if($("#gsb-buttons-"+button.id).hasClass("open-wechat-popup")) {
                            $("#gsb-buttons-"+button.id).removeClass("open-wechat-popup");
                        }
                    });

                });

                $(".chat-button-icon img").each(function(){
                    $(this).closest(".chat-button-link").addClass("has-image");
                });

                $(document).on("submit",".scw-contact-form",function (e) {

                    e.preventDefault();
                    $(this).closest(".scw-contact-form").find(".scw-form-field").removeClass("has-error");
                    $(this).closest(".scw-contact-form").find(".scw-form-field").removeClass("has-error-valid");
                    var callback_target = $(this).closest(".scw-contact-form").attr("data_target");
                    is_close_after_submit = ($(this).closest(".scw-contact-form").find(".scw-form-success.success-close-msg").length > 0) ? 1 : 0;
                    var close_after_sec = 3;
                    if(is_close_after_submit == 1) {
                        close_after_sec = $(this).closest(".scw-contact-form").find(".scw-form-success.success-close-msg").attr("data_close_sec");
                    }
                    var error_count = 0;
                    var form_id = $(this).closest(".gsb-buttons").attr("id");
                    $.each($(this).closest(".scw-contact-form").find(".scw-form-field .scw-field") , function () {
                        if($(this).hasClass("is-require") &&  $(this).val() == "") {
                            error_count += 1;
                            $(this).closest(".scw-form-field").addClass("has-error");
                        }
                        if($(this).val() != "" && $(this).data("name") == "email") {
                            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if(!regex.test($(this).val())) {
                                error_count += 1;
                                $(this).closest(".scw-form-field").addClass("has-error-valid");
                            }
                        }
                        if($(this).val() != "" && $(this).data("name") == "phone") {
                            var regex = /^[0-9]*$/;
                            if(!regex.test($(this).val())) {
                                error_count += 1;
                                $(this).closest(".scw-form-field").addClass("has-error-valid");
                            }
                        }
                    });

                    if(error_count != 0) {
                        $(this).closest(".scw-contact-form").find(".scw-form-field.has-error-valid:first input").focus();
                        $(this).closest(".scw-contact-form").find(".scw-form-field.has-error:first input").focus();
                    }
                    if(error_count == 0) {
                        $(this).find(":submit").prop("disabled", true);
                        var form_id_submit = $(this).closest(".scw-contact-form").attr("id");

                        $.ajax({
                            url: gsb_settings.ajax_url,
                            data: $("#"+form_id_submit).serialize(),
                            dateType: 'json',
                            type: 'post',
                            success: function(responseText) {
                                responseText = $.parseJSON(responseText);
                                if(responseText.status == 1) {
                                    $("#"+form_id+" .scw-contact-form").addClass("success-msg");
                                    $("#"+form_id+" .scw-contact-form").removeClass("has-error");
                                    $("#"+form_id+" .scw-contact-form .scw-form-success").text(responseText.message);
                                    $("#"+form_id+" .scw-contact-form .scw-field").val("");
                                    $("#"+form_id+" .scw-contact-form .scw-form-btn button").prop("disabled",false);
                                    if(is_close_after_submit == 1) {
                                        setTimeout(function () {
                                            if($("#"+form_id).closest(".gsb-buttons").hasClass("open-form") && $("#"+form_id).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                                                $("#"+form_id).closest(".gsb-buttons").removeClass("open-form has-no-close-remove").addClass("open-buttons has-no-close-button");
                                            }
                                            if($("#"+form_id).hasClass("open-form")) {
                                                $("#"+form_id).removeClass("open-form");
                                            }
                                        }, close_after_sec * 1000);
                                    }
                                    if(responseText.data.URL != "") {
                                        if(callback_target == "blank") {
                                            window.open(responseText.data.URL, '_blank');
                                        } else {
                                            window.location.href = responseText.data.URL;
                                        }
                                    }
                                } else if (responseText.status == 0) {
                                    $("#"+form_id+" .scw-contact-form .scw-form-btn button").prop("disabled",false);
                                    $("#"+form_id+" .scw-contact-form").addClass("success-msg has-error");
                                    $("#"+form_id+" .scw-contact-form .scw-field").each(function (key,value) {
                                        var field = $(this).attr("name").replace('scw_form_fields[','');
                                        field = field.replace(']','');
                                        if($.inArray(field,responseText.has_error) >= 0) {
                                            $(this).closest(".scw-form-field").addClass("has-error");
                                        } else if($.inArray(field,responseText.has_error_valid) >= 0) {
                                            $(this).closest(".scw-form-field").addClass("has-error-valid");
                                        }
                                    })
                                    $("#"+form_id+" .scw-contact-form .scw-form-success").text(responseText.message);
                                }
                            }
                        });
                    }
                });

                $(document).on("keyup", ".scw-field-phone", function(){
                    var regExpression = /^[0-9]+$/;
                    var nValue = $(this).val();
                    if (nValue.match(regExpression)) {

                    } else {
                        $(this).val(nValue.replace(/\D/g, ""));
                    }
                });

                $(document).on("touch click", ".gsb-buttons .gsb-trigger .gsb-trigger-top a", function(){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    setCookie("gsb-button-click-" + widget_id, true , 2);
                    if($(this).closest(".gsb-buttons").hasClass("cta-first_click")) {
                        $(this).closest("div[data-scb]").attr("data-scb", "");
                    }
                });

                $(document).on("touch click", ".gsb-buttons .gsb-trigger .gsb-trigger-top a, .gsb-buttons .gsb-trigger .chat-button a", function(){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    setCookie("gsb-button-click-" + widget_id, true , 2);
                    if($(this).closest(".gsb-buttons").hasClass("cta-first_click")) {
                        $(this).closest("div[data-scb]").attr("data-scb", "");
                    }
                });

                $(document).on("touch click", ".gsb-buttons .gsb-trigger .gsb-trigger-top a, .gsb-buttons .gsb-trigger .gsb-trigger-bottom a", function(){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $("#gsb-buttons-"+widget_id+" .gsb-pending-message").remove();
                });

                $(document).on("touch click", ".gsb-buttons .gsb-trigger .gsb-trigger-bottom a", function(){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    setCookie("gsb-button-click-" + widget_id,true , 2);
                    if($(this).closest(".gsb-buttons").hasClass("cta-first_click")) {
                        $(this).closest("div[data-scb]").attr("data-scb", "");
                    }
                });

                $(document).on("mouseenter",".gsb-buttons .gsb-trigger a", function(){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    var widget_animation = $(this).closest(".gsb-buttons").data("animation");
                    $("#gsb-buttons-"+widget_id+" .gsb-trigger .gsb-trigger-top a").removeClass(widget_animation);
                    $("#gsb-buttons-"+widget_id+" .gsb-trigger .chat-button a").removeClass(widget_animation);
                });

                $(document).on("touch click", ".gsb-buttons:not(.single) .gsb-trigger .gsb-trigger-top a", function(e){
                    e.preventDefault();
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $(this).closest(".gsb-buttons").removeClass("open-form");
                    $(this).closest(".gsb-buttons").removeClass("open-whatsapp-popup");
                    $(this).closest(".gsb-buttons").removeClass("open-wechat-popup");
                    $("#gsb-buttons-"+widget_id+" .scw-contact-form .scw-form-field").removeClass("has-error");
                    $(this).closest("#gsb-buttons-"+widget_id).find(".scw-contact-form").removeClass("success");
                    $(this).closest("#gsb-buttons-"+widget_id).find(".scw-contact-form").removeClass("success-msg");
                    $(this).closest("#gsb-buttons-"+widget_id).find(".scw-contact-form").removeClass("has-error");
                    $(this).closest("#gsb-buttons-"+widget_id).removeClass("has-no-animation");
                    $(this).closest("#gsb-buttons-"+widget_id).removeClass("has-no-tooltip-animation");
                    $(this).closest(".gsb-buttons").addClass("open-buttons");
                });

                $(document).on("touch click",".gsb-buttons .gsb-trigger .gsb-trigger-contact a",function (e) {
                    e.preventDefault();
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $(this).closest(".gsb-buttons").removeClass("open-form");
                    $("#gsb-buttons-"+widget_id+" .scw-contact-form .scw-form-field").removeClass("has-error");
                    $(this).closest(".gsb-buttons").addClass("open-buttons");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                    }
                });

                $(document).on("touch click",".gsb-buttons .gsb-trigger .gsb-trigger-whatsapp-popup a",function (e) {
                    e.preventDefault();
                    $(this).closest(".gsb-buttons").removeClass("open-whatsapp-popup");
                    $(this).closest(".gsb-buttons").addClass("open-buttons");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                    }
                });

                $(document).on("touch click",".gsb-buttons .gsb-trigger .gsb-trigger-wechat-popup a",function (e) {
                    e.preventDefault();
                    $(this).closest(".gsb-buttons").removeClass("open-wechat-popup");
                    $(this).closest(".gsb-buttons").addClass("open-buttons");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                    }
                });

                $(document).on("touch click",".gsb-buttons .scw-contact-form .scw-form-close",function (e) {
                    e.preventDefault();
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $(this).closest("#gsb-buttons-"+widget_id).removeClass("open-form");
                    $("#gsb-buttons-"+widget_id+" .scw-contact-form .scw-form-field").removeClass("has-error");
                    $(this).closest("#gsb-buttons-"+widget_id+".has-no-close-button").addClass("open-buttons");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                    }
                });

                $(document).on("touch click",".gsb-buttons .whatsapp-popup .whatsapp-popup-close-btn",function (e) {
                    e.preventDefault();
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $(this).closest("#gsb-buttons-"+widget_id).removeClass("open-whatsapp-popup");
                    $(this).closest("#gsb-buttons-"+widget_id+".has-no-close-button").addClass("open-buttons");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                    }
                });

                $(document).on("touch click",".gsb-buttons .wechat-popup .wechat-popup-close-btn",function (e) {
                    e.preventDefault();
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    if($(this).closest(".gsb-buttons").hasClass("has-no-close-remove")) {
                        $(this).closest(".gsb-buttons").removeClass("has-no-close-remove");
                        $(this).closest(".gsb-buttons").addClass("has-no-close-button");
                    }
                    $(this).closest("#gsb-buttons-"+widget_id).removeClass("open-wechat-popup");
                    $(this).closest("#gsb-buttons-"+widget_id+".has-no-close-button").addClass("open-buttons");
                });

                $(document).on("touch click",".gsb-buttons .close-view-btn" , function (e) {
                    e.preventDefault();
                    $(this).closest(".gsb-buttons").removeClass("open-buttons");
                });

                $(document).on("touch click", ".gsb-buttons:not(.single) .gsb-trigger .gsb-trigger-bottom a", function(e){
                    e.preventDefault();
                    $(this).closest(".gsb-buttons").removeClass("has-no-animation");
                    $(this).closest(".gsb-buttons").removeClass("open-buttons");
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .gsb-button-list:not(.list_view) .chat-button .channel-contact_form , .gsb-buttons.single .gsb-button-list:not(.list_view) + .gsb-trigger .chat-button .channel-contact_form",function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;
                    if($(this).closest(".gsb-buttons").hasClass("open-form")) {
                        // if(channel_count > 1) {
                        $(this).closest(".gsb-buttons").addClass("open-buttons")
                        // }
                        $(this).closest(".gsb-buttons").removeClass("open-form");
                    } else {
                        if($(this).closest(".gsb-buttons").hasClass("has-no-close-button")) {
                            $(this).closest(".gsb-buttons").addClass("has-no-close-remove");
                            $(this).closest(".gsb-buttons").removeClass("has-no-close-button");
                        }
                        // if(channel_count > 1) {
                        $(this).closest(".gsb-buttons").removeClass("open-buttons")
                        // }
                        $(this).closest(".gsb-buttons").addClass("open-form");
                        $(this).closest(".gsb-buttons").find(".scw-contact-form").removeClass("success");
                        $(this).closest(".gsb-buttons").find(".scw-contact-form").removeClass("success-msg");
                        $(this).closest(".gsb-buttons").find(".scw-contact-form").removeClass("has-error");
                    }
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .list_view .gsb-social-channel" ,function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;
                    var channel = $(this).data("channel");
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    if(channel == "contact_form") {
                        //alert(channel_count);
                        if ($(this).closest(".gsb-buttons").hasClass("open-form")) {
                            // if(channel_count > 1) {
                            $(this).closest(".gsb-buttons").addClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").removeClass("open-form");
                        } else {
                            // if(channel_count > 1) {
                            $(this).closest(".gsb-buttons").removeClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").addClass("open-form");
                            $(this).closest("#gsb-buttons-" + widget_id).find(".scw-contact-form").removeClass("success");
                            $(this).closest("#gsb-buttons-" + widget_id).find(".scw-contact-form").removeClass("success-msg");
                            $(this).closest("#gsb-buttons-" + widget_id).find(".scw-contact-form").removeClass("has-error");
                        }
                    }
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .gsb-button-list:not(.list_view) .chat-button .channel-whatsapp , .gsb-buttons.single .gsb-button-list:not(.list_view) + .gsb-trigger .chat-button .channel-whatsapp",function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;

                    if($(this).closest(".gsb-buttons").find(".whatsapp-popup").length) {
                        if ($(this).closest(".gsb-buttons").hasClass("open-whatsapp-popup")) {
                            // if (channel_count > 1) {
                            $(this).closest(".gsb-buttons").addClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").removeClass("open-whatsapp-popup");
                        } else {
                            if ($(this).closest(".gsb-buttons").hasClass("has-no-close-button")) {
                                $(this).closest(".gsb-buttons").addClass("has-no-close-remove");
                                $(this).closest(".gsb-buttons").removeClass("has-no-close-button");
                            }
                            // if (channel_count > 1) {
                            $(this).closest(".gsb-buttons").removeClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").addClass("open-whatsapp-popup");
                        }
                    }
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .list_view .gsb-social-channel" ,function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;
                    var channel = $(this).data("channel");
                    if(channel == "whatsapp") {
                        if ($(this).closest(".gsb-buttons").find(".whatsapp-popup").length) {
                            if ($(this).closest(".gsb-buttons").hasClass("open-whatsapp-popup")) {
                                // if (channel_count > 1) {
                                $(this).closest(".gsb-buttons").addClass("open-buttons")
                                // }
                                $(this).closest(".gsb-buttons").removeClass("open-whatsapp-popup");
                            } else {
                                // if (channel_count > 1) {
                                $(this).closest(".gsb-buttons").removeClass("open-buttons")
                                // }
                                $(this).closest(".gsb-buttons").addClass("open-whatsapp-popup");
                            }
                        }
                    }
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .gsb-button-list:not(.list_view) .chat-button .channel-wechat , .gsb-buttons.single .gsb-button-list:not(.list_view) + .gsb-trigger .chat-button .channel-wechat",function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;

                    if($(this).closest(".gsb-buttons").find(".wechat-popup").length) {
                        if ($(this).closest(".gsb-buttons").hasClass("open-wechat-popup")) {
                            // if (channel_count > 1) {
                            $(this).closest(".gsb-buttons").addClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").removeClass("open-wechat-popup");
                        } else {
                            if($(this).closest(".gsb-buttons").hasClass("has-no-close-button")) {
                                $(this).closest(".gsb-buttons").addClass("has-no-close-remove")
                                $(this).closest(".gsb-buttons").removeClass("has-no-close-button")
                            }
                            // if (channel_count > 1) {
                            $(this).closest(".gsb-buttons").removeClass("open-buttons")
                            // }
                            $(this).closest(".gsb-buttons").addClass("open-wechat-popup");
                        }
                    }
                });

                $(document).on("touch click",".gsb-buttons:not(.single) .list_view .gsb-social-channel" ,function () {
                    var channel_count = $(this).closest(".gsb-buttons").find(".gsb-button-list .chat-button").length;
                    var channel = $(this).data("channel");
                    if(channel == "wechat") {
                        if ($(this).closest(".gsb-buttons").find(".wechat-popup").length) {
                            if ($(this).closest(".gsb-buttons").hasClass("open-wechat-popup")) {
                                // if (channel_count > 1) {
                                $(this).closest(".gsb-buttons").addClass("open-buttons")
                                // }
                                $(this).closest(".gsb-buttons").removeClass("open-wechat-popup");
                            } else {
                                // if (channel_count > 1) {
                                $(this).closest(".gsb-buttons").removeClass("open-buttons")
                                // }
                                $(this).closest(".gsb-buttons").addClass("open-wechat-popup");
                            }
                        }
                    }
                });

                $(document).on("touch click", ".gsb-buttons .gsb-button-list, .gsb-buttons .gsb-trigger-button, .gsb-buttons .whatsapp-popup, .gsb-buttons .scw-contact-form, .gsb-buttons .wechat-popup", function (e){
                    e.stopPropagation();
                });

                $(document).on("touch click", ".gsb-buttons .chat-button a", function (){
                    var widget_id = $(this).closest(".gsb-buttons").data("id");
                    $("#gsb-buttons-"+widget_id+" .gsb-pending-message").remove();
                });

            }
        }

    });


    $(window).resize(function(){
        setStickyWidgetMenu();
    });

    function getCoordinates(index, widgetSize,buttonPosition) {
        // var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        //widgetSize = widgetSize + 15;

        var newWidgetSize = parseInt(widgetSize - parseInt(0.15*widgetSize));

        var originalSize = widgetSize;

        widgetSize = newWidgetSize + 15;

        var indexCorrection = 0; // Used for a small correction in radius, which puts the buttons closer together

        var radiusCorrection = 1.2; // X and Y, x starts at -1 so the initial condition is incorrect.

        var y;
        var x = -1.5; // Start at first row

        var r = 1; // Start at index 0

        var i = 0;

        do {
            x = Math.round(widgetSize * Math.cos(0.5 * (i - indexCorrection) * Math.PI / (r + 1))); // px

            y = Math.round(widgetSize * Math.sin(0.5 * (i - indexCorrection) * Math.PI / (r + 1)));
            i++;

            if (x < 0) {
                i--;
                indexCorrection = i;
                radiusCorrection += 0.9;
                r += 1;
            } // Generate every step until we reach *index*

        } while (i <= index);

        x = radiusCorrection * x;
        y = radiusCorrection * y; // Flip menu when on other side
        y = parseFloat(y)-parseFloat(0.15*originalSize);
        if(buttonPosition == "right") {
            x = parseFloat(x) - parseFloat(0.15 * originalSize);
        }

        return [x, y];
    }
    function set_contact_form(channel,buttonId,button) {
        console.log(channel);
        var form_html = "";
        var url = (channel.contact_form_setting.is_redirect == 1) ? channel.contact_form_setting.redirect_url : "";
        var target = (channel.contact_form_setting.is_redirect_new_tab == 1) ? "blank" : "";
        form_html += "<form class='scw-contact-form' id='scw_contact_form_"+buttonId+"' data_target='"+target+"'>";
        form_html += "<div class='scw-form-container'>";
        form_html += "<div class='scw-form-close'><span class='dashicons dashicons-arrow-down-alt2'></span></div>";
        form_html += "<div class='scw-form-title'>"+channel.contact_form_setting.form_title+"</div>";
        form_html += "<div class='scw-form'>";
        form_html += "<div class='scw-form-body'>";
        $.each(channel.contact_form_setting.fields, function (key, val) {
            if(val.is_visible == "1") {
                var is_require = "";
                var require_star = "";
                if(val.is_required == "1") {
                    is_require = "is-require";
                    require_star = "<span> *</span>";
                }
                form_html += "<div class='scw-form-field'>";
                form_html += "<label for='"+buttonId+"contact_form_"+key+"'>"+val.label+ require_star +"</label>";
                if(key == "message") {
                    form_html += "<textarea id='"+buttonId+"contact_form_"+key+"' data-name='"+key+"' name='scw_form_fields["+key+"]' class='scw-field scw-field-"+key+" "+is_require+"' placeholder='"+val.placeholder_text+"'></textarea>";
                } else {
                    form_html += "<input id='"+buttonId+"contact_form_"+key+"' data-name='"+key+"' type='text' name='scw_form_fields["+key+"]' class='scw-field scw-field-"+key+" "+is_require+"' placeholder='"+val.placeholder_text+"' autocomplete='off'>";
                }
                if(val.is_required == "1") {
                    form_html += "<span class='error-msg'>"+val.required_msg+"</span>";
                }
                if(key == "email" ) {
                    form_html += "<span class='error-msg-valid'>Please enter valid email</span>";
                }
                if(key == "phone" ) {
                    form_html += "<span class='error-msg-valid'>Please enter valid Phone</span>";
                }
                form_html += "</div>";
            }
        });
        form_html += "</div>";
        form_html += "<div class='scw-form-btn'>";
        form_html += "<button type='submit'>"+channel.contact_form_setting.btn_text+"</button>";
        form_html += "</div>";
        var is_close_sec = "";
        var is_close = "";
        if(channel.contact_form_setting.is_close_aftr_submit == 1) {
            is_close = "success-close-msg";
            is_close_sec = "data_close_sec='"+channel.contact_form_setting.close_after_sec+"'";
        }
        form_html += "<div class='scw-form-success success-open-msg "+is_close+"' "+is_close_sec+">";
        form_html += channel.contact_form_setting.success_msg;
        form_html += "</div>";
        form_html += "</div>";
        form_html += "</div>";
        form_html += "<input type='hidden' name='action' value='scw_save_form_data'>";

        form_html += "<input type='hidden' name='nonce' value='"+gsb_settings.form_data_nonce+"'>";
        form_html += "<input type='hidden' name='call_back_url' value='"+url+"'>";
        form_html += "<input type='hidden' name='scw_form_fields[page_url]' value='"+window.location.href+"'>";
        form_html += "<input type='hidden' name='scw_form_fields[widget_id]' value='"+buttonId+"'>";
        form_html += "<input type='hidden' name='scw_form_fields[is_from_mobile]' value='"+isInMobile+"'>";

        form_html += "</form>";

        var channelIcon = '<span class="chat-button-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="90" height="90"><path d="M7 4c-.256 0-.512.097-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293C7.512 4.097 7.256 4 7 4z"></path></svg></span>';
        var channelClass = "chat-button-link";
        var channelId = "";
        var tooltip_text = "";
        if(checkForTooltip(button)) {
            tooltip_text = channel.title
        }
        var contact_btn = "<div class='gsb-trigger-contact'>" +
            "<a href='"+channel.href+"' data-scb='"+tooltip_text+"' target='"+channel.target+"' class='scb-tooltip "+channelClass+" gsb-social-channel' id='"+channelId+"' data-channel='"+channel.channel+"'><span class='sr-only'>"+channel.title+"</span>"+channelIcon+"</a>"+
            "</div>";
        $("#gsb-buttons-"+buttonId+" .gsb-trigger .gsb-trigger-button").append(contact_btn);
        $("#gsb-buttons-"+buttonId+" .gsb-trigger .gsb-trigger-button a.channel-contact_form span").removeClass(channelClass);

        var form_css = "<style>";
        form_css += "#gsb-buttons-"+buttonId+" .scw-contact-form .scw-form-btn button { background-color:"+channel.contact_form_setting.btn_bg_color+";color : "+channel.contact_form_setting.btn_color+" }";
        form_css += "#gsb-buttons-"+buttonId+" .scw-contact-form .scw-form-btn button:hover { background-color:"+channel.contact_form_setting.btn_bg_hover_color+";color : "+channel.contact_form_setting.btn_hover_color+" }";
        form_css += "</style>";

        $("head").append(form_css);

        return form_html;

    }

    function set_whatsapp_popup(channel, widgetId,button) {
        var currentDate = new Date();
        var currentMinute = (currentDate.getMinutes() < 10) ? "0"+currentDate.getMinutes() : currentDate.getMinutes();
        var currentHour = (currentDate.getHours() < 10) ? "0"+currentDate.getHours() : currentDate.getHours();
        var current_time = currentHour + ":" + currentMinute;
        var whatsappURL = "";
        if(isInMobile) {
            whatsappURL = "https://wa.me/" + channel.value;
        } else {
            whatsappURL = "https://web.whatsapp.com/send";
        }
        var has_profile_img = "";
        if(channel.whatsapp_popup_setting.user_profile_image == '' ) {
            has_profile_img = "no-user-profile";
        }

        var whatsapp_popup = "";
        whatsapp_popup += '<div class="whatsapp-popup">';
        whatsapp_popup += '<div class="whatsapp-popup-header">';
        whatsapp_popup += '<div class="whatsapp-profile">';
        if(channel.whatsapp_popup_setting.custom_whatsapp_profile != "") {
            whatsapp_popup += '<img src="'+channel.whatsapp_popup_setting.custom_whatsapp_profile+'" alt="Profile image">';
        } else {
            whatsapp_popup += '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none"> <g filter="url(#filter0_f_9477_7201)"> <path d="M9.95924 25.2858L10.3674 25.5276C12.0818 26.545 14.0475 27.0833 16.052 27.0842H16.0562C22.2122 27.0842 27.2221 22.0753 27.2247 15.919C27.2258 12.9357 26.0652 10.1303 23.9565 8.01998C22.9223 6.97924 21.6919 6.15397 20.3365 5.59195C18.9812 5.02992 17.5278 4.74231 16.0606 4.74576C9.89989 4.74576 4.88975 9.75407 4.88756 15.91C4.88453 18.0121 5.47648 20.0722 6.59498 21.852L6.86071 22.2742L5.73223 26.394L9.95924 25.2858ZM2.50586 29.5857L4.41235 22.6249C3.23657 20.5878 2.618 18.2768 2.61873 15.9091C2.62183 8.50231 8.64941 2.47656 16.0564 2.47656C19.6508 2.47839 23.0245 3.87717 25.5618 6.41629C28.0991 8.95542 29.4952 12.3305 29.4939 15.9199C29.4906 23.3262 23.4621 29.353 16.0562 29.353H16.0504C13.8016 29.3521 11.592 28.788 9.62923 27.7177L2.50586 29.5857Z" fill="#B3B3B3"/> </g> <path d="M2.36719 29.447L4.27368 22.4862C3.09587 20.4442 2.47721 18.1278 2.48005 15.7705C2.48316 8.36364 8.51074 2.33789 15.9177 2.33789C19.5121 2.33972 22.8859 3.73849 25.4232 6.27762C27.9605 8.81675 29.3565 12.1918 29.3552 15.7812C29.3519 23.1875 23.3234 29.2143 15.9175 29.2143H15.9117C13.663 29.2134 11.4533 28.6493 9.49056 27.5791L2.36719 29.447Z" fill="white"/> <path d="M15.715 3.84769C9.17146 3.84769 3.85 9.16696 3.84767 15.7051C3.84445 17.9377 4.47318 20.1257 5.66119 22.016L5.94343 22.4646L4.48888 27.2525L9.23469 25.663L9.66824 25.9199C11.4891 27.0005 13.5769 27.5719 15.7061 27.5731H15.7105C22.249 27.5731 27.5705 22.2532 27.573 15.7146C27.5779 14.1562 27.2737 12.6123 26.6778 11.1722C26.082 9.73214 25.2064 8.42458 24.1017 7.3252C23.0032 6.21981 21.6963 5.34329 20.2567 4.74637C18.8171 4.14946 17.2734 3.844 15.715 3.84769Z" fill="#25D366"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0858 9.60401C11.8138 9.00922 11.5276 8.99717 11.2692 8.98687L10.5736 8.97852C10.3316 8.97852 9.93846 9.0679 9.60608 9.42544C9.27369 9.78297 8.33594 10.6471 8.33594 12.4046C8.33594 14.1622 9.63628 15.8605 9.81747 16.0991C9.99866 16.3377 12.3277 20.0594 16.0162 21.4913C19.0813 22.6813 19.705 22.4446 20.3706 22.3852C21.0361 22.3257 22.5175 21.521 22.8197 20.6869C23.1219 19.8527 23.1221 19.138 23.0315 18.9886C22.9409 18.8391 22.6989 18.7503 22.3357 18.5716C21.9725 18.3928 20.1888 17.5287 19.8562 17.4094C19.5236 17.2901 19.2818 17.2308 19.0396 17.5883C18.7975 17.9459 18.1029 18.7501 17.8911 18.9886C17.6793 19.227 17.4679 19.2569 17.1047 19.0783C16.7416 18.8998 15.5731 18.5224 14.1867 17.3054C13.108 16.3585 12.3799 15.1892 12.1679 14.8318C11.9559 14.4745 12.1454 14.2809 12.3274 14.1029C12.4902 13.9428 12.6901 13.6858 12.8719 13.4773C13.0537 13.2688 13.1135 13.1197 13.2343 12.8817C13.3551 12.6437 13.2949 12.4346 13.2041 12.256C13.1133 12.0774 12.4083 10.3105 12.0858 9.60401Z" fill="white"/> <defs> <filter id="filter0_f_9477_7201" x="1.21611" y="1.18682" width="29.5678" height="29.6889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> <feGaussianBlur stdDeviation="0.644873" result="effect1_foregroundBlur_9477_7201"/> </filter> </defs> </svg>';
        }
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-title-section">';
        whatsapp_popup += '<div class="whatsapp-popup-title">'+channel.whatsapp_popup_setting.whatsapp_popup_title+'</div>';
        whatsapp_popup += '<div class="whatsapp-popup-sub-title">'+channel.whatsapp_popup_setting.whatsapp_popup_sub_title+'</div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-close-btn"><span class="dashicons dashicons-arrow-down-alt2"></span></div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-body">';
        if(channel.whatsapp_popup_setting.user_profile_image != '' ) {
            whatsapp_popup += "<img src='"+ channel.whatsapp_popup_setting.user_profile_image +"' class='wp-user-profile-img'>";
        }
        if(channel.whatsapp_popup_setting.whatsapp_popup_text != '') {
            whatsapp_popup += '<div class="whatsapp-chat '+has_profile_img+'">';
            if(channel.whatsapp_popup_setting.user_name_to_display != '') {
                whatsapp_popup += '<div class="whatsapp-chat-user-name">' + channel.whatsapp_popup_setting.user_name_to_display + '</div>';
            }
            whatsapp_popup += '<div class="whatsapp-chat-content">'+ channel.whatsapp_popup_setting.whatsapp_popup_text + '</div>';
            whatsapp_popup += '<div class="whatsapp-chat-time">'+ current_time +'</div>'
            whatsapp_popup += '</div>';
        }
        whatsapp_popup += '</div>';
        whatsapp_popup += '<form class="whatsapp-popup-form" id="whatsapp_popup_form_'+widgetId+'" method="get" autocomplete="off" target="_blank" action="'+whatsappURL+'">'
        whatsapp_popup += '<div class="whatsapp-popup-footer">';
        whatsapp_popup += '<label class="sr-only" for="'+widgetId+'_scw_whatsapp_input">Whatsapp chat</label>';
        whatsapp_popup += '<input type="text" name="text" id="'+widgetId+'_scw_whatsapp_input" class="whatsapp-chat-input" value="'+channel.whatsapp_message+'">';
        whatsapp_popup += '<div class="whatsapp-form-btn">';
        whatsapp_popup += '<button type="submit" class="whatsapp-send-btn">';
        whatsapp_popup += '<svg viewBox="0 0 24 24" height="24" width="24"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path  d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>';
        whatsapp_popup += '<span class="sr-only">Submit</span>'
        whatsapp_popup += '</button>';
        whatsapp_popup += '<input type="hidden" name="phone" value="'+channel.value+'">'
        whatsapp_popup += '</div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '</form>';
        whatsapp_popup += '</div>';

        var channelIcon = '<span class="chat-button-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="90" height="90"><path d="M7 4c-.256 0-.512.097-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293C7.512 4.097 7.256 4 7 4z"></path></svg></span>';
        var channelClass = "chat-button-link";
        var channelId = "";
        var tooltip_text = "";
        if(checkForTooltip(button)) {
            tooltip_text = channel.title
        }
        var contact_btn = "<div class='gsb-trigger-whatsapp-popup'>" +
            "<a href='"+channel.href+"' data-scb='"+tooltip_text+"' target='"+channel.target+"' class='scb-tooltip "+channelClass+" gsb-social-channel' id='"+channelId+"' data-channel='"+channel.channel+"'><span class='sr-only'>"+channel.title+"</span>"+channelIcon+"</a>"+
            "</div>";
        $("#gsb-buttons-"+widgetId+" .gsb-trigger .gsb-trigger-button").append(contact_btn);
        $("#gsb-buttons-"+widgetId+" .gsb-trigger .gsb-trigger-button a.channel-whatsapp span").removeClass(channelClass);

        return whatsapp_popup;
    }

    function set_wechat_popup(channel, widgetId,button) {
        var dots = "";
        if(channel.wechat_popup_setting.wechat_qr_popup_heading != '' && channel.value != '') {
            dots = ": ";
        }
        var wechat_popup = "";
        wechat_popup += '<div class="wechat-popup">';
        wechat_popup += '<div class="wechat-popup-header">';
        wechat_popup += '<div class="wechat-profile">';
        wechat_popup += '<svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 24 24" width="512" style="color: rgb(255, 255, 255); fill: rgb(255, 255, 255);"><path d="M12.82 9.618c-7.242 3.732-2.425 13.745 6.6 11.13.842.327 1.592.857 2.408 1.25-.21-.7-.436-1.412-.676-2.11 2.8-1.995 3.414-4.818 2.38-7.138-1.616-3.677-6.776-5.183-10.72-3.133zm2.53 3.658c-.21.655-1.156.85-1.615.353-.506-.46-.31-1.424.355-1.63.734-.3 1.582.54 1.26 1.277zm4.78.094h.014c-.257.587-1.14.725-1.575.27-.21-.192-.27-.48-.344-.733.104-.46.42-.937.93-.96.705-.098 1.336.776.975 1.422z"></path><path d="M17.414 8.248c-.436-2.144-1.936-3.955-3.824-5h.027v-.001C6.917-.54-1.425 4.742.187 10.97c.433 1.848 1.71 3.397 3.262 4.43-.3.853-.585 1.706-.855 2.565L5.52 16.4c1.17.377 2.415.56 3.66.52-1.538-4.412 2.407-9.086 8.234-8.67zm-6.077-2.56c.785-.316 1.713.345 1.65 1.2L13 6.89c.008.965-1.275 1.567-1.995.913-.747-.538-.535-1.845.342-2.115zM6.932 7.134c-.172.838-1.29 1.243-1.946.68-.76-.537-.546-1.868.345-2.14.873-.338 1.865.552 1.6 1.46z"></path></svg>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-title-section">';
        wechat_popup += '<div class="wechat-popup-title">'+channel.wechat_popup_setting.wechat_qr_popup_heading + dots + channel.value+'</div>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-close-btn"><span class="dashicons dashicons-arrow-down-alt2"></span></div>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-body">';
        if(channel.wechat_popup_setting.wechat_qr_heading != '') {
            wechat_popup += '<div class="wechat-popup-qr-heading">' + channel.wechat_popup_setting.wechat_qr_heading + ':</div>';
        }
        wechat_popup += '<div class="wechat-popup-qr-img">';
        wechat_popup += '<img src="'+channel.wechat_popup_setting.wechat_qr_img+'" alt="wechat QR code">';
        wechat_popup += '</div>';
        wechat_popup += '</div>';
        wechat_popup += '</div>';

        var channelIcon = '<span class="chat-button-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="90" height="90"><path d="M7 4c-.256 0-.512.097-.707.293l-2 2a1 1 0 0 0 0 1.414L11.586 15l-7.293 7.293a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0L15 18.414l7.293 7.293a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414L18.414 15l7.293-7.293a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0L15 11.586 7.707 4.293C7.512 4.097 7.256 4 7 4z"></path></svg></span>';
        var channelClass = "chat-button-link";
        var channelId = "";
        var tooltip_text = "";
        if(checkForTooltip(button)) {
            tooltip_text = channel.title
        }
        var contact_btn = "<div class='gsb-trigger-wechat-popup'>" +
            "<a href='"+channel.href+"' data-scb='"+tooltip_text+"' target='"+channel.target+"' class='scb-tooltip "+channelClass+" gsb-social-channel' id='"+channelId+"' data-channel='"+channel.channel+"'><span class='sr-only'>"+channel.title+"</span>"+channelIcon+"</a>"+
            "</div>";
        $("#gsb-buttons-"+widgetId+" .gsb-trigger .gsb-trigger-button").append(contact_btn);
        $("#gsb-buttons-"+widgetId+" .gsb-trigger .gsb-trigger-button a.channel-wechat span").removeClass(channelClass);

        return wechat_popup;
    }

    function checkForOnHoverText(button) {
        var buttonPosition = getButtonPosition(button);
        if ($("#gsb-buttons-"+button.id).hasClass("single")) {
            var channel_title = $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").attr("data-scb");
            var cta_text = button.settings.call_to_action;
            $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").removeAttr("data-tooltip-dir data-scb");
            $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").removeClass("scb-tooltip cooltipz--visible");
            $(".gsb-trigger .chat-button ").addClass("scb-tooltip cooltipz--visible");
            $("#gsb-buttons-" + button.id + " .gsb-trigger .chat-button.scb-tooltip").attr("data-tooltip-dir", (buttonPosition == "right") ? "left" : "right");
            $("#gsb-buttons-" + button.id + " .gsb-trigger .chat-button").attr("data-hover-scb", channel_title);
            if(checkForTooltip(button)) {
                $("#gsb-buttons-" + button.id + " .gsb-trigger .chat-button").attr("data-scb", cta_text);
            } else {
                $("#gsb-buttons-" + button.id + " .gsb-trigger .chat-button").attr("data-scb", "");
            }

        }
    }

    function checkForTooltip(button) {
        var isShown = true;
        var activeButtons = getActiveButtons(button);
        if(button.settings.show_cta == "first_click" && activeButtons > 1 && button.settings.default_state == "open") {
            isShown = false;
        }
        if(button.settings.show_cta == "first_click" && getCookie("gsb-button-click-"+button.id)) {
            isShown = false;
        }
        return isShown;
    }

    function checkForPendingMessage(button) {
        var isTriggered = getCookie("gsb-button-click-"+button.id);
        if(($("#gsb-buttons-"+button.id+" .gsb-button-list .chat-button").length == 0) || button.settings.has_pending_message == "yes"){
            if(!(isTriggered)) {
                if(button.settings.has_pending_message == "yes") {
                    if ($("#gsb-buttons-"+button.id).hasClass("single")) {
                        $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").append("<span class='gsb-pending-message'>" + button.settings.no_of_messages + "</span>");
                        $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").after("<span class='gsb-pending-message'>" + button.settings.no_of_messages + "</span>");
                    } else {
                        $("#gsb-buttons-"+button.id+" .gsb-trigger .gsb-trigger-top a").append("<span class='gsb-pending-message'>" + button.settings.no_of_messages + "</span>");
                        $("#gsb-buttons-"+button.id+" .gsb-trigger .gsb-trigger-top a").after("<span class='gsb-pending-message'>" + button.settings.no_of_messages + "</span>");
                    }

                    var buttonSize = button.settings.icon_size;
                    var tempString = (buttonSize * 20) / 54;
                    $("#gsb-buttons-"+button.id+" .gsb-pending-message").css({"width":tempString+"px","height":tempString+"px","font-size":(parseInt(tempString / 4) + 5)+"px","color": button.settings.message_text_color,"background-color": button.settings.message_bg_color});

                }
            }
        }
    }

    function checkForAnimation(button) {
        var isTriggered = getCookie("gsb-button-click-"+button.id);
        if(!(isTriggered) ){
            if ($("#gsb-buttons-"+button.id).hasClass("single")) {
                $("#gsb-buttons-"+button.id+" .gsb-trigger .chat-button a").addClass(button.settings.animation);
            } else {
                $("#gsb-buttons-"+button.id+" .gsb-trigger .gsb-trigger-top a").addClass(button.settings.animation);
            }
        }
    }

    function checkForTimeDelay(button) {
        if (button.triggers.after_seconds == "yes") {
            var isTriggered = getCookie("gsb-button-view-"+button.id);
            if(!(isTriggered)) {
                $("#gsb-buttons-" + button.id).hide();
                var pageTimer = parseInt(button.triggers.seconds);
                if (pageTimer > 0) {
                    setTimeout(function () {
                        $("#gsb-buttons-" + button.id).show();
                        setCookie("gsb-button-view-" + button.id, true, 2);
                    }, pageTimer * 1000);
                }
            }
        }
    }

    function checkForPageScroll(button) {
        if (button.triggers.on_scroll == "yes") {
            var isTriggered = getCookie("gsb-button-view-"+button.id);
            if(!(isTriggered)) {
                $("#gsb-buttons-" + button.id).hide();
                var pageScroll = parseInt(button.triggers.page_scroll);
                jQuery(window).scroll(function () {
                    pageScroll = parseInt(button.triggers.page_scroll);
                    var scrollHeight = jQuery(document).height() - jQuery(window).height();
                    var scrollPos = jQuery(window).scrollTop();
                    if (scrollPos != 0) {
                        if (((scrollPos / scrollHeight) * 100) >= pageScroll) {
                            $("#gsb-buttons-" + button.id).show();
                            setCookie("gsb-button-view-" + button.id, true, 2);
                        }
                    }
                });
            }
        }
    }

    function checkForExitIntent(button) {
        /* Exit intent functionality */
        if (button.triggers.exit_intent == "yes") {
            if (button.triggers.browser == "yes") {
                var isTriggered = getCookie("gsb-button-view-"+button.id);
                if(!(isTriggered)) {
                    $("#gsb-buttons-" + button.id + "").hide();
                    var position = getButtonPosition(button);
                    exitIntentEvent(document, 'mouseout', function (evt) {
                        if (evt.toElement == null && evt.relatedTarget == null) {
                            if (!widgetStatus) {
                                $("#gsb-buttons-" + button.id + "").show();
                                $("#gsb-buttons-" + button.id + "").append("<div class='exit-intent'></div>");
                                if (position == "left") {
                                    $("#gsb-buttons-" + button.id + " .exit-intent").addClass("left-position");
                                } else {
                                    $("#gsb-buttons-" + button.id + " .exit-intent").addClass("right-position");
                                }
                                if (!$("#gsb-buttons-" + button.id + "").hasClass("single-btn")) {
                                    $("#gsb-buttons-" + button.id + " .main-button").trigger("click");
                                }
                                setTimeout(function () {
                                    $("#gsb-buttons-" + button.id + " .exit-intent").addClass("active");
                                    setTimeout(function () {
                                        $("#gsb-buttons-" + button.id + " .exit-intent").removeClass("active");
                                    }, 2000);
                                }, 100);
                                widgetStatus = true;
                                setCookie("gsb-button-view-" + button.id, true, 2);
                            }
                        }
                    });
                }
            }
            if (button.triggers.on_inactivity == "yes") {
                var isTriggered = getCookie("gsb-button-view-"+button.id);
                if(!(isTriggered)) {
                    $("#gsb-buttons-" + button.id + "").hide();
                    idleInterval = setInterval(function () {
                        idleTimerFN(button);
                    }, 1000);
                    $(document).on("mousemove", function (e) {
                        idleTimer = 0;
                    });
                    $(document).on("keyup", function (e) {
                        idleTimer = 0;
                    });
                }
            }
        }
    }

    function idleTimerFN(button) {
        idleTimer = idleTimer + 1;
        //console.log(idleTimer)
        var isTriggered = getCookie("gsb-button-view-"+button.id);
        if(!(isTriggered)) {
            $("#gsb-buttons-" + button.id + "").hide();
            if (idleTimer > 59) {
                if (!widgetStatus) {
                    var position = getButtonPosition(button);
                    $("#gsb-buttons-" + button.id + "").show();
                    $("#gsb-buttons-" + button.id + "").append("<div class='exit-intent'></div>");
                    if (position == "left") {
                        $("#gsb-buttons-" + button.id + " .exit-intent").addClass("left-position");
                    } else {
                        $("#gsb-buttons-" + button.id + " .exit-intent").addClass("right-position");
                    }
                    if (!$("#gsb-buttons-" + button.id + "").hasClass("single-btn")) {
                        $("#gsb-buttons-" + button.id + " .main-button").trigger("click");
                    }
                    setTimeout(function () {
                        $("#gsb-buttons-" + button.id + " .exit-intent").addClass("active");
                        setTimeout(function () {
                            $("#gsb-buttons-" + button.id + " .exit-intent").removeClass("active");
                        }, 2000);
                    }, 100);
                    widgetStatus = true;
                    setCookie("gsb-button-view-" + button.id, true, 2);
                }
                window.clearInterval(idleInterval);
            }
        }
    }

    function getButtonPosition(button) {
        if(button.settings.position == "custom") {
            return button.settings.custom_position;
        }
        return button.settings.position;
    }

    function getTooltipPosition(button) {
        if(button.settings.menu_view == "vertical") {
            var buttonPos = getButtonPosition(button);
            if(buttonPos == "right") {
                return "left";
            } else {
                return "right";
            }
        }
        return "top";
    }

    function getChannelSetting(channel, buttonId) {
        var channelURL = getChannelURL(channel, buttonId);
        return channelURL;
    }

    function getChannelURL(channel, buttonId) {
        if(channel.channel == "whatsapp" && !isDesktop) {
            if(channel.whatsapp_message != "") {
                channel.href = "https://wa.me/"+channel.value+"?text="+channel.whatsapp_message;
            } else {
                channel.href = "https://wa.me/"+channel.value;
            }
            channel.target = "";
        }
        if(channel.channel == "whatsapp" && channel.whatsapp_popup_setting.show_whatsapp_popup == 'yes') {
            channel.href = "javascript:;";
            channel.target = "";
        }
        var channelIcon = getChannelIcon(channel, buttonId);
        var channelClass = "channel-"+channel.channel+" chat-button-link button-link-"+channel.channel+"-"+buttonId;
        if(channel.channel == "instagram" && channel.bg_hover_color == "#df0079") {
            channelClass += " default-insta-hover";
        }
        var channelId = "chat-button-"+channel.channel+"-"+buttonId;
        if(channel.custom_class != "") {
            channelClass += " "+$.trim(channel.custom_class);
        }
        if(channel.custom_id != "") {
            channelId = $.trim(channel.custom_id);
        }
        if((channel.channel != 'instagram')  || (channel.channel == "instagram" && channel.bg_color != "#df0079")) {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + " {background: " + channel.bg_color + "; color: " + channel.text_color + "; }";
        }
        if(channel.channel == 'twitter' && (channel.bg_color == '#65BBF2' || channel.bg_color == '#65bbf2')) {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + " {background: #000000; color: " + channel.text_color + "; }";
        }
        if((channel.channel != 'instagram')  || (channel.channel == "instagram" && channel.bg_hover_color != "#df0079")) {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + ":hover, #gsb-buttons-" + buttonId + " .list-channel a:hover .channel-" + channel.channel + " {background: " + channel.bg_hover_color + "; color: " + channel.text_hover_color + "; }";
        }
        if(channel.channel == 'twitter' && (channel.bg_hover_color == '#65BBF2' || channel.bg_hover_color == '#65bbf2')) {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + ":hover {background: #000000; color: " + channel.text_hover_color + "; }";
        }
        customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + " svg {fill: " + channel.text_color + "; color: " + channel.text_color + "; }";
        customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + ":hover svg, #gsb-buttons-" + buttonId + " .list-channel a:hover .channel-" + channel.channel + " svg {fill: " + channel.text_hover_color + "; color: " + channel.text_hover_color + "; }";

        if(channel.channel == "slack" && channel.text_color != "#ffffff") {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + ":not(:hover) svg path {fill: " + channel.text_color + "; }";
        }
        if(channel.channel == "slack" && channel.text_hover_color != "#ffffff") {
            customCSS += "#gsb-buttons-" + buttonId + " .channel-" + channel.channel + ":hover svg path {fill: " + channel.text_hover_color + "; color: " + channel.text_hover_color + "; }";
        }

        var menu_title = "";
        var tooltip_title = channel.title;
        if($("#gsb-buttons-"+buttonId+" .gsb-button-list").hasClass("menu_view")) {
            menu_title = "<div class='menu-view-title'>"+channel.title+"</div>";
            tooltip_title = "";
        }

        var icon_html_new = "";
        if($("#gsb-buttons-"+buttonId).hasClass("view-list")) {
            return "<div class='list-channel-container'><div class='chat-button list-channel'><a href='"+channel.href+"' data-scb='"+channel.title+"' target='"+channel.target+"' class='gsb-social-channel' id='"+channelId+"' data-channel='"+channel.channel+"'>"+channelIcon+"<div class='list-channel-title'>"+channel.title+"</div></a></div></div>";
        } else {
            return "<div class='chat-button'><a href='"+channel.href+"' data-scb='"+tooltip_title+"' target='"+channel.target+"' class='scb-tooltip "+channelClass+" gsb-social-channel' id='"+channelId+"' data-channel='"+channel.channel+"'><span class='sr-only'>"+channel.title+"</span>"+channelIcon+""+menu_title+"</a></div>";
        }
    }

    function getChannelIcon(channel, buttonId) {
        var channelClass = "";
        if($("#gsb-buttons-"+buttonId).hasClass("view-list")) {
         channelClass = "channel-"+channel.channel+" chat-button-link button-link-"+channel.channel+"-"+buttonId;
            if(channel.custom_class != "") {
                channelClass += " "+$.trim(channel.custom_class);
            }
            if(channel.channel == "instagram" && channel.bg_hover_color == "#df0079") {
                channelClass += " default-insta-hover";
            }
        }
        var channelIcon = "<span class='chat-button-icon "+channelClass+" chat-button-"+channel.channel+"-"+buttonId+"'>";
        if(channel.image_url != "") {
            channelIcon += "<img src='"+channel.image_url+"' alt='"+channel.title+"' />";
        } else {
            channelIcon += channel.icon;
        }
        channelIcon += "</span>";
        return channelIcon;
    }

    function getActiveButtons(button){
        var activeButtons = 0;
        if(button.channels.length) {
            $.each(button.channels, function (key, channel){
                if(isChannelActive(channel)) {
                    activeButtons++;
                }
            });
        }
        return activeButtons;
    }

    function isChannelActive(channel) {
        if(channel.channel == "contact_form") {
            channel.value = "123";
        }
        if(channel.value != "" && ((isDesktop && channel.for_desktop == 'yes') || (!isDesktop && channel.for_mobile == 'yes'))) {
            return true;
        }
        return false;
    }

    /* set menu height for small windows */
    function setStickyWidgetMenu() {
        if($(".ginger-front-buttons").length && $(".sticky-button-list").length && $(".sticky-button-list .channel-btn").length && $(".ginger-front-buttons .cta-button").length) {
            $(".sticky-button-list .button-list").attr("style","");
            $(".sticky-button-list .button-list").removeClass("has-grid-layout");
            /* check for current position */
            var currentPos = parseInt(gsb_settings.icon_size)+parseInt(gsb_settings.bottom);
            if($(".sticky-button-list .button-list .channel-btn").length > 2) {
                console.log(parseInt($(".sticky-button-list .button-list .channel-btn").length)*(parseInt(gsb_settings.icon_size)+5));
                currentPos += parseInt($(".sticky-button-list .button-list .channel-btn").length)*(parseInt(gsb_settings.icon_size)+5);
                if(currentPos >= $(window).height()) {
                    /* set height of menu */
                    var contentWidth = Math.floor(Math.sqrt(parseInt($(".sticky-button-list .button-list .channel-btn").length)));
                    contentWidth = (parseInt(gsb_settings.icon_size)+5)*contentWidth;
                    $(".sticky-button-list .button-list").height(contentWidth);

                    /* set width of menu */
                    contentWidth = Math.ceil(Math.sqrt(parseInt($(".sticky-button-list .button-list .channel-btn").length)));
                    contentWidth = (parseInt(gsb_settings.icon_size)+5)*contentWidth;
                    $(".sticky-button-list .button-list").width(contentWidth);

                    $(".sticky-button-list .button-list").addClass("has-grid-layout");
                    $(".sticky-button-list .button-list").css("bottom", (parseInt(gsb_settings.icon_size)+5)+"px");
                    $(".sticky-button-list .button-list .ginger-social-channel").attr("data-ginger-tooltip-location", "top");
                } else {

                }
            }
        }
    }

    function exitIntentEvent(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }
    }

    /* Global Cookie Functions for Read, Write and Remove  */
    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    function setCookie(name, value, hours) {
        var d = new Date;
        d.setTime(d.getTime() + 60*60*1000*hours);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    function deleteCookie(name) {
        setCookie(name, '', -1);
    }
})(jQuery);

function show_sticky_chat_widget(widgetId) {
    if (typeof(widgetId) != "undefined") {
        if (jQuery("#gsb-buttons-" + widgetId).length) {
            jQuery("#gsb-buttons-" + widgetId).addClass("active").addClass("open-buttons");
        }
    } else {
        jQuery(".gsb-buttons:eq(0)").addClass("active").addClass("open-buttons");
    }
}

function hide_sticky_chat_widget() {
    jQuery(".gsb-buttons").removeClass("open-buttons");
}