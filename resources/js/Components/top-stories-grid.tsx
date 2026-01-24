"use client"

import { NewsCard } from "./news-card"
import { MobileCarousel } from "./mobile-carousel"

export function TopStoriesGrid({ stories = [] }: { stories?: any[] }) {
    if (!stories || stories.length === 0) return null

    return (
        <section className="py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Top Stories</h2>

            <div className="hidden md:block">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <NewsCard
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            summary={story.excerpt}
                            category={story.category?.name || 'News'}
                            author={story.author?.name}
                            date={new Date(story.published_at).toLocaleDateString()}
                            image={story.featured_image_url}
                            readTime={story.read_time || '5 min'}
                            slug={story.slug}
                        />
                    ))}
                </div>
            </div>

            <div className="md:hidden">
                <MobileCarousel>
                    {stories.map((story) => (
                        <div key={story.id} className="carousel-card">
                            <NewsCard
                                id={story.id}
                                title={story.title}
                                summary={story.excerpt}
                                category={story.category?.name || 'News'}
                                author={story.author?.name}
                                date={new Date(story.published_at).toLocaleDateString()}
                                image={story.featured_image_url}
                                readTime={story.read_time || '5 min'}
                                slug={story.slug}
                            />
                        </div>
                    ))}
                </MobileCarousel>
            </div>
        </section>
    )
}
