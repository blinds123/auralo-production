const fs = require('fs');
const path = require('path');

console.log('🌸 PERFECT FASHION MOBILE REFINEMENT');
console.log('====================================');
console.log('Creating the ultimate Gen Z fashion experience...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. ENHANCED FASHION AESTHETIC WITH PERFECT SPACING
console.log('\n✨ Perfecting typography and spacing...');

const perfectFashionRefinement = `
        /* 🌸 PERFECT GEN Z FASHION AESTHETIC 🌸 */
        
        /* Premium Fashion Variables */
        :root {
            /* Soft luxury palette inspired by Glossier/Rhode */
            --pure-white: #FFFFFF;
            --soft-cream: #FFFEF9;
            --warm-beige: #F7F3EE;
            --dusty-pink: #F4E4E1;
            --muted-sage: #E6EDE6;
            --soft-gray: #6B6B6B;
            --charcoal: #1C1C1C;
            
            /* Perfect typography scale */
            --text-xs: 0.75rem;    /* 12px */
            --text-sm: 0.875rem;   /* 14px */
            --text-base: 1rem;     /* 16px */
            --text-lg: 1.125rem;   /* 18px */
            --text-xl: 1.375rem;   /* 22px */
            --text-2xl: 1.875rem;  /* 30px */
            --text-3xl: 2.25rem;   /* 36px */
            
            /* Consistent spacing rhythm */
            --space-2: 0.5rem;     /* 8px */
            --space-3: 0.75rem;    /* 12px */
            --space-4: 1rem;       /* 16px */
            --space-5: 1.25rem;    /* 20px */
            --space-6: 1.5rem;     /* 24px */
            --space-8: 2rem;       /* 32px */
            --space-10: 2.5rem;    /* 40px */
            --space-12: 3rem;      /* 48px */
            --space-16: 4rem;      /* 64px */
            --space-20: 5rem;      /* 80px */
            
            /* Fashion fonts */
            --font-display: -apple-system, 'Helvetica Neue', sans-serif;
            --font-body: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* Global reset for clean slate */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
            scroll-behavior: smooth;
        }
        
        body {
            font-family: var(--font-body);
            font-size: var(--text-base);
            line-height: 1.6;
            color: var(--charcoal);
            background-color: var(--pure-white);
            overflow-x: hidden;
            min-height: 100vh;
        }
        
        /* MOBILE PERFECTION (max-width: 480px) */
        @media screen and (max-width: 480px) {
            /* Container with perfect padding */
            .container {
                width: 100%;
                padding-left: var(--space-5);
                padding-right: var(--space-5);
                margin: 0 auto;
            }
            
            /* Hero Section - Clean & Spacious */
            .hero {
                background-color: var(--soft-cream);
                padding-top: var(--space-20);
                padding-bottom: var(--space-16);
                text-align: center;
                position: relative;
            }
            
            /* Skip June 2025 header */
            .hero-header {
                display: none;
            }
            
            /* Main Headline - Perfect Size */
            .main-headline {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                font-weight: 300;
                line-height: 1.2;
                letter-spacing: -0.02em;
                color: var(--charcoal);
                margin-bottom: var(--space-4);
                padding: 0 var(--space-4);
            }
            
            /* Remove gradient effects */
            .main-headline {
                background: none !important;
                -webkit-background-clip: unset !important;
                -webkit-text-fill-color: var(--charcoal) !important;
            }
            
            /* Subheadline - Easy to Read */
            .sub-headline {
                font-size: var(--text-sm);
                line-height: 1.65;
                color: var(--soft-gray);
                font-weight: 400;
                margin-bottom: var(--space-8);
                max-width: 300px;
                margin-left: auto;
                margin-right: auto;
                padding: 0 var(--space-4);
            }
            
            /* Urgency Widget - Subtle & Clean */
            .urgency-widget {
                background-color: var(--pure-white);
                border: 1px solid rgba(28, 28, 28, 0.08);
                border-radius: 12px;
                padding: var(--space-5);
                margin-bottom: var(--space-6);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
            }
            
            .urgency-title {
                font-size: var(--text-xs);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--soft-gray);
                font-weight: 500;
                margin-bottom: var(--space-2);
            }
            
            .countdown-timer {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                font-weight: 300;
                color: var(--charcoal);
                font-variant-numeric: tabular-nums;
            }
            
            /* Social Proof - Elegant */
            .social-proof-ticker {
                background-color: var(--dusty-pink);
                color: var(--charcoal);
                font-size: var(--text-sm);
                padding: var(--space-3) var(--space-5);
                border-radius: 24px;
                margin-bottom: var(--space-10);
                display: inline-block;
                font-weight: 400;
                opacity: 0.9;
            }
            
            /* Product Image Section */
            .product-display {
                background-color: var(--pure-white);
                padding: var(--space-10) 0;
                margin: 0 calc(var(--space-5) * -1);
                position: relative;
            }
            
            .product-image {
                width: 75%;
                max-width: 240px;
                height: auto;
                margin: 0 auto;
                display: block;
            }
            
            /* Price Badge - Minimal */
            .price-badge {
                position: absolute;
                top: var(--space-5);
                right: var(--space-5);
                background-color: var(--pure-white);
                color: var(--charcoal);
                font-size: var(--text-lg);
                font-weight: 400;
                padding: var(--space-2) var(--space-4);
                border-radius: 20px;
                border: 1px solid rgba(28, 28, 28, 0.12);
            }
            
            /* Size Selection - Premium Feel */
            .size-selector {
                background-color: var(--warm-beige);
                padding: var(--space-10) var(--space-5);
                margin: 0 calc(var(--space-5) * -1);
            }
            
            .size-title {
                font-family: var(--font-display);
                font-size: var(--text-sm);
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: var(--charcoal);
                margin-bottom: var(--space-6);
                text-align: center;
            }
            
            /* Size Grid - Clean Layout */
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--space-3);
                max-width: 300px;
                margin: 0 auto;
            }
            
            .size-option {
                background-color: var(--pure-white);
                border: 1px solid rgba(28, 28, 28, 0.08);
                border-radius: 8px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
            }
            
            .size-option:active {
                transform: scale(0.98);
            }
            
            .size-option.selected {
                background-color: var(--charcoal);
                border-color: var(--charcoal);
            }
            
            .size-option.selected .size-label {
                color: var(--pure-white);
            }
            
            .size-option.sold-out {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .size-label {
                font-size: var(--text-base);
                font-weight: 400;
                color: var(--charcoal);
            }
            
            .size-status {
                font-size: 0.625rem;
                color: var(--soft-gray);
                margin-top: 2px;
            }
            
            /* CTA Button - Fashion Forward */
            .buy-now-button {
                background-color: var(--charcoal);
                color: var(--pure-white);
                border: none;
                width: calc(100% - var(--space-10));
                height: 56px;
                margin: var(--space-8) var(--space-5);
                font-size: var(--text-sm);
                font-weight: 400;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                border-radius: 2px;
                cursor: pointer;
                transition: background-color 0.2s ease;
                display: block;
            }
            
            .buy-now-button:active {
                background-color: #000000;
            }
            
            /* How It Works Section */
            .process-section {
                background-color: var(--soft-cream);
                padding: var(--space-16) 0;
            }
            
            .section-title {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                font-weight: 300;
                text-align: center;
                margin-bottom: var(--space-10);
                color: var(--charcoal);
            }
            
            /* Process Steps - Card Design */
            .process-step {
                background-color: var(--pure-white);
                border-radius: 12px;
                padding: var(--space-8) var(--space-6);
                margin-bottom: var(--space-4);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            }
            
            .step-number {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                background-color: var(--dusty-pink);
                color: var(--charcoal);
                font-size: var(--text-sm);
                font-weight: 500;
                border-radius: 50%;
                margin-bottom: var(--space-4);
            }
            
            .step-title {
                font-family: var(--font-display);
                font-size: var(--text-lg);
                font-weight: 400;
                margin-bottom: var(--space-2);
                color: var(--charcoal);
            }
            
            .step-description {
                font-size: var(--text-sm);
                line-height: 1.6;
                color: var(--soft-gray);
            }
            
            /* Story Section - Editorial */
            .story-section {
                padding: var(--space-16) 0;
                background-color: var(--pure-white);
            }
            
            /* Reviews Section */
            .reviews-section {
                background-color: var(--warm-beige);
                padding: var(--space-16) 0;
            }
            
            /* Perfect Image Sizing */
            img {
                max-width: 100%;
                height: auto;
                display: block;
            }
            
            /* Clean all animations */
            * {
                animation: none !important;
            }
            
            /* Hide decorative elements */
            .arrow-pointer,
            .arrow-exchange,
            .arrow-exchange-bottom,
            .hotspot,
            ::before,
            ::after {
                display: none !important;
            }
            
            /* Ensure text is always readable */
            p, li, span {
                font-size: var(--text-sm);
                line-height: 1.6;
                color: var(--charcoal);
            }
            
            /* Perfect button touch targets */
            button, a, .size-option {
                min-height: 44px;
                min-width: 44px;
            }
            
            /* Remove all transforms */
            * {
                transform: none !important;
            }
        }
`;

// 2. INJECT REFINED STYLES
console.log('\n💉 Injecting perfect fashion styles...');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${perfectFashionRefinement}</style>`);

// 3. SIMPLIFY INTERACTIONS
console.log('\n🎯 Adding minimal interactions...');

const minimalInteractions = `
    <!-- Minimal Fashion Interactions -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Simple size selection
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!this.classList.contains('sold-out')) {
                        document.querySelectorAll('.size-option').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    }
                });
            });
            
            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        });
    </script>
`;

// Replace all script tags with minimal version
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', minimalInteractions + '\n</body>');

// 4. CLEAN UP HTML
console.log('\n🧹 Cleaning HTML structure...');

// Update copy to be more fashion-forward
html = html.replace(/LIMITED EDITION|NOT FOR.*?EVERYONE/gi, 'The Essential Hoodie');
html = html.replace(/JUNE 2025 DROP.*?CLEARANCE/gi, '');
html = html.replace(/Select Size/gi, 'Size');
html = html.replace(/How It Works/gi, 'Details');

// Save the refined HTML
fs.writeFileSync(htmlPath, html);

console.log('\n🌸 PERFECT FASHION REFINEMENT COMPLETE!');
console.log('======================================');
console.log('✅ Perfect vertical rhythm');
console.log('✅ Optimal typography sizing');
console.log('✅ Generous breathing room');
console.log('✅ Soft, approachable colors');
console.log('✅ Clean, minimal interactions');
console.log('✅ Instagram-ready design');
console.log('✅ Gen Z fashion aesthetic achieved!');
console.log('\n💕 READY FOR FASHION-FORWARD GEN Z!');