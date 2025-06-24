const fs = require('fs');
const path = require('path');

console.log('✨ FINAL PERFECT MOBILE EXPERIENCE');
console.log('==================================');
console.log('Combining Iman aesthetic with beautiful sectioning...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CREATE PERFECT COMBINATION OF STYLES
console.log('\n🎨 Creating perfect mobile experience...');

const finalPerfectStyles = `
        /* ✨ FINAL PERFECT MOBILE EXPERIENCE ✨ */
        
        /* Iman Gadzhi x Gen Z Color System */
        :root {
            /* Dark Luxury Base */
            --iman-black: #0A0A0A;
            --iman-charcoal: #1A1A1A;
            --iman-gray: #2A2A2A;
            --iman-white: #FAFAFA;
            
            /* Gen Z Accents */
            --gen-z-pink: #FFB6C1;
            --gen-z-purple: #E6E6FA;
            --gen-z-blue: #87CEEB;
            --gen-z-mint: #98FB98;
            --gen-z-peach: #FFDAB9;
            
            /* Gradients */
            --gradient-dark: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%);
            --gradient-pink: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%);
            --gradient-purple: linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%);
            --gradient-blue: linear-gradient(135deg, #87CEEB 0%, #ADD8E6 100%);
            
            /* UI Elements */
            --border-color: rgba(255, 182, 193, 0.2);
            --card-bg: rgba(26, 26, 26, 0.6);
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
        }
        
        /* Base Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
        }
        
        html {
            scroll-behavior: smooth;
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--iman-black);
            color: var(--iman-white);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        /* MOBILE STYLES */
        @media screen and (max-width: 768px) {
            
            /* Container */
            .container {
                width: 100%;
                padding: 0 20px;
                max-width: 100%;
            }
            
            /* Section Base - Beautiful Borders */
            section {
                position: relative;
                padding: 60px 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            section:last-child {
                border-bottom: none;
            }
            
            /* HERO SECTION - Iman Style */
            .hero {
                min-height: 100vh;
                display: flex;
                align-items: center;
                background: var(--gradient-dark);
                padding: 80px 0 60px;
                position: relative;
                overflow: hidden;
            }
            
            /* Subtle gradient overlay */
            .hero::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.05) 0%, transparent 50%);
                pointer-events: none;
            }
            
            .hero-content {
                position: relative;
                z-index: 2;
                width: 100%;
                opacity: 0;
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            /* June header - minimal */
            .hero-header {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--gen-z-pink);
                margin-bottom: 24px;
                text-align: center;
                opacity: 0.8;
            }
            
            .main-headline {
                font-size: 2.5rem;
                font-weight: 800;
                line-height: 1.1;
                margin-bottom: 16px;
                text-align: center;
                background: linear-gradient(180deg, var(--iman-white) 0%, var(--gen-z-pink) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: slideDown 0.6s ease-out 0.2s both;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .sub-headline {
                font-size: 0.9375rem;
                color: rgba(250, 250, 250, 0.7);
                line-height: 1.6;
                text-align: center;
                max-width: 320px;
                margin: 0 auto 32px;
                animation: fadeIn 0.6s ease-out 0.4s both;
            }
            
            /* Urgency Card - Glassmorphism */
            .urgency-widget {
                background: rgba(26, 26, 26, 0.8);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                padding: 24px;
                margin: 0 auto 24px;
                max-width: 320px;
                box-shadow: var(--shadow-lg);
                position: relative;
                overflow: hidden;
                animation: scaleIn 0.5s ease-out 0.6s both;
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            /* Clock icon */
            .urgency-widget::before {
                content: '⏰';
                position: absolute;
                font-size: 60px;
                opacity: 0.05;
                right: -10px;
                bottom: -10px;
            }
            
            .urgency-title {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--gen-z-pink);
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .urgency-title::before {
                content: '🔥';
                font-size: 1rem;
            }
            
            .countdown-timer {
                font-size: 1.75rem;
                font-weight: 700;
                color: var(--iman-white);
                font-variant-numeric: tabular-nums;
                text-shadow: 0 0 20px rgba(255, 182, 193, 0.3);
            }
            
            /* Social Proof */
            .social-proof-ticker {
                background: rgba(255, 182, 193, 0.1);
                border: 1px solid var(--border-color);
                color: var(--gen-z-pink);
                padding: 12px 24px;
                border-radius: 30px;
                font-size: 0.875rem;
                text-align: center;
                margin: 0 auto;
                max-width: 280px;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }
            
            /* PRODUCT SECTION - Clean Layout */
            .product-display {
                background: var(--iman-charcoal);
                padding: 80px 0;
                position: relative;
            }
            
            .product-showcase {
                text-align: center;
            }
            
            /* Section header with icon */
            .section-header {
                text-align: center;
                margin-bottom: 48px;
                position: relative;
                padding-bottom: 24px;
            }
            
            .section-header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 60px;
                height: 2px;
                background: var(--gradient-pink);
            }
            
            .section-icon {
                font-size: 2.5rem;
                margin-bottom: 16px;
                display: block;
                filter: grayscale(0.2);
            }
            
            .section-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: var(--iman-white);
                margin-bottom: 8px;
            }
            
            .section-subtitle {
                font-size: 0.875rem;
                color: rgba(250, 250, 250, 0.6);
            }
            
            /* Product Image */
            .product-image-wrapper {
                position: relative;
                margin-bottom: 40px;
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .product-image {
                width: 80%;
                max-width: 300px;
                height: auto;
                margin: 0 auto;
                display: block;
                filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
            }
            
            .price-badge {
                position: absolute;
                top: 20px;
                right: 10%;
                background: var(--gradient-pink);
                color: var(--iman-black);
                font-size: 1.5rem;
                font-weight: 800;
                padding: 12px 24px;
                border-radius: 30px;
                box-shadow: var(--shadow-lg);
                transform: rotate(-10deg);
                animation: bounce 2s ease-in-out infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: rotate(-10deg) scale(1); }
                50% { transform: rotate(-10deg) scale(1.05); }
            }
            
            /* Product Features Grid */
            .product-features {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
                margin-top: 40px;
                padding: 0 20px;
            }
            
            .feature-card {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                padding: 20px 12px;
                text-align: center;
                backdrop-filter: blur(10px);
                animation: fadeInUp 0.5s ease-out both;
                animation-delay: calc(0.1s * var(--i));
            }
            
            .feature-card:nth-child(1) { --i: 1; }
            .feature-card:nth-child(2) { --i: 2; }
            .feature-card:nth-child(3) { --i: 3; }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .feature-icon {
                font-size: 2rem;
                margin-bottom: 8px;
                display: block;
            }
            
            .feature-text {
                font-size: 0.75rem;
                color: rgba(250, 250, 250, 0.8);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            /* SIZE SELECTOR - Enhanced */
            .size-selector {
                background: var(--gradient-dark);
                padding: 80px 0;
                position: relative;
            }
            
            .size-selector::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 80% 50%, rgba(230, 230, 250, 0.05) 0%, transparent 50%);
                pointer-events: none;
            }
            
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                max-width: 340px;
                margin: 0 auto 32px;
            }
            
            .size-option {
                background: rgba(26, 26, 26, 0.6);
                border: 2px solid rgba(255, 182, 193, 0.2);
                border-radius: 16px;
                height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }
            
            .size-option::before {
                content: '';
                position: absolute;
                inset: 0;
                background: var(--gradient-pink);
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .size-option:active {
                transform: scale(0.96);
            }
            
            .size-option.selected::before {
                opacity: 1;
            }
            
            .size-option.selected {
                border-color: var(--gen-z-pink);
            }
            
            .size-option.sold-out {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .size-label {
                font-size: 1.125rem;
                font-weight: 700;
                color: var(--iman-white);
                position: relative;
                z-index: 1;
            }
            
            .size-option.selected .size-label {
                color: var(--iman-black);
            }
            
            .size-status {
                font-size: 0.625rem;
                color: rgba(250, 250, 250, 0.6);
                margin-top: 4px;
                position: relative;
                z-index: 1;
            }
            
            /* CTA Button - Premium */
            .buy-now-button {
                background: linear-gradient(135deg, var(--gen-z-pink) 0%, var(--gen-z-purple) 100%);
                color: var(--iman-black);
                border: none;
                width: 100%;
                max-width: 340px;
                height: 60px;
                margin: 0 auto;
                display: block;
                font-size: 1rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                border-radius: 30px;
                cursor: pointer;
                box-shadow: 0 8px 24px rgba(255, 182, 193, 0.3);
                position: relative;
                overflow: hidden;
                transition: transform 0.2s ease;
            }
            
            .buy-now-button:active {
                transform: scale(0.98);
            }
            
            .buy-now-button span {
                position: relative;
                z-index: 1;
            }
            
            /* PROCESS SECTION - Steps */
            .process-section {
                background: var(--iman-charcoal);
                padding: 80px 0;
            }
            
            .process-steps {
                display: flex;
                flex-direction: column;
                gap: 24px;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .process-step {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                padding: 32px 24px;
                position: relative;
                backdrop-filter: blur(10px);
                display: flex;
                align-items: flex-start;
                gap: 20px;
                animation: slideIn 0.5s ease-out both;
                animation-delay: calc(0.1s * var(--i));
            }
            
            .process-step:nth-child(1) { --i: 1; }
            .process-step:nth-child(2) { --i: 2; }
            .process-step:nth-child(3) { --i: 3; }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .step-number {
                width: 48px;
                height: 48px;
                background: var(--gradient-purple);
                color: var(--iman-black);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                font-weight: 800;
                flex-shrink: 0;
            }
            
            .step-content {
                flex: 1;
            }
            
            .step-title {
                font-size: 1.125rem;
                font-weight: 700;
                color: var(--iman-white);
                margin-bottom: 8px;
            }
            
            .step-description {
                font-size: 0.875rem;
                color: rgba(250, 250, 250, 0.7);
                line-height: 1.5;
            }
            
            /* SimpleSwap Button */
            .simpleswap-link-button {
                background: #2196f3;
                color: white;
                border: none;
                width: 100%;
                max-width: 340px;
                height: 56px;
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                border-radius: 28px;
                margin: 32px auto 16px;
                display: block;
                cursor: pointer;
                box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3);
                transition: transform 0.2s ease;
            }
            
            .simpleswap-link-button:active {
                transform: scale(0.98);
            }
            
            .exchange-subheadline {
                text-align: center;
                font-size: 0.875rem;
                color: var(--gen-z-blue);
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }
            
            /* Reviews Section */
            .reviews-section {
                background: var(--gradient-dark);
                padding: 80px 0;
            }
            
            .review-grid {
                display: grid;
                gap: 16px;
                padding: 0 20px;
            }
            
            .review-card {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                padding: 24px;
                backdrop-filter: blur(10px);
                animation: fadeIn 0.5s ease-out both;
                animation-delay: calc(0.1s * var(--i));
            }
            
            .review-card:nth-child(1) { --i: 1; }
            .review-card:nth-child(2) { --i: 2; }
            .review-card:nth-child(3) { --i: 3; }
            
            .review-stars {
                color: var(--gen-z-pink);
                margin-bottom: 12px;
                font-size: 1rem;
            }
            
            .review-text {
                font-size: 0.875rem;
                color: rgba(250, 250, 250, 0.8);
                line-height: 1.5;
                margin-bottom: 16px;
                font-style: italic;
            }
            
            .review-author {
                font-size: 0.75rem;
                color: var(--gen-z-purple);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            /* Guarantee Section */
            .guarantee-section {
                background: var(--iman-charcoal);
                padding: 80px 0;
            }
            
            .guarantee-grid {
                display: grid;
                gap: 24px;
                padding: 0 20px;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .guarantee-item {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                padding: 32px;
                text-align: center;
                backdrop-filter: blur(10px);
                animation: scaleIn 0.5s ease-out both;
                animation-delay: calc(0.1s * var(--i));
            }
            
            .guarantee-item:nth-child(1) { --i: 1; }
            .guarantee-item:nth-child(2) { --i: 2; }
            .guarantee-item:nth-child(3) { --i: 3; }
            
            .guarantee-icon {
                font-size: 3rem;
                margin-bottom: 16px;
                display: block;
            }
            
            .guarantee-title {
                font-size: 1.125rem;
                font-weight: 700;
                color: var(--iman-white);
                margin-bottom: 8px;
            }
            
            .guarantee-description {
                font-size: 0.875rem;
                color: rgba(250, 250, 250, 0.7);
                line-height: 1.5;
            }
            
            /* Hide complex elements */
            .arrow-pointer,
            .arrow-exchange,
            .arrow-exchange-bottom,
            .hotspot {
                display: none !important;
            }
            
            /* Performance optimizations */
            * {
                animation-duration: 0.5s !important;
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }
        }
        
        /* TABLET OPTIMIZATION */
        @media screen and (min-width: 481px) and (max-width: 768px) {
            .container {
                padding: 0 32px;
            }
            
            .main-headline {
                font-size: 3rem;
            }
            
            .product-features {
                max-width: 500px;
                margin: 40px auto 0;
            }
            
            .size-grid {
                max-width: 450px;
            }
            
            .process-steps {
                max-width: 500px;
            }
            
            .review-grid {
                grid-template-columns: 1fr 1fr;
                max-width: 600px;
                margin: 0 auto;
            }
        }
`;

// 2. REPLACE STYLES
console.log('\n💉 Injecting final perfect styles...');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${finalPerfectStyles}</style>`);

// 3. ADD ENHANCED INTERACTIONS
console.log('\n✨ Adding enhanced interactions...');

const enhancedInteractions = `
    <!-- Final Perfect Interactions -->
    <script>
        console.log('✨ Loading final perfect experience...');
        
        document.addEventListener('DOMContentLoaded', () => {
            // Add section headers with icons
            const sectionConfigs = [
                { selector: '.product-display', icon: '✨', title: 'Premium Quality', subtitle: 'Crafted with care' },
                { selector: '.size-selector', icon: '📏', title: 'Choose Your Size', subtitle: 'Perfect fit guaranteed' },
                { selector: '.process-section', icon: '🚀', title: 'How It Works', subtitle: '3 simple steps' },
                { selector: '.reviews-section', icon: '⭐', title: 'Customer Love', subtitle: 'What they say' },
                { selector: '.guarantee-section', icon: '🛡️', title: 'Our Promise', subtitle: '100% satisfaction' }
            ];
            
            sectionConfigs.forEach(config => {
                const section = document.querySelector(config.selector);
                if (section && !section.querySelector('.section-header')) {
                    const header = document.createElement('div');
                    header.className = 'section-header';
                    header.innerHTML = \`
                        <span class="section-icon">\${config.icon}</span>
                        <h2 class="section-title">\${config.title}</h2>
                        <p class="section-subtitle">\${config.subtitle}</p>
                    \`;
                    section.insertBefore(header, section.firstChild);
                }
            });
            
            // Add product features
            const productDisplay = document.querySelector('.product-display');
            if (productDisplay && !productDisplay.querySelector('.product-features')) {
                const features = document.createElement('div');
                features.className = 'product-features';
                features.innerHTML = \`
                    <div class="feature-card">
                        <span class="feature-icon">🌿</span>
                        <span class="feature-text">Eco-Friendly</span>
                    </div>
                    <div class="feature-card">
                        <span class="feature-icon">💎</span>
                        <span class="feature-text">Premium</span>
                    </div>
                    <div class="feature-card">
                        <span class="feature-icon">⚡</span>
                        <span class="feature-text">Limited</span>
                    </div>
                \`;
                productDisplay.appendChild(features);
            }
            
            // Wrap product image
            const productImage = document.querySelector('.product-image');
            if (productImage && !productImage.parentElement.classList.contains('product-image-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'product-image-wrapper';
                productImage.parentNode.insertBefore(wrapper, productImage);
                wrapper.appendChild(productImage);
            }
            
            // Size selection
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function() {
                    if (this.classList.contains('sold-out')) return;
                    
                    document.querySelectorAll('.size-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    
                    // Haptic feedback on mobile
                    if ('vibrate' in navigator) {
                        navigator.vibrate(10);
                    }
                });
            });
            
            // Simple countdown
            function updateCountdown() {
                const timer = document.querySelector('.countdown-timer');
                if (timer) {
                    const parts = timer.textContent.split(' ');
                    let seconds = parseInt(parts[4]) || 0;
                    seconds--;
                    if (seconds < 0) seconds = 59;
                    parts[4] = seconds.toString().padStart(2, '0') + 's';
                    timer.textContent = parts.join(' ');
                }
            }
            
            setInterval(updateCountdown, 1000);
            
            // Intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
            
            console.log('✅ Final perfect experience loaded!');
        });
    </script>
`;

// Replace scripts
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', enhancedInteractions + '\n</body>');

// 4. ENHANCE CONTENT
console.log('\n📱 Enhancing content structure...');

// Update headlines
html = html.replace(/Limited Drop|The Essential Hoodie/gi, 'NOT FOR<br>EVERYONE');

// Save final HTML
fs.writeFileSync(htmlPath, html);

console.log('\n✨ FINAL PERFECT MOBILE EXPERIENCE COMPLETE!');
console.log('==========================================');
console.log('✅ Iman Gadzhi dark luxury aesthetic');
console.log('✅ Gen Z pink/purple/blue accents');
console.log('✅ Beautiful section borders');
console.log('✅ Icons and visual breaks');
console.log('✅ Lightweight animations (0.5s)');
console.log('✅ Perfect mobile/tablet optimization');
console.log('✅ High readability throughout');
console.log('✅ Conversion-focused flow');
console.log('\n🚀 THE PERFECT EXPERIENCE IS READY!');