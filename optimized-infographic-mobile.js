const fs = require('fs');
const path = require('path');

console.log('📱 OPTIMIZED INFOGRAPHIC MOBILE EXPERIENCE');
console.log('==========================================');
console.log('Creating high-performance animated sections...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CREATE PERFORMANCE-OPTIMIZED INFOGRAPHIC STYLES
console.log('\n⚡ Building performance-optimized animations...');

const optimizedInfographicStyles = `
        /* 📱 OPTIMIZED MOBILE INFOGRAPHIC EXPERIENCE 📱 */
        
        /* Design System */
        :root {
            /* Soft Gen Z Gradients */
            --gradient-hero: linear-gradient(180deg, #FFE5EC 0%, #FFF5F5 100%);
            --gradient-product: linear-gradient(180deg, #E8F3FF 0%, #F5F9FF 100%);
            --gradient-size: linear-gradient(180deg, #F5E6FF 0%, #FFF5FF 100%);
            --gradient-process: linear-gradient(180deg, #E5FFF5 0%, #F5FFFA 100%);
            --gradient-reviews: linear-gradient(180deg, #FFF9E5 0%, #FFFEF5 100%);
            
            /* Clean Colors */
            --text-primary: #1A1A1A;
            --text-secondary: #6B6B6B;
            --text-light: #9B9B9B;
            --white: #FFFFFF;
            --off-white: #FAFAFA;
            --border-light: rgba(0,0,0,0.08);
            --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
            --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
            --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
            
            /* Typography Scale */
            --text-xs: 0.75rem;
            --text-sm: 0.875rem;
            --text-base: 1rem;
            --text-lg: 1.125rem;
            --text-xl: 1.5rem;
            --text-2xl: 2rem;
            --text-3xl: 2.5rem;
            
            /* Spacing */
            --space-2: 0.5rem;
            --space-3: 0.75rem;
            --space-4: 1rem;
            --space-6: 1.5rem;
            --space-8: 2rem;
            --space-10: 2.5rem;
            --space-12: 3rem;
            --space-16: 4rem;
            --space-20: 5rem;
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
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: var(--text-primary);
            background: var(--white);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        /* Container */
        .container {
            width: 100%;
            max-width: 100%;
            padding: 0 20px;
        }
        
        /* OPTIMIZED MOBILE SECTIONS */
        @media screen and (max-width: 480px) {
            
            /* Section Base */
            section {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                padding: var(--space-16) var(--space-6);
            }
            
            /* SECTION 1: HERO - Invitation to Scroll */
            .hero {
                background: var(--gradient-hero);
                text-align: center;
            }
            
            .hero-content {
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .main-headline {
                font-size: var(--text-3xl);
                font-weight: 700;
                color: var(--text-primary);
                line-height: 1.1;
                margin-bottom: var(--space-4);
                letter-spacing: -0.02em;
            }
            
            .sub-headline {
                font-size: var(--text-base);
                color: var(--text-secondary);
                max-width: 300px;
                margin: 0 auto var(--space-8);
            }
            
            /* Urgency Box - Subtle Animation */
            .urgency-widget {
                background: var(--white);
                border-radius: 16px;
                padding: var(--space-6);
                box-shadow: var(--shadow-md);
                margin-bottom: var(--space-8);
                opacity: 0;
                animation: fadeIn 0.6s ease-out 0.3s forwards;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            .urgency-title {
                font-size: var(--text-sm);
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--text-light);
                margin-bottom: var(--space-2);
            }
            
            .countdown-timer {
                font-size: var(--text-2xl);
                font-weight: 600;
                color: var(--text-primary);
                font-variant-numeric: tabular-nums;
            }
            
            /* Social Proof - Gentle Pulse */
            .social-proof-ticker {
                background: rgba(255, 107, 107, 0.1);
                color: var(--text-primary);
                padding: var(--space-3) var(--space-6);
                border-radius: 24px;
                font-size: var(--text-sm);
                display: inline-block;
                opacity: 0;
                animation: fadeIn 0.6s ease-out 0.6s forwards;
            }
            
            /* Scroll Hint */
            .scroll-hint {
                position: absolute;
                bottom: var(--space-8);
                left: 50%;
                transform: translateX(-50%);
                font-size: var(--text-sm);
                color: var(--text-light);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-2);
                opacity: 0;
                animation: fadeInBounce 1s ease-out 1s forwards;
            }
            
            @keyframes fadeInBounce {
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(-5px);
                }
            }
            
            .scroll-arrow {
                width: 24px;
                height: 24px;
                border-bottom: 2px solid var(--text-light);
                border-right: 2px solid var(--text-light);
                transform: rotate(45deg);
                animation: scrollBounce 1.5s ease-in-out infinite;
            }
            
            @keyframes scrollBounce {
                0%, 100% { transform: rotate(45deg) translateY(0); }
                50% { transform: rotate(45deg) translateY(5px); }
            }
            
            /* SECTION 2: PRODUCT - Visual Focus */
            .product-display {
                background: var(--gradient-product);
                align-items: center;
            }
            
            .product-showcase {
                text-align: center;
                width: 100%;
            }
            
            .product-title {
                font-size: var(--text-xl);
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: var(--space-6);
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .product-image-container {
                position: relative;
                margin-bottom: var(--space-8);
            }
            
            .product-image {
                width: 75%;
                max-width: 280px;
                height: auto;
                margin: 0 auto;
                display: block;
                filter: drop-shadow(0 16px 32px rgba(0,0,0,0.1));
                opacity: 0;
                transform: scale(0.9);
                animation: scaleIn 0.8s ease-out 0.2s forwards;
            }
            
            @keyframes scaleIn {
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .price-badge {
                position: absolute;
                top: 0;
                right: 10%;
                background: var(--white);
                color: var(--text-primary);
                font-size: var(--text-xl);
                font-weight: 700;
                padding: var(--space-3) var(--space-6);
                border-radius: 24px;
                box-shadow: var(--shadow-lg);
                opacity: 0;
                animation: popIn 0.5s ease-out 0.5s forwards;
            }
            
            @keyframes popIn {
                to {
                    opacity: 1;
                    transform: scale(1) rotate(-5deg);
                }
                from {
                    transform: scale(0) rotate(-5deg);
                }
            }
            
            /* Product Benefits */
            .product-benefits {
                display: flex;
                justify-content: center;
                gap: var(--space-8);
                margin-bottom: var(--space-8);
            }
            
            .benefit {
                text-align: center;
                opacity: 0;
                animation: fadeIn 0.6s ease-out forwards;
                animation-delay: calc(0.6s + var(--i) * 0.1s);
            }
            
            .benefit:nth-child(1) { --i: 0; }
            .benefit:nth-child(2) { --i: 1; }
            .benefit:nth-child(3) { --i: 2; }
            
            .benefit-icon {
                font-size: 2rem;
                margin-bottom: var(--space-2);
            }
            
            .benefit-text {
                font-size: var(--text-sm);
                color: var(--text-secondary);
            }
            
            /* SECTION 3: SIZE SELECTION - Interactive Focus */
            .size-selector {
                background: var(--gradient-size);
            }
            
            .size-content {
                width: 100%;
            }
            
            .size-title {
                font-size: var(--text-2xl);
                font-weight: 600;
                text-align: center;
                margin-bottom: var(--space-8);
                color: var(--text-primary);
                opacity: 0;
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--space-3);
                max-width: 320px;
                margin: 0 auto var(--space-8);
            }
            
            .size-option {
                background: var(--white);
                border: 2px solid var(--border-light);
                border-radius: 12px;
                height: 72px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.5s ease-out forwards;
                animation-delay: calc(0.1s + var(--i) * 0.05s);
            }
            
            .size-option:nth-child(1) { --i: 0; }
            .size-option:nth-child(2) { --i: 1; }
            .size-option:nth-child(3) { --i: 2; }
            .size-option:nth-child(4) { --i: 3; }
            .size-option:nth-child(5) { --i: 4; }
            .size-option:nth-child(6) { --i: 5; }
            
            .size-option:active {
                transform: scale(0.95);
            }
            
            .size-option.selected {
                background: var(--text-primary);
                border-color: var(--text-primary);
            }
            
            .size-option.selected .size-label {
                color: var(--white);
            }
            
            .size-option.sold-out {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .size-label {
                font-size: var(--text-lg);
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .size-status {
                font-size: var(--text-xs);
                color: var(--text-light);
                margin-top: 2px;
            }
            
            /* CTA Button - High Contrast */
            .buy-now-button {
                background: var(--text-primary);
                color: var(--white);
                border: none;
                width: 100%;
                height: 56px;
                font-size: var(--text-base);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                border-radius: 28px;
                cursor: pointer;
                box-shadow: var(--shadow-lg);
                transition: transform 0.2s ease;
                opacity: 0;
                animation: fadeInUp 0.6s ease-out 0.5s forwards;
            }
            
            .buy-now-button:active {
                transform: scale(0.98);
            }
            
            /* SECTION 4: PROCESS - Clear Steps */
            .process-section {
                background: var(--gradient-process);
            }
            
            .section-title {
                font-size: var(--text-2xl);
                font-weight: 600;
                text-align: center;
                margin-bottom: var(--space-10);
                color: var(--text-primary);
                opacity: 0;
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .process-steps {
                display: flex;
                flex-direction: column;
                gap: var(--space-6);
            }
            
            .process-step {
                background: var(--white);
                border-radius: 16px;
                padding: var(--space-8) var(--space-6);
                box-shadow: var(--shadow-md);
                display: flex;
                align-items: flex-start;
                gap: var(--space-4);
                opacity: 0;
                transform: translateX(-20px);
                animation: slideInLeft 0.6s ease-out forwards;
                animation-delay: calc(0.1s + var(--i) * 0.15s);
            }
            
            .process-step:nth-child(1) { --i: 0; }
            .process-step:nth-child(2) { --i: 1; }
            .process-step:nth-child(3) { --i: 2; }
            
            @keyframes slideInLeft {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .step-number {
                width: 48px;
                height: 48px;
                background: var(--gradient-process);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--text-lg);
                font-weight: 700;
                color: var(--text-primary);
                flex-shrink: 0;
            }
            
            .step-content {
                flex: 1;
            }
            
            .step-title {
                font-size: var(--text-lg);
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: var(--space-2);
            }
            
            .step-description {
                font-size: var(--text-sm);
                color: var(--text-secondary);
                line-height: 1.5;
            }
            
            /* Review Section */
            .reviews-section {
                background: var(--gradient-reviews);
                padding: var(--space-16) var(--space-6);
            }
            
            .review-scroll {
                display: flex;
                gap: var(--space-4);
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
                padding-bottom: var(--space-4);
                margin: 0 calc(var(--space-6) * -1);
                padding-left: var(--space-6);
                padding-right: var(--space-6);
            }
            
            .review-card {
                background: var(--white);
                border-radius: 16px;
                padding: var(--space-6);
                min-width: 280px;
                scroll-snap-align: start;
                box-shadow: var(--shadow-md);
                opacity: 0;
                animation: fadeIn 0.6s ease-out forwards;
                animation-delay: calc(0.1s + var(--i) * 0.1s);
            }
            
            .review-card:nth-child(1) { --i: 0; }
            .review-card:nth-child(2) { --i: 1; }
            .review-card:nth-child(3) { --i: 2; }
            
            .review-stars {
                color: #FFD700;
                margin-bottom: var(--space-3);
            }
            
            .review-text {
                font-size: var(--text-sm);
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: var(--space-3);
            }
            
            .review-author {
                font-size: var(--text-sm);
                font-weight: 600;
                color: var(--text-primary);
            }
            
            /* Final CTA Section */
            .final-cta {
                background: var(--white);
                padding: var(--space-16) var(--space-6);
                text-align: center;
            }
            
            .final-headline {
                font-size: var(--text-2xl);
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: var(--space-4);
            }
            
            .final-description {
                font-size: var(--text-base);
                color: var(--text-secondary);
                margin-bottom: var(--space-8);
            }
            
            /* Remove heavy animations */
            * {
                animation-duration: 0.6s !important;
                animation-fill-mode: both !important;
            }
            
            /* Hide non-essential decorative elements */
            ::before,
            ::after {
                display: none !important;
            }
            
            /* Ensure smooth scrolling */
            * {
                -webkit-overflow-scrolling: touch;
            }
            
            /* Performance optimizations */
            img {
                will-change: auto;
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }
        }
`;

// 2. REPLACE STYLES
console.log('\n💉 Injecting optimized styles...');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${optimizedInfographicStyles}</style>`);

// 3. ADD LIGHTWEIGHT INTERACTIONS
console.log('\n⚡ Adding performance-optimized interactions...');

const lightweightInteractions = `
    <!-- Optimized Mobile Interactions -->
    <script>
        console.log('⚡ Loading optimized interactions...');
        
        document.addEventListener('DOMContentLoaded', () => {
            // Simple intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe sections
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
            
            // Size selection
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function() {
                    if (this.classList.contains('sold-out')) return;
                    
                    document.querySelectorAll('.size-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });
            
            // Add scroll hints
            const hero = document.querySelector('.hero');
            if (hero && !hero.querySelector('.scroll-hint')) {
                const hint = document.createElement('div');
                hint.className = 'scroll-hint';
                hint.innerHTML = '<div class="scroll-arrow"></div><span>Scroll to explore</span>';
                hero.appendChild(hint);
            }
            
            // Add product benefits
            const productDisplay = document.querySelector('.product-showcase');
            if (productDisplay && !productDisplay.querySelector('.product-benefits')) {
                const benefits = document.createElement('div');
                benefits.className = 'product-benefits';
                benefits.innerHTML = \`
                    <div class="benefit">
                        <div class="benefit-icon">🌿</div>
                        <div class="benefit-text">Eco-Friendly</div>
                    </div>
                    <div class="benefit">
                        <div class="benefit-icon">✨</div>
                        <div class="benefit-text">Premium</div>
                    </div>
                    <div class="benefit">
                        <div class="benefit-icon">💎</div>
                        <div class="benefit-text">Limited</div>
                    </div>
                \`;
                productDisplay.appendChild(benefits);
            }
            
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
            
            console.log('✅ Optimized interactions loaded');
        });
    </script>
`;

// Replace scripts
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', lightweightInteractions + '\n</body>');

// 4. ENHANCE CONTENT STRUCTURE
console.log('\n📱 Optimizing content structure...');

// Add section titles and improve flow
html = html.replace('The Essential Hoodie', 'Limited Drop');
html = html.replace(/Size/gi, 'Choose Your Size');
html = html.replace(/Details/gi, 'How It Works');

// Add product title
html = html.replace(/<section class="product-display">/g, 
    '<section class="product-display"><div class="product-showcase"><h2 class="product-title">Premium Quality</h2>');

// Save optimized HTML
fs.writeFileSync(htmlPath, html);

console.log('\n📱 OPTIMIZED INFOGRAPHIC COMPLETE!');
console.log('===================================');
console.log('✅ Lightweight animations (0.6s max)');
console.log('✅ Performance-optimized for mobile');
console.log('✅ Clear visual hierarchy');
console.log('✅ Smooth scrolling experience');
console.log('✅ High readability throughout');
console.log('✅ Conversion-focused design');
console.log('✅ Beautiful section transitions');
console.log('\n🚀 READY FOR HIGH-END MOBILE EXPERIENCE!');