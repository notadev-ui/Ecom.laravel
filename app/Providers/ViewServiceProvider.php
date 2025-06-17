<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\DB;

class ViewServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Share $categories with all views
        View::composer('*', function ($view) {
            $categories = DB::table('category')->get();
            $view->with('categories', $categories);
        });
    }

    public function register()
    {
        //
    }
}