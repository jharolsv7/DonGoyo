(function($) {
    "use strict";
    var animationActiveClass = "";
    var thisElementVal = "";
    var isAJAXinAction = 0;
    var thisElementSlug = "";
    var tempString = "";
    var inlineCSS = "";
    var channelString = "";
    var regExpression = "";
    var selectedDevice = "desktop";
    var animationInterval;
    var animationClass = "ginger-menu-fade";
    var menuView = "";
    var errorCounter = 0;
    var errorMessage = "";
    var formStatus = false;
    var id = 0;
    var country_list = "";
    var buttonPressed = "";
    var previewPopup = false;
    var formOptions = {
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse
    };
    /* Color Picker */
    var colorOptions = {
        change: setColorChanges,
        hide: true,
        palettes: true
    };
    $(document).ready(function(){
        $(document).on("click", ".sticky-help-button button, .open-help-form", function(e){
            e.stopPropagation();
            if($(".sticky-help-form").hasClass("active")) {
                $(".sticky-help-form").removeClass("active");
            } else {
                $(".sticky-help-form").addClass("active");
                $(".sticky-help-form #name").focus();
            }
        });
        $(document).on("click", ".hide-help-form", function(){
            $(".sticky-help-form").removeClass("active");
        });
        $(document).on("submit", "#help_form_new", function(e){
            console.log("123");
            errorCounter = 0;
            $(this).find(".ginger-error-message").remove();
            $(this).find(".ginger-input-error").removeClass("ginger-input-error");
            $(this).find(".is-required").each(function(){
                if($(this).val() == "" || $(this).val() == "0") {
                    tempString = $(this).attr("data-label");
                    errorMessage = BUTTON_SETTINGS.required_message;
                    errorMessage = errorMessage.replace("%s", tempString);
                    $(this).after("<span class='ginger-error-message'>"+errorMessage+"</span>");
                    $(this).addClass("ginger-input-error");
                    errorCounter++;
                }
            });

            if(errorCounter == 0) {
                $("#ajax-loader").addClass("active");
                $(".ginger-form-field .ginger-form-button").attr("disabled", true);
                $.ajax({
                    url: BUTTON_SETTINGS.ajax_url,
                    data: $("#help_form_new").serialize(),
                    type: 'post',
                    success: function(response) {
                        $("#ajax-loader").removeClass("active");
                        $(".ginger-form-field .ginger-form-button").attr("disabled", false);
                        response = $.parseJSON(response);
                        if(response.errors.length > 0) {
                            for(var i=0; i<response.errors.length; i++) {
                                $("#"+response.errors[i]['key']).addClass("ginger-input-error");
                                $("#"+response.errors[i]['key']).after("<span class='ginger-error-message'>"+response.errors[i]['message']+"</span>");
                            }
                        } else if(response.status == 0) {
                            $(".ajax-response").html(response.message);
                            $(".ajax-response").addClass("error").removeClass("success").show();
                        } else if(response.status == 1) {
                            $(".ajax-response").html(response.message);
                            $(".ajax-response").addClass("success").removeClass("error").show();
                            $("#help_form_new .gp-form-field .gp-form-input input, #help_form_new .gp-form-field .gp-form-input textarea").val("");
                        }
                    }
                })
            } else {
                $(this).find(".ginger-input-error:first").focus();
            }
            return false;
        });

        $(document).on("submit", "#ginger_sb_form", function(){
            errorCounter = 0;
            $(this).find(".ginger-error-message").remove();
            $(this).find(".ginger-input-error").removeClass("ginger-input-error");
            $(".gp-modal-content").addClass("form-loading");
            $(this).find(".is-required").each(function(){
                if($(this).val() == "" || $(this).val() == "0") {
                    tempString = $(this).attr("data-label");
                    errorMessage = BUTTON_SETTINGS.required_message;
                    errorMessage = errorMessage.replace("%s", tempString);
                    $(this).closest(".gp-form-input").append("<span class='ginger-error-message'>"+errorMessage+"</span>");
                    $(this).addClass("ginger-input-error");
                    errorCounter++;
                }
            });

            if($(document.activeElement).text() == "Save and View Dashboard") {
                $("#save_btn_type").val("save-view-btn");
            } else {
                $("#save_btn_type").val("save-btn");
            }

            if(errorCounter == 0) {
                var widgetStatus = $(this).find("#check_widget_status").val();
                $(".gp-modal-content").removeClass("form-loading");
                console.log(widgetStatus)
                if(widgetStatus == "no") {
                    if(formStatus) {
                        $(this).ajaxSubmit(formOptions);
                    } else {
                        $(".form-confirmation").show();
                        $(".save-confirm-btn").focus();
                        return false;
                    }
                } else {
                    $(this).ajaxSubmit(formOptions);
                }
            } else {
                if($(".gsb-settings input").hasClass("ginger-input-error")) {
                    $(".setting-tab").removeClass("active");
                    $(".widget-sidebar ul li a").removeClass("active");
                    $("#channel-settings").addClass("active");
                    $(".widget-sidebar").find("ul li a[href='#channel-settings']").addClass("active");
                    $(this).find(".ginger-input-error:first").focus();
                }
                if($(this).find(".ginger-input-error:first").hasClass("contact-btn-text")) {
                    $(".gsb-settings.contact-form-li").addClass("active");
                    $(this).find(".ginger-input-error:first").focus();
                }
                if($(this).find(".ginger-input-error:first").hasClass("toggle-field-required")) {
                    $(this).find(".ginger-input-error:first").closest(".toggle-field-content").show();
                    $(this).find(".ginger-input-error:first").focus();
                }
                //const swipeHandler = new SwipeHandler();
                //const toastsHandler = new ToastsHandler(swipeHandler);
                //toastsHandler.createToast({
                //    type: "error",
                //    icon: "info-circle",
                //    message: "Some values are missing",
                //    duration: 5000
                //});
            }
            return false;
        });

        $(document).on("click", ".save-confirm-btn", function(){
            $(this).closest("#ginger_sb_form").find("#check_widget_status").val("yes");
            formStatus = true;
            $("#ginger_sb_form").trigger("submit");
            $(".form-confirmation").hide();
        });

        $(document).on("click", ".no-confirm-btn", function(){
            formStatus = true;
            $("#ginger_sb_form").trigger("submit");
            $(".form-confirmation").hide();
        });

        $(document).on("blur",".is-required", function(){
            if($(this).val() == "") {
                if(!$(this).hasClass("ginger-input-error")) {
                    tempString = $(this).attr("data-label");
                    errorMessage = BUTTON_SETTINGS.required_message;
                    errorMessage = errorMessage.replace("%s", tempString);
                    $(this).closest(".gp-form-input").append("<span class='ginger-error-message'>" + errorMessage + "</span>");
                    $(this).addClass("ginger-input-error");
                }
            } else {
                $(this).removeClass("ginger-input-error");
                $(this).closest(".gp-form-field").find(".ginger-error-message").remove();
            }
        });

        $("#ginger_sb_form input[name='ginger_sb_position']").on("change", function(){
            thisElementVal = $(this).val();
            if(thisElementVal == "custom") {
                $("#custom-position").addClass("active");
            } else {
                $("#custom-position").removeClass("active");
            }
        });

        $(document).on("click", "input[name='trigger_rules[on_scroll]']", function (){
            if($(this).is(":checked")) {
                $("input[name='trigger_rules[page_scroll]']").prop("disabled", false);
            } else {
                $("input[name='trigger_rules[page_scroll]']").prop("disabled", true);
            }
        });

        $(document).on("click", "input[name='trigger_rules[after_seconds]']", function (){
            if($(this).is(":checked")) {
                $("input[name='trigger_rules[seconds]']").prop("disabled", false);
            } else {
                $("input[name='trigger_rules[seconds]']").prop("disabled", true);
            }
        });


        /* Set Animation */
        $(document).on("change","#ginger_sb_animation", function(){
            tempString = $(this).attr("data-class");
            if($("#default_state_click").is(":checked")) {
                $(".cta-button").removeClass(tempString);
                $(".single-btn .channel-btn a").removeClass(tempString);
            } else {
                if(tempString) {
                    $(".cta-button").removeClass(tempString);
                    $(".single-btn .channel-btn a").removeClass(tempString);
                }
                $(this).attr("data-class",$(this).val());
                $(".cta-button").addClass($(this).val());
                $(".single-btn .channel-btn a").addClass($(this).val());
            }
        });
        $("#ginger_sb_animation").trigger("change");

        /* Set Menu Animation */
        /*$(document).on("change","#ginger_menu_animation", function(){
            if(animationClass != "") {
                $(".button-list").removeClass(animationClass);
            }
            animationClass = $(this).val();
            setSocialButtonPreview();
        });*/

        /*$(document).on("change",".ginger-menu-view", function(){
            if(menuView != "") {
                $(".button-list").removeClass(menuView);
            }
            menuView = $(this).val();
            setSocialButtonPreview();
        });*/

        //$("#ginger_menu_animation").trigger("change");

        $(document).on("change", "#ginger_sb_form input[type='radio']", function () {
            if ($(this).closest(".ginger-color-list").length) {
                if ($(this).val() == "custom_color") {
                    $(this).closest(".ginger-form-right").find(".custom-color-for-element").addClass("active");
                } else {
                    $(this).closest(".ginger-form-right").find(".custom-color-for-element").removeClass("active");
                }
            }
        });

        $(".custom-color-picker").wpColorPicker(colorOptions);

        if ($("#wpadminbar").hasClass("mobile")) {
            $(".gp-sticky-box").addClass("mobile");
        }
        make_header_scticky();

        $(document).on("click",".remove-channel-setting", function(e){
            thisElementSlug = $(this).closest(".gsb-settings").data("button");
            $("#social-buttons-"+thisElementSlug+"-settings").remove();
            $("#social-icon-"+thisElementSlug).removeClass("active");

            saveChannelOrder();
        });

        $(document).on("click",".load-channel-settings", function(e){
            $(this).closest(".gsb-settings").toggleClass("active");
            if($(this).closest("li.gsb-settings.active").find(".pro-settings").length) {
                $("html, body").animate({
                    scrollTop: $(this).closest("li.gsb-settings.active").find(".pro-settings").offset().top - 50
                }, 1000);
            }
        });

        $(document).on("click", ".contact-form-more-setting", function (){
            $(this).closest(".gsb-settings").addClass("active");
            if($(this).closest("li.gsb-settings.active").find(".contact-form-setting").length) {
                $("html, body").animate({
                    scrollTop: $(this).closest("li.gsb-settings.active").find(".contact-form-setting").offset().top - 50
                }, 1000);
            }
            var field_name = $(this).data("tab");
            $(".contact-form-setting .tab-section, .contact-form-setting .tab-setting-section").removeClass("active");
            $("."+field_name+", #"+field_name).addClass("active");
        });

        $(document).on("click","#social-links-options li", function(e){
            var current_channel = $(this).data("social");
            e.stopPropagation();
            thisElementSlug = $(this).data("social");
            $(this).addClass("check-loader");
            $(this).find(".channel-loader").addClass("active");
            if($(this).hasClass("active")) {
                $(this).removeClass("active");
                $("#social-buttons-"+thisElementSlug+"-settings").remove();
                $("#social-links-options li").removeClass("check-loader");
                $(".channel-loader").removeClass("active");
                saveChannelOrder();
            } else {
                var activeChannels = $("#social-links-options li.active").length;
                if (!isAJAXinAction) {
                    $(this).addClass("active");
                    var postId = $("#button_setting_id").val();
                    isAJAXinAction = 1;
                    $.ajax({
                        url: ajaxurl,
                        data: {
                            button: thisElementSlug,
                            postId: postId,
                            action: 'get_gb_settings'
                        },
                        type: 'post',
                        cache: false,
                        success: function (response) {
                            isAJAXinAction = 0;
                            response = $.parseJSON(response);
                            if (response.status == "1") {
                                $("#social-links-options li").removeClass("check-loader");
                                $(".channel-loader").removeClass("active");
                                $("#social-buttons-" + thisElementSlug + "-settings").remove();
                                $(".selected-button-settings").append(response.message);
                                $(".selected-button-settings li.gsb-settings:last-child a.load-channel-settings").trigger("click");
                                if(current_channel != "phone" && current_channel != "whatsapp" && current_channel != "sms") {
                                    $(".selected-button-settings .gsb-input-value:last input").focus();
                                }

                            }
                            saveChannelOrder();
                            $(".color-picker:not(.wp-color-picker)").wpColorPicker(colorOptions);
                            setCountryDropdown();
                            initializeEditor();
                        }
                    })
                }
            }
        });

        $(document).on("keyup",".widget-settings input",function(){
            setSocialButtonPreview();
        });
        $(document).on("keyup",".widget-settings textarea",function(){
            setSocialButtonPreview();
        });

        $(document).on("change",".widget-settings input, .widget-settings select, .preview-button",function(){
            setSocialButtonPreview();
        });

        $(document).on("keyup",".country-list-input input",function(){
            //country_list = BUTTON_SETTINGS.countries;
            var inputVal = $(this).val();
            //console.log(inputVal);
            if($.trim(inputVal) != "") {
                inputVal = inputVal.toLowerCase();
                $(".select-country > ul > li").each(function(){
                    if(($(this).text().toLowerCase()).indexOf(inputVal) == 0) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            } else {
                $(".select-country > ul > li").show();
            }
        });

        $(document).on("keyup",".selected-country-input input",function(){
            //country_list = BUTTON_SETTINGS.countries;
            var inputVal = $(this).val();
            //console.log(inputVal);
            if($.trim(inputVal) != "") {
                inputVal = inputVal.toLowerCase();
                $(".selected-country > ul > li").each(function(){
                    if(($(this).text().toLowerCase()).indexOf(inputVal) == 0) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            } else {
                $(".selected-country > ul > li").show();
            }
        });

        $(document).on("click",".add-country",function(){
            var find_val = $(this).closest('li').text();
            $(this).closest('li').addClass('hide');
            var dataCountry = $(this).closest('li').data('country');
            $(".selected-country ul").append("<li data-country='"+dataCountry+"' class='country-list'>"+find_val+"<span class='right remove-country'><i class='fa fa-minus-circle' aria-hidden='true'></i></span></li> <input type='hidden' id='country-name-"+dataCountry+"' name='gsb_country_rules[selected_country][]' value='"+dataCountry+"'>");
        });

        $(document).on("click",".remove-country",function(){
            var dataCountry = $(this).closest('li').data('country');
            $("#county-"+dataCountry).removeClass("hide");
            var country_input = $("#country-name-"+dataCountry).val();
            if(country_input == dataCountry){
                $("#country-name-"+dataCountry).remove();
            }
            $(this).closest("li").remove();
        });

        $(document).on("click","input[type='checkbox']",function(){
            setSocialButtonPreview();
        });

        for(var cIndex = 0; cIndex < 7; cIndex++) {
            if($("#time-range-"+cIndex).length) {
                $("#time-range-" + cIndex).slider({
                    range: true,
                    min: 0,
                    max: 1439,
                    values: [0, 1439],
                    slide: function (event, ui) {
                        var cIndex = $(ui.handle).closest(".weekday-input").attr("data-index");
                        var startTime = addLeadingZero(parseInt(ui.values[0]/60), 2)+":"+addLeadingZero((ui.values[0]%60),2);
                        var endTime = addLeadingZero(parseInt(ui.values[1]/60), 2)+":"+addLeadingZero((ui.values[1]%60),2);
                        $(".start-time_" + cIndex).text(startTime);
                        $(".end-time_" + cIndex).text(endTime);
                        $("#start_time_" + cIndex).val(ui.values[0]);
                        $("#end_time_" + cIndex).val(ui.values[1]);
                    }
                });
            }
        }

        /*sort channels*/
        $(".selected-button-settings").sortable({
             placeholder: "social-chat-buttons-channel-placeholder",
             handle: ".gsb-free-settings",
             start: function (event, ui) {
                 $(".position-icon a").addClass("grabbing");
             },
             stop: function (event, ui) {
                 $(".position-icon a").removeClass("grabbing");
                 initializeEditor();
             },
             update: function (event, ui) {
                 $(".position-icon a").removeClass("grabbing");
                 saveChannelOrder();
                 setSocialButtonPreview();
                 initializeEditor();
             }
        });

        /* CTA Click event */
        $(document).on("click", ".main-button.channel-btn .gsb-main-action-button, .main-button.channel-btn .close-gsb-action-button", function(){
            $(".ginger-sticky-buttons").removeClass("has-no-animation");
            //window.clearInterval(animationInterval);
            if(!$(".ginger-sticky-buttons").hasClass("menu-open")) {
                $(".ginger-sticky-buttons").addClass("menu-open");
                $(".button-list").addClass(animationClass);
                $(".main-button").removeClass("active-tooltip");
                $(".main-button").addClass("hide-tooltip");
                //animationInterval = setInterval(function () {
                    $(".button-list .channel-btn:not(.active)").addClass("active");
                    if ($(".button-list .channel-btn:not(.active)").length == 0) {
                        //window.clearInterval(animationInterval);
                    }
                //}, 100);
            } else {
                //animationInterval = setInterval(function () {
                    $(".button-list .channel-btn.active").removeClass("active");
                    //if ($(".button-list .channel-btn.active").length == 0) {
                        //window.clearInterval(animationInterval);
                        //setTimeout(function() {
                            $(".ginger-sticky-buttons").removeClass("menu-open");
                            $(".button-list").removeClass(animationClass);
                            $(".main-button").removeClass("hide-tooltip");
                            $(".main-button").addClass("active-tooltip");
                        //}, 1000);
                    //}
                //}, 100);
                if($("#default_state_click").is(":checked")) {
                    $(".cta-button").removeClass($("#ginger_sb_animation").val());
                } else {
                    $(".cta-button").addClass($("#ginger_sb_animation").val());
                }
            }
        });

        $(document).on("change", ".only-numeric", function(){
            regExpression = /^[0-9]+$/;
            var nValue = $(this).val();
            if (nValue.match(regExpression)) {

            } else {
                $(this).val(nValue.replace(/\D/g, ""));
            }
        });

        $(document).on("keyup", ".only-numeric", function(){
            regExpression = /^[0-9]+$/;
            var nValue = $(this).val();
            if (nValue.match(regExpression)) {

            } else {
                $(this).val(nValue.replace(/\D/g, ""));
            }
        });

        $(".color-picker").wpColorPicker(colorOptions);

        /* load font */
        /*$(document).on("change", "#ginger_sb_font_family", function(){
            $("#gsb-google-font").remove();
            var font_family = $(this).val();
            if(font_family != "" && font_family != "Arial" && font_family != "Tahoma" && font_family != "Verdana" && font_family != "Helvetica" && font_family != "Times New Roman" && font_family != "Trebuchet MS" && font_family != "Georgia") {
                $("head").append("<link id='gsb-google-font' href='https://fonts.googleapis.com/css?family="+ $(this).val() +"' rel='stylesheet' type='text/css' >");
            }
            if(font_family == "") {
                $(".ginger-sticky-buttons").css("font-family", "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif");
            } else {
                $(".ginger-sticky-buttons").css("font-family", $(this).val());
            }
        });
        $("#ginger_sb_font_family").trigger("change");*/

        setColorChanges();

        // $(document).on("change", "input[name='device_switch']", function(){
        //     setSocialButtonPreview();
        // });
        //
        // $(document).on("change", "input[name='preview_device_switch']", function (){
        //     setPreviewPopup();
        // });

        $(document).on("change", "input[type='radio']", function(){
            setSocialButtonPreview();
        });

        $(document).on("click", ".upgrade-link, a.ginger-link, .ginger-upgrade-link, .img-upgrade-btn.disabled , .upgrade-link-btn", function(e){
            e.preventDefault();
            $("#premium-features").show();
        });

        $(document).on("click", ".ginger-popup-content", function(e){
            e.stopPropagation();
        });

        $(document).on("click", ".close-ginger-popup, .ginger-popup-box-bg", function(e){
            e.preventDefault();
            $("#premium-features").hide();
            $("#pro-features").hide();
        });

        $(document).on("click", ".remove-rule", function(e){
            $(this).closest(".page-rule").remove();
        });

        $(document).on("click", ".gp-modal-bg, .gp-modal-close-btn, .hide-gp-modal", function() {
            $(this).closest(".gp-modal").removeClass("active");
            $(".form-confirmation").hide();
        });

        $(document).on("click", ".sticky-chat-widget-status", function(){
            var isChecked = $(this).is(":checked")?"yes":"no";
            $.ajax({
                url: BUTTON_SETTINGS.ajax_url,
                data: {
                    setting_id: $(this).closest("tr").data("id"),
                    nonce: $(this).closest("tr").data("nonce"),
                    status: isChecked,
                    action: "gsb_buttons_change_status"
                },
                type: 'post'
            });
        });

        $(document).on("click", ".pro-premium-features", function(){
            $("#pro-features").show();
        });

        $(document).on("click", ".close-ginger-popup, .ginger-popup-box-bg", function(){
            $("#premium-features").hide();
        });

        $(document).on("click", ".remove-widget", function(){
            id = $(this).closest("tr").data("id");
            $("#delete-widget").addClass("active");
        });

        $(document).on("click", "#delete_widget:not(.disabled)", function(e){
            $(this).addClass("disabled");
            $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
            e.preventDefault();
            $.ajax({
                url: BUTTON_SETTINGS.ajax_url,
                data: {
                    widget_id: id,
                    nonce: $("tr.gsb-buttons-col-"+id).data("nonce"),
                    action: "gsb_buttons_remove_widget"
                },
                type: 'post',
                success: function(responseText) {
                    $("#delete-widget").removeClass("active");
                    $("#delete_widget").removeClass("disabled");
                    $(this).closest(".gp-modal").find(".gp-modal-content").removeClass("form-loading");
                    responseText = $.parseJSON(responseText);
                    const swipeHandler = new SwipeHandler();
                    const toastsHandler = new ToastsHandler(swipeHandler);
                    if(responseText.status == 1) {
                        $("tr.gsb-buttons-col-"+id).remove();
                        toastsHandler.createToast({
                            type: "success",
                            icon: "info-circle",
                            message: responseText.message,
                            duration: 5000
                        });
                        setTimeout(function(){
                            window.location.reload();
                        },1000);
                    } else {
                        $(".save-changes").prop("disabled", false);
                        toastsHandler.createToast({
                            type: "error",
                            icon: "info-circle",
                            message: responseText.message,
                            duration: 5000
                        });
                    }
                }
            });
        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $(".gp-modal").removeClass("active");
                $(".ginger-popup-box").hide();
                $(".form-confirmation").hide();
            }
        });

        $(document).on("click", ".preview-btn", function(){
            $("#preview_widget").addClass("active");
        });

        $(document).on("click", ".dropdown-button", function(e){
            e.stopPropagation();
            $(this).closest(".action-col").toggleClass("active");
        });

        $(document).on("click", "body, html", function(e){
            $(".action-col").removeClass("active");
            $(".sticky-help-form").removeClass("active");
        });

        $(document).on("click", ".sticky-help-form", function (e){
            e.stopPropagation();
        });

        $(document).on("click", ".add-new-widget", function (){
            $("#create-widget").addClass("active");
            $("#create-widget .gp-form-input input").focus();
        });

        if(BUTTON_SETTINGS.show_popup == 1 && BUTTON_SETTINGS.isSettingExists != 1) {
            $("#create-widget").addClass("active");
            $("#create-widget .gp-form-input input").focus();
            $("#create-widget .gp-form-input input").val("Widget #1");
        } else if (BUTTON_SETTINGS.show_popup == 1 && BUTTON_SETTINGS.isSettingExists == 1) {
            $("#pro-features").show();
        }

        $(document).on("click", "#create_widget:not(.disabled)", function(e){
            var errorCount = 0;
            $(this).closest(".gp-modal-data").find(".ginger-error-message").remove();
            $(this).closest(".gp-modal-data").find(".ginger-input-error").removeClass("ginger-input-error");
            $(this).closest(".gp-modal-data").find(".is-required").each(function(){
                if($(this).val() == "" || $(this).val() == "0") {
                    tempString = $(this).attr("data-label");
                    errorMessage = BUTTON_SETTINGS.required_message;
                    errorMessage = errorMessage.replace("%s", tempString);
                    $(this).after("<span class='ginger-error-message'>"+errorMessage+"</span>");
                    $(this).addClass("ginger-input-error");
                    errorCount++;
                }
            });
            e.preventDefault();
            if(errorCount == 0) {
                $(this).addClass("disabled");
                $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
                $.ajax({
                    url: BUTTON_SETTINGS.ajax_url,
                    data: {
                        widget_title: $("#widget_title").val(),
                        nonce: BUTTON_SETTINGS.nonce,
                        action: "gsb_buttons_create_widget"
                    },
                    type: 'post',
                    success: function(responseText) {
                        $("#create-widget").removeClass("active");
                        $("#create_widget").removeClass("disabled");
                        $(this).closest(".gp-modal").find(".gp-modal-content").removeClass("form-loading");
                        responseText = $.parseJSON(responseText);
                        const swipeHandler = new SwipeHandler();
                        const toastsHandler = new ToastsHandler(swipeHandler);
                        if(responseText.status == 1) {
                            toastsHandler.createToast({
                                type: "success",
                                icon: "info-circle",
                                message: responseText.message,
                                duration: 5000
                            });
                            setTimeout(function(){
                                window.location = responseText.data.URL;
                            },1000);
                        } else {
                            $(".save-changes").prop("disabled", false);
                            toastsHandler.createToast({
                                type: "error",
                                icon: "info-circle",
                                message: responseText.message,
                                duration: 5000
                            });
                        }
                    }
                });
            }else {
                $(this).find(".has-error:first").focus();
            }
        });

        $(document).on("click", ".rename-widget", function (){
            $("#rename-widget").addClass("active");
            $("#rename-widget .gp-form-input input").focus();
            id = $(this).closest("tr").data("id");
            var title = $(this).data("title");
            $("#rename_widget_title").val(title);
        });

        $(document).on("click", "#rename_widget:not(.disabled)", function(e){
            var errorCount = 0;
            $(this).closest(".gp-modal-data").find(".has-error").removeClass("has-error");
            $(this).closest(".gp-modal-data").find(".is-required").each(function(){
                if($.trim($(this).val()) == "") {
                    $(this).addClass("has-error");
                    errorCount++;
                }
            });
            e.preventDefault();
            if(errorCount == 0) {
                $(this).addClass("disabled");
                $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
                $.ajax({
                    url: BUTTON_SETTINGS.ajax_url,
                    data: {
                        widget_title: $("#rename_widget_title").val(),
                        widget_id: id,
                        nonce: $("tr.gsb-buttons-col-"+id).data("nonce"),
                        action: "gsb_buttons_rename_widget"
                    },
                    type: 'post',
                    success: function(responseText) {
                        $("#rename-widget").removeClass("active");
                        $("#rename_widget").removeClass("disabled");
                        $(this).closest(".gp-modal").find(".gp-modal-content").removeClass("form-loading");
                        responseText = $.parseJSON(responseText);
                        const swipeHandler = new SwipeHandler();
                        const toastsHandler = new ToastsHandler(swipeHandler);
                        if(responseText.status == 1) {
                            toastsHandler.createToast({
                                type: "success",
                                icon: "info-circle",
                                message: responseText.message,
                                duration: 5000
                            });
                            setTimeout(function(){
                                window.location.reload();
                            },1000);
                        } else {
                            $(".save-changes").prop("disabled", false);
                            toastsHandler.createToast({
                                type: "error",
                                icon: "info-circle",
                                message: responseText.message,
                                duration: 5000
                            });
                        }
                    }
                });
            }else {
                $(this).find(".has-error:first").focus();
            }
        });

        $(".sumoselect-font-family").SumoSelect({
            search: true
        });

        $(document).on("click", ".default-state-option", function (){
            if($(this).val() == "open" && $(".ginger-menu-view:checked").val() != "corner_circle_view") {
                $(".default-state").addClass("active");
                $(".cta-button").removeClass($("#ginger_sb_animation").val());
            } else {
                $(".default-state").removeClass("active");
                $(".cta-button").addClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".exit-intent", function (){
            if($(this).is(":checked")) {
                $(".exit-intent-setting").addClass("active");
            } else {
                $(".exit-intent-setting").removeClass("active");
            }
        });

        $(document).on("click", ".page-rule-type", function (){
            if($(this).val() == "custom_pages") {
                $(".custom-page-rules").addClass("active");
            } else {
                $(".custom-page-rules").removeClass("active");
            }
        });

        $(document).on("click", "#show_on_pages", function (){
            if($(this).is(":checked")) {
                $("#show-pages-rule").addClass("active");
            } else {
                $("#show-pages-rule").removeClass("active");
            }
        });

        $(document).on("click", "#hide_on_pages", function (){
            if($(this).is(":checked")) {
                $("#hide-pages-rule").addClass("active");
            } else {
                $("#hide-pages-rule").removeClass("active");
            }
        });

        $(document).on("click", ".time-rule-type", function (){
            if($(this).val() == "custom_time") {
                $(".custom-time-rules").addClass("active");
            } else {
                $(".custom-time-rules").removeClass("active");
            }
        });

        $(document).on("click", "#has_pending_message", function (){
            if($(this).is(":checked")) {
                $(".pending-message-setting").addClass("active");
            } else {
                $(".pending-message-setting").removeClass("active");
            }
        });

        /* Back and next button */
        $(document).on("click", ".back-button.active", function (){
            var page_id = $(this).closest(".widget-setting").find(".setting-tab.active").attr("id");
            if(page_id == "icon-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#channel-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#channel-settings']").addClass("active");
            } else if(page_id == "triggers-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#icon-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#icon-settings']").addClass("active");
            } else if(page_id == "targeting-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#triggers-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#triggers-settings']").addClass("active");
            }
        });

        $(document).on("click", ".next-button.active", function (){
            var page_id = $(this).closest(".widget-setting").find(".setting-tab.active").attr("id");
            if(page_id == "channel-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#icon-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#icon-settings']").addClass("active");
            } else if(page_id == "icon-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#triggers-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#triggers-settings']").addClass("active");
            } else if(page_id == "triggers-settings") {
                $(".widget-sidebar").find("ul li a").removeClass("active");
                $(".setting-tab").removeClass("active");
                $("#targeting-settings").addClass("active");
                $(".widget-sidebar").find("ul li a[href='#targeting-settings']").addClass("active");
            }
        });

        $(document).on("click", ".back-next-btn.active", function (){
            var page_id = $(this).closest(".widget-setting").find(".setting-tab.active").attr("id");
            if(page_id == "channel-settings") {
                $(".back-button").removeClass("active");
                $(".next-button").addClass("active");
            }else if(page_id == "icon-settings") {
                $(".back-button").addClass("active");
                $(".next-button").addClass("active");
            } else if(page_id == "triggers-settings") {
                $(".back-button").addClass("active");
                $(".next-button").addClass("active");
            } else if(page_id == "targeting-settings") {
                $(".back-button").addClass("active");
                $(".next-button").removeClass("active");
            }
        });

        $(document).on("click", ".widget-sidebar a,.back-next-btn.active", function (){
            $("html, body").animate({ scrollTop: 0 });
        });

        $(document).on("click", ".widget-sidebar a", function(e){
            e.preventDefault();
            if(!$(this).hasClass("active")) {
                $(".widget-sidebar a").removeClass("active");
                $(this).addClass("active");
                $(".setting-tab").removeClass("active");
                $($(this).attr("href")).addClass("active");
            }
            if($("#channel-settings").hasClass("active")) {
                $(".back-button").removeClass("active");
                $(".next-button").addClass("active");
            } else if($("#icon-settings").hasClass("active")) {
                $(".back-button").addClass("active");
                $(".next-button").addClass("active");
            } else if($("#triggers-settings").hasClass("active")) {
                $(".back-button").addClass("active");
                $(".next-button").addClass("active");
            } else if($("#targeting-settings").hasClass("active")) {
                $(".back-button").addClass("active");
                $(".next-button").removeClass("active");
            }
        });

        $(".sumoselect").SumoSelect();
        setCountryDropdown();

        $(document).on("click",".toggle-field-title.toggle-field-clickable",function () {
            $(this).closest(".toggle-field").find(".toggle-field-content").slideToggle();
            $(this).closest(".toggle-field").toggleClass("active");
        });

        $(document).on("click" , ".visible_check_toggle",function (e) {
            e.stopPropagation();
        });

        $(document).on("change",".required_check",function () {
            if($(this).is(":checked")) {
                $(this).closest(".toggle-field").find(".required-field-message").addClass("active");
                $(this).closest(".toggle-field").find(".required-field-message input").addClass("is-required");
            } else {
                $(this).closest(".toggle-field").find(".required-field-message").removeClass("active");
                $(this).closest(".toggle-field").find(".required-field-message input").removeClass("is-required");
            }
        });
        $(document).on("change" , ".visible_check",function () {
            if($(this).is(":checked")) {
                $(this).closest(".toggle-field").find(".toggle-field-setting").addClass("active");
                $(this).closest(".toggle-field").find(".toggle-field-title").addClass("toggle-field-clickable");
            } else {
                $(this).closest(".toggle-field").find(".toggle-field-setting").removeClass("active");
                $(this).closest(".toggle-field").find(".toggle-field-title").removeClass("toggle-field-clickable");
                $(this).closest(".toggle-field").find(".toggle-field-content").hide();
                $(this).closest(".toggle-field").removeClass("active");
            }
        });
        $(document).on("keyup",".contact-form-input",function () {
            $(this).closest(".toggle-field").find(".toggle-field-label").text($(this).val());
        });
        $(document).on("click",".redirect_check", function () {
            if($(this).is(":checked")) {
                $(this).closest(".contact-form-color-option-inner").find(".redirect-field-contact").addClass("active");
                $(this).closest(".contact-form-color-option-inner").find(".redirect-field-contact input[type=text]").addClass("is-required");
            } else {
                $(this).closest(".contact-form-color-option-inner").find(".redirect-field-contact").removeClass("active");
                $(this).closest(".contact-form-color-option-inner").find(".redirect-field-contact input[type=text]").removeClass("is-required");
            }
        });
        $(document).on("click",".close_after_submit_check", function () {
            if($(this).is(":checked")) {
                $(this).closest(".contact-form-color-option-inner").find(".close-after-field-contact").addClass("active");
            } else {
                $(this).closest(".contact-form-color-option-inner").find(".close-after-field-contact").removeClass("active");
            }
        });
        $(document).on("change",".ginger-menu-view",function () {
            var selected_view = $("input[name='widget_settings[view]']:checked").val()
            if(selected_view == "list_view" || selected_view == "grid_view") {
                $(".list-view-field").addClass("active");
                $(".grid-view-field").addClass("active");
                $(".icon-view-field").each(function () {
                   if($(this).hasClass("default-state")) {
                       $(this).removeClass("activate");
                   } else {
                       $(this).removeClass("activate active");
                   }
                });
                if(selected_view == "grid_view") {
                    $(".grid-view-field").addClass("active");
                }
            } else {
                $(".list-view-field").removeClass("active");
                $(".grid-view-field").removeClass("active");
                $(".icon-view-field").each(function () {
                    if($(this).hasClass("default-state")) {
                        $(this).addClass("activate");
                    } else {
                        $(this).addClass("activate active");
                    }
                });
                if(selected_view == "corner_circle_view") {
                    $(".default-state").removeClass("active");
                    $('.menu-animation').removeClass("active");
                    $(".menu-view").removeClass("active");
                } else if(selected_view == "menu_view") {
                    $('.menu-animation').removeClass("active");
                    $(".menu-view").removeClass("active");
                    if($(".default-state-option:checked").val() == "open") {
                        $(".default-state").addClass("active");
                    } else {
                        $(".default-state").removeClass("active");
                    }
                } else {
                    $(".default-state").addClass("active");
                    $(".menu-animation").addClass("active");
                    if($(".default-state-option:checked").val() == "open") {
                        $(".menu-view").addClass("active");
                    } else {
                        $(".default-state").removeClass("active");
                    }
                }
            }
        });

        $(document).on("click",".close-view-btn",function () {
           $(".ginger-sticky-buttons").removeClass("menu-open");
           $(".ginger-sticky-buttons").find(".main-button").removeClass("hide-tooltip");
           $(".ginger-sticky-buttons").find(".main-button").addClass("active-tooltip");
           $(".ginger-sticky-buttons").find(".channel-btn").removeClass("active");
           $(".ginger-sticky-buttons").find(".button-list").removeClass(animationClass);
        });

        $(document).on("click", ".whatsapp-channel-widget-settings", function (){
            $(this).closest(".gsb-settings").addClass("active");
            if($(this).closest("li.gsb-settings.active").find(".whatsapp-form-setting").length) {
                $("html, body").animate({
                    scrollTop: $(this).closest("li.gsb-settings.active").find(".whatsapp-form-setting").offset().top - 50
                }, 1000);
            }
            var field_name = $(this).data("tab");
            $(".whatsapp-form-setting .tab-section, .whatsapp-form-setting .tab-setting-section").removeClass("active");
            $("."+field_name+", #"+field_name).addClass("active");
        });

        $(document).on("click", ".show-whatsapp-popup", function (){
            if($(this).is(":checked")) {
                $(".whatsapp-widget-setting").removeClass("add-blur-bg");
            } else {
                $(".whatsapp-widget-setting").addClass("add-blur-bg");
            }
        });

        $(document).on("click", ".img-profile-upload-btn", function (){
            var image = wp.media({
                title: 'Select image for whatsapp profile',
                multiple: false,
                library: {
                    type: 'image'
                }
            }).open()
                .on('select', function (e) {
                    var imageData = image.state().get('selection').first();
                    imageData = imageData.toJSON();
                    $('#custom_whatsapp_profile').val(imageData.url);
                    $('.custom-profile-img img').remove();
                    $('.custom-profile-img').append("<img src='"+imageData.url+"' alt='Profile image' />");
                    $(".remove-whatsapp-profile ").addClass("active");
                    setSocialButtonPreview();
                });
        });

        $(document).on("click", ".remove-whatsapp-profile", function (){
            $('#custom_whatsapp_profile').val('');
            $('.custom-profile-img img').remove();
            $(".remove-whatsapp-profile").removeClass("active");
            setSocialButtonPreview();
        });

        $(document).on("click", ".whatsapp-user-profile-img", function (){
            var image = wp.media({
                title: 'Select image for whatsapp user profile',
                multiple: false,
                library: {
                    type: 'image'
                }
            }).open()
                .on('select', function (e) {
                    var imageData = image.state().get('selection').first();
                    imageData = imageData.toJSON();
                    $('#whatsapp_user_profile_img').val(imageData.url);
                    $('.custom-user-profile-img img').remove();
                    $('.custom-user-profile-img').append("<img src='"+imageData.url+"' alt='Profile image' />");
                    $(".remove-whatsapp-user-profile").addClass("active");
                    setSocialButtonPreview();
                });
        });

        $(document).on("click", ".remove-whatsapp-user-profile", function (){
            $('#whatsapp_user_profile_img').val('');
            $('.custom-user-profile-img img').remove();
            $(".remove-whatsapp-user-profile").removeClass("active");
            setSocialButtonPreview();
        });

        $(document).on("click", ".more-save-option", function (e){
            e.preventDefault();
            $(".save-view-btn").toggleClass("active");
        });

        $(document).on("click", ".tab-section", function (){
            var tab_id = $(this).data("id");
            $(this).closest("li").find(".tab-section").removeClass("active");
            $(this).addClass("active");
            $(this).closest("li").find(".tab-setting-section").removeClass("active");
            $("#"+tab_id).addClass("active");
        });

        $(document).on("click", ".wp-badges", function (){
            $("#whatsapp_message").val($("#whatsapp_message").val() + " " + $(this).text());
        });

        $(document).on("click", ".mail-badges", function (){
            $("#email_subject").val($("#email_subject").val() + " " + $(this).text());
        });

        $(document).on("click", ".sms-badges", function (){
            $("#sms_message").val($("#sms_message").val() + " " + $(this).text());
        });

        $(document).on("click",".view-badges", function (){
            tinyMCE.get('grid_view_title').focus();
            tinymce.activeEditor.execCommand('mceInsertContent', false, $(this).text());
            setSocialButtonPreview();
        });

        initializeEditor();

        $(document).on("click", ".open-contact-form-channel", function (){
            if($(".ginger-sticky-buttons").hasClass("menu-open")) {
                $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-form");
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                }
            } else {
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").addClass("open-form");
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-form").addClass("menu-open");
                }
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").removeClass($("#ginger_sb_animation").val());
            } else {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .gsb-contact-button a").removeClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".gsb-contact-button a", function (){
            $(".ginger-sticky-buttons").removeClass("open-form").addClass("menu-open");
            $(".button-list").addClass(animationClass);
            $(".main-button").removeClass("active-tooltip");
            $(".main-button").addClass("hide-tooltip");
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons").addClass("has-no-animation");
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");

                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-contact-button a").addClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".open-whatsapp-channel", function (){
            if($(".ginger-sticky-buttons").hasClass("menu-open")) {
                $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-whatsapp-popup");
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                }
            } else {
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").addClass("open-whatsapp-popup");
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-whatsapp-popup").addClass("menu-open");
                }
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").removeClass($("#ginger_sb_animation").val());
            } else {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .gsb-whatsapp-button a").removeClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".gsb-whatsapp-button a", function (){
            $(".ginger-sticky-buttons").removeClass("open-whatsapp-popup").addClass("menu-open");
            $(".button-list").addClass(animationClass);
            $(".main-button").removeClass("active-tooltip");
            $(".main-button").addClass("hide-tooltip");
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons").addClass("has-no-animation");
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-whatsapp-button a").addClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".whatsapp-popup-close-btn", function (){
            $(".ginger-sticky-buttons").removeClass("open-whatsapp-popup");
            $(".main-button").addClass("active-tooltip");
            $(".main-button").removeClass("hide-tooltip");
           // $(".gsb-whatsapp-button a").trigger("click");
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-whatsapp-button a").addClass($("#ginger_sb_animation").val());
            }
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                if ($(".ginger-sticky-buttons").hasClass("menu-open")) {
                    $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-whatsapp-popup");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-whatsapp-popup").addClass("menu-open");
                }
            }
            if($(".ginger-menu-view:checked").val() == "menu_view" && $(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons .main-button").removeClass("active-tooltip").addClass("hide-tooltip");
            }
        });

        $(document).on("click", ".scw-form-close", function (){
            // $(".gsb-contact-button a").trigger("click");
            $(".ginger-sticky-buttons").removeClass("open-form");
            $(".main-button").addClass("active-tooltip");
            $(".main-button").removeClass("hide-tooltip");
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-contact-button a").addClass($("#ginger_sb_animation").val());
            }
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                if ($(".ginger-sticky-buttons").hasClass("menu-open")) {
                    $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-form");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-form").addClass("menu-open");
                }
            }
            if($(".ginger-menu-view:checked").val() == "menu_view" && $(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons .main-button").removeClass("active-tooltip").addClass("hide-tooltip");
            }
        });

        $(document).on("click", ".open-wechat-channel", function (){
            if($(".ginger-sticky-buttons").hasClass("menu-open")) {
                $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-wechat-popup");
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                }
            } else {
                if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                    $(".ginger-sticky-buttons").addClass("open-wechat-popup");
                    $(".ginger-sticky-buttons").find(".single-btn").removeClass("active-tooltip").addClass("hide-tooltip");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-wechat-popup").addClass("menu-open");
                }
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").removeClass($("#ginger_sb_animation").val());
            } else {
                $(".scw-pending-message").hide();
                $(".ginger-sticky-buttons").find(".main-button .gsb-wechat-button a").removeClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".gsb-wechat-button a", function (){
            $(".ginger-sticky-buttons").removeClass("open-wechat-popup").addClass("menu-open");
            $(".button-list").addClass(animationClass);
            $(".main-button").removeClass("active-tooltip");
            $(".main-button").addClass("hide-tooltip");
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons").addClass("has-no-animation");
            }
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-wechat-button a").addClass($("#ginger_sb_animation").val());
            }
        });

        $(document).on("click", ".wechat-popup-close-btn", function (){
            $(".ginger-sticky-buttons").removeClass("open-wechat-popup");
            $(".main-button").addClass("active-tooltip");
            $(".main-button").removeClass("hide-tooltip");
            // $(".gsb-whatsapp-button a").trigger("click");
            if($(".ginger-sticky-buttons").hasClass("one-channel")) {
                $(".ginger-sticky-buttons").find(".single-btn").removeClass("hide-tooltip").addClass("active-tooltip");
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".single-btn .channel-btn a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".single-btn .channel-btn a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .channel-btn a").addClass($("#ginger_sb_animation").val());
            } else {
                var animation_effect = $("#ginger_sb_animation").val();
                if(animation_effect == "ginger-btn-bounce" || animation_effect == "ginger-btn-shockwave" || animation_effect == "ginger-btn-waggle" || animation_effect == "ginger-btn-zoom") {
                    $(".gsb-main-action-button a > .scw-pending-message").show();
                }
                if(animation_effect == "ginger-btn-fade" || animation_effect == "none" || animation_effect == "ginger-btn-pulse" || animation_effect == "ginger-btn-spin") {
                    $(".gsb-main-action-button a + .scw-pending-message").show();
                }
                $(".ginger-sticky-buttons").find(".main-button .gsb-wechat-button a").addClass($("#ginger_sb_animation").val());
            }
            if($(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                if ($(".ginger-sticky-buttons").hasClass("menu-open")) {
                    $(".ginger-sticky-buttons").removeClass("menu-open").addClass("open-wechat-popup");
                } else {
                    $(".ginger-sticky-buttons").removeClass("open-wechat-popup").addClass("menu-open");
                }
            }
            if($(".ginger-menu-view:checked").val() == "menu_view" && $(".ginger-sticky-buttons").hasClass("has-no-close-button")) {
                $(".ginger-sticky-buttons .main-button").removeClass("active-tooltip").addClass("hide-tooltip");
            }

        });

        $(document).on("click", "#woocommerce_customization", function (){
            if($(this).is(":checked")) {
                $(".woocommerce-customization-setting").addClass("active");
            } else {
                $(".woocommerce-customization-setting").removeClass("active");
            }
        });

        $(document).on("click", ".add-tags-badge", function() {
            $(this).toggleClass("active");
            $(".woocommerce-badges").toggleClass("active");
        });

        $(document).on("click", ".woo-view-badges", function (){
            tinyMCE.get('woo_list_view_subtitle').focus();
            tinymce.activeEditor.execCommand('mceInsertContent', false, $(this).text());
        });

        $(document).on("click", '.add-contact-custom-field' , function (e) {
            e.preventDefault();
            var length = $('.contact-custom-field').length;
            var custom_field = 0;

            if (length >= 6) {
                $('.contact-form-toggle-fields + .contact-custom-field-limit').remove();
                var field = "<div class='contact-custom-field-limit'><div class='social-channel-popover'><p class='description'>You can add up to 6 custom fields</p></div></div>";
                $('.contact-form-toggle-fields').after(field);
                $('.contact-custom-field-limit .social-channel-popover').show();
            } else {

                var field = "";

                field += '<div class="gp-modal contact-form-field-open" id="contact_form_field_open'+custom_field+'">';
                field += '<div class="gp-modal-bg"></div>';
                field += '<div class="gp-modal-container">';
                field += '<div class="gp-modal-content">';
                field += '<div class="gp-modal-data">';
                field += '<button class="gp-modal-close-btn" type="button">';
                field += '<span class="svg-icon">';
                field += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>';
                field += '</span>';
                field += '</button>';
                field += '<div class="gp-modal-header">Add New Field</div>';
                field += '<div class="gp-modal-body">';
                field += "<div class='contact-form-field-select-wrap'><label class='contact-form-field-select'><input type='radio' value='text' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-edit'></i>Text</span></label><label class='contact-form-field-select'><input type='radio' value='textarea' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-align-justify'></i>Text Area</span></label><label class='contact-form-field-select'><input type='radio' value='number' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-phone'></i>Number</span></label><label class='contact-form-field-select'><input type='radio' value='date' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-calendar-week'></i>Date</span></label><label class='contact-form-field-select'><input type='radio' value='url' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-link'></i>Website</span></label><label class='contact-form-field-select'><input type='radio' value='dropdown' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-caret-down'></i>Dropdown</span>	</label><label class='contact-form-field-select'><input type='radio' value='file' data-field='"+custom_field+"' name='contact-form[custom_fields]["+custom_field+"][field_dropdown]' /><span><i class='fas fa-file-upload'></i>File Upload</span></label></div>";
                field += "<div class='go-pro-contact'><a href='"+BUTTON_SETTINGS.go_pro_url+"' target='_blank'>Go Pro</a></div>";
                field += "</div>";
                field += '</div>';
                field += '</div>';
                field += '</div>';
                field += '</div>';
                field += '</div>';

                $('.contact-form-field-option').append(field);
                $("#contact_form_field_open"+custom_field).addClass("active");
            }
        });

        $(document).on("click", ".contact-form-field-open", function (e){
            e.stopPropagation();
        });

        $(document).on("keyup", "#input_channel_search", function (){
            var search = $(this).val().toLowerCase();
            $(".no-channel-found").removeClass("active");
            if(search != "")
            {
                var count = 0;
                $(".social-buttons li").each(function(){

                    var value = $(this).data("social");
                    //alert(value);
                    if(value.startsWith(search))
                    {
                        count = count + 1;
                        $(this).show();
                    }
                    else
                    {
                        $(this).hide();
                    }

                });
                if(count == 0) {
                    $(".no-channel-found").addClass("active");
                    $(".no-channel-found .search_text").text($(this).val());
                }
            }
            else
            {
                $(".social-buttons li").each(function(){
                    $(this).show();
                });
            }
        });

        $(document).on("click", ".enable-whatsapp-widget", function (){
            $("#show_whatsapp_popup").prop("checked", true);
            $(".whatsapp-widget-setting").removeClass("add-blur-bg");
            setSocialButtonPreview();
        });

        $(document).on("click", ".qr-img-upload-btn", function (){
            var image = wp.media({
                title: 'Select image for QR code',
                multiple: false,
                library: {
                    type: 'image'
                }
            }).open()
                .on('select', function (e) {
                    var imageData = image.state().get('selection').first();
                    imageData = imageData.toJSON();
                    $("#wechat_qr_code_input").val(imageData.url);
                    $(".wechat-qr-code-img-box .wechat-qr-code-img img").attr("src", imageData.url);
                    $(".wechat-qr-setting-box").addClass("active");
                    setSocialButtonPreview();
                });
        });

        $(document).on("click", ".wechat-qr-img-remove", function (){
            $("#wechat_qr_code_input").val('');
            $(".wechat-qr-code-img-box .wechat-qr-code-img img").attr("src", '');
            $(".wechat-qr-setting-box").removeClass("active");
            setSocialButtonPreview();
        });

        $(document).on("click",".img-upgrade-btn",function (e) {
            e.stopPropagation();
            $(this).closest(".upgrade-upload-btn").find(".upload-image-selection-container").toggleClass("active");
        });
        $(document).on("click",".upload-image-selection-overlay",function() {
            $(".upload-image-selection-container").removeClass("active");
        });

        $(document).on("click", ".image-upload-gallery:not(.disabled)", function(e) {
            e.preventDefault();
            channelString = $(this).closest("li.gsb-settings").attr("data-button");
            var channelName = channelString;
            var image = wp.media({
                title: 'Select image for channel',
                multiple: false,
                library: {
                    type: 'image'
                }
            }).open()
                .on('select', function (e) {
                    $(".upload-image-selection-container").removeClass("active");
                    var imageData = image.state().get('selection').first();
                    imageData = imageData.toJSON();
                    $('#icon_for_' + channelString).val("");
                    $('#image_for_' + channelString).val(imageData.id);
                    $('.ssb-btn-bg-' + channelString+" img").remove();
                    $('.ssb-btn-bg-' + channelString+" .channel-bs-icon").remove();
                    $('.ssb-btn-bg-' + channelString).prepend("<img src='"+imageData.url+"' alt='"+channelString+"' />");
                    $('.ssb-btn-bg-' + channelString).addClass("has-image");
                    $('.ssb-btn-bg-' + channelString).removeClass("has-icon");
                    setSocialButtonPreview();
                });
        });

        $(document).on("click", ".remove-channel-img", function(){
            channelString = $(this).closest("li.gsb-settings").attr("data-button");
            var channelName = channelString;
            $('.ssb-btn-bg-' + channelString).removeClass("has-image");
            $('.ssb-btn-bg-' + channelString).removeClass("has-icon");
            $('.ssb-btn-bg-' + channelString+" img").remove();
            $('.ssb-btn-bg-' + channelString+" .channel-bs-icon").remove();
            $('#icon_for_' + channelString).val("");
            $('#image_for_' + channelString).val("");
            setSocialButtonPreview();
        });

    });

    $(window).on("load",function () {
        if(typeof tinymce !== 'undefined' && tinymce.editors.length) {
            for (var i = 0; i < tinymce.editors.length; i++) {
                tinymce.editors[i].onChange.add(function (ed, e) {
                    setSocialButtonPreview();
                });
                tinymce.editors[i].onKeyUp.add(function (ed, e) {
                    setSocialButtonPreview();
                });
            }
        }
        setSocialButtonPreview();
    });

    $(window).on("scroll", function () {
        make_header_scticky();
        setHeader();
    });

    $(window).on("resize", function () {
        make_header_scticky();
        setPreviewPopup();
    });

    function initializeEditor() {
        var currentDate = new Date();
        var currentMinute = (currentDate.getMinutes() < 10) ? "0"+currentDate.getMinutes() : currentDate.getMinutes();
        var currentHour = (currentDate.getHours() < 10) ? "0"+currentDate.getHours() : currentDate.getHours();
        var currentTime = currentHour + ":" + currentMinute;
        if($("#whatsapp_popup_text").length) {
            tinymce.execCommand( 'mceRemoveEditor', false, 'whatsapp_popup_text' );
            tinymce.init({
                selector: '#whatsapp_popup_text',

                plugins: 'link',

                toolbar: 'bold italic underline link | emoji',

                toolbar_sticky: true,

                toolbar_mode: 'wrap',

                directionality : $('html[dir="rtl"]').length?'rtl':'ltr',

                menubar: false,

                branding: false,

                content_css: BUTTON_SETTINGS.content_css,

                setup: function(editor) {

                    editor.addButton('emoji', {
                        icon: 'emoticons',
                        onclick: insertEmoji,
                        classes: 'emoji-custom-icon'
                    });

                    editor.on('keyup', function (e){
                        $("#whatsapp_popup_text").val(editor.getContent());
                        if(editor.getContent() != "") {
                            if($(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").length) {
                                $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").html(editor.getContent());
                            } else {
                                $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-popup-body").append("<div class='whatsapp-chat'><div class='whatsapp-chat-user-name'></div><div class='whatsapp-chat-content'></div><div class='whatsapp-chat-time'>"+currentTime+"</div></div>");
                                $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").html(editor.getContent());
                            }
                        } else {
                            $(".ginger-sticky-buttons").find(".whatsapp-chat").remove();
                        }
                    });

                    function insertEmoji() {
                        var { createPopup } = window.picmoPopup;
                        var trigger = jQuery(".mce-emoji-custom-icon button").attr("id");
                        var trig = document.querySelector("#"+trigger);

                        var picker = createPopup({}, {
                            referenceElement: trig,
                            triggerElement: trig,
                            position: 'right-start',
                            hideOnEmojiSelect: false
                        });

                        picker.toggle();

                        picker.addEventListener('emoji:select', (selection) => {
                            tinyMCE.get('whatsapp_popup_text').focus();
                            tinymce.activeEditor.execCommand('mceInsertContent', false, selection.emoji);
                            $("#whatsapp_popup_text").val(editor.getContent());
                            if(editor.getContent() != "") {
                                if($(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").length) {
                                    $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").html(editor.getContent());
                                } else {
                                    $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-popup-body").append("<div class='whatsapp-chat'><div class='whatsapp-chat-user-name'></div><div class='whatsapp-chat-content'></div><div class='whatsapp-chat-time'>"+currentTime+"</div></div>");
                                    $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-chat-content").html(editor.getContent());
                                }
                            } else {
                                $(".ginger-sticky-buttons").find(".whatsapp-chat").remove();
                            }
                        });
                    }
                }
            });
            tinymce.execCommand( 'mceAddEditor', false, 'whatsapp_popup_text' );
        }
    }

    function setHeader() {
        if($(window).width() <= 600) {
            var topPosition = $(window).scrollTop();
            if(topPosition > 0) {
                $(".widget-sidebar").css("cssText","top: 0 !important");
            }
            if(topPosition == 0) {
                $(".widget-sidebar").css("cssText","top: 46px !important");
            }
        }
    }

    function setPreviewPopup() {
        if($(window).width() <= 1330) {
            previewPopup = true;
        } else {
            previewPopup = false;
        }
        if(previewPopup) {
            tempString = $("input[name='preview_device_switch']:checked").val();
            if(tempString == "mobile") {
                $(".preview-desktop-layout").removeClass("desktop-layout").addClass("mobile-layout");
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width() * 1));
                selectedDevice = "mobile";
            } else {
                $(".preview-desktop-layout").removeClass("mobile-layout").addClass("desktop-layout");
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width() * 0.6));
                selectedDevice = "desktop";
            }
        } else {
            tempString = $("input[name='device_switch']:checked").val();
            if(tempString == "mobile") {
                $(".preview-desktop-layout").removeClass("desktop-layout").addClass("mobile-layout");
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width() * 1.6));
                selectedDevice = "mobile";
            } else {
                $(".preview-desktop-layout").removeClass("mobile-layout").addClass("desktop-layout");
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width() * 0.6));
                selectedDevice = "desktop";
            }
        }

        if($(".preview-desktop-layout").hasClass("mobile-layout")) {
            $(".preview-mobile-btn").prop("checked", true);
        }
        if($(".preview-desktop-layout").hasClass("desktop-layout")) {
            $(".preview-desktop-btn").prop("checked", true);
        }

    }

    function setColorChanges() {
        var customCSS = "";
        $("#custom_style_widget").remove();
        customCSS += "<style id='custom_style_widget'>";

        $(".selected-button-settings .channel-bg-color").each(function(){
            tempString = $(this).val();
            $(this).closest("li.gsb-settings").find(".ginger-button-icon").css("background-color", tempString);
        });
        $(".selected-button-settings .channel-text-color").each(function(){
            tempString = $(this).val();
            $(this).closest("li.gsb-settings").find(".ginger-button-icon svg").css("color", tempString).css("fill", tempString);
        });

        /* Background color */
        tempString = $("input[name='widget_settings[bg_color]']").val();
        $(".ginger-sticky-buttons .main-button .cta-button, .close-gsb-button").css("background-color", tempString);

        /* Icon Color */
        tempString = $("input[name='widget_settings[text_color]']").val();
        $(".ginger-sticky-buttons .main-button .cta-button, .close-gsb-button, .ginger-sticky-buttons .main-button .cta-button svg, .close-gsb-button svg").css("color", tempString).css("fill", tempString);

        // /* Contact form background color */
        // tempString = $("input[name='channel_settings[contact_form][bg_color]']").val();
        // $(".gsb-contact-button a.cta-button").css("background-color", tempString);
        //
        // /* Contact form icon color */
        // tempString = $("input[name='channel_settings[contact_form][text_color]']").val();
        // $(".gsb-contact-button a.cta-button, .gsb-contact-button a.cta-button svg").css("color", tempString).css("fill", tempString);
        //
        // /* Contact form background hover color */
        // tempString = $("input[name='channel_settings[contact_form][bg_hover_color]']").val();
        // customCSS += ".ginger-sticky-buttons .gsb-contact-button a:hover, .ginger-sticky-buttons .gsb-contact-button a:focus {background-color: "+tempString+" !important;}";
        //
        // /* Contact form icon hover color */
        // tempString = $("input[name='channel_settings[contact_form][text_hover_color]']").val();
        // customCSS += ".ginger-sticky-buttons .gsb-contact-button a:hover, .ginger-sticky-buttons .gsb-contact-button a:focus {color: " + tempString + " !important;}";
        // customCSS += ".ginger-sticky-buttons .gsb-contact-button a:hover svg, .ginger-sticky-buttons .gsb-contact-button a:focus svg {fill: " + tempString + " !important;}";

        /* Contact form button background color */
        tempString = $("input[name='contact_form_settings[btn_bg_color]']").val();
        $(".scw-form-btn button").css("background", tempString);

        /* Contact form button text color */
        tempString = $("input[name='contact_form_settings[btn_color]']").val();
        $(".scw-form-btn button").css("color", tempString);

        /* Contact form button background hover color */
        tempString = $("input[name='contact_form_settings[btn_bg_hover_color]']").val();
        customCSS += ".ginger-sticky-buttons .scw-form-container .scw-form-btn button:hover, .ginger-sticky-buttons .scw-form-container .scw-form-btn button:focus {background-color: "+tempString+" !important;}";

        /* Contact form button text hover color */
        tempString = $("input[name='contact_form_settings[btn_hover_color]']").val();
        customCSS += ".ginger-sticky-buttons .scw-form-container .scw-form-btn button:hover, .ginger-sticky-buttons .scw-form-container .scw-form-btn button:focus {color: "+tempString+" !important;}";

        // /* whatsapp cta icon background color */
        // tempString = $("input[name='channel_settings[whatsapp][bg_color]']").val();
        // $(".gsb-whatsapp-button a.cta-button").css("background-color", tempString);
        //
        // /* whatsapp cta icon color */
        // tempString = $("input[name='channel_settings[whatsapp][text_color]']").val();
        // $(".gsb-whatsapp-button a.cta-button, .gsb-whatsapp-button a.cta-button svg").css("color", tempString).css("fill", tempString);
        //
        // /* whatsapp cta icon background hover color */
        // tempString = $("input[name='channel_settings[whatsapp][bg_hover_color]']").val();
        // customCSS += ".ginger-sticky-buttons .gsb-whatsapp-button a:hover, .ginger-sticky-buttons .gsb-whatsapp-button a:focus {background-color: "+tempString+" !important;}";
        //
        // /* whatsapp cta icon hover color */
        // tempString = $("input[name='channel_settings[whatsapp][text_hover_color]']").val();
        // customCSS += ".ginger-sticky-buttons .gsb-whatsapp-button a:hover, .ginger-sticky-buttons .gsb-whatsapp-button a:focus {color: " + tempString + " !important;}";
        // customCSS += ".ginger-sticky-buttons .gsb-whatsapp-button a:hover svg, .ginger-sticky-buttons .gsb-whatsapp-button a:focus svg {fill: " + tempString + " !important;}";

        tempString = $("input[name='widget_settings[message_bg_color]']").val();
        $(".scw-pending-message").css("background", tempString);

        tempString = $("input[name='widget_settings[message_text_color]']").val();
        $(".scw-pending-message").css("color", tempString);

        tempString = $("input[name='tooltip_settings[bg_color]']").val();
        customCSS += ".ginger-sticky-buttons [data-ginger-tooltip]:before{background-color: "+tempString+"}";
        customCSS += ".ginger-sticky-buttons [data-ginger-tooltip-location='left']:after{border-color: transparent transparent transparent "+tempString+";}";
        customCSS += ".ginger-sticky-buttons [data-ginger-tooltip-location='right']:after{border-color: transparent "+tempString+" transparent transparent;}";
        customCSS += ".ginger-sticky-buttons [data-ginger-tooltip-location='top']:after{border-color: "+tempString+" transparent transparent transparent;}";

        tempString = $("input[name='tooltip_settings[text_color]']").val();
        customCSS += ".ginger-sticky-buttons [data-ginger-tooltip]:before{color: "+tempString+"}";

        $(".gsb-settings .ssb-btn-bg-instagram").removeClass("default-insta-hover");
        $(".channel-instagram.gsb-social-channel").removeClass("default-insta-hover");
        $(".selected-button-settings .channel-bg-hover-color").each(function(){
            tempString = $(this).closest("li.gsb-settings").attr("data-button");
            if(tempString != "instagram" || (tempString =="instagram" && $(this).val() != "#df0079")) {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ":hover, .ginger-button-icon.ssb-btn-bg-" + tempString + ":focus ,.ginger-sticky-buttons a.channel-" + tempString + ":hover, .ginger-sticky-buttons a.channel-" + tempString + ":focus, .list-channel a:hover .ginger-button-icon.ssb-btn-bg-" + tempString + ", .list-channel a:focus .ginger-button-icon.ssb-btn-bg-" + tempString + " {background: " + $(this).val() + " !important;}";
            }
            if(tempString == "instagram" && $(this).val() == "#df0079") {
                $(".gsb-settings .ssb-btn-bg-instagram").addClass("default-insta-hover");
                $(".channel-instagram.gsb-social-channel").addClass("default-insta-hover");
            }
            if(tempString == "twitter" && ($(this).val() == "#65BBF2" || $(this).val() == '#65bbf2')) {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ":hover, .ginger-button-icon.ssb-btn-bg-" + tempString + ":focus ,.ginger-sticky-buttons a.channel-" + tempString + ":hover, .ginger-sticky-buttons a.channel-" + tempString + ":focus {background: #000000 !important;}";
            }
        });
        $(".selected-button-settings .channel-text-hover-color").each(function(){
            tempString = $(this).closest("li.gsb-settings").attr("data-button");
            customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ":hover svg, .ginger-button-icon.ssb-btn-bg-" + tempString + ":focus svg, .ginger-sticky-buttons a.channel-"+tempString+":focus svg, .ginger-sticky-buttons a.channel-"+tempString+":hover svg, .list-channel a:hover .ginger-button-icon.ssb-btn-bg-" + tempString + " svg, .list-channel a:focus .ginger-button-icon.ssb-btn-bg-" + tempString + " svg, .ginger-sticky-buttons a.channel-" + tempString + ":hover, .ginger-sticky-buttons a.channel-" + tempString + ":focus {color: "+$(this).val()+" !important; fill: "+$(this).val()+" !important;}";
            if(tempString == "slack" && $(this).val() != "#ffffff") {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ":hover svg path, .ginger-button-icon.ssb-btn-bg-" + tempString + ":focus svg path, .ginger-sticky-buttons a.channel-"+tempString+":focus svg path, .ginger-sticky-buttons a.channel-"+tempString+":hover svg path {fill: "+$(this).val()+" !important;}";
            }
        });
        $(".selected-button-settings .channel-bg-color").each(function(){
            tempString = $(this).closest("li.gsb-settings").attr("data-button");
            if(tempString != "instagram" || (tempString =="instagram" && $(this).val() != "#df0079")) {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ", .ginger-sticky-buttons a.channel-" + tempString + " {background: " + $(this).val() + " !important;}";
            }
            if(tempString == "twitter" && ($(this).val() == "#65BBF2" || $(this).val() == '#65bbf2')) {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ", .ginger-sticky-buttons a.channel-" + tempString + " {background: #000000 !important;}";
            }
        });
        $(".selected-button-settings .channel-text-color").each(function(){
            tempString = $(this).closest("li.gsb-settings").attr("data-button");
            customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + " svg, .ginger-sticky-buttons a.channel-" + tempString + ", .ginger-sticky-buttons a.channel-" + tempString + " svg {color: " + $(this).val() + " !important; fill: " + $(this).val() + " !important;}";
            if(tempString == "slack" && $(this).val() != "#ffffff") {
                customCSS += ".ginger-button-icon.ssb-btn-bg-" + tempString + ":not(:hover) svg path, .ginger-sticky-buttons a.channel-" + tempString + ":not(:hover), .ginger-sticky-buttons a.channel-" + tempString + ":not(:hover) svg path {fill: " + $(this).val() + " !important;}";
            }
        });

        if($(".btn-for-"+selectedDevice+":checked").length > 1) {
            tempString = $("input[name='widget_settings[interaction_bg_color]']").val();
            customCSS += ".ginger-sticky-buttons .main-button .gsb-main-action-button a:hover, .ginger-sticky-buttons .main-button .close-gsb-action-button a:hover, .ginger-sticky-buttons .main-button .gsb-main-action-button a:focus, .ginger-sticky-buttons .main-button .close-gsb-action-button a:focus, .ginger-sticky-buttons .main-button .gsb-contact-button a:hover, .ginger-sticky-buttons .main-button .gsb-contact-button a:focus, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:hover, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:focus {background-color: "+tempString+" !important;}";

            tempString = $("input[name='widget_settings[interaction_text_color]']").val();
            customCSS += ".ginger-sticky-buttons .main-button .gsb-main-action-button a:hover, .ginger-sticky-buttons .main-button .close-gsb-action-button a:hover, .ginger-sticky-buttons .main-button .gsb-main-action-button a:focus, .ginger-sticky-buttons .main-button .close-gsb-action-button a:focus, .ginger-sticky-buttons .main-button .gsb-contact-button a:hover, .ginger-sticky-buttons .main-button .gsb-contact-button a:focus, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:hover, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:focus {color: " + tempString + " !important;}";
            customCSS += ".ginger-sticky-buttons .main-button .gsb-main-action-button a:hover svg, .ginger-sticky-buttons .main-button .close-gsb-action-button a:hover svg, .ginger-sticky-buttons .main-button .gsb-main-action-button a:focus svg, .ginger-sticky-buttons .main-button .close-gsb-action-button a:focus svg, .ginger-sticky-buttons .main-button .gsb-contact-button a:hover svg, .ginger-sticky-buttons .main-button .gsb-contact-button a:focus svg, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:hover svg, .ginger-sticky-buttons .main-button .gsb-whatsapp-button a:focus svg {fill: " + tempString + " !important;}";
        }

        if(menuView != "icon_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
            tempString = $("input[name='widget_settings[list_title_bg]']").val();
            customCSS += ".button-list .list_title_container {background-color: " + tempString + ";}";
            tempString = $("input[name='widget_settings[list_title_color]']").val();
            customCSS += ".button-list .list_title_container {color: " + tempString + ";}";
            // customCSS += ".button-list .list_title_container .close-view-btn svg path {stroke: " + tempString + ";}";
        }

        tempString = $("input[name='channel_settings[wechat][wechat_qr_bg_color]']").val();
        customCSS += ".sticky-button-list .wechat-popup .wechat-popup-header {background-color: " + tempString + ";}";

        customCSS += "</style>";
        $("head").append(customCSS);

    }

    function addLeadingZero(n, len){
        var s = n.toString();
        if (s.length < len) {
            s = ('0000000000' + s).slice(-len);
        }
        return s;
    }

    function setSocialButtonPreview() {
        if($("input[name='widget_settings[show_close_button]']").is(":checked")) {
            $(".hide-menu-close-click").addClass("active");
        } else {
            if($(".ginger-menu-view:checked").val() != "corner_circle_view") {
                $(".hide-menu-close-click").removeClass("active");
            } else {
                $(".hide-menu-close-click").addClass("active");
            }
        }

        if($("#country_rules_custom").is(":checked")) {
            $(".custom-country-rule").addClass("active");
        } else {
            $(".custom-country-rule").removeClass("active");
        }

        if($("#user_rules_custom").is(":checked")) {
            $(".custom-user-rule").addClass("active");
        } else {
            $(".custom-user-rule").removeClass("active");
        }

        if($("#date_rules_custom").is(":checked")) {
            $(".custom-dates-rule").addClass("active");
        } else {
            $(".custom-dates-rule").removeClass("active");
        }

        if(!$("#channel-settings").hasClass("active")) {
            $(".button-list .channel-btn.active").removeClass("active");
            $(".ginger-sticky-buttons").removeClass("menu-open");
            $(".button-list").removeClass(animationClass);
            $(".main-button").removeClass("hide-tooltip");
            $(".main-button").addClass("active-tooltip");
        }

        var removemenuView = $(".button-list").attr("data-view");
        $(".button-list").removeClass(removemenuView);

        menuView = $(".ginger-menu-view:checked").val();
        $(".button-list").attr("data-view",menuView);
        $(".button-list").addClass(menuView);

        if(menuView == "list_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
            $(".ginger-sticky-buttons").addClass("view-list");
        } else {
            $(".ginger-sticky-buttons").removeClass("view-list");
        }
        if(menuView == "grid_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
            $(".ginger-sticky-buttons").addClass("view-grid");
        } else {
            $(".ginger-sticky-buttons").removeClass("view-grid");
        }


        setPreviewPopup();

        if($("#widget_icon_size").val() == "" ) {
            $(".ginger-sticky-buttons").hide();
            return;
        }
        if($(".btn-for-"+selectedDevice+":checked").length > 0) {
            channelString = "";
            if($(".btn-for-"+selectedDevice+":checked").length > 0) {
                $(".btn-for-"+selectedDevice+":checked").each(function(){
                    var socialIcon = $(this).closest("li.gsb-settings").find(".gsb-free-settings .gsb-input-icon").html();
                    socialIcon = socialIcon.replace('<a href="javascript:;" class="remove-channel-img"><span class="dashicons dashicons-no-alt"></span></a>', "");
                    tempString = $(this).closest("li.gsb-settings").attr("data-button");
                    var view = "";
                    var channel_list_title = "";
                    if(menuView == "list_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                        view = 'list-channel';
                        channel_list_title = $(this).closest("li.gsb-settings").find(".gsb-title input").val().replace(/(<([^>]+)>)/ig, "");
                        channel_list_title = '<div class="list-channel-title">'+channel_list_title+'</div>';
                    }
                    if(menuView == "grid_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                        view = 'grid-channel';
                    }

                    if(menuView == "menu_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                        channel_list_title = $(this).closest("li.gsb-settings").find(".gsb-title input").val().replace(/(<([^>]+)>)/ig, "");
                        channel_list_title = '<div class="menu-channel-title">'+channel_list_title+'</div>';
                    }

                    var contact_form_class = "";
                    if(tempString == "contact_form") {
                        contact_form_class = "open-contact-form-channel";
                    }
                    var whatsapp_class = "";
                    if(tempString == "whatsapp" && $("#show_whatsapp_popup").is(":checked")) {
                        whatsapp_class = "open-whatsapp-channel";
                    }
                    var wechat_class = "";
                    if(tempString == "wechat" && $("#wechat_qr_code_input").val() != '') {
                        wechat_class = "open-wechat-channel";
                    }
                    channelString += '<div class="channel-btn '+view+'">';
                    channelString += "<a class='channel-"+tempString+" gsb-social-channel "+contact_form_class+" "+whatsapp_class+" "+wechat_class+"' data-channel-class='channel-"+tempString+"' href='javascript:;'>"+socialIcon+channel_list_title+"</a>";
                    channelString += '</div>';
                });
                $(".ginger-sticky-buttons").show();
            } else {
                $(".ginger-sticky-buttons").hide();
            }


            /* CTA Text */
            var single_tooltip = $("#ginger_sb_"+tempString+"_title").val();
            tempString = $("#ginger_sb_call_to_action").val();

            $(".grid-title-container").remove();
            $(".ginger-sticky-buttons .button-list .channel-btn").remove();
            if($(".btn-for-"+selectedDevice+":checked").length == 1 && menuView == 'icon_view') {
                $(".ginger-sticky-buttons").addClass("one-channel");
                //$(".ginger-sticky-buttons .cta-button").hide();
                $(".ginger-sticky-buttons .main-button .single-btn").html(channelString);
                $(".ginger-sticky-buttons .main-button .single-btn").attr("data-ginger-tooltip",tempString);
                $(".ginger-sticky-buttons .main-button .single-btn").attr("data-ginger-tooltip-hover",single_tooltip);
                $(".ginger-sticky-buttons .main-button .single-btn .ginger-button-icon").addClass("active-tooltip");
                $(".ginger-sticky-buttons .main-button").removeAttr("data-ginger-tooltip");


                if(!$("#default_state_click").is(":checked")) {
                    $(".single-btn .channel-btn a").addClass($("#ginger_sb_animation").val());
                }
                $(".single-btn").attr("data-ginger-tooltip-location", $(".single-btn .ginger-button-icon").data("ginger-tooltip-location"));
                //$(".single-btn").attr("data-ginger-tooltip", $(".single-btn .ginger-button-icon").data("ginger-tooltip"));
                $(".single-btn .ginger-button-icon").removeAttr("data-ginger-tooltip-location");
                $(".single-btn .ginger-button-icon").removeAttr("data-ginger-tooltip");
                $(".single-btn").addClass("active-tooltip");
            } else {
                $(".ginger-sticky-buttons").removeClass("one-channel");
                $(".ginger-sticky-buttons").show();
                $(".ginger-sticky-buttons .main-button").show();
                var listChannelString = "";
                if(menuView == "list_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                    listChannelString += "<div class='channel-list-container'>";
                    if($("#grid_view_title_ifr").contents().find("body").html() != '<p><br data-mce-bogus="1"></p>'){
                        listChannelString += "<div class='grid-title-container'><div class='grid-title'>"+$("#grid_view_title_ifr").contents().find("body").html()+"</div></div>";
                    }
                    listChannelString += "<div class='channel-list'>";
                    listChannelString += channelString;
                    listChannelString += "</div>";
                    listChannelString += "</div>";

                } else if(menuView == "grid_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                    listChannelString = "<div class='channel-grid'>";
                    if($("#grid_view_title_ifr").contents().find("body").html() != '<p><br data-mce-bogus="1"></p>'){
                        listChannelString += "<div class='grid-title-container'><div class='grid-title'>"+$("#grid_view_title_ifr").contents().find("body").html()+"</div></div>";
                    }
                    listChannelString += "<div class='channel-grid-container'>";
                    listChannelString += channelString;
                    listChannelString += "</div>";
                    listChannelString += "</div>";
                } else {
                    listChannelString = channelString;
                }
                $(".button-list").html(listChannelString);
                $(".ginger-sticky-buttons .main-button").attr("data-ginger-tooltip", tempString);
                $(".ginger-sticky-buttons .main-button .single-btn").html("");


                if(menuView == "menu_view") {
                    $(".button-list.menu_view .channel-btn").each(function () {
                        $(this).find("span.ginger-button-icon").removeAttr("data-ginger-tooltip");
                    });
                }

            }
            $(".list_title_container").remove();
            if(menuView == "list_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                if($("#list_view_title").val() != "") {
                    var title_string = "";
                    title_string += "<div class='list_title_container'>";
                    title_string += "<span class='list_title'>"+$("#list_view_title").val().replace(/(<([^>]+)>)/ig, "")+"</span>";
                    title_string += "<span class='close-view-btn'><span class='dashicons dashicons-arrow-down-alt2'></span></span>";
                    title_string += "</div>";
                    $(".button-list.list_view .channel-list-container").before(title_string);
                }
                $(".channel-btn.list-channel").each(function () {
                    var channel_class = $(this).find(".gsb-social-channel").attr("data-channel-class");
                    $(this).find(".gsb-social-channel .ginger-button-icon").addClass(channel_class);
                    $(this).find(".gsb-social-channel").removeClass(channel_class);
                    $(this).find("span.ginger-button-icon").removeAttr("data-ginger-tooltip");
                });
            }

            if(menuView == "grid_view" && $(".btn-for-"+selectedDevice+":checked").length >= 1) {
                if($("#list_view_title").val() != "") {
                    var title_string = "";
                    title_string += "<div class='list_title_container'>";
                    title_string += "<span class='list_title'>"+$("#list_view_title").val().replace(/(<([^>]+)>)/ig, "")+"</span>";
                    title_string += "<span class='close-view-btn'><span class='dashicons dashicons-arrow-down-alt2'></span></span>";
                    title_string += "</div>";
                    $(".button-list.grid_view .channel-grid").before(title_string);
                }
            }


            /* set icon */
            if($("input[name='widget_settings[chat_icon]']:checked").length == 0) {
                $("input[name='widget_settings[chat_icon]']:first").attr("checked", true);
            }
            tempString = $("input[name='widget_settings[chat_icon]']:checked").val();
            $(".ginger-sticky-buttons .main-button .cta-button").html($("#chat_icon_"+tempString).closest("li").find("span.svg-icon").html());

            if($(".ginger-sticky-buttons").hasClass("open-form")) {
                $(".main-button").removeClass("hide-tooltip");
                $(".main-button").addClass("active-tooltip");
                $(".ginger-sticky-buttons").removeClass("open-form");
            }
            if($("#social-buttons-contact_form-settings").length) {
                $(".scw-form-container").remove();
                var contact_form = setContactForm();
                $(contact_form).insertBefore(".ginger-sticky-buttons .sticky-button-list .button-list");

            }

            if($(".ginger-sticky-buttons").hasClass("open-whatsapp-popup")) {
                $(".main-button").removeClass("hide-tooltip");
                $(".main-button").addClass("active-tooltip");
                $(".ginger-sticky-buttons").removeClass("open-whatsapp-popup");
            }
            if($("#social-buttons-whatsapp-settings").length && $("#show_whatsapp_popup").is(":checked")) {
                $(".whatsapp-popup").remove();
                var whatsapp_popup = setWhatsappPopup();
                $(whatsapp_popup).insertBefore(".ginger-sticky-buttons .sticky-button-list .button-list");
            }

            if($(".ginger-sticky-buttons").hasClass("open-wechat-popup")) {
                $(".main-button").removeClass("hide-tooltip");
                $(".main-button").addClass("active-tooltip");
                $(".ginger-sticky-buttons").removeClass("open-wechat-popup");
            }
            if($("#social-buttons-wechat-settings").length && $("#wechat_qr_code_input").val() != "") {
                $(".wechat-popup").remove();
                var wechat_popup = setWechatPopup();
                $(wechat_popup).insertBefore(".ginger-sticky-buttons .sticky-button-list .button-list");
            }

            /* Icon Size */
                tempString = parseInt($("input[name='widget_settings[icon_size]']").val());
                var buttonPadding = Math.ceil(tempString*2/10);
                $(".channel-btn, .single-btn .gsb-whatsapp-button, .single-btn .gsb-contact-button").css("width", tempString).css("height", tempString).css("line-height", tempString + "px");
                $(".channel-btn a, .main-action-button").css("width", tempString).css("height", tempString).css("line-height", tempString+"px").css("padding", buttonPadding+"px");
                $(".view-grid .grid_view .grid-channel a .ginger-button-icon.has-image").closest("a.gsb-social-channel").css("cssText", "padding:0 !important;").css("width", tempString).css("height", tempString).css("line-height", tempString+"px");
                // $(".main-action-button .cta-button").css("padding", buttonPadding+"px");
                // $(".channel-btn span.ginger-button-icon").css("width", (tempString - 20)).css("height", (tempString - 20));
                $(".channel-btn i").css("line-height", tempString + "px");
                var contact_bottom_spacing = tempString + 10;
                $(".ginger-sticky-buttons .scw-form-container, .ginger-sticky-buttons .whatsapp-popup, .ginger-sticky-buttons .wechat-popup").css("bottom", contact_bottom_spacing +"px");
                var contact_form_body_height = $(".preview-layout").find(".inner").outerHeight() - parseInt(tempString + 65);
                $(".ginger-sticky-buttons .scw-form-container .scw-form-body").css("max-height", contact_form_body_height +"px");
                var whatsapp_popup_body_height = $(".preview-layout").find(".inner").outerHeight() - parseInt(tempString + 65 + 10);
                $(".ginger-sticky-buttons .whatsapp-popup .whatsapp-popup-body, .ginger-sticky-buttons .wechat-popup .wechat-popup-body").css("max-height", whatsapp_popup_body_height +"px");
            $(".channel-btn span.ginger-button-icon.has-image, .ginger-sticky-buttons img, .channel-btn span.ginger-button-icon.has-image img").css("width",tempString).css("height",tempString).css("line-height", tempString+"px");

            var newWidgetSize = parseInt(tempString - parseInt(0.15*tempString));
            var newButtonPadding = Math.ceil(newWidgetSize*2/10);
            if($(".ginger-menu-view:checked").val() == "corner_circle_view") {
                $(".button-list .channel-btn a").css("width", newWidgetSize).css("height", newWidgetSize).css("line-height", newWidgetSize+"px").css("padding", newButtonPadding+"px");
                $(".button-list .channel-btn span.ginger-button-icon.has-image, .button-list .channel-btn span.ginger-button-icon.has-image img").css("width",newWidgetSize).css("height",newWidgetSize).css("line-height", newWidgetSize+"px");
            }

            tempString = parseInt($("input[name='widget_settings[border_radius]']").val());
            if(isNaN(tempString)) {
                tempString = 28;
            }

            $(".channel-btn a, .channel-btn, .ginger-sticky-buttons img, .close-gsb-button, .channel-btn span.ginger-button-icon, .channel-btn span.ginger-button-icon img").css("border-radius", tempString+"px").css("-moz-border-radius", tempString+"px").css("-webkit-border-radius", tempString+"px");

            /* Set Position */
            tempString = $("input[name='widget_settings[position]']:checked").val();
            if(tempString == "right") {
                $(".ginger-sticky-buttons").removeClass("left-position").addClass("right-position");
                $(".channel-btn, .channel-btn span.ginger-button-icon, .close-gsb-button, .single-btn").attr("data-ginger-tooltip-location", "left");
            } else if(tempString == "left") {
                $(".ginger-sticky-buttons").removeClass("right-position").addClass("left-position");
                $(".channel-btn, .channel-btn, .channel-btn span.ginger-button-icon, .close-gsb-button, .single-btn").attr("data-ginger-tooltip-location", "right");
            } else if(tempString == "custom") {
                tempString = $("#select-custom_position").val();
                if(tempString == "right") {
                    $(".ginger-sticky-buttons").removeClass("left-position").addClass("right-position");
                    $(".channel-btn, .channel-btn, .channel-btn span.ginger-button-icon, .close-gsb-button, .single-btn").attr("data-ginger-tooltip-location", "left");
                } else if(tempString == "left") {
                    $(".ginger-sticky-buttons").removeClass("right-position").addClass("left-position");
                    $(".channel-btn, .channel-btn, .channel-btn span.ginger-button-icon, .close-gsb-button, .single-btn").attr("data-ginger-tooltip-location", "right");
                }
            }

            if(menuView == "corner_circle_view") {
                $(".button-list .channel-btn, .button-list .channel-btn span.ginger-button-icon").attr("data-ginger-tooltip-location", "top");
            }

            if(menuView == "icon_view") {
                if($("#menu_view_vertical").is(":checked")) {
                    $(".ginger-sticky-buttons").removeClass("horizontal-menu").addClass("vertical-menu");
                } else {
                    $(".button-list .channel-btn, .button-list .channel-btn span.ginger-button-icon").attr("data-ginger-tooltip-location", "top");
                    $(".ginger-sticky-buttons").removeClass("vertical-menu").addClass("horizontal-menu");
                }
            } else {
                $(".ginger-sticky-buttons").removeClass("horizontal-menu").addClass("vertical-menu");
            }

            if($("#default_state_click").is(":checked")) {
                $(".ginger-sticky-buttons").addClass("menu-open");
                $(".button-list").addClass($("#ginger_menu_animation").val());
                $(".main-button").addClass("hide-tooltip").removeClass("active-tooltip");
                $(".button-list .channel-btn").addClass("active");

                if($("#show_close_button").is(":checked")) {
                    $(".ginger-sticky-buttons").removeClass("has-no-close-button");
                } else {
                    if($(".ginger-menu-view:checked").val() != "corner_circle_view") {
                        $(".ginger-sticky-buttons").addClass("has-no-close-button");
                    } else {
                        $(".ginger-sticky-buttons").removeClass("has-no-close-button");
                    }
                }
            } else {
                if(!$("#channel-settings").hasClass("active")) {
                    $(".ginger-sticky-buttons").removeClass("menu-open");
                    $(".button-list").removeClass($("#ginger_menu_animation").val());
                    $(".main-button").removeClass("hide-tooltip");
                    $(".button-list .channel-btn").removeClass("active");
                    $(".ginger-sticky-buttons").removeClass("has-no-close-button");
                } else {
                    $(".button-list .channel-btn").addClass("active");
                }
            }
            if(menuView == "list_view" || menuView == "grid_view") {
                $(".ginger-sticky-buttons").removeClass("has-no-close-button");
            }

            /* check for pending messages */
            if($("#has_pending_message").is(":checked")) {
                $(".pending-message-setting").addClass("active");
                $("#no_of_messages").addClass("is-required");
            } else {
                $(".pending-message-setting").removeClass("active");
                $("#no_of_messages").removeClass("is-required");
            }

            /* Tooltip Settings */
            inlineCSS = "<style>";

            inlineCSS += ".whatsapp-chat.no-user-profile:before { border-top: 0 solid transparent;}";
            inlineCSS += ".whatsapp-chat.no-user-profile { border-top-left-radius: 6px;}";

            var i = 0;
            var activeButtons =  $(".btn-for-"+selectedDevice+":checked").length;
            var widgetSize = parseInt($("input[name='widget_settings[icon_size]']").val());
            var menu_animation = $("#ginger_menu_animation").val();
            var buttonPosition = $("input[name='widget_settings[position]']:checked").val();
            var coordinates = 0;
            for(i=0; i < activeButtons; i++) {
                if ($(".ginger-menu-view:checked").val() == "corner_circle_view") {
                    if (buttonPosition == "right") {

                        coordinates = getCoordinates(i, widgetSize,buttonPosition);
                        inlineCSS += ".ginger-sticky-buttons .button-list.corner_circle_view .channel-btn:nth-child(" + (i + 1) + ") {opacity: 0; visibility: hidden; margin-bottom: 0; position: absolute;}";
                        inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.corner_circle_view .channel-btn:nth-child(" + (i + 1) + ") {transform: translate(" + (-1 * coordinates[0]) + "px, " + (-1 * coordinates[1]) + "px); opacity: 1; visibility: visible; transition: all ease-in-out 250ms, transform 200ms " + (150 * i) + "ms, opacity 200ms " + (150 * i) + "ms}";
                    } else {
                            coordinates = getCoordinates(i, widgetSize,buttonPosition);
                            inlineCSS += ".ginger-sticky-buttons .button-list.corner_circle_view .channel-btn:nth-child(" + (i + 1) + ") {opacity: 0; visibility: hidden; margin-bottom: 0; position: absolute;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.corner_circle_view .channel-btn:nth-child(" + (i + 1) + ") {transform: translate(" + coordinates[0] + "px, " + (-1 * coordinates[1]) + "px); opacity: 1; visibility: visible; transition: all ease-in-out 250ms, transform 200ms " + (150 * i) + "ms, opacity 200ms " + (150 * i) + "ms}";
                    }
                } else {
                    if($("#menu_view_vertical").is(":checked")) {
                        if(menu_animation == "ginger-menu-none") {
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1); display: none;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1);transition:none; display: block;}";
                        } else if(menu_animation == "ginger-menu-slide") {
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY("+((widgetSize + 5) * (activeButtons - i)) +"px) scale(1); transform: translateY("+((widgetSize + 5) * (activeButtons - i))+"px) scale(1); transition-delay: "+((i + 1)*0.090)+"s; opacity: 0; visibility:hidden;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";
                        } else if(menu_animation == "ginger-menu-fade"){
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1);  opacity: 1; visibility: visible;}";
                        } else if(menu_animation == "ginger-menu-spin"){
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px)  rotate(0deg); transform: translateY(0px) rotate(0deg); opacity: 0; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px) rotate(360deg); transform: translateY(0px)  rotate(360deg);opacity: 1;}";
                        } else if(menu_animation == "ginger-menu-pop"){
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px) scale(0); transform: translateY(0px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px) scale(1);}";
                        } else {
                            inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1); display: none;}";
                            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateY(0px); transform: translateY(0px)  scale(1); display: block;}";
                        }
                    }else {
                        if(buttonPosition == "right") {
                            if(menu_animation == "ginger-menu-none") {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: none;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: block;}";
                            } else if(menu_animation == "ginger-menu-slide") {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1); transform: translateX(" + ((widgetSize + 8   ) * (activeButtons - i)) + "px) scale(1); transition-delay: "+((i + 1)*0.075)+"s; opacity: 0; visibility:hidden;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px)  scale(1); opacity: 1; visibility: visible;}";
                            } else if(menu_animation == "ginger-menu-fade"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1);  opacity: 1; visibility: visible;}";
                            } else if(menu_animation == "ginger-menu-spin"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px)  rotate(0deg); transform: translateX(0px)  rotate(0deg); opacity: 0; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) rotate(360deg); transform: translateX(0px) rotate(360deg); opacity: 1;}";
                            } else if(menu_animation == "ginger-menu-pop"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(0); transform: translateX(0px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px) scale(1);}";
                            } else {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: none;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: block;}";
                            }
                            //customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1) rotate(360deg); transform: translateX(-" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1) rotate(360deg);}";
                        } else {
                            if(menu_animation == "ginger-menu-none") {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: none;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: block;}";
                            } else if(menu_animation == "ginger-menu-slide") {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(-" + ((widgetSize + 5) * (activeButtons - i)) + "px) scale(1); transform: translateX(-" + ((widgetSize + 5) * (activeButtons - i)) + "px) scale(1); transition-delay: "+((i + 1)*0.075)+"s; opacity: 0; visibility: hidden;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px)  scale(1); opacity: 1; visibility :visible;}";
                            } else if(menu_animation == "ginger-menu-fade"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); opacity: 0; visibility: hidden; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1);  opacity: 1; visibility: visible;}";
                            } else if(menu_animation == "ginger-menu-spin"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px)  rotate(0deg); transform: translateX(0px)  rotate(0deg); opacity :0; transition-delay: "+((activeButtons - i - 1)*0.1)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) rotate(360deg); transform: translateX(0px) rotate(360deg); opacity: 1;}";
                            } else if(menu_animation == "ginger-menu-pop"){
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(0); transform: translateX(0px) scale(0); transition-delay: "+((activeButtons - i - 1)*0.075)+"s;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px) scale(1); transform: translateX(0px) scale(1);}";
                            } else {
                                inlineCSS += ".ginger-sticky-buttons .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: none;}";
                                inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.icon_view .channel-btn:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(0px); transform: translateX(0px)  scale(1); display: block;}";
                            }
                            //customCSS += "#gsb-buttons-" + button.id + ".open-buttons .gsb-button-list .chat-button:nth-child(" + (i + 1) + ") {-webkit-transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px) scale(1) rotate(360deg); transform: translateX(" + ((widgetSize + 8) * (activeButtons - i)) + "px)  scale(1) rotate(360deg);}";
                        }
                    }
                }

            }

            //list view animation

            inlineCSS += ".ginger-sticky-buttons .button-list.list_view {-webkit-transform: translateY(50px) scale(1); transform: translateY(50px) scale(1); transition-delay: 0.5s; opacity: 0; visibility:hidden;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.list_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";

            inlineCSS += ".ginger-sticky-buttons .button-list.grid_view {-webkit-transform: translateY(50px) scale(1); transform: translateY(50px) scale(1); transition-delay: 0.5s; opacity: 0; visibility:hidden;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.grid_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";

            // Menu view
            inlineCSS += ".ginger-sticky-buttons .button-list.menu_view {-webkit-transform: translateY(50px) scale(1); transform: translateY(50px) scale(1); transition-delay: 0.2s; opacity: 0; visibility:hidden;}";
            inlineCSS += ".ginger-sticky-buttons .button-list.menu_view .channel-btn {transition-delay: 0.2s; opacity: 0; visibility:hidden;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open .button-list.menu_view .channel-btn {opacity: 1; visibility:visible;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open.right-position .button-list.menu_view {-webkit-transform: translateY(-"+contact_bottom_spacing+"px) scale(1); transform: translateY(-"+contact_bottom_spacing+"px)  scale(1);visibility: visible;opacity: 1;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open.left-position .button-list.menu_view {-webkit-transform: translateY(-5px) scale(1); transform: translateY(-5px)  scale(1);visibility: visible;opacity: 1;}";
            inlineCSS += ".ginger-sticky-buttons.menu-open.has-no-close-button .button-list.menu_view {-webkit-transform: translateY(0px) scale(1); transform: translateY(0px)  scale(1);visibility: visible;opacity: 1;}";

            if(($("input[name='widget_settings[default_state]']:checked").val() == "open" && $("input[name='widget_settings[show_close_button]']:checked").val() == "yes") || ($("input[name='widget_settings[default_state]']:checked").val() == "open" && $(".ginger-menu-view:checked").val() == "corner_circle_view")) {
                $(".ginger-sticky-buttons" ).addClass("has-no-animation");
            }
            if($("input[name='tooltip_settings[tooltip_height]']").val() == '') {
                tempString = 20;
            }else {
                tempString = parseInt($("input[name='tooltip_settings[tooltip_height]']").val());
            }
            inlineCSS += ".ginger-sticky-buttons [data-ginger-tooltip]:before{line-height: "+tempString+"px}";

            if($("input[name='tooltip_settings[border_radius]']").val() == '') {
                tempString = 5;
            }else {
                tempString = parseInt($("input[name='tooltip_settings[border_radius]']").val());
            }
            inlineCSS += ".ginger-sticky-buttons [data-ginger-tooltip]:before{border-radius: "+tempString+"px}";

            if($("input[name='tooltip_settings[font_size]']").val() == '') {
                tempString = 16;
            }else {
                tempString = parseInt($("input[name='tooltip_settings[font_size]']").val());
            }
            inlineCSS += ".ginger-sticky-buttons [data-ginger-tooltip]:before{font-size: "+tempString+"px}";

            inlineCSS += "</style>";

            if($(".ginger-sticky-buttons .button-list .ginger-button-icon").length > 0 && $(".channel-title").length > 0) {
                $(".channel-title").each(function(){
                    tempString = $(this).attr("data-channel");
                    if(menuView != "list_view" && menuView != "menu_view") {
                        $(".ginger-sticky-buttons .button-list .ssb-btn-bg-"+tempString).attr("data-ginger-tooltip", $(this).val());
                    }
                    if(menuView == "grid_view") {
                        $(".ginger-sticky-buttons .button-list .ssb-btn-bg-"+tempString).attr("data-ginger-tooltip-location", "top");
                    }
                });
            }

            $(".inline-style").html(inlineCSS);
            $(".ginger-sticky-buttons .remove-channel-img").remove();

            $(".ginger-sticky-buttons:not(.view-grid) span.has-image").each(function(){
                $(this).closest("a").css("padding","0px");
            });
            if($("#chat_icon_custom").is(":checked") && $("#custom_cta_icon").val() != "") {
                $(".gsb-main-action-button .cta-button").addClass("has-image");
            } else {
                $(".gsb-main-action-button .cta-button").removeClass("has-image");
            }

            $("#gsb-google-font").remove();
            var font_family = $("#ginger_sb_font_family").val();
            if(font_family != "" && font_family != "Arial" && font_family != "Tahoma" && font_family != "Verdana" && font_family != "Helvetica" && font_family != "Times New Roman" && font_family != "Trebuchet MS" && font_family != "Georgia") {
                $("head").append("<link id='gsb-google-font' href='https://fonts.googleapis.com/css?family="+ font_family +"' rel='stylesheet' type='text/css' >");
            }
            if(font_family == "") {
                $(".ginger-sticky-buttons").css("font-family", "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif");
            } else {
                $(".ginger-sticky-buttons").css("font-family", font_family);
            }

            $(".scw-pending-message").remove();
            if(($(".btn-for-"+selectedDevice+":checked").length == 1) || (($(".btn-for-"+selectedDevice+":checked").length > 1) && (!$("#default_state_click").is(":checked")))) {
                if($("#no_of_messages").val() != "" && $("#has_pending_message").is(":checked")) {
                    $(".gsb-main-action-button, .gsb-main-action-button > a, .single-btn > .channel-btn, .single-btn > .channel-btn a").append("<span class='scw-pending-message'>"+$("#no_of_messages").val()+"</span>");
                    var buttonSize = $(".main-action-button").outerHeight(true);
                    var tempString = (buttonSize * 20) / 54;
                    $(".scw-pending-message").css({"width":tempString+"px","height":tempString+"px","font-size":(parseInt(tempString / 4) + 5)+"px"});
                }
            }

            setColorChanges();

        } else {
            $(".ginger-sticky-buttons").hide();
        }
    }

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

    function saveChannelOrder() {
        tempString = "";
        $(".selected-button-settings .gsb-settings").each(function(){
            tempString += $(this).data("button")+",";
        });
        $("#gsb_selected_channels").val(tempString);
        setSocialButtonPreview();
    }

    function setContactForm() {
        var form_html = "";
        form_html += "<div class='scw-form-container'>";
        form_html += "<div class='scw-form-close'><span class='dashicons dashicons-arrow-down-alt2'></span></div>";
        form_html += "<div class='scw-form-title'>"+ $("input[name='contact_form_settings[form_title]']").val() +"</div>";
        form_html += "<div class='scw-form'>";
        form_html += "<div class='scw-form-body'>";

        $(".contact-form-toggle-fields .toggle-field").each(function (){
            if($(this).find(".visible_check").is(":checked")) {
                var require = "";
                var field_type = $(this).data("type");
                if($(".required_check").is(":checked")) {
                    require = "<span> *</span>";
                }
                form_html += "<div class='scw-form-field'>";
                form_html += "<label for='" + field_type + "'>" + $(this).find(".contact-form-input").val() + require + "</label>";
                if(field_type == "name" || field_type == "email" || field_type == "phone") {
                    form_html += "<input id='" + field_type + "' type='text' name='' class='scw-field' placeholder='" + $(this).find(".contact_form_custom_value").val() + "'>";
                } else if(field_type == "message") {
                    form_html += "<textarea id='" + field_type + "' name='' class='scw-field' placeholder='" + $(this).find(".contact_form_custom_value").val() + "'></textarea>";
                }
                form_html += "</div>";
            }
        });

        form_html += "</div>";
        form_html += "<div class='scw-form-btn'>";
        form_html += "<button type='button'>"+ $("input[name='contact_form_settings[btn_text]']").val() +"</button>";
        form_html += "</div>";
        form_html += "</div>";
        form_html += "</div>";

        var channelIcon = $(".close-gsb-action-button a").html();
        // channelIcon = channelIcon.replace('<a href="javascript:;" class="remove-channel-img"><span class="dashicons dashicons-no-alt"></span></a>', "");
        // channelIcon = channelIcon.replace('<input type="hidden" name="channel_settings[contact_form][image_id]" id="image_for_contact_form" value="">', '');
        // channelIcon = channelIcon.replace('<input type="hidden" name="channel_settings[contact_form][icon_class]" id="icon_for_contact_form" value="">', '');

        $(".gsb-contact-button").remove();
        var contact_btn = "<div class='gsb-contact-button'>" +
            "<a href='javascript:;' class='cta-button'>"+channelIcon+"</a>"+
            "</div>";
        $(".ginger-sticky-buttons .main-button .main-action-button").append(contact_btn);
        $(".ginger-sticky-buttons .main-button .single-btn").append(contact_btn);

        return form_html;

    }

    function setWhatsappPopup() {
        var currentDate = new Date();
        var currentMinute = (currentDate.getMinutes() < 10) ? "0"+currentDate.getMinutes() : currentDate.getMinutes();
        var currentHour = (currentDate.getHours() < 10) ? "0"+currentDate.getHours() : currentDate.getHours();
        var current_time = currentHour + ":" + currentMinute;
        var has_profile_img = "";
        if($("#whatsapp_user_profile_img").val() == '' ) {
            has_profile_img = "no-user-profile";
        }

        var whatsapp_popup = "";
        whatsapp_popup += '<div class="whatsapp-popup">';
        whatsapp_popup += '<div class="whatsapp-popup-header">';
        whatsapp_popup += '<div class="whatsapp-profile">';
        if($("#custom_whatsapp_profile").val() != "") {
            whatsapp_popup += '<img src="'+ $("#custom_whatsapp_profile").val() +'" alt="Profile image">';
        } else {
            whatsapp_popup += '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none"> <g filter="url(#filter0_f_9477_7201)"> <path d="M9.95924 25.2858L10.3674 25.5276C12.0818 26.545 14.0475 27.0833 16.052 27.0842H16.0562C22.2122 27.0842 27.2221 22.0753 27.2247 15.919C27.2258 12.9357 26.0652 10.1303 23.9565 8.01998C22.9223 6.97924 21.6919 6.15397 20.3365 5.59195C18.9812 5.02992 17.5278 4.74231 16.0606 4.74576C9.89989 4.74576 4.88975 9.75407 4.88756 15.91C4.88453 18.0121 5.47648 20.0722 6.59498 21.852L6.86071 22.2742L5.73223 26.394L9.95924 25.2858ZM2.50586 29.5857L4.41235 22.6249C3.23657 20.5878 2.618 18.2768 2.61873 15.9091C2.62183 8.50231 8.64941 2.47656 16.0564 2.47656C19.6508 2.47839 23.0245 3.87717 25.5618 6.41629C28.0991 8.95542 29.4952 12.3305 29.4939 15.9199C29.4906 23.3262 23.4621 29.353 16.0562 29.353H16.0504C13.8016 29.3521 11.592 28.788 9.62923 27.7177L2.50586 29.5857Z" fill="#B3B3B3"/> </g> <path d="M2.36719 29.447L4.27368 22.4862C3.09587 20.4442 2.47721 18.1278 2.48005 15.7705C2.48316 8.36364 8.51074 2.33789 15.9177 2.33789C19.5121 2.33972 22.8859 3.73849 25.4232 6.27762C27.9605 8.81675 29.3565 12.1918 29.3552 15.7812C29.3519 23.1875 23.3234 29.2143 15.9175 29.2143H15.9117C13.663 29.2134 11.4533 28.6493 9.49056 27.5791L2.36719 29.447Z" fill="white"/> <path d="M15.715 3.84769C9.17146 3.84769 3.85 9.16696 3.84767 15.7051C3.84445 17.9377 4.47318 20.1257 5.66119 22.016L5.94343 22.4646L4.48888 27.2525L9.23469 25.663L9.66824 25.9199C11.4891 27.0005 13.5769 27.5719 15.7061 27.5731H15.7105C22.249 27.5731 27.5705 22.2532 27.573 15.7146C27.5779 14.1562 27.2737 12.6123 26.6778 11.1722C26.082 9.73214 25.2064 8.42458 24.1017 7.3252C23.0032 6.21981 21.6963 5.34329 20.2567 4.74637C18.8171 4.14946 17.2734 3.844 15.715 3.84769Z" fill="#25D366"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0858 9.60401C11.8138 9.00922 11.5276 8.99717 11.2692 8.98687L10.5736 8.97852C10.3316 8.97852 9.93846 9.0679 9.60608 9.42544C9.27369 9.78297 8.33594 10.6471 8.33594 12.4046C8.33594 14.1622 9.63628 15.8605 9.81747 16.0991C9.99866 16.3377 12.3277 20.0594 16.0162 21.4913C19.0813 22.6813 19.705 22.4446 20.3706 22.3852C21.0361 22.3257 22.5175 21.521 22.8197 20.6869C23.1219 19.8527 23.1221 19.138 23.0315 18.9886C22.9409 18.8391 22.6989 18.7503 22.3357 18.5716C21.9725 18.3928 20.1888 17.5287 19.8562 17.4094C19.5236 17.2901 19.2818 17.2308 19.0396 17.5883C18.7975 17.9459 18.1029 18.7501 17.8911 18.9886C17.6793 19.227 17.4679 19.2569 17.1047 19.0783C16.7416 18.8998 15.5731 18.5224 14.1867 17.3054C13.108 16.3585 12.3799 15.1892 12.1679 14.8318C11.9559 14.4745 12.1454 14.2809 12.3274 14.1029C12.4902 13.9428 12.6901 13.6858 12.8719 13.4773C13.0537 13.2688 13.1135 13.1197 13.2343 12.8817C13.3551 12.6437 13.2949 12.4346 13.2041 12.256C13.1133 12.0774 12.4083 10.3105 12.0858 9.60401Z" fill="white"/> <defs> <filter id="filter0_f_9477_7201" x="1.21611" y="1.18682" width="29.5678" height="29.6889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> <feGaussianBlur stdDeviation="0.644873" result="effect1_foregroundBlur_9477_7201"/> </filter> </defs> </svg>';
        }
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-title-section">';
        whatsapp_popup += '<div class="whatsapp-popup-title">'+ $("#whatsapp_popup_title").val() +'</div>';
        whatsapp_popup += '<div class="whatsapp-popup-sub-title">'+ $("#whatsapp_popup_sub_title").val() +'</div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-close-btn"><span class="dashicons dashicons-arrow-down-alt2"></span></div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-body">';
        if($("#whatsapp_user_profile_img").val() != '' ) {
            whatsapp_popup += "<img src='"+ $("#whatsapp_user_profile_img").val() +"' class='wp-user-profile-img'>";
        }
        if($("#whatsapp_popup_text").val() != '') {
            whatsapp_popup += '<div class="whatsapp-chat '+has_profile_img+'">';
            whatsapp_popup += '<div class="whatsapp-chat-user-name">'+ $("#wp_name_to_display").val() +'</div>';
            whatsapp_popup += '<div class="whatsapp-chat-content">'+ $("#whatsapp_popup_text").val() + '</div>';
            whatsapp_popup += '<div class="whatsapp-chat-time">'+ current_time +'</div>'
            whatsapp_popup += '</div>';
        }
        whatsapp_popup += '</div>';
        whatsapp_popup += '<div class="whatsapp-popup-footer">';
        whatsapp_popup += '<input type="text" name="text" class="whatsapp-chat-input" value="">';
        whatsapp_popup += '<div class="whatsapp-form-btn">';
        whatsapp_popup += '<button type="button" class="whatsapp-send-btn">';
        whatsapp_popup += '<svg viewBox="0 0 24 24" height="24" width="24" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>';
        whatsapp_popup += '<span class="sr-only">Submit</span>'
        whatsapp_popup += '</button>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '</div>';
        whatsapp_popup += '</div>';

        var channelIcon = $(".close-gsb-action-button a").html();
        // channelIcon = channelIcon.replace('<a href="javascript:;" class="remove-channel-img"><span class="dashicons dashicons-no-alt"></span></a>', "");
        // channelIcon = channelIcon.replace('<input type="hidden" name="channel_settings[contact_form][image_id]" id="image_for_contact_form" value="">', '');
        // channelIcon = channelIcon.replace('<input type="hidden" name="channel_settings[contact_form][icon_class]" id="icon_for_contact_form" value="">', '');

        $(".gsb-whatsapp-button").remove();
        var contact_btn = "<div class='gsb-whatsapp-button'>" +
            "<a href='javascript:;' class='cta-button'>"+channelIcon+"</a>"+
            "</div>";
        $(".ginger-sticky-buttons .main-button .main-action-button").append(contact_btn);
        $(".ginger-sticky-buttons .main-button .single-btn").append(contact_btn);

        return whatsapp_popup;
    }

    function setWechatPopup() {
        var dots = "";
        if($("#wechat_qr_popup_heading").val() != '' && $("#ginger_sb_wechat_value").val() != '') {
            dots = ": ";
        }

        var wechat_popup = "";
        wechat_popup += '<div class="wechat-popup">';
        wechat_popup += '<div class="wechat-popup-header">';
        wechat_popup += '<div class="wechat-profile">';
        wechat_popup += '<svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 24 24" width="512" style="color: rgb(255, 255, 255); fill: rgb(255, 255, 255);"><path d="M12.82 9.618c-7.242 3.732-2.425 13.745 6.6 11.13.842.327 1.592.857 2.408 1.25-.21-.7-.436-1.412-.676-2.11 2.8-1.995 3.414-4.818 2.38-7.138-1.616-3.677-6.776-5.183-10.72-3.133zm2.53 3.658c-.21.655-1.156.85-1.615.353-.506-.46-.31-1.424.355-1.63.734-.3 1.582.54 1.26 1.277zm4.78.094h.014c-.257.587-1.14.725-1.575.27-.21-.192-.27-.48-.344-.733.104-.46.42-.937.93-.96.705-.098 1.336.776.975 1.422z"></path><path d="M17.414 8.248c-.436-2.144-1.936-3.955-3.824-5h.027v-.001C6.917-.54-1.425 4.742.187 10.97c.433 1.848 1.71 3.397 3.262 4.43-.3.853-.585 1.706-.855 2.565L5.52 16.4c1.17.377 2.415.56 3.66.52-1.538-4.412 2.407-9.086 8.234-8.67zm-6.077-2.56c.785-.316 1.713.345 1.65 1.2L13 6.89c.008.965-1.275 1.567-1.995.913-.747-.538-.535-1.845.342-2.115zM6.932 7.134c-.172.838-1.29 1.243-1.946.68-.76-.537-.546-1.868.345-2.14.873-.338 1.865.552 1.6 1.46z"></path></svg>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-title-section">';
        wechat_popup += '<div class="wechat-popup-title">'+ $("#wechat_qr_popup_heading").val() + dots + $("#ginger_sb_wechat_value").val() + '</div>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-close-btn"><span class="dashicons dashicons-arrow-down-alt2"></span></div>';
        wechat_popup += '</div>';
        wechat_popup += '<div class="wechat-popup-body">';
        if($("#wechat_qr_heading").val() != '') {
            wechat_popup += '<div class="wechat-qr-code-header">' + $("#wechat_qr_heading").val() + ':</div>';
        }
        wechat_popup += '<div class="wechat-qr-popup-img">';
        wechat_popup += '<img src="'+$("#wechat_qr_code_input").val()+'" alt="QR code">';
        wechat_popup += '</div>';
        wechat_popup += '</div>';
        wechat_popup += '</div>';

        var channelIcon = $(".close-gsb-action-button a").html();

        $(".gsb-wechat-button").remove();
        var contact_btn = "<div class='gsb-wechat-button'>" +
            "<a href='javascript:;' class='cta-button'>"+channelIcon+"</a>"+
            "</div>";
        $(".ginger-sticky-buttons .main-button .main-action-button").append(contact_btn);
        $(".ginger-sticky-buttons .main-button .single-btn").append(contact_btn);

        return wechat_popup;
    }

    function make_header_scticky() {
        if ($("#ginger-sticky-element").length) {
            var excludeHeight = 15;
            if (!$("#wpadminbar").hasClass("mobile")) {
                excludeHeight = 15 + parseInt($("#wpadminbar").height());
            }
            var topPosition = $("#ginger-sticky-element").offset().top - excludeHeight - $(window).scrollTop();
            $(".ginger-sticky-box").width($(".ginger-box-right").innerWidth() - 24);
            if (topPosition <= 0) {
                if (!$(".ginger-box-layout").hasClass("sticky")) {
                    $(".ginger-box-layout").addClass("sticky");
                    //$(".ginger-sticky-box").width($(".ginger-box-right").innerWidth() - 24);
                }
            } else {
                $(".ginger-box-layout").removeClass("sticky");
                //$(".ginger-box.ginger-sticky-box").width("width", "auto");
            }
            if($("#analytics-settings").length) {
                if ($(".ginger-box-layout").hasClass("sticky")) {
                    topPosition = $("#analytics-settings").offset().top - excludeHeight - $(window).scrollTop() - $(".ginger-sticky-box").height() + 15;
                    if(topPosition < 0) {
                        $(".ginger-sticky-box").css("margin-top",topPosition+"px");
                    } else {
                        $(".ginger-sticky-box").css("margin-top","0");
                    }
                }
            }
        }
        if($(".preview-layout").length) {
            // $(".preview-layout .preview-layout").width(parseInt($(".ginger-sticky-content").width());
            tempString = $("input[name='device_switch']:checked").val();
            if(tempString != "mobile") {
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width() * 0.6));
            } else {
                $(".preview-layout .inner").height(parseInt($(".preview-layout .inner").width()*1.6));
            }
        }
    }

    function setCountryDropdown() {

        if($("#ginger_sb_whatsapp_value").length) {
            $("#ginger_sb_whatsapp_value").intlTelInput({
                dropdownContainer: document.body,
                formatOnDisplay: true,
                hiddenInput: "full_number",
                initialCountry: "auto",
                nationalMode: false,
                initialDialCode: true,
                autoInsertDialCode: false
                // utilsScript: BUTTON_SETTINGS.utilScript
            }).on("countrychange",function () {
                var extention = $("#ginger_sb_whatsapp_value").intlTelInput("getSelectedCountryData");
                var number = $("#ginger_sb_whatsapp_value").val();
                if(number == "") {
                    $("#ginger_sb_whatsapp_value").val("+"+extention.dialCode);
                }
            });

            var inputOffset = $("#ginger_sb_whatsapp_value").offset();
            var inputWidth = $("#ginger_sb_whatsapp_value").outerWidth();
            var left = parseInt(inputOffset.left + inputWidth);
            var inputCSS = "body.rtl .iti.iti--container {left: " + left + "px !important;}";
            $("#intlinput_css_wp").remove();
            $("head").append("<style id='intlinput_css_wp'>"+inputCSS+"</style>");
        }


        if($("#ginger_sb_phone_value").length) {
            $("#ginger_sb_phone_value").intlTelInput({
                dropdownContainer: document.body,
                formatOnDisplay: true,
                hiddenInput: "full_number",
                initialCountry: "auto",
                nationalMode: false,
                initialDialCode: true,
                autoInsertDialCode: false
                // utilsScript: BUTTON_SETTINGS.utilScript
            }).on("countrychange",function () {
                var extention = $("#ginger_sb_phone_value").intlTelInput("getSelectedCountryData");
                var number = $("#ginger_sb_phone_value").val();
                if(number == "") {
                    $("#ginger_sb_phone_value").val("+"+extention.dialCode);
                }
            });

            var inputOffset = $("#ginger_sb_phone_value").offset();
            var inputWidth = $("#ginger_sb_phone_value").outerWidth();
            var left = parseInt(inputOffset.left + inputWidth);
            var inputCSS = "body.rtl .iti.iti--container {left: " + left + "px !important;}";
            $("#intlinput_css_phone").remove();
            $("head").append("<style id='intlinput_css_phone'>"+inputCSS+"</style>");

        }

        if($("#ginger_sb_sms_value").length) {
            $("#ginger_sb_sms_value").intlTelInput({
                dropdownContainer: document.body,
                formatOnDisplay: true,
                hiddenInput: "full_number",
                initialCountry: "auto",
                nationalMode: false,
                initialDialCode: true,
                autoInsertDialCode: false
                // utilsScript: BUTTON_SETTINGS.utilScript
            }).on("countrychange",function () {
                var extention = $("#ginger_sb_sms_value").intlTelInput("getSelectedCountryData");
                var number = $("#ginger_sb_sms_value").val();
                if(number == "") {
                    $("#ginger_sb_sms_value").val("+"+extention.dialCode);
                }
            });

            var inputOffset = $("#ginger_sb_sms_value").offset();
            var inputWidth = $("#ginger_sb_sms_value").outerWidth();
            var left = parseInt(inputOffset.left + inputWidth);
            var inputCSS = "body.rtl .iti.iti--container {left: " + left + "px !important;}";
            $("#intlinput_css_sms").remove();
            $("head").append("<style id='intlinput_css_sms'>"+inputCSS+"</style>");
        }
    }


    function showRequest(formData, jqForm, options) {
        $(".save-changes").prop("disabled", true);
        $(".save-changes + .scw-loader").addClass("active");
        $(".widget-save-btn + .scw-loader").addClass("active");
    }

    function showResponse(responseText, statusText, xhr, $form) {
        $(".save-changes + .scw-loader").removeClass("active");
        $(".widget-save-btn + .scw-loader").removeClass("active");
        responseText = $.parseJSON(responseText);
        const swipeHandler = new SwipeHandler();
        const toastsHandler = new ToastsHandler(swipeHandler);
        if(responseText.status == 1) {
            toastsHandler.createToast({
                type: "success",
                icon: "info-circle",
                message: responseText.message,
                duration: 3000
            });
            if(responseText.data.URL != "") {
                window.location = responseText.data.URL;
            } else {
                setTimeout(function (){
                    $(".save-changes").prop("disabled", false);
                }, 3000);
            }
        } else {
            $(".save-changes").prop("disabled", false);
            toastsHandler.createToast({
                type: "error",
                icon: "info-circle",
                message: responseText.message,
                duration: 5000
            });
        }
    }

    function triggerColorChange() {
        setSocialButtonPreview();
    }
})(jQuery);
