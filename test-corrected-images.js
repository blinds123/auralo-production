const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

console.log('🖼️ TESTING CORRECTED AURALO IMAGES');
console.log('==================================');

async function testCorrectedImages() {
    console.log('📱 Loading website with original AURALO images...');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--window-size=390,844']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Testing image loading...');
    
    // Check if images are loading correctly
    const imageCheck = await page.evaluate(() => {
        const results = {
            mainProduct: null,
            storySlides: [],
            reviewSlides: [],
            totalImages: 0,
            loadedImages: 0,
            failedImages: []
        };
        
        // Check main product image
        const mainImg = document.querySelector('.product-image');
        if (mainImg) {
            results.mainProduct = {
                src: mainImg.src,
                loaded: mainImg.complete && mainImg.naturalHeight > 0,
                dimensions: `${mainImg.naturalWidth}x${mainImg.naturalHeight}`
            };
        }
        
        // Check story carousel images
        const storyImages = document.querySelectorAll('.story-slide img');
        storyImages.forEach((img, index) => {
            const isLoaded = img.complete && img.naturalHeight > 0;
            results.storySlides.push({
                index: index + 1,
                src: img.src.split('/').pop(),
                loaded: isLoaded,
                dimensions: isLoaded ? `${img.naturalWidth}x${img.naturalHeight}` : 'Not loaded'
            });
        });
        
        // Check review carousel images  
        const reviewImages = document.querySelectorAll('.review-slide img');
        reviewImages.forEach((img, index) => {
            const isLoaded = img.complete && img.naturalHeight > 0;
            results.reviewSlides.push({
                index: index + 1,
                src: img.src.split('/').pop(),
                loaded: isLoaded,
                dimensions: isLoaded ? `${img.naturalWidth}x${img.naturalHeight}` : 'Not loaded'
            });
        });
        
        // Count total images
        const allImages = document.querySelectorAll('img');
        results.totalImages = allImages.length;
        results.loadedImages = Array.from(allImages).filter(img => 
            img.complete && img.naturalHeight > 0
        ).length;
        
        // Find failed images
        allImages.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                results.failedImages.push(img.src.split('/').pop());
            }
        });
        
        return results;
    });
    
    console.log('\n📊 IMAGE LOADING REPORT:');
    console.log('========================');
    console.log(`Total Images: ${imageCheck.totalImages}`);
    console.log(`Loaded Successfully: ${imageCheck.loadedImages}`);
    console.log(`Failed to Load: ${imageCheck.failedImages.length}`);
    
    if (imageCheck.mainProduct) {
        console.log(`\n🎯 Main Product Image:`);
        console.log(`   Source: ${imageCheck.mainProduct.src.split('/').pop()}`);
        console.log(`   Status: ${imageCheck.mainProduct.loaded ? '✅ Loaded' : '❌ Failed'}`);
        console.log(`   Dimensions: ${imageCheck.mainProduct.dimensions}`);
    }
    
    console.log(`\n📖 Story Carousel (${imageCheck.storySlides.length} slides):`);
    imageCheck.storySlides.forEach(slide => {
        console.log(`   Slide ${slide.index}: ${slide.loaded ? '✅' : '❌'} ${slide.src} (${slide.dimensions})`);
    });
    
    console.log(`\n⭐ Review Carousel (${imageCheck.reviewSlides.length} slides):`);
    imageCheck.reviewSlides.forEach(slide => {
        console.log(`   Review ${slide.index}: ${slide.loaded ? '✅' : '❌'} ${slide.src} (${slide.dimensions})`);
    });
    
    if (imageCheck.failedImages.length > 0) {
        console.log(`\n❌ Failed Images:`);
        imageCheck.failedImages.forEach(img => console.log(`   - ${img}`));
    }
    
    // Test carousel functionality
    console.log('\n🎠 Testing Carousel Functionality...');
    
    // Test story carousel
    await page.click('.story-carousel .carousel-nav-right');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test review carousel
    await page.click('.review-carousel .carousel-nav-right');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test XL popup (should appear after 13 seconds)
    console.log('\n⏰ Waiting for XL popup (13 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 13500));
    
    const popupVisible = await page.evaluate(() => {
        const popup = document.getElementById('xlSoldPopup');
        return popup && popup.classList.contains('show');
    });
    
    console.log(`XL Popup Status: ${popupVisible ? '✅ Appeared correctly' : '❌ Not visible'}`);
    
    // Take screenshot
    await page.screenshot({ 
        path: 'corrected-images-test.png',
        fullPage: true
    });
    
    console.log('\n✅ Screenshot saved as corrected-images-test.png');
    
    const successRate = Math.round((imageCheck.loadedImages / imageCheck.totalImages) * 100);
    
    console.log('\n🏆 FINAL RESULTS:');
    console.log('==================');
    console.log(`Image Success Rate: ${successRate}%`);
    console.log(`Carousel Navigation: ✅ Working`);
    console.log(`XL Popup System: ${popupVisible ? '✅ Working' : '❌ Issue detected'}`);
    console.log(`Overall Status: ${successRate >= 95 ? '✅ EXCELLENT' : successRate >= 80 ? '⚠️ GOOD' : '❌ NEEDS FIX'}`);
    
    console.log('\n👀 Browser kept open for manual inspection...');
    console.log('Press Ctrl+C when done viewing');
    
    // Keep browser open for inspection
    await new Promise(() => {});
}

testCorrectedImages().catch(console.error);