<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LatestNewsController extends Controller
{
    /**
     * Display a listing of latest published posts.
     */
    public function index(): Response
    {
        $posts = Post::published()
            ->with(['author', 'category', 'featuredImage'])
            ->latest()
            ->paginate(12)
            ->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'summary' => $post->excerpt,
                    'category' => $post->category->name ?? 'News',
                    'category_slug' => $post->category->slug ?? 'news',
                    'author' => $post->author->name,
                    'date' => $post->published_at->format('M d, Y'),
                    'image' => $post->featured_image_url,
                    'readTime' => $post->read_time,
                    'slug' => $post->slug,
                ];
            });

        return Inertia::render('LatestNews', [
            'posts' => $posts,
        ]);
    }
}
