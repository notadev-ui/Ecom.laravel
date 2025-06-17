<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
     protected $fillable = [
        'user_id', 'razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature', 'amount', 'status'
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
