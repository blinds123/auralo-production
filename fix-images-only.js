// MINIMAL IMAGE LOADING FIX - PRESERVE ORIGINAL DESIGN
console.log('🖼️ FIXING IMAGE LOADING - KEEPING ORIGINAL DESIGN');

// Fix image loading by converting data-src to src for immediate loading
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 Fixing lazy loading images...');
    
    // Find all images with data-src and convert them to src for immediate loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    lazyImages.forEach((img, index) => {
        console.log(`📷 Converting image ${index + 1}: ${img.dataset.src}`);
        
        // Set the actual source from data-src
        img.src = img.dataset.src;
        
        // Remove the data-src attribute as it's no longer needed
        img.removeAttribute('data-src');
        
        // Add loading="lazy" for performance
        img.setAttribute('loading', 'lazy');
        
        // Add error handling
        img.onerror = function() {
            console.error(`❌ Failed to load: ${this.src}`);
        };
        
        img.onload = function() {
            console.log(`✅ Loaded: ${this.src.split('/').pop()}`);
        };
    });
    
    console.log(`🎯 Fixed ${lazyImages.length} lazy-loaded images`);
    
    // Also check if there are any broken image references
    setTimeout(() => {
        const allImages = document.querySelectorAll('img');
        let loadedCount = 0;
        let failedCount = 0;
        
        allImages.forEach(img => {
            if (img.complete && img.naturalHeight > 0) {
                loadedCount++;
            } else if (img.complete && img.naturalHeight === 0) {
                failedCount++;
                console.error(`❌ Broken image: ${img.src}`);
            }
        });
        
        console.log(`📊 Image Loading Status:`);
        console.log(`   ✅ Loaded: ${loadedCount}`);
        console.log(`   ❌ Failed: ${failedCount}`);
        console.log(`   Total: ${allImages.length}`);
    }, 2000);
});