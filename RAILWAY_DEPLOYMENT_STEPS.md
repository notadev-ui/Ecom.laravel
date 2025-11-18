# 🚀 Railway Deployment - Interactive Setup Guide

**Status**: Your code is now on GitHub! ✅

## Step 1: Create Railway Account

1. Go to **https://railway.app**
2. Click **"Login with GitHub"**
3. Authorize Railway to access your GitHub account
4. Click **"Create New Project"**

---

## Step 2: Connect Your Repository

1. In Railway Dashboard, click **"Deploy from GitHub"**
2. Select **"notadev-ui"** organization
3. Find and select **"Ecom.laravel"** repository
4. Click **"Deploy"**

**What happens next:**
- Railway automatically detects Procfile
- Identifies it as a Laravel project
- Starts building your application
- May take 2-5 minutes

---

## Step 3: Add PostgreSQL Database

While the app is building, add a database:

1. Click **"Add Service"** (or **"+"** button)
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway automatically creates it and sets `DATABASE_URL`

---

## Step 4: Set Environment Variables

Once PostgreSQL is added:

1. In your project, click **"Variables"** (in the web service)
2. Add these variables from `.env.railway.example`:

### Required Variables:

```
APP_ENV=production
APP_DEBUG=false
APP_NAME=Ecom24x7
APP_URL=https://[your-app-name].up.railway.app
LOG_CHANNEL=stack
LOG_LEVEL=error
```

### Generate APP_KEY:

1. Open Railway Terminal (click the web service)
2. Run this command:
   ```bash
   php artisan key:generate --show
   ```
3. Copy the output (starts with `base64:`)
4. Add to Variables:
   ```
   APP_KEY=base64:xxxxx (paste the output)
   ```

### Add Razorpay Credentials:

```
RAZORPAY_KEY=your_test_or_live_key
RAZORPAY_SECRET=your_test_or_live_secret
```

### Add Mail Configuration (Gmail Example):

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@ecom24x7.com
MAIL_FROM_NAME="Ecom24x7"
```

**For Gmail:**
- Use an App-specific Password (not your regular password)
- Enable 2-factor authentication
- Generate at: https://myaccount.google.com/apppasswords

---

## Step 5: Run Database Migrations

1. Open Railway Terminal (web service)
2. Run:
   ```bash
   php artisan migrate --force
   ```
3. Wait for completion - you'll see table creation confirmations

---

## Step 6: Clear Caches (Optional but Recommended)

In Railway Terminal, run:

```bash
php artisan config:cache
php artisan view:cache
php artisan route:cache
```

---

## Step 7: Monitor Deployment

```
DEPLOYMENT STATUS
├─ Build Running     🔵 (building composer/npm)
├─ Build Successful  ✅ (ready)
├─ Running           🟢 (live and responding)
└─ Error             ❌ (check logs)
```

**Check logs:**
1. Click your web service
2. View "Logs" tab
3. Look for errors or success messages

---

## Step 8: Test Your App

Once status shows **"Running" (green)** ✅:

1. Click the URL at the top (looks like `https://your-app-name.up.railway.app`)
2. Visit your live app!

**Test these features:**
- [ ] Homepage loads with CSS/images
- [ ] User registration works
- [ ] Login works
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout process
- [ ] Payment gateway loads

---

## Step 9: Verify Database Connection

In Railway Terminal:

```bash
php artisan tinker
```

Then type:
```
\DB::connection()->getDatabaseName()
```

Should return your database name. Type `exit` to quit.

---

## Step 10: Check for Errors

If something isn't working:

1. **Check Build Logs:**
   - Click "Deployment" tab
   - View build output

2. **Check Runtime Logs:**
   - Click "Logs" tab
   - Search for error messages

3. **Check Database:**
   - Click PostgreSQL service
   - Verify it's running (green status)

4. **Test Database Connection:**
   ```bash
   php artisan db:show
   ```

---

## Common Issues & Solutions

