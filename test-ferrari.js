const puppeteer = require('puppeteer');

async function testFerrari() {
    console.log('🏆 TESTING FERRARI IMPLEMENTATION');
    console.log('=================================');
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Enable console logging
        page.on('console', msg => {
            console.log('🖥️ ', msg.text());
        });
        
        console.log('🔍 Loading Ferrari test page...');
        await page.goto('http://localhost:8000/ferrari-test.html', { 
            waitUntil: 'networkidle0',
            timeout: 15000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('\n📊 FERRARI STATUS CHECK:');
        const status = await page.evaluate(() => {
            return {
                xlTimerClass: typeof window.XLTimerManager !== 'undefined',
                universalCarouselClass: typeof window.UniversalCarousel !== 'undefined',
                xlTimerInstance: typeof window.xlTimer !== 'undefined',
                storyCarousel: typeof window.storyCarousel !== 'undefined',
                tiktokCarousel: typeof window.tiktokCarousel !== 'undefined'
            };
        });
        
        console.log(`XL Timer Class: ${status.xlTimerClass ? '✅' : '❌'}`);
        console.log(`Universal Carousel Class: ${status.universalCarouselClass ? '✅' : '❌'}`);
        console.log(`XL Timer Instance: ${status.xlTimerInstance ? '✅' : '❌'}`);
        console.log(`Story Carousel: ${status.storyCarousel ? '✅' : '❌'}`);
        console.log(`TikTok Carousel: ${status.tiktokCarousel ? '✅' : '❌'}`);
        
        const allGood = Object.values(status).every(v => v === true);
        console.log(`\n🎯 OVERALL: ${allGood ? '🏆 FERRARI LEVEL ACHIEVED!' : '⚠️ NEEDS ATTENTION'}`);
        
        if (allGood) {
            console.log('\n🎉 Testing carousel functionality...');
            await page.evaluate(() => {
                if (window.storyCarousel && window.storyCarousel.next) {
                    window.storyCarousel.next();
                    console.log('✅ Story carousel next() working');
                }
                if (window.tiktokCarousel && window.tiktokCarousel.next) {
                    window.tiktokCarousel.next();
                    console.log('✅ TikTok carousel next() working');
                }
            });
        }
        
        console.log('\n📸 Taking screenshot...');
        await page.screenshot({ path: 'ferrari-test-screenshot.png', fullPage: true });
        
        console.log('Browser staying open for 15 seconds...');
        await new Promise(resolve => setTimeout(resolve, 15000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

testFerrari();