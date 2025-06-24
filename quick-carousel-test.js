const puppeteer = require('puppeteer');

async function quickCarouselTest() {
    console.log('🧪 QUICK CAROUSEL & XL TIMER TEST');
    console.log('==================================');
    
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
        
        console.log('⏰ Waiting 8 seconds for carousels to initialize...');
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        const status = await page.evaluate(() => {
            return {
                finalImplementationMessage: 'Looking for: 🚀 STARTING FINAL WORKING IMPLEMENTATION...',
                carouselMessage: 'Looking for: 🎠 Creating working carousels...',
                xlTimerMessage: 'Looking for: ⏰ Starting 13-second XL timer...',
                storyCarousel: {
                    exists: typeof window.storyCarousel !== 'undefined',
                    hasNext: window.storyCarousel && typeof window.storyCarousel.next === 'function'
                },
                tiktokCarousel: {
                    exists: typeof window.tiktokCarousel !== 'undefined',
                    hasNext: window.tiktokCarousel && typeof window.tiktokCarousel.next === 'function'
                }
            };
        });
        
        console.log('\n📊 STATUS:');
        console.log('Story carousel exists:', status.storyCarousel.exists);
        console.log('Story carousel has next():', status.storyCarousel.hasNext);
        console.log('TikTok carousel exists:', status.tiktokCarousel.exists);
        console.log('TikTok carousel has next():', status.tiktokCarousel.hasNext);
        
        if (status.storyCarousel.hasNext) {
            console.log('\n🧪 Testing carousel navigation...');
            await page.evaluate(() => {
                window.storyCarousel.next();
                return 'Carousel next() called';
            });
        }
        
        console.log('\n⏰ Waiting 6 more seconds for 13-second timer (total 14 seconds)...');
        await new Promise(resolve => setTimeout(resolve, 6000));
        
        const xlStatus = await page.evaluate(() => {
            const popup = document.getElementById('xl-soldout-overlay');
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            
            return {
                popupExists: !!popup,
                xlSoldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                xlText: xlButton ? xlButton.querySelector('.size-status')?.textContent : 'Not found'
            };
        });
        
        console.log('\n🚨 XL TIMER STATUS:');
        console.log('Popup exists:', xlStatus.popupExists);
        console.log('XL sold out:', xlStatus.xlSoldOut);
        console.log('XL text:', xlStatus.xlText);
        
        console.log('\n📸 Taking screenshot...');
        await page.screenshot({ path: 'quick-carousel-test.png', fullPage: true });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

quickCarouselTest();