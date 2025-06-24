const fs = require('fs');
const path = require('path');

console.log('📱 MOBILE EXCELLENCE FIX - IMAN GADZHI STYLE');
console.log('==========================================');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. EXTRACT CURRENT STYLES
console.log('\n🔍 Analyzing current styles...');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let currentStyles = styleMatch ? styleMatch[1] : '';

// 2. ADD COMPREHENSIVE MOBILE STYLES
console.log('\n📱 Creating mobile-first responsive system...');

const mobileExcellenceStyles = `
        /* 📱 MOBILE EXCELLENCE - IMAN GADZHI AESTHETIC 📱 */
        
        /* Reset and base mobile styles */
        * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
        }
        
        html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        body {
            width: 100%;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Container constraints */
        .container {
            width: 100%;
            max-width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
        }
        
        /* MOBILE-FIRST STYLES (Default for phones) */
        @media screen and (max-width: 480px) {
            /* Hero Section Mobile */
            .hero {
                padding: 80px 0 40px 0;
                min-height: auto;
            }
            
            .main-headline {
                font-size: clamp(2rem, 8vw, 2.5rem) !important;
                line-height: 1.1;
                margin-bottom: 16px;
                text-align: center;
            }
            
            .sub-headline {
                font-size: 0.875rem !important;
                line-height: 1.5;
                margin-bottom: 24px;
                text-align: center;
                padding: 0 8px;
            }
            
            /* Urgency Widget Mobile */
            .urgency-widget {
                padding: 16px !important;
                margin: 16px 0;
                border-radius: 16px;
                font-size: 0.875rem;
            }
            
            .countdown-timer {
                font-size: 1.25rem !important;
            }
            
            /* Social Proof Ticker Mobile */
            .social-proof-ticker {
                font-size: 0.8125rem !important;
                padding: 12px 16px;
                margin: 16px 0;
            }
            
            /* Product Display Mobile */
            .product-display {
                margin: 24px -16px;
                position: relative;
            }
            
            .product-image {
                width: 100%;
                max-width: 300px;
                height: auto;
                margin: 0 auto;
                display: block;
            }
            
            .price-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 1.125rem !important;
                padding: 8px 16px;
                transform: rotate(-10deg);
            }
            
            /* Size Selector Mobile */
            .size-selector {
                margin: 32px 0;
                padding: 0;
            }
            
            .size-title {
                font-size: 1.125rem !important;
                margin-bottom: 16px;
            }
            
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                max-width: 100%;
                margin: 0 auto;
            }
            
            .size-option {
                min-height: 56px;
                padding: 12px 8px;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .size-label {
                font-size: 1rem !important;
                font-weight: 700;
            }
            
            .size-status {
                font-size: 0.625rem !important;
                margin-top: 2px;
            }
            
            /* CTA Buttons Mobile */
            .buy-now-button,
            .simpleswap-link-button {
                width: 100%;
                min-height: 56px;
                font-size: 1rem !important;
                padding: 16px 24px;
                border-radius: 28px;
                margin: 16px 0;
            }
            
            /* Process Section Mobile */
            .process-section {
                padding: 48px 0;
            }
            
            .section-title {
                font-size: clamp(1.5rem, 6vw, 2rem) !important;
                margin-bottom: 24px;
                padding: 0 16px;
                text-align: center;
            }
            
            .process-steps {
                gap: 16px;
            }
            
            .process-step {
                padding: 24px 16px;
                margin-bottom: 16px;
                border-radius: 16px;
            }
            
            .step-number {
                width: 48px;
                height: 48px;
                font-size: 0.75rem !important;
                margin-bottom: 16px;
            }
            
            .step-title {
                font-size: 1.125rem !important;
                margin-bottom: 8px;
            }
            
            .step-description {
                font-size: 0.875rem !important;
                line-height: 1.5;
            }
            
            /* SimpleSwap Mobile */
            .simpleswap-widget {
                transform: scale(0.95);
                transform-origin: center top;
                margin: 0 -8px;
            }
            
            .exchange-subheadline {
                font-size: 0.875rem !important;
                margin-top: 16px;
            }
            
            /* Carousel Mobile */
            .story-carousel,
            .review-carousel {
                margin: 24px -16px;
                padding: 0 16px;
            }
            
            .carousel-nav {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .carousel-nav-left { left: 8px; }
            .carousel-nav-right { right: 8px; }
            
            .story-slide,
            .review-slide {
                border-radius: 16px;
            }
            
            .story-slide img,
            .review-slide img {
                width: 100%;
                height: auto;
                object-fit: cover;
                max-height: 400px;
            }
            
            /* XL Popup Mobile */
            .xl-popup {
                width: 90%;
                max-width: 340px;
                padding: 24px;
                border-radius: 20px;
            }
            
            .xl-popup h2 {
                font-size: 1.5rem !important;
                margin-bottom: 16px;
            }
            
            .xl-popup p {
                font-size: 0.875rem !important;
                margin-bottom: 20px;
            }
            
            /* Section Spacing Mobile */
            section {
                padding: 48px 0;
            }
            
            /* Arrow Pointers Mobile */
            .arrow-pointer {
                display: none; /* Hide complex arrows on mobile */
            }
            
            /* Mobile-specific helpers */
            .mobile-only { display: block !important; }
            .desktop-only { display: none !important; }
            
            /* Touch-friendly spacing */
            a, button, .size-option {
                margin-bottom: 8px;
            }
            
            /* Ensure readable text */
            p, li {
                font-size: 0.875rem;
                line-height: 1.6;
            }
            
            /* Fix any overflow issues */
            * {
                max-width: 100%;
            }
            
            img, video, iframe {
                max-width: 100%;
                height: auto;
            }
            
            /* Ensure proper stacking */
            .fixed, .sticky {
                z-index: 100;
            }
            
            /* Performance optimizations */
            .carousel-slide:not(.active) {
                display: none;
            }
            
            /* Safe area for iPhone notch */
            @supports (padding: env(safe-area-inset-bottom)) {
                .container {
                    padding-left: max(16px, env(safe-area-inset-left));
                    padding-right: max(16px, env(safe-area-inset-right));
                }
                
                body {
                    padding-bottom: env(safe-area-inset-bottom);
                }
            }
        }
        
        /* TABLET STYLES */
        @media screen and (min-width: 481px) and (max-width: 768px) {
            .container {
                max-width: 100%;
                padding: 0 24px;
            }
            
            .main-headline {
                font-size: 3rem !important;
            }
            
            .product-image {
                max-width: 400px;
            }
            
            .size-grid {
                max-width: 400px;
            }
            
            .process-steps {
                gap: 24px;
            }
        }
        
        /* SMALL DESKTOP */
        @media screen and (min-width: 769px) {
            /* Reset to original Iman aesthetic for desktop */
            .container {
                max-width: 480px;
                padding: 0 20px;
            }
        }
`;

