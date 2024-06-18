(function($) {
    "use strict";
    var scwPluginSlug = "sticky-chat-widget";
    var errorCount = 0;
    $(document).ready(function(){
        $(document).on("click","."+scwPluginSlug+"-close-button", function(){
            $("#"+scwPluginSlug+"-popup-form").hide();
        });
        $(document).on('click', 'tr[data-slug="' + scwPluginSlug + '"] .deactivate', function (e) {
            e.preventDefault();
            $("#"+scwPluginSlug+"-popup-form").show();
        });
        $(document).on('click', "."+scwPluginSlug+"-skip-feedback", function() {
            $("#"+scwPluginSlug+"-popup-form").hide();
            window.location.href = $("tr[data-slug='" + scwPluginSlug + "'] .deactivate a").attr('href');
        });
        $(document).on("click","."+scwPluginSlug+"-close-button", function(){
            $("#"+scwPluginSlug+"-popup-form").hide();
        });
        $(document).on("submit", "#"+scwPluginSlug+"-deactivate-form", function(){
            errorCount = 0;
            $("#"+scwPluginSlug+"-deactivate-form .error-message").remove();
            $("#"+scwPluginSlug+"-deactivate-form .input-error").removeClass("input-error");
            if($.trim($("#deactivate_comment-"+scwPluginSlug).val()) == "") {
                $("#deactivate_comment-"+scwPluginSlug).addClass("input-error");
                $("#deactivate_comment-"+scwPluginSlug).after("<span class='error-message'>"+SCW_SETTINGS.required_message+"</span>");
                errorCount++;
            }
            if(errorCount == 0) {
                $("."+scwPluginSlug+"-loader").addClass("active");
                $("."+scwPluginSlug+"-popup-submit").attr("disabled", "disabled");
                $.ajax({
                    url: SCW_SETTINGS.ajax_url,
                    type: 'POST',
                    data: $("#"+scwPluginSlug+"-deactivate-form").serialize()
                }).done(function () {
                    $("#"+scwPluginSlug+"-popup-form").hide();
                    window.location.href = $("tr[data-slug='" + scwPluginSlug + "'] .deactivate a").attr('href');
                });
            }
            return false;
        });
    });
})(jQuery);