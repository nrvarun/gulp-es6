$(document).ready(function () {

    console.log('Lets do the slider animation');

    $('.banner-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // fade: true,
        autoplay: true
    });

});