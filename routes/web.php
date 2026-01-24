<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/latest-news', [App\Http\Controllers\LatestNewsController::class, 'index'])->name('latest-news');

Route::get('/article/{slug}', [App\Http\Controllers\ArticleController::class, 'show'])->name('article.show');

Route::get('/tag/{slug}', function ($slug) {
    return Inertia::render('Tag', ['slug' => $slug]);
});

Route::get('/category/{slug}', [App\Http\Controllers\CategoryController::class, 'show'])->name('category.show');
Route::get('/search', [App\Http\Controllers\SearchController::class, 'index'])->name('search');

Route::get('/careers', function () {
    return Inertia::render('About'); // Placeholder
});

Route::get('/privacy', function () {
    return Inertia::render('About'); // Placeholder
});

Route::get('/terms', function () {
    return Inertia::render('About'); // Placeholder
});

Route::get('/editorial', function () {
    return Inertia::render('About'); // Placeholder
});

// Auth Routes
Route::get('/login', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Admin Routes - Protected by authentication
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/pages', function () {
        return Inertia::render('Admin/Pages/Index');
    })->name('admin.pages.index');

    Route::get('/pages/create', function () {
        return Inertia::render('Admin/Pages/Create');
    })->name('admin.pages.create');

    // Posts Management - Using Controller
    Route::get('/posts', [App\Http\Controllers\Admin\PostController::class, 'index'])->name('admin.posts.index');
    Route::get('/posts/create', [App\Http\Controllers\Admin\PostController::class, 'create'])->name('admin.posts.create');
    Route::post('/posts', [App\Http\Controllers\Admin\PostController::class, 'store'])->name('admin.posts.store');
    Route::get('/posts/{post}/edit', [App\Http\Controllers\Admin\PostController::class, 'edit'])->name('admin.posts.edit');
    Route::put('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'update'])->name('admin.posts.update');
    Route::post('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'update']); // For file upload with method spoofing
    Route::delete('/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'destroy'])->name('admin.posts.destroy');

    Route::get('/profile', function () {
        return Inertia::render('Admin/Profile');
    })->name('admin.profile');

    Route::get('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('admin.settings.update');

    // Categories Management
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class)->names([
        'index' => 'admin.categories.index',
        'create' => 'admin.categories.create',
        'store' => 'admin.categories.store',
        'show' => 'admin.categories.show',
        'edit' => 'admin.categories.edit',
        'update' => 'admin.categories.update',
        'destroy' => 'admin.categories.destroy',
    ]);
});


