<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use App\Models\Subcategory;


class AdminController extends Controller
{
    public function index()
    {
        return view("frontend.admin.index");
    }

    public function home()
    {
        $products = DB::table('product')
            ->orderBy('createdAt', 'desc')
            ->take(4)
            ->get();

        $products->each(function ($product) {
            $images = explode('|', $product->image);
            $product->firstImage = $images[0] ?? '';
        });

        return view("frontend.Index", compact('products'));
    }

    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $user = DB::table('admin')->where('adminUsername', $username)->first();

        if ($user && Hash::check($password, $user->adminPassword)) {
            session(['adminUsername' => $user->adminUsername]);
            $categories = DB::table('category')->get();
            return Redirect::route('admin.dashboard', compact('categories'));
        }

        return redirect()->back()->with('error', 'Invalid username or password');
    }

    public function admin_dashboard()
    {
        $products = DB::table('product')->get();

        $products->each(function ($product) {
            $images = explode('|', $product->image);
            $product->firstImage = $images[0] ?? '';
        });

        return view('frontend.admin.showproduct', compact('products'));
    }

    public function adminDashBoard()
    {
        return view("frontend.admin.product");
    }

    public function viewCategory()
    {
        return view("frontend.admin.category");
    }

    public function showCategory()
    {
        return view("frontend.admin.category");
    }

    public function addCategory(Request $request)
    {
        $categoryName = $request->input('categoryName');
        $inserted = DB::table('category')->insert([
            'categoryName' => $categoryName
        ]);

        if ($inserted) {
            return redirect()->back()->with(['success' => 'Category added successfully']);
        } else {
            return redirect()->back()->with(['error' => "Category Not Added Successfully"]);
        }
    }

    public function viewsubcategory()
    {
        $categories = DB::table('category')->get();
        return view('frontend.admin.addsubcategory', compact('categories'));
    }

    public function addsubcategory(Request $request)
    {
        $categoryId = $request->input('categoryId');
        $subcategoryName = $request->input('subcategoryName');
        $inserted = DB::table('subcategory')->insert([
            'categoryId' => $categoryId,
            'subcategoryName' => $subcategoryName,
        ]);

        if ($inserted) {
            return redirect()->back()->with('message', "Sub Category Added Successfully");
        } else {
            return redirect()->back()->with('message', "Category Not Added Successfully");
        }
    }

    public function viewproduct()
    {
        $categories = DB::table('category')->get();
        $subcategories = Subcategory::all();
        return view('frontend.admin.addProduct', compact('categories', 'subcategories'));
    }

    public function addproduct(Request $request)
    {
        DB::beginTransaction();

        try {
            $images = [];
            if ($files = $request->file('image')) {
                foreach ($files as $file) {
                    $name = $file->getClientOriginalName();
                    $file->move('image', $name);
                    $images[] = $name;
                }
            }

            DB::table('product')->insert([
                'categoryId' => $request->input('categoryId'),
                'subcategoryId' => $request->input('subcategoryId'),
                'productName' => $request->input('productName'),
                'productPrice' => $request->input('productPrice'),
                'productSalePrice' => $request->input('productSalePrice'),
                'productDescription' => $request->input('productDescription'),
                'productRating' => $request->input('productRating'),
                'productType' => $request->input('productType'),
                'image' => implode("|", $images),
            ]);

            DB::commit();
            return redirect('admin/showProduct')->with(['success' => 'Product added successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', $e->getMessage());
        }
    }

    public function showProduct()
    {
        $products = DB::table('product')->get();

        $products->each(function ($product) {
            $images = explode('|', $product->image);
            $product->firstImage = $images[0] ?? '';
        });

        return view('frontend.admin.showproduct', compact('products'));
    }

    public function deleteProduct($id)
    {
        $affectedRows = DB::table('product')->where('productId', $id)->delete();

        if ($affectedRows > 0) {
            return redirect()->route('admin.showProduct')->with('success', 'Product deleted successfully.');
        } else {
            return redirect()->route('admin.showProduct')->with('error', 'Product not found or deletion failed.');
        }
    }

    public function updateShowProduct($id)
    {
        $productData = DB::table('product')
            ->join('category', 'product.categoryId', '=', 'category.categoryId')
            ->select('product.*', 'category.categoryName', 'category.categoryId')
            ->where('product.productId', $id)
            ->first();

        if (!$productData) {
            abort(404, 'Product not found');
        }

        $categories = DB::table('category')->get();
        return view('frontend.admin.updateProduct', compact('productData', 'categories'));
    }

    public function updateProduct(Request $request)
    {
        $id = $request->input('productId');

        // Handle image deletion
        if ($request->has('deleteImages')) {
            foreach ($request->deleteImages as $imageToDelete) {
                $imagePath = public_path('image/' . $imageToDelete);

                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }

                $productData = DB::table('product')->where('productId', $id)->first();
                $images = explode('|', $productData->image);
                $updatedImages = array_diff($images, [$imageToDelete]);
                DB::table('product')->where('productId', $id)->update(['image' => implode('|', $updatedImages)]);
            }
        }

        // Handle image upload
        if ($request->hasFile('newImages')) {
            $newImages = $request->file('newImages');
            $imagesToAdd = [];

            foreach ($newImages as $newImage) {
                $imageName = time() . '_' . $newImage->getClientOriginalName();
                $newImage->move(public_path('image'), $imageName);
                $imagesToAdd[] = $imageName;
            }

            if (!empty($imagesToAdd)) {
                $productData = DB::table('product')->where('productId', $id)->first();
                $images = explode('|', $productData->image);
                $images = array_merge($images, $imagesToAdd);
                $images = array_filter($images, function ($value) {
                    return $value !== "";
                });
                DB::table('product')->where('productId', $id)->update(['image' => implode('|', $images)]);
            }
        }

        DB::table('product')->where('productId', $id)->update([
            'categoryId' => $request->input('categoryId'),
            'subcategoryId' => $request->input('subcategoryId'),
            'productName' => $request->productName,
            'productPrice' => $request->productPrice,
            'productSalePrice' => $request->productSalePrice,
            'productDescription' => $request->productDescription,
            'productRating' => $request->productRating,
        ]);

        return redirect()->route('admin.updateShowProduct', ['id' => $id])->with(['success' => 'Product updated successfully']);
    }

    public function getCategories()
    {
        $categories = DB::table('category')->get();
        return response()->json($categories);
    }


    public function getSubcategories($categoryId)
    {
        $subcategories = \App\Models\Subcategory::where('categoryId', $categoryId)->get();
        return response()->json($subcategories);
    }


    public function allcategory()
    {
        $category = DB::table('category')->get();
        return view('frontend.admin.showAllCategory', compact('category'));
    }

    public function deleteCategory($id)
    {
        $affectedRows = DB::table('category')->where('categoryId', $id)->delete();
        if ($affectedRows > 0) {
            return redirect()->route('admin.allcategory')->with(['success' => 'Category deleted successfully.']);
        } else {
            return redirect()->route('admin.allcategory')->with('message', 'Category not found or deletion failed.');
        }
    }

    public function updateShowCategory($id)
    {
        $category = DB::table('category')->where('categoryId', $id)->first();

        if ($category) {
            return view('frontend.admin.updateCategory', compact('category'));
        } else {
            return redirect()->route('admin.categoryNotFound');
        }
    }

    public function updateCategory(Request $request)
    {
        $id = $request->input('categoryId');
        $categoryName = $request->input('categoryName');
        DB::table('category')->where('categoryId', $id)->update([
            'categoryName' => $categoryName,
        ]);
        return redirect()->route('admin.allcategory')->with('message', 'Category Updated Successfully');
    }

    public function showSubCategory()
    {
         $subcategory = Subcategory::with('category')->get(); // Eager load category
        return view('frontend.admin.showAllSubCategory', compact('subcategory'));
    }

