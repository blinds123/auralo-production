const puppeteer = require('puppeteer');

async function debugCarousels() {
    console.log('🔍 CAROUSEL DEBUGGING SESSION');
    console.log('============================');
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Enable console logging
        page.on('console', msg => {
            console.log('🖥️ ', msg.text());
        });
        
        console.log('🔍 Loading main page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 15000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        console.log('\n📊 CAROUSEL ELEMENT CHECK:');
        const carouselElements = await page.evaluate(() => {
            const storyCarousel = document.getElementById('storyCarousel');
            const storySlides = document.getElementById('storySlides');
            const storySlideElements = document.querySelectorAll('#storySlides .story-slide');
            
            const tiktokCarousel = document.getElementById('tiktokCarousel');
            const tiktokSlides = document.getElementById('tiktokSlides');
            const tiktokSlideElements = document.querySelectorAll('#tiktokSlides .review-slide');
            
            const trustpilotCarousel = document.getElementById('trustpilotCarousel');
            const trustpilotSlides = document.getElementById('trustpilotSlides');
            const trustpilotSlideElements = document.querySelectorAll('#trustpilotSlides .review-slide');
            
            return {
                story: {
                    container: !!storyCarousel,
                    slides: !!storySlides,
                    slideCount: storySlideElements.length,
                    slideVisibility: Array.from(storySlideElements).map(slide => ({
                        opacity: getComputedStyle(slide).opacity,
                        transform: getComputedStyle(slide).transform
                    }))
                },
                tiktok: {
                    container: !!tiktokCarousel,
                    slides: !!tiktokSlides,
                    slideCount: tiktokSlideElements.length,
                    slideVisibility: Array.from(tiktokSlideElements).map(slide => ({
                        opacity: getComputedStyle(slide).opacity,
                        transform: getComputedStyle(slide).transform
                    }))
                },
                trustpilot: {
                    container: !!trustpilotCarousel,
                    slides: !!trustpilotSlides,
                    slideCount: trustpilotSlideElements.length,
                    slideVisibility: Array.from(trustpilotSlideElements).map(slide => ({
                        opacity: getComputedStyle(slide).opacity,
                        transform: getComputedStyle(slide).transform
                    }))
                }
            };
        });
        
        console.log('Story Carousel:');
        console.log(`  Container: ${carouselElements.story.container ? '✅' : '❌'}`);
        console.log(`  Slides: ${carouselElements.story.slides ? '✅' : '❌'}`);
        console.log(`  Slide Count: ${carouselElements.story.slideCount}`);
        console.log(`  First slide visibility:`, carouselElements.story.slideVisibility[0] || 'None');
        
        console.log('\nTikTok Carousel:');
        console.log(`  Container: ${carouselElements.tiktok.container ? '✅' : '❌'}`);
        console.log(`  Slides: ${carouselElements.tiktok.slides ? '✅' : '❌'}`);
        console.log(`  Slide Count: ${carouselElements.tiktok.slideCount}`);
        console.log(`  First slide visibility:`, carouselElements.tiktok.slideVisibility[0] || 'None');
        
        console.log('\nTrustpilot Carousel:');
        console.log(`  Container: ${carouselElements.trustpilot.container ? '✅' : '❌'}`);
        console.log(`  Slides: ${carouselElements.trustpilot.slides ? '✅' : '❌'}`);
        console.log(`  Slide Count: ${carouselElements.trustpilot.slideCount}`);
        console.log(`  First slide visibility:`, carouselElements.trustpilot.slideVisibility[0] || 'None');
        
        console.log('\n🔧 CAROUSEL INSTANCE CHECK:');
        const instances = await page.evaluate(() => {
            return {
                storyCarousel: {
                    exists: typeof window.storyCarousel !== 'undefined',
                    hasNext: window.storyCarousel && typeof window.storyCarousel.next === 'function',
                    slideCount: window.storyCarousel ? window.storyCarousel.slideCount : 'N/A'
                },
                tiktokCarousel: {
                    exists: typeof window.tiktokCarousel !== 'undefined',
                    hasNext: window.tiktokCarousel && typeof window.tiktokCarousel.next === 'function',
                    slideCount: window.tiktokCarousel ? window.tiktokCarousel.slideCount : 'N/A'
                },
                trustpilotCarousel: {
                    exists: typeof window.trustpilotCarousel !== 'undefined',
                    hasNext: window.trustpilotCarousel && typeof window.trustpilotCarousel.next === 'function',
                    slideCount: window.trustpilotCarousel ? window.trustpilotCarousel.slideCount : 'N/A'
                }
            };
        });
        
        console.log('Story Instance:', instances.storyCarousel);
        console.log('TikTok Instance:', instances.tiktokCarousel);
        console.log('Trustpilot Instance:', instances.trustpilotCarousel);
        
        console.log('\n📸 Taking screenshot...');
        await page.screenshot({ path: 'carousel-debug-screenshot.png', fullPage: true });
        
        console.log('Browser staying open for inspection...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

debugCarousels();