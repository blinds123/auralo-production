const puppeteer = require('puppeteer');

async function verifyUltimatePump() {
    console.log('💎 VERIFYING ULTIMATE PUMP - ALL DEVICES');
    console.log('========================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null
    });
    
    // Test devices
    const devices = [
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'iPad Mini', width: 768, height: 1024 },
        { name: 'Desktop', width: 1200, height: 800 }
    ];
    
    for (const device of devices) {
        console.log(`\n📱 TESTING: ${device.name} (${device.width}x${device.height})`);
        console.log('-'.repeat(50));
        
        const page = await browser.newPage();
        await page.setViewport({ width: device.width, height: device.height });
        
        // Enable console logging
        page.on('console', msg => {
            if (msg.text().includes('✅') || msg.text().includes('🖼️')) {
                console.log(`  ${msg.text()}`);
            }
        });
        
        await page.goto('file://' + __dirname + '/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check carousel images
        const carouselCheck = await page.evaluate(() => {
            const results = {
                totalImages: 0,
                loadedImages: 0,
                placeholderImages: 0,
                carousels: {}
            };
            
            ['storySlides', 'tiktokSlides', 'trustpilotSlides'].forEach(slidesId => {
                const slides = document.getElementById(slidesId);
                if (slides) {
                    const images = slides.querySelectorAll('img');
                    results.carousels[slidesId] = {
                        total: images.length,
                        loaded: 0,
                        placeholders: 0
                    };
                    
                    images.forEach(img => {
                        results.totalImages++;
                        if (img.complete && img.naturalHeight > 0 && !img.src.includes('data:image/svg')) {
                            results.loadedImages++;
                            results.carousels[slidesId].loaded++;
                        } else if (img.src.includes('data:image/svg')) {
                            results.placeholderImages++;
                            results.carousels[slidesId].placeholders++;
                        }
                    });
                }
            });
            
            return results;
        });
        
        console.log('🎠 Carousel Status:');
        console.log(`  Total Images: ${carouselCheck.totalImages}`);
        console.log(`  Loaded: ${carouselCheck.loadedImages} ✅`);
        console.log(`  Placeholders: ${carouselCheck.placeholderImages} ${carouselCheck.placeholderImages > 0 ? '❌' : '✅'}`);
        
        // Check Step 2 positioning
        const stepCheck = await page.evaluate(() => {
            const step2 = document.querySelector('.process-step:nth-child(2) .step-number');
            const step1 = document.querySelector('.process-step:nth-child(1)');
            const step2Container = document.querySelector('.process-step:nth-child(2)');
            
            if (!step2 || !step1) return null;
            
            const step2Styles = window.getComputedStyle(step2);
            const step1Rect = step1.getBoundingClientRect();
            const step2Rect = step2Container.getBoundingClientRect();
            
            return {
                step2Transform: step2Styles.transform,
                gap: step2Rect.top - step1Rect.bottom,
                visuallyAligned: Math.abs(step2Rect.top - step1Rect.bottom) < 100
            };
        });
        
        console.log('📍 Step Positioning:');
        console.log(`  Transform: ${stepCheck?.step2Transform}`);
        console.log(`  Gap: ${stepCheck?.gap}px`);
        console.log(`  Visually Aligned: ${stepCheck?.visuallyAligned ? '✅' : '❌'}`);
        
        // Check Exchange button
        const buttonCheck = await page.evaluate(() => {
            const button = document.querySelector('.simpleswap-link-button');
            const subheadline = document.querySelector('.exchange-subheadline');
            const section = document.querySelector('.checkout-section');
            
            if (!button || !section) return null;
            
            const buttonRect = button.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const sectionStyles = window.getComputedStyle(section);
            
            return {
                buttonExists: true,
                subheadlineExists: !!subheadline,
                sectionPadding: sectionStyles.paddingBottom,
                buttonAnimating: window.getComputedStyle(button).animation.includes('pulse'),
                visuallyGood: buttonRect.bottom < window.innerHeight
            };
        });
        
        console.log('🎯 Exchange Button:');
        console.log(`  Button Exists: ${buttonCheck?.buttonExists ? '✅' : '❌'}`);
        console.log(`  Subheadline: ${buttonCheck?.subheadlineExists ? '✅' : '❌'}`);
        console.log(`  Pulsing: ${buttonCheck?.buttonAnimating ? '✅' : '❌'}`);
        console.log(`  Visually Good: ${buttonCheck?.visuallyGood ? '✅' : '❌'}`);
        
        // Check animations and enhancements
        const enhancementCheck = await page.evaluate(() => {
            const processStep = document.querySelector('.process-step');
            const buyButton = document.querySelector('.buy-now-button');
            
            const stepStyles = processStep ? window.getComputedStyle(processStep) : null;
            const buttonStyles = buyButton ? window.getComputedStyle(buyButton) : null;
            
            return {
                smoothScroll: window.getComputedStyle(document.documentElement).scrollBehavior === 'smooth',
                stepHasHover: stepStyles?.transition.includes('0.4s'),
                buttonHasOverflow: buttonStyles?.overflow === 'hidden',
                hasBeautifulShadows: stepStyles?.boxShadow !== 'none'
            };
        });
        
        console.log('✨ Enhancements:');
        console.log(`  Smooth Scroll: ${enhancementCheck.smoothScroll ? '✅' : '❌'}`);
        console.log(`  Hover Effects: ${enhancementCheck.stepHasHover ? '✅' : '❌'}`);
        console.log(`  Button Effects: ${enhancementCheck.buttonHasOverflow ? '✅' : '❌'}`);
        console.log(`  Beautiful Shadows: ${enhancementCheck.hasBeautifulShadows ? '✅' : '❌'}`);
        
        // Take screenshot
        await page.screenshot({ 
            path: `ultimate-pump-${device.name.toLowerCase().replace(/\s+/g, '-')}.png`,
            fullPage: false
        });
        
        // Scroll to checkout for mobile/tablet
        if (device.width < 1024) {
            await page.evaluate(() => {
                document.querySelector('.checkout-section')?.scrollIntoView({ behavior: 'smooth' });
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            await page.screenshot({ 
                path: `ultimate-pump-${device.name.toLowerCase().replace(/\s+/g, '-')}-checkout.png`,
                fullPage: false
            });
        }
        
        await page.close();
    }
    
    // Final comprehensive check
    console.log('\n🏆 FINAL VERIFICATION SUMMARY');
    console.log('=============================');
    
    const finalPage = await browser.newPage();
    await finalPage.goto('file://' + __dirname + '/index.html', { waitUntil: 'networkidle0' });
    
    const finalCheck = await finalPage.evaluate(() => {
        // Count all working images
        const allImages = document.querySelectorAll('img');
        let workingImages = 0;
        let placeholders = 0;
        
        allImages.forEach(img => {
            if (!img.src.includes('data:image/svg') && img.complete && img.naturalHeight > 0) {
                workingImages++;
            } else if (img.src.includes('data:image/svg')) {
                placeholders++;
            }
        });
        
        // Check key functionality
        return {
            totalImages: allImages.length,
            workingImages,
            placeholders,
            xlTimerExists: typeof window.xlTimer !== 'undefined',
            carouselsExist: window.storyCarousel && window.tiktokCarousel && window.trustpilotCarousel,
            countdownExists: document.getElementById('countdownTimer') !== null,
            smoothScrollEnabled: window.getComputedStyle(document.documentElement).scrollBehavior === 'smooth'
        };
    });
    
    console.log(`✅ Working Images: ${finalCheck.workingImages}/${finalCheck.totalImages}`);
    console.log(`✅ Placeholders Remaining: ${finalCheck.placeholders}`);
    console.log(`✅ XL Timer System: ${finalCheck.xlTimerExists ? 'Active' : 'Missing'}`);
    console.log(`✅ Carousels: ${finalCheck.carouselsExist ? 'Working' : 'Missing'}`);
    console.log(`✅ Countdown Timer: ${finalCheck.countdownExists ? 'Active' : 'Missing'}`);
    console.log(`✅ Smooth Scroll: ${finalCheck.smoothScrollEnabled ? 'Enabled' : 'Disabled'}`);
    
    const allGood = 
        finalCheck.workingImages > finalCheck.totalImages * 0.8 &&
        finalCheck.xlTimerExists &&
        finalCheck.carouselsExist &&
        finalCheck.countdownExists &&
        finalCheck.smoothScrollEnabled;
    
    console.log(`\n💎 ULTIMATE PUMP STATUS: ${allGood ? '🏆 PERFECT!' : '⚠️ NEEDS ATTENTION'}`);
    
    if (!allGood) {
        console.log('\n⚠️ Issues to address:');
        if (finalCheck.workingImages < finalCheck.totalImages * 0.8) {
            console.log('- Some images still not loading properly');
        }
        if (!finalCheck.xlTimerExists) console.log('- XL Timer not initialized');
        if (!finalCheck.carouselsExist) console.log('- Carousels not working');
        if (!finalCheck.countdownExists) console.log('- Countdown timer missing');
    }
    
    console.log('\n🎯 Browser staying open for inspection...');
    await new Promise(() => {});
}

verifyUltimatePump();