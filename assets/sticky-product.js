$(document).ready(function(){
    const stickyProduct = $('.sticky-product-container')
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1500) {
            $('body').addClass('sticky-active');
        } else {
            $('body').removeClass('sticky-active');
        }
    });

    function checkForElement() {
        if ($('.yotpo-selected').length > 0) {
            console.log('Element with class .yotpo-selected has been added to the DOM.');
            observer.disconnect();
            if ($('.yotpo-selected').hasClass('yotpo-radio-buy-once-container')) {
                $('#selling_plan-sticky option[value="one-time"]').prop('selected', true);
            } else {
                const subSelectedOption = $('.yotpo-selected input[type=radio]:checked').val();
                console.log('subSelectedOption', subSelectedOption);
                $('#selling_plan-sticky option[value="'+subSelectedOption+'"]').prop('selected', true);
            }
        }
    }
    var observer = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                checkForElement();
            }
        }
    });
    var config = {
        childList: true,
        subtree: true
    };
    observer.observe(document.body, config);
    checkForElement();

    $(document).on('change', '.yotpo-radio-button-text-wrapper input[type=radio]', function(){
        // console.log('HERE we GO',typeof())
        const selectedSubOption = $(this).val();
        console.log('CHecked value is',selectedSubOption)
        if(selectedSubOption != ''){
            $('#selling_plan-sticky option[value="'+selectedSubOption+'"]').prop('selected', true);
        }else{
            $('#selling_plan-sticky option[value="one-time"]').prop('selected', true);
        }
    });

    $(document).on('change', '.yotpo-frequency-options input[type=radio]', function(){
        // console.log('HERE we GO',typeof())
        const selectedSubOption = $(this).val();
        console.log('CHecked Selected value is',selectedSubOption)
        if(selectedSubOption != ''){
            $('#selling_plan-sticky option[value="'+selectedSubOption+'"]').prop('selected', true);
        }else{
            $('#selling_plan-sticky option[value="one-time"]').prop('selected', true);
        }
    });

    $(document).on('change', '#selling_plan-sticky', function(){
        // console.log('HERE we GO',typeof())
        const selectedSubOption = $(this).val();
        if(selectedSubOption == 'one-time'){
            console.log('Option IS One time')
            $('.yotpo-radio-buy-once-container input[type=radio]').trigger('click');
            $('.yotpo-radio-buy-once-container .yotpo-radio-label input[type=radio][data-selling-plan-name="One-time"]').prop('checked', true).trigger('change');
            console.log($('.yotpo-radio-buy-once-container .yotpo-radio-label input[type=radio][data-selling-plan-name="One-time"]').prop('checked', true).trigger('change'));
            $('.yotpo-radio-buy-once-container').removeClass('yotpo-not-selected');
            $('.yotpo-radio-buy-once-container').addClass('yotpo-selected');
            $('.yotpo-radio-subscription-container ').addClass('yotpo-not-selected');
            $('.yotpo-radio-subscription-container ').removeClass('yotpo-selected');
            
        } else {
            console.log('Option IS SUBSCRIPTIOIN')
            $('.yotpo-radio-button-text-wrapper input[type=radio]').trigger('click');
            $('.yotpo-radio-subscription-container .yotpo-radio-button-text-wrapper input[type=radio]').val(selectedSubOption);
            $('.yotpo-radio-subscription-container .yotpo-frequency-options input[type=radio][value="'+selectedSubOption+'"]').prop('checked', true).trigger('change');
            console.log($('.yotpo-radio-subscription-container .yotpo-frequency-options input[type=radio][value="'+selectedSubOption+'"]').prop('checked', true).trigger('change'))
            $('.yotpo-radio-buy-once-container').addClass('yotpo-not-selected');
            $('.yotpo-radio-buy-once-container').removeClass('yotpo-selected');
            $('.yotpo-radio-subscription-container ').removeClass('yotpo-not-selected');
            $('.yotpo-radio-subscription-container ').addClass('yotpo-selected');
        }

    });

    setTimeout(function(){
        const reviewWidget = $('#seal-star-rating-widget').html();
        if(reviewWidget){
            $('.sticky-product-review').html(reviewWidget);
        }
    },6000);
    
    $(document).on('change', '.option-selector__btns .variant_wrap .opt-btn', function(){
        const selectedVarintTitle = $(this).val();
        $('#sticky-product-varinat-select option[data-variant-title="'+selectedVarintTitle+'"]').prop('selected',true);
        // const selectedVarintPrice = $('#sticky-product-varinat-select').find('option:selected').data('variant-price');
        // $('.sticky-product-price').html(selectedVarintPrice);
        const selectedVarintImage = $('.cc-carousel__scroll-area').find('.thumbnail--media-image.cc-carousel__visible-item.selected').attr('href');
        console.log('selectedVarintImage',selectedVarintImage)
        $('#sticky-product-image').attr('src', selectedVarintImage);

        // SUBSCRIPTION
        setTimeout(function(){
            if ($('.yotpo-selected').hasClass('yotpo-radio-buy-once-container')) {
                $('#selling_plan-sticky option[value="one-time"]').prop('selected', true);
            } else {
                const subSelectedOption = $('.yotpo-selected input[type=radio]:checked').val();
                console.log('subSelectedOption', subSelectedOption);
                $('#selling_plan-sticky option[value="'+subSelectedOption+'"]').prop('selected', true);
            }
        },1000);
    });

    $(document).on('change', '#sticky-product-varinat-select', function(){
        const stickySelectTitle = $(this).find('option:selected').data('variant-title');
        $('.option-selector__btns .variant_wrap .opt-btn').each(function(){
            console.log($(this).val())
            if ($(this).val() === stickySelectTitle){
                $(this).trigger('click'); 
            }
        });
    });

    $(document).on('click', '#sticky-product-button', function(e){
        e.preventDefault()
        $(this).closest('.section-main-product').find('#add-cart-btn').trigger('click');
        $(this).closest('.section-main-product').find('#add-cart-btn').addClass('loading');
        $(this).addClass('loading');
    });

    $(document).on('click', '.sticky-product-review', function(e) {
        e.preventDefault();
        // Add the scroll into view code
        document.getElementById('vstar-reviews').scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
});