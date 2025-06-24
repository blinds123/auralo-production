const puppeteer = require('puppeteer');

async function captureMobileExperience() {
    console.log('📱 Capturing Iman Gadzhi mobile experience...');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // iPhone 13 Pro viewport
    await page.setViewport({ 
        width: 390, 
        height: 844, 
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for animations and social proof
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('📸 Capturing hero section...');
    await page.screenshot({ 
        path: 'iman-mobile-hero.png',
        fullPage: false
    });
    
    // Scroll to size selector
    await page.evaluate(() => {
        document.querySelector('.size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Capturing size selector...');
    await page.screenshot({ 
        path: 'iman-mobile-sizes.png',
        fullPage: false
    });
    
    // Scroll to process section
    await page.evaluate(() => {
        document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Capturing process steps...');
    await page.screenshot({ 
        path: 'iman-mobile-process.png',
        fullPage: false
    });
    
    // Scroll to carousel
    await page.evaluate(() => {
        document.querySelector('.story-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Capturing story carousel...');
    await page.screenshot({ 
        path: 'iman-mobile-carousel.png',
        fullPage: false
    });
    
    // Capture full page
    console.log('📸 Capturing full mobile experience...');
    await page.screenshot({ 
        path: 'iman-mobile-full-page.png',
        fullPage: true
    });
    
    // Test XL popup (wait 13 seconds)
    await page.reload({ waitUntil: 'networkidle0' });
    console.log('⏰ Waiting for XL popup (13 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 14000));
    
    await page.screenshot({ 
        path: 'iman-mobile-xl-popup.png',
        fullPage: false
    });
    
    console.log('✅ Mobile experience captured!');
    console.log('   • Hero with social proof');
    console.log('   • Size selector');
    console.log('   • Process steps');
    console.log('   • Story carousel');
    console.log('   • XL sold out popup');
    
    await browser.close();
}

captureMobileExperience();