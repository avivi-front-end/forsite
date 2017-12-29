$(document).ready(function() {
    // btn closed menu
    // $('#js-btn--menu').click(function() {
    //     $(this).toggleClass('is-active') ;
    // });
    // modal window toggle
    $('.js-register-switch').click(function(){
        $(this).toggleClass('register__visible');
        $('.register__trigger__span').toggleClass('register__visible');
        $('.jurname-row').toggleClass('register__visible');
    });
    // delete plagin jquery pagepiling
    destroyPageScroll();
    // plagin jquery pagepiling
    pageScroll();
    //paralax mouse effect
    var paralaxMain = (function () {
        $('.main').mousemove(function(e) {
            if ($(window).width() > 1280) {
                parallax(e, document.getElementById('c1'), 1);
            }
            // parallax(e, document.getElementById('c2'), 1);
        });
        function parallax(e, target, layer) {
            var strength = 35;
            var layer_coeff = strength / layer;
            var x = (e.pageX - ($(window).width() / 2)) / layer_coeff;
            var y = (e.pageY - ($(window).height() / 2)) / layer_coeff;
            // var x = ($(window).width() - target.offsetWidth) / 2 - (e.pageX - ($(window).width() / 2)) / layer_coeff;  //centred paralax-image
            // var y = ($(window).height() - target.offsetHeight) / 2 - (e.pageY - ($(window).height() / 2)) / layer_coeff;  //centred paralax-image
            $(target).offset({
                top: y -30,
                left: x -250
            });
        };
    })();
    var paralaxServices = (function () {
        $('.services').mousemove(function(e) {
            if ($(window).width() > 1280) {
                parallax(e, document.getElementById('c2'), 1);
            }
        });
        function parallax(e, target, layer) {
            var strength = 35;
            var layer_coeff = strength / layer;
            var x = (e.pageX - ($(window).width() / 2)) / layer_coeff;
            var y = (e.pageY - ($(window).height() / 2)) / layer_coeff;
            $(target).offset({
                top: y  + 55,
                left: x -170
            });
        };
    })();
    var paralaxWhyWe = (function () {
        $('.why-we').mousemove(function(e) {
            if ($(window).width() > 1280) {
                parallax(e, document.getElementById('c3'), 1);
            }
        });
        function parallax(e, target, layer) {
            var strength = 35;
            var layer_coeff = strength / layer;
            var x = (e.pageX - ($(window).width() / 2)) / layer_coeff;
            var y = (e.pageY - ($(window).height() / 2)) / layer_coeff;
            if ($(window).width() > 1440) {
                $(target).offset({
                    top: y,
                    left: x
                });
            }
            if ($(window).width() > 1360) {
                $(target).offset({
                    top: y,
                    left: x + 250
                });
            }
        };
    })();
    var paralaxContacts = (function () {
        $('.contacts').mousemove(function(e) {
            if ($(window).width() > 1280) {
                parallax(e, document.getElementById('c4'), 1);
            }
        });
        function parallax(e, target, layer) {
            var strength = 100;
            var layer_coeff = strength / layer;
            var x = ($(window).width() - target.offsetWidth) / 2 - (e.pageX - ($(window).width() / 2)) / layer_coeff;
            var y = ($(window).height() - target.offsetHeight) / 2 - (e.pageY - ($(window).height() / 2)) / layer_coeff;
            // console.log(layer_coeff);
            // console.log(x);
            if ($(window).width() > 1440) {
                $(target).offset({
                    top: y + 250,
                    left: x + 550
                });
            }
            if ($(window).width() > 1360) {
                $(target).offset({
                    top: y + 300,
                    left: x + 450
                });
            }
        };
    })();
    scrollDown();
    //tabs
    tabSwitcher();
    //slider why-we
    sliderWhyWe ();
    //slider steps
    stepsSlider ();
    // scroll plagin for menu init
    $(window).on("load",function(){
        $(".nav").mCustomScrollbar({});
    });
    //yandex map
    ymaps.ready(init);
    var myMap, myPlacemark;
});
function pageScroll() {
    $('#pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['#b3b0aa', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fivePage', 'sixPage'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
            'textColor': '#fff',
            'bulletsColor': 'rgba(0, 0, 0, 0.3)',
            'position': 'right',
            'tooltips': ['Главная', 'О компании', 'Услуги', 'Почему мы', 'Этапы работы', 'Контакты']
        },
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,
        // change color for header
        onLeave: function(index, nextIndex, direction){
            if(nextIndex == 2 || nextIndex == 4 || nextIndex == 5 || nextIndex == 6){
                $('.header').addClass('header-black');
            }
            else if(nextIndex == 1 || nextIndex == 3){
                $('.header').removeClass('header-black');
            }
        },
        // autoplay video in chrome
        afterLoad: function(anchorLink, index){
            if(index == 5){
                document.getElementById('bgvid').play();
            }
        }
    });
}
function tabSwitcher(){
    var $btn = $('.switch__link');
    var $tab = $('.tab');

    $('#tab2').css('display','none');

    $btn.on('click', function(e){
        e.preventDefault();
        var $tabId = $(this).attr('href');
        $btn.removeClass('active');
        $(this).addClass('active');
        $tab.hide();
        $($tabId).show();
    });
}
function sliderWhyWe () {
    $('.why-we__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.why-we__slider-nav',
        cssEase: 'linear'
    });
    $('.why-we__slider-nav').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: '.why-we__slider',
        dots: false,
        focusOnSelect: true,
        vertical: true
    });
}
function stepsSlider () {
    $('.steps__slider-view').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        // asNavFor: '.steps__slider-nav',
        cssEase: 'linear'
    });
    // $('.steps__slider-nav').slick({
    //     slidesToShow: 6,
    //     slidesToScroll: 1,
    //     asNavFor: '.steps__slider-view',
    //     focusOnSelect: true,
    //     dots: false
    // });
}
//yandex map
function init(){
    myMap = new ymaps.Map("map", {
        center: [59.94, 30.26],
        controls: [], // remove all controls elements
        zoom: 15
    });

    myPlacemark = new ymaps.Placemark([59.940654, 30.262445], {
        hintContent: 'Форсайт',
        balloonContent: 'г. Санкт-Петербург, 18-я линия В.О., дом 45'
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);

}
function scrollDown() {
    $("#scroll_down").click(function() {
        $.fn.pagepiling.moveSectionDown();
    });
}
function destroyPageScroll() {
    if ($(window).width() < 760) {
        $.fn.pagepiling.destroy('all');
    }
}