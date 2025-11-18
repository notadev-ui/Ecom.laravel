# Railway Deployment Checklist & Quick Start

## ✅ Pre-Deployment Checklist

### Code Readiness
- [ ] All code committed to Git
- [ ] `.gitignore` properly configured
- [ ] No sensitive data in code (use `.env`)
- [ ] All dependencies in `composer.json`
- [ ] All Node packages in `package.json`

### Configuration
- [ ] `.env.example` updated with all variables
- [ ] `Procfile` created
- [ ] `.railwayignore` created
- [ ] `build.sh` created
- [ ] `composer.json` PHP version is `^8.1`

### Database
- [ ] All migrations created
- [ ] `database/migrations/` folder has all schema files
- [ ] Models have proper relationships
- [ ] No hardcoded database connection strings

### Environment Variables
- [ ] APP_KEY generated (not blank)
- [ ] APP_ENV set to "production"
- [ ] APP_DEBUG set to "false"
- [ ] Database credentials ready
- [ ] Razorpay production keys ready
- [ ] Mail service configured

### Assets
- [ ] CSS compiled: `npm run build` successful locally
- [ ] No broken image links
- [ ] All JavaScript files minified
- [ ] Public directory permissions correct

### Security
- [ ] No default credentials in code
- [ ] HTTPS enforced (Railway handles this)
- [ ] CORS configured if needed
- [ ] API keys stored in environment variables

---

## 🚀 Quick Deploy in 10 Steps

### Step 1: Prepare Your Repository
```bash
cd c:\xampp\htdocs\Ecom.laravel

# Initialize git if not done
git init

# Add all files
git add .

# Commit
git commit -m "Deploy: Ecom24x7 to Railway"
```

### Step 2: Push to GitHub
```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/Ecom.laravel.git

# Set main branch
git branch -M main

# Push
git push -u origin main
```

### Step 3: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway

### Step 4: Create Project in Railway
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Click "Install" for Railway App
4. Select `Ecom.laravel` repository
5. Click "Deploy"

Railway starts building automatically!

### Step 5: Add Database Service
1. Click "Add" in Railway project
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway auto-configures `DATABASE_URL`

### Step 6: Set Environment Variables

In Railway dashboard, click your Web service → Variables:

```
APP_NAME=Ecom24x7
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_URL=https://your-railway-app.up.railway.app

RAZORPAY_KEY=rzp_live_YOUR_KEY
RAZORPAY_SECRET=your_secret

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@ecom24x7.com
```

### Step 7: Generate Application Key
1. Click Web service → Terminal
2. Run: `php artisan key:generate --show`
3. Copy the output (starts with `base64:`)
4. Paste in `APP_KEY` variable
5. Save

### Step 8: Run Migrations
In Railway Terminal:
```bash
php artisan migrate --force
```

### Step 9: Clear Caches
In Railway Terminal:
```bash
php artisan config:cache
php artisan view:cache
php artisan route:cache
```

### Step 10: Test Your App
1. Get your Railway URL from dashboard
2. Visit: `https://your-app.up.railway.app`
3. Test homepage loads
4. Test user registration
5. Test product browsing

**🎉 You're live!**

---

## 📋 Configuration Quick Reference

### Must-Have Variables
```env
APP_KEY=                    # Run: php artisan key:generate --show
APP_ENV=production
APP_DEBUG=false
APP_URL=https://YOUR_RAILWAY_URL
DATABASE_URL=               # Auto-set by PostgreSQL service
```

### Payment Setup (Razorpay)
```env
RAZORPAY_KEY=rzp_live_xxxxx
RAZORPAY_SECRET=xxxxx
```

