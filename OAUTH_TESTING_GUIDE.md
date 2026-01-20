# OAuth Testing Guide - STON Technology

## 🎯 Quick Test Steps

### 1. Verify Environment Variables
Before testing, make sure `.env.local` has all OAuth credentials filled in:

```bash
# Check if .env.local exists in project root
ls -la .env.local

# Or on Windows:
# dir .env.local
```

Expected content:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sTon_3c_5e2@_auth_secret_2024_v1_secure_key_production_ready
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
GITHUB_ID=Xxxxxxxxxxxxxxxx
GITHUB_SECRET=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINKEDIN_CLIENT_ID=123456789
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxxxxx
```

### 2. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

Output should show:
```
> next dev
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 3. Open Login Page
- Navigate to: `http://localhost:3000/login`
- You should see:
  - STON Technology logo
  - Email/Password input fields
  - Three OAuth buttons: Google, GitHub, LinkedIn
  - Sign up link
  - Forgot password link

### 4. Test Each OAuth Provider

#### Test Google OAuth:
1. Click the **Google** button
2. Expected: Google login window opens
3. Sign in with your Google account
4. Click "Allow" when asked for permissions
5. Expected: Redirects back to app and shows dashboard
6. Check: Browser console should show `✅ OAuth Login Successful`

#### Test GitHub OAuth:
1. Click the **GitHub** button
2. Expected: GitHub login window opens
3. Sign in with your GitHub account
4. Click "Authorize" to grant app access
5. Expected: Redirects back to app and shows dashboard
6. Check: Browser console should show `✅ OAuth Login Successful`

#### Test LinkedIn OAuth:
1. Click the **LinkedIn** button
2. Expected: LinkedIn login window opens
3. Sign in with your LinkedIn account
4. Grant required permissions
5. Expected: Redirects back to app and shows dashboard
6. Check: Browser console should show `✅ OAuth Login Successful`

---

## 🔍 Debugging Tips

### 1. Check Browser Console
Press `F12` (or Right-click → Inspect → Console tab):

**Good signs:**
- `✅ OAuth Login Successful - Email: xxx@xxx.com Redirecting to: /dashboard`
- No red error messages

**Bad signs:**
- `Error constructing an authorization URL`
- `Invalid Client`
- `Redirect URI mismatch`
- CORS errors

### 2. Check Network Tab
Press `F12` → **Network** tab:
1. Click OAuth button
2. Look for requests:
   - `GET /api/auth/signin/google` → Should be 200 (OK)
   - Redirects to provider's OAuth endpoint
   - Returns with callback to `/api/auth/callback/google`
   - Final redirect to dashboard

**Red flags:**
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- Any 500 errors

### 3. Check Dev Server Terminal
Look for any error messages:

```bash
# Example good output:
[GET] /api/auth/signin/google 200 (1.2ms)
[GET] /api/auth/callback/google?code=xxx&state=yyy 307 (45ms)
```

```bash
# Example bad output:
Error: Missing credentials for provider
Error: Invalid client
```

---

## 🧪 Test Cases

### Test Case 1: Google Login with Admin Email
```
Test: Log in with admin@company.com using Google
Expected: Redirects to /admin/dashboard
Check: Dashboard shows admin menu
```

### Test Case 2: GitHub Login with Principal Email
```
Test: Log in with principal@company.com using GitHub
Expected: Redirects to /principal/dashboard
Check: Dashboard shows principal menu
```

### Test Case 3: LinkedIn Login with HOD Email
```
Test: Log in with hod@company.com using LinkedIn
Expected: Redirects to /dashboard (HOD dashboard)
Check: Dashboard shows HOD sidebar
```

### Test Case 4: Google Login with Student Email
```
Test: Log in with student@company.com using Google
Expected: Redirects to /student (Student dashboard)
Check: Dashboard shows student profile options
```

### Test Case 5: Multiple Providers with Same Email
```
Test: Sign up with Google using email@gmail.com
Then: Try to sign in with GitHub using same email
Expected: Should work (email linking enabled)
```

---

## 🛠️ Troubleshooting Checklist

- [ ] `.env.local` file exists in project root (not in node_modules)
- [ ] All OAuth credentials are filled in (no empty strings)
- [ ] No extra spaces or quotes in `.env.local`
- [ ] Dev server restarted after updating `.env.local`
- [ ] Using `http://localhost:3000` (not `127.0.0.1:3000` for OAuth testing)
- [ ] OAuth provider callback URLs match exactly
- [ ] Browser cookies and cache cleared (Dev Tools → Application → Clear storage)
- [ ] No browser extensions blocking OAuth (try incognito mode)
- [ ] OAuth provider apps are still active (check developer dashboards)

---

## 🔧 Manual Testing of OAuth Endpoints

### Test OAuth Redirect (Google):
```bash
# Visit this URL in browser to see if OAuth endpoint works
http://localhost:3000/api/auth/signin/google
```

Expected: Redirects to Google login page

### Test NextAuth Session:
```bash
# Visit this to check current session
http://localhost:3000/api/auth/session
```

Expected (when logged in):
```json
{
  "user": {
    "name": "Your Name",
    "email": "your@email.com",
    "id": "123",
    "provider": "google",
    "role": "student"
  },
  "expires": "2025-01-20T12:00:00.000Z"
}
```

Expected (when not logged in):
```json
null
```

### Check NextAuth Providers:
```bash
# Visit to see all configured providers
http://localhost:3000/api/auth/providers
```

Expected:
```json
{
  "google": { "id": "google", "name": "Google", ... },
  "github": { "id": "github", "name": "GitHub", ... },
  "linkedin": { "id": "linkedin", "name": "LinkedIn", ... }
}
```

---

## 📱 Browser/Device Testing

- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Test in Incognito/Private mode
- [ ] Test on Mobile Chrome
- [ ] Test on Mobile Safari

---

## 🚨 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Error constructing an authorization URL` | Missing CLIENT_ID/SECRET | Check `.env.local` has credentials |
| `Redirect URI mismatch` | Wrong callback URL registered | Update OAuth provider redirect URIs |
| `Invalid Client` | Incorrect CLIENT_SECRET | Re-verify credentials |
| `Access Denied` | App not approved | Check LinkedIn app is Active |
| `Email not verified` (LinkedIn) | Email not confirmed on LinkedIn | Verify email in account settings |
| `CORS Error` | Browser security issue | Try incognito mode |
| Infinite redirect loop | Session not persisting | Clear cookies, restart server |

---

## 🎬 Record Your Test Results

### Google OAuth Test
- Date: ___________
- Email: ___________
- Status: ✅ Pass / ❌ Fail
- Notes: ___________

### GitHub OAuth Test
- Date: ___________
- Email: ___________
- Status: ✅ Pass / ❌ Fail
- Notes: ___________

### LinkedIn OAuth Test
- Date: ___________
- Email: ___________
- Status: ✅ Pass / ❌ Fail
- Notes: ___________

---

## 📞 Getting Help

If OAuth is still not working:

1. Check all error messages in browser console
2. Verify `.env.local` format and values
3. Restart dev server: `npm run dev`
4. Clear browser cache and cookies
5. Try in incognito mode
6. Check OAuth provider's app dashboard for any warnings
7. Review the OAUTH_COMPLETE_SETUP.md guide again
8. Check if callback URLs match exactly (no trailing slashes!)
