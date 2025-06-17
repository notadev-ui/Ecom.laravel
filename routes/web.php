<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Frontend\{
    HomeController,
    AboutController,
    BlogController,
    ContactController,
    CartController,
    JewelryController,
    SigninController,
    AdminController,
    WishlistController,
    PaymentController
};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home & Static Pages
Route::get('/', [AdminController::class, 'home']);
Route::get('/about', [AboutController::class, 'index']);
Route::get('/contact', [ContactController::class, 'index']);
Route::post('/contact', [ContactController::class, 'submit']);
Route::get('/privacy-policy', [AboutController::class, 'privacy']);
Route::get('/refund_returns', [AboutController::class, 'refund_returns']);
Route::get('/blog', [BlogController::class, 'index']);
Route::get('/jewelry', [JewelryController::class, 'index']);
Route::get('/search', [HomeController::class, 'search'])->name('search');

// Authentication
Route::get('/signin', [SigninController::class, 'index'])->name('user.login');
Route::post('/signin', [SigninController::class, 'handleLogin'])->name('store.login');
Route::get('/register', [SigninController::class, 'register'])->name('user.register');
Route::post('/register', [SigninController::class, 'handleRegister'])->name('store.register');
Route::post('/logout', [SigninController::class, 'logout'])->name('user.logout');

// Admin Login and Dashboard
Route::get('/admin', [AdminController::class, 'index']);
Route::post('/admin_login', [AdminController::class, 'login'])->name('admin.login');
Route::get('/admin/dashboard', [AdminController::class, 'admin_dashboard'])->name('admin.dashboard');

// Product Routes
Route::get('/admin/product', [AdminController::class, 'viewproduct'])->name('admin.product');
Route::post('/admin/product', [AdminController::class, 'addproduct'])->name('admin.addproduct');
Route::get('/admin/get-subcategories/{categoryId}', [AdminController::class, 'getSubCategories']);
Route::get('/admin/showProduct', [AdminController::class, 'showProduct'])->name('admin.showProduct');
Route::get('/admin/deleteProduct/{id}', [AdminController::class, 'deleteProduct'])->name('admin.deleteProduct');
Route::get('/admin/updateProduct/{id}', [AdminController::class, 'updateShowProduct'])->name('admin.updateShowProduct');
Route::post('/admin/updateProduct', [AdminController::class, 'updateProduct'])->name('admin.updateProduct');

// Category Routes
Route::get('/admin/category', [AdminController::class, 'viewCategory'])->name('admin.category');
Route::get('/admin/all-category', [AdminController::class, 'showAllCategory'])->name('admin.allcategory');
Route::post('/admin/category', [AdminController::class, 'addCategory'])->name('admin.addcategory');
Route::get('/admin/showAllcategory', [AdminController::class, 'allcategory'])->name('admin.showallcategory');
Route::get('/admin/deletecategory/{id}', [AdminController::class, 'deleteCategory'])->name('admin.deleteCategory');
Route::get('/admin/updateShowCategory/{id}', [AdminController::class, 'updateShowCategory'])->name('admin.updateShowCategory');
Route::post('/admin/updateShowCategory', [AdminController::class, 'updateCategory'])->name('admin.updateCategory');

// Subcategory Routes
Route::get('/admin/subcategory', [AdminController::class, 'viewSubCategory'])->name('admin.subcategory');
Route::post('/admin/subcategory', [AdminController::class, 'addSubCategory'])->name('admin.addSubCategory');
Route::get('/admin/showSubCategory', [AdminController::class, 'showSubCategory'])->name('admin.showAllSubCategory');
Route::get('/admin/get-subcategories/{categoryId}', [AdminController::class, 'getSubcategories']);
Route::get('/admin/deletesubcategory/{id}', [AdminController::class, 'deleteSubCategory'])->name('admin.deleteSubCategory');
Route::get('/admin/updatesubcategory/{id}', [AdminController::class, 'updateShowSubCategory'])->name('admin.updateShowSubCategory');
Route::post('/admin/updatesubcategory', [AdminController::class, 'updateSubCategory'])->name('admin.updateSubCategory');

// Blog Routes
Route::get('/admin/blog', [AdminController::class, 'addBlog'])->name('admin.addBlog');
Route::post('/admin/blog', [AdminController::class, 'storeBlog'])->name('admin.storeBlog');
Route::get('/admin/Showblog', [AdminController::class, 'viewBlog'])->name('admin.showBlog');

// Cart Routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::patch('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.delete');

// Wishlist Routes
Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
Route::post('/wishlist/add', [WishlistController::class, 'add'])->name('wishlist.add');
Route::delete('/wishlist/remove/{id}', [WishlistController::class, 'remove'])->name('wishlist.remove');

// Products by Category or Single
Route::get('/category/{id}', [JewelryController::class, 'showByCategory'])->name('category.show');
Route::get('/product/{productId}', [JewelryController::class, 'show'])->name('product.view');

// Payment Routes
Route::get('/razorpay-payment', [CartController::class, 'payment'])->name('razorpay.payment');
Route::post('/payment', [PaymentController::class, 'processPayment'])->name('payment');

// Checkout Routes
Route::get('/checkout/address', [CartController::class, 'showAddressForm'])->name('checkout.address');
Route::post('/checkout/address', [CartController::class, 'storeAddress'])->name('checkout.address.store');
Route::post('/checkout/select-address', [CartController::class, 'selectAddress'])->name('checkout.selectAddress');
Route::post('/checkout/payment', [CartController::class, 'showPaymentForm'])->name('checkout.payment');

// Payment Status Pages
Route::get('/payment/success', fn () => view('frontend.payment_success'))->name('payment.success');
Route::get('/payment/failed', fn () => view('frontend.payment_failed'))->name('payment.failed');

// Authenticated Dashboard
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
});
