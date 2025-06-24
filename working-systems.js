// WORKING CAROUSEL AND XL TIMER SYSTEM
console.log('🚀 WORKING SYSTEMS LOADING...');

// Working carousel implementation
function createWorkingCarousel(containerId, slideSelector) {
    const container = document.getElementById(containerId);
    const slides = document.querySelectorAll(slideSelector);
    
    if (!container || slides.length === 0) {
        console.warn('❌ Carousel ' + containerId + ' not found');
        return null;
    }
    
    let currentIndex = 0;
    
    function updateSlides() {
        slides.forEach(function(slide, index) {
            if (index === currentIndex) {
                slide.style.opacity = '1';
                slide.style.display = 'block';
                slide.style.zIndex = '10';
            } else {
                slide.style.opacity = '0';
                slide.style.display = 'none';
                slide.style.zIndex = '1';
            }
            slide.style.transition = 'opacity 0.5s ease';
        });
        
        // Force image loading for current slide
        const currentSlide = slides[currentIndex];
        const img = currentSlide.querySelector('img[data-src]');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            console.log('🖼️ Loading image for slide ' + (currentIndex + 1));
        }
    }
    
    function next() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
        console.log('📱 ' + containerId + ' next: slide ' + (currentIndex + 1) + '/' + slides.length);
    }
    
    function prev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
        console.log('📱 ' + containerId + ' prev: slide ' + (currentIndex + 1) + '/' + slides.length);
    }
    
    // Initialize
    updateSlides();
    
    // Preload all images
    function preloadImages() {
        slides.forEach(function(slide, index) {
            const img = slide.querySelector('img[data-src]');
            if (img && img.dataset.src) {
                const newImg = new Image();
                newImg.onload = function() {
                    console.log('🖼️ Preloaded image for slide ' + (index + 1));
                    if (index === currentIndex) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                };
                newImg.src = img.dataset.src;
            }
        });
    }
    
    // Start preloading
    setTimeout(preloadImages, 1000);
    
    // Auto-advance
    setInterval(next, 4000);
    
    console.log('✅ ' + containerId + ' carousel initialized with ' + slides.length + ' slides');
    
    return { next: next, prev: prev, currentIndex: currentIndex, slideCount: slides.length };
}

// Initialize carousels
setTimeout(function() {
    console.log('🎠 Creating working carousels...');
    
    window.storyCarousel = createWorkingCarousel('storyCarousel', '#storySlides .story-slide');
    window.tiktokCarousel = createWorkingCarousel('tiktokCarousel', '#tiktokSlides .review-slide');
    window.trustpilotCarousel = createWorkingCarousel('trustpilotCarousel', '#trustpilotSlides .review-slide');
    
    console.log('🎆 WORKING CAROUSELS INITIALIZED!');
    
    // Test carousels
    setTimeout(function() {
        if (window.storyCarousel && window.storyCarousel.next) {
            console.log('✅ Story carousel test: next()');
            window.storyCarousel.next();
        }
        if (window.tiktokCarousel && window.tiktokCarousel.next) {
            console.log('✅ TikTok carousel test: next()');
            window.tiktokCarousel.next();
        }
        if (window.trustpilotCarousel && window.trustpilotCarousel.next) {
            console.log('✅ Trustpilot carousel test: next()');
            window.trustpilotCarousel.next();
        }
    }, 2000);
}, 3000);

// 13-second XL timer
console.log('⏰ Starting 13-second XL timer...');

setTimeout(function() {
    console.log('🚨 13 SECONDS ELAPSED - TRIGGERING XL SOLD OUT!');
    
    // Change XL button to sold out
    var xlButton = document.querySelector('.size-option[data-size="XL"]');
    if (xlButton) {
        xlButton.classList.remove('available');
        xlButton.classList.add('sold-out');
        xlButton.disabled = true;
        
        var statusSpan = xlButton.querySelector('.size-status');
        if (statusSpan) {
            statusSpan.textContent = 'Just Sold Out';
        }
        
        console.log('🔥 XL button changed to SOLD OUT');
    }
    
    // Create overlay popup
    var popup = document.createElement('div');
    popup.id = 'xl-soldout-overlay';
    popup.innerHTML = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); z-index: 2147483647; display: flex; align-items: center; justify-content: center; padding: 20px;"><div style="background: linear-gradient(135deg, #ff4757, #ff3742); color: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 450px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.6);"><div style="font-size: 5rem; margin-bottom: 20px;">🔥🚨🔥</div><h2 style="font-size: 2.5rem; margin-bottom: 20px; font-weight: 900;">SIZE XL JUST SOLD OUT!</h2><p style="margin-bottom: 30px; font-size: 1.2rem;">Don\'t miss out on the remaining sizes!<br>Limited quantities available.</p><button onclick="document.getElementById(\'xl-soldout-overlay\').remove()" style="background: white; color: #ff4757; border: none; padding: 18px 35px; border-radius: 30px; font-weight: bold; font-size: 1.2rem; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.3);">GOT IT!</button></div></div>';
    
    document.body.appendChild(popup);
    console.log('🚨 OVERLAY POPUP DISPLAYED - VISIBLE ANYWHERE ON PAGE!');
    
    // Auto-remove after 10 seconds
    setTimeout(function() {
        var existingPopup = document.getElementById('xl-soldout-overlay');
        if (existingPopup) {
            existingPopup.remove();
            console.log('🕐 Popup auto-removed after 10 seconds');
        }
    }, 10000);
    
}, 13000);

console.log('🏁 ALL SYSTEMS READY - 13 SECOND COUNTDOWN STARTED!');