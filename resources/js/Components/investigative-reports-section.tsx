"use client"

import { MinimalNewsCard } from "./minimal-news-card"
import { MobileCarousel } from "./mobile-carousel"

export function InvestigativeReportsSection({ stories = [] }: { stories?: any[] }) {
    if (!stories || stories.length === 0) return null

    return (
        <section className="py-12 border-t border-border bg-muted/30">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Investigative Reports</h2>
                <p className="text-muted-foreground">Deep-dive journalism uncovering stories that matter</p>
            </div>

            <div className="hidden md:block">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <MinimalNewsCard
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            image={story.featured_image_url}
                            slug={story.slug}
                        />
                    ))}
                </div>
            </div>

            <div className="md:hidden">
                <MobileCarousel>
                    {stories.map((story) => (
                        <div key={story.id} className="carousel-card">
                            <MinimalNewsCard
                                id={story.id}
                                title={story.title}
                                image={story.featured_image_url}
                                slug={story.slug}
                            />
                        </div>
                    ))}
                </MobileCarousel>
            </div>
        </section>
    )
}
