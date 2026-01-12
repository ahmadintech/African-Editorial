import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Save, X, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        status: 'Draft',
    });

    const submit = (e) => {
        e.preventDefault();
        // post('/admin/pages');
    };

    return (
        <AdminLayout title="Create New Page">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/pages" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h3 className="text-muted-foreground text-sm">Add a new static page to your website.</h3>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                        <div>
                            <label className="block font-bold text-sm mb-2">Page Title</label>
                            <input
                                type="text"
                                value={data.title}
                                placeholder="Enter page title"
                                className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                onChange={e => setData('title', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-sm mb-2">Slug</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                                    african-editorial.com/
                                </span>
                                <input
                                    type="text"
                                    value={data.slug}
                                    placeholder="page-slug"
                                    className="flex-1 min-w-0 block w-full bg-background border-border rounded-none rounded-r-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('slug', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-sm mb-2">Content</label>
                            <textarea
                                rows="12"
                                value={data.content}
                                placeholder="Write your page content here..."
                                className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                onChange={e => setData('content', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4">Publishing</h4>

                        <div className="space-y-4 text-xs font-semibold py-4 border-t border-b border-border mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="text-foreground">Draft</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Visibility:</span>
                                <span className="text-foreground">Public</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4" />
                                Publish Page
                            </button>
                            <Link
                                href="/admin/pages"
                                className="flex items-center justify-center gap-2 bg-muted text-foreground px-4 py-3 rounded-lg font-bold text-sm hover:bg-muted/80 transition-all"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold text-sm mb-4">Featured Image</h4>
                        <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-all">
                            <Plus className="w-8 h-8 opacity-20" />
                            <span className="text-xs font-bold">Upload Image</span>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
