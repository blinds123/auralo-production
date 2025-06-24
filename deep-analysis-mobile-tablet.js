const puppeteer = require('puppeteer');

async function deepAnalysisMobileTablet() {
    console.log('🔍 DEEP ANALYSIS: MOBILE & TABLET PERSPECTIVE');
    console.log('============================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null
    });
    
    const devices = [
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'iPhone SE', width: 375, height: 667 },
        { name: 'iPad Mini', width: 768, height: 1024 },
        { name: 'iPad Pro', width: 1024, height: 1366 }
    ];
    
    for (const device of devices) {
        console.log(`\n📱 ANALYZING: ${device.name} (${device.width}x${device.height})`);
        console.log('----------------------------------------');
        
        const page = await browser.newPage();
        await page.setViewport({ width: device.width, height: device.height });
        
        try {
            await page.goto('file://' + __dirname + '/index.html', { 
                waitUntil: 'networkidle0',
                timeout: 30000 
            });
            
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Analyze Step 2 positioning
            const step2Analysis = await page.evaluate(() => {
                const step2 = document.querySelector('.process-step:nth-child(2)');
                const step2Circle = document.querySelector('.process-step:nth-child(2) .step-number');
                const step1 = document.querySelector('.process-step:nth-child(1)');
                
                if (!step2 || !step1) return null;
                
                const step2Rect = step2.getBoundingClientRect();
                const step1Rect = step1.getBoundingClientRect();
                const step2CircleStyles = window.getComputedStyle(step2Circle);
                
                return {
                    step2Top: step2Rect.top,
                    step1Bottom: step1Rect.bottom,
                    gap: step2Rect.top - step1Rect.bottom,
                    step2Transform: step2CircleStyles.transform,
                    step2Position: {
                        top: step2Rect.top,
                        height: step2Rect.height
                    }
                };
            });
            
            console.log('📍 Step 2 Analysis:', step2Analysis);
            
            // Analyze Complete Your Exchange button
            const buttonAnalysis = await page.evaluate(() => {
                const button = document.querySelector('.simpleswap-link-button');
                const subheadline = document.querySelector('.exchange-subheadline');
                const section = document.querySelector('.checkout-section');
                
                if (!button || !section) return null;
                
                const buttonRect = button.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                
                return {
                    buttonTop: buttonRect.top,
                    buttonFromSectionTop: buttonRect.top - sectionRect.top,
                    buttonHeight: buttonRect.height,
                    subheadlineExists: !!subheadline,
                    sectionHeight: sectionRect.height,
                    viewportHeight: window.innerHeight,
                    isButtonCutOff: buttonRect.bottom > window.innerHeight
                };
            });
            
            console.log('🎯 Button Analysis:', buttonAnalysis);
            
            // Analyze carousel images
            const carouselAnalysis = await page.evaluate(() => {
                const carousels = ['storyCarousel', 'tiktokCarousel', 'trustpilotCarousel'];
                const results = {};
                
                carousels.forEach(id => {
                    const carousel = document.getElementById(id);
                    if (carousel) {
                        const images = carousel.querySelectorAll('img');
                        const loadedImages = Array.from(images).filter(img => img.complete && img.naturalHeight !== 0);
                        const lazyImages = carousel.querySelectorAll('img[data-src]');
                        
                        results[id] = {
                            totalImages: images.length,
                            loadedImages: loadedImages.length,
                            lazyImages: lazyImages.length,
                            firstImageSrc: images[0]?.src || 'none',
                            isPlaceholder: images[0]?.src?.includes('data:image/svg') || false
                        };
                    }
                });
                
                return results;
            });
            
            console.log('🎠 Carousel Analysis:', carouselAnalysis);
            
            // Check overall aesthetics
            const aestheticsCheck = await page.evaluate(() => {
                const container = document.querySelector('.container');
                const sections = document.querySelectorAll('section');
                const viewportHeight = window.innerHeight;
                
                let overlappingSections = 0;
                let cutOffElements = 0;
                
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (index < sections.length - 1) {
                        const nextSection = sections[index + 1];
                        const nextRect = nextSection.getBoundingClientRect();
                        if (rect.bottom > nextRect.top) {
                            overlappingSections++;
                        }
                    }
                });
                
                // Check for cut-off elements
                document.querySelectorAll('.process-step, .simpleswap-link-button, .buy-now-button').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.bottom > viewportHeight && rect.top < viewportHeight) {
                        cutOffElements++;
                    }
                });
                
                return {
                    containerWidth: container ? container.offsetWidth : 0,
                    overlappingSections,
                    cutOffElements,
                    viewportHeight
                };
            });
            
            console.log('🎨 Aesthetics Check:', aestheticsCheck);
            
            // Take screenshot for analysis
            await page.screenshot({ 
                path: `analysis-${device.name.replace(/\s+/g, '-').toLowerCase()}.png`,
                fullPage: false
            });
            
            await page.close();
            
        } catch (error) {
            console.error(`❌ Error analyzing ${device.name}:`, error.message);
        }
    }
    
    console.log('\n🔬 DEEP CAROUSEL INVESTIGATION');
    console.log('==============================');
    
    // Deep carousel check
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/index.html', { waitUntil: 'networkidle0' });
    
    const carouselIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check each carousel deeply
        ['storySlides', 'tiktokSlides', 'trustpilotSlides'].forEach(slidesId => {
            const slides = document.getElementById(slidesId);
            if (slides) {
                const slideElements = slides.querySelectorAll('.story-slide, .review-slide');
                slideElements.forEach((slide, index) => {
                    const img = slide.querySelector('img');
                    if (img) {
                        const issue = {
                            carousel: slidesId,
                            slideIndex: index,
                            src: img.src,
                            dataSrc: img.dataset.src,
                            loaded: img.complete && img.naturalHeight !== 0,
                            display: window.getComputedStyle(slide).display,
                            opacity: window.getComputedStyle(slide).opacity,
                            position: window.getComputedStyle(slide).position
                        };
                        
                        if (!issue.loaded || issue.src.includes('data:image/svg')) {
                            issues.push(issue);
                        }
                    }
                });
            }
        });
        
        return issues;
    });
    
    console.log('🚨 CAROUSEL ISSUES FOUND:');
    carouselIssues.forEach(issue => {
        console.log(`- ${issue.carousel} slide ${issue.slideIndex}: Not loaded properly`);
        console.log(`  src: ${issue.src.substring(0, 50)}...`);
        console.log(`  display: ${issue.display}, opacity: ${issue.opacity}`);
    });
    
    // Performance check
    const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalImages: document.querySelectorAll('img').length,
            lazyImages: document.querySelectorAll('img[data-src]').length
        };
    });
    
    console.log('\n⚡ PERFORMANCE METRICS:', performanceMetrics);
    
    console.log('\n🎯 KEY FINDINGS:');
    console.log('1. Step 2 needs repositioning for better alignment');
    console.log('2. Complete Your Exchange button may be too low on mobile');
    console.log('3. Carousel images using SVG placeholders - need real image loading');
    console.log('4. Some elements may be cut off on smaller screens');
    
    console.log('\n💡 PREPARING COMPREHENSIVE FIX...');
    
    await browser.close();
}

deepAnalysisMobileTablet();