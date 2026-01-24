import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Globe,
    Settings as SettingsIcon,
    Share2,
    Bell,
    Mail,
    Layout,
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Instagram,
    MapPin,
    Phone,
    Image as ImageIcon,
    Save,
    Trash2,
    Plus
} from 'lucide-react';

export default function Settings({ settings }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('General');

    const { data, setData, post, processing, errors } = useForm({
        // General
        site_name: settings?.site_name || 'African Editorial',
        site_description: settings?.site_description || 'Premier destination for high-quality investigative reporting and analytical news across the African continent.',
        contact_email: settings?.contact_email || 'contact@african-editorial.com',
        copyright_text: settings?.copyright_text || '© 2026 African Editorial. All rights reserved.',
        maintenance_mode: settings?.maintenance_mode || false,

        // Appearance
        logo_url: settings?.logo_url || '/logo.png',

        // Social Links
        facebook_url: settings?.facebook_url || 'https://facebook.com/africaneditorial',
        twitter_url: settings?.twitter_url || 'https://twitter.com/africaneditorial',
        linkedin_url: settings?.linkedin_url || 'https://linkedin.com/company/africaneditorial',
        youtube_url: settings?.youtube_url || 'https://youtube.com/africaneditorial',
        instagram_url: settings?.instagram_url || 'https://instagram.com/africaneditorial',

        // Contact Details
        contact_address: settings?.contact_address || 'Kampala, Uganda, East Africa',
        contact_phone: settings?.contact_phone || '+256 (414) 252-600',
        contact_map_url: settings?.contact_map_url || '',
        department_emails: settings?.department_emails || [
            { id: 1, name: 'Editorial', email: 'editorial@africaneditorial.com' },
            { id: 2, name: 'Investigations', email: 'investigations@africaneditorial.com' },
            { id: 3, name: 'Tips & Story Ideas', 'email': 'tips@africaneditorial.com' },
        ]
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const updateDeptEmail = (id, field, value) => {
        const updated = data.department_emails.map(dept =>
            dept.id === id ? { ...dept, [field]: value } : dept
        );
        setData('department_emails', updated);
    };

    const addDeptEmail = () => {
        setData('department_emails', [
            ...data.department_emails,
            { id: Date.now(), name: '', email: '' }
        ]);
    };

    const removeDeptEmail = (id) => {
        setData('department_emails', data.department_emails.filter(dept => dept.id !== id));
    };

    return (
        <AdminLayout title="System Settings">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation */}
                <div className="lg:col-span-1">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 font-medium text-sm">
                            {flash.success}
                        </div>
                    )}
                    <div className="bg-card rounded-xl border border-border p-2 sticky top-28">
                        {[
                            { name: 'General', icon: SettingsIcon },
                            { name: 'Appearance', icon: Layout },
                            { name: 'Social Links', icon: Share2 },
                            { name: 'Contact Details', icon: Mail },
                            { name: 'Notifications', icon: Bell },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === item.name
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-8">
                    <form onSubmit={submit} className="bg-card p-8 rounded-xl border border-border">
                        {activeTab === 'General' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    General Site Information
                                </h4>

                                <div>
                                    <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        value={data.site_name}
                                        className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        onChange={e => setData('site_name', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Site Description</label>
                                    <textarea
                                        rows="4"
                                        value={data.site_description}
                                        className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                        onChange={e => setData('site_description', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Copyright Text</label>
                                    <input
                                        type="text"
                                        value={data.copyright_text}
                                        className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        onChange={e => setData('copyright_text', e.target.value)}
                                    />
                                </div>

                                <div className="pt-6 border-t border-border flex items-center justify-between">
                                    <div>
                                        <h5 className="font-bold text-sm">Maintenance Mode</h5>
                                        <p className="text-xs text-muted-foreground">Temporarily disable the website for visitors.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('maintenance_mode', !data.maintenance_mode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${data.maintenance_mode ? 'bg-primary' : 'bg-muted'}`}
                                    >
                                        <span className={`${data.maintenance_mode ? 'translate-x-6 bg-white' : 'translate-x-1 bg-muted-foreground'} inline-block h-4 w-4 transform rounded-full transition-transform`} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Appearance' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-primary" />
                                    Brand Assets & Appearance
                                </h4>

                                <div>
                                    <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-4">Website Logo</label>
                                    <div className="flex items-start gap-8">
                                        <div className="w-48 h-24 bg-muted/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden group relative">
                                            {data.logo_url && (typeof data.logo_url === 'string' || data.logo_url instanceof File) ? (
                                                <img
                                                    src={data.logo_url instanceof File ? URL.createObjectURL(data.logo_url) : data.logo_url}
                                                    alt="Logo"
                                                    className="max-h-16 object-contain"
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                                />
                                            ) : null}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => document.getElementById('logo-upload').click()}>
                                                <ImageIcon className="text-white w-6 h-6" />
                                            </div>
                                            <div className={`hidden flex-col items-center gap-2 text-muted-foreground ${!data.logo_url ? '!flex' : ''}`}>
                                                <ImageIcon className="w-8 h-8 opacity-20" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">No Logo</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <p className="text-xs text-muted-foreground italic">Preferred format: .svg or transparent .png. Recommended height: 80px.</p>
                                            <input
                                                id="logo-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) setData('logo_url', file);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('logo-upload').click()}
                                                className="px-4 py-2 bg-muted hover:bg-muted-foreground/10 rounded-lg text-xs font-bold transition-all border border-border"
                                            >
                                                Upload New Logo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Social Links' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Share2 className="w-5 h-5 text-primary" />
                                    Social Media Presence
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Facebook className="w-3 h-3 text-[#1877F2]" /> Facebook URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.facebook_url}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('facebook_url', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Twitter className="w-3 h-3 text-[#1DA1F2]" /> Twitter / X URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.twitter_url}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('twitter_url', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Linkedin className="w-3 h-3 text-[#0A66C2]" /> LinkedIn URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.linkedin_url}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('linkedin_url', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Youtube className="w-3 h-3 text-[#FF0000]" /> YouTube URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.youtube_url}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('youtube_url', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Instagram className="w-3 h-3 text-[#E4405F]" /> Instagram URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.instagram_url}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('instagram_url', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Contact Details' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Contact Page Configuration
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-border">
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Mail className="w-3 h-3" /> Primary Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('contact_email', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <Phone className="w-3 h-3" /> Contact Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('contact_phone', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                            <MapPin className="w-3 h-3" /> Physical Address
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_address}
                                            className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                            onChange={e => setData('contact_address', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="font-bold text-sm">Department Emails</h5>
                                        <button
                                            type="button"
                                            onClick={addDeptEmail}
                                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                                        >
                                            <Plus className="w-3 h-3" /> Add Department
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {data.department_emails.map((dept) => (
                                            <div key={dept.id} className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border border-border group">
                                                <div className="flex-1 grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Dept Name (e.g. Editorial)"
                                                        value={dept.name}
                                                        className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                                                        onChange={e => updateDeptEmail(dept.id, 'name', e.target.value)}
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        value={dept.email}
                                                        className="bg-transparent border-none p-0 text-sm text-muted-foreground focus:ring-0"
                                                        onChange={e => updateDeptEmail(dept.id, 'email', e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeDeptEmail(dept.id)}
                                                    className="p-1 px-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Notifications' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-primary" />
                                    Email & System Notifications
                                </h4>
                                <p className="text-sm text-muted-foreground italic">Notification routing logic is coming soon...</p>
                            </div>
                        )}

                        <div className="flex justify-end pt-10 border-t border-border mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                Save Configuration
                            </button>
                        </div>
                    </form>

                    <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-xl">
                        <h4 className="text-rose-500 font-bold text-sm mb-2 uppercase tracking-wider">Danger Zone</h4>
                        <p className="text-xs text-rose-500/80 mb-4">Actions here are irreversible. Please proceed with caution.</p>
                        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20">
                            Clear Cache & Log Out
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
