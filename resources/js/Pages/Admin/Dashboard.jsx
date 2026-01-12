import AdminLayout from '@/Layouts/AdminLayout';
import {
    Users,
    FileText,
    Eye,
    TrendingUp,
    TrendingDown,
    ArrowUpRight
} from 'lucide-react';

const stats = [
    { name: 'Total Visitors', value: '124,592', change: '+12.5%', trend: 'up', icon: Users },
    { name: 'Total Articles', value: '1,420', change: '+3.2%', trend: 'up', icon: FileText },
    { name: 'Avg. Read Time', value: '4m 32s', change: '-1.4%', trend: 'down', icon: Eye },
    { name: 'Engagement Rate', value: '64.2%', change: '+5.4%', trend: 'up', icon: TrendingUp },
];

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <stat.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Recent Activities</h3>
                        <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">
                                        <span className="font-bold">John Doe</span> published a new article:
                                        <span className="text-primary ml-1">"The Future of Renewable Energy in Africa"</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago • Investigations</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border">
                    <h3 className="font-bold text-lg mb-6">Popular Tags</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Politics', count: 420 },
                            { name: 'Economy', count: 350 },
                            { name: 'Climate', count: 280 },
                            { name: 'Technology', count: 210 },
                            { name: 'Health', count: 150 },
                        ].map((tag) => (
                            <div key={tag.name} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{tag.name}</span>
                                <div className="flex items-center gap-3 flex-1 px-4">
                                    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${(tag.count / 420) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{tag.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
