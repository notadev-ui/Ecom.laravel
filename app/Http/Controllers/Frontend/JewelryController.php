<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Wishlist;

class JewelryController extends Controller
{
    // Helper to get all categories
    private function getCategories()
    {
        return DB::table('category')->get();
    }

    public function index()
    {
        $user_id = auth()->user() ? auth()->user()->id : null;

        $products = DB::table('product')->get();
        $wishlistItems = $user_id ? Wishlist::where('user_id', $user_id)->pluck('product_id')->toArray() : [];

        $products->each(function ($product) use ($wishlistItems) {
            $images = explode('|', $product->image);
            $product->images = $images;
            $product->inWishlist = in_array($product->productId, $wishlistItems);
        });

        $categories = $this->getCategories();

        return view('frontend.jewelry', compact('products', 'categories'));
    }

    public function earings()
    {
        $categories = $this->getCategories();
        return view('frontend.jewelry', compact('categories'));
    }

    public function showByCategory($id)
    {
        $products = Product::where('categoryId', $id)->get();
        $products->each(function ($product) {
            $images = explode('|', $product->image);
            $product->images = $images ?? [];
            $product->firstImage = $images[0] ?? '';
        });

        $categories = $this->getCategories();

        return view('frontend.jewelry', compact('products', 'categories'));
    }

    public function show($productId)
    {
        try {
            $product = Product::where('productId', $productId)->firstOrFail();
            $images = explode('|', $product->image);
            $product->images = $images ?? [];

            $categories = $this->getCategories();

            return view('frontend.view_product', compact('product', 'categories'));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            abort(404);
        }
    }
}