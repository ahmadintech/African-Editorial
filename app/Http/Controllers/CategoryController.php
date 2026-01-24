<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of posts for a specific category.
     */
    public function show(string $slug): Response
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $posts = Post::published()
            ->where('category_id', $category->id)
            ->with(['author', 'featuredImage'])
            ->latest()
            ->paginate(12)
            ->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'summary' => $post->excerpt,
                    'category' => $post->category->name,
                    'category_slug' => $post->category->slug,
                    'author' => $post->author->name,
                    'date' => $post->published_at->format('M d, Y'),
                    'image' => $post->featured_image_url,
                    'readTime' => $post->read_time,
                    'slug' => $post->slug,
                ];
            });

        return Inertia::render('Category', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }
}
