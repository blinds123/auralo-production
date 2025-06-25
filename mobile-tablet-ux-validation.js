const puppeteer = require('puppeteer');

async function runMobileTabletUXValidation() {
    console.log('📱 MOBILE/TABLET UX VALIDATION - REAL DEVICE TESTING');
    console.log('====================================================');
    
    const devices = [
        { name: 'iPhone 12', viewport: { width: 390, height: 844, isMobile: true } },
        { name: 'iPhone 14 Pro', viewport: { width: 393, height: 852, isMobile: true } },
        { name: 'Samsung Galaxy S21', viewport: { width: 384, height: 854, isMobile: true } },
        { name: 'iPad Air', viewport: { width: 820, height: 1180, isMobile: false } },
        { name: 'iPad Pro', viewport: { width: 1024, height: 1366, isMobile: false } }
    ];
    
    for (const device of devices) {
        console.log(`\n🔍 TESTING DEVICE: ${device.name}`);
        console.log('='.repeat(50));
        
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: device.viewport,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        try {
            // Set device emulation
            await page.emulate({
                viewport: device.viewport,
                userAgent: device.viewport.isMobile ? 
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15' :
                    'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
            });
            
            page.on('console', msg => console.log(`${device.name} LOG:`, msg.text()));
            
            await page.goto('http://localhost:8000/index.html', { 
                waitUntil: 'networkidle0',
                timeout: 30000 
            });
            
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // UX TEST 1: CAROUSEL BUTTON RESPONSIVENESS
            console.log(`📱 ${device.name} - Testing Carousel Button Responsiveness`);
            
            const carouselUXTest = await page.evaluate(() => {
                // Scroll to story carousel
                const carousel = document.querySelector('.story-carousel');
                if (carousel) {
                    carousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Check button visibility and size
                const leftBtn = document.querySelector('.story-carousel .carousel-nav-left');
                const rightBtn = document.querySelector('.story-carousel .carousel-nav-right');
                
                if (!leftBtn || !rightBtn) return { error: 'Buttons not found' };
                
                const leftRect = leftBtn.getBoundingClientRect();
                const rightRect = rightBtn.getBoundingClientRect();
                
                return {
                    leftButton: {
                        visible: leftRect.width > 0 && leftRect.height > 0,
                        size: { width: Math.round(leftRect.width), height: Math.round(leftRect.height) },
                        position: { x: Math.round(leftRect.x), y: Math.round(leftRect.y) },
                        touchable: leftRect.width >= 44 && leftRect.height >= 44 // Apple's min touch target
                    },
                    rightButton: {
                        visible: rightRect.width > 0 && rightRect.height > 0,
                        size: { width: Math.round(rightRect.width), height: Math.round(rightRect.height) },
                        position: { x: Math.round(rightRect.x), y: Math.round(rightRect.y) },
                        touchable: rightRect.width >= 44 && rightRect.height >= 44
                    }
                };
            });
            
            if (carouselUXTest.error) {
                console.log(`❌ ${device.name} - Carousel buttons not found`);
            } else {
                console.log(`📊 ${device.name} - Left Button: ${carouselUXTest.leftButton.size.width}x${carouselUXTest.leftButton.size.height} ${carouselUXTest.leftButton.touchable ? '✅' : '❌'}`);
                console.log(`📊 ${device.name} - Right Button: ${carouselUXTest.rightButton.size.width}x${carouselUXTest.rightButton.size.height} ${carouselUXTest.rightButton.touchable ? '✅' : '❌'}`);
                
                // Test actual button tap
                try {
                    await page.tap('.story-carousel .carousel-nav-right');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(`✅ ${device.name} - Button tap successful`);
                } catch (error) {
                    console.log(`❌ ${device.name} - Button tap failed: ${error.message}`);
                }
            }
            
            // UX TEST 2: XL POPUP MOBILE VISIBILITY
            console.log(`📱 ${device.name} - Testing XL Popup Mobile Visibility`);
            
            const xlMobileTest = await page.evaluate(() => {
                const xlButton = document.querySelector('.size-option[data-size="XL"]');
                if (!xlButton) return { error: 'XL button not found' };
                
                const xlRect = xlButton.getBoundingClientRect();
                return {
                    xlButton: {
                        visible: xlRect.width > 0 && xlRect.height > 0,
                        text: xlButton.textContent.trim(),
                        classes: Array.from(xlButton.classList),
                        touchable: xlRect.width >= 44 && xlRect.height >= 44
                    }
                };
            });
            
            if (xlMobileTest.error) {
                console.log(`❌ ${device.name} - XL button not found`);
            } else {
                console.log(`📊 ${device.name} - XL Button: "${xlMobileTest.xlButton.text}" ${xlMobileTest.xlButton.touchable ? '✅' : '❌'}`);
            }
            
            // Wait for XL timer (15 seconds)
            console.log(`⏱️ ${device.name} - Waiting 15 seconds for XL timer...`);
            await new Promise(resolve => setTimeout(resolve, 15000));
            
            const xlPopupMobileTest = await page.evaluate(() => {
                const xlButton = document.querySelector('.size-option[data-size="XL"]');
                const popup = document.querySelector('.xl-nuclear-popup');
                
                let popupVisible = false;
                let popupSize = null;
                
                if (popup) {
                    const popupRect = popup.getBoundingClientRect();
                    popupVisible = popupRect.width > 0 && popupRect.height > 0;
                    popupSize = { width: Math.round(popupRect.width), height: Math.round(popupRect.height) };
                }
                
                return {
                    xlFinal: xlButton ? {
                        text: xlButton.textContent.trim(),
                        classes: Array.from(xlButton.classList)
                    } : null,
                    popup: {
                        exists: !!popup,
                        visible: popupVisible,
                        size: popupSize
                    }
                };
            });
            
            console.log(`📊 ${device.name} - XL Final: "${xlPopupMobileTest.xlFinal?.text}" - ${xlPopupMobileTest.xlFinal?.classes.join(', ')}`);
            console.log(`📊 ${device.name} - Popup: ${xlPopupMobileTest.popup.exists ? 'EXISTS' : 'MISSING'} ${xlPopupMobileTest.popup.visible ? '✅ VISIBLE' : '❌ HIDDEN'}`);
            
            if (xlPopupMobileTest.popup.size) {
                console.log(`📊 ${device.name} - Popup Size: ${xlPopupMobileTest.popup.size.width}x${xlPopupMobileTest.popup.size.height}`);
            }
            
            // UX TEST 3: FINGER POINTER ACCURACY
            console.log(`📱 ${device.name} - Testing Finger Pointer Accuracy`);
            
            const fingerPointerTest = await page.evaluate(() => {
                // Scroll to checkout section
                const checkoutSection = document.querySelector('.process-steps');
                if (checkoutSection) {
                    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                const exchangePointer = document.querySelector('.arrow-exchange-bottom');
                const walletPointer = document.querySelector('.arrow-wallet-bottom');
                const exchangeButton = document.querySelector('[style*="Exchange"]') || 
                                     document.querySelector('.step-image') ||
                                     document.querySelector('.process-steps .step:first-child');
                const walletField = document.querySelector('input') || 
                                   document.querySelector('.step:last-child');
                
                let results = {
                    exchangePointer: null,
                    walletPointer: null,
                    targetAlignment: {
                        exchange: false,
                        wallet: false
                    }
                };
                
                if (exchangePointer) {
                    const pointerRect = exchangePointer.getBoundingClientRect();
                    results.exchangePointer = {
                        visible: pointerRect.width > 0 && pointerRect.height > 0,
                        position: { x: Math.round(pointerRect.x), y: Math.round(pointerRect.y) }
                    };
                    
                    if (exchangeButton) {
                        const buttonRect = exchangeButton.getBoundingClientRect();
                        const distance = Math.sqrt(
                            Math.pow(pointerRect.x - buttonRect.x, 2) + 
                            Math.pow(pointerRect.y - buttonRect.y, 2)
                        );
                        results.targetAlignment.exchange = distance < 100; // Within 100px
                    }
                }
                
                if (walletPointer) {
                    const pointerRect = walletPointer.getBoundingClientRect();
                    results.walletPointer = {
                        visible: pointerRect.width > 0 && pointerRect.height > 0,
                        position: { x: Math.round(pointerRect.x), y: Math.round(pointerRect.y) }
                    };
                    
                    if (walletField) {
                        const fieldRect = walletField.getBoundingClientRect();
                        const distance = Math.sqrt(
                            Math.pow(pointerRect.x - fieldRect.x, 2) + 
                            Math.pow(pointerRect.y - fieldRect.y, 2)
                        );
                        results.targetAlignment.wallet = distance < 100; // Within 100px
                    }
                }
                
                return results;
            });
            
            console.log(`📊 ${device.name} - Exchange Pointer: ${fingerPointerTest.exchangePointer?.visible ? '✅ VISIBLE' : '❌ HIDDEN'} ${fingerPointerTest.targetAlignment.exchange ? '🎯 ALIGNED' : '❌ MISALIGNED'}`);
            console.log(`📊 ${device.name} - Wallet Pointer: ${fingerPointerTest.walletPointer?.visible ? '✅ VISIBLE' : '❌ HIDDEN'} ${fingerPointerTest.targetAlignment.wallet ? '🎯 ALIGNED' : '❌ MISALIGNED'}`);
            
            // UX TEST 4: BLUE POINTERS INTERACTION
            console.log(`📱 ${device.name} - Testing Blue Pointers Touch Interaction`);
            
            const bluePointerTest = await page.evaluate(() => {
                // Scroll to lifestyle section
                const lifestyleSection = document.querySelector('.lifestyle-grid');
                if (lifestyleSection) {
                    lifestyleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                const hotspots = document.querySelectorAll('.hotspot');
                let touchableHotspots = 0;
                let visibleHotspots = 0;
                
                hotspots.forEach(hotspot => {
                    const rect = hotspot.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        visibleHotspots++;
                        if (rect.width >= 44 && rect.height >= 44) {
                            touchableHotspots++;
                        }
                    }
                });
                
                return {
                    totalHotspots: hotspots.length,
                    visibleHotspots: visibleHotspots,
                    touchableHotspots: touchableHotspots
                };
            });
            
            console.log(`📊 ${device.name} - Blue Hotspots: ${bluePointerTest.visibleHotspots}/${bluePointerTest.totalHotspots} visible, ${bluePointerTest.touchableHotspots} touchable`);
            
            // DEVICE UX SUMMARY
            const deviceUXScore = {
                carouselButtons: carouselUXTest.error ? 0 : (carouselUXTest.leftButton.touchable && carouselUXTest.rightButton.touchable ? 1 : 0),
                xlPopup: xlPopupMobileTest.popup.visible ? 1 : 0,
                fingerPointers: (fingerPointerTest.exchangePointer?.visible && fingerPointerTest.walletPointer?.visible) ? 1 : 0,
                bluePointers: bluePointerTest.visibleHotspots >= 6 ? 1 : 0
            };
            
            const deviceScore = Object.values(deviceUXScore).reduce((a, b) => a + b, 0);
            const maxScore = Object.keys(deviceUXScore).length;
            
            console.log(`\n📊 ${device.name} UX SCORE: ${deviceScore}/${maxScore} (${Math.round(deviceScore/maxScore*100)}%)`);
            
            if (deviceScore < maxScore) {
                console.log(`⚠️ ${device.name} UX VALIDATION FAILED - Issues detected`);
                Object.entries(deviceUXScore).forEach(([feature, score]) => {
                    console.log(`   ${score ? '✅' : '❌'} ${feature}`);
                });
            } else {
                console.log(`✅ ${device.name} UX VALIDATION PASSED`);
            }
            
            // Take device-specific screenshot
            await page.screenshot({ 
                path: `ux-validation-${device.name.toLowerCase().replace(' ', '-')}.png`,
                fullPage: true
            });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error(`❌ Error testing ${device.name}:`, error.message);
        } finally {
            await browser.close();
        }
    }
    
    console.log('\n📱 MOBILE/TABLET UX VALIDATION COMPLETE');
    console.log('=====================================');
    console.log('Check individual device screenshots for visual verification');
}

runMobileTabletUXValidation();