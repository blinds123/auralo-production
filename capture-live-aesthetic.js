const puppeteer = require('puppeteer');

async function captureLiveAesthetic() {
    console.log('📸 Capturing live Iman Gadzhi aesthetic...');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Desktop view
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for animations and social proof ticker
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Capture hero with social proof
    await page.screenshot({ 
        path: 'iman-live-hero.png',
        fullPage: false
    });
    
    // Scroll to process section
    await page.evaluate(() => {
        document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ 
        path: 'iman-live-process.png',
        fullPage: false
    });
    
    // Mobile view
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({ 
        path: 'iman-live-mobile.png',
        fullPage: false
    });
    
    console.log('✅ Live aesthetic captured!');
    
    await browser.close();
}

captureLiveAesthetic();