const puppeteer = require('puppeteer');

async function quickTest() {
    console.log('🔬 QUICK CRITICAL SYSTEM TEST');
    console.log('=============================');
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Enable console logging
        page.on('console', msg => {
            console.log('🖥️ ', msg.text());
        });
        
        console.log('🔍 Loading page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 15000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('\n🔍 Looking for our initialization messages...');
        const ourInitMessages = await page.evaluate(() => {
            // Check if our functions were called
            return {
                domReady: document.readyState,
                hasXLTimerClass: typeof window.XLTimerManager !== 'undefined',
                hasUniversalCarouselClass: typeof window.UniversalCarousel !== 'undefined',
                xlTimerInstance: typeof window.xlTimer !== 'undefined'
            };
        });
        
        console.log('Debug info:', ourInitMessages);
        
        console.log('\n📊 SYSTEM STATUS CHECK:');
        const status = await page.evaluate(() => {
            return {
                blueSectionRemoved: !document.body.textContent.includes('60-Second Eco-Checkout'),
                completeExchangeExists: document.body.textContent.includes('Complete Your Exchange'),
                xlTimerExists: window.xlTimer !== undefined,
                xlTimerClass: typeof window.XLTimerManager !== 'undefined',
                universalCarousel: typeof window.UniversalCarousel !== 'undefined',
                storyCarousel: typeof window.storyCarousel !== 'undefined',
                tiktokCarousel: typeof window.tiktokCarousel !== 'undefined',
                trustpilotCarousel: typeof window.trustpilotCarousel !== 'undefined',
                xlButton: document.querySelector('.size-option[data-size="XL"]') !== null
            };
        });
        
        console.log(`✅ Blue section removed: ${status.blueSectionRemoved}`);
        console.log(`✅ Complete Your Exchange: ${status.completeExchangeExists}`);
        console.log(`✅ XL Timer exists: ${status.xlTimerExists}`);
        console.log(`✅ XL Timer class: ${status.xlTimerClass}`);
        console.log(`✅ Universal Carousel class: ${status.universalCarousel}`);
        console.log(`✅ Story carousel: ${status.storyCarousel}`);
        console.log(`✅ TikTok carousel: ${status.tiktokCarousel}`);
        console.log(`✅ Trustpilot carousel: ${status.trustpilotCarousel}`);
        console.log(`✅ XL Button exists: ${status.xlButton}`);
        
        const allGood = Object.values(status).every(v => v === true);
        console.log(`\n🎯 OVERALL: ${allGood ? '🏆 FERRARI LEVEL ACHIEVED!' : '⚠️  NEEDS ATTENTION'}`);
        
        if (!allGood) {
            const issues = Object.entries(status).filter(([key, value]) => !value).map(([key]) => key);
            console.log(`❌ Issues: ${issues.join(', ')}`);
        }
        
        console.log('\n📸 Taking screenshot...');
        await page.screenshot({ path: 'quick-test-screenshot.png', fullPage: true });
        
        console.log('Browser staying open for 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

quickTest();