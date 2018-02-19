$(document).ready(function() {
    // plagin jquery pagepiling (on and off)
    (function(){
        if ( $('div').hasClass('section') !== true ) {
            $('.del-pagepiling').remove();
        }
    })();
    (function(){
        if ( $(window).width() > 767 && $('div').hasClass('section') ) {
            pageScroll();
        } else {
            $('.del-pagepiling').remove();
        }
    })();
    //parallax
    (function(){
        if ($('#main-parallax').length > 0) {
            mainParallax();
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
    sliderWhyWe ();
    stepsSlider ();
    headerMobile();
    //yandex map
    (function(){
        if ($('#map').length > 0) {
            ymaps.ready(init);
            var myMap, myPlacemark;
        }
    })();
    //formstyler for select
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
    var tooltipsArrMain = ['Главная', 'О компании', 'Услуги', 'Почему мы', 'Этапы работы', 'Контакты'];
    var tooltipsArrOther = ['Главная', 'О компании', 'Почему мы', 'Этапы работы', 'Контакты'];
    var tooltip = (function(){
        if ( $(document).find('.section').length > 5 ) {
            console.log('section > 5');
            return tooltipsArrMain
        } else {
            console.log('section <<< 5');
            return tooltipsArrOther
        }
    })();
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
            'tooltips': tooltip
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
        vertical: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 9
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 8,
                    arrows: false
                }
            }
        ]
    });
}
function stepsSlider () {
    $('.steps__slider-view').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        cssEase: 'linear',
        infinite: false
    });
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
    },{
            iconLayout: 'default#image',
            iconImageHref: './images/mark-map.png',
            iconImageSize: [69, 100],
            iconImageOffset: [-35, -100]
        }
    );
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
function headerMobile() {
    if( $(window).width() <= 767 ) {
        $(window).on('scroll',function(){
            if ($(this).scrollTop() > 300) {
                $('.header').css({"background-color": "#fff", "padding": "10px", "transition": "0.5s"}).addClass('header-black');
            }
            else {
                $('.header').css({"background-color": "transparent", "padding": "10px", "transition": "0.5s"}).removeClass('header-black');
            }
        });
    }
}
// change color header for static pages
function headerNotPagepilling () {
    if ( $('div').hasClass('section') !== true && $(window).width() >= 767) {
        $(window).on('scroll',function(){
            var block = $('.salary-main').height();
            if ($(this).scrollTop() > block) {
                $('.header').addClass('header-black');
            }
            else {
                $('.header').removeClass('header-black');
            }
        });
    }
}
headerNotPagepilling ();
// open fancybox pop-up
function popNext(popupId){
    $.fancybox.open({
        src:popupId,
        opts:{
            afterClose: function(){
                $('form').trigger("reset");
                clearTimeout(timer);
            }
        }
    });
    var timer = null;
}
(function(){
    if ( $('div').hasClass('salary-main')) {
        setTimeout(function(){
            popNext('#question-salary')
        },120000);
    }
})();
// scroll to block
$(document).on("click", "#js-scroll-down", function(e){
    var elementClick = $(this).find('a').attr("href");
    var targetHeight = $("#to-help");
    var headerHeight = $(".header").height() + 50;
    var destination = targetHeight.offset().top - headerHeight;
    jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
    }, 800);
    return false;
});

$(document).on("click", ".b-help__btn", function(e){
    var btn = $(this).attr('data-call-popup-1'); // result: '1' or '2' ...
    var formLi = $('#call-popup-1 option');
    // var selectAttr = formLi.attr('data-option');
    // console.log(formLi);
    if (btn === '1') {
        // console.log('first btn');
        formLi.each(function() {
            // console.log($(this).attr('data-option'));
            if ( $(this).attr('data-option') === '1' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
    if (btn === '2') {
        formLi.each(function() {
            if ( $(this).attr('data-option') === '2' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
    if (btn === '3') {
        formLi.each(function() {
            if ( $(this).attr('data-option') === '3' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
    if (btn === '4') {
        formLi.each(function() {
            if ( $(this).attr('data-option') === '4' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
    if (btn === '5') {
        formLi.each(function() {
            if ( $(this).attr('data-option') === '5' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
    if (btn === '6') {
        formLi.each(function() {
            if ( $(this).attr('data-option') === '6' ) {
                $(this).prop('selected', true);
            }
            $('select').trigger('refresh');
        });
    }
});
