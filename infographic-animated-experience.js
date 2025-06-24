const fs = require('fs');
const path = require('path');

console.log('🎨 INFOGRAPHIC ANIMATED EXPERIENCE TRANSFORMATION');
console.log('================================================');
console.log('Creating visual storytelling with beautiful animations...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CREATE INFOGRAPHIC STYLE WITH ANIMATIONS
console.log('\n✨ Building animated infographic sections...');

const infographicAnimatedStyles = `
        /* 🎨 INFOGRAPHIC ANIMATED EXPERIENCE 🎨 */
        
        /* Design System */
        :root {
            /* Vibrant Gen Z Palette */
            --gradient-sunset: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
            --gradient-ocean: linear-gradient(135deg, #4ECDC4 0%, #44A3FF 100%);
            --gradient-lavender: linear-gradient(135deg, #C7A3FF 0%, #FFB6C1 100%);
            --gradient-mint: linear-gradient(135deg, #95E1D3 0%, #3FC1C9 100%);
            --gradient-peach: linear-gradient(135deg, #FFEAA7 0%, #FDCB6E 100%);
            
            /* Base Colors */
            --white: #FFFFFF;
            --off-white: #FAFAFA;
            --light-gray: #F5F5F5;
            --gray: #9B9B9B;
            --dark: #2C2C2C;
            --black: #000000;
            
            /* Shadows */
            --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
            --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
            --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
            --shadow-xl: 0 16px 48px rgba(0,0,0,0.16);
            
            /* Animations */
            --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
            --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* Reset & Base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--white);
            color: var(--dark);
            overflow-x: hidden;
            position: relative;
        }
        
        /* Container */
        .container {
            width: 100%;
            padding: 0 20px;
            max-width: 100%;
        }
        
        /* MOBILE INFOGRAPHIC SECTIONS */
        @media screen and (max-width: 480px) {
            
            /* SECTION 1: HERO INFOGRAPHIC */
            .hero {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: var(--gradient-sunset);
                position: relative;
                overflow: hidden;
                padding: 40px 20px;
            }
            
            /* Animated background shapes */
            .hero::before,
            .hero::after {
                content: '';
                position: absolute;
                border-radius: 50%;
                animation: float 20s infinite ease-in-out;
            }
            
            .hero::before {
                width: 300px;
                height: 300px;
                background: rgba(255, 255, 255, 0.1);
                top: -150px;
                right: -100px;
            }
            
            .hero::after {
                width: 200px;
                height: 200px;
                background: rgba(255, 255, 255, 0.08);
                bottom: -100px;
                left: -50px;
                animation-delay: -10s;
            }
            
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                33% { transform: translate(30px, -30px) rotate(120deg); }
                66% { transform: translate(-20px, 20px) rotate(240deg); }
            }
            
            /* Hero content */
            .hero-content {
                position: relative;
                z-index: 2;
                text-align: center;
                animation: fadeInUp 1s ease-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .main-headline {
                font-size: 2.5rem;
                font-weight: 800;
                color: var(--white);
                margin-bottom: 16px;
                line-height: 1.1;
                letter-spacing: -0.02em;
                animation: slideInFromTop 0.8s ease-out;
            }
            
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .sub-headline {
                font-size: 1rem;
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.6;
                margin-bottom: 32px;
                max-width: 300px;
                margin-left: auto;
                margin-right: auto;
                animation: fadeIn 1s ease-out 0.3s both;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Countdown Timer Infographic */
            .urgency-widget {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 24px 32px;
                box-shadow: var(--shadow-xl);
                animation: scaleIn 0.6s var(--ease-bounce) 0.5s both;
                position: relative;
                overflow: hidden;
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .urgency-widget::before {
                content: '⏰';
                position: absolute;
                font-size: 80px;
                opacity: 0.05;
                right: -20px;
                top: -20px;
                animation: rotate 20s linear infinite;
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .countdown-timer {
                font-size: 2rem;
                font-weight: 700;
                color: var(--dark);
                font-variant-numeric: tabular-nums;
            }
            
            .timer-number {
                display: inline-block;
                animation: pulse 1s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            /* Social proof animation */
            .social-proof-ticker {
                background: rgba(255, 255, 255, 0.2);
                color: var(--white);
                padding: 12px 24px;
                border-radius: 30px;
                margin-top: 24px;
                font-size: 0.875rem;
                animation: slideInFromBottom 0.8s ease-out 0.8s both;
                position: relative;
                overflow: hidden;
            }
            
            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* SECTION 2: PRODUCT SHOWCASE INFOGRAPHIC */
            .product-display {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--gradient-ocean);
                position: relative;
                padding: 60px 20px;
                overflow: hidden;
            }
            
            /* Animated circles */
            .product-display::before,
            .product-display::after {
                content: '';
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.2);
                animation: expand 3s ease-out infinite;
            }
            
            .product-display::before {
                width: 200px;
                height: 200px;
                top: 10%;
                left: -100px;
            }
            
            .product-display::after {
                width: 300px;
                height: 300px;
                bottom: 10%;
                right: -150px;
                animation-delay: 1.5s;
            }
            
            @keyframes expand {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .product-showcase {
                position: relative;
                z-index: 2;
                text-align: center;
            }
            
            .product-image {
                width: 80%;
                max-width: 300px;
                height: auto;
                filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
                animation: floatProduct 6s ease-in-out infinite;
                margin: 0 auto;
                display: block;
            }
            
            @keyframes floatProduct {
                0%, 100% { transform: translateY(0) rotate(-2deg); }
                50% { transform: translateY(-20px) rotate(2deg); }
            }
            
            .price-badge {
                position: absolute;
                top: 20px;
                right: 20px;
                background: var(--white);
                color: var(--dark);
                font-size: 1.5rem;
                font-weight: 800;
                padding: 12px 24px;
                border-radius: 30px;
                box-shadow: var(--shadow-lg);
                animation: bounceIn 1s var(--ease-bounce);
                transform-origin: center;
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            /* Product features */
            .product-features {
                display: flex;
                justify-content: center;
                gap: 24px;
                margin-top: 40px;
                animation: fadeInUp 1s ease-out 0.5s both;
            }
            
            .feature-icon {
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: var(--white);
                animation: rotateIn 0.8s ease-out;
            }
            
            @keyframes rotateIn {
                from {
                    opacity: 0;
                    transform: rotate(-180deg) scale(0);
                }
                to {
                    opacity: 1;
                    transform: rotate(0) scale(1);
                }
            }
            
            /* SECTION 3: SIZE SELECTOR INFOGRAPHIC */
            .size-selector {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: var(--gradient-lavender);
                padding: 60px 20px;
                position: relative;
                overflow: hidden;
            }
            
            /* Animated pattern background */
            .size-selector::before {
                content: '';
                position: absolute;
                inset: 0;
                background-image: 
                    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
                animation: patternMove 30s linear infinite;
            }
            
            @keyframes patternMove {
                from { transform: translate(0, 0); }
                to { transform: translate(-50px, -50px); }
            }
            
            .size-content {
                position: relative;
                z-index: 2;
            }
            
            .size-title {
                font-size: 2rem;
                font-weight: 800;
                color: var(--white);
                text-align: center;
                margin-bottom: 40px;
                animation: slideInFromLeft 0.8s ease-out;
            }
            
            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .size-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                max-width: 320px;
                margin: 0 auto;
            }
            
            .size-option {
                background: rgba(255, 255, 255, 0.9);
                border: 2px solid transparent;
                border-radius: 20px;
                height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s var(--ease-out);
                animation: popIn 0.5s var(--ease-bounce) calc(var(--i) * 0.1s) both;
                position: relative;
                overflow: hidden;
            }
            
            .size-option:nth-child(1) { --i: 0; }
            .size-option:nth-child(2) { --i: 1; }
            .size-option:nth-child(3) { --i: 2; }
            .size-option:nth-child(4) { --i: 3; }
            .size-option:nth-child(5) { --i: 4; }
            .size-option:nth-child(6) { --i: 5; }
            
            @keyframes popIn {
                from {
                    opacity: 0;
                    transform: scale(0);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .size-option::before {
                content: '';
                position: absolute;
                inset: -2px;
                background: var(--gradient-lavender);
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
            }
            
            .size-option.selected::before {
                opacity: 1;
            }
            
            .size-option:hover:not(.sold-out) {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }
            
            .size-label {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--dark);
                transition: color 0.3s ease;
            }
            
            .size-option.selected .size-label {
                color: var(--white);
            }
            
            /* Size chart animation */
            .size-chart-link {
                text-align: center;
                margin-top: 32px;
                color: var(--white);
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                animation: slideInFromRight 0.8s ease-out 0.6s both;
            }
            
            @keyframes slideInFromRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            /* SECTION 4: PROCESS INFOGRAPHIC */
            .process-section {
                background: var(--gradient-mint);
                padding: 80px 20px;
                position: relative;
                overflow: hidden;
            }
            
            .process-section::before {
                content: '';
                position: absolute;
                width: 2px;
                height: 80%;
                background: rgba(255, 255, 255, 0.3);
                left: 50%;
                top: 10%;
                transform: translateX(-50%);
            }
            
            .section-title {
                font-size: 2rem;
                font-weight: 800;
                color: var(--white);
                text-align: center;
                margin-bottom: 60px;
                position: relative;
                z-index: 2;
                animation: fadeInDown 0.8s ease-out;
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .process-steps {
                position: relative;
                z-index: 2;
            }
            
            .process-step {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 32px 24px;
                margin-bottom: 40px;
                box-shadow: var(--shadow-xl);
                position: relative;
                animation: slideInAlternate 0.8s ease-out both;
                animation-delay: calc(var(--i) * 0.2s);
            }
            
            .process-step:nth-child(1) { --i: 0; }
            .process-step:nth-child(2) { --i: 1; }
            .process-step:nth-child(3) { --i: 2; }
            
            .process-step:nth-child(odd) {
                animation-name: slideInFromLeft;
            }
            
            .process-step:nth-child(even) {
                animation-name: slideInFromRight;
            }
            
            .step-number {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 60px;
                height: 60px;
                background: var(--white);
                border: 4px solid var(--gradient-mint);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 800;
                color: #3FC1C9;
                box-shadow: var(--shadow-md);
                animation: bounceIn 0.5s var(--ease-bounce) calc(var(--i) * 0.2s + 0.3s) both;
            }
            
            .step-icon {
                font-size: 48px;
                margin-bottom: 16px;
                display: block;
                text-align: center;
                animation: rotateIn 0.8s ease-out calc(var(--i) * 0.2s + 0.5s) both;
            }
            
            .step-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--dark);
                margin-bottom: 8px;
            }
            
            .step-description {
                font-size: 0.875rem;
                color: var(--gray);
                line-height: 1.6;
            }
            
            /* CTA Buttons */
            .buy-now-button,
            .simpleswap-link-button {
                background: var(--gradient-sunset);
                color: var(--white);
                border: none;
                width: 100%;
                height: 60px;
                font-size: 1rem;
                font-weight: 700;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                border-radius: 30px;
                margin: 32px 0;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                animation: pulseGlow 2s ease-in-out infinite;
                box-shadow: var(--shadow-lg);
            }
            
            @keyframes pulseGlow {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.5), var(--shadow-lg);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0), var(--shadow-lg);
                }
            }
            
            .buy-now-button::before {
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
            
            .buy-now-button:active::before {
                width: 300px;
                height: 300px;
            }
            
            /* Reviews Section Infographic */
            .reviews-section {
                background: var(--gradient-peach);
                padding: 80px 20px;
                position: relative;
            }
            
            .review-card {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 24px;
                margin-bottom: 20px;
                box-shadow: var(--shadow-lg);
                animation: fadeInScale 0.8s ease-out both;
                animation-delay: calc(var(--i) * 0.15s);
                position: relative;
                overflow: hidden;
            }
            
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .review-card::before {
                content: '⭐⭐⭐⭐⭐';
                position: absolute;
                top: 12px;
                right: 12px;
                font-size: 14px;
                opacity: 0.8;
            }
            
            /* Story Carousel */
            .story-carousel,
            .review-carousel {
                position: relative;
                overflow: hidden;
                border-radius: 20px;
                box-shadow: var(--shadow-xl);
            }
            
            .carousel-slide {
                animation: slideIn 0.5s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            /* Guarantee Section */
            .guarantee-section {
                background: var(--white);
                padding: 80px 20px;
            }
            
            .guarantee-grid {
                display: grid;
                gap: 24px;
            }
            
            .guarantee-item {
                background: var(--light-gray);
                border-radius: 20px;
                padding: 32px;
                text-align: center;
                animation: zoomIn 0.8s ease-out both;
                animation-delay: calc(var(--i) * 0.2s);
                position: relative;
                overflow: hidden;
            }
            
            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .guarantee-icon {
                font-size: 48px;
                margin-bottom: 16px;
                animation: bounce 2s ease-in-out infinite;
                animation-delay: calc(var(--i) * 0.3s);
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            /* Scroll indicators */
            .scroll-indicator {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 50px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 15px;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 8px;
                animation: scrollBounce 1.5s ease-in-out infinite;
            }
            
            .scroll-indicator::before {
                content: '';
                width: 4px;
                height: 8px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 2px;
                animation: scrollWheel 1.5s ease-in-out infinite;
            }
            
            @keyframes scrollBounce {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(10px); }
            }
            
            @keyframes scrollWheel {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(20px); opacity: 0; }
            }
        }
`;

// 2. REPLACE ALL STYLES
console.log('\n🎯 Injecting infographic animated styles...');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${infographicAnimatedStyles}</style>`);

// 3. ADD ENHANCED INTERACTIONS
console.log('\n🚀 Adding beautiful interactions...');

const enhancedInteractions = `
    <!-- Infographic Animations & Interactions -->
    <script>
        console.log('🎨 Loading infographic animations...');
        
        document.addEventListener('DOMContentLoaded', () => {
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add stagger effect to children
                        const children = entry.target.querySelectorAll('.animate-child');
                        children.forEach((child, index) => {
                            child.style.animationDelay = (index * 0.1) + 's';
                            child.classList.add('visible');
                        });
                    }
                });
            }, observerOptions);
            
            // Observe all sections
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
            
            // Size selection with ripple effect
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    if (this.classList.contains('sold-out')) return;
                    
                    // Remove previous selection
                    document.querySelectorAll('.size-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selection
                    this.classList.add('selected');
                    
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            });
            
            // Smooth parallax scrolling
            let ticking = false;
            function updateParallax() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        
                        // Parallax backgrounds
                        document.querySelectorAll('[data-parallax]').forEach(el => {
                            const speed = el.dataset.parallax;
                            const yPos = -(scrolled * speed);
                            el.style.transform = 'translateY(' + yPos + 'px)';
                        });
                        
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', updateParallax);
            
            // Countdown timer animation
            function updateCountdown() {
                const hours = document.querySelector('.hours');
                const minutes = document.querySelector('.minutes');
                const seconds = document.querySelector('.seconds');
                
                if (seconds) {
                    let sec = parseInt(seconds.textContent);
                    sec--;
                    if (sec < 0) sec = 59;
                    seconds.textContent = sec.toString().padStart(2, '0');
                    seconds.classList.add('tick');
                    setTimeout(() => seconds.classList.remove('tick'), 300);
                }
            }
            
            setInterval(updateCountdown, 1000);
            
            // Touch feedback
            document.querySelectorAll('button, .size-option, a').forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                el.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
            
            // Add infographic elements
            function addInfographicElements() {
                // Add feature icons to product section
                const productDisplay = document.querySelector('.product-display');
                if (productDisplay && !productDisplay.querySelector('.product-features')) {
                    const features = document.createElement('div');
                    features.className = 'product-features';
                    features.innerHTML = \`
                        <div class="feature-icon">✨</div>
                        <div class="feature-icon">🌿</div>
                        <div class="feature-icon">💎</div>
                    \`;
                    productDisplay.appendChild(features);
                }
                
                // Add step icons
                document.querySelectorAll('.process-step').forEach((step, index) => {
                    if (!step.querySelector('.step-icon')) {
                        const icon = document.createElement('div');
                        icon.className = 'step-icon';
                        icon.textContent = ['📦', '💳', '🚀'][index] || '✓';
                        step.insertBefore(icon, step.firstChild);
                    }
                });
                
                // Add guarantee icons
                document.querySelectorAll('.guarantee-item').forEach((item, index) => {
                    item.style.setProperty('--i', index);
                    if (!item.querySelector('.guarantee-icon')) {
                        const icon = document.createElement('div');
                        icon.className = 'guarantee-icon';
                        icon.textContent = ['🛡️', '♻️', '🌟'][index] || '✓';
                        item.insertBefore(icon, item.firstChild);
                    }
                });
            }
            
            addInfographicElements();
            
            console.log('✨ Infographic animations loaded!');
        });
        
        // Add ripple effect styles
        const style = document.createElement('style');
        style.textContent = \`
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .tick {
                animation: tickAnimation 0.3s ease-out;
            }
            
            @keyframes tickAnimation {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); color: #FF6B6B; }
                100% { transform: scale(1); }
            }
        \`;
        document.head.appendChild(style);
    </script>
`;

// Replace all scripts
html = html.replace(/<script>[\s\S]*?<\/script>/g, '');
html = html.replace('</body>', enhancedInteractions + '\n</body>');

// 4. ENHANCE HTML STRUCTURE
console.log('\n🎯 Enhancing HTML structure...');

// Add scroll indicators to sections
html = html.replace(/<section class="hero">/g, '<section class="hero"><div class="scroll-indicator"></div>');
html = html.replace(/<section class="product-display">/g, '<section class="product-display"><div class="scroll-indicator"></div>');

// Add data attributes for parallax
html = html.replace(/<img class="product-image"/g, '<img class="product-image" data-parallax="0.3"');

// Save the enhanced HTML
fs.writeFileSync(htmlPath, html);

console.log('\n🎨 INFOGRAPHIC ANIMATED EXPERIENCE COMPLETE!');
console.log('===========================================');
console.log('✅ Each section is a visual infographic');
console.log('✅ Beautiful scroll-triggered animations');
console.log('✅ Gradient backgrounds for each section');
console.log('✅ Floating elements and parallax effects');
console.log('✅ Interactive size selector with ripples');
console.log('✅ Animated countdown timer');
console.log('✅ Process steps with icons and animations');
console.log('✅ Smooth transitions between sections');
console.log('\n🚀 READY FOR AN AMAZING EXPERIENCE!');