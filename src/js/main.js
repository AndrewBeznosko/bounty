@import 'src/js/jquery-3.1.1.min.js';
@import 'src/bootstrap/bootstrap.min.js';
@import 'src/js/custom_scrollbar.min.js';

$(window).on("load", function () {
    $('.main-wrapper').addClass('show');
});

$(document).ready(function () {

    /* Custom select */
    $(".b-custom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="b-custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function () {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="b-custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".b-custom-select-trigger").on("click", function (event) {
        $('html').one('click', function () {
            $(".b-custom-select").removeClass("opened");
        });
        $(this).parents(".b-custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".b-custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".b-custom-select").removeClass("opened");
        $(this).parents(".b-custom-select").find(".b-custom-select-trigger").text($(this).text());
    });
    
    /* header-select */
    $(".js-header-select").each(function () {
        $(this).find(".item").each(function () {
            $(this).click(function () {
                $(this).addClass("selected").siblings().removeClass("selected");
            });
        });
    });
    
    /* toggler */
    $('.js-navbar-toggler').click(function () {
        $(this).toggleClass('open');
    });
    
    /* custom scroll */
    $(".card-content-wrapp").mCustomScrollbar({
        theme: "dark-3",
        scrollInertia: 200
    });
    
    /* progressbar width */
    var getWidth = $('.js-progressbar-line').data('width');
    $('.js-progressbar-line').css("width", getWidth + '%')
    
});
