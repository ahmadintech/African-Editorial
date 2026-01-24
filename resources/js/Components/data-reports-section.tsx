"use client"

import { NewsCard } from "./news-card"

export function DataReportsSection({ stories = [] }: { stories?: any[] }) {
    if (!stories || stories.length === 0) return null

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-muted/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Data & Research Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                    <NewsCard
                        key={story.id}
                        id={story.id}
                        title={story.title}
                        summary={story.excerpt}
                        category={story.category?.name}
                        author={story.author?.name}
                        date={new Date(story.published_at).toLocaleDateString()}
                        image={story.featured_image_url}
                        readTime={story.read_time || '12 min'}
                        slug={story.slug}
                    />
                ))}
            </div>
        </section>
    )
}
