<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('wishlist', function (Blueprint $table) {
        $table->dropForeign(['user_id']);
    });

    // Repeat for other tables like 'carts' or 'orders' if they also have user_id foreign key
    Schema::table('carts', function (Blueprint $table) {
        $table->dropForeign(['user_id']);
    });

    // Add more tables here if needed...
}

public function down()
{
    // You can leave this empty or re-add the foreign keys if you want
}

};
