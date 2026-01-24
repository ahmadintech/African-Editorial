<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $stats = [
            [
                'name' => 'Total Articles',
                'value' => number_format(Post::count()),
                'change' => '+'. Post::where('created_at', '>=', now()->subDays(7))->count(),
                'trend' => 'up',
                'icon' => 'FileText'
            ],
            [
                'name' => 'Total Users',
                'value' => number_format(User::count()),
                'change' => '+'. User::where('created_at', '>=', now()->subDays(7))->count(),
                'trend' => 'up',
                'icon' => 'Users'
            ],
            [
                'name' => 'Categories',
                'value' => number_format(Category::count()),
                'change' => 'Active',
                'trend' => 'up',
                'icon' => 'Layout'
            ],
            [
                'name' => 'Tags',
                'value' => number_format(Tag::count()),
                'change' => 'Trending',
                'trend' => 'up',
                'icon' => 'TrendingUp'
            ],
        ];

        $recentActivities = Post::with(['author', 'category'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'author' => $post->author->name,
                    'title' => $post->title,
                    'category' => $post->category->name ?? 'News',
                    'time' => $post->created_at->diffForHumans(),
                    'slug' => $post->slug,
                ];
            });

        $popularTags = Tag::withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($tag) {
                return [
                    'name' => $tag->name,
                    'count' => $tag->posts_count,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'popularTags' => $popularTags,
        ]);
    }
}
