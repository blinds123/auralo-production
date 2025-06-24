const puppeteer = require('puppeteer');

async function completeElementAudit() {
    console.log('🔍 COMPLETE ELEMENT AUDIT - EVERY COMPONENT');
    console.log('============================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 375, height: 667 } // Start with iPhone SE
    });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 20000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('\n📋 AUDITING ALL PAGE ELEMENTS:');
        console.log('==============================');
        
        const elementAudit = await page.evaluate(() => {
            const audit = {};
            
            // Typography elements
            audit.typography = {
                mainHeadline: getComputedStyle(document.querySelector('.main-headline')),
                subHeadline: getComputedStyle(document.querySelector('.sub-headline')),
                sectionTitles: Array.from(document.querySelectorAll('h2, h3')).map(el => ({
                    text: el.textContent.slice(0, 30),
                    fontSize: getComputedStyle(el).fontSize,
                    lineHeight: getComputedStyle(el).lineHeight,
                    marginBottom: getComputedStyle(el).marginBottom
                })),
                paragraphs: Array.from(document.querySelectorAll('p')).slice(0, 5).map(el => ({
                    fontSize: getComputedStyle(el).fontSize,
                    lineHeight: getComputedStyle(el).lineHeight,
                    marginBottom: getComputedStyle(el).marginBottom
                }))
            };
            
            // Button elements
            audit.buttons = {
                sizeButtons: Array.from(document.querySelectorAll('.size-option')).map(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    minHeight: getComputedStyle(el).minHeight,
                    padding: getComputedStyle(el).padding,
                    fontSize: getComputedStyle(el).fontSize
                })),
                buyButton: document.querySelector('.buy-now-button') ? {
                    width: document.querySelector('.buy-now-button').offsetWidth,
                    height: document.querySelector('.buy-now-button').offsetHeight,
                    minHeight: getComputedStyle(document.querySelector('.buy-now-button')).minHeight,
                    padding: getComputedStyle(document.querySelector('.buy-now-button')).padding,
                    fontSize: getComputedStyle(document.querySelector('.buy-now-button')).fontSize
                } : null,
                exchangeButton: document.querySelector('.simpleswap-link-button') ? {
                    width: document.querySelector('.simpleswap-link-button').offsetWidth,
                    height: document.querySelector('.simpleswap-link-button').offsetHeight,
                    minHeight: getComputedStyle(document.querySelector('.simpleswap-link-button')).minHeight,
                    padding: getComputedStyle(document.querySelector('.simpleswap-link-button')).padding,
                    fontSize: getComputedStyle(document.querySelector('.simpleswap-link-button')).fontSize
                } : null
            };
            
            // Image elements
            audit.images = {
                productImage: document.querySelector('.product-image') ? {
                    width: document.querySelector('.product-image').offsetWidth,
                    height: document.querySelector('.product-image').offsetHeight,
                    maxWidth: getComputedStyle(document.querySelector('.product-image')).maxWidth,
                    maxHeight: getComputedStyle(document.querySelector('.product-image')).maxHeight
                } : null,
                stepImages: Array.from(document.querySelectorAll('.step-image')).map(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    maxWidth: getComputedStyle(el).maxWidth
                })),
                carouselImages: Array.from(document.querySelectorAll('.story-slide img, .review-slide img')).slice(0, 3).map(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    maxWidth: getComputedStyle(el).maxWidth
                }))
            };
            
            // Layout containers
            audit.layout = {
                container: document.querySelector('.container') ? {
                    width: document.querySelector('.container').offsetWidth,
                    maxWidth: getComputedStyle(document.querySelector('.container')).maxWidth,
                    padding: getComputedStyle(document.querySelector('.container')).padding
                } : null,
                sizeGrid: document.querySelector('.size-grid') ? {
                    width: document.querySelector('.size-grid').offsetWidth,
                    gridTemplateColumns: getComputedStyle(document.querySelector('.size-grid')).gridTemplateColumns,
                    gap: getComputedStyle(document.querySelector('.size-grid')).gap
                } : null,
                urgencyWidget: document.querySelector('.urgency-widget') ? {
                    width: document.querySelector('.urgency-widget').offsetWidth,
                    padding: getComputedStyle(document.querySelector('.urgency-widget')).padding,
                    marginBottom: getComputedStyle(document.querySelector('.urgency-widget')).marginBottom
                } : null
            };
            
            // Interactive elements
            audit.interactive = {
                carouselNavButtons: Array.from(document.querySelectorAll('.carousel-nav')).map(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    minWidth: getComputedStyle(el).minWidth,
                    minHeight: getComputedStyle(el).minHeight,
                    fontSize: getComputedStyle(el).fontSize
                })),
                chartToggle: document.querySelector('.chart-toggle') ? {
                    height: document.querySelector('.chart-toggle').offsetHeight,
                    minHeight: getComputedStyle(document.querySelector('.chart-toggle')).minHeight,
                    padding: getComputedStyle(document.querySelector('.chart-toggle')).padding
                } : null,
                availabilityHeader: document.querySelector('.availability-header') ? {
                    height: document.querySelector('.availability-header').offsetHeight,
                    padding: getComputedStyle(document.querySelector('.availability-header')).padding
                } : null
            };
            
            // Form elements
            audit.forms = {
                inputs: Array.from(document.querySelectorAll('input, textarea')).map(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    minHeight: getComputedStyle(el).minHeight,
                    padding: getComputedStyle(el).padding,
                    fontSize: getComputedStyle(el).fontSize
                }))
            };
            
            // Spacing elements
            audit.spacing = {
                sections: Array.from(document.querySelectorAll('section')).slice(0, 5).map(el => ({
                    marginTop: getComputedStyle(el).marginTop,
                    marginBottom: getComputedStyle(el).marginBottom,
                    paddingTop: getComputedStyle(el).paddingTop,
                    paddingBottom: getComputedStyle(el).paddingBottom
                }))
            };
            
            return audit;
        });
        
        console.log('\n📝 TYPOGRAPHY AUDIT:');
        console.log(`Main Headline: ${elementAudit.typography.mainHeadline.fontSize} / ${elementAudit.typography.mainHeadline.lineHeight}`);
        console.log(`Sub Headline: ${elementAudit.typography.subHeadline.fontSize} / ${elementAudit.typography.subHeadline.lineHeight}`);
        console.log(`Section Titles: ${elementAudit.typography.sectionTitles.length} found`);
        elementAudit.typography.sectionTitles.forEach((title, i) => {
            console.log(`  ${i+1}. "${title.text}..." - ${title.fontSize}`);
        });
        
        console.log('\n🔘 BUTTON AUDIT:');
        console.log(`Size Buttons: ${elementAudit.buttons.sizeButtons.length} found`);
        if (elementAudit.buttons.sizeButtons.length > 0) {
            const firstSize = elementAudit.buttons.sizeButtons[0];
            console.log(`  Size: ${firstSize.width}x${firstSize.height}px (min: ${firstSize.minHeight})`);
            console.log(`  Touch Target: ${firstSize.height >= 44 ? '✅ GOOD' : '❌ TOO SMALL'}`);
        }
        
        if (elementAudit.buttons.buyButton) {
            console.log(`Buy Button: ${elementAudit.buttons.buyButton.width}x${elementAudit.buttons.buyButton.height}px`);
            console.log(`  Touch Target: ${elementAudit.buttons.buyButton.height >= 44 ? '✅ GOOD' : '❌ TOO SMALL'}`);
        }
        
        if (elementAudit.buttons.exchangeButton) {
            console.log(`Exchange Button: ${elementAudit.buttons.exchangeButton.width}x${elementAudit.buttons.exchangeButton.height}px`);
            console.log(`  Touch Target: ${elementAudit.buttons.exchangeButton.height >= 44 ? '✅ GOOD' : '❌ TOO SMALL'}`);
        }
        
        console.log('\n🖼️  IMAGE AUDIT:');
        if (elementAudit.images.productImage) {
            console.log(`Product Image: ${elementAudit.images.productImage.width}x${elementAudit.images.productImage.height}px (max: ${elementAudit.images.productImage.maxWidth})`);
        }
        console.log(`Step Images: ${elementAudit.images.stepImages.length} found`);
        console.log(`Carousel Images: ${elementAudit.images.carouselImages.length} found`);
        
        console.log('\n📐 LAYOUT AUDIT:');
        if (elementAudit.layout.container) {
            console.log(`Container: ${elementAudit.layout.container.width}px (max: ${elementAudit.layout.container.maxWidth})`);
            console.log(`  Padding: ${elementAudit.layout.container.padding}`);
        }
        if (elementAudit.layout.sizeGrid) {
            console.log(`Size Grid: ${elementAudit.layout.sizeGrid.gridTemplateColumns}`);
            console.log(`  Gap: ${elementAudit.layout.sizeGrid.gap}`);
        }
        
        console.log('\n🎯 INTERACTIVE AUDIT:');
        console.log(`Carousel Nav Buttons: ${elementAudit.interactive.carouselNavButtons.length} found`);
        if (elementAudit.interactive.carouselNavButtons.length > 0) {
            const firstNav = elementAudit.interactive.carouselNavButtons[0];
            console.log(`  Size: ${firstNav.width}x${firstNav.height}px`);
            console.log(`  Touch Target: ${firstNav.height >= 44 ? '✅ GOOD' : '❌ TOO SMALL'}`);
        }
        
        console.log('\n📱 MOBILE OPTIMIZATION STATUS:');
        
        // Check critical issues
        const issues = [];
        
        // Typography issues
        const headlineFontSize = parseFloat(elementAudit.typography.mainHeadline.fontSize);
        if (headlineFontSize < 24) issues.push('Main headline too small for mobile');
        
        // Button issues
        elementAudit.buttons.sizeButtons.forEach((btn, i) => {
            if (btn.height < 44) issues.push(`Size button ${i+1} below 44px touch target`);
        });
        
        if (elementAudit.buttons.buyButton && elementAudit.buttons.buyButton.height < 44) {
            issues.push('Buy button below 44px touch target');
        }
        
        if (elementAudit.buttons.exchangeButton && elementAudit.buttons.exchangeButton.height < 44) {
            issues.push('Exchange button below 44px touch target');
        }
        
        // Carousel nav issues
        elementAudit.interactive.carouselNavButtons.forEach((nav, i) => {
            if (nav.height < 44) issues.push(`Carousel nav ${i+1} below 44px touch target`);
        });
        
        if (issues.length === 0) {
            console.log('🎉 NO CRITICAL ISSUES FOUND!');
        } else {
            console.log('⚠️ ISSUES REQUIRING OPTIMIZATION:');
            issues.forEach((issue, i) => {
                console.log(`  ${i+1}. ${issue}`);
            });
        }
        
        console.log('\n📸 Taking comprehensive mobile audit screenshot...');
        await page.screenshot({ 
            path: 'mobile-element-audit.png',
            fullPage: true 
        });
        
        return issues;
        
    } catch (error) {
        console.error('❌ Error during audit:', error);
        return [];
    } finally {
        await browser.close();
    }
}

completeElementAudit()
    .then(issues => {
        console.log(`\n🎯 AUDIT COMPLETE: ${issues.length} issues found`);
    });