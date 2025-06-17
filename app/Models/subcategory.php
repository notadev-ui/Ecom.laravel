<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $table = 'subcategory'; // not 'subcategories', match your actual table name

    protected $fillable = [
        'subcategoryName',
        'categoryId',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'categoryId');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'subcategoryId', 'subcategoryId');
    }
}
