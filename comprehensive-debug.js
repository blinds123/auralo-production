const puppeteer = require('puppeteer');

async function comprehensiveDebug() {
    console.log('🔍 COMPREHENSIVE SYSTEM DEBUGGING');
    console.log('==================================');
    
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
        
        console.log('🔍 Loading page for comprehensive debugging...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        console.log('⏰ Waiting 3 seconds for initial load...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('\n📊 CAROUSEL IMAGE ANALYSIS:');
        const carouselAnalysis = await page.evaluate(() => {
            function analyzeCarousel(carouselId, slideSelector) {
                const container = document.getElementById(carouselId);
                const slides = document.querySelectorAll(slideSelector);
                
                if (!container || slides.length === 0) {
                    return { error: 'Container or slides not found' };
                }
                
                const slideInfo = Array.from(slides).map((slide, index) => {
                    const img = slide.querySelector('img');
                    const computedStyle = getComputedStyle(slide);
                    
                    return {
                        index: index,
                        hasImage: !!img,
                        imageSrc: img ? img.src : 'No image',
                        imageLoaded: img ? img.complete && img.naturalHeight !== 0 : false,
                        imageAlt: img ? img.alt : 'No alt',
                        slideVisible: computedStyle.opacity > 0,
                        slideOpacity: computedStyle.opacity,
                        slideTransform: computedStyle.transform,
                        slideDisplay: computedStyle.display,
                        slideWidth: slide.offsetWidth,
                        slideHeight: slide.offsetHeight,
                        slideContent: slide.textContent.substring(0, 100)
                    };
                });
                
                return {
                    containerId: carouselId,
                    containerVisible: container.offsetHeight > 0,
                    containerWidth: container.offsetWidth,
                    containerHeight: container.offsetHeight,
                    slideCount: slides.length,
                    slides: slideInfo
                };
            }
            
            return {
                story: analyzeCarousel('storyCarousel', '#storySlides .story-slide'),
                tiktok: analyzeCarousel('tiktokCarousel', '#tiktokSlides .review-slide'),
                trustpilot: analyzeCarousel('trustpilotCarousel', '#trustpilotSlides .review-slide')
            };
        });
        
        // Display analysis results
        console.log('\n📸 STORY CAROUSEL:');
        console.log(`  Container: ${carouselAnalysis.story.containerVisible ? '✅ Visible' : '❌ Hidden'} (${carouselAnalysis.story.containerWidth}x${carouselAnalysis.story.containerHeight})`);
        console.log(`  Slides: ${carouselAnalysis.story.slideCount} found`);
        carouselAnalysis.story.slides.forEach((slide, i) => {
            console.log(`    Slide ${i + 1}: ${slide.slideVisible ? '✅ Visible' : '❌ Hidden'} (opacity: ${slide.slideOpacity})`);
            console.log(`      Image: ${slide.hasImage ? '✅ Found' : '❌ Missing'} ${slide.imageLoaded ? '✅ Loaded' : '❌ Not loaded'}`);
            if (slide.hasImage && !slide.imageLoaded) {
                console.log(`      ⚠️ Image src: ${slide.imageSrc}`);
            }
        });
        
        console.log('\n📱 TIKTOK CAROUSEL:');
        console.log(`  Container: ${carouselAnalysis.tiktok.containerVisible ? '✅ Visible' : '❌ Hidden'} (${carouselAnalysis.tiktok.containerWidth}x${carouselAnalysis.tiktok.containerHeight})`);
        console.log(`  Slides: ${carouselAnalysis.tiktok.slideCount} found`);
        carouselAnalysis.tiktok.slides.forEach((slide, i) => {
            console.log(`    Slide ${i + 1}: ${slide.slideVisible ? '✅ Visible' : '❌ Hidden'} (opacity: ${slide.slideOpacity})`);
            console.log(`      Image: ${slide.hasImage ? '✅ Found' : '❌ Missing'} ${slide.imageLoaded ? '✅ Loaded' : '❌ Not loaded'}`);
            if (slide.hasImage && !slide.imageLoaded) {
                console.log(`      ⚠️ Image src: ${slide.imageSrc}`);
            }
        });
        
        console.log('\n⭐ TRUSTPILOT CAROUSEL:');
        console.log(`  Container: ${carouselAnalysis.trustpilot.containerVisible ? '✅ Visible' : '❌ Hidden'} (${carouselAnalysis.trustpilot.containerWidth}x${carouselAnalysis.trustpilot.containerHeight})`);
        console.log(`  Slides: ${carouselAnalysis.trustpilot.slideCount} found`);
        carouselAnalysis.trustpilot.slides.forEach((slide, i) => {
            console.log(`    Slide ${i + 1}: ${slide.slideVisible ? '✅ Visible' : '❌ Hidden'} (opacity: ${slide.slideOpacity})`);
            console.log(`      Image: ${slide.hasImage ? '✅ Found' : '❌ Missing'} ${slide.imageLoaded ? '✅ Loaded' : '❌ Not loaded'}`);
            if (slide.hasImage && !slide.imageLoaded) {
                console.log(`      ⚠️ Image src: ${slide.imageSrc}`);
            }
        });
        
        console.log('\n🎮 CAROUSEL NAVIGATION TEST:');
        const navigationTest = await page.evaluate(() => {
            const results = [];
            
            // Test story carousel
            if (window.storyCarousel && window.storyCarousel.next) {
                const beforeIndex = window.storyCarousel.currentIndex;
                window.storyCarousel.next();
                const afterIndex = window.storyCarousel.currentIndex;
                results.push({
                    carousel: 'story',
                    beforeIndex: beforeIndex,
                    afterIndex: afterIndex,
                    changed: beforeIndex !== afterIndex
                });
            }
            
            // Test tiktok carousel
            if (window.tiktokCarousel && window.tiktokCarousel.next) {
                const beforeIndex = window.tiktokCarousel.currentIndex;
                window.tiktokCarousel.next();
                const afterIndex = window.tiktokCarousel.currentIndex;
                results.push({
                    carousel: 'tiktok',
                    beforeIndex: beforeIndex,
                    afterIndex: afterIndex,
                    changed: beforeIndex !== afterIndex
                });
            }
            
            return results;
        });
        
        navigationTest.forEach(test => {
            console.log(`  ${test.carousel}: ${test.beforeIndex} → ${test.afterIndex} ${test.changed ? '✅ Changed' : '❌ No change'}`);
        });
        
        console.log('\n⏰ XL TIMER SYSTEM CHECK:');
        const xlStatus = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return {
                xlButtonExists: !!xlButton,
                xlButtonAvailable: xlButton ? xlButton.classList.contains('available') : false,
                xlButtonSoldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                xlButtonText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found',
                xlButtonDisabled: xlButton ? xlButton.disabled : false,
                popupExists: !!document.getElementById('xl-soldout-overlay')
            };
        });
        
        console.log(`  XL Button exists: ${xlStatus.xlButtonExists ? '✅' : '❌'}`);
        console.log(`  XL Button available: ${xlStatus.xlButtonAvailable ? '✅' : '❌'}`);
        console.log(`  XL Button text: "${xlStatus.xlButtonText}"`);
        console.log(`  XL Button disabled: ${xlStatus.xlButtonDisabled ? '✅' : '❌'}`);
        console.log(`  Popup exists: ${xlStatus.popupExists ? '✅' : '❌'}`);
        
        console.log('\n📸 Taking initial state screenshot...');
        await page.screenshot({ path: 'debug-initial-state.png', fullPage: true });
        
        console.log('\n⏰ TESTING 13-SECOND XL TIMER...');
        console.log('   Waiting exactly 13 seconds...');
        
        // Wait exactly 13 seconds
        await new Promise(resolve => setTimeout(resolve, 13000));
        
        console.log('\n🚨 CHECKING AFTER 13 SECONDS:');
        const after13Seconds = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.getElementById('xl-soldout-overlay');
            
            return {
                popupExists: !!popup,
                popupVisible: popup ? getComputedStyle(popup).display !== 'none' : false,
                xlButtonSoldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                xlButtonText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found',
                xlButtonDisabled: xlButton ? xlButton.disabled : false,
                popupHTML: popup ? popup.innerHTML.substring(0, 200) + '...' : 'No popup'
            };
        });
        
        console.log(`  Popup exists: ${after13Seconds.popupExists ? '✅' : '❌'}`);
        console.log(`  Popup visible: ${after13Seconds.popupVisible ? '✅' : '❌'}`);
        console.log(`  XL sold out: ${after13Seconds.xlButtonSoldOut ? '✅' : '❌'}`);
        console.log(`  XL text: "${after13Seconds.xlButtonText}"`);
        console.log(`  XL disabled: ${after13Seconds.xlButtonDisabled ? '✅' : '❌'}`);
        
        console.log('\n📸 Taking post-timer screenshot...');
        await page.screenshot({ path: 'debug-after-timer.png', fullPage: true });
        
        // Test popup interaction
        if (after13Seconds.popupExists) {
            console.log('\n🧪 TESTING POPUP CLOSE FUNCTIONALITY...');
            await page.evaluate(() => {
                const closeButton = document.querySelector('#xl-soldout-overlay button');
                if (closeButton) {
                    closeButton.click();
                    console.log('✅ Popup close button clicked');
                }
            });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const popupClosed = await page.evaluate(() => {
                return !document.getElementById('xl-soldout-overlay');
            });
            
            console.log(`  Popup closed: ${popupClosed ? '✅' : '❌'}`);
        }
        
        console.log('\n🏆 COMPREHENSIVE DEBUG SUMMARY:');
        console.log('===============================');
        
        const storyImagesOk = carouselAnalysis.story.slides.every(slide => !slide.hasImage || slide.imageLoaded);
        const tiktokImagesOk = carouselAnalysis.tiktok.slides.every(slide => !slide.hasImage || slide.imageLoaded);
        const trustpilotImagesOk = carouselAnalysis.trustpilot.slides.every(slide => !slide.hasImage || slide.imageLoaded);
        const carouselsNavigate = navigationTest.every(test => test.changed);
        const xlTimerWorks = after13Seconds.popupExists && after13Seconds.xlButtonSoldOut;
        
        console.log(`1. Story carousel images: ${storyImagesOk ? '✅' : '❌'}`);
        console.log(`2. TikTok carousel images: ${tiktokImagesOk ? '✅' : '❌'}`);
        console.log(`3. Trustpilot carousel images: ${trustpilotImagesOk ? '✅' : '❌'}`);
        console.log(`4. Carousel navigation: ${carouselsNavigate ? '✅' : '❌'}`);
        console.log(`5. 13-second XL timer: ${xlTimerWorks ? '✅' : '❌'}`);
        console.log(`6. Popup overlay: ${after13Seconds.popupExists && after13Seconds.popupVisible ? '✅' : '❌'}`);
        
        const allSystemsGood = storyImagesOk && tiktokImagesOk && trustpilotImagesOk && carouselsNavigate && xlTimerWorks;
        console.log(`\n🎯 OVERALL STATUS: ${allSystemsGood ? '🏆 FERRARI LEVEL!' : '⚠️ ISSUES DETECTED'}`);
        
        if (!allSystemsGood) {
            console.log('\n🔧 ISSUES TO FIX:');
            if (!storyImagesOk) console.log('   - Story carousel image loading');
            if (!tiktokImagesOk) console.log('   - TikTok carousel image loading');
            if (!trustpilotImagesOk) console.log('   - Trustpilot carousel image loading');
            if (!carouselsNavigate) console.log('   - Carousel navigation functionality');
            if (!xlTimerWorks) console.log('   - XL timer and popup system');
        }
        
        console.log('\n🔍 Browser staying open for manual inspection...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error during debugging:', error);
    } finally {
        await browser.close();
    }
}

comprehensiveDebug();