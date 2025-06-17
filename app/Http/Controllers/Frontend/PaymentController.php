<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Razorpay\Api\Api;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;

class PaymentController extends Controller
{
   

 public function processPayment(Request $request)
    {
        // Retrieve the input from the request
        $input = $request->all();
        // dd($input);
        // Initialize the Razorpay API with your credentials
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        
        $order_details = $api->order->fetch($input['razorpay_order_id']);
        // dd($order_details['notes']['address_id']);
        // Verify the payment signature
        try {
            $attributes = [
                'razorpay_order_id' => $input['razorpay_order_id'],
                'razorpay_payment_id' => $input['razorpay_payment_id'],
                'razorpay_signature' => $input['razorpay_signature']
            ];

            $api->utility->verifyPaymentSignature($attributes);
            // Check if an order exists for the given razorpay_order_id
            $order = Order::where('razorpay_order_id', $input['razorpay_order_id'])->first();
    
            // If no order exists, create a new one
            if (!$order) {
                $order = new Order();
                $order->razorpay_order_id = $input['razorpay_order_id'];
                $order->user_id = auth()->id(); // Assuming you have authenticated users
            }
    
            $order->razorpay_payment_id = $input['razorpay_payment_id'];
            $order->razorpay_signature = $input['razorpay_signature'];
            $order->status = 'paid';
            $order->amount = $order_details['amount'];
            $order->address_id = $order_details['notes']['address_id'];
            $order->save();
    
            // Perform other actions as needed, like updating the user's cart or sending confirmation emails
    
            return redirect()->route('payment.success');
        } catch (\Exception $e) {
            // dd($e);
            // Payment verification failed
            Log::error('Payment verification failed: ' . $e->getMessage());
            return redirect()->route('payment.failed')->with('error', $e->getMessage());
        }
    }
}
