<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Cart;
use Illuminate\Support\Facades\Session;
use App\Models\User;
class SigninController extends Controller
{
    public function index(){
        return view('frontend.signin');
    }
    public function register(){
        return view('frontend.register');
    }
   
     public function handleRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        // Store user data in session
        session(['user' => $user]);

        return redirect()->route('user.profile')->with('success', 'Registration successful!');
    }

    // Handle login
    // public function handleLogin(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //     ]);

    //     if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    //         $request->session()->regenerate();
            
    //          // Store user data in session
    //         $user = Auth::user();
    //         session(['user' => $user]);

    //         return redirect()->intended('/')->with('success', 'Login successful!');
    //     }

    //      return back()->withErrors([
    //         'email' => 'The provided credentials do not match our records.',
    //     ])->onlyInput('email');
    // }
    
public function handleLogin(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $request->session()->regenerate();

        // Store user data in session
        $user = Auth::user();
        session(['user' => $user]);

        // Check if there are any items in the session cart
        $cart = Session::get('cart', []);
        // Retrieve cart details from the database
        $existingCart = Cart::where('user_id', $user->id)->get()->keyBy('product_id');
        // Merge the session cart with the existing cart
        foreach ($cart as $item) {
            if (isset($existingCart[$item['product_id']])) {
                // If the product already exists in the existing cart, delete it
                $existingCart[$item['product_id']]->delete();
            }

            // Create a new Cart instance and set the product_id
            $cartItem = new Cart([
                'user_id' => $user->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity']
            ]);

            // Add the new cart item to the existing cart
            $existingCart[$item['product_id']] = $cartItem;
        }
// dd($existingCart);
        // Save the merged cart items to the database
        if (!empty($existingCart)) {
            foreach ($existingCart as $cartItem) {
                $cartItem->save();
            }
        }

        // Clear the session cart
        Session::forget('cart');

        return redirect()->route('user.profile')->with('success', 'Login successful!');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ])->onlyInput('email');
}





      public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('success', 'Logout successful!');
    }
}
