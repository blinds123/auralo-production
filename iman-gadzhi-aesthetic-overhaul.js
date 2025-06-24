const fs = require('fs');
const path = require('path');

console.log('🔥 IMAN GADZHI AESTHETIC OVERHAUL');
console.log('=================================');
console.log('Merging dark luxury with Gen Z girl vibes...');

// Read the current HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. IMAN GADZHI X GEN Z GIRL COLOR SYSTEM
console.log('\n🎨 Creating Iman x Gen Z girl aesthetic...');

const imanGenZAesthetic = `
        /* 🔥 IMAN GADZHI X GEN Z GIRL AESTHETIC 🔥 */
        
        * {
            margin: 0; 
            padding: 0; 
            box-sizing: border-box;
        }
        
        :root {
            /* Iman's Dark Luxury Palette */
            --iman-black: #0A0A0A;
            --iman-charcoal: #1A1A1A;
            --iman-gold: #FFD700;
            --iman-white: #FAFAFA;
            
            /* Gen Z Girl Accents */
            --gen-z-pink: #FFB6C1;
            --gen-z-purple: #E6E6FA;
            --gen-z-blue: #87CEEB;
            --y2k-silver: #C0C0C0;
            
            /* SimpleSwap Trust */
            --simpleswap-blue: #2196f3;
            --simpleswap-dark: #1976d2;
            
            /* Merged Gradients */
            --gradient-dark-luxury: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%);
            --gradient-gen-z: linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 50%, #87CEEB 100%);
            --gradient-subtle-glow: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(135, 206, 235, 0.1) 100%);
            
            /* Typography - Iman Style */
            --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            --font-display: 'SF Display', -apple-system, BlinkMacSystemFont, sans-serif;
            
            /* Spacing System */
            --space-xs: 0.5rem;
            --space-sm: 1rem;
            --space-md: 1.5rem;
            --space-lg: 2.5rem;
            --space-xl: 4rem;
            --space-xxl: 6rem;
        }
        
        /* DARK MODE BASE - IMAN STYLE */
        body {
            background: var(--iman-black);
            color: var(--iman-white);
            font-family: var(--font-primary);
            line-height: 1.6;
            overflow-x: hidden;
            position: relative;
        }
        
        /* Y2K GRADIENT BACKGROUND */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(135, 206, 235, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(230, 230, 250, 0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        }
        
        .container {
            max-width: 480px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 2;
        }
        
        /* HERO - IMAN STYLE HEADLINES */
        .main-headline {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.03em;
            text-transform: uppercase;
            margin-bottom: 1rem;
            
            /* Gen Z gradient text */
            background: linear-gradient(180deg, var(--iman-white) 0%, var(--gen-z-pink) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 2px 10px rgba(255, 182, 193, 0.3));
        }
        
        .sub-headline {
            font-size: 1rem;
            color: rgba(250, 250, 250, 0.7);
            line-height: 1.6;
            margin-bottom: 2rem;
            font-weight: 400;
        }
        
        /* URGENCY WIDGET - IMAN STYLE */
        .urgency-widget {
            background: rgba(26, 26, 26, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 182, 193, 0.2);
            border-radius: 16px;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 
                0 10px 40px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .urgency-title {
            color: var(--gen-z-pink);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        
        .countdown-timer {
            font-family: 'SF Mono', monospace;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--iman-white);
            text-shadow: 0 0 20px rgba(255, 182, 193, 0.5);
        }
        
        .timer-number {
            color: var(--gen-z-pink);
            font-weight: 900;
        }
        
        /* PRODUCT DISPLAY - Y2K VIBES */
        .product-display {
            position: relative;
            margin: 3rem 0;
            text-align: center;
        }
        
        .product-image {
            max-width: 100%;
            height: auto;
            filter: drop-shadow(0 20px 40px rgba(255, 182, 193, 0.2));
            animation: floatProduct 6s ease-in-out infinite;
        }
        
        @keyframes floatProduct {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .price-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--gradient-gen-z);
            color: var(--iman-black);
            font-weight: 900;
            font-size: 1.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 100px;
            box-shadow: 
                0 10px 30px rgba(255, 182, 193, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.5);
            transform: rotate(-15deg);
            animation: priceBounce 2s ease-in-out infinite;
        }
        
        @keyframes priceBounce {
            0%, 100% { transform: rotate(-15deg) scale(1); }
            50% { transform: rotate(-15deg) scale(1.1); }
        }
        
        /* SIZE SELECTOR - GEN Z STYLE */
        .size-selector {
            margin: 3rem 0;
        }
        
        .size-title {
            text-align: center;
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--gen-z-pink);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        
        .size-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            max-width: 360px;
            margin: 0 auto;
        }
        
        .size-option {
            background: rgba(26, 26, 26, 0.6);
            border: 2px solid rgba(255, 182, 193, 0.2);
            border-radius: 12px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            overflow: hidden;
        }
        
        .size-option::before {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--gradient-gen-z);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .size-option:hover:not(.sold-out) {
            transform: translateY(-3px);
            border-color: var(--gen-z-pink);
            box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
        }
        
        .size-option.selected {
            border-color: transparent;
        }
        
        .size-option.selected::before {
            opacity: 1;
        }
        
        .size-option.selected .size-label,
        .size-option.selected .size-status {
            color: var(--iman-black);
            font-weight: 700;
            position: relative;
            z-index: 1;
        }
        
        .size-option.sold-out {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .size-label {
            font-weight: 700;
            font-size: 1.125rem;
            color: var(--iman-white);
            display: block;
            position: relative;
            z-index: 1;
        }
        
        .size-status {
            font-size: 0.75rem;
            color: rgba(250, 250, 250, 0.6);
            margin-top: 0.25rem;
            position: relative;
            z-index: 1;
        }
        
        /* CTA BUTTONS - IMAN STYLE */
        .buy-now-button {
            background: var(--iman-white);
            color: var(--iman-black);
            border: none;
            padding: 1.25rem 2.5rem;
            font-size: 1rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 
                0 10px 40px rgba(255, 255, 255, 0.1),
                inset 0 -3px 0 rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            display: inline-block;
        }
        
        .buy-now-button::after {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--gradient-gen-z);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .buy-now-button:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 
                0 15px 50px rgba(255, 182, 193, 0.3),
                inset 0 -3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .buy-now-button:hover::after {
            opacity: 0.9;
        }
        
        .buy-now-button span {
            position: relative;
            z-index: 1;
        }
        
        /* SOCIAL PROOF - IMAN LOVES THIS */
        .social-proof-ticker {
            background: rgba(255, 182, 193, 0.1);
            border: 1px solid rgba(255, 182, 193, 0.2);
            border-radius: 100px;
            padding: 0.75rem 1.5rem;
            margin: 2rem 0;
            text-align: center;
            font-size: 0.875rem;
            color: var(--gen-z-pink);
            animation: socialPulse 2s ease-in-out infinite;
        }
        
        @keyframes socialPulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
        }
        
        /* CAROUSELS - Y2K STYLE */
        .story-carousel, .review-carousel {
            position: relative;
            margin: 3rem -20px;
            padding: 0 20px;
        }
        
        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 182, 193, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 182, 193, 0.3);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
            color: var(--iman-white);
            font-size: 1.25rem;
        }
        
        .carousel-nav:hover {
            background: rgba(255, 182, 193, 0.3);
            transform: translateY(-50%) scale(1.1);
        }
        
        .carousel-nav-left { left: 10px; }
        .carousel-nav-right { right: 10px; }
        
        .story-slide, .review-slide {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            position: relative;
        }
        
        .story-slide::after, .review-slide::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 60%, rgba(255, 182, 193, 0.1) 100%);
            pointer-events: none;
        }
        
        /* PROCESS STEPS - LUXURY MINIMAL */
        .process-step {
            background: rgba(26, 26, 26, 0.6);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 182, 193, 0.2);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .process-step:hover {
            transform: translateY(-5px);
            border-color: var(--gen-z-pink);
            box-shadow: 0 20px 60px rgba(255, 182, 193, 0.2);
        }
        
        .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: var(--gradient-gen-z);
            color: var(--iman-black);
            font-weight: 900;
            font-size: 0.875rem;
            border-radius: 20px;
            margin-bottom: 1rem;
            box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
        }
        
        /* SIMPLESWAP BUTTON - TRUST INTEGRATION */
        .simpleswap-link-button {
            background: var(--simpleswap-blue);
            color: white;
            border: none;
            padding: 1.25rem 2.5rem;
            font-size: 1rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 
                0 10px 40px rgba(33, 150, 243, 0.3),
                inset 0 -3px 0 rgba(0, 0, 0, 0.1);
            text-decoration: none;
            display: inline-block;
            animation: trustPulse 3s ease-in-out infinite;
        }
        
        @keyframes trustPulse {
            0%, 100% { 
                box-shadow: 
                    0 10px 40px rgba(33, 150, 243, 0.3),
                    inset 0 -3px 0 rgba(0, 0, 0, 0.1);
            }
            50% { 
                box-shadow: 
                    0 15px 50px rgba(33, 150, 243, 0.4),
                    inset 0 -3px 0 rgba(0, 0, 0, 0.1);
            }
        }
        
        .exchange-subheadline {
            margin-top: 1rem;
            font-size: 1rem;
            color: var(--gen-z-pink);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-align: center;
        }
        
        /* SECTION STYLING */
        section {
            padding: 4rem 0;
            position: relative;
            z-index: 2;
        }
        
        .section-title {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            text-align: center;
            background: linear-gradient(180deg, var(--iman-white) 0%, var(--gen-z-purple) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        /* MOBILE OPTIMIZATIONS */
        @media (max-width: 768px) {
            .hero {
                padding-top: 2rem;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .main-headline {
                text-align: center;
            }
            
            .sub-headline {
                text-align: center;
            }
            
            .product-display {
                margin: 2rem -20px;
            }
            
            .process-steps {
                margin-top: 3rem;
            }
            
            /* Touch-friendly sizing */
            .size-option, .buy-now-button, .simpleswap-link-button {
                min-height: 56px;
            }
        }
        
        /* DARK LUXURY SCROLLBAR */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--iman-black);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--gen-z-pink);
            border-radius: 100px;
        }
        
        /* SELECTION COLOR */
        ::selection {
            background: var(--gen-z-pink);
            color: var(--iman-black);
        }
        
        /* FOCUS STATES */
        *:focus-visible {
            outline: 2px solid var(--gen-z-pink);
            outline-offset: 4px;
        }
`;

