"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { NewsCard } from "./news-card"

interface Article {
 id: number
 title: string
 summary: string
 category: string
 author: string
 date: string
 image: string
 readTime: string
}

const allArticles: Article[] = [
 {
 id: 1,
 title: "Investigations Reveal Hidden Impact of Trade Agreements",
 summary: "Deep-dive analysis shows how recent trade deals are reshaping the continent",
 category: "Investigations",
 author: "Sarah Okonkwo",
 date: "2024-01-10",
 image: "/african-trade-investigation.jpg",
 readTime: "12 min",
 },
 {
 id: 2,
 title: "Climate Crisis: East Africa Faces Unprecedented Water Shortage",
 summary: "Exclusive report on how prolonged drought is affecting communities",
 category: "Environment",
 author: "James Kipchoge",
 date: "2024-01-09",
 image: "/east-africa-drought-water.jpg",
 readTime: "10 min",
 },
 {
 id: 3,
 title: "Tech Innovation: Nigeria's Startups Leading Digital Revolution",
 summary: "How West African entrepreneurs are building solutions for continental challenges",
 category: "Business",
 author: "Chioma Adeyemi",
 date: "2024-01-08",
 image: "/nigeria-tech-startup-innovation.jpg",
 readTime: "8 min",
 },
 {
 id: 4,
 title: "Political Tensions Rise Over Border Disputes",
 summary: "Regional leaders meet to discuss long-standing territorial issues",
 category: "Politics",
 author: "Amina Hassan",
 date: "2024-01-07",
 image: "/african-political-meeting.jpg",
 readTime: "7 min",
 },
 {
 id: 5,
 title: "Inflation Crisis: Central Banks Take Action",
 summary: "Economic policy shifts aim to stabilize currencies across the continent",
 category: "Economy",
 author: "David Kwesi",
 date: "2024-01-06",
 image: "/african-economy-finance.jpg",
 readTime: "9 min",
 },
 {
 id: 6,
 title: "Education Reform Initiatives Show Early Success",
 summary: "New policies in South Africa and Rwanda demonstrate promising results",
 category: "Education",
 author: "Grace Mwangi",
 date: "2024-01-05",
 image: "/africa-education-classroom.jpg",
 readTime: "6 min",
 },
]

const ARTICLES_PER_PAGE = 6

export function InfiniteScrollNews() {
 const [displayedArticles, setDisplayedArticles] = useState<Article[]>(allArticles.slice(0, ARTICLES_PER_PAGE))
 const [page, setPage] = useState(1)
 const [hasMore, setHasMore] = useState(true)
 const observerTarget = useRef<HTMLDivElement>(null)

 const loadMore = useCallback(() => {
 const startIndex = (page + 1) * ARTICLES_PER_PAGE
 const endIndex = startIndex + ARTICLES_PER_PAGE

 if (startIndex >= allArticles.length) {
 setHasMore(false)
 return
 }

 const newArticles = allArticles.slice(0, endIndex)
 setDisplayedArticles(newArticles)
 setPage((p) => p + 1)
 }, [page])

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 if (entries[0].isIntersecting && hasMore) {
 loadMore()
 }
 },
 { threshold: 0.1 },
 )

 if (observerTarget.current) {
 observer.observe(observerTarget.current)
 }

 return () => observer.disconnect()
 }, [loadMore, hasMore])

 return (
 <>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {displayedArticles.map((article) => (
 <NewsCard key={article.id} {...article} />
 ))}
 </div>

 {/* Infinite scroll trigger */}
 <div ref={observerTarget} className="py-12 text-center">
 {hasMore ? (
 <div className="flex justify-center items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
 <div className="w-2 h-2 rounded-full bg-primary animate-bounce animation-delay-100" />
 <div className="w-2 h-2 rounded-full bg-primary animate-bounce animation-delay-200" />
 <span className="text-muted-foreground ml-4">Loading more articles...</span>
 </div>
 ) : (
 <p className="text-muted-foreground">No more articles to load</p>
 )}
 </div>
 </>
 )
}
