const fs = require('fs');
const path = require('path');

console.log('💕 GEN Z FASHION AESTHETIC OVERHAUL');
console.log('===================================');
console.log('Creating Glossier meets Skims meets Rhode aesthetic...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CREATE CLEAN, BREATHABLE LAYOUT
console.log('\n✨ Implementing high-end fashion aesthetic...');

const genZFashionAesthetic = `
        /* 💕 GEN Z HIGH-END FASHION AESTHETIC 💕 */
        
        /* Clean Fashion Brand Color Palette */
        :root {
            /* Soft, luxe colors like Glossier/Rhode */
            --cream: #FFF8F3;
            --soft-black: #2B2B2B;
            --blush: #FFE4E6;
            --sage: #E8F3E8;
            --sky: #E8F0FF;
            --nude: #F5E6D3;
            --pearl: #FEFEFE;
            
            /* Typography like high-end fashion */
            --font-editorial: 'Helvetica Neue', -apple-system, sans-serif;
            --font-body: -apple-system, BlinkMacSystemFont, sans-serif;
            
            /* Generous spacing system */
            --space-xs: 0.5rem;
            --space-sm: 1rem;
            --space-md: 2rem;
            --space-lg: 3rem;
            --space-xl: 4rem;
            --space-xxl: 6rem;
        }
        
        /* Clean base reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: var(--pearl);
            color: var(--soft-black);
            font-family: var(--font-body);
            font-size: 16px;
            line-height: 1.6;
            font-weight: 400;
            -webkit-font-smoothing: antialiased;
            letter-spacing: -0.01em;
        }
        
        /* MOBILE-FIRST FASHION LAYOUT */
        @media screen and (max-width: 480px) {
            /* Clean container with breathing room */
            .container {
                padding: 0 24px;
                max-width: 100%;
            }
            
            /* Hero - Editorial Style */
            .hero {
                padding: 100px 0 60px 0;
                background: var(--cream);
                text-align: center;
            }
            
            /* Fashion Typography System */
            .main-headline {
                font-family: var(--font-editorial);
                font-size: 2.25rem;
                line-height: 1.1;
                letter-spacing: -0.04em;
                font-weight: 400;
                color: var(--soft-black);
                margin-bottom: 16px;
                background: none;
                -webkit-text-fill-color: inherit;
            }
            
            .main-headline br {
                display: none; /* Single line on mobile */
            }
            
            .sub-headline {
                font-size: 0.9375rem;
                line-height: 1.6;
                color: rgba(43, 43, 43, 0.7);
                font-weight: 400;
                margin-bottom: 32px;
                max-width: 280px;
                margin-left: auto;
                margin-right: auto;
            }
            
            /* Clean urgency widget */
            .urgency-widget {
                background: white;
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                padding: 20px;
                margin: 0 0 32px 0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            }
            
            .urgency-title {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--soft-black);
                font-weight: 500;
                margin-bottom: 8px;
            }
            
            .countdown-timer {
                font-family: var(--font-editorial);
                font-size: 1.5rem;
                font-weight: 300;
                color: var(--soft-black);
                letter-spacing: 0.02em;
            }
            
            .timer-number {
                color: var(--soft-black);
                font-weight: 400;
            }
            
            /* Social proof - subtle */
            .social-proof-ticker {
                background: var(--blush);
                border: none;
                padding: 12px 20px;
                font-size: 0.8125rem;
                color: var(--soft-black);
                border-radius: 24px;
                margin-bottom: 40px;
                font-weight: 400;
                animation: none;
                opacity: 0.9;
            }
            
            /* Product Display - Editorial */
            .product-display {
                margin: 0 -24px 40px -24px;
                position: relative;
                background: white;
                padding: 40px 0;
            }
            
            .product-image {
                width: 85%;
                max-width: 280px;
                height: auto;
                margin: 0 auto;
                display: block;
                filter: none;
                animation: none;
            }
            
            .price-badge {
                position: absolute;
                top: 20px;
                right: 20px;
                background: white;
                color: var(--soft-black);
                font-family: var(--font-editorial);
                font-size: 1.125rem;
                font-weight: 400;
                padding: 8px 16px;
                border-radius: 20px;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                transform: none;
                animation: none;
            }
            
            /* Size Selector - Minimalist */
            .size-selector {
                background: white;
                padding: 40px 24px;
                margin: 0 -24px;
            }
            
            .size-title {
                font-family: var(--font-editorial);
                font-size: 1rem;
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--soft-black);
                margin-bottom: 24px;
                text-align: center;
            }
            
            .size-grid {
                display: flex;
                gap: 8px;
                justify-content: center;
                flex-wrap: wrap;
                max-width: 320px;
                margin: 0 auto;
            }
            
            .size-option {
                background: white;
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 8px;
                min-width: 88px;
                height: 48px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }
            
            .size-option::before {
                display: none;
            }
            
            .size-option:hover:not(.sold-out) {
                border-color: var(--soft-black);
                transform: none;
                box-shadow: none;
            }
            
            .size-option.selected {
                background: var(--soft-black);
                border-color: var(--soft-black);
            }
            
            .size-option.selected .size-label,
            .size-option.selected .size-status {
                color: white;
            }
            
            .size-option.sold-out {
                opacity: 0.3;
            }
            
            .size-label {
                font-size: 0.9375rem;
                font-weight: 400;
                color: var(--soft-black);
                letter-spacing: 0.02em;
            }
            
            .size-status {
                font-size: 0.625rem;
                color: rgba(43, 43, 43, 0.6);
                margin-top: 2px;
                font-weight: 400;
            }
            
            /* CTA Buttons - Fashion Style */
            .buy-now-button {
                background: var(--soft-black);
                color: white;
                border: none;
                width: 100%;
                height: 56px;
                font-size: 0.9375rem;
                font-weight: 400;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                border-radius: 0;
                margin: 32px 0;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: none;
                animation: none;
                position: relative;
                overflow: hidden;
            }
            
            .buy-now-button::before,
            .buy-now-button::after {
                display: none;
            }
            
            .buy-now-button:hover {
                background: #1a1a1a;
                transform: none;
                box-shadow: none;
            }
            
            .buy-now-button span {
                position: relative;
                z-index: 1;
            }
            
            /* Process Section - Clean Cards */
            .process-section {
                background: var(--cream);
                padding: 60px 0;
                margin: 0 -24px;
            }
            
            .process-section .container {
                padding: 0 24px;
            }
            
            .section-title {
                font-family: var(--font-editorial);
                font-size: 1.75rem;
                font-weight: 400;
                letter-spacing: -0.02em;
                text-align: center;
                margin-bottom: 40px;
                color: var(--soft-black);
                background: none;
                -webkit-text-fill-color: inherit;
            }
            
            .process-steps {
                gap: 16px;
            }
            
            .process-step {
                background: white;
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                padding: 28px 20px;
                margin-bottom: 16px;
                transition: all 0.2s ease;
                box-shadow: none;
            }
            
            .process-step::before,
            .process-step::after {
                display: none;
            }
            
            .process-step:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
                border-color: rgba(0, 0, 0, 0.08);
            }
            
            .step-number {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: var(--blush);
                color: var(--soft-black);
                font-size: 0.75rem;
                font-weight: 500;
                border-radius: 50%;
                margin-bottom: 16px;
                box-shadow: none;
            }
            
            .step-title {
                font-family: var(--font-editorial);
                font-size: 1.125rem;
                font-weight: 400;
                margin-bottom: 8px;
                color: var(--soft-black);
            }
            
            .step-description {
                font-size: 0.875rem;
                line-height: 1.6;
                color: rgba(43, 43, 43, 0.7);
            }
            
            /* SimpleSwap - Clean Integration */
            .simpleswap-widget {
                background: white;
                border-radius: 16px;
                padding: 20px;
                margin: 20px 0;
                transform: none;
            }
            
            .simpleswap-link-button {
                background: var(--soft-black);
                color: white;
                border: none;
                width: 100%;
                height: 56px;
                font-size: 0.9375rem;
                font-weight: 400;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                border-radius: 0;
                margin: 24px 0;
                box-shadow: none;
                animation: none;
            }
            
            .exchange-subheadline {
                font-size: 0.8125rem;
                color: var(--soft-black);
                font-weight: 400;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-top: 16px;
                background: none;
                -webkit-text-fill-color: inherit;
            }
            
            /* Carousel - Editorial Style */
            .story-carousel,
            .review-carousel {
                margin: 0;
                padding: 0;
                position: relative;
            }
            
            .carousel-nav {
                display: none; /* Clean look, swipe only */
            }
            
            .story-slide,
            .review-slide {
                border-radius: 0;
                overflow: hidden;
                box-shadow: none;
            }
            
            .story-slide::after,
            .review-slide::after {
                display: none;
            }
            
            .story-slide img,
            .review-slide img {
                width: 100%;
                height: auto;
                aspect-ratio: 4/5;
                object-fit: cover;
            }
            
            /* Story Section - Magazine Layout */
            .story-section {
                padding: 60px 0;
                background: white;
            }
            
            .story-content {
                padding: 40px 24px 32px;
                text-align: center;
            }
            
            .story-content h3 {
                font-family: var(--font-editorial);
                font-size: 1.5rem;
                font-weight: 400;
                margin-bottom: 16px;
                color: var(--soft-black);
            }
            
            .story-content p {
                font-size: 0.9375rem;
                line-height: 1.6;
                color: rgba(43, 43, 43, 0.7);
                margin-bottom: 24px;
            }
            
            /* Reviews - Clean Grid */
            .reviews-section {
                background: var(--cream);
                padding: 60px 0;
            }
            
            .review-content {
                padding: 24px;
                background: white;
                border-radius: 12px;
                margin: 16px 0;
            }
            
            .review-text {
                font-size: 0.875rem;
                line-height: 1.6;
                color: var(--soft-black);
                margin-bottom: 16px;
                font-style: normal;
            }
            
            .review-author {
                font-size: 0.75rem;
                color: rgba(43, 43, 43, 0.6);
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }
            
            /* Guarantee - Trustworthy */
            .guarantee-section {
                padding: 60px 0;
                background: white;
            }
            
            .guarantee-item {
                background: var(--cream);
                border: none;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 16px;
                text-align: center;
            }
            
            .guarantee-icon {
                font-size: 2rem;
                margin-bottom: 16px;
            }
            
            .guarantee-title {
                font-family: var(--font-editorial);
                font-size: 1.125rem;
                font-weight: 400;
                margin-bottom: 8px;
                color: var(--soft-black);
            }
            
            .guarantee-description {
                font-size: 0.875rem;
                color: rgba(43, 43, 43, 0.7);
                line-height: 1.5;
            }
            
            /* XL Popup - Minimal */
            .xl-popup {
                background: white;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 16px;
                padding: 32px 24px;
                width: 90%;
                max-width: 320px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            }
            
            .xl-popup h2 {
                font-family: var(--font-editorial);
                font-size: 1.5rem;
                font-weight: 400;
                margin-bottom: 16px;
                color: var(--soft-black);
                background: none;
                -webkit-text-fill-color: inherit;
            }
            
            .xl-popup p {
                font-size: 0.9375rem;
                color: rgba(43, 43, 43, 0.7);
                line-height: 1.5;
                margin-bottom: 24px;
            }
            
            .xl-popup button {
                background: var(--soft-black);
                color: white;
                border: none;
                width: 100%;
                height: 48px;
                font-size: 0.875rem;
                font-weight: 400;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                border-radius: 0;
                cursor: pointer;
            }
            
            /* Clean sections spacing */
            section {
                padding: 60px 0;
            }
            
            /* Remove all animations on mobile for clean feel */
            * {
                animation: none !important;
            }
            
            /* Hide complex decorative elements */
            .arrow-pointer,
            .hotspot,
            .decoration {
                display: none;
            }
            
            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }
            
            /* Focus states - minimal */
            *:focus-visible {
                outline: 2px solid var(--soft-black);
                outline-offset: 2px;
            }
        }
`;

// 2. REPLACE ALL STYLES WITH CLEAN FASHION AESTHETIC
console.log('\n🎨 Replacing with fashion brand aesthetic...');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${genZFashionAesthetic}</style>`);

// 3. ADD SMOOTH INTERACTIONS
console.log('\n✨ Adding subtle premium interactions...');

const fashionInteractions = `
    <!-- Gen Z Fashion Interactions -->
    <script>
        console.log('💕 Loading Gen Z fashion aesthetic...');
        
        // Add smooth fade-in on scroll
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe all sections
            document.querySelectorAll('section, .process-step, .guarantee-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
            
            // Smooth size selection
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function() {
                    if (!this.classList.contains('sold-out')) {
                        document.querySelectorAll('.size-option').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    }
                });
            });
            
            // Mobile touch feedback
            if ('ontouchstart' in window) {
                document.querySelectorAll('button, .size-option').forEach(el => {
                    el.addEventListener('touchstart', () => {
                        el.style.opacity = '0.8';
                    });
                    el.addEventListener('touchend', () => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                        }, 100);
                    });
                });
            }
        });
    </script>
