"use client"

import { Link } from "@inertiajs/react"

interface RecentNewsItem {
    id: number
    title: string
    slug: string
    featured_image_url: string
    category: {
        name: string
    }
}

export function RecentNewsSidebar({ stories = [] }: { stories?: RecentNewsItem[] }) {
    return (
        <aside className="h-fit sticky top-20 space-y-4">
            <div className="px-4 py-3 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Recent News</h3>
            </div>

            <div className="space-y-4 px-4">
                {stories.map((item) => (
                    <Link key={item.id} href={(window as any).route('article.show', item.slug)} className="block">
                        <article className="flex gap-4 group cursor-pointer hover:opacity-80 transition-opacity pb-4 border-b border-border/50 last:pb-0 last:border-b-0">
                            {/* Thumbnail */}
                            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                                <img
                                    src={item.featured_image_url || "/placeholder.svg"}
                                    alt={item.title}
                                    className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full absolute inset-0"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">
                                    {item.category?.name}
                                </p>
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
