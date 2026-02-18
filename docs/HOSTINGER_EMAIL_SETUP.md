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
SMTP_PORT=465
SMTP_USER=info@mindspringpath.com.au
SMTP_PASS=your-email-password
```

### Alternative Hostinger Settings

If the above doesn't work, try these alternatives:

```env
# Alternative 1: Different Hostinger server
SMTP_HOST=mx1.hostinger.com
SMTP_PORT=587

# Alternative 2: With TLS
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
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

### Issue 2: Connection Timeout
**Solution:**
- Try port 587 instead of 465
- Check if your hosting provider blocks SMTP ports
- Verify firewall settings

### Issue 3: SSL/TLS Errors
**Solution:**
- The configuration includes `rejectUnauthorized: false`
- Try different port combinations
- Check Hostinger's SSL certificate status

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Hostinger SMTP server | `smtp.hostinger.com` |
| `SMTP_PORT` | SMTP port number | `465` or `587` |
| `SMTP_USER` | Your Hostinger email | `info@mindspringpath.com.au` |
| `SMTP_PASS` | Email password | `your-password` |

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
