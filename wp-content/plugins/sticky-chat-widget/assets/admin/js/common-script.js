(function($) {
    "use strict";
    var errorCounter = 0;
    var errorMessage;
    var tempString;
    $(document).ready(function(){

        $(document).on("click", ".plan-switch", function(){
            if($(this).find("input[type='checkbox']").is(":checked")) {
                $(this).closest(".price-switch").find(".yearly-plan").removeClass("active");
                $(this).closest(".price-switch").find(".annualy-plan").addClass("active");
                var planPrice = $(this).closest(".price-switch").find(".annualy-plan").data("price");
                var planUrl = $(this).closest(".price-switch").find(".annualy-plan").data("url");
                var planDesc = $(this).closest(".price-switch").find(".annualy-plan").data("desc");
                var planType = $(this).closest(".price-switch").find(".annualy-plan").data("plan");
                $(this).closest(".price-table").find(".package-desc").text(planDesc);
                $(this).closest(".price-table").find(".package-price").html(planPrice+"<span>"+planType+"</span>");
                $(this).closest(".price-table").find(".checkout-url").attr("href", planUrl);
            } else {
                $(this).closest(".price-switch").find(".yearly-plan").addClass("active");
                $(this).closest(".price-switch").find(".annualy-plan").removeClass("active");
                var planPrice = $(this).closest(".price-switch").find(".yearly-plan").data("price");
                var planUrl = $(this).closest(".price-switch").find(".yearly-plan").data("url");
                var planDesc = $(this).closest(".price-switch").find(".yearly-plan").data("desc");
                var planType = $(this).closest(".price-switch").find(".yearly-plan").data("plan");
                $(this).closest(".price-table").find(".package-desc").text(planDesc);
                $(this).closest(".price-table").find(".package-price").html(planPrice+"<span>"+planType+"</span>");
                $(this).closest(".price-table").find(".checkout-url").attr("href", planUrl);
            }
        });

        $(document).on("click", ".faq-question", function(){
            if(!$(this).closest(".faq-item").hasClass("active")) {
                $(".faq-item").removeClass("active")
                $(this).closest(".faq-item").addClass("active");
                $(".faq-answer").slideUp();
                $(this).closest(".faq-item").find(".faq-answer").slideDown();
            }
        });

        $(document).on("click", ".pricing-switch a", function(e){
            e.preventDefault();
            if(!$(this).hasClass("active")) {
                $(".pricing-switch a").removeClass("active");
                $(this).addClass("active");
                if($(this).hasClass("monthly-plan")) {
                    $(".plan-switch").find("input[type='checkbox']").prop("checked",false);
                    $(".price-switch").find(".yearly-plan").addClass("active");
                    $(".price-switch").find(".annualy-plan").removeClass("active");
                    var planPrice1 = $(".table-1").find(".price-switch .yearly-plan").data("price");
                    var planPrice2 = $(".table-2").find(".price-switch .yearly-plan").data("price");
                    var planPrice3 = $(".table-3").find(".price-switch .yearly-plan").data("price");
                    var planUrl1 = $(".table-1").find(".price-switch .yearly-plan").data("url");
                    var planUrl2 = $(".table-2").find(".price-switch .yearly-plan").data("url");
                    var planUrl3 = $(".table-3").find(".price-switch .yearly-plan").data("url");
                    var planDesc1 = $(".table-1").find(".price-switch .yearly-plan").data("desc");
                    var planDesc2 = $(".table-2").find(".price-switch .yearly-plan").data("desc");
                    var planDesc3 = $(".table-3").find(".price-switch .yearly-plan").data("desc");
                    var planType1 = $(".table-1").find(".price-switch .yearly-plan").data("plan");
                    var planType2 = $(".table-2").find(".price-switch .yearly-plan").data("plan");
                    var planType3 = $(".table-3").find(".price-switch .yearly-plan").data("plan");
                    $(".table-1").find(".package-desc").text(planDesc1);
                    $(".table-2").find(".package-desc").text(planDesc2);
                    $(".table-3").find(".package-desc").text(planDesc3);
                    $(".table-1").find(".package-price").html(planPrice1+"<span>"+planType1+"</span>");
                    $(".table-2").find(".package-price").html(planPrice2+"<span>"+planType2+"</span>");
                    $(".table-3").find(".package-price").html(planPrice3+"<span>"+planType3+"</span>");
                    $(".table-1").find(".checkout-url").attr("href", planUrl1);
                    $(".table-2").find(".checkout-url").attr("href", planUrl2);
                    $(".table-3").find(".checkout-url").attr("href", planUrl3);
                } else {
                    $(".plan-switch").find("input[type='checkbox']").prop("checked",true);
                    $(".price-switch").find(".yearly-plan").removeClass("active");
                    $(".price-switch").find(".annualy-plan").addClass("active");
                    var planPrice1 = $(".table-1").find(".price-switch .annualy-plan").data("price");
                    var planPrice2 = $(".table-2").find(".price-switch .annualy-plan").data("price");
                    var planPrice3 = $(".table-3").find(".price-switch .annualy-plan").data("price");
                    var planUrl1 = $(".table-1").find(".price-switch .annualy-plan").data("url");
                    var planUrl2 = $(".table-2").find(".price-switch .annualy-plan").data("url");
                    var planUrl3 = $(".table-3").find(".price-switch .annualy-plan").data("url");
                    var planDesc1 = $(".table-1").find(".price-switch .annualy-plan").data("desc");
                    var planDesc2 = $(".table-2").find(".price-switch .annualy-plan").data("desc");
                    var planDesc3 = $(".table-3").find(".price-switch .annualy-plan").data("desc");
                    var planType1 = $(".table-1").find(".price-switch .annualy-plan").data("plan");
                    var planType2 = $(".table-2").find(".price-switch .annualy-plan").data("plan");
                    var planType3 = $(".table-3").find(".price-switch .annualy-plan").data("plan");
                    $(".table-1").find(".package-desc").text(planDesc1);
                    $(".table-2").find(".package-desc").text(planDesc2);
                    $(".table-3").find(".package-desc").text(planDesc3);
                    $(".table-1").find(".package-price").html(planPrice1+"<span>"+planType1+"</span>");
                    $(".table-2").find(".package-price").html(planPrice2+"<span>"+planType2+"</span>");
                    $(".table-3").find(".package-price").html(planPrice3+"<span>"+planType3+"</span>");
                    $(".table-1").find(".checkout-url").attr("href", planUrl1);
                    $(".table-2").find(".checkout-url").attr("href", planUrl2);
                    $(".table-3").find(".checkout-url").attr("href", planUrl3);
                }
            }
        });
    });

    $(window).on("scroll", function () {
        make_header_scticky();
    });

    $(window).on("resize", function () {
        make_header_scticky();
    });

    function make_header_scticky() {
        /*if($("#sticky-price-plan .plan-bottom-position").length) {

            $("#sticky-price-plan .plan-bottom-position").each(function () {
                if ($(".li-0").offset().top - $(window).scrollTop() - $(window).height() < -550) {
                    console.log($(".li-0").offset().top - $(window).scrollTop() - $(window).height())
                    $(this).closest(".price-table").removeClass("is-fixed");
                    //$(this).closest(".price-table").find(".plan-price-bottom").prop("style", "");
                    $(this).closest(".price-table").find(".plan-price-bottom").width($(this).closest(".price-table").width());
                } else {
                    console.log("fixed")
                    $(this).closest(".price-table").addClass("is-fixed");

                    //$(this).closest(".price-table").find(".plan-price-bottom").css("top", ($(window).height() - 125) + "px");
                    //$(this).closest(".price-table").find(".plan-price-bottom").css("left", $(this).offset().left + "px");
                    $(this).closest(".price-table").find(".plan-price-bottom").width($(this).closest(".price-table").width());
                }
            });
            if($(".li-2").length) {
                $(".li-3").each(function(){
                    if ($(this).offset().top - $(window).scrollTop() - $(window).height() < 0) {
                        $(this).closest(".price-table").find(".plan-price-bottom").addClass("active");
                    } else {
                        $(this).closest(".price-table").find(".plan-price-bottom").removeClass("active");
                    }
                });
            }
        }*/
    }
})(jQuery);
