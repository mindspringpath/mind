# Hostinger Email Setup Guide

This guide will help you configure your MindSpring Path application to send emails through Hostinger's SMTP service.

## 📧 Hostinger SMTP Configuration

### Step 1: Get Your Hostinger Email Credentials

1. **Log in to Hostinger Control Panel**
2. **Go to Email → Email Accounts**
3. **Create or find your email account** (e.g., `info@mindspringpath.com.au`)
4. **Note your email password** (or create an app password if using 2FA)

### Step 2: Configure Environment Variables

Create or update your `.env.local` file with the following settings:

```env
# Hostinger Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=no-reply@mindspringpath.com
SMTP_PASS=your-email-password
```

### Recommended Configuration (Updated)

For better compatibility with email clients and encryption issues:

```env
# Recommended: TLS/STARTTLS Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=no-reply@mindspringpath.com
SMTP_PASS=your-email-password
```

### Alternative Port Configuration

If you face encryption issues, try port 465 with SSL/TLS:

```env
# Alternative: SSL/TLS Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=no-reply@mindspringpath.com
SMTP_PASS=your-email-password
```

### Step 3: Test Your Configuration

#### Method 1: API Test
```bash
curl -X POST http://localhost:3000/api/test-hostinger-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "your-personal-email@gmail.com"}'
```

#### Method 2: Admin Panel Test
1. Go to `/admin/appointments`
2. Use the Email Test component
3. Enter your test email address
4. Click "Send Test Email"

## 🔧 Common Issues & Solutions

### Issue 1: Authentication Failed
**Solution:**
- Verify your email password is correct
- If using 2FA, create an app password instead
- Ensure the email account exists in Hostinger
- Try using `no-reply@mindspringpath.com` as the SMTP user

### Issue 2: Connection Timeout
**Solution:**
- Try port 587 with STARTTLS instead of port 465
- Check if your hosting provider blocks SMTP ports
- Verify firewall settings
- Ensure `smtp.hostinger.com` is accessible

### Issue 3: SSL/TLS Errors
**Solution:**
- The configuration now includes `secureProtocol: 'TLSv1_2_method'`
- Try port 587 with STARTTLS enabled
- Try port 465 with SSL/TLS enabled
- Check Hostinger's SSL certificate status
- Ensure `rejectUnauthorized: false` is set

### Issue 4: Email Encryption Problems
**Solution:**
- **Recommended:** Use port 587 with TLS/STARTTLS
- **Alternative:** Use port 465 with SSL/TLS
- The code now automatically handles both configurations
- Update your `.env.local` with the appropriate port

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Hostinger SMTP server | `smtp.hostinger.com` |
| `SMTP_PORT` | SMTP port number | `587` (STARTTLS) or `465` (SSL/TLS) |
| `SMTP_USER` | Your Hostinger email | `no-reply@mindspringpath.com` |
| `SMTP_PASS` | Email password | `your-password` |

### Port Configuration Details

| Port | Encryption | Recommended For |
|------|------------|-----------------|
| `587` | STARTTLS | **Recommended** - Better compatibility |
| `465` | SSL/TLS | Alternative for encryption issues |

## 🚀 Testing Checklist

- [ ] Environment variables set in `.env.local`
- [ ] Email account exists in Hostinger
- [ ] Password is correct (or app password created)
- [ ] Test email sent successfully
- [ ] Booking confirmations work
- [ ] Contact form notifications work
- [ ] Admin notifications work

## 📧 Email Templates

The system sends these email types:

1. **Booking Confirmations** - To clients when they book
2. **Contact Form Submissions** - To admin when someone contacts
3. **Admin Notifications** - For new bookings
4. **Test Emails** - For configuration testing

## 🛠️ Debug Mode

In development, the email system includes:
- Debug logging enabled
- Detailed error messages
- SMTP connection details in logs

Check your console for detailed email sending information.

## 📞 Hostinger Support

If you continue having issues:
1. Contact Hostinger support for SMTP settings
2. Verify your email account is active
3. Check if there are any sending limits
4. Ensure your domain is properly configured

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use strong, unique passwords
- Consider using app passwords if available
- Monitor email sending for unusual activity
