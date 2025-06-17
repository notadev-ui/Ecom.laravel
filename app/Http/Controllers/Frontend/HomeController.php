<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {   
        
        return view('frontend.Index');
        
    }
    
    
  public function search(Request $request)
    {
        // $query = $request->input('query');

  $query = $request->input('query');

        // Search products by name or description
        $products = DB::table('product')
            ->where('productName', 'LIKE', "%$query%")
            ->orWhere('productDescription', 'LIKE', "%$query%")
            ->orderBy('createdAt', 'desc')
            ->take(4)
            ->get();
    

        // Process images
        $products->each(function ($product) {
            $images = explode('|', $product->image);
            $product->firstImage = $images[0] ?? ''; // Get the first image, or an empty string if there are no images
        });

        return view('frontend.search', compact('products', 'query'));
    }


//  public function search(Request $request)
//     {
//         $searchTerm = $request->input('query');

//         // Perform search logic, e.g., querying products
//         $products = Product::where('productName', 'like', "%$searchTerm%")
//                           ->orWhere('productDescription', 'like', "%$searchTerm%")
//                           ->get();

//         return response()->json(['products' => $products]);
//     }
}


