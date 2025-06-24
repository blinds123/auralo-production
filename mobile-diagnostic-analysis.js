const puppeteer = require('puppeteer');
const fs = require('fs');

async function diagnoseMobileIssues() {
    console.log('🔍 MOBILE DIAGNOSTIC ANALYSIS');
    console.log('==============================');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // True mobile viewport
    await page.setViewport({ 
        width: 390, 
        height: 844, 
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true
    });
    
    await page.goto('file://' + __dirname + '/index.html', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
    });
    
    // Analyze layout issues
    const mobileIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            issues.push('Missing viewport meta tag');
        } else {
            issues.push(`Viewport: ${viewportMeta.content}`);
        }
        
        // Check body and container widths
        const body = document.body;
        const container = document.querySelector('.container');
        issues.push(`Body width: ${body.offsetWidth}px`);
        issues.push(`Container width: ${container?.offsetWidth}px`);
        
        // Check for horizontal overflow
        if (body.scrollWidth > window.innerWidth) {
            issues.push(`HORIZONTAL OVERFLOW: ${body.scrollWidth - window.innerWidth}px`);
        }
        
        // Check image sizes
        const images = document.querySelectorAll('img');
        images.forEach((img, i) => {
            if (img.offsetWidth > window.innerWidth) {
                issues.push(`Image ${i} overflowing: ${img.offsetWidth}px wide`);
            }
        });
        
        // Check text sizes
        const headline = document.querySelector('.main-headline');
        if (headline) {
            const styles = window.getComputedStyle(headline);
            issues.push(`Headline font-size: ${styles.fontSize}`);
        }
        
        // Check button sizes
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn, i) => {
            const height = btn.offsetHeight;
            if (height < 44) {
                issues.push(`Button ${i} too small: ${height}px (should be 44px+)`);
            }
        });
        
        // Check CSS issues
        const styleSheets = Array.from(document.styleSheets);
        let hasMobileQueries = false;
        try {
            styleSheets.forEach(sheet => {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.media && rule.media.mediaText.includes('max-width')) {
                        hasMobileQueries = true;
                    }
                });
            });
        } catch (e) {}
        
        issues.push(`Has mobile media queries: ${hasMobileQueries}`);
        
        return issues;
    });
    
    console.log('\n📱 MOBILE ISSUES FOUND:');
    mobileIssues.forEach(issue => console.log(`   - ${issue}`));
    
    // Take diagnostic screenshots
    await page.screenshot({ 
        path: 'mobile-diagnostic-full.png',
        fullPage: true
    });
    
    // Check specific sections
    const sections = ['hero', 'size-selector', 'process-section', 'story-section'];
    
    for (const section of sections) {
        const element = await page.$(`.${section}`);
        if (element) {
            const box = await element.boundingBox();
            if (box && box.width > 390) {
                console.log(`\n⚠️  ${section} is ${box.width}px wide (should be max 390px)`);
            }
        }
    }
    
    await browser.close();
    
    console.log('\n📋 CREATING MOBILE FIX PLAN...');
    
    const fixPlan = `
# MOBILE EXCELLENCE FIX PLAN

## 1. VIEWPORT & META FIXES
- Add proper viewport meta tag
- Ensure no horizontal scrolling
- Set max-width constraints

## 2. RESPONSIVE IMAGE FIXES
- Set all images to max-width: 100%
- Use object-fit for proper scaling
- Optimize image containers

## 3. TYPOGRAPHY SCALING
- Use clamp() for fluid typography
- Reduce font sizes for mobile
- Ensure readable line heights

## 4. SPACING & LAYOUT
- Fix container padding
- Ensure proper margins
- Make all elements fit 390px width

## 5. TOUCH OPTIMIZATION
- Minimum 44px touch targets
- Proper button spacing
- Swipeable carousels

## 6. IMAN AESTHETIC MOBILE
- Maintain dark luxury feel
- Keep Gen Z color accents
- Ensure social proof visibility
`;

    fs.writeFileSync('mobile-fix-plan.md', fixPlan);
    console.log('✅ Fix plan created: mobile-fix-plan.md');
}

diagnoseMobileIssues();