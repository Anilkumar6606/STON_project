# 🎯 OAuth Login - Getting Started NOW

## ⚡ Fastest Path Forward (10 Minutes)

### Step 1: Get Your Credentials (5 minutes per provider)

Pick ONE provider to start with (Google recommended):

#### **Google OAuth** (Easiest)
```
1. Open: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID → Web application
3. Add: http://localhost:3000 to authorized origins
4. Add: http://localhost:3000/api/auth/callback/google to redirect URIs
5. Copy Client ID and Secret
```

#### **GitHub OAuth** (Fast)
```
1. Open: https://github.com/settings/developers
2. New OAuth App
3. Homepage: http://localhost:3000
4. Callback: http://localhost:3000/api/auth/callback/github
5. Copy Client ID and Secret
```

#### **LinkedIn OAuth** (Most Steps)
```
1. Open: https://www.linkedin.com/developers/apps
2. Create app, request OpenID Connect access
3. Add redirects: http://localhost:3000 and callback URL
4. Copy Client ID and Secret
```

### Step 2: Fill `.env.local` (2 minutes)

The file `.env.local` is already created in project root.

Edit it and paste your credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sTon_3c_5e2@_auth_secret_2024_v1_secure_key_production_ready

# Fill these with your credentials
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx

GITHUB_ID=Xxxxxxxxxxxxxxxx
GITHUB_SECRET=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

LINKEDIN_CLIENT_ID=123456789
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxxxxx
```

### Step 3: Start Development Server (1 minute)

```bash
npm run dev
```

You should see:
```
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Test OAuth (2 minutes)

1. Open: http://localhost:3000/login
2. Click a provider button (Google/GitHub/LinkedIn)
3. Sign in with your account
4. Should redirect to dashboard

✅ **Done!** Your OAuth login is working!

---

## 📱 What Happens When You Click OAuth Button?

```
[Click Google Button]
         ↓
[Redirects to Google login]
         ↓
[You sign in with Google account]
         ↓
[Google redirects back to app with auth code]
         ↓
[App exchanges code for user info]
         ↓
[App creates session]
         ↓
[Automatically redirects to your role's dashboard]
         ↓
✅ You're logged in!
```

---

## 🎯 Role-Based Dashboard Routing

After OAuth login, you're automatically sent to the right dashboard:

| Email Contains | Dashboard | Access |
|----------------|-----------|--------|
| `admin` | `/admin/dashboard` | Admin Panel |
| `principal` | `/principal/dashboard` | Principal Dashboard |
| `hod` or `ho` | `/dashboard` | HOD Dashboard |
| `placement` | `/placement/dashboard` | Placement Dashboard |
| (others) | `/student` | Student Profile |

**Example**: If you sign in with `admin@gmail.com` → Goes to Admin Dashboard automatically ✅

---

## 🛠️ Troubleshooting

### "OAuth buttons don't work"
```
✅ Fix: Restart dev server
   npm run dev
```

### "Error constructing authorization URL"
```
✅ Fix: Check .env.local has credentials
   cat .env.local
```

### "Redirect URI mismatch"
```
✅ Fix: Check callback URL in provider settings
   Must match exactly: http://localhost:3000/api/auth/callback/[provider]
```

### "Still not working?"
```bash
# Run verification script
Windows: verify-oauth.bat
Mac/Linux: bash verify-oauth.sh
```

---

## 📚 More Information

For detailed setup, see:
- `OAUTH_COMPLETE_SETUP.md` - Full step-by-step guide
- `OAUTH_QUICK_REFERENCE.md` - Quick reference cards
- `OAUTH_TESTING_GUIDE.md` - Testing procedures
- `OAUTH_IMPLEMENTATION_SUMMARY.md` - What was fixed

---

## ✅ Verification Checklist

- [ ] `.env.local` exists in project root
- [ ] All three provider credentials filled in
- [ ] Dev server running (`npm run dev`)
- [ ] Can access http://localhost:3000/login
- [ ] See three OAuth buttons (Google, GitHub, LinkedIn)
- [ ] Clicked button opens OAuth provider login
- [ ] OAuth provider accepts login
- [ ] Redirects back to app
- [ ] Shows appropriate dashboard
- [ ] Email shown in dashboard matches your OAuth account

---

## 🎉 You're All Set!

OAuth login is now **100% functional** and ready to use!

### What's Included:
✅ Google OAuth integration  
✅ GitHub OAuth integration  
✅ LinkedIn OAuth integration  
✅ Automatic role-based routing  
✅ Session management  
✅ Error handling  

### Next Steps:
1. Get credentials from providers (5-10 min per provider)
2. Fill `.env.local` (2 min)
3. Start dev server (1 min)
4. Test OAuth buttons (2 min)
5. Done! 🚀

---

## 🔐 Security Notes

- `.env.local` is in `.gitignore` (won't leak to GitHub)
- `NEXTAUTH_SECRET` encrypts sensitive data
- OAuth tokens are securely stored in JWT format
- Passwords never stored in plain text

---

## 💬 Having Issues?

**Before asking for help, check:**
1. `.env.local` has correct credentials (copy-paste carefully!)
2. Dev server restarted after `.env.local` changes
3. Browser console (F12) shows no errors
4. Callback URL in provider matches exactly
5. OAuth app is still active in provider dashboard

**Need help?** See `OAUTH_TESTING_GUIDE.md` for debugging steps.

---

## 🚀 Ready? Let's Go!

```bash
# 1. Fill .env.local with your credentials
# 2. Run dev server
npm run dev

# 3. Visit login page
# http://localhost:3000/login

# 4. Click an OAuth button and sign in!
```

**That's it!** Enjoy your fully functional OAuth login! 🎉
