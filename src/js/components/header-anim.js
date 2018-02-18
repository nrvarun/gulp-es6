'use strict'

console.warn('Home Page Loaded');

$(window).on('scroll load resize', changeHeader);

function changeHeader () {

  var scrollTop = $(document).scrollTop();
  
  // $header = $('.factor-header');
  // $logo = $('.factor-header__logo');

  if (scrollTop > 100) {

    $('.factor-header').addClass('scrolling');
    $('.factor-header__logo').attr('src', './img/blue-logo.svg');
    // console.log('lets add scrolling to the header');
    
  } 
  else {
    $('.factor-header').removeClass('scrolling');
    $('.factor-header__logo').attr('src', './img/logo.svg');
  }
}
