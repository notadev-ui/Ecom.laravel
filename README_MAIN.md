# Ecom24x7 - E-Commerce Jewelry Platform

A modern Laravel-based e-commerce application for selling handcrafted jewelry with user authentication, shopping cart, wishlist, and Razorpay payment integration.

## 🌟 Features

### Customer Features
- ✅ **Product Browsing**: Browse jewelry by category and subcategory
- ✅ **Product Search**: Full-text search across product catalog
- ✅ **Shopping Cart**: Add/remove items, persistent cart storage
- ✅ **Wishlist**: Save favorite products for later
- ✅ **User Authentication**: Register, login, password reset
- ✅ **User Profile**: View and edit profile information
- ✅ **Order History**: Track past purchases
- ✅ **Checkout Process**: Address selection and order placement
- ✅ **Payment Integration**: Razorpay payment gateway
- ✅ **Contact Form**: Submit inquiries and feedback
- ✅ **Blog Section**: Read jewelry care and style tips

### Admin Features
- ✅ **Product Management**: Add, edit, delete products
- ✅ **Category Management**: Manage product categories and subcategories
- ✅ **Blog Management**: Create and manage blog posts
- ✅ **Dashboard**: View orders and sales metrics

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Laravel 10+ |
| **Database** | MySQL |
| **Frontend** | Blade Templates, Bootstrap 5 |
| **CSS Framework** | Bootstrap 5, Custom CSS |
| **Icons** | Font Awesome 6 |
| **JavaScript** | jQuery, Vanilla JS |
| **Payment** | Razorpay Gateway |
| **Authentication** | Laravel Fortify, Sanctum |
| **UI Components** | Laravel Jetstream |

---

## 📋 Requirements

- **PHP**: 8.1+
- **Composer**: Latest version
- **Node.js**: 16+ (for asset compilation)
- **MySQL**: 5.7+
- **Apache/Nginx**: Web server
- **XAMPP** (for local development): PHP 8.1+, MySQL 5.7+

---

## 🚀 Installation

### 1. Clone the Repository
```bash
cd c:\xampp\htdocs
git clone https://github.com/notadev-ui/Ecom.laravel.git
cd Ecom.laravel
```

### 2. Install Dependencies
```bash
# PHP dependencies
composer install

# JavaScript dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Configure Database
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecom24x7
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run Migrations
```bash
php artisan migrate
```

### 6. Build Assets
```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
```

### 7. Start Development Server
```bash
php artisan serve
```

Access the application at `http://127.0.0.1:8000`

---

## 📁 Project Structure

### Main Directories
```
app/
├── Http/Controllers/Frontend/    # Feature controllers
├── Models/                       # Eloquent models
└── Providers/                    # Service providers

resources/views/frontend/         # Blade templates
├── layouts/                      # Master layouts
├── auth/                         # Auth pages
├── products/                     # Product pages
└── checkout/                     # Checkout flow

public/frontend/                  # Frontend assets
├── css/                          # Stylesheets
├── js/                           # JavaScript files
└── img/                          # Images

database/migrations/              # Schema migrations
routes/web.php                    # Route definitions
```

### Key Files
- `routes/web.php` - All application routes
- `.env` - Environment configuration
- `artisan` - Laravel command line interface
- `composer.json` - PHP dependencies
- `package.json` - Node.js dependencies
- `vite.config.js` - Asset bundling config

---

## 🔧 Configuration

### Database Configuration
```bash
php artisan migrate              # Run all migrations
php artisan migrate:fresh        # Reset database (development only)
php artisan migrate:rollback     # Rollback last batch
php artisan tinker               # Interactive shell
```

### Environment Variables
Key variables in `.env`:
```env
APP_NAME=Ecom24x7
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

MAIL_FROM_ADDRESS=noreply@ecom24x7.com
```

### Asset Compilation
```bash
npm run dev      # Development mode (watches for changes)
npm run build    # Production build (minified)
npm run watch    # Watch mode (deprecated, use dev)
```

---

## 🔐 Authentication

The application uses **Laravel Fortify** for authentication:

### Authentication Flow
1. User registers at `/register`
2. User logs in at `/signin`
3. Authenticated users access `/profile` and protected routes
4. Session stored in `sessions` table
5. Users can reset password via email link

### Protected Routes
- `/profile` - User dashboard
- `/profile/edit` - Edit profile
- `/orders` - Order history
- `/cart/checkout` - Checkout process

### Default Admin Access
Check `AdminController::index()` for admin panel access requirements.

---

## 💳 Payment Integration

### Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API Key and Secret
3. Add to `.env`:
   ```env
   RAZORPAY_KEY=rzp_live_xxxxxxxxxx
   RAZORPAY_SECRET=your_secret_key
   ```

### Payment Flow
1. User adds items to cart
2. Checkout → Address selection
3. Razorpay payment modal opens
4. After successful payment → Order created
5. User sees payment success page

