import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    User,
    Settings,
    LogOut,
    ChevronRight,
    Search
} from 'lucide-react';

export default function Sidebar() {
    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Manage Pages', href: '/admin/pages', icon: FileText },
        { name: 'Profile', href: '/admin/profile', icon: User },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-card border-r border-border min-h-screen flex flex-col sticky top-0">
            <div className="p-6 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="font-bold text-xl text-foreground">AE Admin</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const active = url.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${active ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors'}`} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${active ? 'opacity-100' : ''}`} />
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:text-destructive transition-colors" />
                    <span className="font-medium">Sign Out</span>
                </Link>
            </div>
        </div>
    );
}
