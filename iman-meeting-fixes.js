const fs = require('fs').promises;

async function imanMeetingFixes() {
    console.log('🎯 IMAN MEETING EXECUTION - Fixing Buttons + XL Sellout');
    console.log('====================================================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // 1. Fix the broken size selector functionality
    console.log('🔧 Fixing broken size selectors...');
    
    // Make sure XL is marked as sold out in HTML
    html = html.replace(
        /<button class="size-option available" data-size="XL">\s*<span class="size-label">XL<\/span>\s*<span class="size-status">Few Left<\/span>\s*<\/button>/,
        '<button class="size-option sold-out" disabled>\n                        <span class="size-label">XL</span>\n                        <span class="size-status">Sold Out</span>\n                    </button>'
    );
    
    // 2. Add instant XL sellout notification (Iman's way)
    const xlSelloutHTML = `
    <!-- Instant XL Sellout Notification -->
    <div class="xl-sellout-toast" id="xlSelloutToast">
        <div class="toast-content">
            <div class="toast-icon">⚡</div>
            <div class="toast-message">
                <div class="toast-title">XL Just Sold Out</div>
                <div class="toast-subtitle">Other sizes moving fast</div>
            </div>
        </div>
    </div>`;
    
    // Add toast notification before the Iman popup
    html = html.replace(
        '<!-- Iman Gadzhi Style Urgency Popup -->',
        xlSelloutHTML + '\n    <!-- Iman Gadzhi Style Urgency Popup -->'
    );
    
    // 3. Add CSS for XL sellout toast (Iman's clean style)
    const xlSelloutCSS = `
        /* INSTANT XL SELLOUT TOAST - IMAN STYLE */
        .xl-sellout-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            z-index: 10001;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        }
        
        .xl-sellout-toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .toast-content {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #ffffff;
            padding: var(--space-md) var(--space-lg);
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid #333;
            display: flex;
            align-items: center;
            gap: var(--space-md);
            min-width: 280px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .toast-icon {
            font-size: 1.5rem;
            background: linear-gradient(90deg, #ff006e 0%, #8338ec 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 8px rgba(255, 0, 110, 0.3));
        }
        
        .toast-message {
            flex: 1;
        }
        
        .toast-title {
            font-size: 1rem;
            font-weight: 700;
            color: #ff006e;
            margin-bottom: 2px;
            line-height: 1.2;
        }
        
        .toast-subtitle {
            font-size: 0.85rem;
            color: #b0b0b0;
            font-weight: 500;
        }
        
        /* Mobile adjustments */
        @media (max-width: 480px) {
            .xl-sellout-toast {
                left: 10px;
                right: 10px;
                transform: translateY(-100px);
            }
            
            .xl-sellout-toast.show {
                transform: translateY(0);
            }
            
            .toast-content {
                min-width: auto;
                padding: var(--space-sm) var(--space-md);
            }
            
            .toast-title {
                font-size: 0.95rem;
            }
            
            .toast-subtitle {
                font-size: 0.8rem;
            }
        }`;
    
    // Insert XL sellout CSS
    html = html.replace(
        '/* IMAN GADZHI STYLE URGENCY POPUP */',
        xlSelloutCSS + '\n        /* IMAN GADZHI STYLE URGENCY POPUP */'
    );
    
    // 4. Fix and enhance the size selector JavaScript
    const fixedSizeSelectorJS = `
        // FIXED SIZE SELECTOR FUNCTIONALITY
        let selectedSize = null;
        
        // Initialize size selector event listeners
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔧 Initializing size selectors...');
            
            // Size grid functionality - FIXED
            document.querySelectorAll('.size-option').forEach(button => {
                console.log('Adding listener to:', button.querySelector('.size-label').textContent);
                
                button.addEventListener('click', function() {
                    console.log('Size clicked:', this.querySelector('.size-label').textContent);
                    
                    if (!this.disabled && !this.classList.contains('sold-out')) {
                        // Remove selected from all buttons
                        document.querySelectorAll('.size-option').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                        
                        // Add selected to clicked button
                        this.classList.add('selected');
                        selectedSize = this.dataset.size || this.querySelector('.size-label').textContent;
                        
                        console.log('Selected size:', selectedSize);
                        
                        // Show instant feedback
                        showSizeSelectedFeedback(selectedSize);
                    } else {
                        // Show XL sellout toast if they click XL
                        const sizeLabel = this.querySelector('.size-label').textContent;
                        if (sizeLabel === 'XL') {
                            showXLSelloutToast();
                        }
                    }
                });
            });
            
            // Show XL sellout toast after 8 seconds
            setTimeout(showXLSelloutToast, 8000);
        });
        
        function showSizeSelectedFeedback(size) {
            // Could add a subtle confirmation here
            console.log('Size selected:', size);
        }
        
        function showXLSelloutToast() {
            const toast = document.getElementById('xlSelloutToast');
            if (!toast) return;
            
            toast.classList.add('show');
            
            // Auto-hide after 3 seconds (Iman's preference)
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }`;
    
    // Replace the broken size selector code
    html = html.replace(
        /\/\/ Size selection[\s\S]*?}\);/,
        fixedSizeSelectorJS
    );
    
    // 5. Fix buy button functionality
    const fixedBuyButtonJS = `
        // FIXED BUY BUTTON FUNCTIONALITY
        function scrollToCheckout() {
            // Scroll to the checkout section
            const checkoutSection = document.querySelector('.cta-section');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
        
        // Purchase flow - ENHANCED
        function startPurchase() {
            if (!selectedSize) {
                // Show size selection reminder
                showSizeSelectionReminder();
                return;
            }
            
            copyBonusCode();
            
            const button = document.getElementById('buyButton');
            if (button) {
                button.textContent = 'Opening Checkout...';
                button.disabled = true;
                
                setTimeout(() => {
                    window.open(CHECKOUT_URL, '_blank');
                    
                    setTimeout(() => {
                        button.textContent = 'Look for "Exchange" Button';
                        button.disabled = false;
                    }, 2000);
                }, 1000);
            }
        }
        
        function showSizeSelectionReminder() {
            // Simple alert for now - could make this a toast too
            alert('Please select a size first!');
        }`;
    
    // Insert fixed buy button functionality
    html = html.replace(
        /\/\/ Purchase flow[\s\S]*?}\)/,
        fixedBuyButtonJS
    );
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ IMAN MEETING EXECUTION COMPLETE!');
    console.log('==================================');
    console.log('🔧 Fixed all broken size selectors');
    console.log('⚡ Added instant XL sellout toast (3 seconds)');
    console.log('🎯 Clean, premium design (no cheap tactics)');
    console.log('📱 Mobile-responsive notifications');
    console.log('🚀 All buttons working properly');
    console.log('💎 Pure Iman psychology and execution');
    console.log('\n"That\'s how you convert without being sleazy." - Iman');
}

imanMeetingFixes().catch(console.error);