Get these from [Razorpay Dashboard](https://dashboard.razorpay.com)

### Email Setup (Mailtrap)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_inbox
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@ecom24x7.com
```

Get account at [mailtrap.io](https://mailtrap.io)

---

## 🔍 Verify Deployment

### Check App is Running
```bash
curl https://your-railway-url.up.railway.app
```

Should return HTML homepage.

### Check Database Connection
1. Go to Railway Terminal
2. Run:
```bash
php artisan tinker
>>> DB::connection()->getPdo()
```

If no error, database is connected!

### View Logs
```bash
# In Railway Terminal
tail -f storage/logs/laravel.log
```

### Test Database
```bash
# In Railway Terminal
php artisan tinker
>>> User::count()
>>> Product::count()
```

---

## 🐛 Troubleshooting

### Build Fails
**Solution**:
```bash
# Check build logs in Railway
# Look for error messages about:
# - PHP version compatibility
# - Missing packages
# - Syntax errors

# Fix locally, then push
git add .
git commit -m "fix: resolve build issue"
git push origin main
```

### App Won't Start
**Check logs**:
```bash
# In Railway Terminal
cat storage/logs/laravel.log

# Or
php artisan tinker
```

**Common fixes**:
1. Check APP_KEY is set
2. Run migrations: `php artisan migrate --force`
3. Check environment variables

### Database Error
**Test connection**:
```bash
# In Railway Terminal
php artisan tinker
>>> DB::connection()->getPdo()
>>> DB::select('SELECT 1')
```

### White Screen / 500 Error
1. Set `APP_DEBUG=true` temporarily
2. Check logs: `storage/logs/laravel.log`
3. Fix issue
4. Set `APP_DEBUG=false`

### Assets Not Loading
```bash
# In Railway Terminal
npm run build
php artisan view:clear
php artisan config:clear
```

---

## 📊 Daily Operations

### View Live Logs
```bash
# In Railway Terminal (keep open)
tail -f storage/logs/laravel.log
```

### Monitor Database
```bash
# In Railway Terminal
php artisan tinker
>>> User::count()
>>> Order::count()
>>> Cart::count()
```

### Clear Cache
```bash
# If needed
php artisan optimize:clear
```

---

## 🔐 Security Reminders

✅ **DO**:
- Use environment variables for all secrets
- Set `APP_DEBUG=false` in production
- Enable database backups
- Monitor logs regularly
- Update dependencies periodically

❌ **DON'T**:
- Commit `.env` file
- Use default passwords
- Disable HTTPS
- Leave debug mode on
- Expose API keys in code

---

## 📈 Scaling Options

### Free Tier Limits
- **Disk Space**: 5GB
- **Memory**: Shared
- **Database**: 5GB PostgreSQL
- **Bandwidth**: Metered

### Upgrade Path
If you hit limits:
1. Go to Railway settings
2. Switch to paid plan
3. Get dedicated resources
4. Better performance

---

## 🔄 Deploying Updates

### After Making Changes Locally

1. **Test locally**:
```bash
php artisan serve
npm run dev
```

2. **Commit and push**:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

3. **Monitor deployment**:
   - Railway auto-deploys
   - Check build status in dashboard
   - View logs after deploy

### Rolling Back
If deployment breaks:
```bash
# In Railway dashboard
# Click "Deployments"
# Select previous working version
# Click "Redeploy"
```

---

## 📞 Support & Help

### Railway Issues
- Check [Railway Status](https://status.railway.app)
- Read [Railway Docs](https://docs.railway.app)
- Email Railway support

### Laravel Issues
- Check [Laravel Docs](https://laravel.com/docs)
- View logs: `storage/logs/laravel.log`
- Use: `php artisan tinker`

### Project Issues
- Check [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
- See [README_MAIN.md](README_MAIN.md)
- Check [TROUBLESHOOTING.md](#)

---

## ✨ Post-Deployment

After successful deployment:

1. **Test All Features**
   - [ ] Home page loads
   - [ ] Products display
   - [ ] Search works
   - [ ] User registration works
   - [ ] Login works
   - [ ] Cart functions
   - [ ] Checkout completes
   - [ ] Payment processes

2. **Setup Monitoring**
   - [ ] Enable Rails backups
   - [ ] Setup error tracking
   - [ ] Configure log alerts
   - [ ] Monitor performance

3. **Configure Domain**
   - [ ] Add custom domain
   - [ ] Update DNS records
   - [ ] Verify SSL certificate
   - [ ] Test with domain

4. **Team Access**
   - [ ] Add team members to Railway
   - [ ] Give appropriate permissions
   - [ ] Document access process
   - [ ] Setup alerts

---

## 🎯 Next Steps

1. Deploy following this checklist
2. Test all features thoroughly
3. Setup monitoring and alerts
4. Configure custom domain
5. Add team members
6. Document deployment details
7. Create deployment runbook
8. Setup automated backups

---

*Last Updated: November 19, 2025*
*Ready to deploy! 🚀*
