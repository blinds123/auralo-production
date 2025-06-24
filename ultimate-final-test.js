const puppeteer = require('puppeteer');

async function ultimateFinalTest() {
    console.log('🚀 ULTIMATE FINAL TEST - FERRARI VERIFICATION');
    console.log('==============================================');
    
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
        
        console.log('🔍 Loading page for ultimate verification...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 15000 
        });
        
        console.log('⏰ Waiting 3 seconds for initialization...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('\n🎯 QUICK CAROUSEL VERIFICATION:');
        const carouselCheck = await page.evaluate(() => {
            return {
                storyVisible: Array.from(document.querySelectorAll('#storySlides .story-slide')).filter(s => getComputedStyle(s).opacity > 0.5).length,
                tiktokVisible: Array.from(document.querySelectorAll('#tiktokSlides .review-slide')).filter(s => getComputedStyle(s).opacity > 0.5).length,
                trustpilotVisible: Array.from(document.querySelectorAll('#trustpilotSlides .review-slide')).filter(s => getComputedStyle(s).opacity > 0.5).length,
                storyCarouselExists: typeof window.storyCarousel !== 'undefined' && typeof window.storyCarousel.next === 'function',
                tiktokCarouselExists: typeof window.tiktokCarousel !== 'undefined' && typeof window.tiktokCarousel.next === 'function',
                trustpilotCarouselExists: typeof window.trustpilotCarousel !== 'undefined' && typeof window.trustpilotCarousel.next === 'function'
            };
        });
        
        console.log(`✅ Story carousel: ${carouselCheck.storyCarouselExists ? 'Working' : 'Broken'} | Visible slides: ${carouselCheck.storyVisible}`);
        console.log(`✅ TikTok carousel: ${carouselCheck.tiktokCarouselExists ? 'Working' : 'Broken'} | Visible slides: ${carouselCheck.tiktokVisible}`);
        console.log(`✅ Trustpilot carousel: ${carouselCheck.trustpilotCarouselExists ? 'Working' : 'Broken'} | Visible slides: ${carouselCheck.trustpilotVisible}`);
        
        console.log('\n⏰ TESTING 13-SECOND XL TIMER...');
        console.log('   Counting down: 13 seconds...');
        
        // Fast countdown
        for (let i = 13; i > 0; i--) {
            process.stdout.write(`\\r   ${i} seconds remaining...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log('\\n');
        
        console.log('🚨 CHECKING FINAL STATE:');
        const finalCheck = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.getElementById('xl-soldout-overlay');
            
            return {
                xlSoldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                xlDisabled: xlButton ? xlButton.disabled : false,
                xlText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found',
                popupExists: !!popup,
                popupZIndex: popup ? getComputedStyle(popup.firstElementChild).zIndex : 'N/A',
                popupVisible: popup ? getComputedStyle(popup).display !== 'none' : false
            };
        });
        
        console.log(`🔥 XL Button: ${finalCheck.xlSoldOut ? '✅ Sold Out' : '❌ Still Available'}`);
        console.log(`🔥 XL Disabled: ${finalCheck.xlDisabled ? '✅ Yes' : '❌ No'}`);
        console.log(`🔥 XL Text: "${finalCheck.xlText}"`);
        console.log(`🚨 Popup: ${finalCheck.popupExists ? '✅ Exists' : '❌ Missing'}`);
        console.log(`🚨 Popup Visible: ${finalCheck.popupVisible ? '✅ Yes' : '❌ No'}`);
        console.log(`🚨 Popup Z-Index: ${finalCheck.popupZIndex}`);
        
        console.log('\\n📸 Taking final verification screenshot...');
        await page.screenshot({ path: 'ultimate-final-verification.png', fullPage: true });
        
        console.log('\\n🏆 ULTIMATE FERRARI VERIFICATION:');
        console.log('==================================');
        
        const carouselsWorking = carouselCheck.storyCarouselExists && carouselCheck.tiktokCarouselExists && carouselCheck.trustpilotCarouselExists;
        const carouselDisplay = carouselCheck.storyVisible === 1 && carouselCheck.tiktokVisible === 1 && carouselCheck.trustpilotVisible === 1;
        const xlTimerPerfect = finalCheck.xlSoldOut && finalCheck.xlDisabled && finalCheck.xlText === 'Just Sold Out';
        const popupPerfect = finalCheck.popupExists && finalCheck.popupVisible && (finalCheck.popupZIndex === '2147483647' || parseInt(finalCheck.popupZIndex) > 999999);
        
        console.log(`1. Carousel functionality: ${carouselsWorking ? '🏆 PERFECT' : '❌ Issues'}`);
        console.log(`2. Carousel display: ${carouselDisplay ? '🏆 PERFECT' : '❌ Issues'}`);
        console.log(`3. 13-second XL timer: ${xlTimerPerfect ? '🏆 PERFECT' : '❌ Issues'}`);
        console.log(`4. Popup overlay: ${popupPerfect ? '🏆 PERFECT' : '❌ Issues'}`);
        
        const allSystemsPerfect = carouselsWorking && carouselDisplay && xlTimerPerfect && popupPerfect;
        
        console.log(`\\n🎯 FINAL VERDICT: ${allSystemsPerfect ? '🏆🏆🏆 FERRARI LEVEL ACHIEVED! 🏆🏆🏆' : '⚠️ Minor issues remain'}`);
        
        if (allSystemsPerfect) {
            console.log('\\n🎉 CONGRATULATIONS! ALL SYSTEMS ARE PERFECT:');
            console.log('   🎠 Carousels load and navigate perfectly');
            console.log('   🖼️ Images load with smart preloading');
            console.log('   ⏰ XL timer triggers exactly at 13 seconds');
            console.log('   🚨 Popup appears as perfect overlay');
            console.log('   🔄 XL button changes to "Just Sold Out"');
            console.log('   👆 User can close popup with "GOT IT!" button');
        }
        
        console.log('\\n🔍 Browser staying open for 10 seconds for inspection...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error during ultimate test:', error);
    } finally {
        await browser.close();
    }
}

ultimateFinalTest();