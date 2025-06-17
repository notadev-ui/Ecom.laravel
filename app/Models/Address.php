<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    
      protected $fillable = [
        'user_id',
        'fname',
        'lname',
        'pincode',
        'flat',
        'area',
        'landmark',
        'town_city',
        'state',
        'number'
    ];
    
     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
