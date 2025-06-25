const puppeteer = require('puppeteer');

async function runLoop1ComprehensiveTest() {
    console.log('🔬 LOOP 1 COMPREHENSIVE TEST - ALL 6 FEATURES POST-FIX');
    console.log('=======================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
        // Enable console logs from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        console.log('🌐 Loading fixed Auralo page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        // TEST 1: XL TIMER FUNCTIONALITY (CRITICAL FIX)
        console.log('\n🔥 TEST 1: XL SOLD OUT TIMER (13 seconds) - POST FIX');
        console.log('===================================================');
        
        const xlTimerTest = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return {
                xlButtonExists: !!xlButton,
                xlButtonText: xlButton ? xlButton.textContent.trim() : 'not found',
                xlButtonClasses: xlButton ? Array.from(xlButton.classList) : [],
                xlButtonDisabled: xlButton ? xlButton.disabled : null,
                xlTimerManagerExists: !!window.xlTimer,
                createWorkingCarouselExists: !!window.createWorkingCarousel
            };
        });
        
        console.log(`✅ XL Button: ${xlTimerTest.xlButtonExists} - "${xlTimerTest.xlButtonText}"`);
        console.log(`✅ XL Button Classes: ${xlTimerTest.xlButtonClasses.join(', ')}`);
        console.log(`✅ XL Button Disabled: ${xlTimerTest.xlButtonDisabled}`);
        console.log(`✅ XL Timer Manager: ${xlTimerTest.xlTimerManagerExists}`);
        
        // Wait for 15 seconds to test XL timer
        console.log('⏱️  Waiting 15 seconds for XL timer to trigger...');
        await new Promise(resolve => setTimeout(resolve, 15000));
        
        const postTimerTest = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.querySelector('.xl-simple-popup');
            return {
                xlButtonText: xlButton ? xlButton.textContent.trim() : 'not found',
                xlButtonClasses: xlButton ? Array.from(xlButton.classList) : [],
                xlButtonDisabled: xlButton ? xlButton.disabled : null,
                popupExists: !!popup,
                popupVisible: popup ? popup.style.display !== 'none' : false,
                popupContent: popup ? popup.textContent.trim() : 'no popup'
            };
        });
        
        console.log(`🔥 POST-TIMER XL Status: "${postTimerTest.xlButtonText}"`);
        console.log(`🔥 POST-TIMER XL Classes: ${postTimerTest.xlButtonClasses.join(', ')}`);
        console.log(`🔥 POST-TIMER XL Disabled: ${postTimerTest.xlButtonDisabled}`);
        console.log(`🔥 Popup Exists: ${postTimerTest.popupExists}`);
        console.log(`🔥 Popup Visible: ${postTimerTest.popupVisible}`);
        
        const xlTimerWorking = postTimerTest.xlButtonText.includes('Sold Out') && postTimerTest.popupExists;
        console.log(`🎯 XL TIMER WORKING: ${xlTimerWorking ? '✅ YES' : '❌ NO'}`);
        
        // TEST 2: CAROUSEL NAVIGATION (CRITICAL FIX)
        console.log('\n🎠 TEST 2: CAROUSEL MANUAL NAVIGATION - POST FIX');
        console.log('=================================================');
        
        // Scroll to story carousel
        await page.evaluate(() => {
            const carousel = document.querySelector('.story-carousel');
            if (carousel) {
                carousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const carouselNavigationTest = await page.evaluate(() => {
            // Test story carousel
            const storyLeftBtn = document.querySelector('.story-carousel .carousel-nav-left');
            const storyRightBtn = document.querySelector('.story-carousel .carousel-nav-right');
            const storySlides = document.querySelector('.story-slides');
            
            // Test carousel functions
            const functions = {
                nextStorySlide: typeof window.nextStorySlide,
                prevStorySlide: typeof window.prevStorySlide,
                nextReviewSlide: typeof window.nextReviewSlide,
                prevReviewSlide: typeof window.prevReviewSlide,
                nextTrustpilotSlide: typeof window.nextTrustpilotSlide,
                prevTrustpilotSlide: typeof window.prevTrustpilotSlide
            };
            
            // Test carousel objects
            const carousels = {
                storyCarousel: !!window.storyCarousel,
                tiktokCarousel: !!window.tiktokCarousel,
                trustpilotCarousel: !!window.trustpilotCarousel
            };
            
            return {
                storyButtonsExist: !!storyLeftBtn && !!storyRightBtn,
                storySlidesExist: !!storySlides,
                initialTransform: storySlides ? getComputedStyle(storySlides).transform : 'none',
                functions: functions,
                carousels: carousels
            };
        });
        
        console.log(`✅ Story Carousel Buttons: ${carouselNavigationTest.storyButtonsExist}`);
        console.log(`✅ Story Slides Container: ${carouselNavigationTest.storySlidesExist}`);
        console.log(`✅ Initial Transform: ${carouselNavigationTest.initialTransform}`);
        console.log('✅ Navigation Functions:');
        Object.entries(carouselNavigationTest.functions).forEach(([name, type]) => {
            console.log(`   ${name}: ${type}`);
        });
        console.log('✅ Carousel Objects:');
        Object.entries(carouselNavigationTest.carousels).forEach(([name, exists]) => {
            console.log(`   ${name}: ${exists ? 'EXISTS' : 'MISSING'}`);
        });
        
        // Test clicking the right arrow
        console.log('🔄 Testing story carousel right arrow click...');
        await page.click('.story-carousel .carousel-nav-right');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const afterClickTest = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                afterClickTransform: storySlides ? getComputedStyle(storySlides).transform : 'none'
            };
        });
        
        console.log(`✅ After Right Click: ${afterClickTest.afterClickTransform}`);
        const carouselWorking = afterClickTest.afterClickTransform !== carouselNavigationTest.initialTransform;
        console.log(`🎯 CAROUSEL WORKING: ${carouselWorking ? '✅ YES' : '❌ NO'}`);
        
        // TEST 3: BLUE POINTERS - VALIDATE STILL WORKING
        console.log('\n💙 TEST 3: BLUE POINTERS VALIDATION');
        console.log('==================================');
        
        await page.evaluate(() => {
            const section = document.querySelector('.lifestyle-grid');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const bluePointersValidation = await page.evaluate(() => {
            const hotspots = document.querySelectorAll('.hotspot');
            const pulses = document.querySelectorAll('.hotspot-pulse');
            
            return {
                hotspotCount: hotspots.length,
                pulseCount: pulses.length,
                firstHotspotTip: hotspots[0] ? hotspots[0].getAttribute('data-tip') : 'none',
                allHotspotTips: Array.from(hotspots).map(h => h.getAttribute('data-tip'))
            };
        });
        
        console.log(`✅ Blue Hotspots: ${bluePointersValidation.hotspotCount} found`);
        console.log(`✅ Pulse Animations: ${bluePointersValidation.pulseCount} found`);
        console.log(`✅ First Hotspot: "${bluePointersValidation.firstHotspotTip}"`);
        const bluePointersWorking = bluePointersValidation.hotspotCount === 8;
        console.log(`🎯 BLUE POINTERS WORKING: ${bluePointersWorking ? '✅ YES' : '❌ NO'}`);
        
        // TEST 4: FINGER GUIDANCE - VALIDATE POSITIONS
        console.log('\n👆 TEST 4: FINGER GUIDANCE VALIDATION');
        console.log('====================================');
        
        await page.evaluate(() => {
            const section = document.querySelector('.process-steps');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const fingerGuidanceValidation = await page.evaluate(() => {
            const exchangePointer = document.querySelector('.arrow-exchange-bottom');
            const walletPointer = document.querySelector('.arrow-wallet-bottom');
            
            return {
                exchangeExists: !!exchangePointer,
                walletExists: !!walletPointer,
                exchangeStyle: exchangePointer ? {
                    bottom: getComputedStyle(exchangePointer).bottom,
                    left: getComputedStyle(exchangePointer).left,
                    transform: getComputedStyle(exchangePointer).transform
                } : null,
                walletStyle: walletPointer ? {
                    top: getComputedStyle(walletPointer).top,
                    right: getComputedStyle(walletPointer).right
                } : null
            };
        });
        
        console.log(`✅ Exchange Pointer: ${fingerGuidanceValidation.exchangeExists}`);
        console.log(`✅ Wallet Pointer: ${fingerGuidanceValidation.walletExists}`);
        if (fingerGuidanceValidation.exchangeStyle) {
            console.log(`✅ Exchange Position: ${JSON.stringify(fingerGuidanceValidation.exchangeStyle)}`);
        }
        if (fingerGuidanceValidation.walletStyle) {
            console.log(`✅ Wallet Position: ${JSON.stringify(fingerGuidanceValidation.walletStyle)}`);
        }
        
        const fingerGuidanceWorking = fingerGuidanceValidation.exchangeExists && fingerGuidanceValidation.walletExists;
        console.log(`🎯 FINGER GUIDANCE WORKING: ${fingerGuidanceWorking ? '✅ YES' : '❌ NO'}`);
        
        // TEST 5 & 6: SIZE CHART AND STORE AVAILABILITY - QUICK VALIDATION
        console.log('\n📏 TEST 5: SIZE CHART TOGGLE VALIDATION');
        console.log('======================================');
        
        const sizeChartValidation = await page.evaluate(() => {
            const toggle = document.querySelector('.chart-toggle');
            const chart = document.getElementById('sizeChart');
            
            let results = {
                toggleExists: !!toggle,
                chartExists: !!chart,
                initialDisplay: chart ? getComputedStyle(chart).display : 'none'
            };
            
            if (toggle) {
                toggle.click();
                setTimeout(() => {
                    results.afterToggleDisplay = chart ? getComputedStyle(chart).display : 'none';
                }, 300);
            }
            
            return results;
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sizeChartFinal = await page.evaluate(() => {
            const chart = document.getElementById('sizeChart');
            return {
                finalDisplay: chart ? getComputedStyle(chart).display : 'none'
            };
        });
        
        console.log(`✅ Size Chart Toggle: ${sizeChartValidation.toggleExists}`);
        console.log(`✅ Chart Display: ${sizeChartValidation.initialDisplay} → ${sizeChartFinal.finalDisplay}`);
        const sizeChartWorking = sizeChartValidation.toggleExists && sizeChartFinal.finalDisplay !== 'none';
        console.log(`🎯 SIZE CHART WORKING: ${sizeChartWorking ? '✅ YES' : '❌ NO'}`);
        
        console.log('\n🏪 TEST 6: STORE AVAILABILITY VALIDATION');
        console.log('=======================================');
        
        const storeAvailabilityValidation = await page.evaluate(() => {
            const toggle = document.querySelector('.availability-header');
            const store = document.getElementById('storeAvailability');
            
            return {
                toggleExists: !!toggle,
                storeExists: !!store,
                hamiltonContent: store ? store.textContent.includes('Hamilton') : false,
                display: store ? getComputedStyle(store).display : 'none'
            };
        });
        
        console.log(`✅ Store Toggle: ${storeAvailabilityValidation.toggleExists}`);
        console.log(`✅ Hamilton Content: ${storeAvailabilityValidation.hamiltonContent}`);
        console.log(`✅ Store Display: ${storeAvailabilityValidation.display}`);
        const storeAvailabilityWorking = storeAvailabilityValidation.toggleExists && storeAvailabilityValidation.hamiltonContent;
        console.log(`🎯 STORE AVAILABILITY WORKING: ${storeAvailabilityWorking ? '✅ YES' : '❌ NO'}`);
        
        // FINAL SUMMARY
        console.log('\n🏆 LOOP 1 TEST RESULTS SUMMARY');
        console.log('==============================');
        
        const results = {
            xlTimer: xlTimerWorking,
            carouselNavigation: carouselWorking,
            bluePointers: bluePointersWorking,
            fingerGuidance: fingerGuidanceWorking,
            sizeChart: sizeChartWorking,
            storeAvailability: storeAvailabilityWorking
        };
        
        Object.entries(results).forEach(([feature, working]) => {
            console.log(`${working ? '✅' : '❌'} ${feature}: ${working ? 'WORKING' : 'NEEDS FIX'}`);
        });
        
        const totalWorking = Object.values(results).filter(Boolean).length;
        const totalFeatures = Object.keys(results).length;
        
        console.log(`\n🎯 OVERALL SCORE: ${totalWorking}/${totalFeatures} features working (${Math.round(totalWorking/totalFeatures*100)}%)`);
        
        if (totalWorking === totalFeatures) {
            console.log('🎉 ALL FEATURES WORKING - LOOP 1 SUCCESS!');
        } else {
            console.log('⚠️  SOME FEATURES NEED MORE WORK - LOOP 2 REQUIRED');
        }
        
        // Take documentation screenshots
        console.log('\n📸 Taking documentation screenshots...');
        await page.screenshot({ 
            path: 'loop1-test-results.png',
            fullPage: true
        });
        
        console.log('✅ Loop 1 comprehensive test complete!');
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
    } catch (error) {
        console.error('❌ Error during Loop 1 test:', error);
    } finally {
        await browser.close();
        console.log('🏁 Test complete - browser closed');
    }
}

runLoop1ComprehensiveTest();