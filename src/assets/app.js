var timeOut;
var win = $(window);
// Format Money 
var formatMoney = function(price) {
  var formatPrice = price /= 100;
  formatPrice = formatPrice.toFixed(2);
  formatPrice = formatPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return '$' + formatPrice + ' {{ store.currency }}';
}
// Pluriliza qty
var quantityPluralize = function(data) {
  return data > 1 ? data +' productos' : data +' producto';
}
$(document).ajaxStart(function(){
$(document.body).css({'cursor':'wait'});
$('body a').css({'pointer-events':'none'})})
.ajaxStop(function(){
$(document.body).css({'cursor':'default'});
$('body a').css({'pointer-events':'auto'})}).ready(
function() {
  $("p:contains('<meta charset=\"utf-8\" \/>')").remove();

  setTimeout( function(){
      $('.notification').addClass('animated');
   }, 200 );

  {% if settings.newsletter_modal %}
    {% if settings.newsletter_modal_development %}
      setTimeout(function() {
          $('#newsletterModal').modal('show');
        }, 2000);
    {% else %}
      var alreadyVisited = localStorage['visited'];
        if (!alreadyVisited) {
        setTimeout(function() {
            $('#newsletterModal').modal('show');
          }, 3000);
          localStorage['visited'] = true;
        }
    {% endif %}
  {% endif %}

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
  $('.table > tbody > tr.js-clickable').on('click', function(e) {
    win.location = $(this).data('href');
  });
    // AJAX Add to Cart Component
    // Add Product to cart by ajax 
    var root = document.location.hostname;
    var getAjaxStoteUrl = function(type) {
      return root === 'store1.shoperti.app' ? 'http://'+ root + '/' + type : 'https://'+ root + '/' + type;
    }
    var ajaxConfig = {
      getUrl:   getAjaxStoteUrl('cart.json'),
      postUrl: getAjaxStoteUrl('cart/add.js')
    }
    var showAjaxCart = function() {
      $('.ajaxcart').animate({
        right: "0"
      }, 600);
    }

    var ajaxCartImage = $('.ajaxcart .ajaxcart__content .ajaxcart__image');
    var ajaxCartProductCaption = $('.ajaxcart .ajaxcart__content .ajaxcart__description .ajaxcart__caption');
    var ajaxCartProductCaptionVariant = $('.ajaxcart .ajaxcart__content .ajaxcart__description .ajaxcart__caption_variant');
    var ajaxCartProductCaptionAlert = $('.ajaxcart .ajaxcart__content .ajaxcart__description .ajaxcart__caption_alert span.label');
    var ajaxCartProductPrice = $('.ajaxcart .ajaxcart__content .ajaxcart__description .ajaxcart__price strong');
    var ajaxCartResumeSubtotal = $('.ajaxcart .ajaxcart__content .ajaxcart__resume .modal-body__subtotal');
    var ajaxCartResumeItems = $('.ajaxcart .ajaxcart__content .ajaxcart__resume .ajaxcart__number-items');
    var clearAjaxCart = function() {
      ajaxCartImage.attr('src', '');
      ajaxCartProductCaption.empty();
      ajaxCartProductCaptionVariant.empty();
      ajaxCartProductPrice.empty();
      ajaxCartResumeSubtotal.empty();
      ajaxCartResumeItems.empty();
      ajaxCartProductCaptionAlert.text('');
    }
    var hideAjaxCart = function() {
      $('.ajaxcart').animate({
        right: "-100%"
      }, 600 );
    }
    var updateCartQty = function(items) {
      var items = items > 0 ? items : 0;
      $('.cartQty .sup-number').text(items);
    }
    var setBodyTopPadding = function() {
      var navHeight = $('.toggle-nav').outerHeight();
      var windowWidth = $(window).width();
      if (windowWidth < 768) {
        $('body').css({'padding-top':navHeight});
      } else {
        $('body').removeAttr("style");
      }
    }
    var displayCartWarning = function(data) {
      ajaxCartProductCaptionAlert.empty();
      var newText = data;
      ajaxCartProductCaptionAlert.html(newText);
      ajaxCartProductCaptionAlert.toggleClass('hidden');
    }
    var mergeArrays = function(arr1, arr2) {
      if (arr1 != null && arr2 != null ) {
        var l = Math.min(arr1.length, arr2.length),
              result = [],
              i;
        for( i=0; i<l; i++) {
           result.push(arr1[i]+": "+arr2[i]);
        }
        return result.join(', ');
      }
      return false;
    }

    var getProductVariants = function(data, sku) {
      var modifiers, values, result;
      $.each(data, function(key, value){
        if (typeof value.product.modifiers !== "undefined" && value.sku.id === sku ) {
          modifiers = value.product.modifiers;
        }
      });
      $.each(data, function(key, value){
        if (typeof value.sku.id !== "undefined" && value.sku.id === sku) {
          values = value.sku.modifiers;
        }
      });
      result = modifiers != null && values != null ? mergeArrays(modifiers, values) : '';
      return result;
    }

    var buildAjaxCart = function(obj, sku, data, total) {
      clearAjaxCart();
      var sku = sku;
      var total = total;
      $.each(data, function(_, value) {
        if (sku === value.sku.id) {
          var image_url = value.sku.image_url ? value.sku.image_url + '&w=100&fit=bounds' : '{{ "placeholders/product-11.jpg" | global_img_url }}'
          ajaxCartImage.attr('src', image_url);
          ajaxCartProductCaption.text(value.product.name);
          ajaxCartProductCaptionVariant.text(getProductVariants(data, sku));
          ajaxCartProductPrice.text(value.quantity + ' x ' +  formatMoney(value.price));
          ajaxCartResumeSubtotal.text('Total ' + formatMoney(total));
          ajaxCartResumeItems.text('Hay ' + quantityPluralize(Object.keys(data).length) + ' en tu carrito.');
        }
      });
    }
    var getCartByAjax = function() {
      $.ajax({
        url:ajaxConfig.getUrl,
        type:'GET',
        success: function(data, textStatus, jqXHR) {
          AjaxCart = data.object || {};
          updateCartQty(AjaxCart.total_items);
        },
        error: function(data, textStatus, errorThrown) {
          console.log('message=:'+data+', text status=:'+textStatus+', error thrown:='+errorThrown)
        }})
      .success(function(){})
      .done(function(data){});
    }

    var addSimpleProductToCarByAjax = function(sku, qty) {
      var productSku = sku;
      var qty = qty == null ? 1 : qty;
      $.post(ajaxConfig.postUrl,
             {'sku_id':productSku,'quantity':qty})
      .success(function(data) {
        AjaxCart = data.object || {};
        buildAjaxCart(AjaxCart, sku, AjaxCart.items, AjaxCart.total_price);
        extraData = data.extra ? 1 : 0;
        if(extraData){
          displayCartWarning(data.extra[1]);
        }
      showAjaxCart();
      })
      .done(function(data){});
    }

    var addProductToCartByAjax = function() {
      var sku = $('input#js-sku-new').val();
      var qty = $('input#quantity.input-number').val();
      addSimpleProductToCarByAjax(sku, qty);
    }
    // Add product in product page
    $('#js-add-to-cart').on('click', function(e) {
      e.preventDefault();
      var el = $(this);
      el.prop('disabled', true);
      setTimeout(function(){
        el.prop('disabled', false);
      }, 3000);
      addProductToCartByAjax();
    });

    // Add simple product
    $('.add-ajax-product-btn').on('click', function(e){
      e.preventDefault();
      var sku = $(this).data('skuid');
      var el = $(this);
      el.prop('disabled', true);
      setTimeout(function(){
        el.prop('disabled', false);
      }, 3000);
      addSimpleProductToCarByAjax(sku);
    });

    $('.close-ajax-cart').on('click', hideAjaxCart);
    getCartByAjax();
    // End ajax component
    setBodyTopPadding();

  win.resize(function() {
    getProductHeight();
    setBodyTopPadding();
  });
});
