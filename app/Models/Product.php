<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product'; // Ensure this matches your actual table name
    protected $primaryKey = 'productId';

    public $timestamps = true; // Assuming you want to use createdAt and updatedAt columns

    protected $fillable = [
        'categoryId',
        'SubCategoryId',
        'productName',
        'productPrice',
        'productSalePrice',
        'productDescription',
        'productRating',
        'productType',
        'image',
    ];

    protected $dates = ['createdAt', 'updatedAt']; // Ensures createdAt and updatedAt are treated as dates
    
//     public function images()
// {
//     return $this->hasMany(ProductImage::class);
// }
}
