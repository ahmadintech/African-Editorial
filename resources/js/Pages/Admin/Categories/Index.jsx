import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Tag,
    FileText as PostIcon
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
import Pagination from '@/Components/Pagination';

export default function Index({ categories }) {
    const { data: categoryList, links, meta } = categories;
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingCategory, setDeletingCategory] = useState(null);

    const filteredCategories = categoryList.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (deletingCategory) {
            router.delete(route('admin.categories.destroy', deletingCategory.id), {
                onSuccess: () => {
                    setDeletingCategory(null);
                }
            });
        }
    };

    return (
        <AdminLayout title="Manage Categories">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-muted-foreground text-sm">Organize website content into categories.</h3>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-card border-border rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Category
                    </Link>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Posts</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                                                <Tag className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm mb-1">{category.name}</div>
                                                <div className="text-[11px] text-muted-foreground font-mono">
                                                    /{category.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {category.description || 'No description provided.'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                                            <PostIcon className="w-3 h-3" />
                                            {category.posts_count || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-muted-foreground/70">
                                            <Link
                                                href={route('admin.categories.edit', category.id)}
                                                className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                title="Edit Category"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeletingCategory(category)}
                                                className="p-2 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                                title="Delete Category"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <Tag className="w-8 h-8 opacity-20" />
                                        <p className="text-sm font-medium">No categories found matching your search.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <Pagination links={links} />
            </div>

            <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-foreground">Delete this category?</AlertDialogTitle>
                        <AlertDialogDescription className="text-foreground/90 font-medium text-base mt-2">
                            Are you sure you want to delete <span className="text-primary font-bold italic">"{deletingCategory?.name}"</span>?
                            {deletingCategory?.posts_count > 0 && (
                                <span className="block mt-2 text-destructive font-bold">
                                    Warning: This category has {deletingCategory.posts_count} associated post(s).
                                </span>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="font-bold border-2 hover:bg-muted transition-colors">Cancel</AlertDialogCancel>
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
