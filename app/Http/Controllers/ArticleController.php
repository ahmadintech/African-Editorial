<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $slug): Response
    {
        $post = Post::published()
            ->where('slug', $slug)
            ->with(['author', 'category', 'tags', 'featuredImage'])
            ->firstOrFail();

        // Increment view count if we had that feature, ignoring for now

        return Inertia::render('Article', [
            'post' => $post->append(['featured_image_url']),
            'relatedPosts' => Post::published()
                ->where('id', '!=', $post->id)
                ->where('category_id', $post->category_id)
                ->latest()
                ->take(3)
                ->get()
                ->append(['featured_image_url'])
        ]);
    }
}
