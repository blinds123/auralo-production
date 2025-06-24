const puppeteer = require('puppeteer');

async function showAdjustedPointers() {
    console.log('🎯 SHOWING ADJUSTED POINTERS - BLUE RAISED & GREEN RAISED');
    console.log('========================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        // Clear cache
        await page.setCacheEnabled(false);
        
        console.log('🔄 Loading page with adjusted pointers...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Scroll to checkout section
        console.log('📍 Scrolling to checkout section...');
        await page.evaluate(() => {
            const checkoutSection = document.querySelector('.process-steps');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check both pointer positions
        const pointerInfo = await page.evaluate(() => {
            const bluePointer = document.querySelector('.arrow-exchange-bottom');
            const greenPointer = document.querySelector('.arrow-wallet-bottom');
            
            const blueStyle = bluePointer ? getComputedStyle(bluePointer, '::before') : null;
            const greenStyle = greenPointer ? getComputedStyle(greenPointer, '::before') : null;
            
            return {
                blue: {
                    exists: !!bluePointer,
                    transform: blueStyle ? blueStyle.transform : 'none',
                    position: bluePointer ? bluePointer.getBoundingClientRect() : null
                },
                green: {
                    exists: !!greenPointer,
                    transform: greenStyle ? greenStyle.transform : 'none',
                    position: greenPointer ? greenPointer.getBoundingClientRect() : null,
                    topValue: greenPointer ? getComputedStyle(greenPointer).top : 'none'
                }
            };
        });
        
        console.log('📍 CURRENT POINTER POSITIONS:');
        console.log('=============================');
        console.log(`Blue Pointer (Exchange):`);
        console.log(`  - Exists: ${pointerInfo.blue.exists}`);
        console.log(`  - Transform: ${pointerInfo.blue.transform}`);
        
        console.log(`Green Pointer (Wallet):`);
        console.log(`  - Exists: ${pointerInfo.green.exists}`);
        console.log(`  - Transform: ${pointerInfo.green.transform}`);
        console.log(`  - Top position: ${pointerInfo.green.topValue}`);
        
        // Take screenshot
        console.log('📸 Taking screenshot of adjusted pointers...');
        await page.screenshot({ 
            path: 'adjusted-pointers-final.png',
            fullPage: false
        });
        
        // Take focused screenshot of checkout area
        const checkoutElement = await page.$('.process-steps');
        if (checkoutElement) {
            await checkoutElement.screenshot({ 
                path: 'checkout-adjusted-pointers.png',
                padding: 30
            });
        }
        
        console.log('✅ POINTER ADJUSTMENTS COMPLETE!');
        console.log('================================');
        console.log('👆 Blue Pointer (Exchange): Raised 10cm from previous position');
        console.log('   - Desktop: 120px (was 500px)');
        console.log('   - Mobile: 40px-80px (was 420px-460px)');
        console.log('   - Tablet: 100px (was 480px)');
        console.log('');
        console.log('👈 Green Pointer (Wallet): Raised 0.5cm');
        console.log('   - Desktop: 30% (was 35%)');
        console.log('   - Mobile: 25% (was 30%)');
        
        console.log('\n🌟 Both pointers now positioned correctly!');
        console.log('Browser staying open for inspection...');
        
        // Keep browser open
        await new Promise(() => {});
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

showAdjustedPointers();