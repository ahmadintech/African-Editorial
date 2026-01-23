import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Save, X, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';
import Editor from '@/Components/Admin/Editor';

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
        alert('Draft Mode: Page would be published/saved.');
    };

    return (
        <AdminLayout title="Create New Page">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h3 className="text-muted-foreground text-sm uppercase tracking-widest font-black">CMS / NEW PAGE</h3>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border space-y-6">
                        <div>
                            <label className="block font-black text-xs text-muted-foreground uppercase tracking-widest mb-3">Page Title</label>
                            <input
                                type="text"
                                value={data.title}
                                placeholder="e.g. Terms of Service"
                                className="w-full bg-background border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg"
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block font-black text-xs text-muted-foreground uppercase tracking-widest mb-3">Permanent Link (URL Slug)</label>
                            <div className="flex group">
                                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-border bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest">
                                    /
                                </span>
                                <input
                                    type="text"
                                    value={data.slug}
                                    placeholder="page-slug"
                                    className="flex-1 min-w-0 block w-full bg-background border-border rounded-none rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                    onChange={e => setData('slug', e.target.value)}
                                />
                            </div>
                            {errors.slug && <p className="text-destructive text-xs mt-1">{errors.slug}</p>}
                        </div>

                        <div>
                            <label className="block font-black text-xs text-muted-foreground uppercase tracking-widest mb-3">Page Content</label>
                            <div className="min-h-[400px]">
                                <Editor
                                    value={data.content}
                                    onChange={val => setData('content', val)}
                                />
                            </div>
                            {errors.content && <p className="text-destructive text-xs mt-1">{errors.content}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-black text-xs text-muted-foreground uppercase tracking-widest mb-6 pb-4 border-b border-border">Publishing</h4>

                        <div className="space-y-4 text-xs font-bold py-4 border-b border-border mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground uppercase tracking-widest">Initial Status:</span>
                                <span className="text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded">Drafting</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground uppercase tracking-widest">Visibility:</span>
                                <span className="text-foreground uppercase tracking-widest">Public</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4" />
                                Save & Publish Page
                            </button>
                            <Link
                                href="/admin/pages"
                                className="flex items-center justify-center gap-2 bg-muted text-foreground px-4 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-muted-foreground/10 transition-all border border-border"
                            >
                                <X className="w-4 h-4" />
                                Discard Changes
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-black text-xs text-muted-foreground uppercase tracking-widest mb-6 pb-4 border-b border-border">Header Image</h4>
                        <div className="aspect-video bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground cursor-pointer hover:bg-muted/80 transition-all group overflow-hidden">
                            <div className="p-3 bg-background rounded-full group-hover:scale-110 transition-transform shadow-sm">
                                <ImageIcon className="w-5 h-5 opacity-40" />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest">Choose Cover</p>
                                <p className="text-[9px] opacity-60 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
