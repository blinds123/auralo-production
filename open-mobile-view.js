const puppeteer = require('puppeteer');

async function openMobileView() {
    console.log('📱 OPENING TRUE MOBILE VIEW...');
    console.log('================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [
            '--window-size=400,900',
            '--window-position=100,50'
        ]
    });
    
    const page = await browser.newPage();
    
    // Set true mobile viewport
    await page.setViewport({ 
        width: 390, 
        height: 844, 
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    console.log('📱 Loading in iPhone 13 Pro view...');
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Enable touch emulation
    await page.emulate({
        viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true
        },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    });
    
    console.log('\n✨ MOBILE VIEW LOADED!');
    console.log('========================');
    console.log('📱 True iPhone 13 Pro dimensions');
    console.log('🌑 Dark luxury Iman Gadzhi aesthetic');
    console.log('💕 Gen Z girl color accents');
    console.log('✨ Y2K gradient effects');
    console.log('🔥 Social proof ticker running');
    console.log('\n👆 Try scrolling and tapping!');
    console.log('⏰ Wait 13 seconds for XL popup');
    console.log('\nPress Ctrl+C when done viewing');
    
    // Keep browser open
    await new Promise(() => {});
}

openMobileView();