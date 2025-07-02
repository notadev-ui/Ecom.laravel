<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Product;
use App\Models\Wishlist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;

class WishlistController extends Controller
{
    /**
     * Display the wishlist page
     */
    public function index()
    {
        $wishlistItems = [];

        if (Auth::check()) {
            $userId = Auth::id();
            $wishlistItems = Wishlist::with('product')->where('user_id', $userId)->get();
        } else {
            $wishlist = Session::get('wishlist', []);
            $products = Product::whereIn('productId', $wishlist)->get();

            $wishlistItems = $products->map(function ($product) {
                return (object)['product' => $product];
            });
        }

        return view('frontend.wishlist', compact('wishlistItems'));
    }

    /**
     * Add a product to the wishlist
     */
    public function add(Request $request)
    {
        $productId = $request->input('product_id');

        if (!$productId || !Product::where('productId', $productId)->exists()) {
            return redirect()->back()->with('error', 'Invalid product!');
        }

        if (Auth::check()) {
            $userId = Auth::id();

            $alreadyExists = Wishlist::where('user_id', $userId)
                ->where('product_id', $productId)
                ->exists();

            if ($alreadyExists) {
                return redirect()->back()->with('error', 'Product is already in wishlist');
            }

            Wishlist::create([
                'user_id' => $userId,
                'product_id' => $productId,
            ]);

            return redirect()->back()->with('success', 'Product added to wishlist successfully!');
        } else {
            // Guest user: store wishlist in session
            $wishlist = Session::get('wishlist', []);

            if (in_array($productId, $wishlist)) {
                return redirect()->back()->with('error', 'Product is already in wishlist');
            }

            $wishlist[] = $productId;
            Session::put('wishlist', $wishlist);

            return redirect()->route('user.login')->with('error', 'Please log in to save your wishlist');
        }
    }

    /**
     * Remove product from wishlist
     */
    public function remove($productId)
    {
        if (Auth::check()) {
            $userId = Auth::id();
            Wishlist::where('user_id', $userId)->where('product_id', $productId)->delete();
        } else {
            $wishlist = Session::get('wishlist', []);
            $key = array_search($productId, $wishlist);
            if ($key !== false) {
                unset($wishlist[$key]);
                Session::put('wishlist', $wishlist);
            }
        }

        return redirect()->route('wishlist.index')->with('success', 'Item removed from wishlist');
    }
}
