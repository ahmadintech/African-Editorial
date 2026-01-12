<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/latest-news', function () {
    return Inertia::render('LatestNews');
});

Route::get('/article/{id}', function ($id) {
    return Inertia::render('Article', ['id' => $id]);
});

Route::get('/tag/{slug}', function ($slug) {
    return Inertia::render('Tag', ['slug' => $slug]);
});

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

// Admin Routes (Currently no middleware for preview, add 'auth' in production)
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/pages', function () {
        return Inertia::render('Admin/Pages/Index');
    })->name('admin.pages.index');

    Route::get('/pages/create', function () {
        return Inertia::render('Admin/Pages/Create');
    })->name('admin.pages.create');

    Route::get('/profile', function () {
        return Inertia::render('Admin/Profile');
    })->name('admin.profile');

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
});

