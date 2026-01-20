# Complete OAuth Setup Guide - STON Technology

## ⚡ Quick Start

### 1. Create `.env.local` file
If not already created, create a file named `.env.local` in your project root with the following structure:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sTon_3c_5e2@_auth_secret_2024_v1_secure_key_production_ready

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_ID=
GITHUB_SECRET=

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

---

## 🔑 Google OAuth Setup (Most Reliable)

### Step 1: Go to Google Cloud Console
- Open https://console.cloud.google.com/
- Create a new project or select existing one
- Project name: "STON Technology"

### Step 2: Enable OAuth 2.0
1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - User type: **External**
   - Fill in App name: "STON Technology"
   - User support email: your@email.com
   - Developer contact: your@email.com
   - Add these scopes: `email`, `profile`, `openid`
   - Save and continue

### Step 3: Create OAuth 2.0 Credentials
1. Back to Credentials page
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: "STON Frontend"
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   ```
6. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   http://127.0.0.1:3000/api/auth/callback/google
   ```
7. Click **Create**
8. Copy **Client ID** and **Client Secret**
9. Paste into `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   ```

### Production Setup for Google:
```env
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-prod-client-id
GOOGLE_CLIENT_SECRET=your-prod-client-secret
```

Add to redirect URIs:
- `https://yourdomain.com/api/auth/callback/google`

---

## 🐙 GitHub OAuth Setup

### Step 1: Go to GitHub Developer Settings
- Open https://github.com/settings/developers
- Click **New OAuth App**

### Step 2: Fill in Application Details
- **Application name**: STON Technology Platform
- **Homepage URL**: `http://localhost:3000`
- **Application description**: Student Resume Management Platform
- **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- Click **Register application**

### Step 3: Generate & Copy Credentials
1. You're now on the app page
2. Copy **Client ID**
3. Click **Generate a new client secret**
4. Copy **Client Secret** (this only shows once!)
5. Paste into `.env.local`:
   ```env
   GITHUB_ID=YOUR_GITHUB_CLIENT_ID
   GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
   ```

### Production Setup for GitHub:
Change the Authorization callback URL to:
- `https://yourdomain.com/api/auth/callback/github`

And update `.env.local` for production.

---

## 💼 LinkedIn OAuth Setup (Most Complex)

### Step 1: Go to LinkedIn Developer Portal
- Open https://www.linkedin.com/developers/apps
- Click **Create app**

### Step 2: Fill in Basic Information
- **App name**: STON Technology
- **LinkedIn Page**: (optional) Your company page
- **App logo**: Upload your logo
- **Legal agreement**: Accept terms
- Click **Create app**

### Step 3: Request Access to Sign In
1. Go to **Products** tab
2. Find **Sign in with LinkedIn using OpenID Connect**
3. Click **Request access**
4. Accept the agreement
5. Wait for approval (usually instant for development)

### Step 4: Configure Authorization Settings
1. Go to **Auth** tab
2. Scroll to **Authorized redirect URLs for your app**
3. Add:
   ```
   http://localhost:3000/api/auth/callback/linkedin
   http://localhost:3000
   ```
4. Click **Add** for each

### Step 5: Copy Credentials
1. In **Auth** tab, find **Client credentials**
2. Copy **Client ID**
3. Copy **Client Secret**
4. Paste into `.env.local`:
   ```env
   LINKEDIN_CLIENT_ID=YOUR_LINKEDIN_CLIENT_ID
   LINKEDIN_CLIENT_SECRET=YOUR_LINKEDIN_CLIENT_SECRET
   ```

### Step 6: Enable OpenID Connect (Important!)
1. Go to **Products** tab
2. Find **Sign in with LinkedIn using OpenID Connect**
3. Click **Add to app**
4. Ensure status shows as **Active**

### Production Setup for LinkedIn:
Add to Authorized redirect URLs:
- `https://yourdomain.com/api/auth/callback/linkedin`
- `https://yourdomain.com`

---

## 🚀 Testing OAuth Login

### 1. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

Server runs at: `http://localhost:3000`

### 2. Navigate to Login
- Go to `http://localhost:3000/login`
- You should see three OAuth buttons: Google, GitHub, LinkedIn

