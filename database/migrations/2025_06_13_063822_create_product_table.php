<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->bigIncrements('productId');
            $table->unsignedBigInteger('categoryId')->nullable();
            $table->unsignedBigInteger('subcategoryId')->nullable();
            $table->string('productName');
            $table->decimal('productPrice', 10, 2)->nullable();
            $table->decimal('productSalePrice', 10, 2)->nullable();
            $table->text('productDescription')->nullable();
            $table->float('productRating')->nullable();
            $table->string('productType')->nullable();
            $table->string('image')->nullable();
            $table->timestamp('createdAt')->nullable();
            $table->timestamp('updatedAt')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product');
    }
}