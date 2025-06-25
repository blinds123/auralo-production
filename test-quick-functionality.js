#!/usr/bin/env node

/**
 * QUICK AURALO FUNCTIONALITY TEST
 * Fast validation of core features
 */

const puppeteer = require('puppeteer');
const path = require('path');

async function quickTest() {
    console.log('🚀 AURALO QUICK FUNCTIONALITY TEST');
    console.log('===================================');
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1200, height: 800 },
            args: ['--no-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Enable console logging
        page.on('console', msg => {
            if (msg.type() === 'log') {
                console.log(`  [Browser] ${msg.text()}`);
            }
        });
        
        console.log('📱 Loading website...');
        await page.goto('file://' + path.resolve(__dirname, 'index.html'), {
            waitUntil: 'networkidle0',
            timeout: 10000
        });
        
        // Wait for initialization
        await page.waitForTimeout(2000);
        
        console.log('🎠 Testing carousel navigation...');
        // Test story carousel navigation
        const storyRightBtn = await page.$('#storyCarousel .carousel-nav-right');
        if (storyRightBtn) {
            await storyRightBtn.click();
            console.log('  ✅ Story carousel right button clicked');
            await page.waitForTimeout(500);
        } else {
            console.log('  ❌ Story carousel button not found');
        }
        
        // Test review carousel navigation  
        const reviewRightBtn = await page.$('#tiktokCarousel .carousel-nav-right');
        if (reviewRightBtn) {
            await reviewRightBtn.click();
            console.log('  ✅ Review carousel right button clicked');
            await page.waitForTimeout(500);
        } else {
            console.log('  ❌ Review carousel button not found');
        }
        
        console.log('📏 Testing size chart...');
        const sizeChartToggle = await page.$('.chart-toggle');
        if (sizeChartToggle) {
            await sizeChartToggle.click();
            console.log('  ✅ Size chart toggle clicked');
            await page.waitForTimeout(500);
        } else {
            console.log('  ❌ Size chart toggle not found');
        }
        
        console.log('🏪 Testing store availability...');
        const storeToggle = await page.$('.availability-header');
        if (storeToggle) {
            await storeToggle.click();
            console.log('  ✅ Store availability toggle clicked');
            await page.waitForTimeout(500);
        } else {
            console.log('  ❌ Store availability toggle not found');
        }
        
        console.log('🛒 Testing buy button scroll...');
        const buyButton = await page.$('.buy-now-button');
        if (buyButton) {
            await buyButton.click();
            console.log('  ✅ Buy button clicked - checking scroll');
            await page.waitForTimeout(1000);
        } else {
            console.log('  ❌ Buy button not found');
        }
        
        console.log('📊 Testing element counts...');
        const elementCounts = await page.evaluate(() => {
            return {
                buyButtons: document.querySelectorAll('.buy-now-button').length,
                carouselButtons: document.querySelectorAll('.carousel-nav').length,
                hotspots: document.querySelectorAll('.hotspot').length,
                sizeOptions: document.querySelectorAll('.size-option').length,
                images: document.querySelectorAll('img').length
            };
        });
        
        console.log('  Element counts:', elementCounts);
        
        console.log('⏰ Testing XL timer status...');
        const xlStatus = await page.evaluate(() => {
            const xlButton = document.querySelector('.size-option[data-size="XL"]');
            return xlButton ? {
                exists: true,
                available: xlButton.classList.contains('available'),
                soldOut: xlButton.classList.contains('sold-out'),
                disabled: xlButton.disabled
            } : { exists: false };
        });
        
        console.log('  XL Status:', xlStatus);
        
        console.log('\n✅ QUICK TEST COMPLETE');
        console.log('Browser will stay open for manual inspection...');
        
        // Keep browser open for manual testing
        console.log('Press Ctrl+C to close browser and exit');
        await new Promise(() => {}); // Keep alive
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        if (browser) {
            // Browser will be closed by Ctrl+C
        }
    }
}

quickTest();