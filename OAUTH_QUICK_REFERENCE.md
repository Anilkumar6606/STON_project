# OAuth Setup Quick Reference

## ✨ 5-Minute Setup

### 1. Copy Credentials Template
Create file: `.env.local` (in project root)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sTon_3c_5e2@_auth_secret_2024_v1_secure_key_production_ready
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

### 2. Get Google Credentials
1. Go: https://console.cloud.google.com/apis/credentials
2. Click: **+ CREATE CREDENTIALS** → **OAuth client ID** → **Web application**
3. Add redirects:
   - `http://localhost:3000`
   - `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID & Secret → Paste in `.env.local`

### 3. Get GitHub Credentials
1. Go: https://github.com/settings/developers
2. Click: **New OAuth App**
3. Fill:
   - Homepage: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID & generate Secret → Paste in `.env.local`

### 4. Get LinkedIn Credentials
1. Go: https://www.linkedin.com/developers/apps
2. Click: **Create app** → Fill info
3. Go: **Products** → Request access to **Sign In with LinkedIn using OpenID Connect**
4. Go: **Auth** → Add redirects:
   - `http://localhost:3000`
   - `http://localhost:3000/api/auth/callback/linkedin`
5. Copy Client ID & Secret → Paste in `.env.local`

### 5. Start Dev Server
```bash
npm run dev
```

### 6. Test Login
- Go: http://localhost:3000/login
- Click OAuth buttons
- Should redirect to dashboard

---

## 🎯 Callback URLs Cheat Sheet

| Provider | Callback URL |
|----------|--------------|
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |
| LinkedIn | `http://localhost:3000/api/auth/callback/linkedin` |

---

## 🚀 Authorized URLs Cheat Sheet

| Provider | Authorized URLs |
|----------|-----------------|
| Google | `http://localhost:3000` |
| GitHub | `http://localhost:3000` (in Homepage URL field) |
| LinkedIn | `http://localhost:3000` |

---

## ✅ Verification

```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Start dev server
npm run dev

# 3. Visit login page
# http://localhost:3000/login

# 4. Should see 3 OAuth buttons: Google, GitHub, LinkedIn
```

---

## 🆘 Quick Fixes

| Issue | Fix |
|-------|-----|
| Buttons don't work | Restart server after editing `.env.local` |
| "Redirect mismatch" | Check callback URLs match exactly |
| "Invalid Client" | Copy credentials again (no extra spaces) |
| Nothing happens | Check console (F12) for errors |
| Credentials error | Make sure `.env.local` is in project root |

---

## 📋 Credentials Format Example

```
GOOGLE_CLIENT_ID: 123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET: GOCSPX-abc123def456xyz
GITHUB_ID: Xxxxxxxxxxxxxxxx
GITHUB_SECRET: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LINKEDIN_CLIENT_ID: 123456789
LINKEDIN_CLIENT_SECRET: xxxxxxxxxxxxxxxxxxx
```

---

## 🔗 Provider Links

| Provider | Link | Icon |
|----------|------|------|
| Google | https://console.cloud.google.com/apis/credentials | 🔵 |
| GitHub | https://github.com/settings/developers | ⚫ |
| LinkedIn | https://www.linkedin.com/developers/apps | 🔷 |

---

## 🎓 Email-Based Role Routing

After OAuth login, redirects based on email:

```
admin@* → /admin/dashboard
principal@* → /principal/dashboard
hod@* or ho@* → /dashboard (HOD)
placement@* → /placement/dashboard
student@* (default) → /student
```

Example: Sign in as `admin@gmail.com` → Goes to Admin Dashboard
