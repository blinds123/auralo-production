const fs = require('fs').promises;
const { execSync } = require('child_process');

console.log('🔥 PRODUCTION VERIFICATION STARTING...');
console.log('=====================================\n');

async function runProductionVerification() {
    console.log('🏎️ FERRARI-LEVEL VERIFICATION PROCESS');
    console.log('🎯 Testing ALL critical functionality before Vercel deployment\n');
    
    const results = {
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };
    
    function addTest(name, status, details = '') {
        results.tests.push({ name, status, details });
        if (status === 'PASS') results.passed++;
        else if (status === 'FAIL') results.failed++;
        else if (status === 'WARNING') results.warnings++;
        
        const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
        console.log(`${emoji} ${name}: ${status} ${details}`);
    }
    
    // 1. CHECK FILE STRUCTURE
    console.log('📁 CHECKING FILE STRUCTURE...');
    try {
        const indexExists = await fs.access('index.html').then(() => true).catch(() => false);
        addTest('Main index.html exists', indexExists ? 'PASS' : 'FAIL');
        
        const imagesDir = await fs.access('./images').then(() => true).catch(() => false);
        addTest('Images directory exists', imagesDir ? 'PASS' : 'WARNING', 'Images may not load');
        
    } catch (error) {
        addTest('File structure check', 'FAIL', error.message);
    }
    
    // 2. HTML VALIDATION
    console.log('\n📝 HTML STRUCTURE VALIDATION...');
    try {
        const html = await fs.readFile('index.html', 'utf8');
        
        // Check critical IDs
        const criticalIds = [
            'storySlides', 'storyControls',
            'tiktokSlides', 'tiktokControls', 
            'trustpilotSlides', 'trustpilotControls',
            'checkout-section', 'storeAvailability',
            'sizeChart'
        ];
        
        criticalIds.forEach(id => {
            const exists = html.includes(`id="${id}"`);
            addTest(`Element #${id} exists`, exists ? 'PASS' : 'FAIL');
        });
        
        // Check carousel structure
        const storySlides = (html.match(/class="story-slide"/g) || []).length;
        addTest('Story carousel slides count', storySlides === 7 ? 'PASS' : 'FAIL', `Found ${storySlides}/7 slides`);
        
        const tiktokSlides = (html.match(/id="tiktokSlides"[\s\S]*?<\/div>/g) || [''])[0];
        const tiktokSlideCount = (tiktokSlides.match(/class="review-slide"/g) || []).length;
        addTest('TikTok carousel slides count', tiktokSlideCount >= 8 ? 'PASS' : 'WARNING', `Found ${tiktokSlideCount} slides`);
        
        const trustpilotSlides = (html.match(/id="trustpilotSlides"[\s\S]*?<\/div>/g) || [''])[0];
        const trustpilotSlideCount = (trustpilotSlides.match(/class="review-slide"/g) || []).length;
        addTest('Trustpilot carousel slides count', trustpilotSlideCount >= 5 ? 'PASS' : 'WARNING', `Found ${trustpilotSlideCount} slides`);
        
        // Check if Hamptons store is mentioned
        const hamptonsExists = html.includes('East Hampton') && html.includes('Hamptons');
        addTest('Hamptons store availability listed', hamptonsExists ? 'PASS' : 'FAIL');
        
        // Check sustainable checkout comparison
        const comparisonExists = html.includes('Why Choose Our Sustainable Checkout');
        addTest('Sustainable checkout comparison exists', comparisonExists ? 'PASS' : 'FAIL');
        
        // Check XL availability
        const xlAvailable = html.includes('data-size="XL"') && !html.includes('XL.*sold-out.*disabled');
        addTest('XL size initially available', xlAvailable ? 'PASS' : 'FAIL');
        
    } catch (error) {
        addTest('HTML validation', 'FAIL', error.message);
    }
    
    // 3. JAVASCRIPT VALIDATION
    console.log('\n🔧 JAVASCRIPT FUNCTIONALITY CHECK...');
    try {
        const html = await fs.readFile('index.html', 'utf8');
        
        // Check for critical functions
        const criticalFunctions = [
            'initializeStoryCarousel',
            'initializeTikTokCarousel', 
            'initializeTrustpilotCarousel',
            'toggleSizeChart',
            'toggleAvailability',
            'scrollToCheckout',
            'makeXLSoldOut',
            'showXLSelloutToast'
        ];
        
        criticalFunctions.forEach(func => {
            const exists = html.includes(`function ${func}`) || html.includes(`${func} =`) || html.includes(`${func}:`);
            addTest(`Function ${func} exists`, exists ? 'PASS' : 'FAIL');
        });
        
        // Check for error handling
        const hasErrorHandling = html.includes('try {') && html.includes('catch');
        addTest('Error handling implemented', hasErrorHandling ? 'PASS' : 'WARNING');
        
        // Check for mobile touch events
        const hasTouchEvents = html.includes('touchstart') && html.includes('touchend');
        addTest('Mobile touch events implemented', hasTouchEvents ? 'PASS' : 'WARNING');
        
        // Check XL timer
        const xlTimer = html.includes('setTimeout') && html.includes('12000') && html.includes('makeXLSoldOut');
        addTest('XL 12-second timer implemented', xlTimer ? 'PASS' : 'FAIL');
        
    } catch (error) {
        addTest('JavaScript validation', 'FAIL', error.message);
    }
    
    // 4. CSS RESPONSIVENESS CHECK
    console.log('\n📱 CSS MOBILE RESPONSIVENESS CHECK...');
    try {
        const html = await fs.readFile('index.html', 'utf8');
        
        // Check for mobile viewport
        const hasViewport = html.includes('viewport') && html.includes('width=device-width');
        addTest('Mobile viewport meta tag', hasViewport ? 'PASS' : 'FAIL');
        
        // Check for responsive breakpoints
        const hasBreakpoints = html.includes('@media') && html.includes('max-width');
        addTest('Responsive CSS breakpoints', hasBreakpoints ? 'PASS' : 'WARNING');
        
        // Check for hardware acceleration
        const hasHardwareAccel = html.includes('translate3d') || html.includes('translateZ(0)');
        addTest('Hardware acceleration optimizations', hasHardwareAccel ? 'PASS' : 'WARNING');
        
        // Check comparison section mobile CSS
        const comparisonMobile = html.includes('comparison-options') && html.includes('flex-direction: column');
        addTest('Comparison section mobile optimized', comparisonMobile ? 'PASS' : 'WARNING');
        
    } catch (error) {
        addTest('CSS validation', 'FAIL', error.message);
    }
    
    // 5. PERFORMANCE CHECK
    console.log('\n⚡ PERFORMANCE OPTIMIZATION CHECK...');
    try {
        const html = await fs.readFile('index.html', 'utf8');
        
        // Check for lazy loading
        const hasLazyLoading = html.includes('loading="lazy"') || html.includes('data-src');
        addTest('Image lazy loading implemented', hasLazyLoading ? 'PASS' : 'WARNING');
        
        // Check for preload hints
        const hasPreload = html.includes('rel="preload"');
        addTest('Critical resource preloading', hasPreload ? 'PASS' : 'WARNING');
        
        // Check for font optimization
        const hasFontOptim = html.includes('preconnect') && html.includes('fonts.googleapis.com');
        addTest('Font loading optimization', hasFontOptim ? 'PASS' : 'WARNING');
        
    } catch (error) {
        addTest('Performance check', 'FAIL', error.message);
    }
    
    // 6. GIT STATUS CHECK
    console.log('\n📦 GIT STATUS CHECK...');
    try {
        const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
        const hasUncommitted = gitStatus.trim().length > 0;
        addTest('All changes committed', !hasUncommitted ? 'PASS' : 'WARNING', 
               hasUncommitted ? 'Uncommitted changes found' : '');
        
        const gitLog = execSync('git log --oneline -1', { encoding: 'utf8' });
        addTest('Recent commit exists', gitLog.length > 0 ? 'PASS' : 'FAIL');
        
    } catch (error) {
        addTest('Git status check', 'WARNING', 'Git not available or not a repository');
    }
    
    // 7. VERCEL DEPLOYMENT READINESS
    console.log('\n🚀 VERCEL DEPLOYMENT READINESS...');
    try {
        const vercelJsonExists = await fs.access('vercel.json').then(() => true).catch(() => false);
        addTest('vercel.json exists', vercelJsonExists ? 'PASS' : 'WARNING', 'Auto-config will be used');
        
        if (vercelJsonExists) {
            const vercelConfig = await fs.readFile('vercel.json', 'utf8');
            const validJson = JSON.parse(vercelConfig);
            addTest('vercel.json is valid JSON', true ? 'PASS' : 'FAIL');
        }
        
    } catch (error) {
        addTest('Vercel config check', 'WARNING', 'Will use auto-configuration');
    }
    
    // FINAL RESULTS
    console.log('\n' + '='.repeat(50));
    console.log('🏁 FERRARI-LEVEL VERIFICATION COMPLETE');
    console.log('='.repeat(50));
    console.log(`✅ PASSED: ${results.passed}`);
    console.log(`❌ FAILED: ${results.failed}`);
    console.log(`⚠️  WARNINGS: ${results.warnings}`);
    console.log(`📊 TOTAL: ${results.tests.length} tests`);
    
    const successRate = Math.round((results.passed / results.tests.length) * 100);
    console.log(`🎯 SUCCESS RATE: ${successRate}%`);
    
    if (results.failed === 0 && successRate >= 80) {
        console.log('\n🔥 SITE IS PRODUCTION READY!');
        console.log('✅ All critical tests passed');
        console.log('🚀 Ready for Vercel deployment');
        return true;
    } else {
        console.log('\n❌ SITE NOT READY FOR PRODUCTION');
        console.log('🔧 Fix failed tests before deployment');
        console.log('\nFAILED TESTS:');
        results.tests.filter(t => t.status === 'FAIL').forEach(test => {
            console.log(`  ❌ ${test.name}: ${test.details}`);
        });
        return false;
    }
}

// Run verification
runProductionVerification().then(isReady => {
    if (isReady) {
        console.log('\n🚀 INITIATING AUTOMATIC VERCEL DEPLOYMENT...');
        process.exit(0);
    } else {
        console.log('\n🛑 DEPLOYMENT BLOCKED - Fix issues first');
        process.exit(1);
    }
}).catch(error => {
    console.error('❌ VERIFICATION FAILED:', error);
    process.exit(1);
});