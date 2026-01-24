import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    Users,
    FileText,
    Eye,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Layout
} from 'lucide-react';

const iconMap = {
    Users: Users,
    FileText: FileText,
    Eye: Eye,
    TrendingUp: TrendingUp,
    TrendingDown: TrendingDown,
    Layout: Layout
};

export default function Dashboard({ stats, recentActivities, popularTags }) {
    return (
        <AdminLayout title="Dashboard Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = iconMap[stat.icon] || FileText;
                    return (
                        <div key={stat.name} className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Recent Activities</h3>
                        <Link href={route('admin.posts.index')} className="text-primary text-sm font-medium hover:underline">View All</Link>
                    </div>
                    <div className="space-y-6">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">
                                        <span className="font-bold">{activity.author}</span> published a new article:
                                        <Link href={route('article.show', activity.slug)} target="_blank" className="text-primary ml-1 hover:underline">
                                            "{activity.title}"
                                        </Link>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">{activity.time} • {activity.category}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border">
                    <h3 className="font-bold text-lg mb-6">Popular Tags</h3>
                    <div className="space-y-4">
                        {popularTags.map((tag) => {
                            const maxCount = popularTags[0]?.count || 1;
                            return (
                                <div key={tag.name} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{tag.name}</span>
                                    <div className="flex items-center gap-3 flex-1 px-4">
                                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${(tag.count / maxCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{tag.count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
