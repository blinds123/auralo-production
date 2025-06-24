console.log('🔧 CAROUSEL DEBUG SCRIPT STARTING...');

// Debug carousel functionality
function debugCarousels() {
    console.log('🎠 DEBUGGING ALL CAROUSELS...');
    
    // Check if elements exist
    const storySlides = document.getElementById('storySlides');
    const storyControls = document.querySelectorAll('#storyControls .story-control');
    const tiktokSlides = document.getElementById('tiktokSlides');
    const tiktokControls = document.querySelectorAll('#tiktokControls .review-control');
    const trustpilotSlides = document.getElementById('trustpilotSlides');
    const trustpilotControls = document.querySelectorAll('#trustpilotControls .review-control');
    
    console.log('📊 ELEMENT CHECK:');
    console.log('Story slides:', storySlides ? '✅' : '❌', storySlides);
    console.log('Story controls:', storyControls.length, 'found');
    console.log('TikTok slides:', tiktokSlides ? '✅' : '❌', tiktokSlides);
    console.log('TikTok controls:', tiktokControls.length, 'found');
    console.log('Trustpilot slides:', trustpilotSlides ? '✅' : '❌', trustpilotSlides);
    console.log('Trustpilot controls:', trustpilotControls.length, 'found');
    
    // Test story carousel
    if (storySlides && storyControls.length > 0) {
        console.log('🎯 Testing Story Carousel...');
        testCarousel('story', storySlides, storyControls, 7);
    } else {
        console.error('❌ Story carousel elements missing');
    }
    
    // Test TikTok carousel
    if (tiktokSlides && tiktokControls.length > 0) {
        console.log('🎯 Testing TikTok Carousel...');
        testCarousel('tiktok', tiktokSlides, tiktokControls, 8);
    } else {
        console.error('❌ TikTok carousel elements missing');
    }
    
    // Test Trustpilot carousel
    if (trustpilotSlides && trustpilotControls.length > 0) {
        console.log('🎯 Testing Trustpilot Carousel...');
        testCarousel('trustpilot', trustpilotSlides, trustpilotControls, 5);
    } else {
        console.error('❌ Trustpilot carousel elements missing');
    }
}

function testCarousel(name, slides, controls, totalSlides) {
    console.log(`🔍 Testing ${name} carousel:`, slides, controls);
    
    // Test manual slide change
    try {
        slides.style.transform = 'translate3d(-100%, 0, 0)';
        console.log(`✅ ${name}: Manual slide change works`);
        
        // Reset
        setTimeout(() => {
            slides.style.transform = 'translate3d(0%, 0, 0)';
        }, 1000);
        
    } catch (error) {
        console.error(`❌ ${name}: Manual slide change failed:`, error);
    }
    
    // Test controls
    controls.forEach((control, index) => {
        try {
            control.addEventListener('click', () => {
                console.log(`🎯 ${name}: Control ${index} clicked`);
                slides.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
                
                // Update active state
                controls.forEach(c => c.classList.remove('active'));
                control.classList.add('active');
                
                console.log(`✅ ${name}: Slide ${index} activated`);
            });
        } catch (error) {
            console.error(`❌ ${name}: Control ${index} failed:`, error);
        }
    });
    
    console.log(`✅ ${name}: Controls setup complete (${controls.length}/${totalSlides})`);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', debugCarousels);
} else {
    debugCarousels();
}

console.log('🔧 CAROUSEL DEBUG SCRIPT LOADED');