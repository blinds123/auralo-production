const fs = require('fs').promises;

async function createImanStylePopup() {
    console.log('💎 Creating Iman Gadzhi Style Urgency Popup');
    console.log('==========================================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // Replace the butler popup with Iman Gadzhi style
    const imanPopupHTML = `
    <!-- Iman Gadzhi Style Urgency Popup -->
    <div class="iman-popup" id="imanPopup">
        <div class="iman-popup-content">
            <div class="iman-header">
                <div class="status-indicator">🔴 LIVE UPDATE</div>
                <button class="iman-close" onclick="closeImanPopup()">×</button>
            </div>
            <div class="iman-message">
                <div class="iman-title">XL Just Sold Out</div>
                <div class="iman-subtitle">
                    Look, I'm not here to pressure you... but 73 people 
                    are viewing this page right now and stock is moving FAST.
                </div>
                <div class="iman-cta">
                    The 1000-piece drop is almost gone. Don't be the person 
                    who waits and regrets it.
                </div>
            </div>
            <div class="iman-footer">
                <div class="viewer-count">
                    <span class="viewer-dot"></span>
                    <span id="viewerCount">73</span> people viewing
                </div>
            </div>
        </div>
    </div>`;
    
    // Replace butler popup with Iman style
    html = html.replace(
        /<!-- Butler Urgency Popup -->[\s\S]*?<\/div>/,
        imanPopupHTML
    );
    
    // Replace butler CSS with Iman style
    const imanPopupCSS = `
        /* IMAN GADZHI STYLE URGENCY POPUP */
        .iman-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%) scale(0.9);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        }
        
        .iman-popup.show {
            opacity: 1;
            transform: translateX(0) scale(1);
            pointer-events: all;
        }
        
        .iman-popup-content {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #ffffff;
            padding: 0;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #333;
            max-width: 340px;
            position: relative;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
        }
        
        .iman-header {
            background: linear-gradient(90deg, #ff006e 0%, #8338ec 100%);
            padding: var(--space-sm) var(--space-md);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .status-indicator {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .iman-close {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
            opacity: 0.8;
        }
        
        .iman-close:hover {
            background: rgba(255, 255, 255, 0.2);
            opacity: 1;
            transform: scale(1.1);
        }
        
        .iman-message {
            padding: var(--space-lg);
        }
        
        .iman-title {
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: var(--space-sm);
            color: #ff006e;
            line-height: 1.2;
        }
        
        .iman-subtitle {
            font-size: 1rem;
            line-height: 1.4;
            margin-bottom: var(--space-md);
            color: #e0e0e0;
            font-weight: 400;
        }
        
        .iman-cta {
            font-size: 0.95rem;
            line-height: 1.4;
            color: #ffffff;
            font-weight: 600;
            padding: var(--space-sm);
            background: rgba(255, 0, 110, 0.1);
            border-left: 3px solid #ff006e;
            border-radius: 4px;
        }
        
        .iman-footer {
            background: rgba(255, 255, 255, 0.05);
            padding: var(--space-sm) var(--space-md);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .viewer-count {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.85rem;
            color: #b0b0b0;
            font-weight: 500;
        }
        
        .viewer-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse-green 2s infinite;
        }
        
        @keyframes pulse-green {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        /* Mobile adjustments */
        @media (max-width: 480px) {
            .iman-popup {
                top: 10px;
                right: 10px;
                left: 10px;
                transform: translateY(-100%) scale(0.9);
            }
            
            .iman-popup.show {
                transform: translateY(0) scale(1);
            }
            
            .iman-popup-content {
                max-width: none;
            }
            
            .iman-message {
                padding: var(--space-md);
            }
            
            .iman-title {
                font-size: 1.2rem;
            }
            
            .iman-subtitle, .iman-cta {
                font-size: 0.9rem;
            }
        }
        
        /* Iman entrance animation */
        @keyframes imanSlide {
            0% { 
                transform: translateX(100%) scale(0.9);
                opacity: 0;
            }
            60% { 
                transform: translateX(-5px) scale(1.02);
                opacity: 1;
            }
            100% { 
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
        
        .iman-popup.iman-entrance {
            animation: imanSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }`;
    
    // Replace butler CSS with Iman CSS
    html = html.replace(
        /\/\* BUTLER URGENCY POPUP \*\/[\s\S]*?@keyframes butlerBow[\s\S]*?\}/g,
        imanPopupCSS
    );
    
    // Replace butler JavaScript with Iman JavaScript
    const imanPopupJS = `
        // Iman Gadzhi Style Popup Logic
        let imanShown = false;
        let viewerInterval;
        
        function showImanPopup() {
            if (imanShown) return;
            imanShown = true;
            
            const popup = document.getElementById('imanPopup');
            popup.classList.add('show');
            popup.classList.add('iman-entrance');
            
            // Start viewer count animation
            startViewerCount();
            
            // Auto-close after 12 seconds (Iman would want more time for impact)
            setTimeout(() => {
                if (popup.classList.contains('show')) {
                    closeImanPopup();
                }
            }, 12000);
        }
        
        function closeImanPopup() {
            const popup = document.getElementById('imanPopup');
            popup.classList.remove('show');
            popup.classList.remove('iman-entrance');
            
            // Stop viewer count animation
            if (viewerInterval) {
                clearInterval(viewerInterval);
            }
        }
        
        function startViewerCount() {
            const viewerElement = document.getElementById('viewerCount');
            let count = 73;
            
            viewerInterval = setInterval(() => {
                // Randomly fluctuate between 67-81 viewers (realistic movement)
                const change = Math.random() > 0.5 ? 1 : -1;
                count += change;
                
                // Keep within realistic bounds
                if (count < 67) count = 67;
                if (count > 81) count = 81;
                
                viewerElement.textContent = count;
            }, 3000);
        }
        
        // Show Iman popup after 10 seconds
        setTimeout(showImanPopup, 10000);
        
        // Also show if user tries to leave the page (exit intent)
        let exitShown = false;
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY <= 0 && !exitShown && !imanShown) {
                exitShown = true;
                showImanPopup();
            }
        });`;
    
    // Replace butler JavaScript
    html = html.replace(
        /\/\/ Butler Popup Logic[\s\S]*?}\);/,
        imanPopupJS
    );
    
    // Update function names in HTML
    html = html.replace(/closeButlerPopup/g, 'closeImanPopup');
    html = html.replace(/butlerPopup/g, 'imanPopup');
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ IMAN GADZHI STYLE POPUP CREATED!');
    console.log('==================================');
    console.log('🔥 Direct, no-BS messaging');
    console.log('💎 "XL Just Sold Out" headline');
    console.log('👥 Live viewer count (67-81 fluctuation)');
    console.log('🚨 "Don\'t be the person who waits and regrets"');
    console.log('⚡ Clean, modern black/gradient design');
    console.log('📱 Mobile-optimized');
    console.log('🎯 Exit intent trigger + 10 second timer');
    console.log('💪 Pure Iman Gadzhi energy!');
}

createImanStylePopup().catch(console.error);