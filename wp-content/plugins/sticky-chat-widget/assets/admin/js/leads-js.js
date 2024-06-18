(function($) {
    "use strict";
    var formOptions = {
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse
    };
    var ids = [];
    var id = "";
    var nonce = "";
    $(document).on("ready",function () {
        $(document).on("click",".ajax-pagination a", function (e) {
            e.preventDefault();
            var thisLink = $(this).prop("href");
            $(".gp-loader").addClass("disabled");

            var urlParams = new URLSearchParams(thisLink);
            var page = urlParams.get('paged');

            var url = new URL(window.location.href);
            var search_params = url.searchParams;
            if(page != null) {
                search_params.set('paged', page);
            } else {
                search_params.set('paged', 1);
            }
            url.search = search_params.toString();
            var new_url = url.toString();
            history.replaceState({}, "", new_url);

            $("#ajax-table").load(new_url + " #ajax-table-data", function () {
                $(".gp-loader").removeClass("disabled");
            });

        });

        $(document).on("mouseenter",".col-link a",function () {
            $(this).addClass("active-tooltip");
        });
        $(document).on("mouseleave",".col-link a",function () {
            $(this).removeClass("active-tooltip");
        });

        $(document).on("click",".leads-export:not(.disabled)",function (e) {
            $(this).addClass("disabled");
            e.preventDefault();
            var urlParams = new URLSearchParams(window.location.href);
            var start_date = urlParams.get('start_date');
            var end_date = urlParams.get('end_date');
            var search_lead = urlParams.get('search_lead');
            $.ajax({
                type: "POST",
                url: LEADS_DATA.AJAX_URL,
                data: {
                    start_date :start_date,
                    end_date : end_date,
                    search : search_lead,
                    action: 'scw_leads_download_csv',
                    nonce : $(this).attr("data-nonce")
                },
                success: function(res) {
                    console.log(res);
                     //* Make CSV downloadable

                    var downloadLink = document.createElement("a");
                    var fileData = ['\ufeff' + res];

                    var blobObject = new Blob(fileData, {
                        type: "text/csv;charset=utf-8;"
                    });

                    var url = URL.createObjectURL(blobObject);
                    downloadLink.href = url;
                    var da = $.now();
                    downloadLink.download = "report-"+da+".csv";
                     //* Actually download CSV

                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    $(".leads-export").removeClass("disabled");
                }
            });
        });

        $(document).on("change",".leads_selected",function() {
            var lenth = $(".leads-record .leads_selected:checked").length;
            if(lenth > 0) {
                $(".action-btn-row .gp-action-button.danger.delete-leads").removeClass("disabled");
            } else {
                $(".action-btn-row .gp-action-button.danger.delete-leads").addClass("disabled");
            }
        });

        $(document).on("click",".delete-leads:not(.disabled)",function () {
            $(".leads-record .leads_selected:checked").each(function () {
                ids.push($(this).val());
            });
            $("#delete-leads").addClass("active");
        });
        $(document).on("click",".delete-all-leads",function () {
            $("#delete-all-leads").addClass("active");
        });
        $(document).on("click",".delete-single-lead",function () {
            id = $(this).attr("data-id");
            nonce = $(this).attr("data-nonce");
            $("#delete-single-lead").addClass("active");
        });


        $(document).on("click","#delete_leads",function (e) {
            $(this).addClass("disabled");
            $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
            e.preventDefault();
            $.ajax({
                url: LEADS_DATA.AJAX_URL,
                data: {
                    ids: ids,
                    action: "gsb_buttons_remove_leads",
                    nonce : $("#remove_leads_nonce").val()
                },
                type: 'post',
                success: function(responseText) {
                    $("#delete-leads").removeClass("active");
                    $("#delete-leads").removeClass("disabled");
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
        });
        $(document).on("click","#delete_single_lead",function (e) {
            $(this).addClass("disabled");
            $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
            e.preventDefault();
            $.ajax({
                url: LEADS_DATA.AJAX_URL,
                data: {
                    id: id,
                    action: "gsb_buttons_remove_single_lead",
                    nonce : nonce
                },
                type: 'post',
                success: function(responseText) {
                    $("#delete-single-lead").removeClass("active");
                    $("#delete_single_lead").removeClass("disabled");
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
        });


        $(document).on("click","#delete_all_leads",function (e) {
            $(this).addClass("disabled");
            $(this).closest(".gp-modal").find(".gp-modal-content").addClass("form-loading");
            e.preventDefault();
            $.ajax({
                url: LEADS_DATA.AJAX_URL,
                data: {
                    ids: ids,
                    action: "gsb_buttons_remove_all_leads",
                    nonce : $("#remove_all_leads_nonce").val()
                },
                type: 'post',
                success: function(responseText) {
                    $("#delete-all-leads").removeClass("active");
                    $("#delete-all-leads").removeClass("disabled");
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
        });
        $(document).on("click",".hide-gp-modal , .gp-modal-close-btn, .gp-modal-bg", function () {
            $(".gp-modal").removeClass("active");
        });
        $(document).on('keyup', function(e) {
            if (e.which == 27) {
                $(".gp-modal").removeClass("active");
            }
        });

        $("#filter-start-date").datetimepicker({
            format: 'Y-m-d',
            closeOnDateSelect: true,
            closeOnTimeSelect: true,
            timepicker: false
        }).on("change", function () {
            dateTimePicker();
        });
        $("#filter-end-date").datetimepicker({
            format: 'Y-m-d',
            closeOnDateSelect: true,
            closeOnTimeSelect: false,
            timepicker: false
        }).on("change",function () {
            dateTimePicker();
        });

        $(document).on("click",".submit-filter",function(e) {
            e.preventDefault();
            var start_date = $(this).closest(".filter-inputs").find("#filter-start-date").val();
            var end_date = $(this).closest(".filter-inputs").find("#filter-end-date").val();
            var search_filter = $(this).closest(".filter-inputs").find("#search-filter").val();

            var url = new URL(window.location.href);

            var search_params = url.searchParams;
            search_params.set('start_date', start_date);
            search_params.set('end_date', end_date);
            search_params.set('search_lead', search_filter);

            var urlParams = new URLSearchParams(window.location.href);
            var page = urlParams.get('paged');
            if(page == 1) {
                search_params.delete('paged');
            }

            url.search = search_params.toString();
            var new_url = url.toString();
            history.replaceState({}, "", new_url);

            $("#ajax-table").load(new_url + " #ajax-table-data", function () {
                $(".gp-loader").removeClass("disabled");
            });
        })

    });

    function dateTimePicker() {
        var maxDate = $("#filter-end-date").val();
        var minDate = $("#filter-start-date").val();
        if(maxDate != "" ) {
            $("#filter-start-date").datetimepicker("destroy");
            $("#filter-start-date").datetimepicker( {
                format: 'Y-m-d',
                maxDateTime : maxDate,
                timepicker: false,
            });
        }
        if(minDate != "" ) {
            $("#filter-end-date").datetimepicker("destroy");
            $("#filter-end-date").datetimepicker( {
                format: 'Y-m-d',
                minDateTime : minDate,
                timepicker: false,
            });
        }
    }

    function showRequest(formData, jqForm, options) {
        $(".save-changes").prop("disabled", true);
        $(".save-changes + .scw-loader").addClass("active");
    }

    function showResponse(responseText, statusText, xhr, $form) {
        $(".save-changes + .scw-loader").removeClass("active");
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
            }, 1000);
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

})(jQuery);