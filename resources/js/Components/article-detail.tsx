"use client"


import { Clock, User, Bookmark } from "lucide-react"
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
 {/* Hero image */}
 <div className="relative h-96 sm:h-[500px] w-full">
 <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full absolute inset-0 object-cover" />
 </div>

 {/* Article content */}
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 {/* Header */}
 <div className="mb-8">
 <div className="inline-block mb-4">
 <span className="news-badge">{category}</span>
 </div>

 <h1 className="editorial-headline mb-4">{title}</h1>

 <p className="article-summary mb-6 text-balance">{subtitle}</p>

 {/* Metadata */}
 <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
 <div className="flex items-center gap-2">
 <User className="w-4 h-4" />
 <span>{author}</span>
 </div>
 <span className="hidden sm:block">•</span>
 <span>{date}</span>
 <span className="hidden sm:block">•</span>
 <div className="flex items-center gap-2">
 <Clock className="w-4 h-4" />
 <span>{readTime} read</span>
 </div>
 <button
 onClick={() => setBookmarked(!bookmarked)}
 className={`ml-auto sm:ml-0 p-2 rounded-full transition-colors ${bookmarked ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
 >
 <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
 </button>
 </div>
 </div>

 {/* Article body */}
 <div className="prose prose-invert max-w-none mb-12">
 <div
 className="text-foreground leading-relaxed space-y-6 text-lg"
 dangerouslySetInnerHTML={{ __html: content }}
 />
 </div>

 {/* Author bio */}
 <div className="bg-muted/50 rounded-lg p-6 mb-12">
 <h3 className="font-bold text-foreground mb-2">About the Author</h3>
 <p className="text-muted-foreground text-sm">{authorBio}</p>
 </div>

 {/* Social sharing */}
 <div className="border-t border-b border-border py-6 mb-12">
 <SocialShareButtons title={title} url={`https://africaneditorial.com/article/${id}`} />
 </div>

 {/* Tags */}
 <div className="mb-12">
 <h3 className="font-bold text-foreground mb-4">Tags</h3>
 <div className="flex flex-wrap gap-2">
 {["Politics", "Africa", "Investigation", "Policy"].map((tag) => (
 <a
 key={tag}
 href={`/tag/${tag.toLowerCase()}`}
 className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
 >
 {tag}
 </a>
 ))}
 </div>
 </div>

 {/* Related articles */}
 {relatedArticles.length > 0 && (
 <div className="border-t border-border pt-12">
 <h3 className="text-2xl font-bold text-foreground mb-6">Related Stories</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {relatedArticles.map((article) => (
 <a key={article.id} href={`/article/${article.id}`} className="news-card overflow-hidden group">
 <div className="relative h-48 w-full overflow-hidden bg-muted">
 <img src={article.image || "/placeholder.svg"} alt={article.title} className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full absolute inset-0" />
 </div>
 <div className="p-4">
 <h4 className="font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
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
