const puppeteer = require('puppeteer');

async function captureFashionAesthetic() {
    console.log('📸 Capturing Gen Z fashion aesthetic...');
    
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
    
    // Wait for page to settle
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Capture different sections
    console.log('📸 Capturing hero section...');
    await page.screenshot({ 
        path: 'fashion-mobile-hero.png',
        fullPage: false
    });
    
    // Scroll to product
    await page.evaluate(() => {
        document.querySelector('.product-display')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📸 Capturing product section...');
    await page.screenshot({ 
        path: 'fashion-mobile-product.png',
        fullPage: false
    });
    
    // Scroll to size selector
    await page.evaluate(() => {
        document.querySelector('.size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📸 Capturing size selector...');
    await page.screenshot({ 
        path: 'fashion-mobile-sizes.png',
        fullPage: false
    });
    
    // Capture full page
    console.log('📸 Capturing full page...');
    await page.screenshot({ 
        path: 'fashion-mobile-full.png',
        fullPage: true
    });
    
    console.log('✅ Fashion aesthetic captured!');
    console.log('\n💕 Key improvements:');
    console.log('   • Clean, breathable layout');
    console.log('   • Perfect typography sizing');
    console.log('   • Soft, feminine colors');
    console.log('   • Instagram-worthy design');
    console.log('   • Easy to read and scan');
    console.log('   • Premium fashion feel');
    
    await browser.close();
}

captureFashionAesthetic();