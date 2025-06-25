const puppeteer = require('puppeteer');

async function verifyNuclearDeployment(url = 'https://auralo-production-lmbx.vercel.app') {
    console.log('🔍 VERIFYING NUCLEAR DEPLOYMENT');
    console.log('==============================');
    console.log(`Testing: ${url}`);
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Check for nuclear implementation
        const nuclearCheck = await page.evaluate(() => {
            const hasNuclear = document.body.innerHTML.includes('NUCLEAR APPROACH');
            const hasXLTimer = typeof window.nextStorySlide === 'function';
            const hasCarousels = document.querySelectorAll('.carousel-nav').length > 0;
            const hasHotspots = document.querySelectorAll('.hotspot').length >= 8;
            const hasXLButton = !!document.querySelector('.size-option[data-size="XL"]');
            
            return {
                nuclearImplementation: hasNuclear,
                navigationFunctions: hasXLTimer,
                carouselButtons: hasCarousels,
                blueHotspots: hasHotspots,
                xlButton: hasXLButton,
                pageTitle: document.title
            };
        });
        
        console.log('\n📊 DEPLOYMENT VERIFICATION RESULTS:');
        console.log('===================================');
        console.log(`🚀 Nuclear Implementation: ${nuclearCheck.nuclearImplementation ? '✅ DEPLOYED' : '❌ MISSING'}`);
        console.log(`🎠 Navigation Functions: ${nuclearCheck.navigationFunctions ? '✅ ACTIVE' : '❌ MISSING'}`);
        console.log(`🔘 Carousel Buttons: ${nuclearCheck.carouselButtons ? '✅ PRESENT' : '❌ MISSING'}`);
        console.log(`💙 Blue Hotspots: ${nuclearCheck.blueHotspots ? '✅ ACTIVE' : '❌ MISSING'}`);
        console.log(`⏰ XL Button: ${nuclearCheck.xlButton ? '✅ PRESENT' : '❌ MISSING'}`);
        console.log(`📄 Page Title: ${nuclearCheck.pageTitle}`);
        
        const allFeatures = Object.values(nuclearCheck).slice(0, 5).every(Boolean);
        
        if (allFeatures) {
            console.log('\n🎉 NUCLEAR DEPLOYMENT SUCCESSFUL!');
            console.log('All 6 features are live and working!');
        } else {
            console.log('\n⚠️ DEPLOYMENT INCOMPLETE');
            console.log('Some nuclear features are missing - may need to redeploy');
        }
        
    } catch (error) {
        console.log(`❌ Error accessing ${url}: ${error.message}`);
    } finally {
        await browser.close();
    }
}

// Run verification
verifyNuclearDeployment();