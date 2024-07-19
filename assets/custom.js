$(document).ready(function(){

  function check_sale(){

      $('.yotpo-radio-label-input').each(function(){
        if($(this).is(':checked')){
          var price_val = $(this).closest('.yotpo-radio-button-text-wrapper').find('.yotpo-subscription-label-price').text();
          var sale;
          if($(this).attr('data-selling-plan-name') != 'One-time'){
            sale = $(this).closest('.yotpo-radio-container').find('.sub-head p').text();
            $('.variant-visibility-area div.price-area .current-price').text(price_val);     
            $('.js_sale_price').text(sale);
            $('.js_sale_price').show();
            $('.sale_original_price').show();
            $('.variant-visibility-area div.price-area').css('opacity',1);
            $('#add-cart-btn .txt').text('ADD SUBSCRIPTION TO CART');
          }else{
            $('.variant-visibility-area div.price-area .current-price').text(price_val);     
            $('.js_sale_price').text('');
            $('.js_sale_price').hide();
            $('.sale_original_price').hide();
            $('.variant-visibility-area div.price-area').css('opacity',1);
            $('#add-cart-btn .txt').text('ADD TO CART');
          }
        }
    });
  
  }

  $(document).on('change','.yotpo-radio-label-input',function(){
    $('.variant-visibility-area div.price-area').css('opacity',0);
    check_sale();
  });

  $(document).on('change','.variant_wrap input.opt-btn',function(){
    
    if ($('.yotpo-widget-subscriptions-add-to-cart').length > 0) {
      $('.variant-visibility-area div.price-area').css('opacity',0);
      setTimeout(function() {
        check_sale();
      },1000);
    }
    
  });

  function checkElement() {
    if ($('.yotpo-widget-subscriptions-add-to-cart .sub-head').length > 0) {
        check_sale();
        clearInterval(sale_interval);
      }
    }

  var sale_interval = setInterval(checkElement, 1000);

});

