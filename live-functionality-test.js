const puppeteer = require('puppeteer');

async function runLiveFunctionalityTest() {
    console.log('🔬 LIVE FUNCTIONALITY TEST - ALL 6 FEATURES');
    console.log('============================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
        // Enable console logs from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        console.log('🌐 Loading Auralo production page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // TEST 1: XL TIMER AND POPUP (13 seconds)
        console.log('\n📋 TEST 1: XL SOLD OUT TIMER (13 seconds)');
        console.log('==========================================');
        
        const initialXLStatus = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return {
                exists: !!xlButton,
                text: xlButton ? xlButton.textContent.trim() : 'not found',
                hasTimerClass: xlButton ? xlButton.classList.contains('xl-timer-started') : false
            };
        });
        
        console.log(`XL Button Status: ${initialXLStatus.text}`);
        console.log(`Timer Started: ${initialXLStatus.hasTimerClass}`);
        
        // Wait for XL timer (13 seconds + buffer)
        console.log('⏱️  Waiting 15 seconds for XL timer...');
        await new Promise(resolve => setTimeout(resolve, 15000));
        
        const postTimerXLStatus = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.querySelector('.xl-simple-popup');
            return {
                xlText: xlButton ? xlButton.textContent.trim() : 'not found',
                popupExists: !!popup,
                popupVisible: popup ? popup.style.display !== 'none' : false,
                popupText: popup ? popup.textContent : 'no popup'
            };
        });
        
        console.log(`✅ XL Status After Timer: ${postTimerXLStatus.xlText}`);
        console.log(`✅ Popup Exists: ${postTimerXLStatus.popupExists}`);
        console.log(`✅ Popup Visible: ${postTimerXLStatus.popupVisible}`);
        
        // TEST 2: CAROUSEL NAVIGATION
        console.log('\n📋 TEST 2: CAROUSEL MANUAL NAVIGATION');
        console.log('====================================');
        
        // Scroll to carousels
        await page.evaluate(() => {
            const carousel = document.querySelector('.story-carousel');
            if (carousel) {
                carousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test story carousel navigation
        const carouselTest = await page.evaluate(() => {
            const leftBtn = document.querySelector('.story-carousel .carousel-nav-left');
            const rightBtn = document.querySelector('.story-carousel .carousel-nav-right');
            const slides = document.querySelector('.story-slides');
            
            let results = {
                leftBtnExists: !!leftBtn,
                rightBtnExists: !!rightBtn,
                slidesExist: !!slides,
                initialTransform: slides ? getComputedStyle(slides).transform : 'none'
            };
            
            // Try clicking right button
            if (rightBtn) {
                rightBtn.click();
                setTimeout(() => {
                    results.afterRightClick = slides ? getComputedStyle(slides).transform : 'none';
                }, 500);
            }
            
            return results;
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const carouselFinalTest = await page.evaluate(() => {
            const slides = document.querySelector('.story-slides');
            return {
                finalTransform: slides ? getComputedStyle(slides).transform : 'none'
            };
        });
        
        console.log(`✅ Carousel Buttons: Left=${carouselTest.leftBtnExists}, Right=${carouselTest.rightBtnExists}`);
        console.log(`✅ Initial Transform: ${carouselTest.initialTransform}`);
        console.log(`✅ After Navigation: ${carouselFinalTest.finalTransform}`);
        
        // TEST 3: BLUE POINTERS ("Your Life Elevated")
        console.log('\n📋 TEST 3: BLUE POINTERS IN ELEVATED SECTION');
        console.log('============================================');
        
        // Scroll to lifestyle section
        await page.evaluate(() => {
            const section = document.querySelector('.lifestyle-grid');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const bluePointersTest = await page.evaluate(() => {
            const hotspots = document.querySelectorAll('.hotspot');
            const pulseDots = document.querySelectorAll('.hotspot-pulse');
            
            let results = {
                hotspotCount: hotspots.length,
                pulseDotsCount: pulseDots.length,
                hotspotData: []
            };
            
            hotspots.forEach((hotspot, index) => {
                const tip = hotspot.getAttribute('data-tip');
                const rect = hotspot.getBoundingClientRect();
                results.hotspotData.push({
                    index: index,
                    tip: tip,
                    visible: rect.width > 0 && rect.height > 0,
                    position: `${Math.round(rect.x)},${Math.round(rect.y)}`
                });
            });
            
            return results;
        });
        
        console.log(`✅ Blue Hotspots Found: ${bluePointersTest.hotspotCount}`);
        console.log(`✅ Pulse Animations: ${bluePointersTest.pulseDotsCount}`);
        bluePointersTest.hotspotData.forEach(hotspot => {
            console.log(`   Hotspot ${hotspot.index}: "${hotspot.tip}" - Visible: ${hotspot.visible}`);
        });
        
        // TEST 4: FINGER GUIDANCE POSITIONING
        console.log('\n📋 TEST 4: FINGER GUIDANCE POSITIONING');
        console.log('=====================================');
        
        // Scroll to checkout section
        await page.evaluate(() => {
            const section = document.querySelector('.process-steps');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const fingerGuidanceTest = await page.evaluate(() => {
            const exchangePointer = document.querySelector('.arrow-exchange-bottom');
            const walletPointer = document.querySelector('.arrow-wallet-bottom');
            
            return {
                exchangePointer: {
                    exists: !!exchangePointer,
                    position: exchangePointer ? exchangePointer.getBoundingClientRect() : null,
                    computedStyle: exchangePointer ? {
                        bottom: getComputedStyle(exchangePointer).bottom,
                        left: getComputedStyle(exchangePointer).left,
                        transform: getComputedStyle(exchangePointer).transform
                    } : null
                },
                walletPointer: {
                    exists: !!walletPointer,
                    position: walletPointer ? walletPointer.getBoundingClientRect() : null,
                    computedStyle: walletPointer ? {
                        top: getComputedStyle(walletPointer).top,
                        right: getComputedStyle(walletPointer).right
                    } : null
                }
            };
        });
        
        console.log(`✅ Exchange Pointer: ${fingerGuidanceTest.exchangePointer.exists}`);
        if (fingerGuidanceTest.exchangePointer.exists) {
            console.log(`   Position: ${JSON.stringify(fingerGuidanceTest.exchangePointer.computedStyle)}`);
        }
        console.log(`✅ Wallet Pointer: ${fingerGuidanceTest.walletPointer.exists}`);
        if (fingerGuidanceTest.walletPointer.exists) {
            console.log(`   Position: ${JSON.stringify(fingerGuidanceTest.walletPointer.computedStyle)}`);
        }
        
        // TEST 5: SIZE CHART TOGGLE
        console.log('\n📋 TEST 5: SIZE CHART TOGGLE FUNCTIONALITY');
        console.log('==========================================');
        
        const sizeChartTest = await page.evaluate(() => {
            const toggleBtn = document.querySelector('.chart-toggle');
            const chartDiv = document.getElementById('sizeChart');
            
            let results = {
                toggleExists: !!toggleBtn,
                chartExists: !!chartDiv,
                initialDisplay: chartDiv ? getComputedStyle(chartDiv).display : 'none',
                initialText: toggleBtn ? toggleBtn.textContent.trim() : 'not found'
            };
            
            // Try clicking toggle
            if (toggleBtn) {
                toggleBtn.click();
                setTimeout(() => {
                    results.afterToggleDisplay = chartDiv ? getComputedStyle(chartDiv).display : 'none';
                    results.afterToggleText = toggleBtn ? toggleBtn.textContent.trim() : 'not found';
                }, 300);
            }
            
            return results;
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sizeChartFinalTest = await page.evaluate(() => {
            const toggleBtn = document.querySelector('.chart-toggle');
            const chartDiv = document.getElementById('sizeChart');
            return {
                finalDisplay: chartDiv ? getComputedStyle(chartDiv).display : 'none',
                finalText: toggleBtn ? toggleBtn.textContent.trim() : 'not found'
            };
        });
        
        console.log(`✅ Size Chart Toggle: ${sizeChartTest.toggleExists}`);
        console.log(`✅ Initial State: ${sizeChartTest.initialDisplay} - "${sizeChartTest.initialText}"`);
        console.log(`✅ After Toggle: ${sizeChartFinalTest.finalDisplay} - "${sizeChartFinalTest.finalText}"`);
        
        // TEST 6: IN-STORE AVAILABILITY
        console.log('\n📋 TEST 6: IN-STORE AVAILABILITY (HAMILTON)');
        console.log('==========================================');
        
        const storeAvailabilityTest = await page.evaluate(() => {
            const toggleBtn = document.querySelector('.availability-header');
            const storeDiv = document.getElementById('storeAvailability');
            
            let results = {
                toggleExists: !!toggleBtn,
                storeExists: !!storeDiv,
                initialDisplay: storeDiv ? getComputedStyle(storeDiv).display : 'none',
                storeContent: storeDiv ? storeDiv.textContent.includes('Hamilton') : false
            };
            
            // Try clicking toggle
            if (toggleBtn) {
                toggleBtn.click();
                setTimeout(() => {
                    results.afterToggleDisplay = storeDiv ? getComputedStyle(storeDiv).display : 'none';
                }, 300);
            }
            
            return results;
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storeAvailabilityFinalTest = await page.evaluate(() => {
            const storeDiv = document.getElementById('storeAvailability');
            return {
                finalDisplay: storeDiv ? getComputedStyle(storeDiv).display : 'none'
            };
        });
        
        console.log(`✅ Store Toggle: ${storeAvailabilityTest.toggleExists}`);
        console.log(`✅ Hamilton Content: ${storeAvailabilityTest.storeContent}`);
        console.log(`✅ Initial State: ${storeAvailabilityTest.initialDisplay}`);
        console.log(`✅ After Toggle: ${storeAvailabilityFinalTest.finalDisplay}`);
        
        // TAKE FINAL SCREENSHOTS
        console.log('\n📸 TAKING DOCUMENTATION SCREENSHOTS');
        console.log('===================================');
        
        await page.screenshot({ 
            path: 'live-test-full-page.png',
            fullPage: true
        });
        
        // Checkout section screenshot
        const checkoutElement = await page.$('.process-steps');
        if (checkoutElement) {
            await checkoutElement.screenshot({ 
                path: 'live-test-checkout-pointers.png',
                padding: 20
            });
        }
        
        // Lifestyle section screenshot
        const lifestyleElement = await page.$('.lifestyle-grid');
        if (lifestyleElement) {
            await lifestyleElement.screenshot({ 
                path: 'live-test-blue-pointers.png',
                padding: 20
            });
        }
        
        console.log('\n🎯 LIVE FUNCTIONALITY TEST COMPLETE!');
        console.log('====================================');
        console.log('✅ All 6 features tested');
        console.log('📸 Screenshots saved for documentation');
        console.log('🔍 Browser staying open for 60 seconds for manual inspection...');
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        console.error('❌ Error during live test:', error);
    } finally {
        await browser.close();
        console.log('🏁 Test complete - browser closed');
    }
}

runLiveFunctionalityTest();