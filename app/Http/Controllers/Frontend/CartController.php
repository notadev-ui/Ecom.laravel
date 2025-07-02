<?php

namespace App\Http\Controllers\Frontend;
use App\Models\Product; // Import the Blog model
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth; // Make sure this line is present
use App\Models\Cart; // Ensure this line is present
use App\Models\User;
use App\Models\Address;
use Razorpay\Api\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    
public function index()
{
    // Check if there is any cart data in the session
    $cart = Session::get('cart', []);
    $amount = 0;
    $order = null; // Initialize $order variable
    $addresses = Auth::user()->addresses ?? collect();

    if (Auth::check()) {
        $userId = Auth::id();

        // Retrieve cart details from the database
        $cartItems = Cart::where('user_id', $userId)->get();

        // Merge the database cart items with existing session cart data
        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);
            // dd($product);

            if ($product) {
                $cart[$item->product_id] = [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'product_id' => $item->product_id,
                    'user_id' => $item->user_id,
                    'name' => $product->productName,
                    'price' => $product->productPrice,
                    'saleprice' => $product->productSalePrice ?? 0, // Use null coalescing operator
                    'image' => $product->image ?? '', // Ensure image is set or default to empty string
                ];
            }
        }

        // Update the session with the merged cart data
        // Session::put('cart', $cart);

        // $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        // $amount = $this->getOrderAmount($userId); // Implement this method to get the actual order amount

        // if ($amount == 0) {
        //     $amount = 100;
        // }

        // $order = $api->order->create([
        //     'receipt' => 'order_' . $userId . '_' . time(),
        //     'amount' => $amount, // amount in paisa
        //     'currency' => 'INR'
        // ]);
    }

    return view('frontend.cart', compact('addresses', 'cart', 'order', 'amount'));
}

    
    
 public function add(Request $request)
{
    $productId = $request->input('product_id');
    $product = Product::find($productId);

    if (!$product) {
        return redirect()->back()->with('error', 'Product not found!');
    }

    if (Auth::check()) {
        $userId = Auth::id();
        $cartItem = Cart::where('user_id', $userId)->where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            $cartItem = new Cart();
            $cartItem->user_id = $userId;
            $cartItem->product_id = $productId;
            $cartItem->quantity = 1;
            $cartItem->save();
        }

        return redirect()->route('cart.index')->with('success', 'Product added to cart successfully!');
    } else {
        $cart = Session::get('cart', []);
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += 1;
        } else {
            $cart[$productId] = [
                'id' => uniqid(), // Generate a unique ID for the session cart item
                'product_id' => $productId,
                'quantity' => 1,
                'name' => $product->productName,
                'price' => $product->productPrice,
                'image' => $product->image ?? '',
            ];
        }
        Session::put('cart', $cart);

        return redirect()->route('cart.index')->with('success', 'Product added to cart successfully!');
    }
}


public function update(Request $request, $productId)
{
    $action = $request->input('action');

    if (Auth::check()) {
        $cartItem = Cart::where('product_id', $productId)->where('user_id', Auth::id())->first();

        if ($cartItem) {
            if ($action === 'increase') {
                $cartItem->quantity++;
            } elseif ($action === 'decrease' && $cartItem->quantity > 1) {
                $cartItem->quantity--;
            }

            $cartItem->save();
        }

        $cart = Session::get('cart', []);
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $cartItem->quantity;
            Session::put('cart', $cart);
        }
    } else {
        $cart = Session::get('cart', []);
        if (isset($cart[$productId])) {
            if ($action === 'increase') {
                $cart[$productId]['quantity']++;
            } elseif ($action === 'decrease' && $cart[$productId]['quantity'] > 1) {
                $cart[$productId]['quantity']--;
            }
            Session::put('cart', $cart);
        }
    }

    return redirect()->route('cart.index')->with('success', 'Cart updated successfully');
}



