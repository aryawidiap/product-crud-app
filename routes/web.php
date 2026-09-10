<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // Route::inertia('list', 'product/list')->name('product.list');   
    Route::resource('products', ProductController::class);
});

require __DIR__.'/settings.php';
