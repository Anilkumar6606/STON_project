#!/bin/bash
# OAuth Setup Verification Script
# Run this to verify all OAuth configurations are correct

echo "🔍 STON Technology - OAuth Setup Verification"
echo "================================================"
echo ""

# Check .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found in project root"
    echo "   Create .env.local with OAuth credentials"
    exit 1
fi
echo "✅ .env.local file exists"

# Check NEXTAUTH_SECRET
if grep -q "NEXTAUTH_SECRET=" .env.local && ! grep "^NEXTAUTH_SECRET=$" .env.local > /dev/null; then
    echo "✅ NEXTAUTH_SECRET is configured"
else
    echo "⚠️  NEXTAUTH_SECRET might be empty"
fi

# Check NEXTAUTH_URL
if grep -q "NEXTAUTH_URL=http://localhost:3000" .env.local; then
    echo "✅ NEXTAUTH_URL is set to localhost:3000"
else
    echo "⚠️  NEXTAUTH_URL might not be set correctly"
fi

# Check Google credentials
if grep -q "GOOGLE_CLIENT_ID=" .env.local && ! grep "^GOOGLE_CLIENT_ID=$" .env.local > /dev/null; then
    echo "✅ Google Client ID is filled"
else
    echo "⚠️  Google Client ID is missing"
fi

if grep -q "GOOGLE_CLIENT_SECRET=" .env.local && ! grep "^GOOGLE_CLIENT_SECRET=$" .env.local > /dev/null; then
    echo "✅ Google Client Secret is filled"
else
    echo "⚠️  Google Client Secret is missing"
fi

# Check GitHub credentials
if grep -q "GITHUB_ID=" .env.local && ! grep "^GITHUB_ID=$" .env.local > /dev/null; then
    echo "✅ GitHub Client ID is filled"
else
    echo "⚠️  GitHub Client ID is missing"
fi

if grep -q "GITHUB_SECRET=" .env.local && ! grep "^GITHUB_SECRET=$" .env.local > /dev/null; then
    echo "✅ GitHub Client Secret is filled"
else
    echo "⚠️  GitHub Client Secret is missing"
fi

# Check LinkedIn credentials
if grep -q "LINKEDIN_CLIENT_ID=" .env.local && ! grep "^LINKEDIN_CLIENT_ID=$" .env.local > /dev/null; then
    echo "✅ LinkedIn Client ID is filled"
else
    echo "⚠️  LinkedIn Client ID is missing"
fi

if grep -q "LINKEDIN_CLIENT_SECRET=" .env.local && ! grep "^LINKEDIN_CLIENT_SECRET=$" .env.local > /dev/null; then
    echo "✅ LinkedIn Client Secret is filled"
else
    echo "⚠️  LinkedIn Client Secret is missing"
fi

echo ""
echo "================================================"
echo "ℹ️  To get OAuth credentials, see:"
echo "   - OAUTH_COMPLETE_SETUP.md (detailed guide)"
echo "   - OAUTH_QUICK_REFERENCE.md (quick setup)"
echo ""
echo "🚀 Start dev server with: npm run dev"
echo "📍 Then visit: http://localhost:3000/login"
echo "================================================"
