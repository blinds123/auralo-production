const fs = require('fs');
const path = require('path');

console.log('🚀 ULTIMATE PUMP FIX - MAKING IT BEAUTIFUL!');
console.log('==========================================');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. FIX CAROUSEL IMAGES - Remove lazy loading for critical carousels
console.log('\n🎠 FIXING CAROUSEL IMAGES...');
html = html.replace(/loading="lazy" data-src="([^"]+)" src="data:image\/svg[^"]+"/g, 'src="$1"');

// 2. ADJUST STEP 2 POSITIONING - Make it more aligned
console.log('\n📍 ADJUSTING STEP 2 POSITIONING...');
html = html.replace(
    'transform: translateY(-114px) !important;',
    'transform: translateY(-60px) !important;'
);

// 3. LOWER THE COMPLETE YOUR EXCHANGE BUTTON
console.log('\n🎯 LOWERING EXCHANGE BUTTON...');
html = html.replace(
    '.checkout-section {\n            padding: var(--space-xl) 0;\n            background: var(--big-day-white);\n        }',
    `.checkout-section {
            padding: var(--space-xl) 0 calc(var(--space-xl) * 1.5);
            background: var(--big-day-white);
            margin-bottom: var(--space-lg);
        }`
);

// 4. ADD BEAUTIFUL ENHANCEMENTS
console.log('\n✨ ADDING CREATIVE ENHANCEMENTS...');

// Add subtle animations and shadows
const enhancements = `
        /* ✨ BEAUTIFUL ENHANCEMENTS ✨ */
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced card shadows and hover effects */
        .process-step {
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 2px solid transparent;
            background: linear-gradient(var(--big-day-white), var(--big-day-white)) padding-box,
                       linear-gradient(135deg, var(--simpleswap-blue), var(--simpleswap-dark-blue)) border-box;
        }
        
        .process-step:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(33, 150, 243, 0.2);
        }
        
        /* Beautiful carousel styling */
        .story-carousel, .review-carousel {
            position: relative;
            overflow: visible;
        }
        
        .story-carousel::before,
        .review-carousel::before {
            content: '';
            position: absolute;
            inset: -20px;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(33, 150, 243, 0.05) 100%);
            pointer-events: none;
            z-index: -1;
            border-radius: 20px;
        }
        
        /* Enhanced carousel slides */
        .story-slide img, .review-slide img {
            transform: scale(1);
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .story-slide:hover img, .review-slide:hover img {
            transform: scale(1.03);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Beautiful button enhancements */
        .buy-now-button, .simpleswap-link-button {
            position: relative;
            overflow: hidden;
        }
        
        .buy-now-button::before, .simpleswap-link-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .buy-now-button:hover::before, .simpleswap-link-button:hover::before {
            width: 300%;
            height: 300%;
        }
        
        /* Subtle floating animation for key elements */
        @keyframes subtleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .price-badge {
            animation: subtleFloat 3s ease-in-out infinite;
        }
        
        /* Enhanced mobile spacing */
        @media (max-width: 768px) {
            .process-steps {
                gap: var(--space-lg);
            }
            
            .process-step {
                padding: var(--space-lg);
                margin-bottom: 0;
            }
            
            .step-image-wrapper {
                margin: var(--space-md) 0;
            }
            
            .checkout-section {
                padding-bottom: calc(var(--space-xl) * 2);
            }
            
            /* Better carousel spacing on mobile */
            .story-carousel, .review-carousel {
                margin: var(--space-lg) -20px;
                padding: 20px;
            }
        }
        
        /* Improved tablet layout */
        @media (min-width: 769px) and (max-width: 1024px) {
            .container {
                max-width: 90%;
            }
            
            .process-steps {
                gap: var(--space-xl);
            }
            
            .step-image {
                max-width: 450px;
            }
        }
        
        /* Performance optimizations */
        img {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
        }
        
        /* Beautiful focus states */
        *:focus-visible {
            outline: 3px solid var(--simpleswap-blue);
            outline-offset: 4px;
            border-radius: 4px;
        }
        
        /* Enhanced urgency widget */
        .urgency-widget {
            background: linear-gradient(135deg, 
                rgba(255, 71, 87, 0.05) 0%, 
                rgba(255, 71, 87, 0.02) 100%);
            border: 1px solid rgba(255, 71, 87, 0.1);
            backdrop-filter: blur(10px);
        }
        
        /* Better mobile button styling */
        @media (max-width: 480px) {
            .simpleswap-link-button {
                width: 100%;
                max-width: 340px;
                margin: 0 auto;
                display: flex !important;
                font-size: 1.05rem !important;
                padding: 18px 24px !important;
                min-height: 64px !important;
            }
            
            .exchange-subheadline {
                margin-top: var(--space-md);
                font-size: 1.1rem !important;
                color: var(--simpleswap-dark-blue);
                font-weight: 800;
                letter-spacing: 0.5px;
                text-shadow: 0 2px 4px rgba(33, 150, 243, 0.1);
            }
        }
`;

// Insert enhancements before closing style tag
html = html.replace('</style>', enhancements + '\n        </style>');

// 5. FIX CAROUSEL IMAGE LOADING IN JAVASCRIPT
console.log('\n🖼️ FIXING CAROUSEL IMAGE LOADING SYSTEM...');

const carouselFix = `
        // ENHANCED IMAGE LOADING SYSTEM
        function loadAllCarouselImages() {
            console.log('🖼️ Force loading all carousel images...');
            
            // Get all images with data-src
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.removeAttribute('loading');
                }
            });
            
            // Also ensure all carousel images are loaded
            ['storySlides', 'tiktokSlides', 'trustpilotSlides'].forEach(slidesId => {
                const slides = document.getElementById(slidesId);
                if (slides) {
                    const images = slides.querySelectorAll('img');
                    images.forEach((img, index) => {
                        if (img.src.includes('data:image/svg')) {
                            // Find the actual image source
                            const actualSrc = img.getAttribute('data-src') || img.src;
                            if (actualSrc && !actualSrc.includes('data:image/svg')) {
                                img.src = actualSrc;
                                console.log(\`✅ Loaded image for \${slidesId} slide \${index + 1}\`);
                            }
                        }
                    });
                }
            });
        }
        
        // Call it immediately and after DOM loaded
        loadAllCarouselImages();
        document.addEventListener('DOMContentLoaded', loadAllCarouselImages);
        window.addEventListener('load', loadAllCarouselImages);
`;

// Add carousel fix to the script section
html = html.replace(
    '// Lazy loading implementation',
    carouselFix + '\n        \n        // Lazy loading implementation'
);

// 6. ENSURE PROPER MOBILE/TABLET VIEWPORT
console.log('\n📱 ENSURING MOBILE/TABLET OPTIMIZATION...');

// Add smooth transitions for mobile
html = html.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
);

// Save the enhanced HTML
fs.writeFileSync(htmlPath, html);

console.log('\n✅ ULTIMATE PUMP COMPLETE!');
console.log('========================');
console.log('🎠 Carousel images fixed - removed lazy loading');
console.log('📍 Step 2 repositioned for better alignment');
console.log('🎯 Exchange button lowered with better spacing');
console.log('✨ Added beautiful hover effects and animations');
console.log('📱 Enhanced mobile/tablet responsive design');
console.log('🚀 Performance optimizations added');
console.log('\n💎 WEBSITE PUMPED TO MAXIMUM BEAUTY!');