`;

// Add interactions before closing body
html = html.replace('</body>', fashionInteractions + '\n</body>');

// 4. UPDATE COPY TO FASHION BRAND TONE
console.log('\n📝 Updating copy to fashion brand tone...');

// Update text content
html = html.replace('NOT FOR<br>EVERYONE', 'LIMITED EDITION');
html = html.replace('SELECT YOUR SIZE', 'Select Size');
html = html.replace('THE BREAKDOWN', 'How It Works');
html = html.replace('THE STORY', 'Our Story');

// 5. SIMPLIFY STRUCTURE
console.log('\n🧹 Simplifying HTML structure...');

// Remove dark mode classes and complex styling
html = html.replace(/var\(--iman-black\)/g, 'var(--soft-black)');
html = html.replace(/var\(--gradient-aurora\)/g, 'transparent');
html = html.replace(/glassmorphism/g, 'minimal');

// Save the enhanced HTML
fs.writeFileSync(htmlPath, html);

console.log('\n💕 GEN Z FASHION AESTHETIC COMPLETE!');
console.log('=====================================');
console.log('✅ Clean, breathable layout');
console.log('✅ Editorial typography system');
console.log('✅ Generous white space');
console.log('✅ Soft, feminine color palette');
console.log('✅ Instagram-worthy design');
console.log('✅ Mobile-optimized readability');
console.log('✅ High-end fashion brand feel');
console.log('\n✨ GLOSSIER x SKIMS x RHODE ACHIEVED!');