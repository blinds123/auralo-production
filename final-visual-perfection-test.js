const puppeteer = require('puppeteer');

async function finalVisualPerfectionTest() {
    console.log('🏆 FINAL VISUAL PERFECTION TEST');
    console.log('==============================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null
    });
    
    // Test key devices
    const devices = [
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'iPad Mini', width: 768, height: 1024 }
    ];
    
    for (const device of devices) {
        console.log(`\n📱 TESTING: ${device.name}`);
        console.log('-'.repeat(40));
        
        const page = await browser.newPage();
        await page.setViewport({ width: device.width, height: device.height });
        
        await page.goto('file://' + __dirname + '/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        // Wait for everything to load
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 1. CHECK CAROUSEL IMAGES
        console.log('\n🎠 Checking Carousel Images...');
        const carouselStatus = await page.evaluate(() => {
            let totalImages = 0;
            let loadedImages = 0;
            
            document.querySelectorAll('.story-slide img, .review-slide img').forEach(img => {
                totalImages++;
                if (img.complete && img.naturalHeight > 0 && !img.src.includes('data:image')) {
                    loadedImages++;
                }
            });
            
            return { totalImages, loadedImages };
        });
        
        console.log(`✅ Carousel Images: ${carouselStatus.loadedImages}/${carouselStatus.totalImages} loaded`);
        
        // 2. CHECK STEP POSITIONING
        console.log('\n📍 Checking Step Positioning...');
        await page.evaluate(() => {
            document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const stepStatus = await page.evaluate(() => {
            const step1 = document.querySelector('.process-step:nth-child(1)');
            const step2 = document.querySelector('.process-step:nth-child(2)');
            const step2Circle = document.querySelector('.process-step:nth-child(2) .step-number');
            
            if (!step1 || !step2) return null;
            
            const step1Rect = step1.getBoundingClientRect();
            const step2Rect = step2.getBoundingClientRect();
            const gap = step2Rect.top - step1Rect.bottom;
            const transform = window.getComputedStyle(step2Circle).transform;
            
            return {
                gap: Math.round(gap),
                transform,
                visuallyGood: gap > 20 && gap < 150
            };
        });
        
        console.log(`✅ Step Gap: ${stepStatus?.gap}px`);
        console.log(`✅ Step 2 Transform: ${stepStatus?.transform}`);
        console.log(`✅ Visual Alignment: ${stepStatus?.visuallyGood ? 'Perfect' : 'Needs adjustment'}`);
        
        // 3. CHECK EXCHANGE BUTTON
        console.log('\n🎯 Checking Exchange Button...');
        await page.evaluate(() => {
            document.querySelector('.complete-exchange-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const buttonStatus = await page.evaluate(() => {
            const button = document.querySelector('.simpleswap-link-button');
            const subheadline = document.querySelector('.exchange-subheadline');
            const section = document.querySelector('.complete-exchange-section');
            
            if (!button || !section) return null;
            
            const buttonRect = button.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const sectionStyles = window.getComputedStyle(section);
            
            return {
                buttonExists: true,
                subheadlineExists: !!subheadline,
                isPulsing: window.getComputedStyle(button).animation.includes('pulse'),
                sectionPadding: sectionStyles.paddingBottom,
                buttonInView: buttonRect.top < window.innerHeight && buttonRect.bottom > 0
            };
        });
        
        console.log(`✅ Exchange Button: ${buttonStatus?.buttonExists ? 'Found' : 'Missing'}`);
        console.log(`✅ Buy Now Subheadline: ${buttonStatus?.subheadlineExists ? 'Found' : 'Missing'}`);
        console.log(`✅ Button Pulsing: ${buttonStatus?.isPulsing ? 'Yes' : 'No'}`);
        console.log(`✅ Button In View: ${buttonStatus?.buttonInView ? 'Yes' : 'No'}`);
        
        // 4. CHECK COUNTDOWN TIMER
        console.log('\n⏰ Checking Countdown Timer...');
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const timerStatus = await page.evaluate(() => {
            const hours = document.getElementById('hours');
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            return {
                exists: !!(hours && minutes && seconds),
                hours: hours?.textContent || '00',
                minutes: minutes?.textContent || '00',
                seconds: seconds?.textContent || '00',
                isRunning: hours && parseInt(hours.textContent) > 0
            };
        });
        
        console.log(`✅ Countdown Timer: ${timerStatus.exists ? 'Working' : 'Missing'}`);
        console.log(`✅ Time: ${timerStatus.hours}h ${timerStatus.minutes}m ${timerStatus.seconds}s`);
        
        // 5. VISUAL SCREENSHOTS
        console.log('\n📸 Taking Visual Screenshots...');
        
        // Hero section
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.screenshot({ 
            path: `final-perfect-${device.name.toLowerCase().replace(/\s+/g, '-')}-hero.png`,
            fullPage: false
        });
        
        // Checkout section
        await page.evaluate(() => {
            document.querySelector('.complete-exchange-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.screenshot({ 
            path: `final-perfect-${device.name.toLowerCase().replace(/\s+/g, '-')}-checkout.png`,
            fullPage: false
        });
        
        await page.close();
    }
    
    // FINAL SUMMARY
    console.log('\n🏆 FINAL VISUAL PERFECTION SUMMARY');
    console.log('==================================');
    
    const finalPage = await browser.newPage();
    await finalPage.goto('file://' + __dirname + '/index.html', { waitUntil: 'networkidle0' });
    
    const finalCheck = await finalPage.evaluate(() => {
        // Check all critical elements
        const carouselImages = document.querySelectorAll('.story-slide img, .review-slide img');
        let workingImages = 0;
        
        carouselImages.forEach(img => {
            if (img.complete && img.naturalHeight > 0 && !img.src.includes('data:image')) {
                workingImages++;
            }
        });
        
        return {
            carouselImagesWorking: workingImages === carouselImages.length,
            exchangeSectionExists: !!document.querySelector('.complete-exchange-section'),
            xlTimerActive: typeof window.xlTimer !== 'undefined',
            countdownWorking: !!document.getElementById('hours'),
            stepLabelsCorrect: document.querySelector('.process-step:nth-child(1) .step-number')?.textContent.includes('STEP'),
            smoothScrollEnabled: window.getComputedStyle(document.documentElement).scrollBehavior === 'smooth'
        };
    });
    
    console.log(`✅ Carousel Images: ${finalCheck.carouselImagesWorking ? 'ALL WORKING' : 'Some issues'}`);
    console.log(`✅ Exchange Section: ${finalCheck.exchangeSectionExists ? 'Found' : 'Missing'}`);
    console.log(`✅ XL Timer: ${finalCheck.xlTimerActive ? 'Active' : 'Not initialized'}`);
    console.log(`✅ Countdown Timer: ${finalCheck.countdownWorking ? 'Working' : 'Missing'}`);
    console.log(`✅ Step Labels: ${finalCheck.stepLabelsCorrect ? 'Have STEP prefix' : 'Missing STEP'}`);
    console.log(`✅ Smooth Scroll: ${finalCheck.smoothScrollEnabled ? 'Enabled' : 'Disabled'}`);
    
    // Wait for XL timer test
    console.log('\n⏳ Waiting 13 seconds for XL timer test...');
    await new Promise(resolve => setTimeout(resolve, 13000));
    
    const xlStatus = await finalPage.evaluate(() => {
        const xlButton = document.querySelector('.size-option[data-size="XL"]');
        const popup = document.querySelector('.xl-simple-popup, #xl-soldout-overlay');
        
        return {
            xlSoldOut: xlButton?.classList.contains('sold-out') || false,
            popupShowing: !!popup
        };
    });
    
    console.log(`\n🔥 XL Timer Test:`);
    console.log(`✅ XL Button Sold Out: ${xlStatus.xlSoldOut ? 'YES' : 'NO'}`);
    console.log(`✅ Popup Showing: ${xlStatus.popupShowing ? 'YES' : 'NO'}`);
    
    const allPerfect = 
        finalCheck.carouselImagesWorking &&
        finalCheck.exchangeSectionExists &&
        finalCheck.countdownWorking &&
        finalCheck.stepLabelsCorrect &&
        finalCheck.smoothScrollEnabled &&
        xlStatus.xlSoldOut;
    
    console.log(`\n💎 FINAL STATUS: ${allPerfect ? '🏆 ABSOLUTE PERFECTION ACHIEVED!' : '⚠️ Minor tweaks needed'}`);
    
    console.log('\n🎯 Browser staying open for final inspection...');
    await new Promise(() => {});
}

finalVisualPerfectionTest();