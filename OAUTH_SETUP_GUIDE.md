# OAuth Authentication Setup Guide

## 🎯 Overview
This project now has **complete OAuth authentication** using NextAuth.js with Google, GitHub, and LinkedIn providers.

## 🚀 Features Implemented

✅ **Google OAuth** - Sign in with Google  
✅ **GitHub OAuth** - Sign in with GitHub  
✅ **LinkedIn OAuth** - Sign in with LinkedIn  
✅ **Session Management** - JWT-based secure sessions  
✅ **Protected Routes** - Dashboard requires authentication  
✅ **Auto-redirect** - Redirects to dashboard after login  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Smooth loading indicators  
✅ **Logout Functionality** - Secure sign out with redirect  

## 📋 Setup Instructions

### 1. Generate NextAuth Secret

```bash
# Run this command in your terminal
openssl rand -base64 32
```

Copy the output and add it to your `.env.local` file.

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if needed
6. Select **Web application**
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy **Client ID** and **Client Secret**
9. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

### 3. Set Up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the form:
   - **Application name**: STON Technology
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. Generate a new client secret
6. Copy **Client ID** and **Client Secret**
7. Add to `.env.local`:
   ```
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

### 4. Set Up LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **Create app**
3. Fill in the required information
4. Go to **Auth** tab
5. Add **Authorized redirect URLs**:
   - `http://localhost:3000/api/auth/callback/linkedin`
   - `https://yourdomain.com/api/auth/callback/linkedin` (for production)
6. Request access to **OpenID Connect** scope:
   - Sign In with LinkedIn using OpenID Connect
   - Click **Request access**
7. In **Products** tab, select:
   - Sign In with LinkedIn using OpenID Connect
8. Copy **Client ID** and **Client Secret** from Auth tab
9. Add to `.env.local`:
   ```
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   ```

### 5. Update .env.local File

Create or update `.env.local` in your project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-from-step-1

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

### 6. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/login` to test the OAuth login!

## 🔒 Security Features

- **JWT Sessions**: Secure token-based authentication
- **30-day session expiry**: Automatic logout after inactivity
- **CSRF Protection**: Built-in NextAuth security
- **Secure callbacks**: Verified redirect URLs only
- **Environment variables**: Secrets never exposed to client

## 📁 Files Created/Modified

### Created Files:
- `lib/auth.ts` - NextAuth configuration
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API route
- `components/providers/session-provider.tsx` - Session context provider
- `types/next-auth.d.ts` - TypeScript definitions
- `.env.local` - Environment variables (configure this!)

### Modified Files:
- `app/layout.tsx` - Added SessionProvider wrapper
- `app/login/page.tsx` - Added OAuth functionality
- `app/dashboard/page.tsx` - Added authentication check & logout

## 🎨 User Flow

1. **User visits `/login`** → Sees login page with OAuth buttons
2. **User clicks OAuth button** → Loading state shows
3. **Redirects to provider** → Google/GitHub/LinkedIn auth
4. **User approves** → Returns to app
5. **NextAuth creates session** → JWT token generated
6. **Redirects to `/dashboard`** → User sees dashboard with their info
7. **Session persists** → User stays logged in for 30 days
8. **Click Logout** → Session destroyed, redirect to login

## 🔧 Testing

1. Start the dev server: `pnpm dev`
2. Go to `http://localhost:3000/login`
3. Click any OAuth provider button
4. Complete authentication
5. You'll be redirected to dashboard
6. Your profile info will be displayed
7. Click logout to sign out

## 🐛 Troubleshooting

**Error: "Configuration" error**
- Make sure all environment variables are set in `.env.local`
- Restart dev server after adding env variables

**Error: "OAuthCallback error"**
- Check redirect URIs in provider settings
- Ensure they match exactly (including http/https)

**Error: "OAuthAccountNotLinked"**
- Email already used with different provider
- Each email can only be linked to one provider

**Session not persisting**
- Check NEXTAUTH_SECRET is set
- Clear browser cookies and try again

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://console.cloud.google.com/)
- [GitHub OAuth Setup](https://github.com/settings/developers)
- [LinkedIn OAuth Setup](https://www.linkedin.com/developers/)

## 🚀 Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` to your production URL
2. Add production callback URLs to all OAuth providers
3. Generate new `NEXTAUTH_SECRET` for production
4. Store secrets in your hosting platform's environment variables
5. Never commit `.env.local` to git (already in .gitignore)

## 💡 Next Steps

- [ ] Add database integration (store user data)
- [ ] Add email/password authentication
- [ ] Implement role-based access control
- [ ] Add profile editing
- [ ] Store resume data per user
- [ ] Add account linking functionality

---

**Need help?** Check the NextAuth.js documentation or the error messages in the browser console.
