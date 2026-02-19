# Supabase Auth Revert Guide

## 🚨 Issue: Auth Login Failing After Enabling Custom SMTP

**Problem:** Authentication is failing because custom SMTP was enabled in Supabase Auth settings.

**Solution:** Revert Supabase to use its built-in email provider while keeping Hostinger SMTP for transactional emails only.

---

## 🔧 Step 1: Revert Supabase Auth Settings

### Go to Supabase Dashboard
1. Navigate to your Supabase project
2. Go to **Authentication** → **Settings**
3. Find **Email Provider** section

### Disable Custom SMTP
1. **Disable** any custom SMTP provider
2. **Enable** Supabase built-in email provider
3. **Save** changes

### Verify Site Configuration
1. **Site URL:** `https://your-domain.com` (your actual domain)
2. **Redirect URLs:** 
   - `https://your-domain.com/auth/callback`
   - `https://localhost:3001/auth/callback` (for development)
3. **Additional Redirect URLs:** Add any other needed URLs

---

## 🔧 Step 2: Verify Environment Variables

### Client-side (Browser Auth)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Server-side (Admin Operations)
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Transactional Emails (Hostinger SMTP)
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@mindspringpath.com.au
SMTP_PASS=your-email-password
```

---

## 🔧 Step 3: Test Authentication Flow

### Test 1: Basic Connection
```bash
curl http://localhost:3001/api/test-basic-connection
```

### Test 2: Direct Login
```bash
curl -X POST http://localhost:3001/api/test-direct-login \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "password": "your-password"}'
```

### Test 3: Auth Flow Verification
```bash
curl http://localhost:3001/api/test-auth-flow
```

---

## 🔧 Step 4: Verify Email Separation

### Supabase Auth Emails (Built-in)
- ✅ Email verification
- ✅ Password reset
- ✅ Magic links
- ✅ **Provider:** Supabase built-in email service

### Transactional Emails (Hostinger SMTP)
- ✅ Booking confirmations
- ✅ Contact form submissions
- ✅ Admin notifications
- ✅ **Provider:** Hostinger SMTP via `/api/send-email`

---

## 🔧 Step 5: Test Complete Flow

### New User Registration
1. User signs up at `/auth/register`
2. Supabase sends verification email (built-in)
3. User clicks verification link
4. Redirects to `/auth/callback`
5. Processes and redirects to `/dashboard`

### Existing User Login
1. User goes to `/auth/login`
2. Enters email and password
3. `signInWithPassword()` authenticates
4. Redirects to `/dashboard` (or `/admin` for admins)

### Admin User Login
1. Admin goes to `/admin/login`
2. Enters credentials
3. `signInWithPassword()` + `isAdmin()` check
4. Redirects to `/admin` dashboard

---

## 🚨 Common Issues & Solutions

### Issue: "Email not confirmed" error
**Cause:** User hasn't verified email
**Solution:** Check spam folder, resend verification email

### Issue: "Invalid login credentials"
**Cause:** Wrong password or email
**Solution:** Use password reset or check credentials

### Issue: "Access denied" for admin
**Cause:** User not in `user_roles` table with `role='admin'`
**Solution:** Add admin entry to `user_roles` table

### Issue: Redirect loops
**Cause:** Incorrect redirect URLs in Supabase settings
**Solution:** Verify Site URL and Redirect URLs

---

## 🔧 Verification Checklist

- [ ] Supabase Auth uses built-in email provider
- [ ] Custom SMTP disabled in Supabase Auth
- [ ] Site URL correct in Supabase settings
- [ ] Redirect URLs include `/auth/callback`
- [ ] Environment variables set correctly
- [ ] New user registration works
- [ ] Existing user login works
- [ ] Admin login works
- [ ] Transactional emails work via Hostinger SMTP

---

## 🎯 Expected Results

### Authentication
- ✅ Supabase handles all auth emails
- ✅ No custom SMTP in Supabase Auth
- ✅ Proper redirects after login
- ✅ Email verification works

### Transactional Emails
- ✅ Hostinger SMTP sends booking confirmations
- ✅ Hostinger SMTP sends contact form notifications
- ✅ Hostinger SMTP sends admin notifications
- ✅ No conflicts with Supabase Auth

---

## 📞 Support

If issues persist:
1. Check Supabase logs in dashboard
2. Verify environment variables
3. Test with debug endpoints
4. Check browser console for errors

**Remember:** Supabase Auth = Built-in emails, Transactional = Hostinger SMTP
