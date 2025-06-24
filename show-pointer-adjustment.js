const puppeteer = require('puppeteer');

async function showPointerAdjustment() {
    console.log('📸 SHOWING UPDATED POINTER FINGER POSITION');
    console.log('==========================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    const page = await browser.newPage();
    
    try {
        console.log('🔍 Loading page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        console.log('⏰ Waiting for page to fully load...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Scroll to the checkout section
        console.log('🔄 Scrolling to checkout section...');
        await page.evaluate(() => {
            const checkoutSection = document.querySelector('.process-steps');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take screenshot of the checkout section
        console.log('📸 Taking screenshot of updated pointer position...');
        const checkoutElement = await page.$('.process-steps');
        if (checkoutElement) {
            await checkoutElement.screenshot({ 
                path: 'updated-pointer-position.png',
                padding: 50
            });
            console.log('✅ Screenshot saved: updated-pointer-position.png');
        }
        
        // Also take a full page screenshot
        await page.screenshot({ 
            path: 'full-page-with-updated-pointer.png', 
            fullPage: true 
        });
        console.log('✅ Full page screenshot saved: full-page-with-updated-pointer.png');
        
        console.log('\n🎯 POINTER ADJUSTMENT COMPLETE!');
        console.log('The pointer finger now points lower at the blue Exchange button');
        console.log('Desktop: translateY(25px) → translateY(35px) (+10px lower)');
        console.log('Mobile: translateY(20px) → translateY(28px) (+8px lower)');
        
        console.log('\n🔍 Browser staying open for 10 seconds for inspection...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

showPointerAdjustment();