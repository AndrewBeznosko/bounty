
$(window).on("load", function () {
    $('.main-content').addClass('show');
});

$(document).ready(function () {
    
    /* Custom select */
    function selectDropdownItem() {
        $(".input-group.dropdown .dropdown-item").each(function () {
            $(this).click(function () {
                var getText = $(this).text();
                $(this).parents('.dropdown').find('input[type="text"]').val(getText);
            });
        });
    }

    // Add slideDown animation to Bootstrap dropdown when expanding.
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
        
        selectDropdownItem();
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
    });

    /* ScrollBar include */
    function castomScrollBar() {
        $(".list").mCustomScrollbar({
            theme: "dark-3",
            scrollInertia: 200
        });
    }
    castomScrollBar();

    $(window).on("load resize ", function () {
        castomScrollBar();
    }).resize();

    $(".side_navigation").load("side_navigation.html");
    $('#nav-toggler').click(function () {
        $(this).toggleClass('open');
    });
    // Universal select header
    $(".js-header-select").each(function () {
        $(this).find(".item").each(function () {
            $(this).click(function () {
                $(this).addClass("selected").siblings().removeClass("selected");
            });
        });
    });


    /* sec-left bookmark check */
    $("li.item").each(function () {
        $(this).click(function () {
            $(this).toggleClass("checked").siblings().removeClass("checked");
        });

    });

    /* sec-center bell check */
    $(".bell_wrapp").each(function () {
        $(this).click(function () {
            if ($(this).parents("tr").hasClass("checked")) {
                $(this).parents("tr").removeClass("checked");
            } else
                $(this).parents("tr").addClass("checked");

        });

    });

    /* Choose lang */
    $("#dropdownLang-list .dropdown-item").each(function () {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var getLangName = $(this).text();
            $(".LangName").text(getLangName);
        });

    });

    /* Choose currency */
    $("#dropdownCurrency-list .dropdown-item").each(function () {
        $(this).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var getCurrencyName = $(this).text();
            $(".currencyName").text(getCurrencyName);
        });

    });

    /* Choose theme */
    $("#switch_theme").click(function () {
        $("body").toggleClass("light_theme");
        $(this).children("span").toggleClass("b-icon-Sun b-icon-moon");

        if ($('body').hasClass("light_theme")) {
            localStorage.setItem('myItem', 'light_theme');
        } else {
            localStorage.setItem('myItem', '');
        }
    });

    // table <tr> as link
    $('tr[data-href]').click(function () {
            document.location = $(this).data('href');
        })
        .find('.modal-link')
        .click(function (e) {
            //        e.preventDefault();
            e.stopPropagation();
            if ($(e.target).hasClass('usd')) {
                $('#withdraw-of-cash_modal').modal('show');
            } else if ($(e.target).hasClass('cash')) {
                $('#withdraw_modal-1').modal('show');
            } else {
                $('#withdraw_modal').modal('show');
            }
        });

    //password mask 
    $('.js-password-eye').click(function () {
        var icon = $(this).find(".b-icon");

        if (icon.hasClass('b-icon-eye_slash')) {
            icon.removeClass('b-icon-eye_slash').addClass('b-icon-eye');
            icon.parents(".input-group").find("input").attr('type', 'text');
        } else {
            icon.removeClass('b-icon-eye').addClass('b-icon-eye_slash');
            icon.parents(".input-group").find("input").attr('type', 'password');
        }
    });
});

// light theme template
if (localStorage.getItem('myItem') == 'light_theme') {
    $('body').addClass('light_theme');
}

// calculate height cender side
$(window).on("load resize ", function () {
    if ($(window).width() < 1500 && $(window).width() > 768) {
        $(".sec-center").mCustomScrollbar({
            theme: "dark-3",
            scrollInertia: 200
        });
    } else {
        $(".sec-center").mCustomScrollbar("destroy");
    }
}).resize();
