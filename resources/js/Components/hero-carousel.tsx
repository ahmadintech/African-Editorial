"use client"

import { useState, useEffect } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroCarousel({ stories = [] }: { stories?: any[] }) {
    const [current, setCurrent] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    useEffect(() => {
        if (!autoPlay || stories.length === 0) return

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % stories.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [autoPlay, stories.length])

    const next = () => {
        if (stories.length === 0) return
        setCurrent((prev) => (prev + 1) % stories.length)
        setAutoPlay(false)
    }

    const prev = () => {
        if (stories.length === 0) return
        setCurrent((prev) => (prev - 1 + stories.length) % stories.length)
        setAutoPlay(false)
    }

    if (stories.length === 0) return null

    const story = stories[current]

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative rounded-lg overflow-hidden bg-card shadow-lg group">
                {/* Image background */}
                <div className="relative h-96 sm:h-[500px] w-full">
                    <img
                        src={story.featured_image_url || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-full absolute inset-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    <a href={`/article/${story.slug}`} className="group-hover:underline decoration-white/50 underline-offset-4 decoration-2">
                        <div className="space-y-3">
                            <div className="inline-block">
                                <span className="news-badge">{story.category?.name || 'News'}</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight text-balance hover:text-primary-foreground/90 transition-colors">
                                {story.title}
                            </h2>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-2">
                                {story.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2">
                                <span>{story.author?.name}</span>
                                <span>•</span>
                                <span>{new Date(story.published_at).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{story.read_time || '5 min'} read</span>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Navigation buttons */}
                {stories.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Dots indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {stories.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrent(i)
                                        setAutoPlay(false)
                                    }}
                                    className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
