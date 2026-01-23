import Sidebar from '@/Components/Admin/Sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    User,
    Settings as SettingsIcon,
    LogOut,
    ChevronDown,
    Search
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const { toast } = useToast();

    // Show toast notifications for flash messages
    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Success",
                description: flash.success,
                variant: "default",
            });
        }
        if (flash?.error) {
            toast({
                title: "Error",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash?.success, flash?.error]);

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Head title={title ? `${title} - Admin` : 'Admin Dashboard'} />

            <Sidebar />

            <main className="flex-1 flex flex-col">
                <header className="h-20 border-b border-border px-8 flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-30">
                    <h2 className="text-xl font-bold">{title || 'Dashboard'}</h2>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-muted border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none focus:ring-0">
                                <div className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-muted transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={auth?.user?.photo_url || "/placeholder-user.jpg"}
                                            alt={auth?.user?.name || "Admin"}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${auth?.user?.name || 'Admin'}&background=random` }}
                                        />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-bold leading-none mb-1">{auth?.user?.name || 'Administrator'}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Super Admin</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
                                <DropdownMenuLabel className="px-3 py-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">{auth?.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{auth?.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/profile" className="w-full cursor-pointer flex items-center gap-2 p-2 focus:bg-primary focus:text-primary-foreground rounded-lg transition-all">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">My Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/settings" className="w-full cursor-pointer flex items-center gap-2 p-2 focus:bg-primary focus:text-primary-foreground rounded-lg transition-all">
                                        <SettingsIcon className="w-4 h-4" />
                                        <span className="font-medium">System Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full cursor-pointer flex items-center gap-2 p-2 rounded-lg transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="font-medium">Sign Out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
}
