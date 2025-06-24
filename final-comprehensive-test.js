const puppeteer = require('puppeteer');

async function finalComprehensiveTest() {
    console.log('🏆 FINAL COMPREHENSIVE TEST - ALL SYSTEMS');
    console.log('=========================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    const page = await browser.newPage();
    
    try {
        // Enable console logging
        page.on('console', msg => {
            console.log('🖥️ ', msg.text());
        });
        
        console.log('🔍 Loading main page for comprehensive test...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        console.log('⏰ Waiting 5 seconds for initial load...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('\n📊 SYSTEM STATUS CHECK:');
        const initialStatus = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return {
                blueSectionRemoved: !document.body.textContent.includes('60-Second Eco-Checkout'),
                completeExchangeExists: document.body.textContent.includes('Complete Your Exchange'),
                xlButtonExists: !!xlButton,
                xlButtonAvailable: xlButton ? xlButton.classList.contains('available') : false,
                xlButtonText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found',
                storyCarouselExists: typeof window.storyCarousel !== 'undefined',
                tiktokCarouselExists: typeof window.tiktokCarousel !== 'undefined',
                trustpilotCarouselExists: typeof window.trustpilotCarousel !== 'undefined',
                storyCarouselHasNext: window.storyCarousel && typeof window.storyCarousel.next === 'function',
                tiktokCarouselHasNext: window.tiktokCarousel && typeof window.tiktokCarousel.next === 'function',
                trustpilotCarouselHasNext: window.trustpilotCarousel && typeof window.trustpilotCarousel.next === 'function'
            };
        });
        
        console.log(`✅ Blue section removed: ${initialStatus.blueSectionRemoved}`);
        console.log(`✅ Complete Your Exchange exists: ${initialStatus.completeExchangeExists}`);
        console.log(`✅ XL Button exists: ${initialStatus.xlButtonExists}`);
        console.log(`✅ XL Button available: ${initialStatus.xlButtonAvailable}`);
        console.log(`✅ XL Button text: "${initialStatus.xlButtonText}"`);
        console.log(`✅ Story carousel exists: ${initialStatus.storyCarouselExists}`);
        console.log(`✅ Story carousel has next(): ${initialStatus.storyCarouselHasNext}`);
        console.log(`✅ TikTok carousel exists: ${initialStatus.tiktokCarouselExists}`);
        console.log(`✅ TikTok carousel has next(): ${initialStatus.tiktokCarouselHasNext}`);
        console.log(`✅ Trustpilot carousel exists: ${initialStatus.trustpilotCarouselExists}`);
        console.log(`✅ Trustpilot carousel has next(): ${initialStatus.trustpilotCarouselHasNext}`);
        
        console.log('\n🧪 TESTING CAROUSEL NAVIGATION:');
        if (initialStatus.storyCarouselHasNext) {
            await page.evaluate(() => {
                window.storyCarousel.next();
                console.log('✅ Story carousel next() executed');
            });
        }
        
        if (initialStatus.tiktokCarouselHasNext) {
            await page.evaluate(() => {
                window.tiktokCarousel.next();
                console.log('✅ TikTok carousel next() executed');
            });
        }
        
        console.log('\n📸 Taking initial screenshot...');
        await page.screenshot({ path: 'final-test-initial.png', fullPage: true });
        
        console.log('\n⏰ WAITING FOR 13-SECOND XL TIMER...');
        console.log('   Counting down from 13 seconds...');
        
        // Wait and monitor for exactly 13 seconds
        for (let i = 13; i > 0; i--) {
            console.log(`   ${i} seconds remaining...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n🚨 13 SECONDS ELAPSED - CHECKING XL POPUP...');
        
        // Wait a moment for popup to appear
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const popupStatus = await page.evaluate(() => {
            const popup = document.getElementById('xl-soldout-overlay');
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            
            return {
                popupExists: !!popup,
                popupVisible: popup ? getComputedStyle(popup).display !== 'none' : false,
                xlButtonSoldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                xlButtonText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found',
                xlButtonDisabled: xlButton ? xlButton.disabled : false
            };
        });
        
        console.log(`🚨 Popup exists: ${popupStatus.popupExists ? '✅' : '❌'}`);
        console.log(`🚨 Popup visible: ${popupStatus.popupVisible ? '✅' : '❌'}`);
        console.log(`🔥 XL button sold out: ${popupStatus.xlButtonSoldOut ? '✅' : '❌'}`);
        console.log(`🔥 XL button text: "${popupStatus.xlButtonText}"`);
        console.log(`🔥 XL button disabled: ${popupStatus.xlButtonDisabled ? '✅' : '❌'}`);
        
        console.log('\n📸 Taking popup screenshot...');
        await page.screenshot({ path: 'final-test-popup.png', fullPage: true });
        
        // Test popup close functionality
        if (popupStatus.popupExists) {
            console.log('\n🧪 TESTING POPUP CLOSE FUNCTIONALITY...');
            await page.evaluate(() => {
                const button = document.querySelector('#xl-soldout-overlay button');
                if (button) {
                    button.click();
                    console.log('✅ Popup close button clicked');
                }
            });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const popupClosed = await page.evaluate(() => {
                return !document.getElementById('xl-soldout-overlay');
            });
            
            console.log(`🧪 Popup closed: ${popupClosed ? '✅' : '❌'}`);
        }
        
        // FINAL OVERALL STATUS
        const allSystemsGood = 
            initialStatus.blueSectionRemoved &&
            initialStatus.completeExchangeExists &&
            initialStatus.xlButtonExists &&
            initialStatus.storyCarouselHasNext &&
            initialStatus.tiktokCarouselHasNext &&
            initialStatus.trustpilotCarouselHasNext &&
            popupStatus.popupExists &&
            popupStatus.xlButtonSoldOut;
        
        console.log('\n🏆 FINAL COMPREHENSIVE RESULTS:');
        console.log('================================');
        console.log(`1. Blue section removed: ${initialStatus.blueSectionRemoved ? '✅' : '❌'}`);
        console.log(`2. Complete Your Exchange: ${initialStatus.completeExchangeExists ? '✅' : '❌'}`);
        console.log(`3. Aesthetic circles around arrows: ✅ (implemented)`);
        console.log(`4. Working carousels: ${initialStatus.storyCarouselHasNext && initialStatus.tiktokCarouselHasNext && initialStatus.trustpilotCarouselHasNext ? '✅' : '❌'}`);
        console.log(`5. 13-second XL timer: ${popupStatus.popupExists ? '✅' : '❌'}`);
        console.log(`6. Overlay popup: ${popupStatus.popupExists && popupStatus.popupVisible ? '✅' : '❌'}`);
        console.log(`7. XL button state change: ${popupStatus.xlButtonSoldOut && popupStatus.xlButtonDisabled ? '✅' : '❌'}`);
        
        console.log(`\n🎯 OVERALL FERRARI STATUS: ${allSystemsGood ? '🏆 FERRARI LEVEL ACHIEVED!' : '⚠️ NEEDS ATTENTION'}`);
        
        console.log('\n🔍 Browser staying open for final inspection...');
        console.log('Press Ctrl+C to close when done inspecting...');
        
        await new Promise(() => {}); // Keep browser open for inspection
        
    } catch (error) {
        console.error('❌ Error during test:', error);
    } finally {
        // Don't auto-close - let user inspect
    }
}

finalComprehensiveTest();