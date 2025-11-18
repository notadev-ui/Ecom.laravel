# Ecom24x7 - Quick Reference Guide

## ⚡ Common Commands

### Development Server
```bash
php artisan serve                          # Start development server on localhost:8000
php artisan serve --host=192.168.x.x       # Start on specific IP address
```

### Database
```bash
php artisan migrate                        # Run pending migrations
php artisan migrate:fresh                  # Drop all tables and re-run migrations
php artisan migrate:refresh                # Rollback and re-run migrations
php artisan migrate:rollback               # Rollback last batch
php artisan migrate:status                 # Show migration status
php artisan tinker                         # Interactive shell (test code)
```

### Cache & Cleanup
```bash
php artisan cache:clear                    # Clear application cache
php artisan config:clear                   # Clear config cache
php artisan view:clear                     # Clear compiled views
php artisan route:clear                    # Clear route cache
php artisan optimize:clear                 # Clear all caches
```

### Assets
```bash
npm run dev                                # Compile assets in dev mode (watch for changes)
npm run build                              # Build production assets
npm install                                # Install dependencies
npm update                                 # Update dependencies
```

### Code Quality
```bash
php artisan tinker                         # Interactive shell for testing
php artisan make:model ProductModel        # Generate new model
php artisan make:controller ProductController # Generate controller
php artisan make:migration create_products_table # Generate migration
```

---

## 🔍 Finding Things

### Find a route
```bash
# View all routes
php artisan route:list

# Filter by name
php artisan route:list --name=product

# Filter by controller
php artisan route:list --controller=ProductController
```

### Find a file
```bash
# Using find command
find . -name "*.php" -type f | grep ProductController

# Using grep for content
grep -r "function index" app/Http/Controllers
```

---

## 🎯 Common Development Tasks

### Add a New Feature

1. **Create the Controller**
   ```bash
   php artisan make:controller Frontend/MyNewController
   ```

2. **Create the Model** (if needed)
   ```bash
   php artisan make:model MyModel -m  # -m creates migration
   ```

3. **Create the View**
   ```bash
   # Create directory and file manually in resources/views/frontend/
   mkdir -p resources/views/frontend/mynew
   touch resources/views/frontend/mynew/index.blade.php
   ```

4. **Add the Routes**
   Edit `routes/web.php`:
   ```php
   Route::get('/mynew', [MyNewController::class, 'index'])->name('mynew.index');
   ```

5. **Implement the Logic**
   - Add methods to controller
   - Create views
   - Test with `php artisan serve`

### Create a Migration
```bash
php artisan make:migration create_products_table       # Create table
php artisan make:migration add_price_to_products       # Add column
php artisan make:migration drop_price_from_products    # Remove column
```

### Create a Model with All Boilerplate
```bash
php artisan make:model Product -mcr  # -m: migration, -c: controller, -r: resource
```

---

## 🔧 Configuration

### Change Theme Color
Edit `public/frontend/css/variables.css`:
```css
:root {
  --primary-brand: #a9d3abff;  /* Change this */
  --btn-primary-bg: var(--primary-brand);
}
```

### Add New Environment Variable
1. Add to `.env`:
   ```env
   MY_CUSTOM_VAR=value
   ```

2. Use in code:
   ```php
   $value = env('MY_CUSTOM_VAR', 'default');
   ```

### Configure Mail
Edit `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@ecom24x7.com
```

---

## 🐛 Debugging

### Enable Debug Mode
Edit `.env`:
```env
APP_DEBUG=true
```

### View Log Files
```bash
# Real-time log
tail -f storage/logs/laravel.log

# View last 100 lines
tail -100 storage/logs/laravel.log
```

### Use Tinker for Testing
```bash
php artisan tinker

# In tinker shell
>>> $user = User::find(1);
>>> $user->orders;
>>> $user->update(['name' => 'New Name']);
>>> exit
```

### Database Query Debugging
```php
// In controller
\Illuminate\Support\Facades\DB::enableQueryLog();
$products = Product::where('active', true)->get();
$queries = \Illuminate\Support\Facades\DB::getQueryLog();
dd($queries);
```

---

## 📂 File Locations Reference

| What | Where |
|-----|-------|
| Routes | `routes/web.php` |
| Controllers | `app/Http/Controllers/Frontend/` |
| Models | `app/Models/` |
| Views | `resources/views/frontend/` |
| CSS | `public/frontend/css/` |
| JavaScript | `public/frontend/js/` |
| Migrations | `database/migrations/` |
| Config | `config/` |
| Environment | `.env` |

---

## 🔐 Authentication Helpers

### Check if User is Authenticated
```blade
@auth
  <p>User is logged in</p>
@endauth

@guest
  <p>User is not logged in</p>
@endguest
```

### Get Current User
```blade
{{ Auth::user()->name }}
{{ auth()->user()->email }}
```

### In Controller
```php
$user = auth()->user();  // Get current user
if (auth()->check()) {   // Is user authenticated?
    // User is logged in
}
```

---

## 🧪 Testing Quick Start

### Create a Test
```bash
php artisan make:test ProductTest           # Feature test
php artisan make:test ProductTest --unit    # Unit test
```

### Run Tests
```bash
php artisan test                            # Run all tests
php artisan test tests/Feature/ProductTest.php # Single test
```

### Basic Test Template
```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;

class ProductTest extends TestCase
{
    public function test_user_can_view_products()
    {
        $response = $this->get('/jewelry');
        $response->assertStatus(200);
    }

    public function test_user_can_view_single_product()
    {
        $product = Product::factory()->create();
        $response = $this->get(route('product.view', $product));
        $response->assertStatus(200);
        $response->assertSee($product->name);
    }
}
```

---

## 💡 Best Practices Checklist

- [ ] Always validate user input in controllers
- [ ] Use type hints for parameters and returns
- [ ] Use model scopes for common queries
- [ ] Eager load relationships to avoid N+1 queries
- [ ] Cache frequently accessed data
- [ ] Write tests for critical features
- [ ] Document complex functions with PHPDoc
- [ ] Use named routes instead of hardcoded URLs
- [ ] Escape output in Blade with `{{ }}` not `{!! !!}`
- [ ] Use middleware for cross-cutting concerns

---

## 🔗 Useful Links

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Best Practices](https://github.com/alexeymezenin/laravel-best-practices)
- [Blade Syntax Reference](https://laravel.com/docs/blade)
- [Eloquent ORM Guide](https://laravel.com/docs/eloquent)
- [Laravel Testing Guide](https://laravel.com/docs/testing)
- [PHP 8 Features](https://www.php.net/releases/8.0/)

---

## 🆘 Getting Help

### Before asking for help:
1. Check the error message carefully
2. Check `storage/logs/laravel.log`
3. Search in project documentation
4. Try clearing cache: `php artisan optimize:clear`
5. Verify database connection
6. Check database table structure: `php artisan tinker`

### If still stuck:
- Search the Laravel documentation
- Check GitHub issues
- Ask in Laravel Discord community
- Review similar code in the project

---

## 📋 Development Workflow

### Starting Your Day
```bash
git pull origin main
composer install
npm install
php artisan migrate

# Start development server
php artisan serve

# In another terminal
npm run dev
```

### Before Committing
```bash
# Test your changes
php artisan test

# Clear cache
php artisan optimize:clear

# Format code (if using formatter)
php artisan pint

# Commit with clear message
git add .
git commit -m "feat: add new feature description"
```

---

*Last Updated: November 19, 2025*
