<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Address;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the user's profile page.
     */
    public function show()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        $addresses = Address::where('user_id', $user->id)->get();

        return view('frontend.profile', compact('user', 'orders', 'addresses'));
    }

    /**
     * Show the user's orders.
     */
    public function orders()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10);

        return view('frontend.orders', compact('orders'));
    }

    /**
     * Show edit profile page.
     */
    public function edit()
    {
        $user = Auth::user();
        return view('frontend.edit-profile', compact('user'));
    }

    /**
     * Update user profile.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->route('user.profile')->with('success', 'Profile updated successfully!');
    }
}