// Replace the entire style section
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>${imanGenZAesthetic}</style>`);

// 2. ADD IMAN-STYLE INTERACTIONS
console.log('\n🚀 Adding Iman-style interactions...');

const imanInteractions = `
    <!-- Iman Gadzhi Style Interactions -->
    <script>
        console.log('🔥 Loading Iman Gadzhi aesthetic system...');
        
        // Add social proof ticker
        document.addEventListener('DOMContentLoaded', () => {
            // Create social proof ticker
            const ticker = document.createElement('div');
            ticker.className = 'social-proof-ticker';
            ticker.innerHTML = '🔥 Sarah from LA just got hers 2 mins ago';
            
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const container = heroSection.querySelector('.container');
                if (container) {
                    const urgencyWidget = container.querySelector('.urgency-widget');
                    if (urgencyWidget) {
                        urgencyWidget.insertAdjacentElement('afterend', ticker);
                    }
                }
            }
            
            // Update ticker messages
            const messages = [
                '🔥 Sarah from LA just got hers 2 mins ago',
                '💕 Emma from NYC is checking out now',
                '✨ Olivia from Miami just ordered size M',
                '🎯 Madison from Chicago viewing this page',
                '💖 Ashley from Dallas just claimed hers'
            ];
            
            let messageIndex = 0;
            setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                ticker.innerHTML = messages[messageIndex];
                ticker.style.animation = 'none';
                setTimeout(() => {
                    ticker.style.animation = 'socialPulse 2s ease-in-out infinite';
                }, 10);
            }, 4000);
            
            // Y2K cursor trail for desktop
            if (window.matchMedia('(hover: hover)').matches) {
                const colors = ['#FFB6C1', '#E6E6FA', '#87CEEB'];
                let colorIndex = 0;
                
                document.addEventListener('mousemove', (e) => {
                    const dot = document.createElement('div');
                    dot.style.cssText = \`
                        position: fixed;
                        width: 8px;
                        height: 8px;
                        background: \${colors[colorIndex]};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        left: \${e.clientX}px;
                        top: \${e.clientY}px;
                        transition: all 0.8s ease;
                        opacity: 0.8;
                    \`;
                    document.body.appendChild(dot);
                    
                    colorIndex = (colorIndex + 1) % colors.length;
                    
                    setTimeout(() => {
                        dot.style.opacity = '0';
                        dot.style.transform = 'scale(2)';
                    }, 10);
                    
                    setTimeout(() => {
                        dot.remove();
                    }, 800);
                });
            }
            
            // Smooth reveal animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                revealObserver.observe(section);
            });
            
            // Luxury haptic feedback
            if ('vibrate' in navigator) {
                document.querySelectorAll('button, .size-option').forEach(el => {
                    el.addEventListener('click', () => {
                        navigator.vibrate(10);
                    });
                });
            }
            
            console.log('✨ Iman x Gen Z aesthetic loaded!');
        });
    </script>
`;

// Add interactions before closing body
html = html.replace('</body>', imanInteractions + '\n</body>');

// 3. UPDATE TEXT TO MATCH IMAN'S STYLE
console.log('\n📝 Updating copy to Iman style...');

// Update headlines
html = html.replace('You Are Not<br>For Everyone', 'NOT FOR<br>EVERYONE');
html = html.replace('Pick Your Vibe ✨', 'SELECT YOUR SIZE');
html = html.replace('What You Actually Get', 'THE BREAKDOWN');
html = html.replace('Why This Hoodie Exists', 'THE STORY');

// 4. ENSURE XL TIMER SHOWS SCARCITY MESSAGE
console.log('\n⏰ Enhancing XL timer with Iman-style scarcity...');

html = html.replace(
    'SIZE XL JUST SOLD OUT!',
    'XL SOLD OUT<br><span style="font-size: 1.2rem; font-weight: 400;">Only 3 sizes left</span>'
);

// Save the enhanced HTML
fs.writeFileSync(htmlPath, html);

console.log('\n🔥 IMAN GADZHI AESTHETIC COMPLETE!');
console.log('==================================');
console.log('✅ Dark luxury base with Gen Z accents');
console.log('✅ Y2K gradient overlays');
console.log('✅ Social proof ticker added');
console.log('✅ SimpleSwap blue integrated');
console.log('✅ Mobile-first for Gen Z girls');
console.log('✅ Iman-style copy and urgency');
console.log('✅ Cursor trail effect for desktop');
console.log('\n💎 THIS IS THE PERFECT MERGE!');