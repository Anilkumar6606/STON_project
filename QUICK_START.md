# 🚀 Quick Start - OAuth Authentication

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies ✅
Already done! `next-auth` is installed.

### 2. Generate Secret Key
```bash
openssl rand -base64 32
```
Copy the output.

### 3. Configure Environment Variables

Edit `.env.local` file and replace the placeholder values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-your-generated-secret-here

# Get these from OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

### 4. Set Up OAuth Providers (Choose at least one)

#### Option A: GitHub (Easiest - 2 minutes)
1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill:
   - Name: `STON Technology Dev`
   - URL: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate Client Secret
5. Paste into `.env.local`

#### Option B: Google (3 minutes)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create project → Create Credentials → OAuth Client ID
3. Add redirect: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret
5. Paste into `.env.local`

#### Option C: LinkedIn (5 minutes)
1. Go to: https://www.linkedin.com/developers/apps
2. Create app
3. Auth tab → Add redirect: `http://localhost:3000/api/auth/callback/linkedin`
4. Products tab → Request "Sign In with LinkedIn using OpenID Connect"
5. Copy Client ID and Secret from Auth tab
6. Paste into `.env.local`

### 5. Start Development Server
```bash
pnpm dev
```

### 6. Test It! 🎉
1. Open: http://localhost:3000/login
2. Click your configured OAuth provider
3. Sign in
4. Get redirected to dashboard
5. See your profile and logout button

## 📝 What Was Implemented

### Files Created:
- ✅ `lib/auth.ts` - NextAuth config with all 3 providers
- ✅ `app/api/auth/[...nextauth]/route.ts` - API handler
- ✅ `components/providers/session-provider.tsx` - React context
- ✅ `components/protected-route.tsx` - Route protection helper
- ✅ `types/next-auth.d.ts` - TypeScript types
- ✅ `.env.local` - Environment template

### Files Modified:
- ✅ `app/layout.tsx` - Wrapped with SessionProvider
- ✅ `app/login/page.tsx` - Added OAuth buttons with handlers
- ✅ `app/dashboard/page.tsx` - Added auth check & logout

### Features:
- ✅ Google, GitHub, LinkedIn OAuth
- ✅ Session management (30 days)
- ✅ Protected routes
- ✅ Auto-redirect after login
- ✅ Loading states
- ✅ Error handling
- ✅ Logout functionality
- ✅ User profile display

## 🎨 How It Works

```
Login Page → Click OAuth → Provider Auth → Callback → Create Session → Dashboard
                                                              ↓
                                                         JWT Token
                                                              ↓
                                                    Stored in Cookie
                                                              ↓
                                                    Validated on Each Request
```

## 🔑 Key API Endpoints

- `/api/auth/signin` - Trigger sign in
- `/api/auth/signout` - Trigger sign out
- `/api/auth/session` - Get current session
- `/api/auth/callback/{provider}` - OAuth callback URLs

## 🧪 Testing Without OAuth Setup

You can test the UI without setting up OAuth providers:
1. The buttons will show but won't work until you configure providers
2. Error messages will display if OAuth fails
3. Loading states will appear during authentication

## 📖 Full Documentation

See `OAUTH_SETUP_GUIDE.md` for:
- Detailed setup instructions
- Security features
- Troubleshooting
- Production deployment
- Advanced configuration

## 🆘 Common Issues

**"Configuration" error**
→ Make sure `.env.local` has all variables set

**Buttons don't work**
→ Restart dev server after adding environment variables

**Redirect error**
→ Check callback URLs match exactly in provider settings

## 🎯 Next Steps

1. Set up at least one OAuth provider (GitHub is fastest)
2. Test login/logout flow
3. Customize dashboard with user data
4. Add database to persist user information
5. Deploy to production

---

**Ready to go!** Just configure your OAuth provider credentials and start testing! 🚀