// 3. INJECT MOBILE STYLES BEFORE CLOSING STYLE TAG
console.log('\n💉 Injecting mobile excellence styles...');
html = html.replace('</style>', mobileExcellenceStyles + '\n        </style>');

// 4. ADD MOBILE-SPECIFIC JAVASCRIPT ENHANCEMENTS
console.log('\n🚀 Adding mobile touch enhancements...');

const mobileEnhancements = `
    <!-- Mobile Excellence Enhancements -->
    <script>
        console.log('📱 Loading mobile excellence enhancements...');
        
        // Detect if mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        if (isMobile) {
            // Add mobile class to body
            document.body.classList.add('is-mobile');
            
            // Prevent zoom on double tap
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            
            // Smooth scroll for mobile
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
            
            // Enhanced touch feedback
            document.addEventListener('touchstart', (e) => {
                if (e.target.matches('button, .size-option, a')) {
                    e.target.style.transform = 'scale(0.98)';
                }
            });
            
            document.addEventListener('touchend', (e) => {
                if (e.target.matches('button, .size-option, a')) {
                    setTimeout(() => {
                        e.target.style.transform = '';
                    }, 100);
                }
            });
            
            // Fix viewport height for mobile browsers
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', \\`\\${vh}px\\`);
            };
            setVH();
            window.addEventListener('resize', setVH);
            
            // Optimize images for mobile
            document.querySelectorAll('img').forEach(img => {
                if (img.dataset.mobileSrc && window.innerWidth <= 480) {
                    img.src = img.dataset.mobileSrc;
                }
            });
            
            // Mobile-specific carousel touch
            const carousels = document.querySelectorAll('.story-carousel, .review-carousel');
            carousels.forEach(carousel => {
                let startX = 0;
                let currentX = 0;
                let isDragging = false;
                
                carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });
                
                carousel.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    currentX = e.touches[0].clientX;
                });
                
                carousel.addEventListener('touchend', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const diff = startX - currentX;
                    if (Math.abs(diff) > 50) {
                        // Swipe detected
                        if (diff > 0) {
                            // Swipe left - next slide
                            carousel.querySelector('.carousel-nav-right')?.click();
                        } else {
                            // Swipe right - previous slide
                            carousel.querySelector('.carousel-nav-left')?.click();
                        }
                    }
                });
            });
        }
        
        console.log('✅ Mobile enhancements loaded!');
    </script>
`;

// Add mobile enhancements before closing body
html = html.replace('</body>', mobileEnhancements + '\n</body>');

// 5. FIX SPECIFIC MOBILE ISSUES
console.log('\n🔧 Fixing specific mobile issues...');

// Ensure viewport meta tag is correct
if (!html.includes('viewport-fit=cover')) {
    html = html.replace(
        'name="viewport" content="width=device-width, initial-scale=1.0"',
        'name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"'
    );
}

// Save the enhanced HTML
fs.writeFileSync(htmlPath, html);

console.log('\n📱 MOBILE EXCELLENCE COMPLETE!');
console.log('==============================');
console.log('✅ Responsive mobile-first CSS');
console.log('✅ Touch-optimized interactions');
console.log('✅ Fixed typography scaling');
console.log('✅ Proper image constraints');
console.log('✅ Enhanced carousel swiping');
console.log('✅ iPhone notch safe areas');
console.log('✅ Iman Gadzhi aesthetic preserved');
console.log('\n💎 MOBILE EXPERIENCE PERFECTED!');