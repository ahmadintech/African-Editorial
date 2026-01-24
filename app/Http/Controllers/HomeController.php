<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page with dynamic content.
     */
    public function index(): Response
    {
        // 1. Hero Stories (Latest 3 important stories)
        // For now, simply latest 3 published. In future, could use 'is_featured' flag.
        $heroStories = Post::published()
            ->with(['author', 'category', 'featuredImage'])
            ->latest()
            ->take(3)
            ->get()
            ->append(['featured_image_url']);

        $heroIds = $heroStories->pluck('id');

        // 2. Top Stories (Next 6 latest, excluding hero)
        $topStories = Post::published()
            ->with(['author', 'category', 'featuredImage'])
            ->whereNotIn('id', $heroIds)
            ->latest()
            ->take(6)
            ->get()
            ->append(['featured_image_url']);
            
        $excludeIds = $heroIds->merge($topStories->pluck('id'));

        // Helper function for category sections
        $getCategoryPosts = function ($categorySlugs, $limit = 3) use ($excludeIds) {
            $slugs = is_array($categorySlugs) ? $categorySlugs : [$categorySlugs];
            return Post::published()
                ->with(['author', 'category', 'featuredImage'])
                ->whereHas('category', function ($query) use ($slugs) {
                    $query->whereIn('slug', $slugs);
                })
                //->whereNotIn('id', $excludeIds) // Optional: avoid duplicates across page?
                ->latest()
                ->take($limit)
                ->get()
                ->append(['featured_image_url']);
        };

        return Inertia::render('Home', [
            'heroStories' => $heroStories,
            'topStories' => $topStories,
            'editorsPicks' => $getCategoryPosts(['features', 'culture', 'development'], 3),
            'investigativeReports' => $getCategoryPosts(['investigations', 'environment', 'features'], 3),
            'africaWorld' => $getCategoryPosts(['africa', 'world'], 3),
            'opinionPieces' => $getCategoryPosts('opinion', 3),
            'businessEconomy' => $getCategoryPosts(['business', 'economy'], 3),
            'dataReports' => $getCategoryPosts('data-reports', 3),
            'recentNews' => Post::published()
                ->with(['category', 'featuredImage'])
                ->latest()
                ->take(5)
                ->get()
                ->append(['featured_image_url']),
        ]);
    }
}
