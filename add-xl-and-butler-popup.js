const fs = require('fs').promises;

async function addXLAndButlerPopup() {
    console.log('🎩 Adding XL Size & Butler Urgency Popup');
    console.log('======================================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // 1. Change XL from sold out to available
    html = html.replace(
        /<button class="size-option sold-out" disabled>\s*<span class="size-label">XL<\/span>\s*<span class="size-status">Sold Out<\/span>\s*<\/button>/,
        '<button class="size-option available" data-size="XL">\n                        <span class="size-label">XL</span>\n                        <span class="size-status">Few Left</span>\n                    </button>'
    );
    
    // 2. Add the beautiful butler popup HTML before closing body tag
    const butlerPopupHTML = `
    <!-- Butler Urgency Popup -->
    <div class="butler-popup" id="butlerPopup">
        <div class="butler-popup-content">
            <div class="butler-icon">🎩</div>
            <div class="butler-message">
                <div class="butler-greeting">Pardon the interruption, sir/madam</div>
                <div class="butler-announcement">
                    I regret to inform you that <strong>XL has just sold out</strong>. 
                    Our remaining sizes are moving quite briskly. 
                    Might I suggest securing yours promptly?
                </div>
                <div class="butler-signature">— Your Digital Butler</div>
            </div>
            <button class="butler-close" onclick="closeButlerPopup()">×</button>
        </div>
    </div>`;
    
    html = html.replace('</body>', butlerPopupHTML + '\n</body>');
    
    // 3. Add CSS for the butler popup
    const butlerPopupCSS = `
        /* BUTLER URGENCY POPUP */
        .butler-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%) scale(0.8);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: none;
        }
        
        .butler-popup.show {
            opacity: 1;
            transform: translateX(0) scale(1);
            pointer-events: all;
        }
        
        .butler-popup-content {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #f5f5f5;
            padding: var(--space-lg);
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border: 2px solid #d4af37;
            max-width: 320px;
            position: relative;
            font-family: 'Georgia', serif;
        }
        
        .butler-icon {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: var(--space-sm);
            filter: drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3));
        }
        
        .butler-greeting {
            font-size: 0.9rem;
            font-style: italic;
            color: #d4af37;
            text-align: center;
            margin-bottom: var(--space-sm);
            font-weight: 300;
        }
        
        .butler-announcement {
            font-size: 1rem;
            line-height: 1.5;
            text-align: center;
            margin-bottom: var(--space-md);
            color: #f5f5f5;
        }
        
        .butler-announcement strong {
            color: #ff6b6b;
            font-weight: 600;
        }
        
        .butler-signature {
            font-size: 0.85rem;
            font-style: italic;
            text-align: right;
            color: #d4af37;
            margin-top: var(--space-sm);
            font-weight: 300;
        }
        
        .butler-close {
            position: absolute;
            top: 8px;
            right: 12px;
            background: none;
            border: none;
            color: #d4af37;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .butler-close:hover {
            background: rgba(212, 175, 55, 0.2);
            transform: scale(1.1);
        }
        
        /* Mobile adjustments */
        @media (max-width: 480px) {
            .butler-popup {
                top: 10px;
                right: 10px;
                left: 10px;
                transform: translateY(-100%) scale(0.8);
            }
            
            .butler-popup.show {
                transform: translateY(0) scale(1);
            }
            
            .butler-popup-content {
                max-width: none;
                padding: var(--space-md);
            }
            
            .butler-announcement {
                font-size: 0.95rem;
            }
        }
        
        /* Elegant entrance animation */
        @keyframes butlerBow {
            0% { transform: translateX(100%) scale(0.8) rotateY(20deg); }
            50% { transform: translateX(-10px) scale(1.05) rotateY(-5deg); }
            100% { transform: translateX(0) scale(1) rotateY(0deg); }
        }
        
        .butler-popup.elegant-entrance {
            animation: butlerBow 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }`;
    
    // Insert CSS before closing </style>
    html = html.replace('</style>', butlerPopupCSS + '\n        </style>');
    
    // 4. Add JavaScript for the butler popup
    const butlerPopupJS = `
        // Butler Popup Logic
        let butlerShown = false;
        
        function showButlerPopup() {
            if (butlerShown) return;
            butlerShown = true;
            
            const popup = document.getElementById('butlerPopup');
            popup.classList.add('show');
            popup.classList.add('elegant-entrance');
            
            // Auto-close after 8 seconds if user doesn't interact
            setTimeout(() => {
                if (popup.classList.contains('show')) {
                    closeButlerPopup();
                }
            }, 8000);
        }
        
        function closeButlerPopup() {
            const popup = document.getElementById('butlerPopup');
            popup.classList.remove('show');
            popup.classList.remove('elegant-entrance');
        }
        
        // Show butler popup after 10 seconds
        setTimeout(showButlerPopup, 10000);
        
        // Also show if user hovers over sold out sizes
        document.addEventListener('DOMContentLoaded', function() {
            const soldOutSizes = document.querySelectorAll('.size-option.sold-out');
            soldOutSizes.forEach(size => {
                size.addEventListener('mouseenter', function() {
                    if (!butlerShown) {
                        showButlerPopup();
                    }
                });
            });
        });`;
    
    // Insert JavaScript before closing </script> tag in the main script section
    html = html.replace(
        'document.head.appendChild(style);\n        });\n    </script>',
        `document.head.appendChild(style);\n        });\n        \n        ${butlerPopupJS}\n    </script>`
    );
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ BUTLER POPUP & XL SIZE ADDED!');
    console.log('================================');
    console.log('👔 XL size now available (Few Left)');
    console.log('🎩 Butler popup appears after 10 seconds');
    console.log('💎 Elegant, discreet urgency messaging');
    console.log('📱 Mobile-responsive design');
    console.log('⏰ Auto-closes after 8 seconds');
    console.log('🎭 Butler-style sophisticated pressure');
}

addXLAndButlerPopup().catch(console.error);