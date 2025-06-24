const puppeteer = require('puppeteer');

async function captureImanAesthetic() {
    console.log('📸 Capturing Iman Gadzhi aesthetic...');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Capture hero section
    await page.screenshot({ 
        path: 'iman-gadzhi-aesthetic-hero.png',
        fullPage: false
    });
    
    // Capture full page
    await page.screenshot({ 
        path: 'iman-gadzhi-aesthetic-full.png',
        fullPage: true
    });
    
    console.log('✅ Iman Gadzhi aesthetic captured!');
    console.log('   • Dark luxury base');
    console.log('   • Gen Z girl accents');
    console.log('   • Y2K gradients');
    console.log('   • Social proof ticker');
    
    await browser.close();
}

captureImanAesthetic();