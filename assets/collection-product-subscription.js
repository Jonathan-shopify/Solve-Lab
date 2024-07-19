$(document).ready(function(){
   // ADD TO CART
    $(document).on('click', '#collection-product-button', function(e){
        e.preventDefault();
        $(this).addClass('loading');
        var $form = $(this).closest('#collection-product-form');
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: $form.serialize(),
            success: function(response) {
                $('.collection-product-button').removeClass('loading');
                Rebuy.SmartCart.show();
                // console.log('Product added to cart',response);
            },
            error: function(error) {
                $('.collection-product-button').removeClass('loading');
                console.error('Error adding product to cart:', error);
            }
        });
    });

    // SUBSCRIPTION CHECKBOX CHANGE
    $(document).on('change', '.collection-product-checkbox-input', function(e){
        e.preventDefault();
        if($(this).is(':checked')) {
            // console.log('Checked');
            const __this = $(this);
            $(this).closest('.collection-product-variants-container').find('.collection-product-product-subscribe').removeClass('hidden');
            const sellingPlanID = $(this).closest('.collection-product-variants-container').find('.collection-product-selling_plan_dropdown option:selected').val();
            // console.log('sellingPlanID',sellingPlanID)
            $(this).closest('.collection-product-variants-container').find('.collection-product-form-selling-plan-id').val(sellingPlanID);

            const variantSubscriptionDiscount = parseInt($(this).closest('.collection-product-variants-container').find('.collection-product-selling_plan_dropdown option:selected').attr('data-discount'));
            const variantPriceHtml = $(this).closest('.collection-product-variants-container').find('.collection-product-variant-select option:selected').attr('data-variant-price');
            const currencySymbolHtml = $('.collection-product-variant-select').attr('data-currency-symbol');
            
            updateProductPrice(__this, variantSubscriptionDiscount, variantPriceHtml, currencySymbolHtml);
        } else {
            console.log('Not Checked');
            $(this).closest('.collection-product-variants-container').find('.collection-product-form-selling-plan-id').val('');
            $(this).closest('.collection-product-variants-container').find('.collection-product-product-subscribe').addClass('hidden');
            $(this).closest('product-block').find('.product-price').removeClass('product-has-compare-price');
        }
    });

    // SUBSCRIPTION CHANGE
    $(document).on('change', '.collection-product-selling_plan_dropdown', function(e){
        e.preventDefault();
        const __this = $(this);
        const sellingPlanID = $(this).val();
        // console.log('sellingPlanID',sellingPlanID)
        $(this).closest('.collection-product-variants-container').find('.collection-product-form-selling-plan-id').val(sellingPlanID);

        const variantSubscriptionDiscount = parseInt($(this).find('option:selected').attr('data-discount'));
        const variantPriceHtml = $(this).closest('.collection-product-variants-container').find('.collection-product-variant-select option:selected').attr('data-variant-price');
        const currencySymbolHtml = $('.collection-product-variant-select').attr('data-currency-symbol');
        
        updateProductPrice(__this, variantSubscriptionDiscount, variantPriceHtml, currencySymbolHtml);
    });

     // VARIANT CHANGE
    $(document).on('change', '.collection-product-variant-select', function(e){
        e.preventDefault();
        const __this = $(this);
        const variantID = $(this).val();
        const varinatPrice = $(this).find('option:selected').attr('data-variant-price');
        // console.log('varinatPrice',varinatPrice)
        $(this).closest('.collection-product-variants-container').find('.collection-product-form-variant-id').val(variantID);
        $(this).closest('product-block').find('.product-price .product-price__amount .transcy-money').html(varinatPrice);

        if($(this).closest('.collection-product-variants-container').find('.collection-product-checkbox-input').is(':checked')) {
            const variantSubscriptionDiscount = parseInt($(this).closest('.collection-product-variants-container').find('.collection-product-selling_plan_dropdown option:selected').attr('data-discount'));
            const variantPriceHtml = $(this).find('option:selected').attr('data-variant-price');
            const currencySymbolHtml = $('.collection-product-variant-select').attr('data-currency-symbol');
            
            updateProductPrice(__this, variantSubscriptionDiscount, variantPriceHtml, currencySymbolHtml);
        }
    });

    function updateProductPrice(__this, variantSubscriptionDiscount, variantPriceHtml, currencySymbolHtml) {
        const currencySymbol = currencySymbolHtml.replace(/<\/?[^>]+(>|$)/g, "").replace('{{amount}}', '');
        const variantPriceText = variantPriceHtml.replace(/<\/?[^>]+(>|$)/g, "");
        const variantPrice = parseFloat(variantPriceText.replace(/[^0-9.-]+/g, ""));

        let finalPrice = variantPrice;
        if (variantSubscriptionDiscount > 0) {
            finalPrice = variantPrice - (variantPrice * (variantSubscriptionDiscount / 100));
        }
        const formattedFinalPrice = currencySymbol + finalPrice.toFixed(2);

        // console.log('Final Price:', formattedFinalPrice);
        __this.closest('product-block').find('.product-price').addClass('product-has-compare-price');
        __this.closest('product-block').find('.product-price .collection-product-subcription-price').html(formattedFinalPrice);
    }
});