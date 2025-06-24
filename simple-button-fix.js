const fs = require('fs').promises;

async function simpleButtonFix() {
    console.log('🔧 SIMPLE BUTTON FIX');
    console.log('===================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // 1. Fix the size selector JavaScript by adding a working version
    const workingSizeJS = `
        // WORKING SIZE SELECTOR FIX
        let selectedSize = null;
        
        function fixSizeSelectors() {
            console.log('Fixing size selectors...');
            const sizeButtons = document.querySelectorAll('.size-option');
            
            sizeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (this.disabled || this.classList.contains('sold-out')) {
                        console.log('Sold out size clicked');
                        return;
                    }
                    
                    // Remove selected from all
                    sizeButtons.forEach(btn => btn.classList.remove('selected'));
                    
                    // Add selected to this one
                    this.classList.add('selected');
                    
                    // Get size from data-size or text content
                    selectedSize = this.dataset.size || this.querySelector('.size-label').textContent;
                    console.log('Size selected:', selectedSize);
                });
            });
        }
        
        // Fix buy buttons
        function fixBuyButtons() {
            console.log('Fixing buy buttons...');
            
            // Fix all buy now buttons
            const buyButtons = document.querySelectorAll('.buy-now-button');
            buyButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    scrollToCheckout();
                });
            });
            
            // Fix the main CTA button
            const ctaButton = document.getElementById('buyButton');
            if (ctaButton) {
                ctaButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    startPurchase();
                });
            }
        }
        
        // Enhanced DOMContentLoaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Applying button fixes...');
            
            // Apply fixes after a small delay to ensure everything is loaded
            setTimeout(() => {
                fixSizeSelectors();
                fixBuyButtons();
                console.log('Button fixes applied!');
            }, 100);
        });`;
    
    // Insert the working JavaScript before the closing script tag
    html = html.replace(
        'console.log(\'🔧 JavaScript loaded and ready\');',
        'console.log(\'🔧 JavaScript loaded and ready\');\n        \n        ' + workingSizeJS
    );
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ SIMPLE BUTTON FIX APPLIED!');
    console.log('============================');
    console.log('🔧 Added working size selector code');
    console.log('🔧 Added working buy button code');
    console.log('🔧 All buttons should work now');
}

simpleButtonFix().catch(console.error);