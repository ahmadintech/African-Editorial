import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import {
    Globe,
    Settings as SettingsIcon,
    Share2,
    Bell,
    Mail,
    Layout
} from 'lucide-react';

export default function Settings() {
    const { data, setData, post, processing, errors } = useForm({
        site_name: 'African Editorial',
        site_description: 'Premier destination for high-quality investigative reporting and analytical news across the African continent.',
        contact_email: 'contact@african-editorial.com',
        maintenance_mode: false,
    });

    return (
        <AdminLayout title="System Settings">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-xl border border-border p-2 sticky top-28">
                        {[
                            { name: 'General', icon: SettingsIcon, active: true },
                            { name: 'Appearance', icon: Layout, active: false },
                            { name: 'Communications', icon: Mail, active: false },
                            { name: 'Social Links', icon: Share2, active: false },
                            { name: 'Notifications', icon: Bell, active: false },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${item.active
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
                    <div className="bg-card p-8 rounded-xl border border-border">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            General Site Information
                        </h4>

                        <div className="space-y-6">
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
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Contact Email Address</label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('contact_email', e.target.value)}
                                />
                            </div>

                            <div className="pt-6 border-t border-border flex items-center justify-between">
                                <div>
                                    <h5 className="font-bold text-sm">Maintenance Mode</h5>
                                    <p className="text-xs text-muted-foreground">Temporarily disable the website for visitors.</p>
                                </div>
                                <button
                                    onClick={() => setData('maintenance_mode', !data.maintenance_mode)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted`}
                                >
                                    <span className={`${data.maintenance_mode ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-muted-foreground'} inline-block h-4 w-4 transform rounded-full transition-transform`} />
                                </button>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>

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
