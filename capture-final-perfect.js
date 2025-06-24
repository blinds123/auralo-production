const puppeteer = require('puppeteer');

async function captureFinalPerfect() {
    console.log('📸 Capturing final perfect mobile experience...');
    
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
    
    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Capture hero
    console.log('📸 Hero section...');
    await page.screenshot({ 
        path: 'final-perfect-hero.png',
        fullPage: false
    });
    
    // Scroll to product
    await page.evaluate(() => {
        document.querySelector('.product-display')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Product section...');
    await page.screenshot({ 
        path: 'final-perfect-product.png',
        fullPage: false
    });
    
    // Scroll to size
    await page.evaluate(() => {
        document.querySelector('.size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Size selector...');
    await page.screenshot({ 
        path: 'final-perfect-sizes.png',
        fullPage: false
    });
    
    // Scroll to process
    await page.evaluate(() => {
        document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('📸 Process section...');
    await page.screenshot({ 
        path: 'final-perfect-process.png',
        fullPage: false
    });
    
    console.log('✅ Final perfect experience captured!');
    
    await browser.close();
}

captureFinalPerfect();