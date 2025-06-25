const puppeteer = require('puppeteer');

async function runLoop2CriticalTest() {
    console.log('🔥 LOOP 2 CRITICAL TEST - XL TIMER & CAROUSEL NAVIGATION');
    console.log('========================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
        // Enable console logs from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        console.log('🌐 Loading Loop 2 fixed page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // CRITICAL TEST 1: XL TIMER INITIALIZATION
        console.log('\n⏰ CRITICAL TEST 1: XL TIMER INITIALIZATION');
        console.log('==========================================');
        
        const xlTimerInitTest = await page.evaluate(() => {
            return {
                xlTimerManagerClass: typeof window.XLTimerManager,
                xlTimerInstance: !!window.xlTimer,
                xlTimerInstanceType: typeof window.xlTimer,
                xlButtonExists: !!document.querySelector('.size-option[data-size="XL"]'),
                xlButtonText: document.querySelector('.size-option[data-size="XL"]')?.textContent.trim(),
                xlButtonClasses: document.querySelector('.size-option[data-size="XL"]') ? 
                    Array.from(document.querySelector('.size-option[data-size="XL"]').classList) : []
            };
        });
        
        console.log(`✅ XL Timer Manager Class: ${xlTimerInitTest.xlTimerManagerClass}`);
        console.log(`✅ XL Timer Instance: ${xlTimerInitTest.xlTimerInstance}`);
        console.log(`✅ XL Timer Type: ${xlTimerInitTest.xlTimerInstanceType}`);
        console.log(`✅ XL Button: ${xlTimerInitTest.xlButtonExists} - "${xlTimerInitTest.xlButtonText}"`);
        console.log(`✅ XL Button Classes: ${xlTimerInitTest.xlButtonClasses.join(', ')}`);
        
        // CRITICAL TEST 2: CAROUSEL NAVIGATION FUNCTIONS
        console.log('\n🎠 CRITICAL TEST 2: CAROUSEL NAVIGATION FUNCTIONS');
        console.log('=================================================');
        
        const carouselFunctionTest = await page.evaluate(() => {
            return {
                nextStorySlide: typeof window.nextStorySlide,
                prevStorySlide: typeof window.prevStorySlide,
                nextReviewSlide: typeof window.nextReviewSlide,
                prevReviewSlide: typeof window.prevReviewSlide,
                nextTrustpilotSlide: typeof window.nextTrustpilotSlide,
                prevTrustpilotSlide: typeof window.prevTrustpilotSlide,
                storyCarousel: !!window.storyCarousel,
                tiktokCarousel: !!window.tiktokCarousel,
                trustpilotCarousel: !!window.trustpilotCarousel
            };
        });
        
        console.log('✅ Navigation Functions:');
        Object.entries(carouselFunctionTest).forEach(([name, value]) => {
            if (name.includes('Slide')) {
                console.log(`   ${name}: ${value}`);
            }
        });
        
        console.log('✅ Carousel Objects:');
        ['storyCarousel', 'tiktokCarousel', 'trustpilotCarousel'].forEach(name => {
            console.log(`   ${name}: ${carouselFunctionTest[name] ? 'EXISTS' : 'MISSING'}`);
        });
        
        // WAIT FOR XL TIMER (16 seconds total)
        console.log('\n⏱️  WAITING 16 SECONDS FOR XL TIMER...');
        console.log('=====================================');
        
        await new Promise(resolve => setTimeout(resolve, 16000));
        
        // CHECK XL TIMER RESULTS
        const xlTimerResultTest = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.querySelector('.xl-simple-popup');
            
            return {
                xlButtonText: xlButton ? xlButton.textContent.trim() : 'not found',
                xlButtonClasses: xlButton ? Array.from(xlButton.classList) : [],
                xlButtonDisabled: xlButton ? xlButton.disabled : null,
                popupExists: !!popup,
                popupVisible: popup ? (popup.style.display !== 'none' && 
                                     getComputedStyle(popup).display !== 'none') : false,
                popupText: popup ? popup.textContent.trim().substring(0, 50) + '...' : 'no popup'
            };
        });
        
        console.log(`🔥 XL Button Text: "${xlTimerResultTest.xlButtonText}"`);
        console.log(`🔥 XL Button Classes: ${xlTimerResultTest.xlButtonClasses.join(', ')}`);
        console.log(`🔥 XL Button Disabled: ${xlTimerResultTest.xlButtonDisabled}`);
        console.log(`🔥 Popup Exists: ${xlTimerResultTest.popupExists}`);
        console.log(`🔥 Popup Visible: ${xlTimerResultTest.popupVisible}`);
        console.log(`🔥 Popup Content: ${xlTimerResultTest.popupText}`);
        
        const xlTimerWorking = xlTimerResultTest.xlButtonText.includes('Sold Out') || 
                              xlTimerResultTest.popupExists;
        
        console.log(`🎯 XL TIMER STATUS: ${xlTimerWorking ? '✅ WORKING' : '❌ FAILED'}`);
        
        // TEST CAROUSEL NAVIGATION
        console.log('\n🔄 TESTING CAROUSEL NAVIGATION');
        console.log('==============================');
        
        // Scroll to story carousel
        await page.evaluate(() => {
            const carousel = document.querySelector('.story-carousel');
            if (carousel) {
                carousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get initial state
        const initialCarouselState = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                initialTransform: storySlides ? getComputedStyle(storySlides).transform : 'none'
            };
        });
        
        console.log(`📍 Initial Transform: ${initialCarouselState.initialTransform}`);
        
        // Try clicking the right arrow
        console.log('🖱️  Clicking story carousel right arrow...');
        await page.click('.story-carousel .carousel-nav-right');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check after click
        const afterClickState = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                afterClickTransform: storySlides ? getComputedStyle(storySlides).transform : 'none'
            };
        });
        
        console.log(`📍 After Click Transform: ${afterClickState.afterClickTransform}`);
        
        const carouselWorking = afterClickState.afterClickTransform !== initialCarouselState.initialTransform;
        console.log(`🎯 CAROUSEL NAVIGATION: ${carouselWorking ? '✅ WORKING' : '❌ FAILED'}`);
        
        // OVERALL LOOP 2 RESULTS
        console.log('\n🏆 LOOP 2 RESULTS SUMMARY');
        console.log('=========================');
        
        const loop2Results = {
            xlTimer: xlTimerWorking,
            carouselNavigation: carouselWorking
        };
        
        Object.entries(loop2Results).forEach(([feature, working]) => {
            console.log(`${working ? '✅' : '❌'} ${feature}: ${working ? 'FIXED' : 'STILL BROKEN'}`);
        });
        
        const loop2Success = Object.values(loop2Results).every(Boolean);
        
        if (loop2Success) {
            console.log('\n🎉 LOOP 2 SUCCESS - ALL CRITICAL FEATURES FIXED!');
            console.log('🚀 READY FOR FULL 6-FEATURE VALIDATION TEST');
        } else {
            console.log('\n⚠️  LOOP 2 INCOMPLETE - NEED LOOP 3 FOR REMAINING ISSUES');
        }
        
        // Take screenshot
        await page.screenshot({ 
            path: 'loop2-critical-test-results.png',
            fullPage: true
        });
        
        console.log('\n📸 Screenshot saved: loop2-critical-test-results.png');
        console.log('🏁 Loop 2 critical test complete!');
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
    } catch (error) {
        console.error('❌ Error during Loop 2 test:', error);
    } finally {
        await browser.close();
        console.log('🔚 Browser closed');
    }
}

runLoop2CriticalTest();