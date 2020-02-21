/**
 * Created by 2015130 on 2015/3/14.
 */

$(function() {
    // menu hover show item

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var web = getUrlParameter('tab');

    switch (web){
        case 'contact' :
            $('.menuBtn li').removeClass('active');
            $('#contact').addClass('active').siblings().removeClass('active');
            $('#contactbtn').addClass('active');
            break;
        case 'about' :
            $('.menuBtn li').removeClass('active');
            $('#about').addClass('active').siblings().removeClass('active');
            $('#aboutbtn').addClass('active');
            break;
        case 'commonQ' :
            $('.menuBtn li').removeClass('active');
            $('#commonQ').addClass('active').siblings().removeClass('active');
            $('#commonQbtn').addClass('active');
            break;
        case 'payout' :
            $('.menuBtn li').removeClass('active');
            $('#payout').addClass('active').siblings().removeClass('active');
            $('#dafapayoutbtn').addClass('active');
            break;
        case 'howplay' :
            $('.menuBtn li').removeClass('active');
            $('#howPlay').addClass('active').siblings().removeClass('active');
            $('#dafahowPlaybtn').addClass('active');
            break;
        case 'payInfo' :
            $('.menuBtn li').removeClass('active');
            $('#payInfo').addClass('active').siblings().removeClass('active');
            $('#dafapayInfobtn').addClass('active');
            break;
    }




    $('.navigation>li').hover(function () {
        $(this).children('ul').stop(true, true).toggle(300)
    },function () {
        $(this).children('ul').stop(true, true).fadeOut(300)
    });

    //tab change

    $('.menuBtn li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.menuBtn li').removeClass('active');
        $('#'+tab_id).siblings().removeClass('active');

        $(this).addClass('active');
        $('#'+tab_id).addClass('active')

    });

    //scroll top1
    $('.ReturnTop').click(function() {

        var homeani = $('.header').offset().top;
        $('html,body').animate({
            scrollTop: homeani
        }, 500);
    });

    setTimeout(function(){

        var u = document.location.href;
        var i = u.indexOf("#");
        if (i > 0) {
            var tab = u.substr(i + 1).trim();
            if (tab) {
                $('.menuBtn li[data-tab="' + tab + '"]').click();
            }
        }
    }, 500);
});
