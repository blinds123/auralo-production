const puppeteer = require('puppeteer');

async function testSideBySideSteps() {
    console.log('📋 TESTING SIDE-BY-SIDE STEPS LAYOUT');
    console.log('====================================');
    console.log('Testing viability of placing Step 1 and Step 2 next to each other');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null
    });
    
    // Test on multiple screen sizes
    const devices = [
        { name: 'iPhone SE', width: 375, height: 667, type: 'Mobile' },
        { name: 'iPhone 12', width: 390, height: 844, type: 'Mobile' },
        { name: 'iPad Mini', width: 768, height: 1024, type: 'Tablet' },
        { name: 'Desktop', width: 1200, height: 800, type: 'Desktop' }
    ];
    
    const results = [];
    
    for (const device of devices) {
        console.log(`\n📱 Testing ${device.name} (${device.width}x${device.height})`);
        
        const page = await browser.newPage();
        await page.setViewport({ 
            width: device.width, 
            height: device.height
        });
        
        try {
            await page.goto('http://localhost:8000/index.html', { 
                waitUntil: 'networkidle0',
                timeout: 15000 
            });
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Inject test CSS for side-by-side layout
            await page.addStyleTag({
                content: `
                    .process-steps {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 20px !important;
                        max-width: 100% !important;
                        padding: 0 20px !important;
                    }
                    
                    .process-step {
                        margin-bottom: 0 !important;
                        width: 100% !important;
                        box-sizing: border-box !important;
                    }
                    
                    .step-image {
                        max-width: 100% !important;
                        height: auto !important;
                    }
                    
                    .step-description {
                        font-size: 0.85rem !important;
                        line-height: 1.4 !important;
                    }
                    
                    .step-title {
                        font-size: 1rem !important;
                        margin-bottom: 10px !important;
                    }
                    
                    /* Mobile adjustments */
                    @media (max-width: 480px) {
                        .process-steps {
                            grid-template-columns: 1fr !important;
                            gap: 15px !important;
                        }
                    }
                    
                    /* Small tablet adjustments */
                    @media (min-width: 481px) and (max-width: 768px) {
                        .step-description {
                            font-size: 0.8rem !important;
                        }
                        
                        .step-title {
                            font-size: 0.9rem !important;
                        }
                        
                        .step-image {
                            max-width: 95% !important;
                        }
                    }
                `
            });
            
            // Scroll to checkout section
            await page.evaluate(() => {
                const checkoutSection = document.querySelector('.process-steps');
                if (checkoutSection) {
                    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Analyze the layout
            const analysis = await page.evaluate(() => {
                const processSteps = document.querySelector('.process-steps');
                const steps = document.querySelectorAll('.process-step');
                
                if (!processSteps || steps.length < 2) {
                    return { error: 'Steps not found' };
                }
                
                const containerRect = processSteps.getBoundingClientRect();
                const step1Rect = steps[0].getBoundingClientRect();
                const step2Rect = steps[1].getBoundingClientRect();
                
                // Check text readability
                const step1Title = steps[0].querySelector('.step-title');
                const step1Desc = steps[0].querySelector('.step-description');
                const step2Title = steps[1].querySelector('.step-title');
                const step2Desc = steps[1].querySelector('.step-description');
                
                const step1TitleStyle = step1Title ? getComputedStyle(step1Title) : null;
                const step1DescStyle = step1Desc ? getComputedStyle(step1Desc) : null;
                
                return {
                    containerWidth: containerRect.width,
                    step1Width: step1Rect.width,
                    step2Width: step2Rect.width,
                    step1Height: step1Rect.height,
                    step2Height: step2Rect.height,
                    stepsOverlap: step1Rect.right > step2Rect.left && step1Rect.left < step2Rect.right,
                    sideBySide: Math.abs(step1Rect.top - step2Rect.top) < 50,
                    titleFontSize: step1TitleStyle ? parseFloat(step1TitleStyle.fontSize) : 0,
                    descFontSize: step1DescStyle ? parseFloat(step1DescStyle.fontSize) : 0,
                    textReadable: {
                        titleSize: step1TitleStyle ? parseFloat(step1TitleStyle.fontSize) >= 14 : false,
                        descSize: step1DescStyle ? parseFloat(step1DescStyle.fontSize) >= 12 : false
                    },
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight
                };
            });
            
            // Take screenshot
            const screenshotName = `side-by-side-test-${device.name.toLowerCase().replace(/\s+/g, '-')}.png`;
            const checkoutElement = await page.$('.process-steps');
            if (checkoutElement) {
                await checkoutElement.screenshot({ 
                    path: screenshotName,
                    padding: 20
                });
            }
            
            const viable = analysis.sideBySide && 
                          !analysis.stepsOverlap && 
                          analysis.textReadable.titleSize && 
                          analysis.textReadable.descSize &&
                          analysis.step1Width > 150 && 
                          analysis.step2Width > 150;
            
            console.log(`  Layout: ${analysis.sideBySide ? 'Side-by-side' : 'Stacked'}`);
            console.log(`  Steps overlap: ${analysis.stepsOverlap ? 'Yes ❌' : 'No ✅'}`);
            console.log(`  Step width: ${Math.round(analysis.step1Width)}px / ${Math.round(analysis.step2Width)}px`);
            console.log(`  Text readable: Title ${analysis.titleFontSize}px, Desc ${analysis.descFontSize}px`);
            console.log(`  Viable: ${viable ? '✅ YES' : '❌ NO'}`);
            console.log(`  Screenshot: ${screenshotName}`);
            
            results.push({
                device: device.name,
                type: device.type,
                width: device.width,
                viable: viable,
                analysis: analysis
            });
            
        } catch (error) {
            console.error(`  ❌ Error testing ${device.name}:`, error.message);
            results.push({
                device: device.name,
                type: device.type,
                viable: false,
                error: error.message
            });
        } finally {
            await page.close();
        }
    }
    
    // Summary
    console.log('\n📊 SIDE-BY-SIDE LAYOUT VIABILITY SUMMARY');
    console.log('=========================================');
    
    const viableDevices = results.filter(r => r.viable);
    const mobileViable = results.filter(r => r.type === 'Mobile' && r.viable);
    const tabletViable = results.filter(r => r.type === 'Tablet' && r.viable);
    const desktopViable = results.filter(r => r.type === 'Desktop' && r.viable);
    
    console.log(`Mobile devices viable: ${mobileViable.length}/${results.filter(r => r.type === 'Mobile').length}`);
    console.log(`Tablet devices viable: ${tabletViable.length}/${results.filter(r => r.type === 'Tablet').length}`);
    console.log(`Desktop devices viable: ${desktopViable.length}/${results.filter(r => r.type === 'Desktop').length}`);
    
    const overallViable = viableDevices.length >= 3; // At least 3 out of 4 devices
    
    console.log(`\n🎯 RECOMMENDATION: ${overallViable ? '✅ IMPLEMENT SIDE-BY-SIDE' : '❌ KEEP STACKED'}`);
    
    if (overallViable) {
        console.log('\n✅ BENEFITS OF SIDE-BY-SIDE:');
        console.log('• Saves vertical space');
        console.log('• Allows users to see both steps simultaneously');
        console.log('• More efficient use of screen real estate');
        console.log('• Better visual flow between steps');
    } else {
        console.log('\n❌ ISSUES WITH SIDE-BY-SIDE:');
        console.log('• Text becomes too small on mobile');
        console.log('• Steps may overlap or become cramped');
        console.log('• Poor readability on smaller screens');
        console.log('• Screenshots may be too small to be useful');
    }
    
    console.log('\n🔍 Browser staying open for 15 seconds...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    await browser.close();
    
    return overallViable;
}

testSideBySideSteps()
    .then(viable => {
        console.log(`\n🎯 FINAL RESULT: Side-by-side layout is ${viable ? 'VIABLE' : 'NOT RECOMMENDED'}`);
    });