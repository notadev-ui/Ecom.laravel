# Ecom24x7 - Development Guidelines

## Code Organization Standards

### File Naming Conventions
- **Controllers**: `PascalCase.php` (e.g., `ProductController.php`)
- **Models**: `PascalCase.php` (e.g., `Product.php`)
- **Views**: `kebab-case.blade.php` (e.g., `edit-profile.blade.php`)
- **Routes**: Group by domain (auth, admin, cart, etc.)
- **CSS Files**: `kebab-case.css` (e.g., `theme.css`, `search-tab.css`)
- **JavaScript**: `camelCase.js` or `kebab-case.js`

### Directory Organization

#### Controllers
```
Controllers/Frontend/
├── AuthenticationControllers/
│   ├── SigninController.php
│   └── ProfileController.php
├── ShoppingControllers/
│   ├── CartController.php
│   ├── WishlistController.php
│   └── JewelryController.php
└── AdminControllers/
    ├── AdminController.php
    └── PaymentController.php
```

#### Views
```
resources/views/frontend/
├── layouts/
│   ├── main.blade.php (master layout)
│   ├── header.blade.php
│   └── footer.blade.php
├── pages/
│   ├── Index.blade.php
│   ├── jewelry.blade.php
│   └── search.blade.php
├── auth/
│   ├── signin.blade.php
│   ├── register.blade.php
│   └── profile/
│       ├── profile.blade.php
│       ├── edit-profile.blade.php
│       └── orders.blade.php
└── checkout/
    ├── cart.blade.php
    ├── address.blade.php
    └── payment.blade.php
```

#### Models
```
Models/
├── User.php
├── Products/
│   ├── Product.php
│   ├── Category.php
│   └── Subcategory.php
├── Orders/
│   ├── Order.php
│   └── OrderItem.php
├── Shopping/
│   ├── Cart.php
│   ├── CartItem.php
│   └── Wishlist.php
└── Blog.php
```

---

## Coding Standards

### PHP/Laravel

#### Model Best Practices
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    // ✅ Define fillable attributes (not $guarded for security)
    protected $fillable = ['name', 'description', 'price', 'category_id'];
    
    // ✅ Cast attributes to proper types
    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    // ✅ Define relationships with return type hints
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    // ✅ Add scope methods for common queries
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}
```

#### Controller Best Practices
```php
<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProductController extends Controller
{
    // ✅ Use type hints for parameters and returns
    public function index(): View
    {
        $products = Product::active()->paginate(15);
        return view('frontend.products.index', compact('products'));
    }

    public function show(int $id): View
    {
        $product = Product::findOrFail($id);
        return view('frontend.products.show', compact('product'));
    }

    public function store(Request $request): RedirectResponse
    {
        // ✅ Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        // ✅ Create model and redirect
        Product::create($validated);
        return redirect()->route('products.index')->with('success', 'Product created');
    }
}
```

#### Helper Functions
```php
<?php

// ✅ Document purpose clearly
if (!function_exists('format_price')) {
    /**
     * Format price to INR currency
     *
     * @param float $amount
     * @return string
     */
    function format_price($amount): string
    {
        return '₹' . number_format($amount, 2);
    }
}
```

### Blade Templates

#### Best Practices
```blade
{{-- ✅ Use descriptive variable names --}}
@foreach($products as $product)
    <div class="product-card">
        {{-- ✅ Use v-cloak or x-cloak if using JS frameworks --}}
        <h3>{{ $product->name }}</h3>
        
        {{-- ✅ Escape output by default --}}
        <p>{{ $product->description }}</p>
        
        {{-- ✅ Use route helpers instead of hardcoded URLs --}}
        <a href="{{ route('product.show', $product->id) }}">
            View Details
        </a>
        
        {{-- ✅ Use @auth/@guest for auth checks --}}
        @auth
            <form action="{{ route('wishlist.add') }}" method="POST">
                @csrf
                <button type="submit">Add to Wishlist</button>
            </form>
        @endauth
    </div>
@endforeach

{{-- ✅ Extract complex logic to controllers --}}
@if($cart->isEmpty())
    <p>Your cart is empty</p>
@else
    {{-- cart contents --}}
