import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    ExternalLink,
    User,
    FileText
} from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

export default function Index({ posts, filters }) {
    const [deletingPost, setDeletingPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const { flash } = usePage().props;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/posts', { search: searchQuery }, { preserveState: true });
    };

    const handleDelete = () => {
        if (deletingPost) {
            router.delete(`/admin/posts/${deletingPost.id}`, {
                onSuccess: () => setDeletingPost(null),
            });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published':
                return 'bg-emerald-500/10 text-emerald-500';
            case 'draft':
                return 'bg-orange-500/10 text-orange-500';
            case 'archived':
                return 'bg-gray-500/10 text-gray-500';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <AdminLayout title="Manage Posts">
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 font-medium text-sm">
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-muted-foreground text-sm">Create, edit, and manage all website articles and reports.</h3>
                </div>
                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-card border-border rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </form>
                    <Link
                        href="/admin/posts/create"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Post
                    </Link>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Title & Author</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {posts?.data?.length > 0 ? (
                            posts.data.map((post) => (
                                <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded bg-primary/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                {post.featured_image_url ? (
                                                    <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FileText className="w-5 h-5 text-primary" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-sm truncate max-w-md">{post.title}</div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                    <User className="w-3 h-3" />
                                                    {post.author?.name || 'Unknown'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs bg-muted border border-border px-2 py-0.5 rounded font-medium">
                                            {post.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${getStatusColor(post.status)}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {formatDate(post.published_at || post.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-muted-foreground/70">
                                            <Link
                                                href={`/admin/posts/${post.id}/edit`}
                                                className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                title="Edit Post"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeletingPost(post)}
                                                className="p-2 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                                title="Delete Post"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={`/article/${post.slug}`}
                                                target="_blank"
                                                className="p-2 hover:text-foreground hover:bg-muted rounded-lg transition-all"
                                                title="View Post"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="w-10 h-10 opacity-20" />
                                        <p className="text-sm font-medium">No posts found.</p>
                                        <Link href="/admin/posts/create" className="text-primary text-sm font-bold hover:underline">
                                            Create your first post
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {posts?.links && posts.links.length > 3 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                            Showing {posts.from} to {posts.to} of {posts.total} results
                        </p>
                        <div className="flex gap-1">
                            {posts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${link.active
                                        ? 'bg-primary text-primary-foreground font-bold'
                                        : link.url
                                            ? 'hover:bg-muted text-muted-foreground'
                                            : 'text-muted-foreground/50 cursor-not-allowed'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AlertDialog open={!!deletingPost} onOpenChange={() => setDeletingPost(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-foreground">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-foreground/90 font-medium text-base mt-2">
                            This will permanently delete <span className="text-primary font-bold italic">"{deletingPost?.title}"</span> and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-bold border-2 hover:bg-muted transition-colors">Nevermind, keep it</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold shadow-lg shadow-destructive/20"
                        >
                            Yes, delete article
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