public function destroy($productId)
{
    if (Auth::check()) {
        $user = Auth::user();
        $user->carts()->where('product_id', $productId)->delete();
    } else {
        $cart = Session::get('cart', []);
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put('cart', $cart);
        }
    }

    // Fetch the updated cart data
    $cart = Auth::check() ? Auth::user()->carts()->get() : Session::get('cart', []);

    return redirect()->route('cart.index')->with(['success' => 'Product removed from cart', 'cart' => $cart]);
}


 public function showAddressForm(Request $request)
{
    // Check if there is any cart data in the session
    $cart = Session::get('cart', []);
    $amount = 0;
    $order = null; // Initialize $order variable

    if (Auth::check()) {
        $userId = Auth::id();

        // Retrieve cart details from the database
        $cartItems = Cart::where('user_id', $userId)->get();

        // Merge the database cart items with existing session cart data
        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);
            if ($product) {
                $cart[$item->product_id] = [
                    'id' => $item->id, // Include the cart item ID here
                    'quantity' => $item->quantity,
                    'product_id' => $item->product_id,
                    'user_id' => $item->user_id,
                    'name' => $product->productName,
                    'price' => $product->productPrice,
                    'image' => $product->image ?? '', // Ensure image is set or default to empty string
                ];
            }
        }

        // Update the session with the merged cart data
        Session::put('cart', $cart);

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        // Retrieve the actual amount from your application logic
        $amount = $this->getOrderAmount($userId); // Implement this method to get the actual order amount
        if ($amount == 0) {
            $amount = 100;
        }
        $order = $api->order->create([
            'receipt' => 'order_' . $userId . '_' . time(),
            'amount' => $amount, // amount in paisa
            // 'amount' => 101, // amount in paisa
            'currency' => 'INR',
            'notes' => [
                    'address_id' => $request->address_id
                ]
        ]);
    }

    return view('frontend.address', compact('order'));
}

   public function storeAddress(Request $request)
    {
        // Validate and store address details
     $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'Pincode' => 'required|string|max:10',
            'Flat' => 'required|string|max:255',
            'Area' => 'required|string|max:255',
            'Landmark' => 'nullable|string|max:255',
            'Town_city' => 'required|string|max:255',
            'State' => 'required|string|max:255',
            'number' => 'required|string|max:100',
        ]);

        $address = Address::create([
            'user_id' => Auth::id(),
            'fname' => $request->fname,
            'lname' => $request->lname,
            'pincode' => $request->Pincode,
            'flat' => $request->Flat,
            'area' => $request->Area,
            'landmark' => $request->Landmark,
            'town_city' => $request->Town_city,
            'state' => $request->State,
            'number' => $request->number,
        ]);

    return redirect()->route('checkout.address')->with('success', 'Address added successfully.');
    }

 public function showPaymentForm()
    {
        // Ensure the address is provided
        if (!session()->has('selected_address')) {
            return redirect()->route('checkout.address');
        }
 
    }

    public function selectAddress(Request $request)
    {
        // Store the selected address in the session
        $address = Auth::user()->addresses()->findOrFail($request->address_id);
    session(['selected_address' => $address]);

        // Redirect to the payment page
        return redirect()->route('checkout.payment');
    }







public function payment(Request $request)
{
   $order = null; // Initialize $order variable

    if ($request->user()) {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        $userId = Auth::id();
        // Retrieve the actual amount from your application logic
        $amount = $this->getOrderAmount($userId); // Implement this method to get the actual order amount

        $order = $api->order->create([
            'receipt' => 'order_' . $request->user()->id . '_' . time(),
            'amount' => $amount, // amount in paisa
            'currency' => 'INR'
        ]);

        // Debugging
        // dd($order); // Check the value of $order
    } else {
        // Handle the case where the user is not logged in
        // For example, you can redirect the user to the login page
        return redirect()->route('user.login');
    }

    return view('frontend.payment', ['order' => $order, 'amount' => $amount]);
}


    private function getOrderAmount($userId)
    {
        // Retrieve the cart items for the given user along with the product details
        $cartItems = Cart::with('product')->where('user_id', $userId)->get();
    
        $grandTotal = 0;
    
        foreach ($cartItems as $item) {
            $total = $item->product->productPrice * $item->quantity; // Assuming productPrice is the price field in products table
            $grandTotal += $total;
        }
        // Convert the total to paisa
        return $grandTotal * 100; // Assuming grandTotal is in rupees
        // return 101; // Assuming grandTotal is in rupees
    }

}
