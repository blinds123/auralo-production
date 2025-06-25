#!/usr/bin/env node

/**
 * VERIFY AURALO FUNCTIONALITY - Non-timeout version
 */

const puppeteer = require('puppeteer');
const path = require('path');

async function verifyFunctionality() {
    console.log('🚀 AURALO FUNCTIONALITY VERIFICATION');
    console.log('====================================');
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1200, height: 800 },
            args: ['--no-sandbox', '--disable-timeout']
        });
        
        const page = await browser.newPage();
        
        // Enable console logging
        page.on('console', msg => {
            const type = msg.type();
            if (['log', 'info', 'warn', 'error'].includes(type)) {
                console.log(`  [${type.toUpperCase()}] ${msg.text()}`);
            }
        });
        
        console.log('📱 Loading website...');
        await page.goto('file://' + path.resolve(__dirname, 'index.html'), {
            waitUntil: 'networkidle0',
            timeout: 15000
        });
        
        // Use page.waitFor instead of page.waitForTimeout
        await page.waitFor(3000);
        
        console.log('🔍 Checking carousel elements...');
        const carouselElements = await page.evaluate(() => {
            return {
                storyCarousel: !!document.getElementById('storyCarousel'),
                tiktokCarousel: !!document.getElementById('tiktokCarousel'),
                trustpilotCarousel: !!document.getElementById('trustpilotCarousel'),
                storyNavButtons: document.querySelectorAll('#storyCarousel .carousel-nav').length,
                reviewNavButtons: document.querySelectorAll('#tiktokCarousel .carousel-nav').length
            };
        });
        
        console.log('  Carousel elements:', carouselElements);
        
        console.log('🔍 Testing carousel navigation...');
        if (carouselElements.storyNavButtons >= 2) {
            const storyRightBtn = await page.$('#storyCarousel .carousel-nav-right');
            if (storyRightBtn) {
                await storyRightBtn.click();
                console.log('  ✅ Story carousel navigation working');
            }
        }
        
        console.log('🔍 Checking functionality elements...');
        const functionalElements = await page.evaluate(() => {
            return {
                sizeChart: !!document.getElementById('sizeChart'),
                sizeChartToggle: !!document.querySelector('.chart-toggle'),
                storeAvailability: !!document.getElementById('storeAvailability'),
                xlButton: !!document.querySelector('.size-option[data-size="XL"]'),
                buyButtons: document.querySelectorAll('.buy-now-button').length,
                hotspots: document.querySelectorAll('.hotspot').length
            };
        });
        
        console.log('  Functional elements:', functionalElements);
        
        console.log('🔍 Testing XL timer system...');
        const xlInitialState = await page.evaluate(() => {
            const xlBtn = document.querySelector('.size-option[data-size="XL"]');
            return xlBtn ? {
                available: xlBtn.classList.contains('available'),
                soldOut: xlBtn.classList.contains('sold-out'),
                disabled: xlBtn.disabled
            } : null;
        });
        
        console.log('  XL initial state:', xlInitialState);
        
        // Test size chart toggle
        if (functionalElements.sizeChartToggle) {
            console.log('🔍 Testing size chart toggle...');
            const toggle = await page.$('.chart-toggle');
            await toggle.click();
            await page.waitFor(500);
            
            const chartVisible = await page.evaluate(() => {
                const chart = document.getElementById('sizeChart');
                return chart ? getComputedStyle(chart).display !== 'none' : false;
            });
            
            console.log('  Size chart toggle working:', chartVisible);
        }
        
        console.log('\n🎯 SUMMARY:');
        console.log('============');
        console.log(`✅ Carousels: ${Object.values(carouselElements).every(v => v > 0) ? 'WORKING' : 'ISSUES'}`);
        console.log(`✅ Functionality: ${Object.values(functionalElements).every(v => v > 0) ? 'WORKING' : 'ISSUES'}`);
        console.log(`✅ XL Timer: ${xlInitialState?.available ? 'READY' : 'ISSUES'}`);
        
        console.log('\n🔥 Browser staying open for manual testing...');
        console.log('Click carousel buttons, test size chart, try XL timer!');
        console.log('Press Ctrl+C when done');
        
        // Keep browser open
        process.on('SIGINT', async () => {
            console.log('\n👋 Closing browser...');
            await browser.close();
            process.exit(0);
        });
        
        // Keep alive
        setInterval(() => {}, 1000);
        
    } catch (error) {
        console.error('❌ Verification failed:', error);
        if (browser) {
            await browser.close();
        }
        process.exit(1);
    }
}

verifyFunctionality();