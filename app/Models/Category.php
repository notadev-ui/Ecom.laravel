<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'categoryId';


    public function subcategories()
    {
    return $this->hasMany(SubCategory::class, 'categoryId', 'categoryId');
   }

}