### Payment Status Routes
- `/payment/success` - Successful payment
- `/payment/failed` - Failed payment

---

## 🎨 Theming & Styling

### Brand Color Scheme
- **Primary**: `#a9d3abff` (Sage Green)
- **Secondary**: `#9b006f` (Purple)
- **Accent**: `#977935` (Brown)

### CSS Files
- `public/frontend/css/theme.css` - Main stylesheet
- `public/frontend/css/searchtab.css` - Search component
- `public/frontend/css/variables.css` - CSS custom properties (NEW)

### Using CSS Variables
```css
/* Available variables in variables.css */
.button {
    background-color: var(--primary-brand);
    color: var(--btn-primary-text);
}
```

### Customizing Colors
Edit `public/frontend/css/variables.css` to change the entire theme globally.

---

## 📚 Key Controllers

| Controller | Purpose | Methods |
|-----------|---------|---------|
| `AdminController` | Admin dashboard & product management | `admin_dashboard()`, `addProduct()` |
| `SigninController` | User authentication | `handleLogin()`, `handleRegister()`, `logout()` |
| `ProfileController` | User profile management | `show()`, `edit()`, `update()`, `orders()` |
| `CartController` | Shopping cart operations | `add()`, `destroy()`, `payment()` |
| `JewelryController` | Product browsing | `index()`, `show()`, `showByCategory()` |
| `PaymentController` | Payment processing | `processPayment()` |
| `WishlistController` | Wishlist management | `add()`, `remove()` |

See `PROJECT_STRUCTURE.md` for detailed controller documentation.

---

## 📦 Database Schema

### Core Tables
- `users` - User accounts
- `products` - Product catalog
- `categories` - Product categories
- `subcategories` - Product subcategories
- `carts` - Shopping carts
- `cart_items` - Cart line items
- `orders` - Customer orders
- `order_items` - Order line items
- `wishlist_items` - Wishlist entries
- `addresses` - Shipping addresses
- `blogs` - Blog posts

See `DEVELOPMENT_GUIDELINES.md` for migration best practices.

---

## 🧪 Testing

### Running Tests
```bash
# Run all tests
php artisan test

# Run specific test
php artisan test tests/Feature/ProductTest.php

# Run with coverage
php artisan test --coverage
```

### Test Structure
```
tests/
├── Feature/              # Feature tests
│   ├── ProductTest.php
│   └── CartTest.php
└── Unit/                 # Unit tests
    └── PriceTest.php
```

---

## 🐛 Troubleshooting

### Common Issues

**Database connection error**
```bash
# Check .env database credentials
# Reset MySQL password if needed
php artisan migrate:fresh
```

**Assets not loading**
```bash
# Recompile assets
npm run build

# Clear cache
php artisan cache:clear
php artisan view:clear
```

**Blade template errors**
```bash
# Clear compiled views
php artisan view:clear

# Check blade syntax
php artisan blade:check
```

**Authentication issues**
```bash
# Clear all sessions
php artisan session:clear

# Regenerate key
php artisan key:generate
```

---

## 📖 Documentation

- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Development Guidelines**: See `DEVELOPMENT_GUIDELINES.md`
- **Laravel Docs**: [laravel.com/docs](https://laravel.com/docs)
- **Blade Syntax**: [laravel.com/docs/blade](https://laravel.com/docs/blade)

---

## 🔄 Recent Changes

### Version 1.2.0 (November 2025)
- ✅ Theme color unified to `#a9d3abff`
- ✅ CSS variables system implemented
- ✅ Responsive header design
- ✅ Authentication redirect to profile
- ✅ Order and order items tables created
- ✅ Project structure documentation

### Version 1.1.0
- Added user profile management
- Implemented shopping cart persistence
- Added wishlist functionality
- Razorpay payment integration

### Version 1.0.0
- Initial release
- Product catalog
- User authentication
- Basic checkout

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 👥 Team

- **Development**: [Your Name]
- **Design**: [Design Team]
- **Product**: Ecom24x7

---

## 📞 Support

For issues or questions:
- Email: support@ecom24x7.com
- GitHub Issues: [Project Issues](https://github.com/notadev-ui/Ecom.laravel/issues)

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Run `composer install --optimize-autoloader --no-dev`
- [ ] Run `npm run build`
- [ ] Set up SSL certificate
- [ ] Configure environment variables
- [ ] Run migrations on production database
- [ ] Set up backup strategy
- [ ] Configure monitoring and logging

### Deployment Steps
```bash
# Pull latest code
git pull origin main

# Install dependencies
composer install --optimize-autoloader --no-dev

# Update environment
cp .env.production .env

# Run migrations
php artisan migrate --force

# Clear cache
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# Build assets
npm run build
```

---

## 🎯 Roadmap

- [ ] Mobile app
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Subscription plans
- [ ] Multi-currency support
- [ ] Inventory management system
- [ ] Email marketing integration

---

*Last Updated: November 19, 2025*
*For questions or contributions, please open an issue on GitHub.*
