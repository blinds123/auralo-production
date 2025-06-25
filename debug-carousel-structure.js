const puppeteer = require('puppeteer');

async function debugCarouselStructure() {
    console.log('🔍 DEBUGGING CAROUSEL STRUCTURE');
    console.log('===============================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const carouselStructure = await page.evaluate(() => {
            return {
                storyCarousel: {
                    exists: !!window.storyCarousel,
                    type: typeof window.storyCarousel,
                    keys: window.storyCarousel ? Object.keys(window.storyCarousel) : [],
                    methods: window.storyCarousel ? Object.getOwnPropertyNames(window.storyCarousel) : [],
                    nextExists: window.storyCarousel ? !!window.storyCarousel.next : false,
                    prevExists: window.storyCarousel ? !!window.storyCarousel.prev : false,
                    nextType: window.storyCarousel ? typeof window.storyCarousel.next : 'undefined',
                    prevType: window.storyCarousel ? typeof window.storyCarousel.prev : 'undefined'
                },
                tiktokCarousel: {
                    exists: !!window.tiktokCarousel,
                    type: typeof window.tiktokCarousel,
                    keys: window.tiktokCarousel ? Object.keys(window.tiktokCarousel) : [],
                    nextExists: window.tiktokCarousel ? !!window.tiktokCarousel.next : false,
                    prevExists: window.tiktokCarousel ? !!window.tiktokCarousel.prev : false,
                    nextType: window.tiktokCarousel ? typeof window.tiktokCarousel.next : 'undefined',
                    prevType: window.tiktokCarousel ? typeof window.tiktokCarousel.prev : 'undefined'
                },
                trustpilotCarousel: {
                    exists: !!window.trustpilotCarousel,
                    type: typeof window.trustpilotCarousel,
                    keys: window.trustpilotCarousel ? Object.keys(window.trustpilotCarousel) : [],
                    nextExists: window.trustpilotCarousel ? !!window.trustpilotCarousel.next : false,
                    prevExists: window.trustpilotCarousel ? !!window.trustpilotCarousel.prev : false,
                    nextType: window.trustpilotCarousel ? typeof window.trustpilotCarousel.next : 'undefined',
                    prevType: window.trustpilotCarousel ? typeof window.trustpilotCarousel.prev : 'undefined'
                }
            };
        });
        
        console.log('🔍 CAROUSEL STRUCTURE ANALYSIS:');
        Object.entries(carouselStructure).forEach(([name, info]) => {
            console.log(`\n${name}:`);
            console.log(`  Exists: ${info.exists}`);
            console.log(`  Type: ${info.type}`);
            console.log(`  Keys: [${info.keys.join(', ')}]`);
            console.log(`  Next method: ${info.nextExists} (${info.nextType})`);
            console.log(`  Prev method: ${info.prevExists} (${info.prevType})`);
        });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

debugCarouselStructure();