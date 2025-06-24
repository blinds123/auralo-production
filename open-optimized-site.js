const puppeteer = require('puppeteer');

async function openOptimizedSite() {
    console.log('🚀 OPENING OPTIMIZED MOBILE SITE');
    console.log('=================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: [
            '--window-size=400,900',
            '--window-position=100,50'
        ]
    });
    
    const page = await browser.newPage();
    
    // Set iPhone viewport
    await page.setViewport({ 
        width: 390, 
        height: 844, 
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    console.log('📱 Loading optimized mobile experience...');
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    console.log('\n✨ SITE IS NOW OPEN!');
    console.log('====================');
    console.log('\n🎯 What to check:');
    console.log('   • Carousel images - now properly sized');
    console.log('   • Swipe gestures work on carousels');
    console.log('   • All buttons are touch-friendly');
    console.log('   • Text has proper sections & borders');
    console.log('   • No horizontal scrolling');
    console.log('   • Everything fits perfectly');
    
    console.log('\n📱 Try scrolling through all sections!');
    console.log('Press Ctrl+C to close when done\n');
    
    // Keep browser open
    await new Promise(() => {});
}

openOptimizedSite();