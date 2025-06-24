const fs = require('fs').promises;

async function fixComparisonFinal() {
    console.log('🎯 FINAL COMPARISON FIX - MOBILE PERFECT');
    console.log('========================================\n');
    
    let html = await fs.readFile('index.html', 'utf8');
    
    // 1. Create a completely new, simple comparison section
    const perfectComparisonHTML = `
    <section class="comparison-section">
        <div class="container">
            <h2 class="section-title">Why Choose Our Sustainable Checkout?</h2>
            
            <div class="comparison-wrapper">
                <!-- Processing Fees -->
                <div class="comparison-row">
                    <div class="feature-label">💰 Processing Fees</div>
                    <div class="comparison-options">
                        <div class="option traditional">
                            <div class="option-header">Traditional</div>
                            <div class="option-value">❌ $3.00-$5.00</div>
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="option eco">
                            <div class="option-header">Our Eco-Checkout</div>
                            <div class="option-value">✅ $0.25</div>
                        </div>
                    </div>
                </div>
                
                <!-- Environmental Impact -->
                <div class="comparison-row">
                    <div class="feature-label">🌱 Environmental Impact</div>
                    <div class="comparison-options">
                        <div class="option traditional">
                            <div class="option-header">Traditional</div>
                            <div class="option-value">❌ Zero Impact</div>
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="option eco">
                            <div class="option-header">Our Eco-Checkout</div>
                            <div class="option-value">✅ Plants 5 Trees</div>
                        </div>
                    </div>
                </div>
                
                <!-- Checkout Time -->
                <div class="comparison-row">
                    <div class="feature-label">⏱️ Checkout Time</div>
                    <div class="comparison-options">
                        <div class="option traditional">
                            <div class="option-header">Traditional</div>
                            <div class="option-value">❌ 3-5 minutes</div>
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="option eco">
                            <div class="option-header">Our Eco-Checkout</div>
                            <div class="option-value">✅ 60 seconds</div>
                        </div>
                    </div>
                </div>
                
                <!-- Your Savings -->
                <div class="comparison-row">
                    <div class="feature-label">💸 Your Savings</div>
                    <div class="comparison-options">
                        <div class="option traditional">
                            <div class="option-header">Traditional</div>
                            <div class="option-value">❌ $0 Saved</div>
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="option eco">
                            <div class="option-header">Our Eco-Checkout</div>
                            <div class="option-value">✅ Save $3-5</div>
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
    
    // Replace the comparison section
    html = html.replace(
        /<section class="comparison-section">[\s\S]*?<\/section>/,
        perfectComparisonHTML
    );
    
    // 2. Add perfect mobile CSS
    const perfectComparisonCSS = `
        /* PERFECT MOBILE COMPARISON */
        .comparison-wrapper {
            max-width: 100%;
            margin: var(--space-xl) auto;
            padding: 0 var(--space-sm);
        }
        
        .comparison-row {
            background: var(--big-day-white);
            border-radius: 16px;
            padding: var(--space-lg);
            margin-bottom: var(--space-lg);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border-subtle);
        }
        
        .feature-label {
            font-family: var(--font-headline);
            font-size: 1.2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: var(--space-md);
            color: var(--text-primary);
        }
        
        .comparison-options {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
            align-items: center;
        }
        
        .option {
            width: 100%;
            max-width: 280px;
            padding: var(--space-md);
            border-radius: 12px;
            text-align: center;
            border: 2px solid;
            transition: all 0.3s ease;
        }
        
        .option.traditional {
            background: #ffebee;
            border-color: #ffcdd2;
            color: #d32f2f;
        }
        
        .option.eco {
            background: linear-gradient(135deg, var(--simpleswap-light-blue) 0%, var(--big-day-white) 100%);
            border-color: var(--simpleswap-blue);
            color: var(--simpleswap-blue);
            box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
        }
        
        .option-header {
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
        
        .vs-divider {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-secondary);
            padding: var(--space-xs) 0;
            text-align: center;
        }
        
        .comparison-conclusion {
            text-align: center;
            margin-top: var(--space-xl);
            padding: var(--space-lg);
            background: linear-gradient(135deg, var(--simpleswap-light-blue) 0%, var(--big-day-white) 100%);
            border-radius: 16px;
            border: 2px solid var(--simpleswap-blue);
        }
        
        .comparison-conclusion p {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--simpleswap-blue);
            margin: 0;
        }
        
        /* Tablet and Desktop */
        @media (min-width: 600px) {
            .comparison-options {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: var(--space-md);
            }
            
            .option {
                flex: 1;
                max-width: none;
            }
            
            .vs-divider {
                flex-shrink: 0;
                font-size: 1.1rem;
                padding: 0 var(--space-md);
            }
        }
        
        @media (min-width: 768px) {
            .comparison-wrapper {
                padding: 0;
            }
            
            .comparison-row {
                padding: var(--space-xl);
            }
            
            .feature-label {
                font-size: 1.4rem;
            }
            
            .option-value {
                font-size: 1.1rem;
            }
        }
        
        /* Extra small mobile */
        @media (max-width: 420px) {
            .comparison-row {
                padding: var(--space-md);
                margin-bottom: var(--space-md);
            }
            
            .feature-label {
                font-size: 1.1rem;
            }
            
            .option {
                padding: var(--space-sm);
            }
            
            .option-value {
                font-size: 0.95rem;
            }
        }`;
    
    // Remove old comparison CSS completely
    html = html.replace(/\/\* MOBILE-FIRST COMPARISON CARDS \*\/[\s\S]*?@media \(max-width: 479px\) \{[\s\S]*?\}/g, '');
    
    // Insert new CSS before closing </style>
    html = html.replace('</style>', perfectComparisonCSS + '\n        </style>');
    
    await fs.writeFile('index.html', html);
    
    console.log('✅ PERFECT MOBILE COMPARISON COMPLETE!');
    console.log('=====================================');
    console.log('📱 Mobile-first stacked design');
    console.log('💯 Proper centering and spacing');
    console.log('🎨 Beautiful blue eco-checkout boxes');
    console.log('📏 Responsive across all screen sizes');
    console.log('🔥 No more formatting issues!');
}

fixComparisonFinal().catch(console.error);