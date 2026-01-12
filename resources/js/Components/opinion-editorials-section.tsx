"use client"

import { NewsCard } from "./news-card"
import { MobileCarousel } from "./mobile-carousel"

const opinionPieces = [
 {
 id: 12,
 title: "Why African Countries Must Lead the Climate Discussion",
 summary: "Opinion: The continent's voice cannot be overlooked in global climate negotiations",
 category: "Opinion",
 author: "Dr. Kwame Asante",
 date: "2024-01-07",
 image: "/climate-policy-opinion-editorial.jpg",
 readTime: "6 min",
 },
 {
 id: 13,
 title: "Tech and Tradition: Finding Balance in Digital Africa",
 summary: "Editorial perspective on preserving cultural values amid rapid technological change",
 category: "Opinion",
 author: "Zainab Mohamed",
 date: "2024-01-06",
 image: "/tech-tradition-balance-africa.jpg",
 readTime: "7 min",
 },
 {
 id: 14,
 title: "The Future of African Leadership: A Generational Shift",
 summary: "Analysis of how younger leaders are reshaping political and economic landscapes",
 category: "Opinion",
 author: "Prof. Emeka Okoye",
 date: "2024-01-05",
 image: "/african-leadership-generation.jpg",
 readTime: "8 min",
 },
]

export function OpinionEditorialsSection() {
 return (
 <section className="py-12 border-t border-border">
 <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Opinion & Editorials</h2>

 <div className="hidden md:block">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {opinionPieces.map((story) => (
 <NewsCard key={story.id} {...story} />
 ))}
 </div>
 </div>

 <div className="md:hidden">
 <MobileCarousel>
 {opinionPieces.map((story) => (
 <div key={story.id} className="carousel-card">
 <NewsCard {...story} />
 </div>
 ))}
 </MobileCarousel>
 </div>
 </section>
 )
}