### 3. Test Each Provider
1. **Google**: Click Google button → Sign in with your Google account
2. **GitHub**: Click GitHub button → Authorize the app
3. **LinkedIn**: Click LinkedIn button → Sign in with your LinkedIn account

### Expected Behavior:
✅ OAuth provider opens in new window/tab
✅ After authorization, redirects back to app
✅ Shows success toast notification
✅ Auto-redirects to appropriate dashboard based on email:
   - Email with "admin" → `/admin/dashboard`
   - Email with "principal" → `/principal/dashboard`
   - Email with "hod" or "ho" → `/dashboard`
   - Email with "placement" → `/placement/dashboard`
   - Default → `/student`

---

## ❌ Common Issues & Solutions

### Issue 1: "Error constructing an authorization URL"
**Cause**: Missing or incorrect CLIENT_ID/SECRET in `.env.local`
**Solution**: 
- Double-check credentials are copied correctly
- Make sure `.env.local` is in project root
- Restart dev server after changing `.env.local`

### Issue 2: "Redirect URI mismatch"
**Cause**: Registered callback URL doesn't match app's redirect URL
**Solution**: 
- For Google: Add both `http://localhost:3000` and `http://127.0.0.1:3000`
- For GitHub: Use exact URL `http://localhost:3000/api/auth/callback/github`
- For LinkedIn: Make sure both app URL and callback URL are added

### Issue 3: "Invalid Client"
**Cause**: Client ID or Secret is wrong
**Solution**: 
- Re-verify credentials from provider dashboard
- Make sure you copied the entire string (no extra spaces)
- Delete and regenerate if unsure

### Issue 4: "Email not verified" (LinkedIn)
**Cause**: LinkedIn account email not verified
**Solution**: 
- Verify email in your LinkedIn account settings
- Use a personal LinkedIn account for testing

### Issue 5: OAuth button doesn't respond
**Cause**: Next.js dev server not running or NextAuth not initialized
**Solution**: 
```bash
npm run dev
# or
pnpm dev
```

### Issue 6: "Access Denied" after OAuth callback
**Cause**: App not approved or permissions not granted
**Solution**: 
- For LinkedIn: Ensure "Sign in with LinkedIn using OpenID Connect" is Active
- For GitHub: Make sure "Email addresses" scope is enabled
- For Google: Ensure scopes include "email" and "profile"

---

## 📋 Verification Checklist

- [ ] `.env.local` file exists in project root
- [ ] `NEXTAUTH_SECRET` is set
- [ ] Google Client ID and Secret are filled in
- [ ] GitHub Client ID and Secret are filled in
- [ ] LinkedIn Client ID and Secret are filled in
- [ ] `NEXTAUTH_URL=http://localhost:3000` for local development
- [ ] Redirect URIs are registered correctly in each provider
- [ ] Dev server is running (`npm run dev`)
- [ ] No errors in browser console when clicking OAuth buttons
- [ ] OAuth provider window opens correctly

---

## 🔐 Security Notes

### For Development:
- Use the provided `NEXTAUTH_SECRET` value or generate one:
  ```bash
  openssl rand -base64 32
  ```
- Keep `.env.local` in `.gitignore` (it's already there)

### For Production:
1. Generate a new strong secret:
   ```bash
   openssl rand -base64 32
   ```
2. Use secure HTTPS URL: `https://yourdomain.com`
3. Update all OAuth provider redirect URIs to HTTPS
4. Set environment variables on your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Heroku: Config Vars
   - Railway: Environment Variables
   - AWS: Secrets Manager or Parameter Store

---

## 📞 Support

If OAuth login still isn't working:

1. **Check browser console**: Press F12 → Console tab → Look for errors
2. **Check network tab**: See if `/api/auth/callback/*` is being called
3. **Verify `.env.local`**: Make sure file exists and is not in `.gitignore` exclusions
4. **Restart dev server**: Stop and restart `npm run dev`
5. **Check provider logs**: Go back to Google Cloud Console / GitHub / LinkedIn settings to verify app credentials

---

## Testing Account Emails

Use these email patterns to test role-based redirects:

- `admin@example.com` → Admin Dashboard
- `principal@example.com` → Principal Dashboard
- `hod@example.com` or `ho@example.com` → HOD Dashboard
- `placement@example.com` → Placement Dashboard
- `student@example.com` → Student Dashboard
