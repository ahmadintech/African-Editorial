"use client"


import { Clock, User, Bookmark, Calendar } from "lucide-react"
import { useState } from "react"
import { SocialShareButtons } from "./social-share-buttons"

interface ArticleDetailProps {
    id: number
    title: string
    subtitle: string
    content: string
    author: string
    authorBio: string
    date: string
    readTime: string
    category: string
    image: string
    relatedArticles: Array<{
        id: number
        title: string
        image: string
    }>
}

export function ArticleDetail({
    id,
    title,
    subtitle,
    content,
    author,
    authorBio,
    date,
    readTime,
    category,
    image,
    relatedArticles,
}: ArticleDetailProps) {
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <article className="bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header */}
                <div className="mb-8">
                    <div className="inline-block mb-4">
                        <span className="news-badge">{category}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-foreground">
                        {title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-foreground">{author}</span>
                        </div>
                        <span className="hidden sm:block text-muted-foreground/50">•</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{date}</span>
                        </div>
                        <span className="hidden sm:block text-muted-foreground/50">•</span>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readTime} read</span>
                        </div>
                        <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`ml-auto sm:ml-0 p-2 rounded-full transition-colors ${bookmarked ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                            title="Bookmark"
                        >
                            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Hero image - Now aligned with text */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-10 shadow-sm border border-border/50">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="w-full h-full absolute inset-0 object-cover"
                    />
                </div>

                {/* Article body */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-xl">
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                {/* Author bio */}
                <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-12 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-sm mb-1">About the Author</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{authorBio}</p>
                    </div>
                </div>

                {/* Social sharing */}
                <div className="border-t border-b border-border py-8 mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Share this story</span>
                        <SocialShareButtons title={title} url={`https://africaneditorial.com/article/${id}`} />
                    </div>
                </div>

                {/* Tags */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2">
                        {["Politics", "Africa", "Investigation", "Policy"].map((tag) => (
                            <a
                                key={tag}
                                href={`/tag/${tag.toLowerCase()}`}
                                className="px-4 py-1.5 rounded-full text-xs font-bold bg-muted hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-wide"
                            >
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                    <div className="border-t border-border pt-12">
                        <h3 className="text-2xl font-bold text-foreground mb-8 text-center sm:text-left">Related Stories</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {relatedArticles.map((article) => (
                                <a key={article.id} href={`/article/${article.id}`} className="group flex flex-col gap-3">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border/50">
                                        <img
                                            src={article.image || "/placeholder.svg"}
                                            alt={article.title}
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full absolute inset-0"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h4>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
