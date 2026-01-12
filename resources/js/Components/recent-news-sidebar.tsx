"use client"

import { Link } from "@inertiajs/react"

interface RecentNewsItem {
    id: number
    title: string
    date: string
    timeAgo: string
    image: string
}

const recentNewsItems: RecentNewsItem[] = [
    {
        id: 1,
        title: "Breaking: Regional Climate Summit Concludes",
        date: "2024-01-10",
        timeAgo: "5 mins ago",
        image: "/east-africa-drought-water.jpg",
    },
    {
        id: 2,
        title: "Latest Economic Data Shows Mixed Results",
        date: "2024-01-10",
        timeAgo: "15 mins ago",
        image: "/african-economy-finance.jpg",
    },
    {
        id: 3,
        title: "Tech Leaders Meet to Discuss Innovation",
        date: "2024-01-10",
        timeAgo: "45 mins ago",
        image: "/nigeria-tech-startup-innovation.jpg",
    },
    {
        id: 4,
        title: "Political Developments in East Africa",
        date: "2024-01-09",
        timeAgo: "2 hrs ago",
        image: "/african-political-meeting.jpg",
    },
    {
        id: 5,
        title: "Health Officials Issue New Guidelines",
        date: "2024-01-09",
        timeAgo: "3 hrs ago",
        image: "/health-crisis-medical.jpg",
    },
]

export function RecentNewsSidebar() {
    return (
        <aside className="h-fit sticky top-20 space-y-4">
            <div className="px-4 py-3 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Recent News</h3>
            </div>

            <div className="space-y-4 px-4">
                {recentNewsItems.map((item) => (
                    <Link key={item.id} href={`/article/${item.id}`} className="block">
                        <article className="flex gap-4 group cursor-pointer hover:opacity-80 transition-opacity pb-4 border-b border-border/50 last:pb-0 last:border-b-0">
                            {/* Thumbnail */}
                            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted pb-3">
                                <img src={item.image || "/placeholder.svg"} alt={item.title} className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full absolute inset-0" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{item.timeAgo}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="px-4 py-3 border-t border-border">
                <Link href="/latest-news" className="inline-block text-sm font-semibold text-primary hover:underline">
                    View All →
                </Link>
            </div>
        </aside>
    )
}
