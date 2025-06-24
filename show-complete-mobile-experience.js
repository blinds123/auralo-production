const puppeteer = require('puppeteer');

async function showCompleteMobileExperience() {
    console.log('📱 SHOWING COMPLETE MOBILE EXPERIENCE');
    console.log('====================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [
            '--window-size=400,900',
            '--window-position=100,50'
        ]
    });
    
    const page = await browser.newPage();
    
    // Set iPhone 13 Pro viewport
    await page.setViewport({ 
        width: 390, 
        height: 844, 
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    console.log('📱 Loading mobile experience...');
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for initial load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n✨ MOBILE EXPERIENCE LOADED!');
    console.log('============================\n');
    
    console.log('🎨 WHAT YOU\'RE SEEING:\n');
    
    console.log('1️⃣ HERO SECTION');
    console.log('   • "NOT FOR EVERYONE" gradient headline');
    console.log('   • Dark luxury background (#0A0A0A)');
    console.log('   • Glassmorphic countdown timer');
    console.log('   • Pink social proof ticker\n');
    
    // Auto-scroll demonstration
    setTimeout(async () => {
        console.log('📸 Scrolling to Product Section...');
        await page.evaluate(() => {
            document.querySelector('.product-display')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
        
        setTimeout(async () => {
            console.log('\n2️⃣ PRODUCT SECTION');
            console.log('   • Premium product image with $20 badge');
            console.log('   • 3 feature cards (Eco, Premium, Limited)');
            console.log('   • Dark charcoal background\n');
            
            console.log('📸 Scrolling to Size Selector...');
            await page.evaluate(() => {
                document.querySelector('.size-selector')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
            
            setTimeout(async () => {
                console.log('\n3️⃣ SIZE SELECTOR');
                console.log('   • 6 size options in grid layout');
                console.log('   • Pink gradient on selection');
                console.log('   • Glassmorphic cards');
                console.log('   • Pink gradient CTA button\n');
                
                console.log('📸 Scrolling to Process Steps...');
                await page.evaluate(() => {
                    document.querySelector('.process-section')?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                });
                
                setTimeout(async () => {
                    console.log('\n4️⃣ PROCESS SECTION');
                    console.log('   • 3 numbered steps with icons');
                    console.log('   • Purple gradient step numbers');
                    console.log('   • SimpleSwap blue button');
                    console.log('   • Clean card design\n');
                    
                    console.log('🎯 KEY FEATURES:');
                    console.log('   ✅ Dark luxury Iman Gadzhi aesthetic');
                    console.log('   ✅ Gen Z pink/purple/blue accents');
                    console.log('   ✅ Beautiful section borders');
                    console.log('   ✅ Icons breaking up text');
                    console.log('   ✅ Lightweight 0.5s animations');
                    console.log('   ✅ Perfect mobile optimization');
                    
                    console.log('\n💡 INTERACTION TIPS:');
                    console.log('   • Tap any size to see selection animation');
                    console.log('   • Scroll smoothly between sections');
                    console.log('   • Watch countdown timer update');
                    console.log('   • Notice subtle animations on scroll');
                    
                }, 3000);
            }, 3000);
        }, 3000);
    }, 3000);
    
    console.log('\n👆 Browser is open - scroll to explore!');
    console.log('Press Ctrl+C when done viewing\n');
    
    // Keep browser open
    await new Promise(() => {});
}

showCompleteMobileExperience();