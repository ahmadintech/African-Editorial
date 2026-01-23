import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    ExternalLink,
    FileText,
    Calendar,
    Link as LinkIcon
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

const initialPages = [
    { id: 1, title: 'Home', slug: '/', status: 'Published', lastModified: '2024-03-20', author: 'Admin' },
    { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastModified: '2024-03-15', author: 'Admin' },
    { id: 3, title: 'Contact', slug: '/contact', status: 'Published', lastModified: '2024-03-10', author: 'Admin' },
    { id: 4, title: 'Latest News', slug: '/latest-news', status: 'Published', lastModified: '2024-03-05', author: 'Admin' },
];

export default function Index() {
    const [pages, setPages] = useState(initialPages);
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingPage, setDeletingPage] = useState(null);

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (deletingPage) {
            setPages(pages.filter(p => p.id !== deletingPage.id));
            setDeletingPage(null);
            // In a real app: post(route('admin.pages.destroy', deletingPage.id), { method: 'delete' });
            alert(`Draft Mode: Page "${deletingPage.title}" has been removed.`);
        }
    };

    return (
        <AdminLayout title="Manage Pages">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-muted-foreground text-sm">Create and organize your website's static content.</h3>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-card border-border rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <Link
                        href="/admin/pages/create"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Page
                    </Link>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Page Information</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredPages.length > 0 ? (
                            filteredPages.map((page) => (
                                <tr key={page.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm mb-1">{page.title}</div>
                                                <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    <span className="flex items-center gap-1">
                                                        <LinkIcon className="w-3 h-3" /> {page.slug}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {page.lastModified}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${page.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                                            }`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-muted-foreground/70">
                                            <Link
                                                href={`/admin/pages/edit/${page.id}`}
                                                className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                title="Edit Page"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeletingPage(page)}
                                                className="p-2 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                                title="Delete Page"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={page.slug}
                                                target="_blank"
                                                className="p-2 hover:text-foreground hover:bg-muted rounded-lg transition-all"
                                                title="View Live Page"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <p className="text-sm font-medium">No pages found matching your search.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AlertDialog open={!!deletingPage} onOpenChange={() => setDeletingPage(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-foreground">Delete this page?</AlertDialogTitle>
                        <AlertDialogDescription className="text-foreground/90 font-medium text-base mt-2">
                            Are you sure you want to delete <span className="text-primary font-bold italic">"{deletingPage?.title}"</span>? This action cannot be undone and the page will be removed from your website immediately.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-bold border-2 hover:bg-muted transition-colors">Keep Page</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold shadow-lg shadow-destructive/20"
                        >
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
