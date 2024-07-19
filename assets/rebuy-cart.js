$(document).ready(function() {
    document.addEventListener('rebuy:smartcart.ready', () => {
        setTimeout(function() {
            updateSmartCart();
        },500);
    });

    document.addEventListener('rebuy:cart.change', function() {
        console.log('NOTICED CHANGE IN CART');
        setTimeout(function() {
            updateSmartCart();
        });
    });

    function updateSmartCart() {
        const SmartCart = window.Rebuy.SmartCart;
        // console.log('Function is running SmartCart', SmartCart);
        const tiers = SmartCart.progressBar.tiers;
        // console.log('Function is running tiers', tiers);

        const progressSteps = document.querySelectorAll('.rebuy-cart__progress-step');
        // console.log('Progress Steps', progressSteps);

        tiers.forEach((tier, index) => {
            // console.log(`Tier ${index + 1} type:`, tier.type);

            // Check if the current index is within the range of progressSteps
            if (index < progressSteps.length) {
                // Get the corresponding progress step element
                const progressStep = progressSteps[index];

                // Check if there is already an image element
                let img = progressStep.querySelector('.rebuy-cart__progress-step-image');
                
                // If no image element exists, create one
                if (!img) {
                    img = document.createElement('img');
                    img.classList.add('rebuy-cart__progress-step-image');
                    if (tier.type === 'shipping') {
                        img.classList.add('rebuy-cart__progress-step-image-shipping');
                    }
                    const progressStepIcon = progressStep.querySelector('.rebuy-cart__progress-step-icon');
                    if (progressStepIcon) {
                        progressStepIcon.appendChild(img);
                    }
                }

                // Conditionally set the src attribute based on tier.type
                if (tier.type === 'shipping') {
                    img.src = 'https://cdn.shopify.com/s/files/1/0777/0718/2389/files/svgviewer-png-output_2.png';
                } else {
                    img.src = tier.products.length > 0 ? tier.products[0].image.src : '';
                }
            }
        });

        // CHANGE CURRENLY FORMATE:
        const progressTierPrice = document.querySelectorAll('.rebuy-cart__progress-step-price');
        progressTierPrice.forEach((tierPrice) => {
            let priceText = tierPrice.innerText;
            if (priceText.includes('.')) {
                let integerPart = priceText.split('.')[0];
                // console.log('integerPart',integerPart)
                tierPrice.innerText = integerPart;
            }
        });
    }
});