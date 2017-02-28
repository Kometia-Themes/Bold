'use strict';
// Default Stylesheet
var styles = require('./assets/styles.scss');
var lessfile = require('./assets/lessfile.less');
var css = require('./assets/style.css');
var newsletter_modal = '{{ settings.newsletter_modal }}';
var newsletter_modal_development = '{{ settings.newsletter_modal_development }}';

$("p:contains('<meta charset=\"utf-8\" \/>')").remove();

$(document).ready(function() {
  setTimeout( function(){ 
      $('.notification').addClass('animated');
   }, 200 );

  if (newsletter_modal) {
    if (newsletter_modal_development) {
      setTimeout(function() {
        $('#newsletterModal').modal('show');
        }, 2000);
    } else {
      var alreadyVisited = localStorage['visited'];
        if (!alreadyVisited) {
        setTimeout(function() {
          $('#newsletterModal').modal('show');
          }, 3000);
          localStorage['visited'] = true;
        }
    }
  }

  $('.page-title').each(function(){
      var newtitle = $(this);
      newtitle.html( newtitle.text().replace(/(^[^\s]+ )/,'<span class="alternative">$1</span>') );
  });

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    asNavFor: '.slider-nav'
  });

  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider',
    dots: false,
    centerMode: false,
    focusOnSelect: true
  });

  $('.products').slick({
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.collections').slick({
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  $("#wrapper > .overlay").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  $(".submenu-toggle").click(function(e) {
      e.preventDefault();
      $("i", this).toggleClass('mdi-chevron-up mdi-chevron-down');
      var $this = $(this).parent().find('.sidebar-subnav:first');
      $($this).toggleClass('sidebar-toggled');
  });

  var getProductHeight = function() {
      var type1 = $('.thumbnail_square');
      var type2 = $('.thumbnail_landscape');
      var type3 = $('.thumbnail_portrait');
      $(type1).css({ "height": type1.width() });
      $(type2).css({ "height": type2.width() * .62 });
      $(type3).css({ "height": type3.width() * 1.62 });
    }

  getProductHeight();

  var horizontal, vertical, square;
  var setHeight = function() {
    horizontal = $('.landscape');
      vertical = $('.portrait');
        square = $('.square');
    $(horizontal).css({ "height": horizontal.width() * .62 });
    $(vertical).css({ "height": vertical.width() * 1.62 });
    $(square).css({ "height": square.width() });
  }

  $(window).resize(function() {
    getProductHeight();
  });
});
