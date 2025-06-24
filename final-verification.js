const puppeteer = require('puppeteer');

async function finalVerification() {
    console.log('🚀 FINAL VERIFICATION - FERRARI LEVEL QUALITY CHECK');
    console.log('================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1200, height: 800 }
    });
    
    try {
        const page = await browser.newPage();
        
        // Enable console logging
        page.on('console', msg => {
            const text = msg.text();
            if (text.includes('XL Timer') || text.includes('⏰') || text.includes('🔥')) {
                console.log('🖥️ ', text);
            }
        });
        
        console.log('🔍 Loading main page...');
        await page.goto('http://localhost:8000/index.html', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        console.log('📸 Taking initial screenshot...');
        await page.screenshot({ 
            path: 'final-verification-initial.png',
            fullPage: true 
        });
        
        // CHECK 1: Blue section removal
        console.log('\n1️⃣ CHECKING: Blue section removal...');
        const blueSectionExists = await page.evaluate(() => {
            const text = document.body.innerText || document.body.textContent;
            return text.includes('60-Second Eco-Checkout') || text.includes('Simple 60-Second Eco-Checkout');
        });
        console.log(`   Result: ${blueSectionExists ? '❌ STILL EXISTS' : '✅ SUCCESSFULLY REMOVED'}`);
        
        // CHECK 2: Complete Your Exchange section
        console.log('\n2️⃣ CHECKING: Complete Your Exchange section...');
        const completeExchangeExists = await page.evaluate(() => {
            const text = document.body.innerText || document.body.textContent;
            return text.includes('Complete Your Exchange');
        });
        console.log(`   Result: ${completeExchangeExists ? '✅ EXISTS' : '❌ MISSING'}`);
        
        // CHECK 3: Aesthetic circles around arrows
        console.log('\n3️⃣ CHECKING: Aesthetic circles around arrows...');
        const arrowCircles = await page.evaluate(() => {
            const bottomArrow = document.querySelector('.arrow-exchange-bottom::before');
            const walletArrow = document.querySelector('.arrow-wallet-bottom::before');
            
            // Check computed styles
            const bottomArrowStyle = getComputedStyle(document.querySelector('.arrow-exchange-bottom'), '::before');
            const walletArrowStyle = getComputedStyle(document.querySelector('.arrow-wallet-bottom'), '::before');
            
            return {
                bottomArrowHasCircle: bottomArrowStyle.borderRadius.includes('50%') || bottomArrowStyle.borderRadius === '50%',
                walletArrowHasCircle: walletArrowStyle.borderRadius.includes('50%') || walletArrowStyle.borderRadius === '50%',
                bottomArrowHasBackground: bottomArrowStyle.backgroundColor !== 'rgba(0, 0, 0, 0)',
                walletArrowHasBackground: walletArrowStyle.backgroundColor !== 'rgba(0, 0, 0, 0)'
            };
        });
        console.log(`   Bottom arrow circle: ${arrowCircles.bottomArrowHasCircle ? '✅' : '❌'}`);
        console.log(`   Wallet arrow circle: ${arrowCircles.walletArrowHasCircle ? '✅' : '❌'}`);
        
        // CHECK 4: XL Timer functionality
        console.log('\n4️⃣ CHECKING: XL Timer...');
        const xlTimerCheck = await page.evaluate(() => {
            return {
                xlTimerExists: window.xlTimer !== undefined,
                xlButtonExists: document.querySelector('.size-option[data-size="XL"]') !== null,
                xlButtonAvailable: document.querySelector('.size-option[data-size="XL"]')?.classList.contains('available') || false
            };
        });
        console.log(`   XL Timer object: ${xlTimerCheck.xlTimerExists ? '✅ EXISTS' : '❌ MISSING'}`);
        console.log(`   XL Button exists: ${xlTimerCheck.xlButtonExists ? '✅ EXISTS' : '❌ MISSING'}`);
        console.log(`   XL Button available: ${xlTimerCheck.xlButtonAvailable ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}`);
        
        // CHECK 5: Carousels
        console.log('\n5️⃣ CHECKING: Carousels...');
        const carousels = await page.evaluate(() => {
            return {
                story: document.querySelector('.story-carousel') !== null,
                tiktok: document.querySelector('.tiktok-carousel') !== null,
                trustpilot: document.querySelector('.trustpilot-carousel') !== null,
                universal: window.UniversalCarousel !== undefined
            };
        });
        console.log(`   Story carousel: ${carousels.story ? '✅ EXISTS' : '❌ MISSING'}`);
        console.log(`   TikTok carousel: ${carousels.tiktok ? '✅ EXISTS' : '❌ MISSING'}`);
        console.log(`   Trustpilot carousel: ${carousels.trustpilot ? '✅ EXISTS' : '❌ MISSING'}`);
        console.log(`   Universal carousel system: ${carousels.universal ? '✅ EXISTS' : '❌ MISSING'}`);
        
        // WAIT FOR XL TIMER
        console.log('\n⏰ WAITING 13 SECONDS TO TEST XL TIMER...');
        console.log('   Watching for XL sellout and popup...');
        
        let popupAppeared = false;
        let xlSoldOut = false;
        
        // Monitor for changes
        const startTime = Date.now();
        while (Date.now() - startTime < 13000) {
            const xlStatus = await page.evaluate(() => {
                const xlButton = document.querySelector('.size-option[data-size="XL"]');
                const popup = document.querySelector('.xl-simple-popup');
                return {
                    soldOut: xlButton ? xlButton.classList.contains('sold-out') : false,
                    popupExists: popup !== null
                };
            });
            
            if (xlStatus.soldOut && !xlSoldOut) {
                console.log('   🔥 XL SOLD OUT DETECTED!');
                xlSoldOut = true;
            }
            
            if (xlStatus.popupExists && !popupAppeared) {
                console.log('   🚨 POPUP APPEARED!');
                popupAppeared = true;
                
                // Take screenshot with popup
                await page.screenshot({ 
                    path: 'final-verification-popup.png',
                    fullPage: true 
                });
                
                // Close popup
                await page.evaluate(() => {
                    const popup = document.querySelector('.xl-simple-popup');
                    if (popup) popup.remove();
                });
                
                break;
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // FINAL REPORT
        console.log('\n🏆 FINAL FERRARI-LEVEL QUALITY REPORT');
        console.log('=====================================');
        
        const allGood = !blueSectionExists && completeExchangeExists && xlTimerCheck.xlTimerExists && 
                        xlTimerCheck.xlButtonExists && carousels.universal && xlSoldOut && popupAppeared;
        
        console.log(`1. Blue section removed: ${!blueSectionExists ? '✅' : '❌'}`);
        console.log(`2. Complete Your Exchange exists: ${completeExchangeExists ? '✅' : '❌'}`);
        console.log(`3. Aesthetic circles around arrows: ${arrowCircles.bottomArrowHasCircle && arrowCircles.walletArrowHasCircle ? '✅' : '❌'}`);
        console.log(`4. XL Timer working: ${xlTimerCheck.xlTimerExists && xlSoldOut ? '✅' : '❌'}`);
        console.log(`5. XL Popup appeared: ${popupAppeared ? '✅' : '❌'}`);
        console.log(`6. Carousels functional: ${carousels.universal ? '✅' : '❌'}`);
        
        console.log(`\n🎯 OVERALL STATUS: ${allGood ? '🏆 FERRARI LEVEL ACHIEVED!' : '⚠️ NEEDS ATTENTION'}`);
        
        console.log('\n📸 Screenshots saved:');
        console.log('   - final-verification-initial.png');
        console.log('   - final-verification-popup.png');
        
        console.log('\n🔍 Browser will stay open for manual inspection...');
        console.log('Press Ctrl+C to close...');
        
        await new Promise(() => {}); // Keep browser open
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
    } finally {
        // Don't auto-close - let user inspect
    }
}

finalVerification();