public function deleteSubCategory($id)
{
    $deleted = Subcategory::where('subcategoryId', $id)->delete();

    if ($deleted) {
        return redirect()->route('admin.showAllSubCategory')->with('message', 'Sub Category deleted successfully.');
    } else {
        return redirect()->route('admin.showAllSubCategory')->with('message', 'Sub Category not found or deletion failed.');
    }
}

public function updateShowSubCategory($id)
{
    $Data = Subcategory::with('category')->find($id);

    if (!$Data) {
        abort(404, 'Sub Category not found');
    }

    $categories = Category::all();

    return view('frontend.admin.updateShowSubCategory', compact('Data', 'categories'));
}

public function updateSubCategory(Request $request)
{
    $request->validate([
        'subcategoryName' => 'required|string|max:255',
        'subcategoryId' => 'required|exists:subcategory,subcategoryId',
        'categoryId' => 'required|exists:category,categoryId',
    ]);

    Subcategory::where('subcategoryId', $request->subcategoryId)->update([
        'subcategoryName' => $request->subcategoryName,
        'categoryId' => $request->categoryId,
    ]);

    return redirect()->route('admin.showAllSubCategory')->with('message', 'Sub Category updated successfully');
    }
    public function viewBlog()
    {
        $blogs = Blog::all();
        return view('frontend.admin.showBlog', compact('blogs'));
    }

    public function addBlog()
    {
        return view('frontend.admin.addBlog');
    }

    public function storeBlog(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'title_url' => 'required',
            'meta_title' => 'required|max:5000',
            'meta_desc' => 'required',
            'description' => 'required',
            'body' => 'required',
            'img_url' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'post_code' => 'nullable|max:10',
            'category' => 'nullable|max:255',
            'auth_name' => 'nullable|max:255',
        ]);

        if ($request->hasFile('img_url')) {
            $imageName = time() . '.' . $request->img_url->extension();
            $request->img_url->move(public_path('images'), $imageName);
            $validated['img_url'] = $imageName;
        }

        Blog::create($validated);

        return redirect()->route('admin.showBlog')->with(['success' => 'Blog added  successfully']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}
// This code is part of the AdminController class, which handles various admin functionalities such as managing products, categories, subcategories, and blogs in a Laravel application. It includes methods for adding, updating, deleting, and displaying these entities, as well as handling file uploads and image management.