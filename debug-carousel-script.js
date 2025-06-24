// COMPREHENSIVE CAROUSEL DEBUG SCRIPT
// This script will help identify exactly what's wrong with the carousels

console.log('🔍 Starting comprehensive carousel debugging...');

// 1. Check if all necessary elements exist
function checkCarouselElements() {
    console.log('🔍 Checking carousel elements...');
    
    const carousels = [
        {
            name: 'Story',
            container: 'storyCarousel',
            slides: 'storySlides',
            controls: '#storyControls .story-control'
        },
        {
            name: 'TikTok',
            container: 'tiktokCarousel',
            slides: 'tiktokSlides',
            controls: '#tiktokControls .review-control'
        },
        {
            name: 'Trustpilot',
            container: 'trustpilotCarousel',
            slides: 'trustpilotSlides',
            controls: '#trustpilotControls .review-control'
        }
    ];
    
    carousels.forEach(carousel => {
        console.log(`\n🎠 Checking ${carousel.name} Carousel:`);
        
        const container = document.getElementById(carousel.container);
        const slides = document.getElementById(carousel.slides);
        const controls = document.querySelectorAll(carousel.controls);
        
        console.log(`  Container (${carousel.container}):`, container ? '✅ Found' : '❌ Missing');
        console.log(`  Slides (${carousel.slides}):`, slides ? '✅ Found' : '❌ Missing');
        console.log(`  Controls (${carousel.controls}):`, controls.length > 0 ? `✅ Found ${controls.length}` : '❌ Missing');
        
        if (slides) {
            const slideElements = slides.querySelectorAll('.story-slide, .review-slide');
            console.log(`  Slide count: ${slideElements.length}`);
        }
        
        // Check if carousel instance exists
        const instanceName = carousel.name.toLowerCase() + 'Carousel';
        const instance = window[instanceName];
        console.log(`  Instance (window.${instanceName}):`, instance ? '✅ Found' : '❌ Missing');
        
        if (instance) {
            console.log(`    - slideCount: ${instance.slideCount}`);
            console.log(`    - currentIndex: ${instance.currentIndex}`);
            console.log(`    - autoAdvanceTime: ${instance.autoAdvanceTime}ms`);
        }
    });
}

// 2. Test carousel functionality
function testCarouselFunctionality() {
    console.log('\n🧪 Testing carousel functionality...');
    
    const carousels = ['storyCarousel', 'tiktokCarousel', 'trustpilotCarousel'];
    
    carousels.forEach(carouselName => {
        const instance = window[carouselName];
        if (instance) {
            console.log(`\n🎠 Testing ${carouselName}:`);
            
            try {
                const originalIndex = instance.currentIndex;
                
                // Test next()
                instance.next();
                console.log(`  next() test: ${originalIndex} → ${instance.currentIndex}`);
                
                // Test prev()
                instance.prev();
                console.log(`  prev() test: ${instance.currentIndex} → ${originalIndex}`);
                
                // Test goToSlide()
                instance.goToSlide(0);
                console.log(`  goToSlide(0) test: current = ${instance.currentIndex}`);
                
                console.log(`  ✅ ${carouselName} functionality working`);
            } catch (error) {
                console.error(`  ❌ ${carouselName} error:`, error);
            }
        } else {
            console.log(`  ❌ ${carouselName} instance not found`);
        }
    });
}

// 3. Check for JavaScript errors
function checkForErrors() {
    console.log('\n🚨 Checking for JavaScript errors...');
    
    const originalError = console.error;
    const errors = [];
    
    console.error = function(...args) {
        errors.push(args.join(' '));
        originalError.apply(console, arguments);
    };
    
    setTimeout(() => {
        if (errors.length === 0) {
            console.log('✅ No JavaScript errors detected');
        } else {
            console.log(`❌ Found ${errors.length} JavaScript errors:`);
            errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error}`);
            });
        }
    }, 5000);
}

// 4. Test DOM readiness
function checkDOMReadiness() {
    console.log('\n📄 Checking DOM readiness...');
    console.log(`Document ready state: ${document.readyState}`);
    console.log(`Window loaded: ${document.readyState === 'complete'}`);
    
    if (document.readyState !== 'complete') {
        console.log('⚠️ DOM not fully loaded yet, waiting...');
        window.addEventListener('load', () => {
            console.log('✅ Window load event fired');
            setTimeout(runFullDiagnostic, 3000);
        });
    }
}

// 5. Test navigation buttons
function testNavigationButtons() {
    console.log('\n🔲 Testing navigation buttons...');
    
    const leftButtons = document.querySelectorAll('.carousel-nav-left');
    const rightButtons = document.querySelectorAll('.carousel-nav-right');
    
    console.log(`Left nav buttons found: ${leftButtons.length}`);
    console.log(`Right nav buttons found: ${rightButtons.length}`);
    
    leftButtons.forEach((button, index) => {
        const onclick = button.getAttribute('onclick');
        console.log(`  Left button ${index + 1}: ${onclick ? '✅ Has onclick' : '❌ No onclick'}`);
    });
    
    rightButtons.forEach((button, index) => {
        const onclick = button.getAttribute('onclick');
        console.log(`  Right button ${index + 1}: ${onclick ? '✅ Has onclick' : '❌ No onclick'}`);
    });
}

// 6. Test auto-advance functionality
function testAutoAdvance() {
    console.log('\n⏰ Testing auto-advance functionality...');
    
    ['storyCarousel', 'tiktokCarousel', 'trustpilotCarousel'].forEach(carouselName => {
        const instance = window[carouselName];
        if (instance && instance.autoAdvanceInterval) {
            console.log(`✅ ${carouselName} auto-advance is active`);
        } else {
            console.log(`❌ ${carouselName} auto-advance not working`);
        }
    });
}

// 7. Comprehensive diagnostic
function runFullDiagnostic() {
    console.log('\n🚀 RUNNING FULL DIAGNOSTIC...\n');
    
    checkDOMReadiness();
    checkCarouselElements();
    testCarouselFunctionality();
    testNavigationButtons();
    testAutoAdvance();
    checkForErrors();
    
    console.log('\n✅ Full diagnostic complete!');
}

// 8. Generate diagnostic report
function generateDiagnosticReport() {
    console.log('\n📊 DIAGNOSTIC REPORT:');
    console.log('==========================================');
    
    const report = {
        timestamp: new Date().toISOString(),
        domReady: document.readyState === 'complete',
        carousels: {},
        navigationButtons: {
            left: document.querySelectorAll('.carousel-nav-left').length,
            right: document.querySelectorAll('.carousel-nav-right').length
        }
    };
    
    ['storyCarousel', 'tiktokCarousel', 'trustpilotCarousel'].forEach(name => {
        const instance = window[name];
        report.carousels[name] = {
            exists: !!instance,
            slideCount: instance ? instance.slideCount : 0,
            autoAdvance: instance ? !!instance.autoAdvanceInterval : false
        };
    });
    
    console.log(JSON.stringify(report, null, 2));
    return report;
}

// Auto-run diagnostic when script loads
if (document.readyState === 'complete') {
    setTimeout(runFullDiagnostic, 1000);
} else {
    window.addEventListener('load', () => {
        setTimeout(runFullDiagnostic, 3000);
    });
}

// Make functions available globally for manual testing
window.debugCarousels = {
    checkElements: checkCarouselElements,
    testFunctionality: testCarouselFunctionality,
    testButtons: testNavigationButtons,
    testAutoAdvance: testAutoAdvance,
    runDiagnostic: runFullDiagnostic,
    generateReport: generateDiagnosticReport
};

console.log('🔧 Debug functions available at window.debugCarousels');