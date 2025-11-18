# Deploy Ecom24x7 to Railway

Complete guide for deploying the Ecom24x7 Laravel application to Railway.

## 📋 Prerequisites

- [Railway Account](https://railway.app) (Sign up free)
- [GitHub Account](https://github.com) (Project must be on GitHub)
- Git installed locally
- All code committed to GitHub

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your GitHub Repository

#### 1.1 Initialize Git (if not already done)
```bash
cd c:\xampp\htdocs\Ecom.laravel
git init
git add .
git commit -m "Initial commit: Ecom24x7 e-commerce platform"
```

#### 1.2 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository named `Ecom.laravel`
3. Do NOT initialize with README (we have one)

#### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/Ecom.laravel.git
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your GitHub username

---

### Step 2: Create Railway Project

#### 2.1 Login to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Login" (GitHub authentication)
3. Authorize Railway

#### 2.2 Create New Project
1. Click "New Project" button
2. Select "Deploy from GitHub repo"
3. Install Railway GitHub App
4. Select `Ecom.laravel` repository
5. Click "Deploy"

Railway will automatically:
- Detect it's a Laravel project
- Start building
- Deploy to a temporary URL

---

### Step 3: Configure Environment Variables

#### 3.1 Add Database (PostgreSQL)
1. In Railway dashboard, click "Add"
2. Select "Database" → "PostgreSQL"
3. Railway automatically sets `DATABASE_URL`

#### 3.2 Configure Application Variables

In Railway dashboard, click your app → Variables:

```env
# App Configuration
APP_NAME=Ecom24x7
APP_ENV=production
APP_DEBUG=false
APP_KEY=                          # Will be set automatically
APP_URL=https://your-app.railway.app

# Database (Auto-set by Railway PostgreSQL)
DATABASE_URL=postgresql://...     # Auto-configured

# Database Details (if needed separately)
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ecom24x7
DB_USERNAME=postgres
DB_PASSWORD=                      # From PostgreSQL service

# Razorpay Configuration
RAZORPAY_KEY=rzp_live_xxxxxx
RAZORPAY_SECRET=your_secret_key

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_email@mailtrap.io
MAIL_PASSWORD=your_mailtrap_password
MAIL_FROM_ADDRESS=noreply@ecom24x7.com
MAIL_FROM_NAME="Ecom24x7"

# Session Configuration
SESSION_DRIVER=cookie
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

#### 3.3 Generate APP_KEY

1. Open Railway terminal for your app
2. Run: `php artisan key:generate --show`
3. Copy the output (starts with `base64:`)
4. Paste in `APP_KEY` variable
5. Save changes

---

### Step 4: Configure Build & Start Commands

#### 4.1 Build Command
In Railway Variables section, add:
```
BUILD_COMMAND=composer install && npm install && npm run build
```

#### 4.2 Start Command
In Railway Variables section, add:
```
START_COMMAND=php artisan serve --host=0.0.0.0 --port=$PORT
```

Or Railway might auto-detect from `Procfile`:
```
web: vendor/bin/heroku-php-apache2 public/
```

---

### Step 5: Deploy Application

#### 5.1 Trigger Deployment
```bash
# Push changes to GitHub
git add .
git commit -m "feat: add Railway deployment configuration"
git push origin main
```

Railway automatically redeploys when you push to main branch.

#### 5.2 Monitor Deployment
1. Go to Railway dashboard
2. Click your project
3. Watch the build logs
4. Wait for "Build Successful" message

---

### Step 6: Run Migrations & Setup

#### 6.1 Open Railway Terminal
1. In Railway dashboard, click "Web" service
2. Click "Terminal" tab
3. Run migrations:

```bash
php artisan migrate --force
```

#### 6.2 Seed Database (Optional)
```bash
php artisan db:seed
```

#### 6.3 Clear Caches
```bash
php artisan cache:clear
php artisan view:clear
php artisan config:clear
php artisan route:clear
```

---

### Step 7: Configure Custom Domain (Optional)

#### 7.1 Add Custom Domain
1. In Railway project settings
2. Go to "Domains"
3. Click "Add Custom Domain"
4. Enter your domain (e.g., `ecom24x7.com`)

#### 7.2 Update DNS Records
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add CNAME record:
   ```
   Name: @
   Type: CNAME
   Value: cname.railway.app
   ```

3. Wait for DNS propagation (5-30 minutes)

---

## 🔧 Configuration Files Included

### Procfile
Tells Railway how to start the application:
```
web: vendor/bin/heroku-php-apache2 public/
```

### .railwayignore
Specifies files to exclude from deployment (similar to .gitignore):
```
node_modules/
storage/
.git/
composer.lock
```

### build.sh
Build script that runs during deployment:
```bash
php artisan migrate --force
php artisan config:cache
php artisan view:cache
php artisan route:cache
```

---

## 🗄️ Database Setup

### PostgreSQL (Recommended)
Railroad uses PostgreSQL by default. Connection is automatic via `DATABASE_URL`.

### MySQL Alternative
If you prefer MySQL:
1. Use Railway's MySQL plugin
2. Configure `DB_*` variables manually
3. Connection string in `DATABASE_URL`

---

## 📁 File Storage

### Using Public Disk
For product/profile images stored in `public/`:

```php
// In storage/filesystems.php
'public' => [
    'driver' => 'local',
    'path' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
],
```

### Using S3 (Recommended for Production)
For scalable image storage:

1. Get AWS S3 credentials
2. Add environment variables:
   ```
   FILESYSTEM_DISK=s3
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_DEFAULT_REGION=us-east-1
   AWS_BUCKET=your-bucket-name
   ```

---

## 🚨 Troubleshooting

### Build Fails
**Check logs**:
```bash
# In Railway terminal
tail -f storage/logs/laravel.log
```

**Common issues**:
- Missing `composer.lock` - Run `composer install` locally
- PHP version mismatch - Check `composer.json` engines
- Memory limit - Increase in buildpack settings

### Database Connection Error
```bash
# In Railway terminal
php artisan tinker
>>> DB::connection()->getPdo()
```

If fails, check `DATABASE_URL` in variables.

### Migrations Not Running
```bash
# Run manually
php artisan migrate --force

# Check status
php artisan migrate:status
```

### Assets Not Loading
```bash
# In Railway terminal
npm run build
php artisan view:clear
php artisan config:clear
```

### 500 Error
1. Check logs: `storage/logs/laravel.log`
2. Check APP_DEBUG=true temporarily (to see error)
3. Check environment variables are set
4. Run migrations

---

## 🔐 Security Checklist

Before deploying:
- [ ] `APP_DEBUG=false` in production
- [ ] `APP_ENV=production`
- [ ] `APP_KEY` is set (long random string)
- [ ] Razorpay credentials are production keys
- [ ] Mail service is configured
- [ ] Database backups enabled
- [ ] HTTPS is enforced
- [ ] All secrets in environment variables (not in code)

---

## 📊 Monitoring

### View Logs
```bash
# In Railway terminal
tail -f storage/logs/laravel.log

# Or check specific date
tail -f storage/logs/laravel-2025-11-19.log
```

### Health Check
```bash
curl https://your-app.railway.app/
```

Should return homepage HTML.

### Database Backups
1. Go to PostgreSQL service in Railway
2. Click "Backups"
3. Enable automatic backups
4. Set retention period (30 days recommended)

---

## 🔄 Continuous Deployment

Railway automatically deploys when you:
1. Push to main branch
2. Commit is successful
3. All checks pass

To skip deployment:
```bash
git commit -m "chore: update docs [skip ci]"
```

---

## 📈 Scaling & Performance

### Database
- PostgreSQL: Up to 5GB free tier
- Scale up for larger data

### Web Dyno
- Free tier: Limited resources
- Pro tier: Better performance, uptime SLA

### Caching
Already configured in `APP_CACHE`:
```env
CACHE_DRIVER=file
```

For production, use Redis:
```env
CACHE_DRIVER=redis
REDIS_URL=redis://...
```

---

## 💾 Backups & Recovery

### Database Backups
1. Railway PostgreSQL includes automatic backups
2. Check in PostgreSQL service → Backups
3. Restore from backup if needed

### Application Backups
```bash
# Backup local database to file
php artisan tinker
>>> DB::connection('backup')->statement(...)
```

---

## 🎓 Next Steps After Deployment

1. **Test All Features**
   - User registration/login
   - Product browsing
   - Shopping cart
   - Checkout process
   - Payment (test mode)

2. **Monitor Performance**
   - Check response times
   - Monitor database queries
   - Track error logs

3. **Setup Monitoring**
   - Enable Sentry for error tracking
   - Setup New Relic for performance
   - Configure log aggregation

4. **Update DNS**
   - Point domain to Railway
   - Enable SSL/TLS

5. **Database Optimization**
   - Add indexes to slow queries
   - Archive old data
   - Monitor storage usage

---

## 📞 Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Laravel Deploy**: https://laravel.com/docs/deployment
- **GitHub Issues**: https://github.com/notadev-ui/Ecom.laravel/issues

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `php artisan serve` |
| Run migrations | `php artisan migrate` |
| View logs | `tail -f storage/logs/laravel.log` |
| Clear caches | `php artisan optimize:clear` |
| Tinker shell | `php artisan tinker` |
| Generate key | `php artisan key:generate` |

---

## Deployment Success! 🎉

After successful deployment:
1. Visit your Railway app URL
2. Test user registration
3. Test product browsing
4. Test checkout process
5. Monitor logs for errors

Your Ecom24x7 application is now live!

---

*Last Updated: November 19, 2025*
*For issues: Check Railway logs or Laravel error log*
