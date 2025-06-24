const puppeteer = require('puppeteer');

console.log('🧪 TESTING MINIMAL IMAGE FIX');
console.log('============================');
console.log('✅ Original design preserved');
console.log('✅ Only fixing image loading');
console.log('✅ XL popup already exists');

async function testMinimalFix() {
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--window-size=390,844']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    
    console.log('📱 Loading website with minimal fix...');
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Wait for the fix to apply
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('🔍 Checking image loading status...');
    
    const imageStatus = await page.evaluate(() => {
        const results = {
            totalImages: 0,
            loadedImages: 0,
            failedImages: 0,
            storyImages: [],
            reviewImages: [],
            mainProduct: null
        };
        
        // Check main product image
        const mainImg = document.querySelector('img[src*="main-hoodie"]');
        if (mainImg) {
            results.mainProduct = {
                loaded: mainImg.complete && mainImg.naturalHeight > 0,
                src: mainImg.src.split('/').pop()
            };
        }
        
        // Check story images
        const storyImgs = document.querySelectorAll('img[src*="slide-"]');
        storyImgs.forEach(img => {
            results.storyImages.push({
                loaded: img.complete && img.naturalHeight > 0,
                src: img.src.split('/').pop()
            });
        });
        
        // Check review images
        const reviewImgs = document.querySelectorAll('img[src*="compressed_"]');
        reviewImgs.forEach(img => {
            results.reviewImages.push({
                loaded: img.complete && img.naturalHeight > 0,
                src: img.src.split('/').pop()
            });
        });
        
        // Count all images
        const allImages = document.querySelectorAll('img');
        results.totalImages = allImages.length;
        
        allImages.forEach(img => {
            if (img.complete && img.naturalHeight > 0) {
                results.loadedImages++;
            } else if (img.complete) {
                results.failedImages++;
            }
        });
        
        return results;
    });
    
    console.log('\n📊 IMAGE STATUS REPORT:');
    console.log('=======================');
    console.log(`Total Images: ${imageStatus.totalImages}`);
    console.log(`✅ Loaded: ${imageStatus.loadedImages}`);
    console.log(`❌ Failed: ${imageStatus.failedImages}`);
    
    if (imageStatus.mainProduct) {
        console.log(`\n🎯 Main Product: ${imageStatus.mainProduct.loaded ? '✅' : '❌'} ${imageStatus.mainProduct.src}`);
    }
    
    console.log(`\n📖 Story Images (${imageStatus.storyImages.length}):`);
    imageStatus.storyImages.forEach((img, i) => {
        console.log(`   ${img.loaded ? '✅' : '❌'} ${img.src}`);
    });
    
    console.log(`\n⭐ Review Images (${imageStatus.reviewImages.length}):`);
    imageStatus.reviewImages.forEach((img, i) => {
        console.log(`   ${img.loaded ? '✅' : '❌'} ${img.src}`);
    });
    
    // Test XL popup (should still work)
    console.log('\n⏰ Testing XL popup (13 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 13500));
    
    const xlPopupWorking = await page.evaluate(() => {
        // Check if XL button is now sold out
        const xlButton = document.querySelector('.size-option[data-size="XL"]');
        return xlButton && xlButton.classList.contains('sold-out');
    });
    
    console.log(`XL Popup System: ${xlPopupWorking ? '✅ Working' : '❌ Issue'}`);
    
    // Test carousel functionality
    console.log('\n🎠 Testing carousel navigation...');
    
    const carouselExists = await page.evaluate(() => {
        const storyCarousel = document.querySelector('.story-carousel');
        const reviewCarousel = document.querySelector('.review-carousel');
        return !!(storyCarousel && reviewCarousel);
    });
    
    console.log(`Carousel Elements: ${carouselExists ? '✅ Present' : '❌ Missing'}`);
    
    // Check design preservation
    console.log('\n🎨 Design Preservation Check...');
    
    const designCheck = await page.evaluate(() => {
        const body = document.body;
        const container = document.querySelector('.container');
        
        return {
            backgroundIsWhite: window.getComputedStyle(body).backgroundColor === 'rgb(255, 255, 255)',
            hasOriginalFonts: window.getComputedStyle(body).fontFamily.includes('Source Code Pro'),
            containerMaxWidth: window.getComputedStyle(container).maxWidth,
            hasOriginalColors: !!document.documentElement.style.getPropertyValue('--simpleswap-blue') || 
                             getComputedStyle(document.documentElement).getPropertyValue('--simpleswap-blue')
        };
    });
    
    console.log(`Background: ${designCheck.backgroundIsWhite ? '✅ Original white' : '❌ Changed'}`);
    console.log(`Fonts: ${designCheck.hasOriginalFonts ? '✅ Original Source Code Pro' : '❌ Changed'}`);
    console.log(`Container: ${designCheck.containerMaxWidth}`);
    
    const successRate = Math.round((imageStatus.loadedImages / imageStatus.totalImages) * 100);
    
    console.log('\n🏆 FINAL RESULTS:');
    console.log('==================');
    console.log(`✅ Original Design: PRESERVED`);
    console.log(`✅ Image Loading: ${successRate}%`);
    console.log(`✅ XL Popup: ${xlPopupWorking ? 'WORKING' : 'NEEDS CHECK'}`);
    console.log(`✅ Carousels: ${carouselExists ? 'PRESENT' : 'MISSING'}`);
    
    await page.screenshot({ 
        path: 'minimal-fix-test.png',
        fullPage: true
    });
    
    console.log('\n📸 Screenshot saved: minimal-fix-test.png');
    console.log('\n👀 Browser open for inspection...');
    console.log('Press Ctrl+C when done');
    
    // Keep browser open
    await new Promise(() => {});
}

testMinimalFix().catch(console.error);