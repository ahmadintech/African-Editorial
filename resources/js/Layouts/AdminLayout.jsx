import Sidebar from '@/Components/Admin/Sidebar';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Head title={title ? `${title} - Admin` : 'Admin Dashboard'} />

            <Sidebar />

            <main className="flex-1 flex flex-col">
                <header className="h-20 border-b border-border px-8 flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-30">
                    <h2 className="text-xl font-bold">{title || 'Dashboard'}</h2>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-muted border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
                            <img src="/placeholder-user.jpg" alt="Admin" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Admin&background=random" }} />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
