import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link, usePage } from '@inertiajs/react';
import { Plus, Save, X, ArrowLeft, Eye, Clock, Hash, Globe, ChevronDown, FileText, Layout, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import Editor from '@/Components/Admin/Editor';
import { useState, useRef } from 'react';

export default function Create({ categories }) {
    const { auth, flash } = usePage().props;
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        category_id: categories?.[0]?.id || '',
        status: 'draft',
        read_time: '5 min',
        source: '',
        featured_image: null,
    });

    // Helper to strip HTML and get plain text
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    // Auto-generate excerpt from content (first 150 chars)
    const generateExcerptFromContent = () => {
        if (data.content) {
            const plainText = stripHtml(data.content);
            const excerpt = plainText.substring(0, 150).trim();
            setData('excerpt', excerpt + (plainText.length > 150 ? '...' : ''));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/posts', {
            forceFormData: true,
        });
    };

    const saveDraft = () => {
        setData('status', 'draft');
        post('/admin/posts', { forceFormData: true });
    };

    const publish = () => {
        setData('status', 'published');
        post('/admin/posts', { forceFormData: true });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('featured_image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const selectedCategory = categories?.find(c => c.id === parseInt(data.category_id));

    return (
        <AdminLayout title="Create New Post">
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 font-medium text-sm">
                    {flash.success}
                </div>
            )}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h3 className="text-muted-foreground text-sm font-medium">Craft a high-quality editorial or breaking news story.</h3>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={saveDraft}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-muted hover:bg-muted/80 rounded-lg transition-all"
                        disabled={processing}
                    >
                        <FileText className="w-4 h-4" />
                        Save Draft
                    </button>
                    <button
                        type="button"
                        onClick={publish}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        disabled={processing}
                    >
                        <Save className="w-4 h-4" />
                        Publish Post
                    </button>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border space-y-6">
                        {/* Title */}
                        <div>
                            <input
                                type="text"
                                value={data.title}
                                placeholder="Enter article title..."
                                className="w-full bg-transparent border-none text-3xl font-black placeholder:text-muted-foreground/30 focus:ring-0 p-0 mb-4"
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
                            <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
                        </div>

                        {/* Advanced Editor */}
                        <div>
                            <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Globe className="w-3 h-3" />
                                Article Content
                            </label>
                            <Editor
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                placeholder="Write the full investigative report or news story here..."
                            />
                            {errors.content && <p className="text-destructive text-xs mt-1">{errors.content}</p>}
                        </div>

                        {/* Excerpt - Now below content */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    Short Summary / Excerpt
                                </label>
                                <button
                                    type="button"
                                    onClick={generateExcerptFromContent}
                                    className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                                    disabled={!data.content}
                                >
                                    Auto-generate from content
                                </button>
                            </div>
                            <textarea
                                rows="3"
                                value={data.excerpt}
                                placeholder="Leave empty to auto-generate from article content on save..."
                                className="w-full bg-muted/30 border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm resize-none italic"
                                onChange={e => setData('excerpt', e.target.value)}
                            />
                            {errors.excerpt && <p className="text-destructive text-xs mt-1">{errors.excerpt}</p>}
                        </div>
                    </div>

                    {/* Meta/SEO Placeholder */}
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-primary" />
                            Search Engine Optimization (SEO)
                        </h4>
                        <div className="space-y-4">
                            <p className="text-xs text-muted-foreground">Preview how your article will look in search results.</p>
                            <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                                <div className="text-blue-600 font-bold text-lg truncate">{data.title || 'Post Title Preview'}</div>
                                <div className="text-emerald-700 text-xs mt-1 truncate">
                                    african-editorial.com &gt; {selectedCategory?.name?.toLowerCase() || 'category'} &gt; {data.title.toLowerCase().replace(/\s+/g, '-') || 'post-slug'}
                                </div>
                                <div className="text-muted-foreground text-xs mt-1 line-clamp-2">
                                    {data.excerpt || (data.content ? stripHtml(data.content).substring(0, 150) + '...' : 'Waiting for content...')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    {/* Featured Image - Now with upload functionality */}
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-primary" />
                            Featured Visual
                        </h4>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {imagePreview ? (
                            <div className="relative group rounded-lg overflow-hidden aspect-video">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                        title="Change image"
                                    >
                                        <Upload className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="p-2 bg-red-500/50 rounded-lg hover:bg-red-500/70 transition-colors"
                                        title="Remove image"
                                    >
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-video bg-muted/50 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-2 text-muted-foreground cursor-pointer hover:bg-muted hover:border-primary/50 transition-all group"
                            >
                                <Upload className="w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Click to Upload Image</span>
                                <span className="text-[8px] text-muted-foreground/60">(1200 x 630 recommended)</span>
                            </div>
                        )}
                        {errors.featured_image && <p className="text-destructive text-xs mt-2">{errors.featured_image}</p>}
                    </div>

                    {/* Publishing Info */}
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            Status & Visibility
                        </h4>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold py-3 border-b border-border/50">
                                <span className="text-muted-foreground uppercase tracking-wider">Status</span>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="bg-transparent border-none p-0 text-right font-bold focus:ring-0 text-primary uppercase cursor-pointer"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold py-3 border-b border-border/50">
                                <span className="text-muted-foreground uppercase tracking-wider">Author</span>
                                <span className="text-foreground">{auth?.user?.name || 'Admin User'}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold py-3 border-b border-border/50">
                                <span className="text-muted-foreground uppercase tracking-wider">Read Time</span>
                                <div className="flex items-center gap-2 text-foreground">
                                    <input
                                        type="text"
                                        value={data.read_time}
                                        className="w-16 bg-transparent border-none p-0 text-right font-bold focus:ring-0"
                                        onChange={e => setData('read_time', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categorization */}
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Layout className="w-4 h-4 text-primary" />
                            Categorization
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">Primary Category</label>
                                <select
                                    value={data.category_id}
                                    className="w-full bg-muted/50 border-border rounded-lg px-4 py-2 text-sm font-bold focus:ring-primary/20"
                                    onChange={e => setData('category_id', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-destructive text-xs mt-1">{errors.category_id}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Source */}
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            Source
                        </h4>
                        <input
                            type="text"
                            value={data.source}
                            placeholder="e.g. Reuters, AP, Original"
                            className="w-full bg-muted/50 border-border rounded-lg px-4 py-2 text-sm font-medium focus:ring-primary/20"
                            onChange={e => setData('source', e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
