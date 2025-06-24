const fs = require('fs').promises;

async function fixMobileComparison() {
    console.log('🔧 ULTRA FIXING MOBILE COMPARISON TABLE');
    console.log('=====================================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // 1. Replace the entire comparison section with mobile-first design
    const newComparisonHTML = `
    <section class="comparison-section">
        <div class="container">
            <h2 class="section-title">Why Choose Our Sustainable Checkout?</h2>
            
            <!-- Mobile-First Comparison Cards -->
            <div class="comparison-cards-mobile">
                <div class="comparison-feature-card">
                    <h3 class="feature-title">💰 Processing Fees</h3>
                    <div class="feature-comparison">
                        <div class="traditional-option">
                            <div class="option-label">Traditional</div>
                            <div class="option-value negative">❌ HIGH: $3.00-$5.00</div>
                        </div>
                        <div class="eco-option">
                            <div class="option-label">Our Eco-Checkout</div>
                            <div class="option-value positive">✅ LOW: $0.25</div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-feature-card">
                    <h3 class="feature-title">🌱 Environmental Impact</h3>
                    <div class="feature-comparison">
                        <div class="traditional-option">
                            <div class="option-label">Traditional</div>
                            <div class="option-value negative">❌ ZERO Impact</div>
                        </div>
                        <div class="eco-option">
                            <div class="option-label">Our Eco-Checkout</div>
                            <div class="option-value positive">✅ Plants 5 Trees</div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-feature-card">
                    <h3 class="feature-title">⏱️ Checkout Time</h3>
                    <div class="feature-comparison">
                        <div class="traditional-option">
                            <div class="option-label">Traditional</div>
                            <div class="option-value negative">❌ SLOW: 3-5 min</div>
                        </div>
                        <div class="eco-option">
                            <div class="option-label">Our Eco-Checkout</div>
                            <div class="option-value positive">✅ FAST: 60 sec</div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-feature-card">
                    <h3 class="feature-title">💸 Your Savings</h3>
                    <div class="feature-comparison">
                        <div class="traditional-option">
                            <div class="option-label">Traditional</div>
                            <div class="option-value negative">❌ $0 Saved</div>
                        </div>
                        <div class="eco-option">
                            <div class="option-label">Our Eco-Checkout</div>
                            <div class="option-value positive">✅ Save $3-5</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="comparison-conclusion">
                <p>You save money. Planet gets trees. Everyone wins.</p>
            </div>
        </div>
        
        <div class="section-cta">
            <button class="buy-now-button" onclick="scrollToCheckout()">
                Choose Eco-Checkout - $20
            </button>
        </div>
    </section>`;
    
    // Replace the old comparison section
    html = html.replace(
        /<section class="comparison-section">[\s\S]*?<\/section>/,
        newComparisonHTML
    );
    
    // 2. Add new CSS for mobile-first comparison cards
    const newComparisonCSS = `
        /* MOBILE-FIRST COMPARISON CARDS */
        .comparison-cards-mobile {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
            margin: var(--space-xl) 0;
        }
        
        .comparison-feature-card {
            background: var(--big-day-white);
            border-radius: 16px;
            padding: var(--space-lg);
            box-shadow: var(--shadow-light);
            border: 2px solid var(--border-subtle);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .comparison-feature-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-elevated);
        }
        
        .feature-title {
            font-family: var(--font-headline);
            font-size: 1.3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: var(--space-md);
            color: var(--text-primary);
        }
        
        .feature-comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-md);
            align-items: center;
        }
        
        .traditional-option,
        .eco-option {
            text-align: center;
            padding: var(--space-md);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .traditional-option {
            background: #ffebee;
            border: 2px solid #ffcdd2;
        }
        
        .eco-option {
            background: var(--simpleswap-light-blue);
            border: 2px solid var(--simpleswap-blue);
        }
        
        .option-label {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: var(--space-xs);
            opacity: 0.8;
        }
        
        .option-value {
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.2;
        }
        
        .option-value.negative {
            color: #d32f2f;
        }
        
        .option-value.positive {
            color: var(--simpleswap-blue);
        }
        
        /* Desktop Enhancement */
        @media (min-width: 768px) {
            .comparison-cards-mobile {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: var(--space-lg);
            }
            
            .feature-comparison {
                grid-template-columns: 1fr;
                gap: var(--space-sm);
            }
            
            .traditional-option,
            .eco-option {
                padding: var(--space-sm);
            }
        }
        
        @media (min-width: 1024px) {
            .comparison-cards-mobile {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        /* Mobile Specific Improvements */
        @media (max-width: 479px) {
            .comparison-feature-card {
                padding: var(--space-md);
            }
            
            .feature-title {
                font-size: 1.1rem;
            }
            
            .option-value {
                font-size: 0.9rem;
            }
        }`;
    
    // Insert new CSS before the closing </style> tag
    html = html.replace('</style>', newComparisonCSS + '\n        </style>');
    
    // 3. Remove old comparison CSS to avoid conflicts
    html = html.replace(/\/\* COMPARISON.*?\*\/[\s\S]*?\.comparison-conclusion \{[\s\S]*?\}/g, '');
    html = html.replace(/\.comparison-grid[\s\S]*?background: var\(--border-subtle\);[\s\S]*?\}/g, '');
    html = html.replace(/@media \(max-width: 768px\) \{[\s\S]*?\.comparison-grid[\s\S]*?\}/g, '');
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ MOBILE COMPARISON FIXED!');
    console.log('==========================');
    console.log('📱 Mobile-first card design');
    console.log('💯 Touch-friendly interactions');
    console.log('🎨 Beautiful visual hierarchy');
    console.log('⚡ Responsive across all devices');
    console.log('🔥 No more table layout issues!');
}

fixMobileComparison().catch(console.error);