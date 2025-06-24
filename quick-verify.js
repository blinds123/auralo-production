const puppeteer = require('puppeteer');

async function quickVerify() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    console.log('🔍 Loading page on port 8001...');
    await page.goto('http://localhost:8001/index.html', { waitUntil: 'networkidle0' });
    
    // Wait and watch for XL timer
    console.log('⏰ Waiting 13 seconds to see XL popup...');
    await page.waitForTimeout(13000);
    
    // Take screenshot after 13 seconds
    await page.screenshot({ 
        path: 'xl-popup-screenshot.png',
        fullPage: true 
    });
    
    console.log('📸 Screenshot saved: xl-popup-screenshot.png');
    
    // Check what sections exist
    const sections = await page.evaluate(() => {
        const allSections = document.querySelectorAll('section');
        return Array.from(allSections).map(section => ({
            id: section.id,
            classes: section.className,
            title: section.querySelector('h1, h2, h3')?.textContent || 'No title',
            content: section.textContent.substring(0, 100) + '...'
        }));
    });
    
    console.log('\n📋 ALL SECTIONS FOUND:');
    sections.forEach((section, i) => {
        console.log(`${i + 1}. ID: "${section.id}" | Classes: "${section.classes}"`);
        console.log(`   Title: "${section.title}"`);
        console.log(`   Content: "${section.content}"`);
        console.log('---');
    });
    
    console.log('\nPress Ctrl+C to close...');
    await new Promise(() => {});
}

quickVerify();