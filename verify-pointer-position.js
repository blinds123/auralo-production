const puppeteer = require('puppeteer');

async function verifyPointerPosition() {
    console.log('🔍 VERIFYING ACTUAL POINTER POSITION');
    console.log('====================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Scroll to checkout section
        await page.evaluate(() => {
            const checkoutSection = document.querySelector('.process-steps');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check the actual computed style of the pointer
        const pointerInfo = await page.evaluate(() => {
            const pointer = document.querySelector('.arrow-exchange-bottom');
            if (!pointer) return { error: 'Pointer not found' };
            
            const beforeStyle = getComputedStyle(pointer, '::before');
            return {
                pointerExists: !!pointer,
                transform: beforeStyle.transform,
                fontSize: beforeStyle.fontSize,
                content: beforeStyle.content,
                pointerRect: pointer.getBoundingClientRect(),
                stepImageRect: document.querySelector('.step-image').getBoundingClientRect()
            };
        });
        
        console.log('📍 CURRENT POINTER STATUS:');
        console.log('==========================');
        console.log(`Pointer exists: ${pointerInfo.pointerExists}`);
        console.log(`Transform: ${pointerInfo.transform}`);
        console.log(`Font size: ${pointerInfo.fontSize}`);
        console.log(`Content: ${pointerInfo.content}`);
        
        if (pointerInfo.pointerRect) {
            console.log(`Pointer position: x=${Math.round(pointerInfo.pointerRect.x)}, y=${Math.round(pointerInfo.pointerRect.y)}`);
        }
        
        if (pointerInfo.stepImageRect) {
            console.log(`Step image position: x=${Math.round(pointerInfo.stepImageRect.x)}, y=${Math.round(pointerInfo.stepImageRect.y)}`);
            console.log(`Step image size: ${Math.round(pointerInfo.stepImageRect.width)}x${Math.round(pointerInfo.stepImageRect.height)}`);
        }
        
        // Take a focused screenshot of just the checkout area
        const checkoutElement = await page.$('.process-steps');
        if (checkoutElement) {
            await checkoutElement.screenshot({ 
                path: 'current-pointer-verification.png',
                padding: 20
            });
            console.log('📸 Screenshot saved: current-pointer-verification.png');
        }
        
        // Force a fresh page reload to make sure styles are applied
        console.log('\n🔄 FORCING PAGE RELOAD TO ENSURE FRESH STYLES...');
        await page.reload({ waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Scroll to checkout again
        await page.evaluate(() => {
            const checkoutSection = document.querySelector('.process-steps');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take another screenshot after reload
        const checkoutElementReloaded = await page.$('.process-steps');
        if (checkoutElementReloaded) {
            await checkoutElementReloaded.screenshot({ 
                path: 'post-reload-pointer-verification.png',
                padding: 20
            });
            console.log('📸 Post-reload screenshot: post-reload-pointer-verification.png');
        }
        
        console.log('\n✅ Verification complete! Check the screenshots to see actual pointer position.');
        console.log('🔍 Browser staying open for 30 seconds for manual inspection...');
        
        await new Promise(resolve => setTimeout(resolve, 30000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

verifyPointerPosition();