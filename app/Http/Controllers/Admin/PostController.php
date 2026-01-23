<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Media;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of posts.
     */
    public function index(Request $request): Response
    {
        $posts = Post::with(['author', 'category', 'featuredImage'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'status', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create(): Response
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:draft,published,archived',
            'read_time' => 'nullable|string|max:50',
            'source' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|max:5120', // Max 5MB
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);
        
        // Auto-generate excerpt from content if empty
        if (empty($validated['excerpt']) && !empty($validated['content'])) {
            $plainText = strip_tags($validated['content']);
            $validated['excerpt'] = Str::limit($plainText, 150);
        }
        
        // If publishing, set published_at
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $path = $file->store('posts', 'public');
            
            $media = Media::create([
                'filename' => $file->getClientOriginalName(),
                'path' => $path,
                'disk' => 'public',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'user_id' => auth()->id(),
            ]);
            
            $validated['featured_image_id'] = $media->id;
        }
        
        unset($validated['featured_image']);

        $post = Post::create($validated);

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('success', 'Post created successfully!');
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post): Response
    {
        $post->load(['category', 'tags', 'featuredImage', 'author']);
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'required|in:draft,published,archived',
            'read_time' => 'nullable|string|max:50',
            'source' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|max:5120', // Max 5MB
        ]);

        // Update slug if title changed
        if ($post->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Auto-generate excerpt from content if empty
        if (empty($validated['excerpt']) && !empty($validated['content'])) {
            $plainText = strip_tags($validated['content']);
            $validated['excerpt'] = Str::limit($plainText, 150);
        }

        // If publishing for first time, set published_at
        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            $path = $file->store('posts', 'public');
            
            $media = Media::create([
                'filename' => $file->getClientOriginalName(),
                'path' => $path,
                'disk' => 'public',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'user_id' => auth()->id(),
            ]);
            
            $validated['featured_image_id'] = $media->id;
        }
        
        unset($validated['featured_image']);

        $post->update($validated);

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Post deleted successfully!');
    }
}
