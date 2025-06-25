#!/bin/bash

echo "🚀 DEPLOYING NUCLEAR FIXES TO ORIGINAL SITE"
echo "==========================================="

# Check if logged into Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "⚠️  Not logged into Vercel. Logging in..."
    vercel login
fi

# Link to existing project
echo "🔗 Linking to auralo-production-lmbx..."
vercel link --yes

# Deploy to production
echo "🚀 Deploying nuclear implementation..."
vercel --prod --yes

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Your site is live at: https://auralo-production-lmbx.vercel.app"
echo ""
echo "🎯 Nuclear features now live:"
echo "   ✅ XL Timer (13 seconds)"
echo "   ✅ Carousel Navigation"
echo "   ✅ Blue Pointers (8 hotspots)"
echo "   ✅ Finger Guidance"
echo "   ✅ Size Chart Toggle"
echo "   ✅ Store Availability"