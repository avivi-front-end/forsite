$(document).ready(function() {
    // plagin jquery pagepiling (on and off)
    (function(){
        if ( $(window).width() > 767 ) {
            pageScroll();
        } else {
            $('.del-pagepiling').remove();
        }
    })();
    //parallax
    (function(){
        if ($('#main-parallax').length > 0) {
            mainParallax();
            console.log("wdwrwerew")
        }
    })();
    (function(){
        if ($('#scene').length > 0 ) {
            servicesParallax();
        }
    })();
    (function(){
        if ($('#why-we-parallax').length > 0 ) {
            whyWeParallax();
        }
    })();
    (function(){
        if ($('#contacts-parallax').length > 0 ) {
            contactsParallax();
        }
    })();
    // modal window toggle
    $('.js-register-switch').click(function(){
        $(this).toggleClass('register__visible');
        $('.register__trigger__span').toggleClass('register__visible');
        $('.jurname-row').toggleClass('register__visible');
        if($(this).find(".register__visible")) {
            $('.select-ooo').styler({
                selectSmartPositioning: false
            });
        }
    });
    scrollDown();
    //tabs
    tabSwitcher();
    //slider why-we
    sliderWhyWe ();
    //slider steps
    stepsSlider ();
    //yandex map
    ymaps.ready(init);
    var myMap, myPlacemark;
    //formstyler for select
    // $('.select-ooo').styler();
    $('.select-theme').styler({
        selectSearch: true,
        selectSearchLimit: 2,
        selectSearchPlaceholder: 'Начните вводить',
        selectSmartPositioning: false,
        selectPlaceholder: 'Начните вводить'
    });
    // submit forms modal window
    $(document).on("submit", ".question-form", function(e){
        e.preventDefault();
        var closeButton = $(this).closest("#question").find(".fancybox-close-small");
        $.ajax({
            url: 'question-form-ajax.php',
            data: $(this).serialize(),
            dataType: "html",
            type: 'POST',
            success: function(html){
                closeButton.trigger("click");
                setTimeout(popNext("#call_success", "call-popup"), 1500);
            }
        });
    });
    $(document).on("submit", ".register", function(e){
        e.preventDefault();
        var closeButton = $(this).closest("#call-popup").find(".fancybox-close-small");
        console.log($(this).serialize() + "&person=" + person);
        $.ajax({
            url: 'question-form-ajax.php',
            data: $(this).serialize() + "&person=" + person,
            dataType: "html",
            type: 'POST',
            success: function(html){
                closeButton.trigger("click");
                setTimeout(popNext("#call_success", "call-popup"), 1500);
            }
        });
    });
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
// scroll plagin for menu init
$(window).on("load",function(){
    $(".nav").mCustomScrollbar({});
});
function mainParallax(){
    if ($(window).width() > 1280 && $("html").is(".ipad")!==true) {
        var main = document.getElementById('main-parallax');
        var parallax = new Parallax(main);
    }
}
function servicesParallax(){
    if ($(window).width() > 1280 && $("html").is(".ipad")!==true) {
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
    }
}
function whyWeParallax(){
    if ($(window).width() > 1280 && $("html").is(".ipad")!==true) {
        var whyWe = document.getElementById('why-we-parallax');
        var parallax = new Parallax(whyWe);
        console.log('I working')
    }
}
function contactsParallax(){
    if ($(window).width() > 1280 && $("html").is(".ipad")!==true) {
        var contacts = document.getElementById('contacts-parallax');
        var parallax = new Parallax(contacts);
    }
}