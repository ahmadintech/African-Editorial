<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Display search results.
     */
    public function index(Request $request): Response
    {
        $query = $request->input('q');

        $posts = Post::published()
            ->with(['author', 'category', 'featuredImage'])
            ->when($query, function ($q) use ($query) {
                $q->where(function ($inner) use ($query) {
                    $inner->where('title', 'like', "%{$query}%")
                          ->orWhere('content', 'like', "%{$query}%")
                          ->orWhere('excerpt', 'like', "%{$query}%");
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'summary' => $post->excerpt,
                'date' => $post->published_at ? $post->published_at->format('M d, Y') : '',
                'author' => $post->author->name,
                'category' => $post->category->name ?? 'News',
                'image' => $post->featured_image_url,
                'readTime' => $post->read_time,
            ]);

        return Inertia::render('Search', [
            'posts' => $posts,
            'query' => $query,
        ]);
    }
}