### ❌ "Unable to connect to database"

**Solution:**
- Verify PostgreSQL service is running (green status)
- Check `DATABASE_URL` is set in variables
- Run migrations: `php artisan migrate --force`

### ❌ "Class not found" or "APP_KEY not set"

**Solution:**
- Ensure `APP_KEY` variable is set
- Run: `php artisan config:cache`
- Redeploy by pushing a commit to main

### ❌ "CSS/images not loading"

**Solution:**
- Run: `php artisan storage:link`
- In Railway Terminal: `php artisan view:cache`
- Check Procfile points to `public/` directory

### ❌ "Razorpay errors on checkout"

**Solution:**
- Verify `RAZORPAY_KEY` and `RAZORPAY_SECRET` are correct
- Use TEST keys for testing, LIVE keys for production
- Check keys match your Razorpay account

### ❌ "Emails not sending"

**Solution:**
- Verify all `MAIL_*` variables are set
- Check email provider credentials
- For Gmail: use App-specific password (not main password)
- Test with: `php artisan mail:send-test-email`

---

## Your Railway URL

Once deployed, your app is at:

```
https://[project-name].up.railway.app
```

**To find your URL:**
1. Click your project in Railway Dashboard
2. Click web service
3. URL shown at the top in the gray banner

---

## Next Steps (After Verification)

### 1. Setup Custom Domain (Optional)
- In Railway, go to "Domains"
- Add your custom domain
- Update DNS records

### 2. Enable Error Monitoring
- Set up logging service
- Monitor performance
- Track errors

### 3. Setup Automatic Backups
- In PostgreSQL service
- Enable automated backups

### 4. Upgrade from Free Tier (When Needed)
- Free: $5/month of compute
- Pro: Pay as you go, unlimited resources

---

## Useful Commands for Railway Terminal

```bash
# Check Laravel version
php artisan --version

# View environment
php artisan config:show

# Test email sending
php artisan mail:send-test-email to@example.com

# Run artisan tinker (interactive shell)
php artisan tinker

# Check database
php artisan db:show

# View all database tables
php artisan db:table users

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear

# View logs
tail -f storage/logs/laravel.log
```

---

## Support & Documentation

- **Railway Docs:** https://docs.railway.app
- **Laravel Docs:** https://laravel.com/docs
- **Your Docs:** See DOCUMENTATION_INDEX.md
- **Quick Start:** See RAILWAY_QUICK_START.md
- **Troubleshooting:** See RAILWAY_DEPLOYMENT.md

---

## ✅ Deployment Checklist

```
PRE-DEPLOYMENT
├─ [✓] Code pushed to GitHub
├─ [✓] Railway account created
├─ [✓] Repository connected
└─ [✓] PostgreSQL service added

CONFIGURATION
├─ [ ] APP_KEY generated and set
├─ [ ] APP_ENV=production
├─ [ ] DATABASE_URL confirmed (auto from PostgreSQL)
├─ [ ] RAZORPAY credentials added
├─ [ ] MAIL variables configured
└─ [ ] All variables added to Railway

VERIFICATION
├─ [ ] Migrations ran successfully
├─ [ ] Caches cleared
├─ [ ] App status shows "Running" (green)
├─ [ ] Homepage loads
├─ [ ] Database connected
└─ [ ] Features tested

READY FOR PRODUCTION
└─ [ ] All tests pass - GO LIVE!
```

---

## Your Deployment is Ready! 🎉

**What's been prepared for you:**
- ✅ Procfile (how to start your app)
- ✅ build.sh (build process)
- ✅ .railwayignore (files to exclude)
- ✅ .env.railway.example (environment template)
- ✅ All documentation files

**Now you need to:**
1. Create Railway account
2. Connect your GitHub repository
3. Add PostgreSQL database
4. Set environment variables
5. Run migrations
6. Test your app
7. 🚀 Go live!

**Estimated time: 10-15 minutes**

Good luck! 🚀
