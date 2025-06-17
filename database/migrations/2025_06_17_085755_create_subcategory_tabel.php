<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subcategory', function (Blueprint $table) {
        $table->id('subcategoryId');
        $table->string('subcategoryName');
        $table->unsignedBigInteger('categoryId');
        $table->text('description')->nullable();
        $table->timestamps();

    // Composite unique index to allow duplicate names across categories, but not in the same category
        $table->unique(['subcategoryName', 'categoryId']);

    // Foreign key constraint
       $table->foreign('categoryId')->references('categoryId')->on('category')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcategory');
    }
};
