import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Save, Tag } from 'lucide-react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout title="Edit Category">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link
                        href={route('admin.categories.index')}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Categories
                    </Link>
                    <h2 className="text-3xl font-black text-foreground">Edit Category</h2>
                    <p className="text-muted-foreground mt-1">Update category details.</p>
                </div>

                <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-foreground mb-1">
                                Category Name
                            </label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="e.g. Technology, Politics"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive font-medium mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-foreground mb-1">
                                Description (Optional)
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                placeholder="Briefly describe what this category covers..."
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive font-medium mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Save Changes' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
