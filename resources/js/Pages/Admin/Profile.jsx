import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import {
    User,
    Mail,
    Lock,
    Camera,
    Shield
} from 'lucide-react';

export default function Profile() {
    const { data, setData, post, processing, errors } = useForm({
        name: 'Admin User',
        email: 'admin@african-editorial.com',
        current_password: '',
        new_password: '',
        password_confirmation: '',
    });

    return (
        <AdminLayout title="My Profile">
            <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-card p-8 rounded-xl border border-border flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Admin User</h3>
                        <p className="text-muted-foreground mt-1 font-medium">Super Administrator</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                                <Shield className="w-3 h-3 text-primary" />
                                Full Access
                            </div>
                            <div className="text-xs font-bold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                                Member since Jan 2024
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="bg-card p-8 rounded-xl border border-border">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            General Information
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        className="w-full bg-background border-border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all mt-4">
                                Update Profile
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-card p-8 rounded-xl border border-border">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Security Settings
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('current_password', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('new_password', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-background border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all mt-4">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
