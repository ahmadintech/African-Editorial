"use client"

import { useState, useEffect } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredStories = [
 {
 id: 1,
 title: "Investigations Reveal Hidden Impact of Trade Agreements on African Economy",
 summary: "Deep-dive analysis shows how recent trade deals are reshaping the continent's economic landscape",
 category: "Investigations",
 author: "Sarah Okonkwo",
 date: "2024-01-10",
 image: "/african-trade-investigation.jpg",
 readTime: "12 min",
 },
 {
 id: 2,
 title: "Climate Crisis: East Africa Faces Unprecedented Water Shortage",
 summary: "Exclusive report on how prolonged drought is affecting communities across Kenya, Ethiopia, and beyond",
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
]

export function HeroCarousel() {
 const [current, setCurrent] = useState(0)
 const [autoPlay, setAutoPlay] = useState(true)

 useEffect(() => {
 if (!autoPlay) return

 const interval = setInterval(() => {
 setCurrent((prev) => (prev + 1) % featuredStories.length)
 }, 5000)

 return () => clearInterval(interval)
 }, [autoPlay])

 const next = () => {
 setCurrent((prev) => (prev + 1) % featuredStories.length)
 setAutoPlay(false)
 }

 const prev = () => {
 setCurrent((prev) => (prev - 1 + featuredStories.length) % featuredStories.length)
 setAutoPlay(false)
 }

 const story = featuredStories[current]

 return (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="relative rounded-lg overflow-hidden bg-card shadow-lg group">
 {/* Image background */}
 <div className="relative h-96 sm:h-[500px] w-full">
 <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-full absolute inset-0 object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
 </div>

 {/* Content overlay */}
 <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
 <div className="space-y-3">
 <div className="inline-block">
 <span className="news-badge">{story.category}</span>
 </div>
 <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight text-balance">{story.title}</h2>
 <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-2">{story.summary}</p>
 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2">
 <span>{story.author}</span>
 <span>•</span>
 <span>{story.date}</span>
 <span>•</span>
 <span>{story.readTime} read</span>
 </div>
 </div>
 </div>

 {/* Navigation buttons */}
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
 {featuredStories.map((_, i) => (
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
 </div>
 </section>
 )
}
