@echo off
REM OAuth Setup Verification Script for Windows
REM Run this to verify all OAuth configurations are correct

echo.
echo 🔍 STON Technology - OAuth Setup Verification
echo ================================================
echo.

REM Check .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local file not found in project root
    echo    Create .env.local with OAuth credentials
    pause
    exit /b 1
)
echo ✅ .env.local file exists

REM Check for NEXTAUTH_SECRET
findstr /M "NEXTAUTH_SECRET=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ NEXTAUTH_SECRET is configured
) else (
    echo ⚠️  NEXTAUTH_SECRET might be empty
)

REM Check NEXTAUTH_URL
findstr "NEXTAUTH_URL=http://localhost:3000" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ NEXTAUTH_URL is set to localhost:3000
) else (
    echo ⚠️  NEXTAUTH_URL might not be set correctly
)

REM Check Google credentials
findstr "GOOGLE_CLIENT_ID=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ Google Client ID is filled
) else (
    echo ⚠️  Google Client ID is missing
)

findstr "GOOGLE_CLIENT_SECRET=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ Google Client Secret is filled
) else (
    echo ⚠️  Google Client Secret is missing
)

REM Check GitHub credentials
findstr "GITHUB_ID=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ GitHub Client ID is filled
) else (
    echo ⚠️  GitHub Client ID is missing
)

findstr "GITHUB_SECRET=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ GitHub Client Secret is filled
) else (
    echo ⚠️  GitHub Client Secret is missing
)

REM Check LinkedIn credentials
findstr "LINKEDIN_CLIENT_ID=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ LinkedIn Client ID is filled
) else (
    echo ⚠️  LinkedIn Client ID is missing
)

findstr "LINKEDIN_CLIENT_SECRET=" .env.local >nul
if %errorlevel% equ 0 (
    echo ✅ LinkedIn Client Secret is filled
) else (
    echo ⚠️  LinkedIn Client Secret is missing
)

echo.
echo ================================================
echo ℹ️  To get OAuth credentials, see:
echo    - OAUTH_COMPLETE_SETUP.md (detailed guide)
echo    - OAUTH_QUICK_REFERENCE.md (quick setup)
echo.
echo 🚀 Start dev server with: npm run dev
echo 📍 Then visit: http://localhost:3000/login
echo ================================================
echo.
pause