@endif
```

### CSS/SCSS

#### Theme Color Usage
```css
/* ✅ Use CSS variables instead of hardcoding colors */
.btn-primary {
    background-color: var(--primary-brand);
    color: var(--btn-primary-text);
    border-color: var(--primary-brand);
}

.card-header {
    background-color: var(--primary-brand);
    color: white;
}

.link-secondary {
    color: var(--secondary-accent);
}

/* ✅ Use semantic naming */
.alert-success {
    background-color: var(--status-success);
}

.alert-error {
    background-color: var(--status-error);
}
```

---

## Database Practices

### Migration Standards
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            // ✅ Use appropriate column types
            $table->id();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            
            // ✅ Add foreign keys with proper constraints
            $table->foreignId('category_id')
                  ->constrained('categories')
                  ->onDelete('cascade');
            
            // ✅ Add timestamps
            $table->timestamps();
            
            // ✅ Add indexes for searchable columns
            $table->index('category_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### Query Optimization
```php
// ❌ AVOID: N+1 queries
foreach ($users as $user) {
    echo $user->orders->count(); // Database query for each user!
}

// ✅ GOOD: Use eager loading
$users = User::with('orders')->get();
foreach ($users as $user) {
    echo $user->orders->count(); // No additional queries
}

// ✅ GOOD: Use select for specific columns
$products = Product::select('id', 'name', 'price')
    ->where('category_id', $categoryId)
    ->get();
```

---

## Authentication & Security

### Protected Routes
```php
// ✅ Use middleware for protection
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('user.profile');
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
});

// ✅ Use middleware for role-based access
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});
```

### Input Validation
```php
// ✅ Always validate user input
$validated = $request->validate([
    'email' => 'required|email|unique:users',
    'password' => 'required|min:8|confirmed',
    'name' => 'required|string|max:255',
    'address' => 'nullable|string|max:500',
]);

// ✅ Use Form Request classes for complex validation
namespace App\Http\Requests;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:products',
            'price' => 'required|numeric|min:0',
        ];
    }
}
```

---

## Testing Guidelines

### Feature Tests
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_product()
    {
        $product = Product::factory()->create();
        
        $response = $this->get(route('product.show', $product));
        
        $response->assertStatus(200);
        $response->assertSee($product->name);
    }

    public function test_user_can_add_to_cart()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        
        $response = $this->actingAs($user)
            ->post(route('cart.add'), ['product_id' => $product->id]);
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
        ]);
    }
}
```

---

## Common Patterns

### Service Classes (for complex logic)
```php
<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Cart;

class OrderService
{
    public function createOrderFromCart(Cart $cart): Order
    {
        $order = Order::create([
            'user_id' => $cart->user_id,
            'total' => $cart->getTotal(),
        ]);

        foreach ($cart->items as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);
        }

        $cart->clear();
        return $order;
    }
}
```

### Middleware for custom logic
```php
<?php

namespace App\Http\Middleware;

use Closure;

class LogUserActivity
{
    public function handle($request, Closure $next)
    {
        // Logic before request
        auth()->user()?->recordActivity($request->path());
        
        $response = $next($request);
        
        // Logic after response
        return $response;
    }
}
```

---

## Performance Optimization

### Caching
```php
// ✅ Cache frequently accessed data
public function getPopularProducts()
{
    return Cache::remember('popular_products', 3600, function () {
        return Product::where('sales', '>', 100)
            ->orderBy('sales', 'desc')
            ->take(10)
            ->get();
    });
}
```

### Pagination
```php
// ✅ Always paginate large result sets
public function index()
{
    $products = Product::paginate(15); // 15 per page
    return view('products.index', compact('products'));
}
```

---

## Git Workflow

### Commit Messages
```
✅ GOOD:
- "feat: add product search functionality"
- "fix: resolve cart total calculation bug"
- "refactor: reorganize authentication controllers"
- "docs: update installation guide"

❌ AVOID:
- "fixed stuff"
- "update"
- "test"
```

### Branch Naming
```
feature/product-search
fix/cart-bug
refactor/auth-structure
docs/setup-guide
```

---

## Useful Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Blade Template Syntax](https://laravel.com/docs/blade)
- [Eloquent ORM](https://laravel.com/docs/eloquent)
- [Form Validation](https://laravel.com/docs/validation)
- [Testing](https://laravel.com/docs/testing)

---

*Last Updated: November 19, 2025*
