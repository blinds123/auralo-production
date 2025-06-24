const puppeteer = require('puppeteer');
const fs = require('fs');

async function verifyPageContent() {
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    
    try {
        const page = await browser.newPage();
        
        console.log('🔍 Loading page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        console.log('📸 Taking screenshot...');
        await page.screenshot({ 
            path: 'current-page-screenshot.png',
            fullPage: true 
        });
        
        console.log('🔍 Checking for blue section...');
        const blueSectionExists = await page.evaluate(() => {
            const text = document.body.innerText || document.body.textContent;
            return text.includes('60-Second Eco-Checkout');
        });
        
        console.log('🔍 Checking for complete exchange section...');
        const completeExchangeExists = await page.evaluate(() => {
            const text = document.body.innerText || document.body.textContent;
            return text.includes('Complete Your Exchange');
        });
        
        console.log('🔍 Checking XL timer...');
        const xlTimerExists = await page.evaluate(() => {
            return window.xlTimer !== undefined;
        });
        
        console.log('🔍 Checking carousels...');
        const carouselsExist = await page.evaluate(() => {
            return {
                story: window.storyCarousel !== undefined,
                tiktok: window.tiktokCarousel !== undefined,
                trustpilot: window.trustpilotCarousel !== undefined
            };
        });
        
        console.log('🔍 Getting section elements...');
        const sections = await page.evaluate(() => {
            const processSections = document.querySelectorAll('.process-section');
            return Array.from(processSections).map(section => ({
                id: section.id,
                classes: section.className,
                title: section.querySelector('h2')?.textContent || 'No title',
                visible: section.offsetHeight > 0
            }));
        });
        
        // Generate report
        const report = {
            timestamp: new Date().toISOString(),
            url: 'http://localhost:8000/index.html',
            checks: {
                blueSectionExists,
                completeExchangeExists,
                xlTimerExists,
                carouselsExist,
                sections
            }
        };
        
        console.log('\n📊 VERIFICATION REPORT:');
        console.log('========================');
        console.log(`Blue section exists: ${blueSectionExists ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);
        console.log(`Complete exchange exists: ${completeExchangeExists ? '✅ YES (GOOD)' : '❌ NO (BAD)'}`);
        console.log(`XL timer exists: ${xlTimerExists ? '✅ YES' : '❌ NO'}`);
        console.log('Carousels:');
        console.log(`  Story: ${carouselsExist.story ? '✅ YES' : '❌ NO'}`);
        console.log(`  TikTok: ${carouselsExist.tiktok ? '✅ YES' : '❌ NO'}`);
        console.log(`  Trustpilot: ${carouselsExist.trustpilot ? '✅ YES' : '❌ NO'}`);
        console.log('\nSections found:');
        sections.forEach((section, index) => {
            console.log(`  ${index + 1}. ID: ${section.id}, Title: "${section.title}", Visible: ${section.visible}`);
        });
        
        // Save report
        fs.writeFileSync('page-verification-report.json', JSON.stringify(report, null, 2));
        
        console.log('\n✅ Screenshot saved as: current-page-screenshot.png');
        console.log('✅ Report saved as: page-verification-report.json');
        console.log('\n🔍 Browser window will stay open for manual inspection...');
        
        // Keep browser open for manual inspection
        console.log('Press Ctrl+C to close browser and exit...');
        await new Promise(() => {}); // Keep running
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

verifyPageContent();