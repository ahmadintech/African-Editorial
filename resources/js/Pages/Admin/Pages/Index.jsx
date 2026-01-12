import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    ExternalLink
} from 'lucide-react';

const pages = [
    { id: 1, title: 'Home', slug: '/', status: 'Published', lastModified: '2024-03-20' },
    { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastModified: '2024-03-15' },
    { id: 3, title: 'Contact', slug: '/contact', status: 'Published', lastModified: '2024-03-10' },
    { id: 4, title: 'Latest News', slug: '/latest-news', status: 'Published', lastModified: '2024-03-05' },
];

export default function Index() {
    return (
        <AdminLayout title="Manage Pages">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-muted-foreground text-sm">Create and organize your website pages.</h3>
                </div>
                <Link
                    href="/admin/pages/create"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Page
                </Link>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Page Title</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Modified</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-sm">{page.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="text-xs bg-muted px-2 py-1 rounded">{page.slug}</code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        {page.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {page.lastModified}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <Link href={page.slug} target="_blank" className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
