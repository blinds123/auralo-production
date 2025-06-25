const puppeteer = require('puppeteer');

async function runLoop3NuclearTest() {
    console.log('💥 LOOP 3 NUCLEAR TEST - DIRECT IMPLEMENTATION VALIDATION');
    console.log('=========================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
        // Enable console logs from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        console.log('🌐 Loading Nuclear Loop 3 implementation...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // NUCLEAR TEST 1: SCRIPT EXECUTION VERIFICATION
        console.log('\n💥 NUCLEAR TEST 1: SCRIPT EXECUTION VERIFICATION');
        console.log('===============================================');
        
        const scriptExecutionTest = await page.evaluate(() => {
            return {
                nextStorySlideType: typeof window.nextStorySlide,
                prevStorySlideType: typeof window.prevStorySlide,
                nextReviewSlideType: typeof window.nextReviewSlide,
                prevReviewSlideType: typeof window.prevReviewSlide,
                nextTrustpilotSlideType: typeof window.nextTrustpilotSlide,
                prevTrustpilotSlideType: typeof window.prevTrustpilotSlide,
                functionsExist: typeof window.nextStorySlide === 'function' &&
                               typeof window.prevStorySlide === 'function' &&
                               typeof window.nextReviewSlide === 'function' &&
                               typeof window.prevReviewSlide === 'function' &&
                               typeof window.nextTrustpilotSlide === 'function' &&
                               typeof window.prevTrustpilotSlide === 'function'
            };
        });
        
        console.log('💥 Nuclear Functions Status:');
        console.log(`   nextStorySlide: ${scriptExecutionTest.nextStorySlideType}`);
        console.log(`   prevStorySlide: ${scriptExecutionTest.prevStorySlideType}`);
        console.log(`   nextReviewSlide: ${scriptExecutionTest.nextReviewSlideType}`);
        console.log(`   prevReviewSlide: ${scriptExecutionTest.prevReviewSlideType}`);
        console.log(`   nextTrustpilotSlide: ${scriptExecutionTest.nextTrustpilotSlideType}`);
        console.log(`   prevTrustpilotSlide: ${scriptExecutionTest.prevTrustpilotSlideType}`);
        
        const functionsWork = scriptExecutionTest.functionsExist;
        console.log(`🎯 NUCLEAR FUNCTIONS: ${functionsWork ? '✅ INSTALLED' : '❌ FAILED'}`);
        
        // NUCLEAR TEST 2: CAROUSEL NAVIGATION TEST
        console.log('\n🎠 NUCLEAR TEST 2: CAROUSEL NAVIGATION');
        console.log('====================================');
        
        // Scroll to story carousel
        await page.evaluate(() => {
            const carousel = document.querySelector('.story-carousel');
            if (carousel) {
                carousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get initial carousel state
        const initialState = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                initialTransform: storySlides ? getComputedStyle(storySlides).transform : 'none',
                carouselExists: !!window.storyCarousel,
                carouselType: typeof window.storyCarousel
            };
        });
        
        console.log(`📍 Story Carousel Exists: ${initialState.carouselExists} (${initialState.carouselType})`);
        console.log(`📍 Initial Transform: ${initialState.initialTransform}`);
        
        // Test clicking the nuclear function directly
        console.log('🖱️  Testing direct nuclear function call...');
        await page.evaluate(() => {
            if (window.nextStorySlide) {
                window.nextStorySlide();
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check post-click state
        const postClickState = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                postClickTransform: storySlides ? getComputedStyle(storySlides).transform : 'none'
            };
        });
        
        console.log(`📍 After Function Call: ${postClickState.postClickTransform}`);
        
        // Test clicking the actual button
        console.log('🖱️  Testing button click...');
        await page.click('.story-carousel .carousel-nav-right');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const postButtonState = await page.evaluate(() => {
            const storySlides = document.querySelector('.story-slides');
            return {
                postButtonTransform: storySlides ? getComputedStyle(storySlides).transform : 'none'
            };
        });
        
        console.log(`📍 After Button Click: ${postButtonState.postButtonTransform}`);
        
        const carouselWorking = postButtonState.postButtonTransform !== initialState.initialTransform ||
                              postClickState.postClickTransform !== initialState.initialTransform;
        
        console.log(`🎯 NUCLEAR CAROUSEL: ${carouselWorking ? '✅ WORKING' : '❌ FAILED'}`);
        
        // NUCLEAR TEST 3: XL TIMER TEST (16 SECONDS)
        console.log('\n⏰ NUCLEAR TEST 3: XL TIMER (16 seconds wait)');
        console.log('===========================================');
        
        const xlInitialState = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return {
                xlButtonText: xlButton ? xlButton.textContent.trim() : 'not found',
                xlButtonClasses: xlButton ? Array.from(xlButton.classList) : [],
                xlButtonDisabled: xlButton ? xlButton.disabled : null
            };
        });
        
        console.log(`⏰ XL Initial: "${xlInitialState.xlButtonText}" - ${xlInitialState.xlButtonClasses.join(', ')}`);
        console.log(`⏰ XL Disabled: ${xlInitialState.xlButtonDisabled}`);
        
        console.log('⏱️  Waiting 16 seconds for nuclear XL timer...');
        await new Promise(resolve => setTimeout(resolve, 16000));
        
        const xlFinalState = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            const popup = document.querySelector('.xl-nuclear-popup');
            
            return {
                xlButtonText: xlButton ? xlButton.textContent.trim() : 'not found',
                xlButtonClasses: xlButton ? Array.from(xlButton.classList) : [],
                xlButtonDisabled: xlButton ? xlButton.disabled : null,
                nuclearPopupExists: !!popup,
                nuclearPopupVisible: popup ? (popup.style.display !== 'none' && 
                                            getComputedStyle(popup).display !== 'none') : false,
                popupContent: popup ? popup.textContent.trim().substring(0, 50) + '...' : 'no popup'
            };
        });
        
        console.log(`🔥 XL Final: "${xlFinalState.xlButtonText}" - ${xlFinalState.xlButtonClasses.join(', ')}`);
        console.log(`🔥 XL Disabled: ${xlFinalState.xlButtonDisabled}`);
        console.log(`🔥 Nuclear Popup: ${xlFinalState.nuclearPopupExists} - Visible: ${xlFinalState.nuclearPopupVisible}`);
        console.log(`🔥 Popup Content: ${xlFinalState.popupContent}`);
        
        const xlTimerWorking = xlFinalState.xlButtonText.includes('Sold Out') || 
                              xlFinalState.nuclearPopupExists ||
                              xlFinalState.xlButtonClasses.includes('sold-out');
        
        console.log(`🎯 NUCLEAR XL TIMER: ${xlTimerWorking ? '✅ WORKING' : '❌ FAILED'}`);
        
        // FINAL NUCLEAR RESULTS
        console.log('\n💥 LOOP 3 NUCLEAR RESULTS');
        console.log('=========================');
        
        const nuclearResults = {
            scriptExecution: functionsWork,
            carouselNavigation: carouselWorking,
            xlTimer: xlTimerWorking
        };
        
        Object.entries(nuclearResults).forEach(([feature, working]) => {
            console.log(`${working ? '✅' : '❌'} ${feature}: ${working ? 'NUCLEAR SUCCESS' : 'NUCLEAR FAILED'}`);
        });
        
        const nuclearSuccess = Object.values(nuclearResults).filter(Boolean).length;
        const totalTests = Object.keys(nuclearResults).length;
        
        console.log(`\n🎯 NUCLEAR SCORE: ${nuclearSuccess}/${totalTests} (${Math.round(nuclearSuccess/totalTests*100)}%)`);
        
        if (nuclearSuccess === totalTests) {
            console.log('🎉 NUCLEAR APPROACH SUCCESS - ALL CRITICAL FEATURES WORKING!');
            console.log('🚀 READY FOR FINAL FULL VALIDATION TEST');
        } else {
            console.log('⚠️  NUCLEAR APPROACH PARTIAL SUCCESS - SOME ISSUES REMAIN');
        }
        
        // Take screenshot
        await page.screenshot({ 
            path: 'loop3-nuclear-test-results.png',
            fullPage: true
        });
        
        console.log('\n📸 Screenshot saved: loop3-nuclear-test-results.png');
        console.log('💥 Nuclear test complete!');
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
    } catch (error) {
        console.error('❌ Error during Nuclear test:', error);
    } finally {
        await browser.close();
        console.log('🔚 Nuclear test browser closed');
    }
}

runLoop3NuclearTest();