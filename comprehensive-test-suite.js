#!/usr/bin/env node

/**
 * COMPREHENSIVE AURALO WEBSITE TEST SUITE
 * Tests all features across desktop, tablet, and mobile viewports
 * Uses Puppeteer for automated browser testing
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class AuraloTestSuite {
    constructor() {
        this.browser = null;
        this.testResults = {
            desktop: {},
            tablet: {},
            mobile: {},
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                startTime: new Date(),
                endTime: null
            }
        };
        
        // Device configurations for testing
        this.devices = {
            desktop: { width: 1920, height: 1080, userAgent: 'desktop' },
            tablet: { width: 768, height: 1024, userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)' },
            mobile: { width: 375, height: 667, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)' }
        };
        
        // Test specifications
        this.tests = [
            'testCarouselNavigation',
            'testXLSoldOutTimer', 
            'testBlueHotspots',
            'testFingerPointers',
            'testSizeChart',
            'testStoreAvailability',
            'testScrollToCheckout',
            'testMobileResponsiveness',
            'testAllImages',
            'testPerformance'
        ];
    }
    
    async initialize() {
        console.log('🚀 AURALO COMPREHENSIVE TEST SUITE STARTING');
        console.log('=============================================');
        
        this.browser = await puppeteer.launch({
            headless: false, // Show browser for debugging
            defaultViewport: null,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });
    }
    
    async runAllTests() {
        for (const device of Object.keys(this.devices)) {
            console.log(`\n🔍 TESTING ON ${device.toUpperCase()}`);
            console.log('='.repeat(40));
            
            const page = await this.browser.newPage();
            await this.setupDevice(page, device);
            
            this.testResults[device] = {};
            
            for (const testName of this.tests) {
                try {
                    console.log(`  Running ${testName}...`);
                    const result = await this[testName](page, device);
                    this.testResults[device][testName] = result;
                    this.testResults.summary.total++;
                    
                    if (result.status === 'PASS') {
                        this.testResults.summary.passed++;
                        console.log(`  ✅ ${testName}: PASS`);
                    } else {
                        this.testResults.summary.failed++;
                        console.log(`  ❌ ${testName}: FAIL - ${result.error}`);
                    }
                } catch (error) {
                    this.testResults[device][testName] = {
                        status: 'ERROR',
                        error: error.message,
                        timestamp: new Date()
                    };
                    this.testResults.summary.failed++;
                    console.log(`  💥 ${testName}: ERROR - ${error.message}`);
                }
            }
            
            await page.close();
        }
        
        this.testResults.summary.endTime = new Date();
        await this.generateReport();
        await this.browser.close();
    }
    
    async setupDevice(page, device) {
        const config = this.devices[device];
        await page.setViewport({
            width: config.width,
            height: config.height,
            deviceScaleFactor: device === 'mobile' ? 2 : 1
        });
        
        await page.setUserAgent(config.userAgent);
        
        // Enable console logging
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`    [${device}] Console Error: ${msg.text()}`);
            }
        });
        
        // Load the website
        await page.goto('file://' + path.resolve(__dirname, 'index.html'), {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        // Wait for initial load
        await page.waitForTimeout(2000);
    }
    
    async testCarouselNavigation(page, device) {
        try {
            // Test story carousel
            const storyLeftBtn = await page.$('#storyCarousel .carousel-nav-left');
            const storyRightBtn = await page.$('#storyCarousel .carousel-nav-right');
            
            if (!storyLeftBtn || !storyRightBtn) {
                return { status: 'FAIL', error: 'Story carousel buttons not found' };
            }
            
            // Test button clicks
            await storyRightBtn.click();
            await page.waitForTimeout(500);
            
            const storySlidePosition = await page.evaluate(() => {
                const slides = document.getElementById('storySlides');
                return slides ? getComputedStyle(slides).transform : null;
            });
            
            // Test review carousel
            const reviewLeftBtn = await page.$('#tiktokCarousel .carousel-nav-left');
            const reviewRightBtn = await page.$('#tiktokCarousel .carousel-nav-right');
            
            if (!reviewLeftBtn || !reviewRightBtn) {
                return { status: 'FAIL', error: 'Review carousel buttons not found' };
            }
            
            await reviewRightBtn.click();
            await page.waitForTimeout(500);
            
            const reviewSlidePosition = await page.evaluate(() => {
                const slides = document.getElementById('tiktokSlides');
                return slides ? getComputedStyle(slides).transform : null;
            });
            
            const working = storySlidePosition && storySlidePosition !== 'none' && 
                           reviewSlidePosition && reviewSlidePosition !== 'none';
            
            return {
                status: working ? 'PASS' : 'FAIL',
                error: working ? null : 'Carousel transforms not working',
                details: { storySlidePosition, reviewSlidePosition },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testXLSoldOutTimer(page, device) {
        try {
            // Check if XL button exists and is initially available
            const xlButton = await page.$('.size-option[data-size="XL"]');
            if (!xlButton) {
                return { status: 'FAIL', error: 'XL size button not found' };
            }
            
            const initialState = await page.evaluate(() => {
                const xl = document.querySelector('.size-option[data-size="XL"]');
                return {
                    available: xl.classList.contains('available'),
                    soldOut: xl.classList.contains('sold-out'),
                    disabled: xl.disabled
                };
            });
            
            if (!initialState.available) {
                return { status: 'FAIL', error: 'XL button not initially available' };
            }
            
            // Wait for 14 seconds to test timer
            console.log('    Waiting 14 seconds for XL timer...');
            await page.waitForTimeout(14000);
            
            const finalState = await page.evaluate(() => {
                const xl = document.querySelector('.size-option[data-size="XL"]');
                const popup = document.querySelector('.xl-simple-popup');
                
                return {
                    available: xl.classList.contains('available'),
                    soldOut: xl.classList.contains('sold-out'),
                    disabled: xl.disabled,
                    popupExists: !!popup,
                    popupVisible: popup ? getComputedStyle(popup).display !== 'none' : false
                };
            });
            
            const success = finalState.soldOut && finalState.disabled && !finalState.available;
            
            return {
                status: success ? 'PASS' : 'FAIL',
                error: success ? null : 'XL timer did not work correctly',
                details: { initialState, finalState },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testBlueHotspots(page, device) {
        try {
            const hotspots = await page.$$('.hotspot');
            const hotspotCount = hotspots.length;
            
            if (hotspotCount === 0) {
                return { status: 'FAIL', error: 'No hotspots found' };
            }
            
            // Test hotspot interaction
            if (hotspots.length > 0) {
                await hotspots[0].hover();
                await page.waitForTimeout(500);
                
                const tooltipVisible = await page.evaluate(() => {
                    const hotspot = document.querySelector('.hotspot');
                    const computedStyle = getComputedStyle(hotspot, ':after');
                    return computedStyle.content && computedStyle.content !== 'none';
                });
            }
            
            return {
                status: 'PASS',
                details: { hotspotCount },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testFingerPointers(page, device) {
        try {
            const exchangePointer = await page.$('.arrow-exchange-bottom');
            const walletPointer = await page.$('.arrow-wallet-bottom');
            
            if (!exchangePointer || !walletPointer) {
                return { status: 'FAIL', error: 'Finger pointers not found' };
            }
            
            const pointerPositions = await page.evaluate(() => {
                const exchange = document.querySelector('.arrow-exchange-bottom');
                const wallet = document.querySelector('.arrow-wallet-bottom');
                
                return {
                    exchangeVisible: exchange && getComputedStyle(exchange).display !== 'none',
                    walletVisible: wallet && getComputedStyle(wallet).display !== 'none',
                    exchangePosition: exchange ? getComputedStyle(exchange).position : null,
                    walletPosition: wallet ? getComputedStyle(wallet).position : null
                };
            });
            
            const working = pointerPositions.exchangeVisible && pointerPositions.walletVisible;
            
            return {
                status: working ? 'PASS' : 'FAIL',
                error: working ? null : 'Finger pointers not visible',
                details: pointerPositions,
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testSizeChart(page, device) {
        try {
            const toggleButton = await page.$('.chart-toggle');
            const sizeChart = await page.$('#sizeChart');
            
            if (!toggleButton || !sizeChart) {
                return { status: 'FAIL', error: 'Size chart elements not found' };
            }
            
            // Test toggle functionality
            const initialDisplay = await page.evaluate(() => {
                const chart = document.getElementById('sizeChart');
                return getComputedStyle(chart).display;
            });
            
            await toggleButton.click();
            await page.waitForTimeout(500);
            
            const afterClickDisplay = await page.evaluate(() => {
                const chart = document.getElementById('sizeChart');
                return getComputedStyle(chart).display;
            });
            
            const working = initialDisplay !== afterClickDisplay;
            
            return {
                status: working ? 'PASS' : 'FAIL',
                error: working ? null : 'Size chart toggle not working',
                details: { initialDisplay, afterClickDisplay },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testStoreAvailability(page, device) {
        try {
            const availabilityHeader = await page.$('.availability-header');
            const storeContent = await page.$('#storeAvailability');
            
            if (!availabilityHeader || !storeContent) {
                return { status: 'FAIL', error: 'Store availability elements not found' };
            }
            
            // Test toggle functionality
            await availabilityHeader.click();
            await page.waitForTimeout(500);
            
            const isOpen = await page.evaluate(() => {
                const content = document.getElementById('storeAvailability');
                return content.classList.contains('open');
            });
            
            return {
                status: 'PASS',
                details: { toggleWorking: isOpen },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testScrollToCheckout(page, device) {
        try {
            const buyButtons = await page.$$('.buy-now-button');
            
            if (buyButtons.length === 0) {
                return { status: 'FAIL', error: 'No buy buttons found' };
            }
            
            // Test first buy button
            const initialScroll = await page.evaluate(() => window.pageYOffset);
            
            await buyButtons[0].click();
            await page.waitForTimeout(1000);
            
            const finalScroll = await page.evaluate(() => window.pageYOffset);
            const checkoutSection = await page.$('#complete-exchange-section');
            
            const scrolled = Math.abs(finalScroll - initialScroll) > 100;
            
            return {
                status: scrolled && checkoutSection ? 'PASS' : 'FAIL',
                error: !scrolled ? 'Page did not scroll' : !checkoutSection ? 'Checkout section not found' : null,
                details: { initialScroll, finalScroll, scrolled, buttonCount: buyButtons.length },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testMobileResponsiveness(page, device) {
        try {
            if (device !== 'mobile') {
                return { status: 'SKIP', note: 'Only tested on mobile' };
            }
            
            const mobileChecks = await page.evaluate(() => {
                return {
                    viewportWidth: window.innerWidth,
                    hasHorizontalScroll: document.body.scrollWidth > window.innerWidth,
                    buttonsTouch: Array.from(document.querySelectorAll('.buy-now-button, .size-option')).every(btn => {
                        const rect = btn.getBoundingClientRect();
                        return rect.height >= 44; // Apple's recommended touch target
                    })
                };
            });
            
            const responsive = !mobileChecks.hasHorizontalScroll && mobileChecks.buttonsTouch;
            
            return {
                status: responsive ? 'PASS' : 'FAIL',
                error: responsive ? null : 'Mobile responsiveness issues detected',
                details: mobileChecks,
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testAllImages(page, device) {
        try {
            const imageResults = await page.evaluate(() => {
                const images = Array.from(document.querySelectorAll('img'));
                const results = {
                    total: images.length,
                    loaded: 0,
                    failed: 0,
                    details: []
                };
                
                images.forEach(img => {
                    if (img.complete && img.naturalHeight !== 0) {
                        results.loaded++;
                    } else {
                        results.failed++;
                        results.details.push({
                            src: img.src,
                            alt: img.alt,
                            error: 'Failed to load'
                        });
                    }
                });
                
                return results;
            });
            
            const success = imageResults.failed === 0;
            
            return {
                status: success ? 'PASS' : 'FAIL',
                error: success ? null : `${imageResults.failed} images failed to load`,
                details: imageResults,
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async testPerformance(page, device) {
        try {
            const metrics = await page.metrics();
            const performanceEntries = await page.evaluate(() => {
                return performance.getEntriesByType('navigation').map(entry => ({
                    domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                    loadComplete: entry.loadEventEnd - entry.loadEventStart,
                    totalTime: entry.loadEventEnd - entry.fetchStart
                }));
            });
            
            const loadTime = performanceEntries[0]?.totalTime || 0;
            const fast = loadTime < 3000; // Under 3 seconds
            
            return {
                status: fast ? 'PASS' : 'WARN',
                error: fast ? null : 'Page load time over 3 seconds',
                details: { metrics, performanceEntries, loadTime },
                timestamp: new Date()
            };
            
        } catch (error) {
            return { status: 'FAIL', error: error.message, timestamp: new Date() };
        }
    }
    
    async generateReport() {
        const report = {
            testSuite: 'Auralo Website Comprehensive Test',
            timestamp: new Date(),
            duration: this.testResults.summary.endTime - this.testResults.summary.startTime,
            summary: this.testResults.summary,
            results: this.testResults
        };
        
        // Write detailed JSON report
        await fs.writeFile(
            path.join(__dirname, 'test-results.json'),
            JSON.stringify(report, null, 2)
        );
        
        // Generate human-readable report
        const readableReport = this.generateReadableReport(report);
        await fs.writeFile(
            path.join(__dirname, 'test-report.md'),
            readableReport
        );
        
        console.log('\n🏆 TEST SUITE COMPLETE');
        console.log('========================');
        console.log(`Total Tests: ${this.testResults.summary.total}`);
        console.log(`Passed: ${this.testResults.summary.passed}`);
        console.log(`Failed: ${this.testResults.summary.failed}`);
        console.log(`Success Rate: ${Math.round((this.testResults.summary.passed / this.testResults.summary.total) * 100)}%`);
        console.log(`Duration: ${Math.round(report.duration / 1000)}s`);
        console.log('\nReports generated:');
        console.log('- test-results.json (detailed)');
        console.log('- test-report.md (human-readable)');
    }
    
    generateReadableReport(report) {
        const devices = Object.keys(this.devices);
        let markdown = `# Auralo Website Test Report\n\n`;
        markdown += `**Test Date:** ${report.timestamp.toISOString()}\n`;
        markdown += `**Duration:** ${Math.round(report.duration / 1000)} seconds\n`;
        markdown += `**Success Rate:** ${Math.round((report.summary.passed / report.summary.total) * 100)}%\n\n`;
        
        markdown += `## Summary\n\n`;
        markdown += `| Metric | Value |\n`;
        markdown += `|--------|-------|\n`;
        markdown += `| Total Tests | ${report.summary.total} |\n`;
        markdown += `| Passed | ${report.summary.passed} |\n`;
        markdown += `| Failed | ${report.summary.failed} |\n\n`;
        
        for (const device of devices) {
            markdown += `## ${device.charAt(0).toUpperCase() + device.slice(1)} Results\n\n`;
            
            for (const [testName, result] of Object.entries(report.results[device])) {
                const status = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
                markdown += `### ${status} ${testName}\n`;
                if (result.error) {
                    markdown += `**Error:** ${result.error}\n`;
                }
                if (result.details) {
                    markdown += `**Details:** \`${JSON.stringify(result.details)}\`\n`;
                }
                markdown += `\n`;
            }
        }
        
        return markdown;
    }
}

// Run the test suite
async function runTests() {
    const testSuite = new AuraloTestSuite();
    try {
        await testSuite.initialize();
        await testSuite.runAllTests();
    } catch (error) {
        console.error('💥 Test suite failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    runTests();
}

module.exports = AuraloTestSuite;